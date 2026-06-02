importScripts("tokens.js");
const HB_BACKEND_URL = "https://verify.kicktech.io";
const HB_SESSION_KEY = "hb_session_id";
async function _hbGetOrCreateSessionId() {
  const result = await chrome.storage.local.get(HB_SESSION_KEY);
  if (result[HB_SESSION_KEY]) return result[HB_SESSION_KEY];
  const id = crypto.randomUUID();
  await chrome.storage.local.set({ [HB_SESSION_KEY]: id });
  return id;
}
const RPC_ENDPOINTS = [
  "https://rpc.kicktech.io/api/rpc",
  // KickTech proxy (Alchemy) — primary
  "https://sepolia.base.org",
  // official — fallback
  "https://84532.rpc.thirdweb.com",
  // thirdweb — fallback
  "https://base-sepolia-rpc.publicnode.com"
  // publicnode — fallback
];
let currentRpcIndex = 0;
const BASE_SEPOLIA_RPC = RPC_ENDPOINTS[0];
const ISSUER_REGISTRY = "0x264ccf960495b1b63A0Dfe8C316883e2Ab3424ee";
const ASSET_REGISTRY = "0x19131087F393BE7fE4B8c35AeA56397A6304a609";
const GATEWAY_BASE_URL = "https://gateway.kicktech.io";
const CACHE_TTL_MS = 30 * 60 * 1e3;
let registryCache = null;
let cacheTimestamp = 0;
let fetchInProgress = null;
async function loadCacheFromStorage() {
  try {
    const data = await chrome.storage.session.get(["registryCache", "cacheTimestamp"]);
    if (data.registryCache && data.cacheTimestamp) {
      let cached;
      if (isSnapshotShape(data.registryCache)) {
        cached = data.registryCache;
      } else if (Array.isArray(data.registryCache)) {
        cached = wrapLegacyFlatAsSnapshot(data.registryCache);
      } else {
        return;
      }
      registryCache = cached;
      cacheTimestamp = data.cacheTimestamp;
      const totalAssets = typeof registryCache.totalAssets === "number" ? registryCache.totalAssets : (registryCache.issuers || []).reduce((n, i) => n + (i.assets || []).length, 0);
    }
  } catch (e) {
  }
}
async function saveCacheToStorage(snapshot, ts) {
  try {
    await chrome.storage.session.set({ registryCache: snapshot, cacheTimestamp: ts });
  } catch (e) {
  }
}
loadCacheFromStorage();
const SIG = {
  getAllIssuerIds: "0xfe5f9d31",
  getIssuer: "0x2341c963",
  getAssetsByIssuer: "0x69e5dcc7",
  getAsset: "0x2cc3ce80",
  getAuthorizedDomains: "0xd227502c",
  getCdnRoots: "0xf3704c78",
  getAllAdditionalHashes: "0xdc38c116",
  getAssetLabel: "0xcb8f727b"
};
async function ethCall(to, data) {
  let lastErr;
  for (let attempt = 0; attempt < RPC_ENDPOINTS.length; attempt++) {
    const rpcUrl = RPC_ENDPOINTS[(currentRpcIndex + attempt) % RPC_ENDPOINTS.length];
    try {
      const res = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to, data }, "latest"] })
      });
      if (res.status === 429) {
        currentRpcIndex = (currentRpcIndex + attempt + 1) % RPC_ENDPOINTS.length;
        await new Promise((r) => setTimeout(r, 500 + attempt * 300));
        throw new Error("HTTP 429");
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      if (json.error) throw new Error("RPC: " + json.error.message);
      currentRpcIndex = (currentRpcIndex + attempt) % RPC_ENDPOINTS.length;
      return json.result;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("All RPC endpoints failed");
}
async function ethCallBatch(calls) {
  if (!calls || calls.length === 0) return [];
  if (calls.length === 1) {
    return [await ethCall(calls[0].to, calls[0].data)];
  }
  const body = calls.map((c, i) => ({
    jsonrpc: "2.0",
    id: i + 1,
    method: "eth_call",
    params: [{ to: c.to, data: c.data }, "latest"]
  }));
  let lastErr;
  for (let attempt = 0; attempt < RPC_ENDPOINTS.length; attempt++) {
    const rpcUrl = RPC_ENDPOINTS[(currentRpcIndex + attempt) % RPC_ENDPOINTS.length];
    try {
      const res = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.status === 429) {
        currentRpcIndex = (currentRpcIndex + attempt + 1) % RPC_ENDPOINTS.length;
        await new Promise((r) => setTimeout(r, 500 + attempt * 300));
        throw new Error("HTTP 429");
      }
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      if (!Array.isArray(json)) {
        throw new Error("RPC: non-array batch response" + (json && json.error ? " (" + json.error.message + ")" : ""));
      }
      if (json.length !== calls.length) {
        throw new Error("RPC: batch returned " + json.length + " results for " + calls.length + " calls");
      }
      const ordered = new Array(calls.length);
      for (const item of json) {
        const idx = (typeof item.id === "number" ? item.id : parseInt(item.id, 10)) - 1;
        if (idx < 0 || idx >= calls.length || ordered[idx] !== void 0) {
          throw new Error("RPC: batch response has out-of-range or duplicate id " + item.id);
        }
        if (item.error) throw new Error("RPC: " + (item.error.message || JSON.stringify(item.error)));
        ordered[idx] = item.result;
      }
      for (let i = 0; i < ordered.length; i++) {
        if (ordered[i] === void 0) {
          throw new Error("RPC: batch missing result for id " + (i + 1));
        }
      }
      currentRpcIndex = (currentRpcIndex + attempt) % RPC_ENDPOINTS.length;
      return ordered;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("All RPC endpoints failed for batch");
}
function enc32(hex) {
  return (hex.startsWith("0x") ? hex.slice(2) : hex).padStart(64, "0");
}
function decodeBytes32Array(hex) {
  const d = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (d.length < 128) return [];
  const off = parseInt(d.slice(0, 64), 16) * 2;
  const len = parseInt(d.slice(off, off + 64), 16);
  const arr = [];
  for (let i = 0; i < len; i++) {
    const s = off + 64 + i * 64;
    arr.push("0x" + d.slice(s, s + 64));
  }
  return arr;
}
function decodeBytes8Array(hex) {
  const d = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (d.length < 128) return [];
  const off = parseInt(d.slice(0, 64), 16) * 2;
  const len = parseInt(d.slice(off, off + 64), 16);
  const arr = [];
  for (let i = 0; i < len; i++) {
    const s = off + 64 + i * 64;
    arr.push(d.slice(s, s + 16));
  }
  return arr;
}
function hexToUtf8(hex) {
  try {
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map((b) => parseInt(b, 16)));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}
function decodeStringArray(hex) {
  const d = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (d.length < 128) return [];
  try {
    const outerOff = parseInt(d.slice(0, 64), 16) * 2;
    const len = parseInt(d.slice(outerOff, outerOff + 64), 16);
    if (!len) return [];
    const base = outerOff + 64;
    const result = [];
    for (let i = 0; i < len; i++) {
      const elemOff = parseInt(d.slice(base + i * 64, base + i * 64 + 64), 16) * 2;
      const abs = outerOff + 64 + elemOff;
      const strLen = parseInt(d.slice(abs, abs + 64), 16);
      if (!strLen) {
        result.push("");
        continue;
      }
      result.push(hexToUtf8(d.slice(abs + 64, abs + 64 + strLen * 2)));
    }
    return result;
  } catch {
    return [];
  }
}
function decodeSingleString(hex) {
  const d = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (d.length < 128) return "";
  try {
    const off = parseInt(d.slice(0, 64), 16) * 2;
    const len = parseInt(d.slice(off, off + 64), 16);
    if (!len) return "";
    return hexToUtf8(d.slice(off + 64, off + 64 + len * 2));
  } catch {
    return "";
  }
}
function decodeTupleString(tupleData, slotIndex) {
  try {
    const slotStart = slotIndex * 64;
    const off = parseInt(tupleData.slice(slotStart, slotStart + 64), 16) * 2;
    if (!off || off + 64 > tupleData.length) return "";
    const len = parseInt(tupleData.slice(off, off + 64), 16);
    if (!len) return "";
    return hexToUtf8(tupleData.slice(off + 64, off + 64 + len * 2));
  } catch (e) {
    return "";
  }
}
function structData(hex) {
  const d = hex.startsWith("0x") ? hex.slice(2) : hex;
  return d.slice(64);
}
const CONCURRENCY = 2;
async function pLimit(tasks, concurrency) {
  const results = new Array(tasks.length);
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, worker);
  await Promise.all(workers);
  return results;
}
function isSnapshotShape(data) {
  return data && typeof data === "object" && !Array.isArray(data) && Array.isArray(data.issuers);
}
function flattenAssetsWithIssuer(snapshot) {
  if (!isSnapshotShape(snapshot)) {
    return [];
  }
  const out = [];
  const issuers = snapshot.issuers;
  for (let i = 0; i < issuers.length; i++) {
    const iss = issuers[i];
    const _issuer = {
      issuerId: iss.issuerId,
      legalName: iss.legalName || "",
      wallet: iss.wallet || "",
      level: typeof iss.level === "number" ? iss.level : 0,
      registeredAt: typeof iss.registeredAt === "number" ? iss.registeredAt : 0
    };
    const assets = iss.assets || [];
    for (let j = 0; j < assets.length; j++) {
      const a = assets[j];
      out.push({
        issuerId: a.issuerId || iss.issuerId,
        assetId: a.assetId,
        name: a.name || iss.legalName || "",
        assetLabel: a.assetLabel || "",
        active: a.active !== false,
        logoHashes: a.logoHashes || [],
        authorizedUrlPatterns: a.authorizedUrlPatterns || [],
        authorizedCdnRoots: a.authorizedCdnRoots || [],
        threshold: typeof a.threshold === "number" ? a.threshold : 5,
        assetType: typeof a.assetType === "number" ? a.assetType : 0,
        metadataUri: a.metadataUri || "",
        createdAt: typeof a.createdAt === "number" ? a.createdAt : 0,
        updatedAt: typeof a.updatedAt === "number" ? a.updatedAt : 0,
        _issuer
      });
    }
  }
  return out;
}
function wrapLegacyFlatAsSnapshot(flatArr) {
  const issuersMap = /* @__PURE__ */ new Map();
  for (let i = 0; i < flatArr.length; i++) {
    const a = flatArr[i];
    const iid = a.issuerId;
    if (!issuersMap.has(iid)) {
      issuersMap.set(iid, {
        issuerId: iid,
        legalName: a.name || "",
        wallet: "",
        level: 0,
        registeredAt: 0,
        assets: []
      });
    }
    issuersMap.get(iid).assets.push({
      issuerId: iid,
      assetId: a.assetId,
      name: a.name || "",
      assetLabel: a.assetLabel || "",
      active: true,
      logoHashes: a.logoHashes || [],
      authorizedUrlPatterns: a.authorizedUrlPatterns || [],
      authorizedCdnRoots: a.authorizedCdnRoots || [],
      threshold: typeof a.threshold === "number" ? a.threshold : 8,
      assetType: 0,
      metadataUri: "",
      createdAt: 0,
      updatedAt: 0
    });
  }
  const issuersArr = Array.from(issuersMap.values());
  return {
    version: 1,
    fetchedAt: Date.now(),
    chainId: 84532,
    issuers: issuersArr,
    totalAssets: flatArr.length,
    totalIssuers: issuersArr.length,
    source: "legacy-flat-wrap"
  };
}
async function fetchRegistryFromGateway() {
  const stored = await chrome.storage.local.get(["gatewayToken"]);
  const gatewayToken = stored.gatewayToken;
  const t0 = Date.now();
  const headers = {};
  if (gatewayToken) {
    headers["Authorization"] = "Bearer " + gatewayToken;
  }
  const response = await fetch(
    GATEWAY_BASE_URL + "/api/registry?consumer=humanbadge-extension",
    { headers }
  );
  if (!response.ok) {
    throw new Error("Gateway HTTP " + response.status + " " + response.statusText);
  }
  const snapshot = await response.json();
  if (!isSnapshotShape(snapshot)) {
    throw new Error("Gateway returned non-snapshot shape (missing issuers array)");
  }
  const totalAssets = typeof snapshot.totalAssets === "number" ? snapshot.totalAssets : (snapshot.issuers || []).reduce((n, i) => n + (i.assets || []).length, 0);
  const ageS = Math.round((Date.now() - (snapshot.fetchedAt || Date.now())) / 1e3);
  const fetchMs = Date.now() - t0;
  snapshot.source = "gateway";
  return snapshot;
}
async function fetchRegistryFromChain() {
  const t0 = Date.now();
  const issuerIdsRaw = await ethCall(ISSUER_REGISTRY, SIG.getAllIssuerIds);
  const issuerIds = decodeBytes32Array(issuerIdsRaw);
  if (!issuerIds.length) {
    return {
      version: 1,
      fetchedAt: Date.now(),
      chainId: 84532,
      issuers: [],
      totalAssets: 0,
      totalIssuers: 0,
      source: "chain-fallback"
    };
  }
  const issuerTasks = issuerIds.map((issuerId) => async () => {
    const [issuerRaw, assetIdsRaw] = await ethCallBatch([
      { to: ISSUER_REGISTRY, data: SIG.getIssuer + enc32(issuerId) },
      { to: ASSET_REGISTRY, data: SIG.getAssetsByIssuer + enc32(issuerId) }
    ]);
    const d = structData(issuerRaw);
    const active = parseInt(d.slice(4 * 64, 5 * 64), 16) !== 0;
    if (!active) return null;
    const nameOff = parseInt(d.slice(1 * 64, 2 * 64), 16) * 2;
    const nameLen = parseInt(d.slice(nameOff, nameOff + 64), 16);
    const legalName = hexToUtf8(d.slice(nameOff + 64, nameOff + 64 + nameLen * 2));
    const wallet = "0x" + d.slice(2 * 64 + 24, 3 * 64).toLowerCase();
    const levelRaw = parseInt(d.slice(3 * 64, 4 * 64), 16);
    const level = Number.isFinite(levelRaw) ? levelRaw : 0;
    const registeredAtSec = parseInt(d.slice(5 * 64, 6 * 64), 16);
    const registeredAt = Number.isFinite(registeredAtSec) ? registeredAtSec * 1e3 : 0;
    const assetIds = decodeBytes32Array(assetIdsRaw);
    return { issuerId, legalName, wallet, level, registeredAt, assetIds };
  });
  const issuerResults = await pLimit(issuerTasks, CONCURRENCY);
  const activeIssuers = issuerResults.filter(Boolean);
  const issuerMeta = /* @__PURE__ */ new Map();
  for (const iss of activeIssuers) {
    issuerMeta.set(iss.issuerId, {
      legalName: iss.legalName || "",
      wallet: iss.wallet || "",
      level: typeof iss.level === "number" ? iss.level : 0,
      registeredAt: typeof iss.registeredAt === "number" ? iss.registeredAt : 0
    });
  }
  const assetJobs = [];
  for (const { issuerId, legalName, assetIds } of activeIssuers) {
    for (const assetId of assetIds) {
      assetJobs.push({ issuerId, legalName, assetId });
    }
  }
  const assetTasks = assetJobs.map(({ issuerId, legalName, assetId }) => async () => {
    const [assetRaw, addRaw, domRaw, cdnRaw, labelRaw] = await ethCallBatch([
      { to: ASSET_REGISTRY, data: SIG.getAsset + enc32(assetId) },
      { to: ASSET_REGISTRY, data: SIG.getAllAdditionalHashes + enc32(assetId) },
      { to: ASSET_REGISTRY, data: SIG.getAuthorizedDomains + enc32(assetId) },
      { to: ASSET_REGISTRY, data: SIG.getCdnRoots + enc32(assetId) },
      { to: ASSET_REGISTRY, data: SIG.getAssetLabel + enc32(assetId) }
    ]);
    const a = structData(assetRaw);
    const revoked = parseInt(a.slice(9 * 64, 10 * 64), 16) !== 0;
    if (revoked) return null;
    const assetTypeRaw = parseInt(a.slice(2 * 64, 3 * 64), 16);
    const assetType = Number.isFinite(assetTypeRaw) ? assetTypeRaw : 0;
    const primaryHash = a.slice(3 * 64, 3 * 64 + 16);
    const threshold = parseInt(a.slice(5 * 64, 6 * 64), 16);
    const metadataUri = decodeTupleString(a, 8);
    const createdAtSec = parseInt(a.slice(10 * 64, 11 * 64), 16);
    const createdAt = Number.isFinite(createdAtSec) ? createdAtSec * 1e3 : 0;
    const updatedAtSec = parseInt(a.slice(11 * 64, 12 * 64), 16);
    const updatedAt = Number.isFinite(updatedAtSec) ? updatedAtSec * 1e3 : 0;
    const additionalHashes = decodeBytes8Array(addRaw);
    const authorizedUrlPatterns = decodeStringArray(domRaw);
    const authorizedCdnRoots = decodeStringArray(cdnRaw);
    const assetLabel = decodeSingleString(labelRaw);
    return {
      issuerId,
      assetId,
      name: legalName,
      assetLabel,
      active: true,
      logoHashes: [primaryHash, ...additionalHashes],
      authorizedUrlPatterns,
      authorizedCdnRoots,
      threshold: Number.isFinite(threshold) ? Math.max(0, Math.min(20, threshold)) : 8,
      assetType,
      metadataUri,
      createdAt,
      updatedAt
    };
  });
  const assetResults = await pLimit(assetTasks, CONCURRENCY);
  const result = assetResults.filter(Boolean);
  const byIssuer = /* @__PURE__ */ new Map();
  for (const a of result) {
    if (!byIssuer.has(a.issuerId)) {
      const meta = issuerMeta.get(a.issuerId) || { legalName: a.name || "", wallet: "", level: 0, registeredAt: 0 };
      byIssuer.set(a.issuerId, {
        issuerId: a.issuerId,
        legalName: meta.legalName,
        wallet: meta.wallet,
        level: meta.level,
        registeredAt: meta.registeredAt,
        assets: []
      });
    }
    byIssuer.get(a.issuerId).assets.push({
      issuerId: a.issuerId,
      assetId: a.assetId,
      name: a.name || "",
      assetLabel: a.assetLabel || "",
      active: true,
      logoHashes: a.logoHashes || [],
      authorizedUrlPatterns: a.authorizedUrlPatterns || [],
      authorizedCdnRoots: a.authorizedCdnRoots || [],
      threshold: typeof a.threshold === "number" ? a.threshold : 8,
      assetType: typeof a.assetType === "number" ? a.assetType : 0,
      metadataUri: a.metadataUri || "",
      createdAt: typeof a.createdAt === "number" ? a.createdAt : 0,
      updatedAt: typeof a.updatedAt === "number" ? a.updatedAt : 0
    });
  }
  const issuersOut = Array.from(byIssuer.values());
  const snapshot = {
    version: 1,
    fetchedAt: Date.now(),
    chainId: 84532,
    issuers: issuersOut,
    totalAssets: result.length,
    totalIssuers: issuersOut.length,
    source: "chain-fallback"
  };
  return snapshot;
}
chrome.runtime.onInstalled.addListener(async (details) => {
  try {
    await ensureSeed();
    await setupTokenRotation();
  } catch (e) {
  }
});
chrome.runtime.onStartup.addListener(async () => {
  try {
    await setupTokenRotation();
  } catch (e) {
  }
});
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "ktRotate") {
    await onRotationAlarm();
  }
});
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "GET_ISSUERS") {
    (async () => {
      const t0 = Date.now();
      const respondFlat = (payload) => {
        const snap = payload.issuers;
        if (isSnapshotShape(snap)) {
          payload.issuers = flattenAssetsWithIssuer(snap);
        } else if (!Array.isArray(snap)) {
          payload.issuers = [];
        }
        payload.elapsedMs = Date.now() - t0;
        sendResponse(payload);
      };
      const respondAsIs = (payload) => {
        payload.elapsedMs = Date.now() - t0;
        sendResponse(payload);
      };
      const snapshotHasAssets = (snap) => isSnapshotShape(snap) && (snap.issuers || []).some((i) => (i.assets || []).length > 0);
      try {
        if (!registryCache && !cacheTimestamp) {
          await loadCacheFromStorage();
        }
        const now = Date.now();
        if (registryCache && snapshotHasAssets(registryCache) && now - cacheTimestamp < CACHE_TTL_MS) {
          respondFlat({ ok: true, issuers: registryCache, source: "cache" });
          return;
        }
        if (fetchInProgress) {
          try {
            const snap = await fetchInProgress;
            respondFlat({ ok: true, issuers: snap || registryCache || { issuers: [] }, source: "dedup" });
          } catch {
            respondFlat({ ok: true, issuers: registryCache || { issuers: [] }, source: "stale-cache" });
          }
          return;
        }
        let gatewayOK = false;
        try {
          fetchInProgress = fetchRegistryFromGateway();
          const snap = await fetchInProgress;
          registryCache = snap;
          cacheTimestamp = now;
          await saveCacheToStorage(snap, now);
          const totalAssets = typeof snap.totalAssets === "number" ? snap.totalAssets : (snap.issuers || []).reduce((n, i) => n + (i.assets || []).length, 0);
          respondFlat({ ok: true, issuers: snap, source: "gateway" });
          gatewayOK = true;
        } catch (gwErr) {
        } finally {
          if (gatewayOK) fetchInProgress = null;
        }
        if (gatewayOK) return;
        fetchInProgress = fetchRegistryFromChain();
        try {
          const snap = await fetchInProgress;
          registryCache = snap;
          cacheTimestamp = now;
          await saveCacheToStorage(snap, now);
          const totalAssets = typeof snap.totalAssets === "number" ? snap.totalAssets : (snap.issuers || []).reduce((n, i) => n + (i.assets || []).length, 0);
          respondFlat({ ok: true, issuers: snap, source: "chain" });
        } catch (err) {
          if (registryCache && snapshotHasAssets(registryCache)) {
            const totalAssets = typeof registryCache.totalAssets === "number" ? registryCache.totalAssets : (registryCache.issuers || []).reduce((n, i) => n + (i.assets || []).length, 0);
            respondFlat({ ok: true, issuers: registryCache, source: "stale-cache" });
            return;
          }
          chrome.storage.local.get({ issuers: [] }, (data) => {
            respondAsIs({ ok: true, issuers: data.issuers || [], source: "localStorage" });
          });
        } finally {
          fetchInProgress = null;
        }
      } catch (e) {
        respondAsIs({ ok: false, error: String(e?.message || e), issuers: [] });
      }
    })();
    return true;
  }
  if (msg?.type === "GET_CURRENT_TOKEN") {
    (async () => {
      try {
        const result = await getCurrentToken();
        sendResponse({ ok: true, ...result });
      } catch (e) {
        sendResponse({ ok: false, error: String(e?.message || e) });
      }
    })();
    return true;
  }
  if (msg?.type === "GET_SESSION_ID") {
    _hbGetOrCreateSessionId().then((sessionId) => sendResponse({ sessionId })).catch(() => sendResponse({ sessionId: null }));
    return true;
  }
  if (msg?.type === "CLEAR_CACHE") {
    registryCache = null;
    cacheTimestamp = 0;
    chrome.storage.session.remove(["registryCache", "cacheTimestamp"]).catch(() => {
    });
    sendResponse({ ok: true });
    return true;
  }
  if (msg?.type === "VERIFY_HMAC") {
    (async () => {
      const h = msg.h ? String(msg.h).slice(0, 128) : "";
      const candidate = msg.candidate ? String(msg.candidate).slice(0, 256) : "";
      if (!h || !candidate) {
        sendResponse({ ok: false, match: false });
        return;
      }
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3e3);
      try {
        const resp = await fetch(HB_BACKEND_URL + "/api/verify-hmac", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ h, candidate }),
          signal: ctrl.signal
        });
        const data = await resp.json().catch(() => ({}));
        sendResponse({ ok: resp.ok, match: data && data.match === true });
      } catch (e) {
        sendResponse({ ok: false, match: false });
      } finally {
        clearTimeout(timer);
      }
    })();
    return true;
  }
  if (msg?.type === "REGISTER_HASH") {
    (async () => {
      try {
        const sessionId = await _hbGetOrCreateSessionId();
        const tokenInfo = await getCurrentToken();
        if (!tokenInfo || !tokenInfo.token) {
          sendResponse({
            ok: false,
            status: 0,
            data: {
              error: "token_unavailable",
              detail: "Current KT-token could not be generated. Try reloading the extension."
            }
          });
          return;
        }
        const payload = {
          sessionId,
          requestedToken: tokenInfo.token,
          contentHash: msg.contentHash,
          domain: msg.domain,
          platform: msg.platform
        };
        if (msg.urlHint) {
          payload.urlHint = String(msg.urlHint).slice(0, 200);
        }
        if (msg.displayName) payload.displayName = msg.displayName;
        if (msg.authorDomain) {
          payload.authorDomain = String(msg.authorDomain).slice(0, 200);
        }
        if (msg.hart) {
          payload.hart = String(msg.hart).slice(0, 128);
        }
        const resp = await fetch(HB_BACKEND_URL + "/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        sendResponse({ ok: resp.ok, status: resp.status, data });
        if (resp.ok && resp.status === 200) {
          setTimeout(async () => {
            try {
              registryCache = null;
              cacheTimestamp = 0;
              await chrome.storage.session.remove(["registryCache", "cacheTimestamp"]).catch(() => {
              });
              const tabs = await chrome.tabs.query({
                active: true,
                currentWindow: true
              });
              const tabId = tabs?.[0]?.id;
              if (tabId) {
                chrome.tabs.sendMessage(tabId, { type: "RESCAN" }, () => {
                  if (chrome.runtime.lastError) {
                  }
                });
              }
            } catch (e) {
            }
          }, 8e3);
        }
      } catch (e) {
        sendResponse({
          ok: false,
          status: 0,
          data: { error: "network_error", detail: String(e?.message || e) }
        });
      }
    })();
    return true;
  }
  sendResponse({ ok: false, error: "Unknown message type" });
});
