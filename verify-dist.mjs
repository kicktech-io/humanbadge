#!/usr/bin/env node
/**
 * verify-dist.mjs — pre-publish validation gate for the HumanBadge
 * extension dist/ artifact.
 *
 * What this script enforces:
 *   1. dist/ inventory: required files present, no unexpected files
 *   2. manifest.json sanity: MV3, version present, permissions minimal,
 *      CSP restrictive, no host_permissions widening beyond *://*\/*
 *   3. Marker-strip integrity: no `@hb-strip:` regions leaked into dist/
 *   4. No external font hosts (fonts.googleapis.com, gstatic.com) —
 *      fonts must be self-hosted under dist/fonts/
 *   5. No internal/vendor URLs in code (kicktech2-console-ui.vercel.app
 *      and other staging/dev hostnames must not be present)
 *   6. No console.* / debugger / eval residue in production JS
 *   7. No obvious secrets (API keys, JWTs, private keys, bearer tokens)
 *   8. Privacy URL canonicalization: popup.js must point at
 *      https://www.kicktech.io/privacy (not verify.kicktech.io/privacy)
 *   9. Fonts present: 5 woff2 files + 2 OFL license files under dist/fonts/
 *
 * Usage: node verify-dist.mjs [optional path to repo root, default: cwd]
 * Exit code: 0 = all checks pass, 1 = any check failed.
 *
 * This script is intentionally a single file with no dependencies beyond
 * Node 18+ standard library. It is published as part of the public repo
 * so independent auditors can run it themselves.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ──────────────────────────────────────────────────────────────────────
// CLI / setup
// ──────────────────────────────────────────────────────────────────────
const repoRoot = resolve(process.argv[2] || process.cwd());
const distDir = join(repoRoot, "dist");

if (!existsSync(distDir)) {
  fail(`dist/ not found at ${distDir}`);
  process.exit(1);
}

const results = { pass: [], fail: [], warn: [] };

function ok(msg)   { results.pass.push(msg); }
function warn(msg) { results.warn.push(msg); }
function fail(msg) { results.fail.push(msg); }

// ──────────────────────────────────────────────────────────────────────
// 1. dist/ inventory
// ──────────────────────────────────────────────────────────────────────
const REQUIRED_FILES = [
  "manifest.json",
  "background.js",
  "content.js",
  "popup.js",
  "popup.html",
  "tokens.js",
  "utils.js",
  "overlay.css",
  "icon16.png",
  "icon48.png",
  "icon128.png",
];

const ALLOWED_TOP_PATTERNS = [
  /^manifest\.json$/,
  /^background\.js$/,
  /^content\.js$/,
  /^popup\.js$/,
  /^popup\.html$/,
  /^tokens\.js$/,
  /^utils\.js$/,
  /^overlay\.css$/,
  /^icon(16|32|48|96|128|256)\.png$/,
  /^fonts$/, // directory
];

const ALLOWED_FONTS_PATTERNS = [
  /\.woff2$/,
  /^OFL.*\.txt$/i,
  /^LICENSE.*\.txt$/i,
];

(function checkInventory() {
  const present = readdirSync(distDir);

  // Required files
  for (const f of REQUIRED_FILES) {
    if (present.includes(f)) {
      ok(`required: dist/${f}`);
    } else {
      fail(`required file missing: dist/${f}`);
    }
  }

  // No unexpected top-level files in dist/
  for (const f of present) {
    if (!ALLOWED_TOP_PATTERNS.some((re) => re.test(f))) {
      fail(`unexpected file at top of dist/: ${f}`);
    }
  }

  // fonts/ subdirectory: 5 woff2 + at least 2 OFL/LICENSE files
  const fontsDir = join(distDir, "fonts");
  if (!existsSync(fontsDir)) {
    fail(`dist/fonts/ directory missing (self-hosted fonts required)`);
    return;
  }
  const fontFiles = readdirSync(fontsDir);
  const woff2 = fontFiles.filter((f) => /\.woff2$/.test(f));
  const ofl   = fontFiles.filter((f) => /^(OFL|LICENSE).*\.txt$/i.test(f));

  if (woff2.length < 5) {
    fail(`dist/fonts/ should contain at least 5 .woff2 files (found ${woff2.length})`);
  } else {
    ok(`dist/fonts/ contains ${woff2.length} woff2 files`);
  }

  if (ofl.length < 2) {
    fail(`dist/fonts/ should contain at least 2 OFL/LICENSE files (found ${ofl.length})`);
  } else {
    ok(`dist/fonts/ contains ${ofl.length} license file(s)`);
  }

  // Anything else in fonts/?
  for (const f of fontFiles) {
    if (!ALLOWED_FONTS_PATTERNS.some((re) => re.test(f))) {
      fail(`unexpected file in dist/fonts/: ${f}`);
    }
  }
})();

// ──────────────────────────────────────────────────────────────────────
// 2. manifest.json sanity
// ──────────────────────────────────────────────────────────────────────
let manifest = null;
(function checkManifest() {
  try {
    manifest = JSON.parse(readFileSync(join(distDir, "manifest.json"), "utf8"));
  } catch (e) {
    fail(`manifest.json invalid JSON: ${e.message}`);
    return;
  }

  if (manifest.manifest_version !== 3) {
    fail(`manifest.json: manifest_version must be 3 (got ${manifest.manifest_version})`);
  } else {
    ok(`manifest.json: MV3`);
  }

  if (!manifest.version || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    fail(`manifest.json: version must be semver-like X.Y.Z (got ${manifest.version})`);
  } else {
    ok(`manifest.json: version ${manifest.version}`);
  }

  // Permissions whitelist
  const PERMITTED = new Set(["storage", "scripting", "activeTab", "tabs", "alarms"]);
  const declared = manifest.permissions || [];
  for (const p of declared) {
    if (!PERMITTED.has(p)) {
      fail(`manifest.json: unexpected permission "${p}" — review intent`);
    }
  }
  ok(`manifest.json: permissions = [${declared.join(", ")}]`);

  // host_permissions — wildcard is acceptable but flag if anything else
  const hp = manifest.host_permissions || [];
  if (hp.length === 1 && hp[0] === "*://*/*") {
    ok(`manifest.json: host_permissions = *://*/* (by design)`);
  } else {
    warn(`manifest.json: host_permissions unusual (${JSON.stringify(hp)}) — review`);
  }

  // CSP must be present and restrictive
  const csp = manifest.content_security_policy?.extension_pages || "";
  if (!csp) {
    fail(`manifest.json: content_security_policy.extension_pages missing`);
  } else {
    const required = ["script-src 'self'", "object-src 'self'"];
    for (const r of required) {
      if (!csp.includes(r)) {
        fail(`manifest.json CSP missing required directive: ${r}`);
      }
    }
    if (csp.includes("'unsafe-inline'") || csp.includes("'unsafe-eval'")) {
      fail(`manifest.json CSP contains unsafe directive: ${csp}`);
    }
    if (!csp.includes("font-src 'self'")) {
      warn(`manifest.json CSP does not explicitly restrict font-src to 'self' — fonts may load externally if HTML references them`);
    } else {
      ok(`manifest.json CSP: font-src 'self' (hardened)`);
    }
    ok(`manifest.json CSP: restrictive`);
  }
})();

// ──────────────────────────────────────────────────────────────────────
// 3-8. Content scans across dist/*.{js,html,css}
// ──────────────────────────────────────────────────────────────────────
const FORBIDDEN_PATTERNS = [
  // (label, regex, severity 'fail'|'warn')
  ["@hb-strip residue",              /@hb-strip:/, "fail"],
  ["external Google Fonts",          /fonts\.googleapis\.com|fonts\.gstatic\.com/i, "fail"],
  ["vendor URL (vercel.app)",        /[a-z0-9-]+\.vercel\.app/i, "fail"],
  ["localhost URL",                  /(?:https?|wss?):\/\/localhost\b/i, "fail"],
  ["127.0.0.1 URL",                  /(?:https?|wss?):\/\/127\.0\.0\.1\b/i, "fail"],
  ["debugger statement",             /\bdebugger\s*;/, "fail"],
  ["eval() call",                    /\beval\s*\(/, "fail"],
  ["console.log/warn/error",         /\bconsole\.(log|warn|error|debug|info)\s*\(/, "warn"],
  ["TODO / FIXME / XXX / HACK",      /\b(TODO|FIXME|XXX|HACK)\b/, "warn"],
  // High-confidence secrets
  ["AWS access key",                 /\bAKIA[0-9A-Z]{16}\b/, "fail"],
  ["Google API key",                 /\bAIza[0-9A-Za-z\-_]{35}\b/, "fail"],
  ["GitHub PAT",                     /\bgh[oprsu]_[A-Za-z0-9]{36,}\b/, "fail"],
  ["Stripe key",                     /\b(sk|pk)_(test|live)_[0-9a-zA-Z]{24,}\b/, "fail"],
  ["Private key block",              /-----BEGIN [A-Z ]*PRIVATE KEY-----/, "fail"],
  ["JWT token",                      /\beyJ[A-Za-z0-9_=-]{20,}\.[A-Za-z0-9_=-]{20,}\.[A-Za-z0-9_.+/=-]+/, "fail"],
  // Privacy URL canonicalization
  ["non-canonical privacy URL",      /verify\.kicktech\.io\/privacy/, "fail"],
];

function* walkFiles(dir, exts) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(full, exts);
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      yield full;
    }
  }
}

(function scanContents() {
  const targets = [...walkFiles(distDir, [".js", ".html", ".css", ".mjs", ".json"])];
  for (const file of targets) {
    const rel = file.slice(repoRoot.length + 1);
    const content = readFileSync(file, "utf8");
    for (const [label, pat, sev] of FORBIDDEN_PATTERNS) {
      const m = content.match(pat);
      if (m) {
        const lineNo = content.slice(0, m.index).split("\n").length;
        const msg = `${rel}:${lineNo} — ${label} (match: ${JSON.stringify(m[0].slice(0, 60))})`;
        if (sev === "fail") fail(msg);
        else warn(msg);
      }
    }
  }
  ok(`content scan: ${targets.length} files scanned across dist/`);
})();

// ──────────────────────────────────────────────────────────────────────
// 9. popup.js canonical privacy URL (positive check, complements the
//    forbidden-pattern check above)
// ──────────────────────────────────────────────────────────────────────
(function checkPrivacyLink() {
  const popupJs = readFileSync(join(distDir, "popup.js"), "utf8");
  if (popupJs.includes("https://www.kicktech.io/privacy")) {
    ok(`popup.js: canonical privacy URL (www.kicktech.io/privacy) present`);
  } else {
    fail(`popup.js: canonical privacy URL (https://www.kicktech.io/privacy) NOT found — F1 regression?`);
  }
})();

// ──────────────────────────────────────────────────────────────────────
// Report
// ──────────────────────────────────────────────────────────────────────
const W = "─".repeat(70);
const banner = (s) => `\n${W}\n${s}\n${W}`;

console.log(banner("verify-dist.mjs — HumanBadge dist/ validation"));
console.log(`Repo root: ${repoRoot}`);
console.log(`Dist dir:  ${distDir}`);
if (manifest) console.log(`Version:   ${manifest.version}`);

console.log(banner(`PASS (${results.pass.length})`));
for (const m of results.pass) console.log(`  ✓ ${m}`);

if (results.warn.length) {
  console.log(banner(`WARN (${results.warn.length})`));
  for (const m of results.warn) console.log(`  ⚠ ${m}`);
}

if (results.fail.length) {
  console.log(banner(`FAIL (${results.fail.length})`));
  for (const m of results.fail) console.log(`  ✗ ${m}`);
}

console.log(banner(`SUMMARY: pass=${results.pass.length}, warn=${results.warn.length}, fail=${results.fail.length}`));

process.exit(results.fail.length === 0 ? 0 : 1);
