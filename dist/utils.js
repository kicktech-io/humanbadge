function hammingDistanceHex(a, b) {
  if (!a || !b || a.length !== b.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < a.length; i++) {
    const x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    dist += (x.toString(2).match(/1/g) || []).length;
  }
  return dist;
}
function fnv1a64(str) {
  let h0 = 2166136261, h1 = 3421674724;
  const p0 = 16777619, p1 = 256;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h0 ^= c;
    const tmp = Math.imul(h0, p0);
    h1 = Math.imul(h1, p0) + Math.imul(h0, p1) + (tmp >>> 0 > 4294967295 ? 1 : 0) | 0;
    h0 = tmp | 0;
  }
  return [h1, h0];
}
function normalizeTextForHash(text) {
  let t = text;
  t = t.replace(/<[^>]+>/g, " ");
  t = t.replace(/&nbsp;/gi, " ");
  t = t.replace(/&[a-z]+;/gi, " ").replace(/&#x?[0-9a-f]+;/gi, " ");
  t = t.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF\u00AD\u034F\u061C\u2060-\u2064\u2066-\u2069\u00A0]/g, " ");
  t = t.replace(/-{3,}\s*(forwarded|przekazan|przesłan|oryginalna|wiadomość|message)[\s\S]{0,30}-{3,}/gi, " ");
  t = t.replace(/^[ \t]*(from|to|date|subject|cc|bcc|sent|od|do|data|temat|wysłano|nadawca|odbiorca)\s*:.*$/gim, " ");
  t = t.replace(/^(on |dnia |w dniu ).{10,80}(wrote|napisał|napisała):\s*$/gim, " ");
  t = t.replace(/^>\s?/gm, "");
  t = t.replace(/\*+/g, " ");
  t = t.replace(/_+/g, " ");
  t = t.replace(/^\s*[•·▪▸►‣⁃]\s*/gm, " ");
  t = t.replace(/^\s*[-–—]\s+/gm, " ");
  const pl = {
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
    "\u017B": "Z"
  };
  t = t.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => pl[c] || c);
  t = t.toLowerCase();
  t = t.replace(/\bkt-([23456789abcdefghjkmnpqrstvwxyz]{6})\b/g, "hbtoken$1");
  t = t.replace(/https?:\/\/\S+/g, " ");
  t = t.replace(/www\.\S+/g, " ");
  t = t.replace(/\S+@\S+\.\S+/g, " ");
  t = t.replace(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/g, " ");
  t = t.replace(/\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/g, " ");
  t = t.replace(/(pon|wt|śr|czw|pt|sob|ndz|mon|tue|wed|thu|fri|sat|sun)[.,]?\s*\d{1,2}\s+\w{3,10}\s+\d{4}/gi, " ");
  t = t.replace(/[A-Z]{0,4}:?[A-Z0-9]{2,}[-][A-Z0-9-]+/gi, " ");
  t = t.replace(/\d[\d\s,.]*\s*(zł|pln|eur|usd|\$|€)/gi, " ");
  t = t.replace(/\b\d[\d\s:.,/-]*\d\b/g, " ");
  t = t.replace(/\b\d+\b/g, " ");
  t = t.replace(/\(?\+?\d{1,3}\)?\s*\d[\d\s-]{5,}/g, " ");
  t = t.replace(/[^\x20-\x7E]/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}
function textShingles(text, n) {
  n = n || 3;
  const words = text.split(" ").filter((w) => w.length > 1);
  if (words.length < n) return [words.join(" ")];
  const shingles = [];
  for (let i = 0; i <= words.length - n; i++) {
    shingles.push(words.slice(i, i + n).join(" "));
  }
  return shingles;
}
function simHash(text) {
  const normalized = normalizeTextForHash(text);
  if (!normalized || normalized.length < 10) return null;
  const shingles = textShingles(normalized, 3);
  const v = new Array(64).fill(0);
  for (const shingle of shingles) {
    const [hi2, lo2] = fnv1a64(shingle);
    for (let i = 0; i < 32; i++) {
      v[i] += lo2 & 1 << i ? 1 : -1;
      v[i + 32] += hi2 & 1 << i ? 1 : -1;
    }
  }
  let lo = 0, hi = 0;
  for (let i = 0; i < 32; i++) {
    if (v[i] > 0) lo |= 1 << i;
    if (v[i + 32] > 0) hi |= 1 << i;
  }
  const hexHi = (hi >>> 0).toString(16).padStart(8, "0");
  const hexLo = (lo >>> 0).toString(16).padStart(8, "0");
  return hexHi + hexLo;
}
function urlMatchesPattern(url, pattern) {
  try {
    let normUrl = url.replace(/^https?:\/\//, "").replace(/^\/\//, "").replace(/^www\./, "");
    let normPattern = pattern.replace(/^https?:\/\//, "").replace(/^\/\//, "").replace(/^www\./, "");
    const escaped = normPattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\/\*/g, "(?:/.*)?").replace(/\*/g, ".*");
    const re = new RegExp("^" + escaped, "i");
    return re.test(normUrl);
  } catch {
    return false;
  }
}
function hostnameFromUrl(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}
function imageUrlMatchesCdnRoot(imageUrl, cdnRootPattern) {
  const hostname = hostnameFromUrl(imageUrl);
  if (!hostname) return false;
  try {
    const escaped = cdnRootPattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    const re = new RegExp("^" + escaped + "$");
    return re.test(hostname);
  } catch {
    return false;
  }
}
function verifyUsage(pageUrl, imageUrl, pagePatterns, cdnRoots) {
  const pageOk = (pagePatterns || []).some(
    (p) => urlMatchesPattern(pageUrl, p)
  );
  if (pageOk) return "authorized";
  const cdnOk = (cdnRoots || []).some(
    (r) => imageUrlMatchesCdnRoot(imageUrl, r)
  );
  if (cdnOk) return "cdn_only";
  return "unauthorized";
}
function extractHmacMarker(pattern) {
  const m = String(pattern || "").match(/hmac\.([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}
function extractCandidateForPattern(url, pattern) {
  let path, search, host;
  try {
    const u = new URL(String(url));
    path = u.pathname;
    search = u.searchParams;
    host = u.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
  const norm = (s) => s ? String(s).trim().toLowerCase() : null;
  if (/profile\.php\*id=hmac\./.test(pattern)) {
    return norm(search.get("id"));
  }
  if (/\/posts\/hmac\./.test(pattern) && host === "linkedin.com") {
    const m = path.match(/^\/posts\/([^_/]+)_/);
    return m ? norm(m[1]) : null;
  }
  if (/\/in\/hmac\./.test(pattern)) {
    const m = path.match(/^\/in\/([^/]+)/);
    return m ? norm(m[1]) : null;
  }
  if (/^facebook\.com\/hmac\./.test(pattern) || /facebook\.com\/hmac\.[^/]+\/posts/.test(pattern)) {
    const m = path.match(/^\/([^/]+)\/posts\//);
    return m ? norm(m[1]) : null;
  }
  if (/^x\.com\/hmac\./.test(pattern) || /^twitter\.com\/hmac\./.test(pattern)) {
    const m = path.match(/^\/([^/]+)\/status\/\d+/);
    return m && m[1] !== "i" ? norm(m[1]) : null;
  }
  return null;
}
