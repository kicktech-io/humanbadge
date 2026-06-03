const HB_LANG = (() => {
  let ui = "";
  try {
    if (chrome && chrome.i18n && chrome.i18n.getUILanguage) ui = chrome.i18n.getUILanguage() || "";
  } catch (e) {
  }
  const l = ui || navigator.language || "";
  return String(l).toLowerCase().indexOf("pl") === 0 ? "pl" : "en";
})();
const HB_DESC_I18N = {
  pl: {
    sig_ok: "Stopka maila zweryfikowana \u2014 nadawca z autoryzowanej domeny ({x})",
    sig_unauth: "Stopka maila rozpoznana, ale nadawca spoza autoryzowanej domeny ({x})",
    mailtext_ok: "Tre\u015B\u0107 maila i nadawca zweryfikowane ({x})",
    mailtext_unauth: "Tre\u015B\u0107 maila rozpoznana, ale nadawca spoza autoryzowanej domeny ({x})",
    post_ok: "Tre\u015B\u0107 posta i adres strony zweryfikowane ({x})",
    post_unauth: "Tre\u015B\u0107 rozpoznana, ale profil pochodzi z nieautoryzowanego adresu ({x})",
    collision: "Ten sam obrazek jest zarejestrowany przez inny podmiot (dist={dist}). Mo\u017Ce to oznacza\u0107 wsp\xF3lne elementy graficzne lub zduplikowane wpisy w rejestrze.",
    relay_links: "Linki przez zewn\u0119trzny system mailingowy: {x}",
    suspicious_links: "Podejrzane linki w zweryfikowanej wiadomo\u015Bci: {x}",
    human_ok: "Aktywne potwierdzenie autorstwa \u2014 autor stoi za t\u0105 dok\u0142adn\u0105 tre\u015Bci\u0105. Edycja uniewa\u017Cnia badge.",
    human_unauth: "Tre\u015B\u0107 attestowana przez autora, ale ta strona nie jest autoryzowana przez wystawc\u0119 \u2014 mo\u017Cliwa kopia.",
    msgr_ok: "Wiadomo\u015B\u0107 zweryfikowana \u2014 oryginalny post w tym w\u0105tku (Messenger)",
    msgr_unauth: "Tre\u015B\u0107 rozpoznana, ale w\u0105tek nieautoryzowany (Messenger)",
    tip_hint: "\u2192 Sprawd\u017A szczeg\xF3\u0142y na g\xF3rnym pasku przegl\u0105darki w rozszerzeniu KickTech \u2191",
    banner_relay: "<div style='font-size:22px;line-height:1;margin-bottom:6px'>\u26A0\uFE0F</div><b style='font-size:14px;color:#92400e'>KickTech: Linki przez zewn\u0119trzny system mailingowy</b><br><span style='display:inline-block;margin-top:6px'>Mail zawiera linki przez zewn\u0119trzny system wysy\u0142kowy (<b>{domains}</b>). Rozszerzenie nie mo\u017Ce samodzielnie sprawdzi\u0107 dok\u0105d prowadz\u0105 po przekierowaniu.<br><br><b>Zanim klikniesz \u2014 zweryfikuj link przez KickTech Forward-to-Verify:</b><br>Prze\u015Blij tego maila (bez \u017Cadnych zmian) na <b>verify@kicktech.io</b> i otrzymasz automatyczn\u0105 odpowied\u017A z informacj\u0105, czy docelowy adres URL nale\u017Cy do autoryzowanej domeny nadawcy.</span>",
    banner_suspicious: "<div style='font-size:22px;line-height:1;margin-bottom:6px'>\u26A0\uFE0F</div><b style='font-size:14px;color:#dc2626'>KickTech: Podejrzane linki w zweryfikowanej wiadomo\u015Bci</b><br><span style='display:inline-block;margin-top:6px'>Mail pochodzi z autoryzowanej domeny, ale zawiera linki do niezarejestrowanych domen: <b>{domains}</b>. Nie klikaj zanim nie sprawdzisz dok\u0105d prowadz\u0105.<br><br><b>Zweryfikuj link przez KickTech Forward-to-Verify:</b><br>Prze\u015Blij tego maila (bez \u017Cadnych zmian) na <b>verify@kicktech.io</b> i otrzymasz automatyczn\u0105 odpowied\u017A z informacj\u0105, czy link prowadzi do autoryzowanej domeny nadawcy.</span>"
  },
  en: {
    sig_ok: "Email signature verified \u2014 sender from authorized domain ({x})",
    sig_unauth: "Email signature recognized, but sender outside the authorized domain ({x})",
    mailtext_ok: "Email content and sender verified ({x})",
    mailtext_unauth: "Email content recognized, but sender outside the authorized domain ({x})",
    post_ok: "Post content and page address verified ({x})",
    post_unauth: "Content recognized, but the profile is from an unauthorized address ({x})",
    collision: "The same image is registered by another party (dist={dist}). This may indicate shared graphics or duplicate registry entries.",
    relay_links: "Links via an external mailing system: {x}",
    suspicious_links: "Suspicious links in a verified message: {x}",
    human_ok: "Active proof of authorship \u2014 the author stands behind this exact content. Editing invalidates the badge.",
    human_unauth: "Content attested by an author, but this page is not authorized by the issuer \u2014 possible copy.",
    msgr_ok: "Message verified \u2014 original post in this thread (Messenger)",
    msgr_unauth: "Content recognized, but the thread is not authorized (Messenger)",
    tip_hint: "\u2192 Check the details in the KickTech extension on the browser top bar \u2191",
    banner_relay: "<div style='font-size:22px;line-height:1;margin-bottom:6px'>\u26A0\uFE0F</div><b style='font-size:14px;color:#92400e'>KickTech: Links via an external mailing system</b><br><span style='display:inline-block;margin-top:6px'>This email contains links routed through an external mailing system (<b>{domains}</b>). The extension can't independently check where they lead after redirection.<br><br><b>Before you click \u2014 verify the link via KickTech Forward-to-Verify:</b><br>Forward this email (unchanged) to <b>verify@kicktech.io</b> and you'll get an automatic reply telling you whether the destination URL belongs to the sender's authorized domain.</span>",
    banner_suspicious: "<div style='font-size:22px;line-height:1;margin-bottom:6px'>\u26A0\uFE0F</div><b style='font-size:14px;color:#dc2626'>KickTech: Suspicious links in a verified message</b><br><span style='display:inline-block;margin-top:6px'>This email is from an authorized domain but contains links to unregistered domains: <b>{domains}</b>. Don't click before checking where they lead.<br><br><b>Verify the link via KickTech Forward-to-Verify:</b><br>Forward this email (unchanged) to <b>verify@kicktech.io</b> and you'll get an automatic reply telling you whether the link leads to the sender's authorized domain.</span>"
  }
};
function hbT(key, vars) {
  let s = HB_DESC_I18N[HB_LANG] && HB_DESC_I18N[HB_LANG][key] || HB_DESC_I18N.en[key] || key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}
function _hbContextAlive() {
  try {
    return !!(chrome && chrome.runtime && chrome.runtime.id);
  } catch (e) {
    return false;
  }
}
const CONSUMER_MAIL_DOMAINS = /* @__PURE__ */ new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "live.co.uk",
  "outlook.co.uk",
  "msn.com",
  "windowslive.com",
  "yahoo.com",
  "yahoo.co.uk",
  "yahoo.fr",
  "yahoo.de",
  "ymail.com",
  "rocketmail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "gmx.de",
  "web.de",
  "aol.com",
  "zoho.com",
  "yandex.com",
  "yandex.ru",
  "ya.ru",
  "mail.ru",
  "inbox.ru",
  "bk.ru",
  "list.ru",
  "mail.com",
  "fastmail.com",
  "tutanota.com",
  "tuta.io",
  "hey.com",
  "wp.pl",
  "o2.pl",
  "interia.pl",
  "interia.eu",
  "onet.pl",
  "onet.eu",
  "op.pl",
  "gazeta.pl",
  "tlen.pl",
  "poczta.fm",
  "vp.pl",
  "go2.pl"
]);
function isConsumerMailDomain(host) {
  if (!host) return false;
  host = String(host).toLowerCase();
  if (CONSUMER_MAIL_DOMAINS.has(host)) return true;
  for (const d of CONSUMER_MAIL_DOMAINS) {
    if (host.endsWith("." + d)) return true;
  }
  return false;
}
const KT_ATTR = "data-kt-checked";
const KT_BG_ATTR = "data-kt-bg-checked";
const KT_BADGED_ATTR = "data-kt-badged";
const KT_BADGE_ID_ATTR = "data-kt-badge-id";
const KT_VERIFYING_ATTR = "data-kt-verifying";
const _hbHmacVerifyCache = /* @__PURE__ */ new Map();
async function isAuthorizedMaybeHmac(url, patterns) {
  const list = patterns || [];
  for (const p of list) {
    if (extractHmacMarker(p) === null && urlMatchesPattern(url, p)) return true;
  }
  for (const p of list) {
    const h = extractHmacMarker(p);
    if (h === null) continue;
    const candidate = extractCandidateForPattern(url, p);
    if (!candidate) continue;
    const cacheKey = h + "\0" + candidate;
    if (_hbHmacVerifyCache.has(cacheKey)) {
      if (_hbHmacVerifyCache.get(cacheKey)) return true;
      continue;
    }
    let match = false;
    try {
      const resp = await chrome.runtime.sendMessage({ type: "VERIFY_HMAC", h, candidate });
      match = !!(resp && resp.match === true);
    } catch (e) {
      match = false;
    }
    _hbHmacVerifyCache.set(cacheKey, match);
    if (match) return true;
  }
  return false;
}
function _hbHasHmacPattern(patterns) {
  return (patterns || []).some((p) => extractHmacMarker(p) !== null);
}
let _hbCurrentToken = null;
async function refreshHbToken() {
  try {
    const resp = await chrome.runtime.sendMessage({ type: "GET_CURRENT_TOKEN" });
    if (resp && resp.ok && typeof resp.token === "string") {
      _hbCurrentToken = resp.token;
    } else {
      _hbCurrentToken = null;
    }
  } catch (_e) {
    _hbCurrentToken = null;
  }
}
const KT_PREFIX_REGEX = /^KT-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{6}/;
function _hbHasKtPrefix(text) {
  if (!text) return false;
  return KT_PREFIX_REGEX.test(String(text).trim());
}
function _hbInViewport(el) {
  if (!el || !el.getBoundingClientRect) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
}
function _hbDeriveHumanBadge(issuer, authorized) {
  if (!issuer || !(issuer.assetLabel || "").startsWith("[HUMAN] ")) return null;
  if (authorized) {
    return {
      kind: "human",
      shortLabel: "HUMAN",
      tipDesc: hbT("human_ok")
    };
  }
  return {
    kind: "bad",
    shortLabel: "!",
    tipDesc: hbT("human_unauth")
  };
}
const pageVerifications = [];
const pageHarvest = [];
const badgedHashes = /* @__PURE__ */ new Map();
const badgedIssuers = /* @__PURE__ */ new Map();
let pageUnmatched = 0;
const KT_SCAN_LIMIT = 80;
const KT_MIN_SIZE = 80;
const KT_MIN_SIZE_TIER2 = 32;
const KT_MIN_DIM = 12;
const KT_DEBOUNCE_MS = 300;
const KT_RATIO_MAX_HEADER = 10;
const KT_RATIO_MAX_GENERAL = 10;
const KT_RATIO_MIN = 0.4;
function pushVerification(entry) {
  const isDupe = pageVerifications.some(
    (v) => v.imageUrl && entry.imageUrl && v.imageUrl === entry.imageUrl && v.issuerName === entry.issuerName || v.issuerName === entry.issuerName && v.assetLabel === entry.assetLabel && v.kind === entry.kind && v.imageUrl === entry.imageUrl
  );
  if (isDupe) {
    return;
  }
  pageVerifications.push(entry);
}
const observerConfig = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["style", "src", "srcset", "href", "xlink:href", "data-src", "data-lazy-src"]
};
const KT_LAZY_ATTRS = [
  "data-src",
  // lazysizes, lozad, ogólny standard
  "data-lazy-src",
  // WP Rocket LazyLoad
  "data-original",
  // jQuery Lazy
  "data-echo",
  // echo.js
  "data-lazy"
  // generyczny
];
const D = {
  scanCount: 0,
  url: (u) => u && u.length > 90 ? u.slice(0, 87) + "\u2026" : u || "\u2014"
};
let issuers = [];
async function loadIssuers() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_ISSUERS" }, (resp) => {
      if (chrome.runtime.lastError) {
        return resolve([]);
      }
      const n = resp?.issuers?.length ?? 0;
      const src = resp?.source || "?";
      const elapsed = resp?.elapsedMs;
      if (resp?.issuers?.length) {
        const dumpN = Math.min(3, resp.issuers.length);
        for (let i = 0; i < dumpN; i++) {
          const iss = resp.issuers[i];
        }
        if (resp.issuers.length > dumpN) {
        }
      }
      resolve(resp?.issuers || []);
    });
  });
}
function createBadge(shortLabel, kind, tooltipTitle, tooltipDesc, assetLabel) {
  const el = document.createElement("div");
  el.className = "kt-badge kt-" + kind;
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", tooltipTitle + ": " + tooltipDesc);
  const icon = document.createElement("span");
  icon.className = "kt-icon";
  icon.textContent = kind === "ok" ? "\u2713" : kind === "human" ? "\u{1F464}" : kind === "bad" ? "\u2717" : kind === "pending" ? "\u23F3" : "\u26A0";
  el.appendChild(icon);
  const label = document.createElement("span");
  label.className = "kt-label";
  label.textContent = shortLabel;
  el.appendChild(label);
  const tip = document.createElement("div");
  tip.className = "kt-tooltip";
  const tipTitle = document.createElement("div");
  tipTitle.className = "kt-tooltip-title";
  tipTitle.textContent = tooltipTitle;
  tip.appendChild(tipTitle);
  if (assetLabel) {
    const tipAsset = document.createElement("div");
    tipAsset.className = "kt-tooltip-asset";
    tipAsset.textContent = assetLabel;
    tip.appendChild(tipAsset);
  }
  if (tooltipDesc) {
    const tipDesc = document.createElement("div");
    tipDesc.className = "kt-tooltip-desc";
    tipDesc.textContent = tooltipDesc;
    tip.appendChild(tipDesc);
  }
  if (kind !== "ok" && kind !== "human" && kind !== "pending") {
    const tipHint = document.createElement("div");
    tipHint.className = "kt-tooltip-hint";
    tipHint.textContent = hbT("tip_hint");
    tip.appendChild(tipHint);
  }
  el.appendChild(tip);
  el.tabIndex = 0;
  el.style.cursor = "pointer";
  const closeAll = () => {
    document.querySelectorAll(".kt-badge.kt-open").forEach((b) => {
      if (b !== el) b.classList.remove("kt-open");
    });
  };
  el.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeAll();
    el.classList.toggle("kt-open");
    if (el.classList.contains("kt-open")) {
      const badgeRect = el.getBoundingClientRect();
      const tipEl = el.querySelector(".kt-tooltip");
      if (tipEl) {
        tipEl.style.bottom = "";
        tipEl.style.top = "";
        tipEl.classList.remove("kt-tooltip-below");
        if (badgeRect.top < 120) {
          tipEl.style.bottom = "auto";
          tipEl.style.top = "calc(100% + 6px)";
          tipEl.classList.add("kt-tooltip-below");
        }
      }
    }
  });
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeAll();
      el.classList.toggle("kt-open");
    }
  });
  document.addEventListener(
    "click",
    () => {
      el.classList.remove("kt-open");
    },
    true
  );
  return el;
}
const KT_FLOATING_ATTR = "data-kt-floating";
function attachFloatingBadge(badge, issuerName, assetLabel) {
  const key = issuerName + ":" + assetLabel;
  if (document.querySelector("[" + KT_FLOATING_ATTR + '="' + CSS.escape(key) + '"]')) {
    return;
  }
  const wrapper = document.createElement("div");
  wrapper.setAttribute(KT_FLOATING_ATTR, key);
  wrapper.style.cssText = [
    "position:fixed",
    "top:12px",
    "left:12px",
    "z-index:2147483647",
    "pointer-events:auto"
  ].join(";");
  badge.style.position = "relative";
  badge.style.left = "";
  badge.style.top = "";
  wrapper.appendChild(badge);
  document.body.appendChild(wrapper);
}
function isInShadowDom(el) {
  let node = el;
  while (node) {
    if (node instanceof ShadowRoot) return true;
    node = node.parentNode;
  }
  return false;
}
function _hbAttachPlaceholder(el, badge) {
  try {
    const rect = el.getBoundingClientRect();
    badge.style.position = "fixed";
    badge.style.left = Math.max(0, rect.left) + "px";
    badge.style.top = Math.max(0, rect.top) + "px";
    badge.style.zIndex = "2147483647";
    document.body.appendChild(badge);
  } catch (e) {
  }
  return badge;
}
function attachBadgeNearElement(el, badge, skipSizeCheck) {
  if (el.hasAttribute(KT_BADGED_ATTR)) {
    return;
  }
  if (el.tagName === "IMG" && (window.location.hostname === "x.com" || window.location.hostname === "twitter.com") && !window.location.pathname.includes("/status/")) {
    const tweetArticle = el.closest("[data-testid='tweet']");
    if (tweetArticle) {
      if (tweetArticle.querySelector(".kt-badge")) return;
      if (tweetArticle.hasAttribute(KT_BADGED_ATTR)) return;
      const tweetPhoto = el.closest("[data-testid='tweetPhoto']") || tweetArticle.querySelector("[data-testid='tweetPhoto']");
      const badgeContainer = tweetPhoto || tweetArticle;
      const badgeId2 = "kt-b-" + Math.random().toString(36).slice(2, 8);
      badge.setAttribute("data-kt-badge-id", badgeId2);
      tweetArticle.setAttribute(KT_BADGED_ATTR, badgeId2);
      badge.style.position = "absolute";
      badge.style.top = "8px";
      badge.style.left = "8px";
      badge.style.zIndex = "9999";
      const containerPos = window.getComputedStyle(badgeContainer).position;
      if (containerPos === "static") badgeContainer.style.position = "relative";
      badgeContainer.appendChild(badge);
      return;
    }
    return;
  }
  const rect = el.getBoundingClientRect();
  if (!skipSizeCheck) {
    const bMax = Math.max(rect.width, rect.height);
    const bMin = Math.min(rect.width, rect.height);
    if (bMax < KT_MIN_SIZE_TIER2 || bMin < KT_MIN_DIM) return;
  }
  const badgeId = "kt-b-" + Math.random().toString(36).slice(2, 8);
  badge.setAttribute("data-kt-badge-id", badgeId);
  el.setAttribute(KT_BADGED_ATTR, badgeId);
  badge.style.position = "fixed";
  badge.style.left = Math.max(0, rect.left) + "px";
  badge.style.top = Math.max(0, rect.top) + "px";
  badge.style.zIndex = "2147483647";
  document.body.appendChild(badge);
  let lastLeft = badge.style.left;
  let lastTop = badge.style.top;
  let rafId = null;
  function reposition() {
    if (!badge.isConnected || !el.isConnected) {
      cancelAnimationFrame(rafId);
      return;
    }
    const r = el.getBoundingClientRect();
    const newLeft = Math.max(0, r.left) + "px";
    const newTop = Math.max(0, r.top) + "px";
    if (newLeft !== lastLeft || newTop !== lastTop) {
      badge.style.left = newLeft;
      badge.style.top = newTop;
      lastLeft = newLeft;
      lastTop = newTop;
    }
    badge.style.display = r.bottom < 0 || r.top > window.innerHeight ? "none" : "flex";
    rafId = requestAnimationFrame(reposition);
  }
  rafId = requestAnimationFrame(reposition);
}
function decodeGmailProxyUrl(url) {
  if (!url) return url;
  if (url.includes("googleusercontent.com")) {
    const hashIdx = url.lastIndexOf("#");
    if (hashIdx > 0) {
      const decoded = url.slice(hashIdx + 1);
      if (decoded.startsWith("http")) {
        return decoded;
      }
    }
  }
  return url;
}
function isGmailInlineAttachment(url) {
  return url && url.includes("mail.google.com") && url.includes("view=fimg");
}
function getGmailSenderFromElement(bodyEl) {
  if (!bodyEl) return null;
  let container = bodyEl.parentElement;
  while (container) {
    if (container.matches && (container.matches(".h7") || container.hasAttribute("data-message-id"))) break;
    container = container.parentElement;
  }
  if (!container) return null;
  const el = container.querySelector("[email]") || container.querySelector("[data-hovercard-id]") || container.querySelector(".gD");
  if (!el) return null;
  const addr = el.getAttribute("email") || el.getAttribute("data-hovercard-id") || el.textContent.trim() || null;
  if (addr && addr.includes("@")) {
    return addr;
  }
  return null;
}
function detectForwardedSender() {
  const bodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
  if (!bodyEl) return null;
  const text = bodyEl.innerText || bodyEl.textContent || "";
  const FWD_MARKER = /[-]{3,}\s*(Forwarded message|Forwarded msg|Przekazana wiadomo[sś][cć]|Przesłana wiadomo[sś][cć]|Przes[łl]ana wiadomo[sś][cć]|Oryginalna wiadomo[sś][cć]|Tre[sś][cć]\s+przekazanej\s+wiadomo[sś][cć]|Wiadomo[sś][cć]\s+przekazana|Fwd:|FW:|Odp\.:)\s*[-]{0,}/im;
  if (!FWD_MARKER.test(text)) return null;
  const markerMatch = text.match(FWD_MARKER);
  const afterMarker = markerMatch ? text.slice(text.indexOf(markerMatch[0]) + markerMatch[0].length) : text;
  const blankLine = afterMarker.search(/\n\s*\n/);
  const rawHeaders = blankLine >= 0 ? afterMarker.slice(0, blankLine) : afterMarker.slice(0, 800);
  const bodyAfterHeaders = blankLine >= 0 ? afterMarker.slice(blankLine, blankLine + 800) : "";
  const searchBlock = rawHeaders + "\n" + bodyAfterHeaders;
  const emailRE = /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g;
  const hlines = searchBlock.split(/\r?\n/);
  for (const line of hlines) {
    if (/^\s*(?:Od|From)\s*:/i.test(line)) {
      const emails = line.match(emailRE) || [];
      if (emails.length > 0) {
        return emails[0];
      }
    }
  }
  for (const line of hlines) {
    if (/^\s*(?:Return-Path|Delivered-To)\s*:/i.test(line)) {
      const emails = line.match(emailRE) || [];
      if (emails.length > 0 && !emails[0].includes("bounce") && !emails[0].includes("bounces")) {
        return emails[0];
      }
    }
  }
  return null;
}
function extractForwardedBodyEl(bodyEl) {
  if (!bodyEl) return null;
  const text = bodyEl.innerText || bodyEl.textContent || "";
  const FWD_RE = /[-]{3,}\s*(Forwarded message|Forwarded msg|Przekazana wiadomo[^\n]{0,30}|Przesłana wiadomo[^\n]{0,30}|Przes[łl]ana wiadomo[^\n]{0,30}|Oryginalna wiadomo[^\n]{0,30}|Tre[sś][cć]\s+przekazanej\s+wiadomo[^\n]{0,30}|Wiadomo[sś][cć]\s+przekazana)/i;
  if (!FWD_RE.test(text)) return null;
  const walker = document.createTreeWalker(bodyEl, NodeFilter.SHOW_TEXT);
  let markerNode = null, node;
  while (node = walker.nextNode()) {
    if (FWD_RE.test(node.textContent)) {
      markerNode = node;
      break;
    }
  }
  if (!markerNode) return null;
  try {
    const range = document.createRange();
    range.setStartAfter(markerNode.parentElement || markerNode);
    range.setEndAfter(bodyEl.lastChild || bodyEl);
    const fragment = range.cloneContents();
    const synth = document.createElement("div");
    synth.appendChild(fragment);
    const HEADER_RE = /^\s*(Od|From|Date|Temat|Subject|Do|To|Cc|Data)\s*:/i;
    for (const child of Array.from(synth.childNodes)) {
      const t = (child.textContent || "").trim();
      if (!t || HEADER_RE.test(t)) synth.removeChild(child);
      else break;
    }
    const len = (synth.textContent || "").trim().length;
    if (len < 20) return null;
    return synth;
  } catch (e) {
    return null;
  }
}
function getGmailSender() {
  const forwardedSender = detectForwardedSender();
  if (forwardedSender) return forwardedSender;
  const emailContainers = Array.from(
    document.querySelectorAll(".h7, [data-message-id]")
  );
  for (let i = emailContainers.length - 1; i >= 0; i--) {
    const container = emailContainers[i];
    if (!container.querySelector(".a3s.aiL, .ii.gt")) continue;
    const el = container.querySelector("[email]") || container.querySelector("[data-hovercard-id]") || container.querySelector(".gD");
    if (!el) continue;
    const addr = el.getAttribute("email") || el.getAttribute("data-hovercard-id") || el.textContent.trim() || null;
    if (addr && addr.includes("@")) {
      return addr;
    }
  }
  const allSenders = Array.from(document.querySelectorAll("[email]"));
  for (let i = allSenders.length - 1; i >= 0; i--) {
    const addr = allSenders[i].getAttribute("email");
    if (addr && addr.includes("@")) {
      return addr;
    }
  }
  const gd = document.querySelector(".gD");
  return gd ? gd.getAttribute("email") || gd.textContent.trim() || null : null;
}
function getLoggedInGmailAccount() {
  const emailRE = /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/;
  const labelled = document.querySelectorAll('a[aria-label],[role="button"][aria-label]');
  for (const el of labelled) {
    const label = el.getAttribute("aria-label") || "";
    if (/account|konto/i.test(label)) {
      const m = label.match(emailRE);
      if (m) return m[1];
    }
  }
  const de = document.querySelector("[data-email]");
  if (de) {
    const v = de.getAttribute("data-email");
    if (v && v.includes("@")) return v;
  }
  return null;
}
function hbCapturePublisherDomain(bodyEl) {
  const fwd = detectForwardedSender();
  if (fwd && fwd.includes("@")) return (fwd.split("@")[1] || "").toLowerCase();
  const acct = getLoggedInGmailAccount();
  if (acct && acct.includes("@")) return (acct.split("@")[1] || "").toLowerCase();
  const from = bodyEl && getGmailSenderFromElement(bodyEl) || getGmailSender();
  if (from && from.includes("@")) return (from.split("@")[1] || "").toLowerCase();
  return null;
}
function isSenderDomainAuthorized(senderDomain, patterns) {
  if (!senderDomain || !patterns.length) return false;
  senderDomain = senderDomain.toLowerCase();
  for (const pattern of patterns) {
    let patternHost = pattern.toLowerCase();
    patternHost = patternHost.replace(/^https?:\/\//, "");
    patternHost = patternHost.split("/")[0];
    patternHost = patternHost.replace(/^\*\./, "");
    if (!patternHost) continue;
    if (senderDomain === patternHost || senderDomain.endsWith("." + patternHost)) {
      return true;
    }
  }
  return false;
}
const KT_MESSAGING_HOSTS = /* @__PURE__ */ new Set(["web.telegram.org", "web.whatsapp.com", "app.signal.org", "www.facebook.com", "www.messenger.com"]);
function extractGmailBodyText() {
  const bodyEls = document.querySelectorAll(".a3s.aiL, .ii.gt");
  if (!bodyEls.length) return "";
  let best = "";
  let bestEl = null;
  for (const el of bodyEls) {
    const text = el.innerText || el.textContent || "";
    if (text.length > best.length) {
      best = text;
      bestEl = el;
    }
  }
  if (bestEl) {
    const quote = bestEl.querySelector(".gmail_quote");
    if (quote) {
      const quoteText = quote.innerText || quote.textContent || "";
      if (quoteText.length > best.length * 0.4 && quoteText.length > 50) {
        return quoteText;
      }
    }
  }
  return best;
}
async function scanGmailLinks() {
  const realBodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
  const bodyEl = realBodyEl;
  if (!bodyEl) return;
  const imgLinks = Array.from(bodyEl.querySelectorAll("a[href] > img, a[href] img")).map((img) => img.closest("a")).filter((a, i, arr) => a && arr.indexOf(a) === i);
  const AV_IMG_RE = /^(avast[.]com|avg[.]com|norton[.]com|kaspersky[.]com|bitdefender[.]com|eset[.]com|mcafee[.]com|malwarebytes[.]com|sophos[.]com|avcdn[.]net)/i;
  const filteredImgLinks = imgLinks.filter((a) => {
    try {
      return !AV_IMG_RE.test(new URL(a.getAttribute("href") || "").hostname.replace(/^www[.]/, ""));
    } catch {
      return true;
    }
  });
  const allLinks = Array.from(bodyEl.querySelectorAll("a[href]"));
  const imgLinkSet = new Set(filteredImgLinks);
  const links = [...filteredImgLinks, ...allLinks.filter((a) => !imgLinkSet.has(a))];
  const SKIP = /^(mailto:|#|javascript:|tel:)/i;
  const SKIP_DOMAIN = /(google\.com|gstatic\.com|gmail\.com|googleusercontent\.com|accounts\.google)/i;
  const PUBLIC_INSTITUTION_DOMAIN = /^(m\.st|ms\.gov\.pl|krs\.com\.pl|ekrs\.ms\.gov\.pl|sejm\.gov\.pl|nbp\.pl|uodo\.gov\.pl|uokik\.gov\.pl)$/i;
  const SOCIAL_PLATFORM_DOMAIN = /^(twitter\.com|x\.com|facebook\.com|instagram\.com|linkedin\.com|youtube\.com|tiktok\.com|trustpilot\.com|pinterest\.com|snapchat\.com|threads\.net|apple\.com|play\.google\.com|apps\.apple\.com)$/i;
  const ANTIVIRUS_DOMAIN = /^(avast\.com|avg\.com|norton\.com|kaspersky\.com|bitdefender\.com|eset\.com|mcafee\.com|malwarebytes\.com|virustotal\.com|f-secure\.com|sophos\.com|trend\w*\.com)$/i;
  const verifiedIssuers = pageVerifications.filter((v) => v.kind === "ok").map((v) => v.issuerName);
  const hasVerifiedIssuer = verifiedIssuers.length > 0;
  const externalDomains = /* @__PURE__ */ new Set();
  for (const a of links) {
    const href = a.getAttribute("href") || "";
    if (SKIP.test(href)) continue;
    try {
      const url = new URL(href);
      if (!url.hostname) continue;
      if (SKIP_DOMAIN.test(url.hostname)) continue;
      const bare = url.hostname.replace(/^www\./, "");
      if (PUBLIC_INSTITUTION_DOMAIN.test(bare)) continue;
      if (SOCIAL_PLATFORM_DOMAIN.test(bare)) continue;
      if (ANTIVIRUS_DOMAIN.test(bare)) continue;
      const isImgLink = imgLinkSet.has(a);
      if (!hasVerifiedIssuer && !isImgLink) continue;
      externalDomains.add(bare);
    } catch (e) {
      continue;
    }
  }
  if (externalDomains.size === 0) {
    if (imgLinks.length === 0) return;
    for (const a of filteredImgLinks) {
      const href = a.getAttribute("href") || "";
      try {
        const host = new URL(href).hostname.replace(/^www\./, "");
        const parts = host.split(".");
        const reg = parts.slice(-2).join(".");
        externalDomains.add(reg);
      } catch {
      }
    }
    if (externalDomains.size === 0) return;
  }
  if (!hasVerifiedIssuer && filteredImgLinks.length === 0) {
    return;
  }
  if (!hasVerifiedIssuer) {
  }
  const _allHrefs = Array.from(bodyEl.querySelectorAll("a[href]")).map((a) => a.getAttribute("href")).filter((h) => h && !h.startsWith("mailto:") && !h.startsWith("#"));
  const authorizedPatterns = [];
  for (const iss of issuers) {
    if (verifiedIssuers.includes(iss.name)) {
      authorizedPatterns.push(...iss.authorizedUrlPatterns || []);
    }
  }
  const unauthorizedDomains = [...externalDomains].filter((domain) => {
    const auth = isSenderDomainAuthorized(domain, authorizedPatterns);
    return !auth;
  });
  const RELAY_PATTERN = /^(emailing|newsletter|tracking|click|links|go\.|mailing|kampanie|email\.|send\.|dispatch\.|r\d*\.|urldefense\.proofpoint\.|proofpoint\.|safelinks\.protection\.outlook\.|na\.protection\.sophos\.|linkprotect\.cudasvc\.)/i;
  const relayDomains = [...externalDomains].filter((d) => RELAY_PATTERN.test(d));
  const plainUnauthorized = unauthorizedDomains.filter((d) => !RELAY_PATTERN.test(d));
  if (unauthorizedDomains.length === 0 && relayDomains.length === 0) {
    return;
  }
  const unauthorizedRelayDomains = relayDomains.filter((d) => !isSenderDomainAuthorized(d, authorizedPatterns));
  if (plainUnauthorized.length === 0 && unauthorizedRelayDomains.length === 0) {
    return;
  }
  const warnRelayDomains = unauthorizedRelayDomains;
  let warningHtml;
  if (warnRelayDomains.length > 0) {
    const allSuspect = [...warnRelayDomains, ...plainUnauthorized];
    warningHtml = hbT("banner_relay", { domains: allSuspect.join(", ") });
    const warningKind = "warn";
    const warningBadge = document.createElement("div");
    warningBadge.className = "kt-link-warning";
    warningBadge.style.cssText = [
      "background:#fffbeb",
      "border:2px solid #f59e0b",
      "border-left:6px solid #d97706",
      "border-radius:8px",
      "padding:12px 16px",
      "margin:12px 0",
      "font-family:Arial,sans-serif",
      "font-size:13px",
      "color:#78350f",
      "position:relative",
      "z-index:2147483646",
      "box-shadow:0 2px 8px rgba(217,119,6,0.25)"
    ].join(";");
    warningBadge.innerHTML = warningHtml;
    const insertTarget = realBodyEl || bodyEl;
    if (!insertTarget?.previousSibling?.classList?.contains("kt-link-warning")) {
      if (insertTarget?.parentElement) {
        insertTarget.parentElement.insertBefore(warningBadge, insertTarget);
      } else {
      }
    } else {
    }
    pushVerification({
      kind: "warn",
      issuerName: "KickTech Link Check",
      assetLabel: "Relay link detected",
      shortLabel: "i",
      desc: hbT("relay_links", { x: relayDomains.join(", ") }),
      imageUrl: "(link-check-relay)",
      context: "email-links",
      senderEmail: getGmailSender() || null,
      ts: Date.now()
    });
  } else {
    warningHtml = hbT("banner_suspicious", { domains: unauthorizedDomains.join(", ") });
    const warningBadge = document.createElement("div");
    warningBadge.className = "kt-link-warning";
    warningBadge.style.cssText = [
      "background:#fef2f2",
      "border:2px solid #fca5a5",
      "border-left:6px solid #dc2626",
      "border-radius:8px",
      "padding:12px 16px",
      "margin:12px 0",
      "font-family:Arial,sans-serif",
      "font-size:13px",
      "color:#7f1d1d",
      "position:relative",
      "z-index:2147483646",
      "box-shadow:0 2px 8px rgba(220,38,38,0.2)"
    ].join(";");
    warningBadge.innerHTML = warningHtml;
    const insertTarget2 = realBodyEl || bodyEl;
    if (!insertTarget2?.previousSibling?.classList?.contains("kt-link-warning")) {
      if (insertTarget2?.parentElement) {
        insertTarget2.parentElement.insertBefore(warningBadge, insertTarget2);
      } else {
      }
    }
    pushVerification({
      kind: "bad",
      issuerName: "KickTech Link Check",
      assetLabel: "URL destination check",
      shortLabel: "!",
      desc: hbT("suspicious_links", { x: unauthorizedDomains.join(", ") }),
      imageUrl: "(link-check)",
      context: "email-links",
      senderEmail: getGmailSender() || null,
      ts: Date.now()
    });
  }
}
const GMAIL_UI_TOKENS = [
  "Szukam wirus\xF3w...",
  "Szukam wirus\xF3w",
  "Dodaj do Dysku",
  "Zapisz w Zdj\u0119ciach",
  "Zapisz na Dysku",
  "Pobierz",
  "Wy\u015Bwietl",
  "Podgl\u0105d",
  "Wi\u0119cej opcji",
  "Otw\xF3rz w",
  "Zarz\u0105dzaj",
  "Add to Drive",
  "Save to Photos",
  "Download",
  "View",
  "Preview",
  "More options",
  "Open in",
  "Manage",
  "Scan for viruses"
];
function getGmailBodyText(bodyEl) {
  if (!bodyEl) return "";
  let text = bodyEl.innerText || bodyEl.textContent || "";
  for (const token of GMAIL_UI_TOKENS) {
    text = text.split(token).join("");
  }
  text = text.replace(/\n{3,}/g, "\n\n").trim();
  return text;
}
function stripThunderbirdFwdHeaders(text) {
  return text.replace(
    /\s*-{3,}\s*(?:Tre[s\u015b][c\u0107]\s+przekazanej\s+wiadomo[s\u015b]ci|Original\s+Message|Forwarded\s+[Mm]essage|Begin\s+forwarded\s+message)\s*-{3,}[\s\S]*/i,
    ""
  ).trim();
}
function extractGmailSignature() {
  const bodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
  if (!bodyEl) return "";
  const gmailSig = bodyEl.querySelector(".gmail_signature");
  if (gmailSig) {
    const t = (gmailSig.innerText || "").trim();
    if (t.length > 20) {
      return { text: t, bodyEl };
    }
  }
  {
    const fullText2 = stripThunderbirdFwdHeaders(getGmailBodyText(bodyEl));
    const AUTO_MSG_RE = /wiadomo[sś][cć]\s+(?:zosta[lł]a\s+)?wygenero\w+(?:\s+zosta[lł]a)?\s+automatycznie/i;
    const autoIdx = fullText2.search(AUTO_MSG_RE);
    if (autoIdx > 50) {
      const lookback = fullText2.slice(Math.max(0, autoIdx - 500), autoIdx);
      const nnIdx = lookback.lastIndexOf("\n\n");
      const dotIdx = lookback.lastIndexOf(".\n");
      const lastBreak = Math.max(nnIdx, dotIdx);
      const offset = lastBreak > 0 ? lastBreak + 1 : 0;
      const blockStart = autoIdx - lookback.length + offset;
      const sigText = fullText2.slice(blockStart >= 0 ? blockStart : autoIdx).trim();
      if (sigText.length >= 40) {
        return { text: sigText, bodyEl };
      }
    }
  }
  const imgs = Array.from(bodyEl.querySelectorAll("img")).filter((img) => {
    const w = img.naturalWidth || img.width || parseInt(img.getAttribute("width") || "0") || 0;
    const h = img.naturalHeight || img.height || parseInt(img.getAttribute("height") || "0") || 0;
    return Math.max(w, h) >= 30;
  });
  if (!imgs.length) {
    const fullText2 = getGmailBodyText(bodyEl);
    const lines = fullText2.split("\n");
    for (let i = lines.length - 1; i >= 5; i--) {
      const line = lines[i].trim();
      if (/^-{5,}$/.test(line) || /^={5,}$/.test(line)) {
        const afterLines = lines.slice(i + 1).join("\n").trim();
        if (afterLines.length >= 40) {
          return { text: afterLines, bodyEl };
        }
      }
    }
    const firstHrB = bodyEl.querySelector("hr");
    if (firstHrB) {
      try {
        const hrRange2 = document.createRange();
        hrRange2.setStartAfter(firstHrB);
        hrRange2.setEndAfter(bodyEl.lastChild || bodyEl);
        const textAfterHr = hrRange2.toString().trim();
        if (textAfterHr.length >= 20) {
          const HR2_CO_START = /\b(Poczta\s+Polska|[A-ZŁŚĆŻŹ][\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+\s+(?:S\.A\.|Sp\.\s*z\s*o\.o))/;
          const HR2_CO_RE = /\b(S\.A\.|Sp\.\s*z|ul\.|NIP|KRS|siedzib|infolinia)/i;
          const window2 = textAfterHr.length > 600 ? textAfterHr.slice(-600) : textAfterHr;
          const matched = HR2_CO_RE.test(window2);
          if (matched) {
            let startIdx = window2.search(HR2_CO_START);
            if (startIdx < 0) startIdx = window2.search(HR2_CO_RE);
            let trimmed = startIdx > 0 ? window2.slice(startIdx) : window2;
            trimmed = trimmed.replace(/(KRS:\s*\d+)[\s\r\n]+\1/gi, "$1").trim();
            return { text: trimmed, bodyEl };
          }
        }
      } catch (e) {
      }
    }
    return null;
  }
  const lastImg = imgs[imgs.length - 1];
  let rangeText = "";
  try {
    const range = document.createRange();
    range.setStartAfter(lastImg);
    range.setEndAfter(bodyEl.lastChild || bodyEl);
    rangeText = GMAIL_UI_TOKENS.reduce((t, tok) => t.split(tok).join(""), range.toString()).trim();
  } catch (e) {
  }
  const COMPANY_RE = /\b(KRS|REGON|NIP|S\.A\.|Sp\.|z\.o\.o|siedzib|kapita[łl]|zarejestrowana|rejestrowy|instytucj|zezwoleni|sp[oó][łl]k|VAT|Ltd\.|Inc\.|GmbH|BV\b|NV\b)\b/i;
  const hasCompanyContent = COMPANY_RE.test(rangeText);
  if (rangeText.length >= 80 && hasCompanyContent) {
    if (rangeText.length > 800) {
      const lines = rangeText.split("\n");
      let footerStart = -1;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (COMPANY_RE.test(lines[i])) {
          footerStart = i;
          for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
            if (lines[j].trim() === "") {
              footerStart = j + 1;
              break;
            }
            footerStart = j;
          }
          break;
        }
      }
      if (footerStart >= 0) {
        const footerText = lines.slice(footerStart).join("\n").trim();
        if (footerText.length >= 40) {
          return { text: footerText, bodyEl };
        }
      }
    }
    return { text: rangeText, bodyEl };
  }
  let pivot = lastImg;
  while (pivot.parentElement && pivot.parentElement !== bodyEl) {
    pivot = pivot.parentElement;
  }
  const parts = [];
  let sib = pivot.nextSibling;
  while (sib) {
    const t = GMAIL_UI_TOKENS.reduce((tx, tok) => tx.split(tok).join(""), sib.innerText || sib.textContent || "").trim();
    if (t) parts.push(t);
    sib = sib.nextSibling;
  }
  const sibText = parts.join("\n").trim();
  const sibHasCompany = /\b(KRS|REGON|NIP|S\.A\.|Sp\.|z\.o\.o|siedzib|kapita[łl]|zarejestrowana|rejestrowy|instytucj|zezwoleni|sp[oó][łl]k|VAT|Ltd\.|Inc\.|GmbH|S\.A\b|BV\b|NV\b)\b/i.test(sibText);
  if (sibText.length >= 80 && sibHasCompany) {
    return { text: sibText, bodyEl };
  }
  const fullText = getGmailBodyText(bodyEl);
  const fullLines = fullText.split("\n");
  for (let i = 5; i < fullLines.length; i++) {
    const line = fullLines[i].trim();
    if (/\b(KRS|REGON)\s*[:.\s]\s*\d{5,}/i.test(line) || /\bNIP\s*[:.\s]\s*\d{3}/i.test(line) || /\b(numer\s+rejestrowy|zarejestrowana\s+w|instytucj[aą]\s+p[łl]atnic)\b/i.test(line)) {
      const startIdx = Math.max(0, i - 3);
      const sigLines = [];
      for (let j = startIdx; j < Math.min(fullLines.length, i + 10); j++) {
        sigLines.push(fullLines[j]);
      }
      const sigText = sigLines.join("\n").trim();
      if (sigText.length >= 40) {
        return { text: sigText, bodyEl };
      }
    }
  }
  const firstHr = bodyEl.querySelector("hr");
  if (firstHr) {
    try {
      const hrRange = document.createRange();
      hrRange.setStart(bodyEl, 0);
      hrRange.setEndBefore(firstHr);
      const textBeforeHr = hrRange.toString().trim();
      const window600 = textBeforeHr.slice(-600).trim();
      const HR_CO_RE = /\b(S\.A\.|Sp\.\s*z|ul\.|al\.\s|siedzib|infolinia|Bank\s+S\.A|Z\s+powa[zż]aniem|Kind\s+regards|Best\s+regards|Sincerely|\d{4}\s+[A-Z]{2}\s+\w)/i;
      if (HR_CO_RE.test(window600)) {
        const matchIdx = window600.search(HR_CO_RE);
        let blockStart = matchIdx;
        for (let i = matchIdx - 1; i >= 0; i--) {
          if (window600[i] === "\n" || i > 0 && window600[i - 1] === ".") {
            blockStart = i + 1;
            break;
          }
          if (i === 0) {
            blockStart = 0;
            break;
          }
        }
        const trimmed = window600.slice(blockStart).trim();
        if (trimmed.length >= 40) {
          return { text: trimmed, bodyEl };
        }
      }
    } catch (e) {
    }
  }
  if (firstHr) {
    try {
      const hrRange2 = document.createRange();
      hrRange2.setStartAfter(firstHr);
      hrRange2.setEndAfter(bodyEl.lastChild || bodyEl);
      const textAfterHr = hrRange2.toString().trim();
      if (textAfterHr.length >= 20 && textAfterHr.length <= 600) {
        const HR2_CO_RE = /\b(S\.A\.|Sp\.\s*z|ul\.|NIP|KRS|siedzib|infolinia)/i;
        if (HR2_CO_RE.test(textAfterHr)) {
          return { text: textAfterHr, bodyEl };
        }
      }
    } catch (e) {
    }
  }
  {
    const allImgs = Array.from(bodyEl.querySelectorAll("img")).filter((img) => {
      const alt = (img.alt || "").toLowerCase();
      const src = (img.src || img.getAttribute("src") || "").toLowerCase();
      if (/linea|separator|line|divider|sig/.test(alt) || /linea|separator|line|divider/.test(src)) return true;
      const w = img.naturalWidth || img.width || parseInt(img.getAttribute("width") || "0") || 0;
      const h = img.naturalHeight || img.height || parseInt(img.getAttribute("height") || "0") || 0;
      return w > 0 && w < 300 && h > 0 && h < 100;
    });
    const PERSONAL_SIG_RE = /\b(tel|fax|kom|mob|e-mail|ul\.|al\.|doradc|manager|dyrektor|kierown|specjalist|oddzia[łl])\b/i;
    for (let k = allImgs.length - 1; k >= 0; k--) {
      try {
        const range = document.createRange();
        range.setStartAfter(allImgs[k]);
        range.setEndAfter(bodyEl.lastChild || bodyEl);
        const rawAfterText = range.toString().trim();
        const afterText = GMAIL_UI_TOKENS.reduce((t, tok) => t.split(tok).join(""), rawAfterText).trim();
        const looksLikeBody = /^(Witaj|Szanow|Dear|Hello|Hej|Cześć|Dzień dobry)/i.test(afterText);
        if (!looksLikeBody && afterText.length >= 20 && afterText.length <= 600 && PERSONAL_SIG_RE.test(afterText)) {
          return { text: afterText, bodyEl };
        }
      } catch (e) {
      }
    }
  }
  {
    const fLines = getGmailBodyText(bodyEl).split("\n");
    const FOREIGN_CORP_F = /©\s*\d{4}|\b(UAB|Ltd\.?|GmbH|Inc\.?|Corp\.?|S\.A\.|PLC|B\.V\.|N\.V\.|LLC|SARL|AG|SE|Private\s+Limited|Pte\.?\s*Ltd)\b/;
    for (let i = 5; i < fLines.length; i++) {
      const line = fLines[i].trim();
      if (FOREIGN_CORP_F.test(line)) {
        let blockStart = i;
        for (let k = i - 1; k >= Math.max(0, i - 8); k--) {
          if (fLines[k].trim() === "") {
            blockStart = k + 1;
            break;
          }
          blockStart = k;
        }
        const sigLines = [];
        for (let j = blockStart; j < fLines.length; j++) {
          if (/^>/.test(fLines[j])) break;
          if (/\b(anuluj\s+subskrypcj|unsubscribe|wypisz\s+si)/i.test(fLines[j].trim())) break;
          sigLines.push(fLines[j]);
        }
        const sigText = sigLines.join("\n").trim();
        const hasCompanyContent2 = /\b(UAB|Ltd\.?|GmbH|Inc\.?|Corp\.?|S\.A\.|PLC|LLC|SARL|Financial Conduct|authoris|regulat|licens|zezwoleni|regulacj|AG|SE|Private\s+Limited|Pte\.?\s*Ltd)\b/i.test(sigText);
        if (sigText.length >= 40 && hasCompanyContent2) {
          return { text: sigText, bodyEl };
        }
      }
    }
  }
  {
    const fullText2 = stripThunderbirdFwdHeaders(getGmailBodyText(bodyEl));
    const TEAM_RE = /Zesp[o\u00f3][l\u0142]\s+\S/i;
    const CLOSING_RE = /(?:Do zobaczenia|Pozdrawiamy|Z powa[z\u017c]aniem|Serdecznie pozdrawiamy|Dzi[e\u0119]kujemy|Wszystkiego dobrego|Z wyrazami szacunku)/i;
    const teamIdx = fullText2.search(TEAM_RE);
    if (teamIdx > 20) {
      const beforeTeam = fullText2.slice(0, teamIdx);
      let closingIdx = -1;
      let cm;
      const closingRe2 = new RegExp(CLOSING_RE.source, "gi");
      while ((cm = closingRe2.exec(beforeTeam)) !== null) closingIdx = cm.index;
      let blockStart;
      if (closingIdx >= 0) {
        const look2 = beforeTeam.slice(0, closingIdx);
        const nn2 = look2.lastIndexOf("\n\n");
        blockStart = nn2 >= 0 ? nn2 + 2 : 0;
      } else {
        const look3 = fullText2.slice(Math.max(0, teamIdx - 300), teamIdx);
        const nn3 = look3.lastIndexOf("\n\n");
        blockStart = teamIdx - look3.length + (nn3 >= 0 ? nn3 + 2 : 0);
      }
      const sigText = fullText2.slice(blockStart >= 0 ? blockStart : teamIdx).trim();
      if (sigText.length >= 40) {
        return { text: sigText, bodyEl };
      }
    }
  }
  {
    const fullText2 = stripThunderbirdFwdHeaders(getGmailBodyText(bodyEl));
    const CUST_SVC_RE = /\b\w[\w\s]{1,40}Customer\s+(?:Service|Care|Support)\b|\bCustomer\s+(?:Service|Care|Support)\s+(?:Team|Center|Centre)\b/i;
    const svcIdx = fullText2.search(CUST_SVC_RE);
    if (svcIdx > 20) {
      const maxLook = Math.min(svcIdx, 500);
      const lookback = fullText2.slice(svcIdx - maxLook, svcIdx);
      const nnPositions = [];
      for (let i = 0; i < lookback.length - 1; i++) {
        if (lookback[i] === "\n" && lookback[i + 1] === "\n") nnPositions.push(i);
      }
      const chosen = nnPositions.length >= 2 ? nnPositions[nnPositions.length - 2] : nnPositions.length === 1 ? nnPositions[0] : -1;
      const offset = chosen >= 0 ? chosen + 2 : 0;
      const blockStart = svcIdx - maxLook + offset;
      const sigText = fullText2.slice(blockStart >= 0 ? blockStart : svcIdx).trim();
      if (sigText.length >= 40) {
        return { text: sigText, bodyEl };
      }
    }
  }
  {
    const fullText2 = getGmailBodyText(bodyEl);
    if (fullText2.length > 20) {
      const COMPANY_ANCHORS_F2 = [
        /©\s*\d{4}/,
        /\bS\.A\./,
        /\bS\.L\./,
        /\bSp\.\s*z\s*o\.o/i,
        /\bLtd\.?\b/,
        /\bGmbH\b/,
        /\bInc\.?\b/,
        /\bUAB\b/,
        /\bPLC\b/,
        /\bLLC\b/
      ];
      const GDPR_ANCHORS_J2 = [
        /przetwarzamy\s+dane/i,
        /polityce?\s+prywatno\S+ci/i,
        /wypisz\s+si\S/i,
        /\bunsubscribe\b/i,
        /\bnewsletter\b/i
      ];
      const allAnchors = [...COMPANY_ANCHORS_F2, ...GDPR_ANCHORS_J2];
      let bestIdx = -1;
      for (const re of allAnchors) {
        const globalRe = new RegExp(re.source, "gi");
        let match, lastIdx = -1;
        while ((match = globalRe.exec(fullText2)) !== null) lastIdx = match.index;
        if (lastIdx > fullText2.length * 0.2) bestIdx = Math.max(bestIdx, lastIdx);
      }
      if (bestIdx > 0) {
        let cut = bestIdx;
        for (let ci = bestIdx - 1; ci >= Math.max(0, bestIdx - 120); ci--) {
          const ch = fullText2[ci];
          if (ch === "\n") {
            cut = ci + 1;
            break;
          }
          if (ch === "." && ci + 1 < fullText2.length && fullText2[ci + 1] !== ".") {
            cut = ci + 1;
            break;
          }
        }
        const sigText = fullText2.slice(cut).trim();
        if (sigText.length >= 10 && sigText.length <= 600) {
          return { text: sigText, bodyEl };
        }
      }
    }
  }
  {
    const CLOSING_K = /(?:Z\s+powa[zż]aniem|Z\s+wyrazami\s+szacunku|Serdecznie\s+pozdrawiamy|Pozdrawiamy|With\s+regards|Kind\s+regards|Best\s+regards|Sincerely)[,.]?\s*$/i;
    const ADDRESS_K = /Holandia|Amsterdam|Niemcy|Francja|London|Berlin|Paris|Netherlands|Germany|France|Warszawa|Krak[oó]w|Wroc[lł]aw|Pozna[nń]|Gda[nń]sk|tel\.?[:\s]|ul\.\s|\d{2}-\d{3}\s+\w|\d{4,5}\s+[A-Z]{2}/i;
    const rawText = getGmailBodyText(bodyEl);
    const kLines = rawText.split(/\n/).map((l) => l.trim()).filter((l) => l.length > 0 && !/^https?:\/\/|^<https?:\/\/|avast|zawiera wirus/i.test(l));
    for (let i = 0; i < kLines.length; i++) {
      if (CLOSING_K.test(kLines[i])) {
        const sigLines = kLines.slice(i, i + 10);
        const sigText = sigLines.join("\n").trim();
        if (sigText.length >= 20 && ADDRESS_K.test(sigText)) {
          return { text: sigText, bodyEl };
        }
      }
    }
  }
  return null;
}
function normalizeSignatureForHash(text) {
  let t = text;
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/&nbsp;/gi, " ").replace(/&[a-z]+;/gi, " ").replace(/&#x?[0-9a-f]+;/gi, " ");
  t = t.replace(/[​‌‍‎‏﻿­͏؜⁠-⁤⁦-⁩ ]/g, " ");
  const DIACRITICS = {
    "\u0105": "a",
    "\u0107": "c",
    "\u0119": "e",
    "\u0142": "l",
    "\u0144": "n",
    "\xF3": "o",
    "\u015B": "s",
    "\u017A": "z",
    "\u017C": "z",
    "\u0104": "A",
    "\u0106": "C",
    "\u0118": "E",
    "\u0141": "L",
    "\u0143": "N",
    "\xD3": "O",
    "\u015A": "S",
    "\u0179": "Z",
    "\u017B": "Z",
    "\xE1": "a",
    "\xE0": "a",
    "\xE2": "a",
    "\xE4": "a",
    "\xE3": "a",
    "\xE5": "a",
    "\xE9": "e",
    "\xE8": "e",
    "\xEA": "e",
    "\xEB": "e",
    "\xED": "i",
    "\xEC": "i",
    "\xEE": "i",
    "\xEF": "i",
    "\xFA": "u",
    "\xF9": "u",
    "\xFB": "u",
    "\xFC": "u",
    "\xFD": "y",
    "\xF1": "n",
    "\xDF": "ss",
    "\xF8": "o",
    "\u010D": "c",
    "\u0161": "s",
    "\u017E": "z",
    "\u0159": "r",
    "\u016F": "u",
    "\u011B": "e",
    "\xC1": "A",
    "\xC0": "A",
    "\xC2": "A",
    "\xC4": "A",
    "\xC9": "E",
    "\xC8": "E",
    "\xCA": "E",
    "\xCD": "I",
    "\xDA": "U",
    "\xDC": "U",
    "\xDD": "Y"
  };
  t = t.replace(/[^ -]/g, (ch) => DIACRITICS[ch] || ch);
  t = t.toLowerCase();
  t = t.replace(/\S+@\S+\.\S+/g, " ");
  t = t.replace(/https?:\/\/\S+/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}
async function scanGmailSignature() {
  const sigResult = extractGmailSignature();
  if (!sigResult) {
    return;
  }
  const { text: sigText, bodyEl: sigBodyEl } = sigResult;
  if (!sigText || sigText.length < 20) {
    return;
  }
  if (!_hbHasKtPrefix(sigText)) {
    return;
  }
  const sigNorm = normalizeSignatureForHash(sigText);
  const sigHash = simHash(sigNorm);
  if (!sigHash) {
    return;
  }
  if (!pageHarvest.some((h) => h.hash === sigHash)) {
    pageHarvest.push({
      hash: sigHash,
      url: "(email-signature-simhash)",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "EMAIL-SIGNATURE",
      tag: "TEXT",
      alt: sigText.slice(0, 200),
      inHeader: false,
      // HB: publisher domain for the authorized pattern (forward-aware chain).
      authorDomain: hbCapturePublisherDomain(sigBodyEl) || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  const sigIssuers = issuers.filter(
    (iss) => (iss.assetLabel || "").toUpperCase().startsWith("[SIGNATURE]") || (iss.assetLabel || "").toUpperCase().startsWith("[SIG]") || (iss.assetLabel || "").startsWith("[HUMAN] ")
  );
  if (!sigIssuers.length) {
    return;
  }
  const senderEmail = detectForwardedSender() || getGmailSenderFromElement(sigBodyEl) || getGmailSender();
  const senderDomain = senderEmail ? senderEmail.split("@")[1] || "" : "";
  let bestMatch = null, bestPriority = 3, bestDist = 999;
  for (const issuer2 of sigIssuers) {
    const threshold = issuer2.threshold ?? 8;
    const distances = (issuer2.logoHashes || []).map((h) => ({
      registered: h,
      dist: hammingDistanceHex(sigHash, h)
    }));
    const best = distances.sort((a, b) => a.dist - b.dist)[0];
    if (best && best.dist <= threshold) {
    }
    if (!best || best.dist > threshold) continue;
    const patterns = issuer2.authorizedUrlPatterns || [];
    const domainTrusted2 = isSenderDomainAuthorized(senderDomain, patterns);
    const prio = domainTrusted2 ? 0 : 2;
    if (prio < bestPriority || prio === bestPriority && best.dist < bestDist) {
      bestMatch = { issuer: issuer2, dist: best.dist, domainTrusted: domainTrusted2 };
      bestPriority = prio;
      bestDist = best.dist;
    }
  }
  if (!bestMatch) {
    return;
  }
  const { issuer, domainTrusted } = bestMatch;
  let shortLabel, kind, tipDesc;
  const _humanInfo = _hbDeriveHumanBadge(issuer, domainTrusted);
  if (_humanInfo) {
    ({ kind, shortLabel, tipDesc } = _humanInfo);
  } else if (domainTrusted) {
    shortLabel = "OK";
    kind = "ok";
    tipDesc = hbT("sig_ok", { x: senderEmail || "" });
  } else {
    shortLabel = "!";
    kind = "bad";
    tipDesc = hbT("sig_unauth", { x: senderEmail || "?" });
  }
  const bodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
  const sigBadgeAttr = "data-kt-sig-badged";
  if (bodyEl && !bodyEl.hasAttribute(sigBadgeAttr)) {
    attachBadgeNearElement(
      bodyEl,
      createBadge(shortLabel, kind, issuer.name, tipDesc, issuer.assetLabel || "")
    );
    bodyEl.setAttribute(sigBadgeAttr, "1");
  }
  pushVerification({
    kind,
    issuerName: issuer.name,
    assetLabel: issuer.assetLabel || "",
    shortLabel,
    desc: tipDesc,
    imageUrl: "(signature-simhash:" + sigHash + ")",
    context: "email-signature",
    senderEmail: senderEmail || null,
    ts: Date.now()
  });
}
async function scanGmailText() {
  const bodyText = stripThunderbirdFwdHeaders(extractGmailBodyText());
  if (!bodyText || bodyText.length < 30) {
    return;
  }
  if (!_hbHasKtPrefix(bodyText)) {
    return;
  }
  const textHash = simHash(bodyText);
  if (!textHash) {
    return;
  }
  if (!pageHarvest.some((h) => h.hash === textHash)) {
    pageHarvest.push({
      hash: textHash,
      url: "(email-text-simhash)",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "TEXT-SIMHASH",
      tag: "TEXT",
      alt: bodyText.slice(0, 200),
      inHeader: false,
      // HB: publisher domain for the authorized pattern (forward-aware chain).
      authorDomain: hbCapturePublisherDomain(
        document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt")
      ) || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  const textIssuers = issuers.filter(
    (iss) => (iss.assetLabel || "").startsWith("[TEXT]") || (iss.assetLabel || "").startsWith("[TXT]") || (iss.assetLabel || "").startsWith("[HUMAN] ")
  );
  if (!textIssuers.length) {
    return;
  }
  const senderEmail = getGmailSender();
  const senderDomain = senderEmail ? senderEmail.split("@")[1] || "" : "";
  let bestMatch = null;
  let bestPriority = 3;
  let bestDist = 999;
  for (const issuer2 of textIssuers) {
    const threshold = issuer2.threshold ?? 8;
    const distances = (issuer2.logoHashes || []).map((h) => ({
      registered: h,
      dist: hammingDistanceHex(textHash, h)
    }));
    const best = distances.sort((a, b) => a.dist - b.dist)[0];
    if (best && best.dist <= threshold) {
    }
    if (!best || best.dist > threshold) continue;
    const patterns = issuer2.authorizedUrlPatterns || [];
    const domainTrusted2 = isSenderDomainAuthorized(senderDomain, patterns);
    const prio = domainTrusted2 ? 0 : 2;
    if (prio < bestPriority || prio === bestPriority && best.dist < bestDist) {
      bestMatch = { issuer: issuer2, dist: best.dist, domainTrusted: domainTrusted2 };
      bestPriority = prio;
      bestDist = best.dist;
    }
  }
  if (!bestMatch) {
    return;
  }
  const { issuer, domainTrusted } = bestMatch;
  let shortLabel, kind, tipDesc;
  const _humanInfo = _hbDeriveHumanBadge(issuer, domainTrusted);
  if (_humanInfo) {
    ({ kind, shortLabel, tipDesc } = _humanInfo);
  } else if (domainTrusted) {
    shortLabel = "OK";
    kind = "ok";
    tipDesc = hbT("mailtext_ok", { x: senderEmail || "" });
  } else {
    shortLabel = "!";
    kind = "bad";
    tipDesc = hbT("mailtext_unauth", { x: senderEmail || "?" });
  }
  const bodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
  if (bodyEl && !bodyEl.hasAttribute(KT_BADGED_ATTR)) {
    attachBadgeNearElement(
      bodyEl,
      createBadge(shortLabel, kind, issuer.name, tipDesc, issuer.assetLabel || "")
    );
    bodyEl.setAttribute(KT_BADGED_ATTR, "1");
  }
  pushVerification({
    kind,
    issuerName: issuer.name,
    assetLabel: issuer.assetLabel || "",
    shortLabel,
    desc: tipDesc,
    imageUrl: "(text-simhash:" + textHash + ")",
    context: "email",
    senderEmail: senderEmail || null,
    ts: Date.now()
  });
}
const SOCIAL_PLATFORMS_CONFIG = {
  "www.linkedin.com": {
    label: "LinkedIn",
    // F8.3: LinkedIn uses scanLinkedInTimeline() viewport scanner — not extractSocialPostText()
    // Per-post hashing with activityUrn from data-urn attribute (scammer-proof).
    // Legacy selectors below kept as documentation / fallback reference only.
    isLinkedInFeed: true,
    // Post container — used by scanLinkedInTimeline to enumerate posts
    postContainerSelector: '[data-urn^="urn:li:activity:"]',
    // Text body inside each post — ordered by recency of LinkedIn redesigns
    postTextSelectors: [
      ".update-components-text",
      // current (2024+)
      ".feed-shared-update-v2__description",
      // legacy 1
      ".feed-shared-text",
      // legacy 2
      ".attributed-text-segment-list__content"
      // alternate path
    ],
    // Legacy generic selectors — NO LONGER USED by scanSocialText (isLinkedInFeed skip)
    selectors: [
      ".feed-shared-update-v2__description .attributed-text-segment-list__content",
      ".feed-shared-text",
      ".update-components-text",
      "div.feed-shared-update-v2__description",
      "article .text-view-model"
    ],
    badgeTarget: [
      ".feed-shared-update-v2__description",
      ".update-components-text",
      "article"
    ]
  },
  "www.facebook.com": {
    label: "Facebook",
    selectors: [
      // Individual post page (/posts/pfbid...) — post body container
      "[data-ad-preview='message']",
      "[data-testid='post_message']",
      // FB Groups / Pages post body (2024+)
      "div[data-ad-comet-preview='message']",
      // Post page: look for the main article with role=article, grab its text content
      // Avoid div[dir='auto'] alone — too broad, matches sidebar/feed elements
      "article[role='article'] div[dir='auto'][style]",
      "article[role='article'] div[dir='auto']:first-of-type"
    ],
    // Only use specific post containers as badge targets — never generic divs
    badgeTarget: [
      "[data-ad-preview='message']",
      "[data-testid='post_message']",
      "div[data-ad-comet-preview='message']",
      "article[role='article']"
    ],
    // For Facebook, limit fallback text extraction to the main post article only
    // (overrides the generic article/main fallback in extractSocialPostText)
    strictFallback: "article[role='article']"
  },
  "www.instagram.com": {
    label: "Instagram",
    // Instagram shows a soft-wall overlay ("Never miss a post — sign up")
    // that contaminates DOM text extraction. Use meta description first —
    // IG always populates it server-side with the post caption.
    useMetaDescription: true,
    selectors: [
      "._a9zs",
      "h1._aacl",
      "article div[dir='auto'] span",
      "article div[class*='x1lliihq'] span[dir='auto']",
      "div[data-testid='post-caption']"
    ],
    // If extracted text contains these — it's the soft-wall overlay, discard.
    softWallSignals: [
      "nigdy nie przegap",
      "never miss a post",
      "sign up to see",
      "zarejestruj sie na instagramie",
      "zaloguj sie na instagramie",
      "log in to instagram",
      "obserwowanie"
    ],
    // Badge targets — ordered from most specific to most generic.
    // On /p/... post pages: target the post image directly so the badge
    // lands on the photo (top-left corner), not on the page container.
    badgeTarget: [
      "article img[srcset]",
      // post image — most precise
      "article img",
      // post image fallback
      "div[role='presentation'] img",
      // image in presentation container
      "article",
      // full post article
      "main article",
      "section main"
    ]
  },
  "www.tiktok.com": {
    label: "TikTok",
    selectors: [
      "[data-e2e='browse-video-desc']",
      "[data-e2e='search-card-video-caption']",
      "h1[data-e2e]"
    ],
    badgeTarget: ["[data-e2e='browse-video-desc']", "h1[data-e2e]"]
  },
  "x.com": {
    label: "X",
    isX: true,
    // Skip scanSocialText - X has dedicated scanXTimeline (per-tweet, all paths)
    selectors: ["[data-testid='tweetText']"],
    badgeTarget: ["article[data-testid='tweet']"]
  },
  "twitter.com": {
    label: "X/Twitter",
    isX: true,
    // Skip scanSocialText - X has dedicated scanXTimeline (per-tweet, all paths)
    selectors: ["[data-testid='tweetText']"],
    badgeTarget: ["article[data-testid='tweet']"]
  },
  "www.youtube.com": {
    label: "YouTube",
    // YouTube populates meta[itemprop="name"] with the video title server-side.
    // More stable than DOM selectors which require JS rendering.
    // Also try meta[name="title"] and og:title as fallbacks.
    useMetaDescription: true,
    metaSelectors: [
      'meta[itemprop="name"]',
      // video title — most reliable
      'meta[property="og:title"]',
      // OG title fallback
      'meta[name="title"]'
      // generic title fallback
    ],
    selectors: [
      "#description-inner",
      "#description .ytd-expandable-video-description-body-renderer",
      "ytd-video-primary-info-renderer h1",
      "h1.ytd-video-primary-info-renderer"
    ],
    badgeTarget: ["ytd-watch-metadata", "#description-inner", "ytd-player"]
  },
  "www.reddit.com": {
    label: "Reddit",
    // Reddit uses Web Components (shreddit-post, shreddit-title).
    // Title lives in shreddit-title[title] attribute — not innerText.
    // Use useMetaDescription to get title from og:title / meta description.
    useMetaDescription: true,
    metaSelectors: [
      'meta[property="og:title"]',
      // post title — most reliable
      'meta[name="description"]',
      // post snippet
      'meta[property="og:description"]'
      // fallback
    ],
    selectors: [
      "[data-test-id='post-content'] [data-click-id='text']",
      "shreddit-post div[slot='text-body']",
      "h1[slot='title']"
      // shreddit-title attribute fallback handled via custom extraction below
    ],
    // Custom attribute extractor for shreddit-title[title]
    customExtract: () => {
      const el = document.querySelector("shreddit-title");
      return el ? el.getAttribute("title") || "" : "";
    },
    badgeTarget: ["[data-test-id='post-content']", "shreddit-post", "main"]
  },
  "www.pinterest.com": {
    label: "Pinterest",
    // Pinterest stores pin description in JSON embedded in script tags.
    // Field: closeupUnifiedDescription (full text) or title as fallback.
    // DOM selectors are unreliable — use customExtract to parse JSON.
    customExtract: () => {
      const scripts = Array.from(document.querySelectorAll("script[id], script[type='application/json']"));
      for (const s of scripts) {
        try {
          const data = JSON.parse(s.textContent || "");
          const str = JSON.stringify(data);
          const match = str.match(/"closeupUnifiedDescription":"((?:[^"\\]|\\.)*)"/);
          if (match) return match[1].replace(/\\n/g, " ").replace(/\\"/g, '"');
        } catch (e) {
        }
      }
      const allScripts = Array.from(document.querySelectorAll("script:not([src])"));
      for (const s of allScripts) {
        const txt = s.textContent || "";
        if (!txt.includes("closeupUnifiedDescription")) continue;
        const match = txt.match(/"closeupUnifiedDescription":"((?:[^"\\]|\\.)*)"/);
        if (match) return match[1].replace(/\\n/g, " ").replace(/\\"/g, '"');
      }
      return "";
    },
    selectors: [
      "[data-test-id='pin-closeup-description']",
      "div[data-test-id='CloseupDetails'] div[class*='description']",
      "h1[data-test-id='pin-closeup-title']"
    ],
    useMetaDescription: true,
    metaSelectors: [
      'meta[property="og:description"]',
      'meta[name="description"]'
    ],
    badgeTarget: [
      "[data-test-id='CloseupDetails']",
      "[data-test-id='pin-closeup-description']",
      "main"
    ]
  },
  "pl.pinterest.com": {
    label: "Pinterest",
    customExtract: () => {
      const allScripts = Array.from(document.querySelectorAll("script:not([src])"));
      for (const s of allScripts) {
        const txt = s.textContent || "";
        if (!txt.includes("closeupUnifiedDescription")) continue;
        const match = txt.match(/"closeupUnifiedDescription":"((?:[^"\\]|\\.)*)"/);
        if (match) return match[1].replace(/\\n/g, " ").replace(/\\"/g, '"');
      }
      return "";
    },
    selectors: [
      "[data-test-id='pin-closeup-description']",
      "h1[data-test-id='pin-closeup-title']"
    ],
    useMetaDescription: true,
    metaSelectors: [
      'meta[property="og:description"]',
      'meta[name="description"]'
    ],
    badgeTarget: [
      "[data-test-id='CloseupDetails']",
      "[data-test-id='pin-closeup-description']",
      "main"
    ]
  },
  "web.telegram.org": {
    label: "Telegram",
    isTelegram: true,
    selectors: [],
    // Telegram uses scanTelegramViewport() — not extractSocialPostText()
    // Correct selectors from DOM inspection of Telegram Web A (teact framework)
    // Message bubble: .Message.message-list-item (NOT .bubble)
    messageBubbleSelector: ".Message.message-list-item",
    messageSelectors: [
      ".text-content",
      // main message text (URLs, plain text)
      "p.site-description"
      // link preview description
    ],
    linkPreviewSelectors: [
      "p.site-title"
      // link preview title — most stable, e.g. "BTC oficjalnym..."
    ],
    badgeTarget: null
  }
};
function extractSocialPostText() {
  const hostname = window.location.hostname;
  const cfg = SOCIAL_PLATFORMS_CONFIG[hostname];
  if (!cfg) return null;
  let text = "";
  if (cfg.customExtract) {
    try {
      const t = cfg.customExtract().trim();
      if (t.length > 20) {
        text = t;
      }
    } catch (e) {
    }
  }
  if (!text && cfg.useMetaDescription) {
    try {
      const metaSelectors = cfg.metaSelectors || [
        'meta[name="description"]',
        'meta[property="og:description"]'
      ];
      let raw = "";
      for (const sel of metaSelectors) {
        const el = document.querySelector(sel);
        const val = el && el.getAttribute("content");
        if (val && val.trim().length > 10) {
          raw = val.trim();
          break;
        }
      }
      if (raw) {
        const colonIdx = raw.indexOf(': "');
        let metaText = colonIdx !== -1 ? raw.slice(colonIdx + 3).replace(/"$/, "").trim() : raw.indexOf(": ") !== -1 ? raw.slice(raw.indexOf(": ") + 2).trim() : raw;
        if (metaText && metaText.length > 20) {
          text = metaText;
        }
      }
    } catch (e) {
    }
  }
  if (!text) {
    for (const sel of cfg.selectors) {
      try {
        const el = document.querySelector(sel);
        if (el) {
          const t = (el.innerText || el.textContent || "").trim();
          if (t.length > 20) {
            text = t;
            break;
          }
        }
      } catch (e) {
      }
    }
  }
  if (text && cfg.softWallSignals) {
    const normalized = text.toLowerCase();
    if (cfg.softWallSignals.some((s) => normalized.includes(s))) {
      text = "";
    }
  }
  if (!text) {
    const fallbackSel = cfg.strictFallback || null;
    const fallback = fallbackSel ? document.querySelector(fallbackSel) : document.querySelector("article") || document.querySelector("main");
    if (fallback) {
      let t = (fallback.innerText || "").trim().slice(0, 3e3);
      if (t && cfg.softWallSignals) {
        const norm = t.toLowerCase();
        if (cfg.softWallSignals.some((s) => norm.includes(s))) {
          t = "";
        }
      }
      if (t) {
        text = t;
      }
    }
  }
  if (!text || text.length < 30) return null;
  let badgeEl = null;
  for (const sel of cfg.badgeTarget || []) {
    try {
      const el = document.querySelector(sel);
      if (el) {
        badgeEl = el;
        break;
      }
    } catch (e) {
    }
  }
  return { text, badgeEl, label: cfg.label };
}
let ktMessengerObserver = null;
const ktMessengerHashed = /* @__PURE__ */ new Set();
const ktMessengerSeen = /* @__PURE__ */ new Set();
const MESSENGER_MSG_CLASS_FP = [
  "html-div",
  "xexx8yu",
  "xyri2b",
  "x18d9i69",
  "x1c1uobl",
  "x1gslohp"
];
function messengerThreadId() {
  const m = window.location.pathname.match(/(?:\/messages)?\/(?:e2ee\/)?t\/(\d+)/);
  return m ? m[1] : "";
}
function getMessengerSender(msgDiv) {
  let p = msgDiv;
  for (let i = 0; i < 15; i++) {
    p = p.parentElement;
    if (!p) break;
    const avatars = p.querySelectorAll('img[alt]:not([alt=""])');
    for (const a of avatars) {
      const alt = (a.alt || "").trim();
      if (alt.length === 0 || alt.length > 80) continue;
      if (/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}]/u.test(alt)) continue;
      return alt;
    }
  }
  return "";
}
function processMessengerMessage(msgDiv) {
  const threadId = messengerThreadId();
  if (!threadId) return;
  const text = (msgDiv.innerText || msgDiv.textContent || "").trim();
  if (text.length < 5) return;
  if (text.includes("s\u0105 chronione przy u\u017Cyciu")) return;
  if (text.includes("protected with end-to-end encryption")) return;
  if (text.includes("End-to-end encrypted")) return;
  if (!_hbHasKtPrefix(text)) return;
  const sender = getMessengerSender(msgDiv);
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  const key = threadId + ":" + text;
  const hash = simHash(key);
  if (!hash) return;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(messenger thread:" + threadId + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "MESSENGER-TEXT-SIMHASH",
      tag: "TEXT",
      alt: text.slice(0, 200),
      inHeader: false,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktMessengerHashed.has(hash)) {
    const badgeId = msgDiv.getAttribute(KT_BADGED_ATTR);
    const badgeStillLive = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (badgeStillLive) return;
    msgDiv.removeAttribute(KT_BADGED_ATTR);
  }
  ktMessengerHashed.add(hash);
  if (!textIssuers.length) return;
  const pageUrl = window.location.href;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const authorized = (best.authorizedUrlPatterns || []).some((p) => urlMatchesPattern(pageUrl, p));
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? hbT("msgr_ok") : hbT("msgr_unauth"));
  if (!msgDiv.hasAttribute(KT_BADGED_ATTR)) {
    msgDiv.setAttribute(KT_BADGED_ATTR, "1");
    setTimeout(() => {
      if (!msgDiv.isConnected) return;
      const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
      msgDiv.removeAttribute(KT_BADGED_ATTR);
      attachBadgeNearElement(msgDiv, _badge, true);
    }, 600);
  }
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(messenger:" + threadId + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanMessengerViewport() {
  const host = window.location.hostname;
  if (host !== "www.facebook.com" && host !== "www.messenger.com") return;
  const threadId = messengerThreadId();
  if (!threadId) {
    return;
  }
  const panel = document.querySelector('[role="main"]');
  if (!panel) {
    return;
  }
  const fpSelector = "div[dir='auto']." + MESSENGER_MSG_CLASS_FP.join(".");
  const messages = Array.from(panel.querySelectorAll(fpSelector));
  if (!ktMessengerObserver) {
    ktMessengerObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processMessengerMessage(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  messages.forEach((msg) => {
    const text = (msg.innerText || "").trim();
    const key = "msg-" + text.length + ":" + text.slice(0, 40);
    if (!ktMessengerSeen.has(key)) {
      ktMessengerSeen.add(key);
      ktMessengerObserver.observe(msg);
      added++;
    }
  });
  messages.forEach((msg) => {
    if (_hbInViewport(msg)) processMessengerMessage(msg);
  });
}
let ktWhatsAppObserver = null;
const ktWhatsAppHashed = /* @__PURE__ */ new Set();
const ktWhatsAppSeen = /* @__PURE__ */ new Set();
function parseWhatsAppDataId(dataId) {
  if (!dataId) return { groupId: "", msgId: "" };
  if (!dataId.includes("_")) {
    return { groupId: "", msgId: dataId };
  }
  const parts = dataId.split("_");
  if (parts.length < 3) {
    return { groupId: "", msgId: parts[0] || "" };
  }
  return {
    groupId: parts[1] || "",
    msgId: parts[2] || ""
  };
}
function getWhatsAppActiveConversation() {
  const titleEl = document.querySelector('[data-testid="conversation-info-header-chat-title"]') || document.querySelector('[data-testid="conversation-info-header"] [data-testid="selectable-text"]');
  return (titleEl?.innerText || "").trim();
}
const WA_EDITED_MARKERS = [
  "edited",
  // en
  "edytowano",
  // pl
  "editado",
  // es / pt
  "editada",
  // pt (fem.)
  "modifi\xE9",
  // fr
  "modifi\xE9e",
  // fr (fem.)
  "bearbeitet",
  // de
  "modificato",
  // it
  "modificata",
  // it (fem.)
  "bewerkt",
  // nl
  "diedit",
  // id
  "d\xFCzenlendi",
  // tr
  "\u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E",
  // ru
  "\u0437\u043C\u0456\u043D\u0435\u043D\u043E",
  // uk
  "\u7DE8\u96C6\u6E08\u307F",
  // ja
  "\u5DF2\u7F16\u8F91"
  // zh (simplified)
];
function _hbWhatsAppIsEdited(textEl) {
  const container = textEl?.parentElement;
  if (!container) return false;
  const meta = (container.textContent || "").replace(textEl.textContent || "", "").toLowerCase();
  return WA_EDITED_MARKERS.some((m) => meta.includes(m));
}
function processWhatsAppBubble(el) {
  if (el.querySelector('[data-virtualized="true"]')) return;
  const dataId = el.dataset.id || "";
  const { groupId, msgId } = parseWhatsAppDataId(dataId);
  if (!msgId) return;
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  const textEl = el.querySelector("span[dir='ltr'], span[dir='rtl'], div[dir='auto']");
  const rawTextRendered = textEl?.innerText || textEl?.textContent || "";
  let rawText = rawTextRendered.trim();
  if (rawText.length < 5) return;
  if (!_hbHasKtPrefix(rawText)) return;
  if (rawTextRendered.endsWith(".") && _hbWhatsAppIsEdited(textEl)) {
    rawText = rawText.replace(/\.$/, "");
  }
  const chatName = getWhatsAppActiveConversation();
  const preEl = el.querySelector("[data-pre-plain-text]") || el.closest("[data-pre-plain-text]");
  const preText = preEl?.getAttribute("data-pre-plain-text") || "";
  const senderMatch = preText.match(/\]\s*([^:]+):/);
  const sender = senderMatch?.[1]?.trim() || "";
  const keyParts = [groupId, chatName, sender, msgId, rawText].filter(Boolean);
  const key = keyParts.join(":");
  const hash = simHash(key);
  if (!hash) return;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(whatsapp chat:" + chatName.slice(0, 30) + " msg:" + msgId.slice(0, 8) + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "WHATSAPP-TEXT-SIMHASH",
      tag: "TEXT",
      alt: rawText.slice(0, 200),
      inHeader: false,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktWhatsAppHashed.has(hash)) {
    const badgeId = el.getAttribute(KT_BADGED_ATTR);
    const badgeStillLive = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (badgeStillLive) return;
    el.removeAttribute(KT_BADGED_ATTR);
  }
  ktWhatsAppHashed.add(hash);
  if (!textIssuers.length) return;
  const pageUrl = window.location.href;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const authorized = (best.authorizedUrlPatterns || []).some((p) => urlMatchesPattern(pageUrl, p));
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Wiadomo\u015B\u0107 zweryfikowana \u2014 oryginalny post admina (WhatsApp)" : "Tre\u015B\u0107 rozpoznana, ale grupa nieautoryzowana (WhatsApp)");
  if (!el.hasAttribute(KT_BADGED_ATTR)) {
    el.setAttribute(KT_BADGED_ATTR, "1");
    setTimeout(() => {
      if (!el.isConnected) return;
      const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
      el.removeAttribute(KT_BADGED_ATTR);
      attachBadgeNearElement(el, _badge, true);
    }, 600);
  }
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(whatsapp:" + chatName.slice(0, 30) + ":" + msgId + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanWhatsAppViewport() {
  const allBubbles = Array.from(document.querySelectorAll("[data-id]"));
  const bubbles = allBubbles.filter((b) => !b.querySelector('[data-virtualized="true"]'));
  const skipped = allBubbles.length - bubbles.length;
  if (!ktWhatsAppObserver) {
    ktWhatsAppObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processWhatsAppBubble(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  bubbles.forEach((b) => {
    const id = b.dataset.id || "";
    if (!ktWhatsAppSeen.has(id)) {
      ktWhatsAppSeen.add(id);
      ktWhatsAppObserver.observe(b);
      added++;
    }
  });
  bubbles.forEach((b) => {
    if (_hbInViewport(b)) processWhatsAppBubble(b);
  });
}
let ktXDMObserver = null;
const ktXDMHashed = /* @__PURE__ */ new Set();
const ktXDMSeen = /* @__PURE__ */ new Set();
const XDM_BUBBLE_CLASS_FP = ["rounded-2xl", "px-4", "py-2"];
function xdmConversationId() {
  const m = window.location.pathname.match(/^\/i\/chat\/([^/]+)/);
  return m ? m[1] : "";
}
function _hbIsXDMPage() {
  return (window.location.hostname === "x.com" || window.location.hostname === "twitter.com") && window.location.pathname.startsWith("/i/chat/");
}
function _hbIsXDMBubble(el) {
  const c = el && typeof el.className === "string" ? el.className : "";
  if (!c) return false;
  return XDM_BUBBLE_CLASS_FP.every((fp) => new RegExp("\\b" + fp + "\\b").test(c));
}
function _hbXDMBubbleIsOwn(bubbleEl) {
  const c = bubbleEl && typeof bubbleEl.className === "string" ? bubbleEl.className : "";
  if (/\bbg-primary\b/.test(c)) return true;
  try {
    const r = bubbleEl.getBoundingClientRect();
    if (r && r.width > 0) return r.left + r.width / 2 > window.innerWidth / 2;
  } catch (e) {
  }
  return false;
}
function _hbXDMCleanText(raw) {
  let t = String(raw || "").trim();
  t = t.replace(/(?:\s+\d{1,2}:\d{2}(?:\s*[ap]m)?)+\s*$/i, "").trim();
  return t;
}
function processXDMBubble(bubbleEl) {
  const convId = xdmConversationId();
  if (!convId) return;
  if (!_hbXDMBubbleIsOwn(bubbleEl)) return;
  const rawText = (bubbleEl.innerText || bubbleEl.textContent || "").trim();
  const text = _hbXDMCleanText(rawText);
  if (text.length < 5) return;
  if (!_hbHasKtPrefix(text)) return;
  const hash = simHash(text);
  if (!hash) return;
  const permalink = "https://x.com/i/chat/" + convId;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(x-dm conv:" + convId + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "X-DM-SIMHASH",
      tag: "TEXT",
      alt: text.slice(0, 200),
      inHeader: false,
      // Conversation URL → urlHint → backend pins x.com/i/chat/<convId>*.
      // No author handle here — anti-spoof is the conversation, not a person.
      permalink: permalink || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktXDMHashed.has(hash)) {
    const badgeId = bubbleEl.getAttribute(KT_BADGED_ATTR);
    const live = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (live) return;
    bubbleEl.removeAttribute(KT_BADGED_ATTR);
  }
  ktXDMHashed.add(hash);
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  if (!textIssuers.length) return;
  const authorUrl = permalink;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const authorized = (best.authorizedUrlPatterns || []).some((p) => urlMatchesPattern(authorUrl, p));
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Wiadomo\u015B\u0107 zweryfikowana \u2014 orygina\u0142 w tej rozmowie (X)" : "Tre\u015B\u0107 rozpoznana, ale rozmowa nieautoryzowana (X)");
  if (!bubbleEl.hasAttribute(KT_BADGED_ATTR)) {
    bubbleEl.setAttribute(KT_BADGED_ATTR, "1");
    setTimeout(() => {
      if (!bubbleEl.isConnected) return;
      const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
      bubbleEl.removeAttribute(KT_BADGED_ATTR);
      attachBadgeNearElement(bubbleEl, _badge, true);
    }, 600);
  }
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(x-dm:" + convId + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanXDM() {
  if (!_hbIsXDMPage()) return;
  const convId = xdmConversationId();
  if (!convId) return;
  const bubbles = Array.from(document.querySelectorAll('div[class*="rounded-2xl"]')).filter(_hbIsXDMBubble);
  if (!ktXDMObserver) {
    ktXDMObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processXDMBubble(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  bubbles.forEach((b) => {
    let key = "";
    try {
      const r = b.getBoundingClientRect();
      key = (b.innerText || "").trim().slice(0, 40) + "@" + Math.round(r.top);
    } catch (e) {
      key = (b.innerText || "").trim().slice(0, 40);
    }
    if (!ktXDMSeen.has(key)) {
      ktXDMSeen.add(key);
      ktXDMObserver.observe(b);
      added++;
    }
  });
  bubbles.forEach((b) => {
    if (_hbInViewport(b)) processXDMBubble(b);
  });
}
let ktXObserver = null;
const ktXHashed = /* @__PURE__ */ new Set();
const ktXSeen = /* @__PURE__ */ new Set();
function getTweetId(tweetEl) {
  const link = tweetEl.querySelector("a[href*='/status/']");
  if (!link) return "";
  const m = link.href.match(/\/status\/(\d+)/);
  return m ? m[1] : "";
}
async function processXTweet(tweetEl) {
  const tweetId = getTweetId(tweetEl);
  if (!tweetId) return;
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  const textEl = tweetEl.querySelector("[data-testid='tweetText']");
  const rawText = (textEl?.innerText || textEl?.textContent || "").trim();
  if (rawText.length < 5) return;
  if (!_hbHasKtPrefix(rawText)) return;
  const X_HASH_TEXT_LIMIT = 250;
  const textForHash = rawText.length > X_HASH_TEXT_LIMIT ? rawText.slice(0, X_HASH_TEXT_LIMIT) : rawText;
  const key = tweetId + ":" + textForHash;
  const hash = simHash(key);
  if (!hash) return;
  const _xStatusLink = tweetEl.querySelector("a[href*='/status/']");
  const _xAuthorUrl = _xStatusLink?.href || window.location.href;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(x-tweet id:" + tweetId + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "X-TWEET-SIMHASH",
      tag: "TEXT",
      alt: rawText.slice(0, 200),
      inHeader: false,
      // permalink → urlHint at registration → backend composeXPattern.
      permalink: _xAuthorUrl || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktXHashed.has(hash)) {
    const badgeId = tweetEl.getAttribute(KT_BADGED_ATTR);
    const live = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (live) return;
    tweetEl.removeAttribute(KT_BADGED_ATTR);
  }
  ktXHashed.add(hash);
  if (!textIssuers.length) return;
  const authorUrl = _xAuthorUrl;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const _needsAsync = _hbHasHmacPattern(best.authorizedUrlPatterns);
  if (tweetEl.hasAttribute(KT_BADGED_ATTR) || tweetEl.hasAttribute(KT_VERIFYING_ATTR)) return;
  let _phEl = null;
  if (_needsAsync) {
    tweetEl.setAttribute(KT_VERIFYING_ATTR, "1");
    const anchorEl = tweetEl.querySelector("[data-testid='tweetText']") || tweetEl;
    _phEl = createBadge("\u2026", "pending", best.name, "Weryfikuj\u0119 autora (X/Twitter)\u2026", best.assetLabel || "");
    _hbAttachPlaceholder(anchorEl, _phEl);
  }
  const authorized = await isAuthorizedMaybeHmac(authorUrl, best.authorizedUrlPatterns);
  if (_phEl && _phEl.remove) _phEl.remove();
  tweetEl.removeAttribute(KT_VERIFYING_ATTR);
  if (!tweetEl.isConnected) return;
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Tweet zweryfikowany \u2014 oryginalny post (X/Twitter)" : "Tre\u015B\u0107 rozpoznana, ale profil nieautoryzowany (X/Twitter)");
  setTimeout(() => {
    if (!tweetEl.isConnected) return;
    const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
    const _anchorFinal = tweetEl.querySelector("[data-testid='tweetText']") || tweetEl;
    attachBadgeNearElement(_anchorFinal, _badge, true);
  }, 600);
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(x-tweet:" + tweetId + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanXTimeline() {
  if (window.location.hostname !== "x.com" && window.location.hostname !== "twitter.com") return;
  const tweets = Array.from(document.querySelectorAll("[data-testid='tweet']"));
  if (!ktXObserver) {
    ktXObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processXTweet(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  tweets.forEach((t) => {
    const id = getTweetId(t) || t.getAttribute("aria-labelledby") || "";
    if (!ktXSeen.has(id)) {
      ktXSeen.add(id);
      ktXObserver.observe(t);
      added++;
    }
  });
  tweets.forEach((t) => {
    if (_hbInViewport(t)) processXTweet(t);
  });
}
let ktTelegramObserver = null;
const ktTelegramHashed = /* @__PURE__ */ new Set();
const ktTelegramSeen = /* @__PURE__ */ new Set();
function telegramChannelId() {
  const m = (window.location.hash || "").match(/#(-?\d+)/);
  return m ? m[1] : "";
}
function processTelegramBubble(bubble) {
  const msgId = bubble.dataset.messageId || (bubble.querySelector("[data-message-id]") || {}).dataset?.messageId || "";
  const chId = telegramChannelId();
  if (!msgId || !chId) {
    return;
  }
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  const candidates = [];
  const addText = (sel, type) => {
    bubble.querySelectorAll(sel).forEach((el) => {
      const t = (el.innerText || el.textContent || "").trim();
      if (t.length > 10) candidates.push({ t, type });
    });
  };
  addText("p.site-title", "title");
  addText("p.site-description", "desc");
  addText(".text-content", "text");
  const seenTexts = /* @__PURE__ */ new Set();
  candidates.forEach(({ t: rawText, type }) => {
    if (seenTexts.has(rawText)) return;
    seenTexts.add(rawText);
    if (!_hbHasKtPrefix(rawText)) return;
    const key = chId + ":" + msgId + ":" + rawText;
    const hash = simHash(key);
    if (!hash) return;
    if (!pageHarvest.some((h) => h.hash === hash)) {
      pageHarvest.push({
        hash,
        url: "(telegram ch:" + chId + " msg:" + msgId + ")",
        width: 0,
        height: 0,
        naturalWidth: 0,
        naturalHeight: 0,
        tier: 0,
        source: "TELEGRAM-TEXT-SIMHASH",
        tag: "TEXT",
        alt: rawText.slice(0, 200),
        inHeader: false,
        position: { top: 0, left: 0 },
        ts: Date.now()
      });
    }
    if (ktTelegramHashed.has(hash)) {
      const badgeId = bubble.getAttribute(KT_BADGED_ATTR);
      const badgeStillLive = badgeId && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
      if (badgeStillLive) return;
      bubble.removeAttribute(KT_BADGED_ATTR);
    }
    ktTelegramHashed.add(hash);
    if (!textIssuers.length) return;
    const pageUrl = window.location.href;
    let best = null, bestDist = 999;
    for (const issuer of textIssuers) {
      const thr = issuer.threshold ?? 8;
      for (const reg of issuer.logoHashes || []) {
        const d = hammingDistanceHex(hash, reg);
        if (d <= thr && d < bestDist) {
          best = issuer;
          bestDist = d;
        }
      }
    }
    if (!best) return;
    const authorized = (best.authorizedUrlPatterns || []).some((p) => urlMatchesPattern(pageUrl, p));
    const _humanInfo = _hbDeriveHumanBadge(best, authorized);
    const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
    const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
    const desc = _humanInfo?.tipDesc || (authorized ? "Wiadomo\u015B\u0107 zweryfikowana \u2014 oryginalny post admina (Telegram)" : "Tre\u015B\u0107 rozpoznana, ale kana\u0142 nieautoryzowany (Telegram)");
    if (!bubble.hasAttribute(KT_BADGED_ATTR)) {
      bubble.setAttribute(KT_BADGED_ATTR, "1");
      setTimeout(() => {
        if (!bubble.isConnected) return;
        const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
        bubble.removeAttribute(KT_BADGED_ATTR);
        attachBadgeNearElement(bubble, _badge, true);
      }, 600);
    }
    pushVerification({
      kind,
      issuerName: best.name,
      assetLabel: best.assetLabel || "",
      shortLabel: label,
      desc,
      imageUrl: "(telegram:" + chId + ":" + msgId + ":" + hash + ")",
      context: "web",
      senderEmail: null,
      ts: Date.now()
    });
  });
}
function scanTelegramViewport() {
  if (!issuers.length) {
  }
  const bubbles = Array.from(document.querySelectorAll(".Message.message-list-item"));
  if (!ktTelegramObserver) {
    ktTelegramObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processTelegramBubble(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  bubbles.forEach((b) => {
    const domId = b.id || b.dataset.messageId || "";
    if (!domId || !ktTelegramSeen.has(domId)) {
      if (domId) ktTelegramSeen.add(domId);
      ktTelegramObserver.observe(b);
      added++;
    }
  });
  bubbles.forEach((b) => {
    if (_hbInViewport(b)) processTelegramBubble(b);
  });
}
let ktLinkedInObserver = null;
const ktLinkedInHashed = /* @__PURE__ */ new Set();
const ktLinkedInSeen = /* @__PURE__ */ new Set();
function isLinkedInFeedPage() {
  const path = window.location.pathname;
  if (path.startsWith("/messaging/")) return false;
  if (path.startsWith("/pulse/")) return false;
  return true;
}
function isLinkedInMessagingPage() {
  return window.location.pathname.startsWith("/messaging/thread/");
}
function isLinkedInProfilePage() {
  const path = window.location.pathname;
  if (path.startsWith("/messaging/")) return false;
  if (path.startsWith("/in/me/")) return false;
  return /^\/in\/[^\/]+\/?$/.test(path);
}
function isLinkedInPostExpandable(spanEl) {
  if (!spanEl.closest('li[data-testid="carousel-child-container"]')) return false;
  if (!spanEl.closest('a[href*="/feed/update/"], a[href*="/posts/"]')) return false;
  return true;
}
function getLinkedInProfilePostUrl(spanEl) {
  const a = spanEl.closest('a[href*="/feed/update/"], a[href*="/posts/"]');
  return a && a.href ? a.href : "";
}
function getLinkedInProfileActivityId(spanEl) {
  const url = getLinkedInProfilePostUrl(spanEl);
  const m = url.match(/\/feed\/update\/urn:li:activity:(\d+)\//);
  return m ? m[1] : "";
}
function getLinkedInActivityId(postEl) {
  const urn = postEl.getAttribute("data-urn") || "";
  const m = urn.match(/^urn:li:activity:(\d+)$/);
  return m ? m[1] : "";
}
function isLinkedInPromotedPost(postEl) {
  const subDescSelectors = [
    ".update-components-actor__sub-description",
    ".update-components-actor__supplementary-actor-info",
    ".update-components-actor__meta-link"
  ];
  for (const sel of subDescSelectors) {
    const el = postEl.querySelector(sel);
    if (!el) continue;
    const t = (el.innerText || el.textContent || "").toLowerCase();
    if (t.includes("promoted") || t.includes("sponsored") || t.includes("promowane") || t.includes("reklama")) {
      return true;
    }
  }
  return false;
}
function isLinkedInNestedPost(postEl) {
  const parent = postEl.parentElement ? postEl.parentElement.closest('[data-urn^="urn:li:activity:"]') : null;
  return !!parent;
}
function getLinkedInPostAuthorUrl(postEl, textRef) {
  const candidates = [
    ".update-components-actor__meta-link",
    // primary (current LinkedIn)
    ".update-components-actor a[href*='/in/']",
    ".update-components-actor a[href*='/company/']",
    "a[data-test-app-aware-link][href*='/in/']",
    // generic link wrapper
    "a[data-test-app-aware-link][href*='/company/']"
  ];
  for (const sel of candidates) {
    const el = postEl.querySelector(sel);
    if (el && el.href) return el.href;
  }
  const anchor = textRef || postEl;
  if (anchor && anchor.compareDocumentPosition) {
    const links = Array.from(document.querySelectorAll(
      "a[href*='/in/'], a[href*='/company/']"
    ));
    let best = null;
    for (const a of links) {
      if (!a.href) continue;
      if (a.closest("nav, header, [role='navigation'], .global-nav")) continue;
      const before = anchor.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING;
      if (before) best = a;
    }
    if (best) return best.href;
  }
  let node = postEl, depth = 0;
  while (node && depth < 12) {
    const a = node.querySelector && node.querySelector(
      "a[href*='/in/'], a[href*='/company/']"
    );
    if (a && a.href) return a.href;
    node = node.parentElement;
    depth++;
  }
  return null;
}
function getLinkedInActivityIdFromUrl() {
  const p = window.location.pathname;
  let m = p.match(/\/posts\/[^\/]*-(\d{15,20})-[a-zA-Z0-9]+\/?/);
  if (m) return m[1];
  m = p.match(/\/feed\/update\/urn:li:activity:(\d{15,20})\/?/);
  return m ? m[1] : "";
}
function getLinkedInUsernameFromUrl() {
  const m = window.location.pathname.match(/^\/posts\/([^_\/]+)_/);
  return m ? m[1] : "";
}
async function processLinkedInPost(postEl, opts) {
  opts = opts || {};
  const sourceKind = opts.sourceKind || "FEED";
  const isFeed = sourceKind === "FEED";
  const logId = opts.logId || getLinkedInActivityId(postEl) || "unknown";
  if (isFeed && !getLinkedInActivityId(postEl)) return;
  if (!opts.skipNestedCheck && isLinkedInNestedPost(postEl)) {
    return;
  }
  if (!opts.skipPromotedCheck && isLinkedInPromotedPost(postEl)) {
    return;
  }
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  let rawText;
  if (opts.textOverride != null) {
    rawText = String(opts.textOverride || "").trim();
  } else {
    const textSelectors = [
      ".update-components-text",
      // feed (2024+)
      ".feed-shared-update-v2__description",
      // legacy 1
      ".feed-shared-text",
      // legacy 2
      ".attributed-text-segment-list__content",
      // alternate path
      "[data-testid='expandable-text-box']"
      // single-post (CSS-modules renderer)
    ];
    let textEl = null;
    for (const sel of textSelectors) {
      textEl = postEl.querySelector(sel);
      if (textEl) break;
    }
    if (!textEl) {
      return;
    }
    rawText = (textEl.innerText || textEl.textContent || "").trim();
  }
  if (rawText.length < 20) {
    return;
  }
  if (!_hbHasKtPrefix(rawText)) {
    return;
  }
  const hash = simHash(rawText);
  if (!hash) return;
  const authorUrl = opts.authorUrlOverride || getLinkedInPostAuthorUrl(postEl) || window.location.href;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(linkedin-" + sourceKind.toLowerCase() + " id:" + logId + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "LINKEDIN-" + sourceKind + "-SIMHASH",
      tag: "TEXT",
      alt: rawText.slice(0, 200),
      inHeader: false,
      // permalink → urlHint at registration → backend composeLinkedInPattern.
      permalink: authorUrl || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktLinkedInHashed.has(hash)) {
    const badgeId = postEl.getAttribute(KT_BADGED_ATTR);
    const live = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (live) return;
    postEl.removeAttribute(KT_BADGED_ATTR);
  }
  ktLinkedInHashed.add(hash);
  if (!textIssuers.length) return;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const _needsAsync = _hbHasHmacPattern(best.authorizedUrlPatterns);
  if (postEl.hasAttribute(KT_BADGED_ATTR) || postEl.hasAttribute(KT_VERIFYING_ATTR)) return;
  let _phEl = null;
  if (_needsAsync) {
    postEl.setAttribute(KT_VERIFYING_ATTR, "1");
    const _anchorPh = opts.anchorEl || postEl.querySelector(".update-components-text") || postEl.querySelector(".feed-shared-update-v2__description") || postEl.querySelector(".feed-shared-text") || postEl.querySelector("[data-testid='expandable-text-box']") || postEl;
    _phEl = createBadge("\u2026", "pending", best.name, "Weryfikuj\u0119 autora (LinkedIn)\u2026", best.assetLabel || "");
    _hbAttachPlaceholder(_anchorPh, _phEl);
  }
  const authorized = await isAuthorizedMaybeHmac(authorUrl, best.authorizedUrlPatterns);
  if (_phEl && _phEl.remove) _phEl.remove();
  postEl.removeAttribute(KT_VERIFYING_ATTR);
  if (!postEl.isConnected) return;
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Post zweryfikowany \u2014 oryginalny autor (LinkedIn)" : "Tre\u015B\u0107 rozpoznana, ale profil nieautoryzowany (LinkedIn)");
  setTimeout(() => {
    if (!postEl.isConnected) return;
    const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
    const anchorEl = opts.anchorEl || postEl.querySelector(".update-components-text") || postEl.querySelector(".feed-shared-update-v2__description") || postEl.querySelector(".feed-shared-text") || postEl.querySelector("[data-testid='expandable-text-box']") || postEl;
    attachBadgeNearElement(anchorEl, _badge, true);
  }, 600);
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(linkedin-" + sourceKind.toLowerCase() + ":" + logId + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanLinkedInTimeline() {
  if (window.location.hostname !== "www.linkedin.com") return;
  if (!isLinkedInFeedPage()) return;
  const posts = Array.from(document.querySelectorAll('[data-urn^="urn:li:activity:"]'));
  const _path = window.location.pathname;
  const _isSinglePostUrl = _path.startsWith("/posts/") || _path.startsWith("/feed/update/");
  if (_isSinglePostUrl) {
    scanLinkedInSinglePost();
    return;
  }
  if (posts.length > 0) {
    if (!ktLinkedInObserver) {
      ktLinkedInObserver = new IntersectionObserver((entries) => {
        if (!_hbContextAlive()) return;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          processLinkedInPost(e.target);
        });
      }, { threshold: 0.1 });
    }
    let added = 0;
    posts.forEach((p) => {
      const urn = p.getAttribute("data-urn") || "";
      if (!urn) return;
      if (!ktLinkedInSeen.has(urn)) {
        ktLinkedInSeen.add(urn);
        ktLinkedInObserver.observe(p);
        added++;
      }
    });
    if (added > 0) {
    }
    posts.forEach((p) => {
      if (_hbInViewport(p)) processLinkedInPost(p);
    });
    return;
  }
}
function scanLinkedInSinglePost() {
  const path = window.location.pathname;
  const isPostsUrl = path.startsWith("/posts/");
  const isUpdateUrl = path.startsWith("/feed/update/");
  if (!isPostsUrl && !isUpdateUrl) return;
  const activityId = getLinkedInActivityIdFromUrl();
  if (!activityId) {
    return;
  }
  const textEl = document.querySelector("[data-testid='expandable-text-box']");
  if (!textEl) {
    return;
  }
  const rawText = (textEl.innerText || textEl.textContent || "").trim();
  if (rawText.length < 20) {
    return;
  }
  const containerEl = textEl.closest("p") || textEl.parentElement || textEl;
  let authorUrl;
  if (isPostsUrl) {
    const username = getLinkedInUsernameFromUrl();
    authorUrl = username ? "https://www.linkedin.com/in/" + username + "/" : window.location.href;
  } else {
    authorUrl = getLinkedInPostAuthorUrl(containerEl, textEl) || window.location.href;
    if (authorUrl === window.location.href) {
    }
  }
  processLinkedInPost(containerEl, {
    textOverride: rawText,
    authorUrlOverride: authorUrl,
    sourceKind: "URL",
    logId: activityId,
    anchorEl: textEl,
    skipNestedCheck: true,
    skipPromotedCheck: true
  });
}
function isLinkedInArticlePage() {
  return window.location.pathname.startsWith("/pulse/");
}
function scanLinkedInArticle() {
  if (window.location.hostname !== "www.linkedin.com") return;
  if (!isLinkedInArticlePage()) return;
  const contentEl = document.querySelector(".reader-article-content");
  if (!contentEl) {
    return;
  }
  const rawText = (contentEl.innerText || contentEl.textContent || "").trim();
  if (rawText.length < 20) {
    return;
  }
  const authorUrl = getLinkedInPostAuthorUrl(contentEl, contentEl) || window.location.href;
  if (authorUrl === window.location.href) {
  }
  const m = window.location.pathname.match(/-([a-z0-9]+)\/?$/i);
  const logId = m ? m[1] : "pulse";
  processLinkedInPost(contentEl, {
    textOverride: rawText,
    authorUrlOverride: authorUrl,
    sourceKind: "PULSE",
    logId,
    anchorEl: contentEl,
    skipNestedCheck: true,
    skipPromotedCheck: true
  });
}
let ktLinkedInMsgObserver = null;
const ktLinkedInMsgHashed = /* @__PURE__ */ new Set();
const ktLinkedInMsgSeen = /* @__PURE__ */ new Set();
function getLinkedInMessageUrn(itemEl) {
  return itemEl.getAttribute("data-event-urn") || "";
}
function processLinkedInMessage(itemEl) {
  const msgUrn = getLinkedInMessageUrn(itemEl);
  if (!msgUrn) return;
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  if (window.__ktMsgHashProbe !== false) {
    const _txt = (itemEl.querySelector(".msg-s-event-listitem__body")?.innerText || itemEl.querySelector(".msg-s-event-listitem__body")?.textContent || "").trim();
    if (_txt.length >= 20) {
      const _probeHash = simHash(_txt);
      if (_probeHash) {
        const _matchingByHash = issuers.filter(
          (iss) => (iss.logoHashes || []).some(
            (h) => h === _probeHash || h === "0x" + _probeHash || String(h).toLowerCase().replace(/^0x/, "") === _probeHash.toLowerCase()
          )
        );
        _matchingByHash.forEach((iss, i) => {
        });
      }
    }
  }
  const textEl = itemEl.querySelector(".msg-s-event-listitem__body");
  if (!textEl) {
    return;
  }
  const rawText = (textEl.innerText || textEl.textContent || "").trim();
  if (rawText.length < 20) {
    return;
  }
  if (!_hbHasKtPrefix(rawText)) {
    return;
  }
  const hash = simHash(rawText);
  if (!hash) return;
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(linkedin-msg urn:" + msgUrn.slice(0, 60) + "...)",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "LINKEDIN-MSG-SIMHASH",
      tag: "TEXT",
      alt: rawText.slice(0, 200),
      inHeader: false,
      // Thread URL (/messaging/thread/URN/) → urlHint → backend pins the
      // thread-level pattern linkedin.com/messaging/thread/<URN>/* (STRONG).
      // No author handle here — anti-spoof is the thread URN, not a person.
      permalink: window.location.href || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktLinkedInMsgHashed.has(hash)) {
    const badgeId = itemEl.getAttribute(KT_BADGED_ATTR);
    const live = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (live) return;
    itemEl.removeAttribute(KT_BADGED_ATTR);
  }
  ktLinkedInMsgHashed.add(hash);
  if (!textIssuers.length) return;
  const pageUrl = window.location.href;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const authorized = (best.authorizedUrlPatterns || []).some((p) => urlMatchesPattern(pageUrl, p));
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Wiadomo\u015B\u0107 zweryfikowana \u2014 autoryzowana w tej konwersacji (LinkedIn)" : "Tre\u015B\u0107 rozpoznana, ale ta konwersacja nie jest autoryzowana (LinkedIn)");
  if (!itemEl.hasAttribute(KT_BADGED_ATTR)) {
    itemEl.setAttribute(KT_BADGED_ATTR, "1");
    setTimeout(() => {
      if (!itemEl.isConnected) return;
      const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
      itemEl.removeAttribute(KT_BADGED_ATTR);
      attachBadgeNearElement(textEl, _badge, true);
    }, 600);
  }
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(linkedin-msg:" + msgUrn.slice(0, 40) + ":" + hash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanLinkedInMessages() {
  if (window.location.hostname !== "www.linkedin.com") return;
  if (!isLinkedInMessagingPage()) return;
  const items = Array.from(document.querySelectorAll(".msg-s-event-listitem[data-event-urn]"));
  if (!ktLinkedInMsgObserver) {
    ktLinkedInMsgObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processLinkedInMessage(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  items.forEach((item) => {
    const urn = item.getAttribute("data-event-urn") || "";
    if (!urn) return;
    if (!ktLinkedInMsgSeen.has(urn)) {
      ktLinkedInMsgSeen.add(urn);
      ktLinkedInMsgObserver.observe(item);
      added++;
    }
  });
  if (added > 0) {
  }
  items.forEach((item) => {
    if (_hbInViewport(item)) processLinkedInMessage(item);
  });
}
let ktLinkedInProfileObserver = null;
const ktLinkedInProfileHashed = /* @__PURE__ */ new Set();
const ktLinkedInProfileSeen = /* @__PURE__ */ new Set();
async function processLinkedInProfilePost(spanEl) {
  if (!isLinkedInPostExpandable(spanEl)) return;
  const activityId = getLinkedInProfileActivityId(spanEl);
  const rawText = (spanEl.innerText || spanEl.textContent || "").trim();
  if (rawText.length < 20) {
    return;
  }
  if (!_hbHasKtPrefix(rawText)) {
    return;
  }
  const textIssuers = issuers.filter((i) => (i.assetLabel || "").startsWith("[TEXT]") || (i.assetLabel || "").startsWith("[TXT]") || (i.assetLabel || "").startsWith("[HUMAN] "));
  const hash = simHash(rawText);
  if (!hash) return;
  const harvestKey = activityId ? "urn:li:activity:" + activityId : "text:" + rawText.slice(0, 40);
  if (!pageHarvest.some((h) => h.hash === hash)) {
    pageHarvest.push({
      hash,
      url: "(linkedin-profile " + harvestKey + ")",
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: "LINKEDIN-PROFILE-SIMHASH",
      tag: "TEXT",
      alt: rawText.slice(0, 200),
      inHeader: false,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  if (ktLinkedInProfileHashed.has(hash)) {
    const badgeId = spanEl.getAttribute(KT_BADGED_ATTR);
    const live = badgeId && badgeId !== "1" && document.querySelector("[data-kt-badge-id='" + badgeId + "']")?.isConnected;
    if (live) return;
    spanEl.removeAttribute(KT_BADGED_ATTR);
  }
  ktLinkedInProfileHashed.add(hash);
  if (!textIssuers.length) return;
  const pageUrl = window.location.href;
  let best = null, bestDist = 999;
  for (const issuer of textIssuers) {
    const thr = issuer.threshold ?? 10;
    for (const reg of issuer.logoHashes || []) {
      const d = hammingDistanceHex(hash, reg);
      if (d <= thr && d < bestDist) {
        best = issuer;
        bestDist = d;
      }
    }
  }
  if (!best) return;
  const _needsAsync = _hbHasHmacPattern(best.authorizedUrlPatterns);
  if (spanEl.hasAttribute(KT_BADGED_ATTR) || spanEl.hasAttribute(KT_VERIFYING_ATTR)) return;
  let _phEl = null;
  if (_needsAsync) {
    spanEl.setAttribute(KT_VERIFYING_ATTR, "1");
    _phEl = createBadge("\u2026", "pending", best.name, "Weryfikuje autora (LinkedIn)...", best.assetLabel || "");
    _hbAttachPlaceholder(spanEl, _phEl);
  }
  const authorized = await isAuthorizedMaybeHmac(pageUrl, best.authorizedUrlPatterns);
  if (_phEl && _phEl.remove) _phEl.remove();
  spanEl.removeAttribute(KT_VERIFYING_ATTR);
  if (!spanEl.isConnected) return;
  const _humanInfo = _hbDeriveHumanBadge(best, authorized);
  const kind = _humanInfo?.kind || (authorized ? "ok" : "bad");
  const label = _humanInfo?.shortLabel || (authorized ? "OK" : "!");
  const desc = _humanInfo?.tipDesc || (authorized ? "Post zweryfikowany - autoryzowany na profilu autora (LinkedIn)" : "Tresc rozpoznana, ale ten profil nie jest autoryzowany (LinkedIn)");
  setTimeout(() => {
    if (!spanEl.isConnected) return;
    const _badge = createBadge(label, kind, best.name, desc, best.assetLabel || "");
    attachBadgeNearElement(spanEl, _badge, true);
  }, 600);
  pushVerification({
    kind,
    issuerName: best.name,
    assetLabel: best.assetLabel || "",
    shortLabel: label,
    desc,
    imageUrl: "(linkedin-profile:" + (activityId || hash) + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
function scanLinkedInProfile() {
  if (window.location.hostname !== "www.linkedin.com") return;
  if (!isLinkedInProfilePage()) return;
  const candidates = Array.from(document.querySelectorAll(
    'li[data-testid="carousel-child-container"] [data-testid="expandable-text-box"]'
  ));
  const items = candidates.filter(isLinkedInPostExpandable);
  if (!ktLinkedInProfileObserver) {
    ktLinkedInProfileObserver = new IntersectionObserver((entries) => {
      if (!_hbContextAlive()) return;
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        processLinkedInProfilePost(e.target);
      });
    }, { threshold: 0.1 });
  }
  let added = 0;
  items.forEach((item) => {
    const activityId = getLinkedInProfileActivityId(item);
    const seenKey = activityId || "text:" + (item.firstChild?.nodeValue || "").slice(0, 40);
    if (!seenKey) return;
    if (!ktLinkedInProfileSeen.has(seenKey)) {
      ktLinkedInProfileSeen.add(seenKey);
      ktLinkedInProfileObserver.observe(item);
      added++;
    }
  });
  if (added > 0) {
  }
  items.forEach((item) => {
    if (_hbInViewport(item)) processLinkedInProfilePost(item);
  });
}
function extractFacebookPermalink(el) {
  if (!el) return null;
  const container = el.closest("article[role='article']") || el.closest("[role='article']") || el;
  const anchors = container.querySelectorAll("a[href]");
  for (let i = 0; i < anchors.length; i++) {
    const href = anchors[i].getAttribute("href") || "";
    if (/\/groups\/\d+\/(?:posts|permalink)\/\d+/.test(href) || // group post
    /\/permalink\.php\?[^#]*\bstory_fbid=/.test(href) || // permalink.php
    /^\/[^/?#]+\/posts\//.test(href) || // wall/page post
    /^\/[^/?#]+\/(?:photos|videos)\//.test(href)) {
      try {
        return new URL(href, window.location.origin).href;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}
async function scanSocialText() {
  const hostname = window.location.hostname;
  if (!SOCIAL_PLATFORMS_CONFIG[hostname]) return;
  if (SOCIAL_PLATFORMS_CONFIG[hostname].isTelegram) return;
  if (SOCIAL_PLATFORMS_CONFIG[hostname].isLinkedInFeed) return;
  if (SOCIAL_PLATFORMS_CONFIG[hostname].isX) return;
  const textIssuers = issuers.filter((iss) => (iss.assetLabel || "").startsWith("[TEXT]") || (iss.assetLabel || "").startsWith("[TXT]") || (iss.assetLabel || "").startsWith("[HUMAN] "));
  if (!textIssuers.length) {
    return;
  }
  const extracted = extractSocialPostText();
  if (!extracted) {
    return;
  }
  const { text, label } = extracted;
  let badgeEl = extracted.badgeEl;
  if (!_hbHasKtPrefix(text)) {
    return;
  }
  const textHash = simHash(text);
  if (!textHash) {
    return;
  }
  const _isFacebook = hostname === "www.facebook.com";
  const _fbPermalink = _isFacebook ? extractFacebookPermalink(badgeEl) : null;
  const _txtSource = _isFacebook ? "FACEBOOK-TEXT-SIMHASH" : "SOCIAL-TEXT-SIMHASH";
  if (!pageHarvest.some((h) => h.hash === textHash)) {
    pageHarvest.push({
      hash: textHash,
      url: (_fbPermalink ? "(facebook-text) " : "(social-text-simhash) ") + label,
      width: 0,
      height: 0,
      naturalWidth: 0,
      naturalHeight: 0,
      tier: 0,
      source: _txtSource,
      tag: "TEXT",
      alt: text.slice(0, 200),
      inHeader: false,
      permalink: _fbPermalink || void 0,
      position: { top: 0, left: 0 },
      ts: Date.now()
    });
  }
  const pageUrl = _fbPermalink || window.location.href;
  let bestMatch = null;
  let bestPriority = 3;
  let bestDist = 999;
  for (const issuer2 of textIssuers) {
    const threshold = issuer2.threshold ?? 8;
    const distances = (issuer2.logoHashes || []).map((h) => ({
      registered: h,
      dist: hammingDistanceHex(textHash, h)
    }));
    const best = distances.sort((a, b) => a.dist - b.dist)[0];
    if (best && best.dist <= threshold) {
    }
    if (!best || best.dist > threshold) continue;
    const pageAuthorized2 = (issuer2.authorizedUrlPatterns || []).some(
      (p) => urlMatchesPattern(pageUrl, p)
    );
    if (best.dist === 0 && !pageAuthorized2) {
      continue;
    }
    const prio = pageAuthorized2 ? 0 : 2;
    if (prio < bestPriority || prio === bestPriority && best.dist < bestDist) {
      bestMatch = { issuer: issuer2, dist: best.dist, pageAuthorized: pageAuthorized2 };
      bestPriority = prio;
      bestDist = best.dist;
    }
  }
  if (!bestMatch) {
    return;
  }
  const { issuer, pageAuthorized } = bestMatch;
  let shortLabel, kind, tipDesc;
  const _humanInfo = _hbDeriveHumanBadge(issuer, pageAuthorized);
  if (_humanInfo) {
    ({ kind, shortLabel, tipDesc } = _humanInfo);
  } else if (pageAuthorized) {
    shortLabel = "OK";
    kind = "ok";
    tipDesc = hbT("post_ok", { x: label });
  } else {
    shortLabel = "!";
    kind = "bad";
    tipDesc = hbT("post_unauth", { x: label });
  }
  if (!badgeEl) {
    const hostname2 = window.location.hostname;
    const isImagePlatform = hostname2 === "www.instagram.com" || hostname2 === "www.tiktok.com";
    const fallbackTargets = isImagePlatform ? [
      "article img[srcset]",
      // post image — best position
      "article img",
      "div[role='presentation'] img",
      "article",
      "main article",
      "section main"
    ] : [
      "article",
      "main article",
      "section main",
      "main",
      "[role='main']"
    ];
    for (const sel of fallbackTargets) {
      try {
        const el = document.querySelector(sel);
        if (el) {
          badgeEl = el;
          break;
        }
      } catch (e) {
      }
    }
    if (badgeEl) {
    } else {
    }
  }
  if (badgeEl && !badgeEl.hasAttribute(KT_BADGED_ATTR)) {
    badgeEl.setAttribute(KT_BADGED_ATTR, "1");
    const _badge = createBadge(shortLabel, kind, issuer.name, tipDesc, issuer.assetLabel || "");
    const isFacebook = window.location.hostname === "www.facebook.com";
    const hasPerPostContainer = isFacebook && (badgeEl.matches?.("[data-ad-comet-preview='message']") || badgeEl.matches?.("[data-ad-preview='message']") || badgeEl.matches?.("[data-testid='post_message']") || badgeEl.closest?.("[data-ad-comet-preview='message']") || badgeEl.closest?.("[data-ad-preview='message']"));
    if (hasPerPostContainer) {
      badgeEl.removeAttribute(KT_BADGED_ATTR);
      attachBadgeNearElement(badgeEl, _badge, true);
    } else {
      _badge.style.position = "fixed";
      _badge.style.left = "50%";
      _badge.style.top = "50%";
      _badge.style.transform = "translate(-50%, -50%)";
      _badge.style.zIndex = "2147483647";
      document.body.appendChild(_badge);
    }
  }
  pushVerification({
    kind,
    issuerName: issuer.name,
    assetLabel: issuer.assetLabel || "",
    shortLabel,
    desc: tipDesc,
    imageUrl: "(text-simhash:" + textHash + ")",
    context: "web",
    senderEmail: null,
    ts: Date.now()
  });
}
async function scanPage() {
  if (!_hbContextAlive()) return;
  D.scanCount++;
  pageHarvest.length = 0;
  await refreshHbToken();
  if (!issuers.length) {
    if (KT_MESSAGING_HOSTS.has(window.location.hostname)) {
    } else {
      return;
    }
  }
  if (window.location.hostname === "mail.google.com") {
    const rawBodyEl = document.querySelector(".a3s.aiL") || document.querySelector(".ii.gt");
    const fwdBodyEl = rawBodyEl ? extractForwardedBodyEl(rawBodyEl) : null;
    if (fwdBodyEl) {
      window._ktFwdBodyEl = fwdBodyEl;
    } else {
      window._ktFwdBodyEl = null;
    }
  }
  if (window.location.hostname === "mail.google.com") {
    await scanGmailSignature();
  }
  if (window.location.hostname === "mail.google.com" && pageVerifications.length > 0) {
    await scanGmailLinks();
  }
  if (window.location.hostname === "mail.google.com" && pageVerifications.length === 0) {
    await scanGmailText();
  }
  await scanSocialText();
  if (window.location.hostname === "web.telegram.org") {
    scanTelegramViewport();
  }
  if (window.location.hostname === "www.facebook.com" || window.location.hostname === "www.messenger.com") {
    scanMessengerViewport();
  }
  if (window.location.hostname === "web.whatsapp.com") {
    scanWhatsAppViewport();
  }
  if (window.location.hostname === "x.com" || window.location.hostname === "twitter.com") {
    if (window.location.pathname.startsWith("/i/chat/")) {
      scanXDM();
    } else {
      scanXTimeline();
    }
  }
  if (window.location.hostname === "www.linkedin.com") {
    scanLinkedInTimeline();
  }
  if (window.location.hostname === "www.linkedin.com") {
    scanLinkedInMessages();
  }
  if (window.location.hostname === "www.linkedin.com") {
    scanLinkedInProfile();
  }
  if (window.location.hostname === "www.linkedin.com") {
    scanLinkedInArticle();
  }
}
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "GET_PAGE_STATUS") {
    let consumerMail = null;
    try {
      if (location.hostname === "mail.google.com") {
        const sndr = getGmailSender();
        const dom = sndr ? String(sndr).toLowerCase().split("@").pop() : null;
        if (dom && isConsumerMailDomain(dom)) consumerMail = dom;
      }
    } catch (e) {
    }
    sendResponse({
      ok: true,
      url: window.location.href,
      verifications: pageVerifications,
      unmatched: pageUnmatched,
      issuerCount: typeof issuers !== "undefined" ? issuers.length : 0,
      consumerMail
    });
    return true;
  }
  if (msg?.type === "GET_HARVEST_DATA") {
    const verifiedHashes = new Set(pageVerifications.map((v) => v.imageUrl).filter(Boolean));
    const sortedHarvest = [...pageHarvest].sort((a, b) => {
      const isLogoSource = /^(JSON-LD-LOGO|OG-IMAGE|INLINE-SVG|SHADOW-BG|EMAIL-SIGNATURE|TEXT-SIMHASH)$/.test(a.source);
      const isLogoSourceB = /^(JSON-LD-LOGO|OG-IMAGE|INLINE-SVG|SHADOW-BG|EMAIL-SIGNATURE|TEXT-SIMHASH)$/.test(b.source);
      const isSmallHeader = (x) => x.inHeader && Math.max(x.width || 0, x.naturalWidth || 0) <= 300;
      const priA = verifiedHashes.has(a.url) ? 0 : isLogoSource ? 1 : isSmallHeader(a) ? 2 : a.inHeader ? 3 : a.tier === 1 ? 4 : 5;
      const priB = verifiedHashes.has(b.url) ? 0 : isLogoSourceB ? 1 : isSmallHeader(b) ? 2 : b.inHeader ? 3 : b.tier === 1 ? 4 : 5;
      if (priA !== priB) return priA - priB;
      if (priA >= 4 && a.tier !== b.tier) return a.tier - b.tier;
      return (a.ts || 0) - (b.ts || 0);
    });
    sendResponse({
      ok: true,
      url: window.location.href,
      images: sortedHarvest,
      totalScanned: pageHarvest.length,
      matchedCount: pageVerifications.length
    });
    return true;
  }
  if (msg?.type === "RESCAN") {
    (async () => {
      document.querySelectorAll("[" + KT_ATTR + "]").forEach((el) => el.removeAttribute(KT_ATTR));
      document.querySelectorAll("[" + KT_BADGED_ATTR + "]").forEach((el) => el.removeAttribute(KT_BADGED_ATTR));
      document.querySelectorAll("[" + KT_BG_ATTR + "]").forEach((el) => el.removeAttribute(KT_BG_ATTR));
      document.querySelectorAll(".kt-badge").forEach((el) => el.remove());
      pageVerifications.length = 0;
      pageHarvest.length = 0;
      ktTelegramHashed.clear();
      ktTelegramSeen.clear();
      ktTelegramObserver = null;
      ktMessengerHashed.clear();
      ktMessengerSeen.clear();
      ktMessengerObserver = null;
      ktWhatsAppHashed.clear();
      ktWhatsAppSeen.clear();
      ktWhatsAppObserver = null;
      ktXHashed.clear();
      ktXSeen.clear();
      ktXObserver = null;
      ktXDMHashed.clear();
      ktXDMSeen.clear();
      ktXDMObserver = null;
      _hbHmacVerifyCache.clear();
      document.querySelectorAll("[" + KT_VERIFYING_ATTR + "]").forEach((el) => el.removeAttribute(KT_VERIFYING_ATTR));
      ktLinkedInHashed.clear();
      ktLinkedInSeen.clear();
      ktLinkedInObserver = null;
      ktLinkedInMsgHashed.clear();
      ktLinkedInMsgSeen.clear();
      ktLinkedInMsgObserver = null;
      ktLinkedInProfileHashed.clear();
      ktLinkedInProfileSeen.clear();
      ktLinkedInProfileObserver = null;
      pageUnmatched = 0;
      badgedHashes.clear();
      badgedIssuers.clear();
      const _rescanT0 = Date.now();
      issuers = await loadIssuers();
      await scanPage();
      if (window.location.hostname === "web.telegram.org" && issuers.length) {
        document.querySelectorAll(".Message.message-list-item").forEach((b) => {
          const r = b.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) processTelegramBubble(b);
        });
      }
      if ((window.location.hostname === "www.facebook.com" || window.location.hostname === "www.messenger.com") && issuers.length) {
        const panel = document.querySelector('[role="main"]');
        if (panel) {
          const fpSelector = "div[dir='auto']." + MESSENGER_MSG_CLASS_FP.join(".");
          panel.querySelectorAll(fpSelector).forEach((msg2) => {
            const r = msg2.getBoundingClientRect();
            if (r.bottom > 0 && r.top < window.innerHeight) processMessengerMessage(msg2);
          });
        }
      }
      if (window.location.hostname === "www.linkedin.com" && issuers.length) {
        document.querySelectorAll('[data-urn^="urn:li:activity:"]').forEach((post) => {
          const r = post.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) processLinkedInPost(post);
        });
      }
      if (window.location.hostname === "www.linkedin.com" && window.location.pathname.startsWith("/messaging/thread/") && issuers.length) {
        document.querySelectorAll(".msg-s-event-listitem[data-event-urn]").forEach((item) => {
          const r = item.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) processLinkedInMessage(item);
        });
      }
      if (window.location.hostname === "www.linkedin.com" && isLinkedInProfilePage() && issuers.length) {
        document.querySelectorAll(
          'li[data-testid="carousel-child-container"] [data-testid="expandable-text-box"]'
        ).forEach((span) => {
          if (!isLinkedInPostExpandable(span)) return;
          const r = span.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) processLinkedInProfilePost(span);
        });
      }
      sendResponse({ ok: true, verifications: pageVerifications.length });
    })();
    return true;
  }
});
let scanTimer = null;
const observer = new MutationObserver((mutations) => {
  const isOwnMutation = mutations.every((m) => {
    if (m.type === "childList") {
      const nodes = [...Array.from(m.addedNodes), ...Array.from(m.removedNodes)];
      return nodes.length > 0 && nodes.every(
        (n) => n.nodeType === 1 && n.classList && n.classList.contains("kt-badge")
      );
    }
    if (m.type === "attributes" && m.attributeName && m.attributeName.startsWith("data-kt-")) {
      return true;
    }
    return false;
  });
  if (isOwnMutation) return;
  clearTimeout(scanTimer);
  const debounce = KT_MESSAGING_HOSTS.has(window.location.hostname) ? 2e3 : KT_DEBOUNCE_MS;
  scanTimer = setTimeout(scanPage, debounce);
});
let _lastGmailUrl = location.href;
setInterval(() => {
  const cur = location.href;
  if (cur !== _lastGmailUrl) {
    _lastGmailUrl = cur;
    document.querySelectorAll("[" + KT_ATTR + "]").forEach((el) => {
      el.removeAttribute(KT_ATTR);
    });
    document.querySelectorAll("[" + KT_BADGED_ATTR + "]").forEach((el) => {
      el.removeAttribute(KT_BADGED_ATTR);
    });
    document.querySelectorAll("[" + KT_BG_ATTR + "]").forEach((el) => {
      el.removeAttribute(KT_BG_ATTR);
    });
    document.querySelectorAll(".kt-badge").forEach((el) => el.remove());
    pageVerifications.length = 0;
    pageHarvest.length = 0;
    pageUnmatched = 0;
    badgedHashes.clear();
    badgedIssuers.clear();
  }
}, 500);
(async () => {
  issuers = await loadIssuers();
  if (!issuers.length && !KT_MESSAGING_HOSTS.has(window.location.hostname)) {
    return;
  }
  await scanPage();
  if (KT_MESSAGING_HOSTS.has(window.location.hostname)) {
    (async () => {
      try {
        if (!issuers.length) {
          await new Promise((resolve) => chrome.runtime.sendMessage({ type: "CLEAR_CACHE" }, resolve));
          issuers = await loadIssuers();
        }
        if (!issuers.length) return;
        await new Promise((resolve) => {
          let quietTimer = null;
          const isTelegram = window.location.hostname === "web.telegram.org";
          const bubbleSel = isTelegram ? ".Message.message-list-item" : "[role='row']";
          const mo = new MutationObserver(() => {
            clearTimeout(quietTimer);
            quietTimer = setTimeout(() => {
              mo.disconnect();
              resolve();
            }, 800);
          });
          const isWhatsApp = window.location.hostname === "web.whatsapp.com";
          const container = isTelegram ? document.querySelector(".bubbles-inner, .messages-container, #column-center") || document.body : isWhatsApp ? document.querySelector("#main, [data-testid='conversation-panel-messages']") || document.body : document.querySelector("[role='main'], [data-pagelet='MWChatThread']") || document.body;
          mo.observe(container, { childList: true, subtree: true });
          setTimeout(() => {
            mo.disconnect();
            resolve();
          }, 6e3);
          quietTimer = setTimeout(() => {
            mo.disconnect();
            resolve();
          }, 800);
        });
        if (window.location.hostname === "web.telegram.org") {
          ktTelegramHashed.clear();
          document.querySelectorAll(".kt-badge[data-kt-source='text']").forEach((el) => el.remove());
          await scanPage();
        } else if (window.location.hostname === "www.facebook.com" || window.location.hostname === "www.messenger.com") {
          document.querySelectorAll("[" + KT_BADGED_ATTR + "]").forEach((el) => el.removeAttribute(KT_BADGED_ATTR));
          document.querySelectorAll(".kt-badge").forEach((el) => el.remove());
          ktMessengerHashed.clear();
          ktMessengerSeen.clear();
          const panel = document.querySelector('[role="main"]');
          if (panel) {
            const fpSelector = "div[dir='auto']." + MESSENGER_MSG_CLASS_FP.join(".");
            panel.querySelectorAll(fpSelector).forEach((msg) => {
              const r = msg.getBoundingClientRect();
              if (r.bottom > 0 && r.top < window.innerHeight) processMessengerMessage(msg);
            });
          }
        }
        if (window.location.hostname === "web.whatsapp.com") {
          document.querySelectorAll("[data-id]").forEach((b) => {
            const r = b.getBoundingClientRect();
            if (r.bottom > 0 && r.top < window.innerHeight) processWhatsAppBubble(b);
          });
        }
        if (window.location.hostname === "x.com" || window.location.hostname === "twitter.com") {
          document.querySelectorAll("[data-testid='tweet']").forEach((t) => {
            const r = t.getBoundingClientRect();
            if (r.bottom > 0 && r.top < window.innerHeight) processXTweet(t);
          });
        }
      } catch (e) {
      }
    })();
  }
  observer.observe(document.body, observerConfig);
})();
