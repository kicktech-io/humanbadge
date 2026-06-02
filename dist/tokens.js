const TOKEN_PREFIX = "KT-";
const TOKEN_RANDOM_LENGTH = 6;
const WINDOW_MS = 10 * 60 * 1e3;
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";
const STORAGE_KEY_SEED = "ktSeed";
const SESSION_KEY_TOKEN = "ktCurrentToken";
const ALARM_NAME = "ktRotate";
let _memoryCache = null;
function getCurrentWindowIndex() {
  return Math.floor(Date.now() / WINDOW_MS);
}
function getWindowEndMs(windowIndex) {
  return (windowIndex + 1) * WINDOW_MS;
}
function utcLabelFromMs(ms) {
  const d = new Date(ms);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm} UTC`;
}
async function ensureSeed() {
  const stored = await chrome.storage.local.get([STORAGE_KEY_SEED]);
  let seedHex = stored[STORAGE_KEY_SEED];
  if (!seedHex || typeof seedHex !== "string" || seedHex.length !== 64 || !/^[0-9a-f]{64}$/i.test(seedHex)) {
    const seedBytes = new Uint8Array(32);
    crypto.getRandomValues(seedBytes);
    seedHex = bytesToHex(seedBytes);
    await chrome.storage.local.set({ [STORAGE_KEY_SEED]: seedHex });
  }
  return hexToBytes(seedHex);
}
function bytesToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
async function deriveToken(seed, windowIndex) {
  const windowBuf = new ArrayBuffer(8);
  const view = new DataView(windowBuf);
  view.setUint32(0, Math.floor(windowIndex / 4294967296), false);
  view.setUint32(4, windowIndex >>> 0, false);
  const input = new Uint8Array(seed.length + 8);
  input.set(seed, 0);
  input.set(new Uint8Array(windowBuf), seed.length);
  const hashBuf = await crypto.subtle.digest("SHA-256", input);
  const hash = new Uint8Array(hashBuf);
  let value = 0;
  for (let i = 0; i < 5; i++) {
    value = value * 256 + hash[i];
  }
  let chars = "";
  for (let i = 0; i < TOKEN_RANDOM_LENGTH; i++) {
    chars = ALPHABET[value % ALPHABET.length] + chars;
    value = Math.floor(value / ALPHABET.length);
  }
  return TOKEN_PREFIX + chars;
}
async function getCurrentToken() {
  const windowIndex = getCurrentWindowIndex();
  if (_memoryCache && _memoryCache.windowIndex === windowIndex) {
    return formatTokenResponse(_memoryCache);
  }
  try {
    const sessionCached = await chrome.storage.session.get([SESSION_KEY_TOKEN]);
    const cached = sessionCached[SESSION_KEY_TOKEN];
    if (cached && typeof cached === "object" && cached.windowIndex === windowIndex && cached.token) {
      _memoryCache = cached;
      return formatTokenResponse(cached);
    }
  } catch (_e) {
  }
  const seed = await ensureSeed();
  const token = await deriveToken(seed, windowIndex);
  const windowEndMs = getWindowEndMs(windowIndex);
  const entry = { windowIndex, token, windowEndMs };
  _memoryCache = entry;
  try {
    await chrome.storage.session.set({ [SESSION_KEY_TOKEN]: entry });
  } catch (_e) {
  }
  return formatTokenResponse(entry);
}
function formatTokenResponse(entry) {
  const now = Date.now();
  const secondsLeft = Math.max(0, Math.floor((entry.windowEndMs - now) / 1e3));
  return {
    token: entry.token,
    windowIndex: entry.windowIndex,
    windowEndMs: entry.windowEndMs,
    windowEndUtcLabel: utcLabelFromMs(entry.windowEndMs),
    secondsLeft
  };
}
async function setupTokenRotation() {
  await chrome.alarms.clear(ALARM_NAME);
  const currentIdx = getCurrentWindowIndex();
  const nextBoundaryMs = (currentIdx + 1) * WINDOW_MS;
  await chrome.alarms.create(ALARM_NAME, {
    when: nextBoundaryMs,
    // first fire: exactly on next 10-min UTC boundary
    periodInMinutes: 10
    // then every 10 minutes
  });
  const delaySec = Math.round((nextBoundaryMs - Date.now()) / 1e3);
}
async function onRotationAlarm() {
  _memoryCache = null;
  try {
    await chrome.storage.session.remove([SESSION_KEY_TOKEN]);
  } catch (_e) {
  }
  let fresh;
  try {
    fresh = await getCurrentToken();
  } catch (e) {
    return;
  }
  try {
    chrome.runtime.sendMessage({ type: "KT_TOKEN_ROTATED", token: fresh }).catch(() => {
    });
  } catch (_e) {
  }
}
