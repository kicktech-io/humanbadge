const HB_LANG = (() => {
  let ui = "";
  try {
    if (chrome && chrome.i18n && chrome.i18n.getUILanguage) ui = chrome.i18n.getUILanguage() || "";
  } catch (e) {
  }
  const l = ui || navigator.language || navigator.userLanguage || "";
  return String(l).toLowerCase().indexOf("pl") === 0 ? "pl" : "en";
})();
const HB_I18N = {
  pl: {
    err: "B\u0142\u0105d",
    no_domain: "Brak domeny",
    gmail_no_sender: "Nie ustalono domeny nadawcy \u2014 otw\xF3rz sw\xF3j mail i spr\xF3buj ponownie",
    no_content_script: "Content script niedost\u0119pny\n(strona chrome://, pdf lub nowa karta)",
    challenge_verifying: "Weryfikacja anty-bot\u2026",
    cancel: "Anuluj",
    verifying: "Weryfikacja\u2026",
    verify_cancelled: "Weryfikacja anulowana",
    verify_failed: "Weryfikacja anty-bot nieudana \u2014 spr\xF3buj ponownie",
    register: "Zarejestruj",
    registering_chain: "Rejestruj\u0119 na blockchain\u2026",
    queue_wait: "Wi\u0119kszy ruch \u2014 czekasz w kolejce, chwila\u2026",
    registered: "\u2713 Zarejestrowane",
    already_registered: "\u2713 Ju\u017C zarejestrowane",
    limit: "Limit",
    retry_in: "Spr\xF3buj za {n}s",
    queue: "Kolejka",
    busy_retry: "Du\u017Cy ruch \u2014 pon\xF3w za {n}s",
    validation_err: "B\u0142\u0105d walidacji",
    invalid_request: "nieprawid\u0142owe \u017C\u0105danie",
    err_retry: "B\u0142\u0105d \u2014 pon\xF3w",
    data_consent: "\u26A0 Tre\u015B\u0107 nie opuszcza przegl\u0105darki \u2014 wysy\u0142any jest tylko jej skr\xF3t (hash).",
    hmac_notice: "Rejestrujesz post osobisty: Tw\xF3j identyfikator autora trafi do \u0142a\u0144cucha wy\u0142\u0105cznie jako HMAC (skr\xF3t kryptograficzny) \u2014 nie jako jawny handle. Klucz pozostaje po stronie serwera i jest kasowalny (prawo do usuni\u0119cia). Szczeg\xF3\u0142y w Polityce prywatno\u015Bci.",
    hmac_notice_link: "Polityka prywatno\u015Bci (\xA710.2)",
    report_verify: "Zg\u0142o\u015B do weryfikacji",
    learn_more: "Dowiedz si\u0119 wi\u0119cej o KickTech HumanBadge",
    empty_desc: "Je\u015Bli uwa\u017Casz, \u017Ce ta strona powinna by\u0107 zweryfikowana przez KickTech lub chcesz zg\u0142osi\u0107 jej wydawc\u0119 do naszej bazy \u2014 mo\u017Cesz przes\u0142a\u0107 nam jej adres. Skontaktujemy si\u0119 z wydawc\u0105 w celu ustalenia, czy korzysta lub chce korzysta\u0107 z naszego systemu weryfikacji.",
    refresh_btn: "\u21BA Od\u015Bwie\u017C",
    connecting: "\u0141\u0105czenie\u2026",
    no_active_tab: "Brak aktywnej zak\u0142adki",
    empty_title: "Nic do weryfikacji na tej stronie",
    empty_sub: "Nie znaleziono tre\u015Bci, kt\xF3r\u0105 mo\u017Cna zweryfikowa\u0107.",
    sending: "Wysy\u0142anie\u2026",
    sent: "\u2713 Wys\u0142ano",
    found: "znaleziono {n}",
    view_details: "Zobacz szczeg\xF3\u0142y",
    click_copy: "Kliknij aby skopiowa\u0107",
    copied: "\u2713 Skopiowano",
    tagline: "Aktywny dow\xF3d autorstwa",
    consumer_mail_body: "<strong>To wiadomo\u015B\u0107 z prywatnej skrzynki ({domain}).</strong> KickTech potwierdza autorstwo na podstawie domeny nadawcy \u2014 dzia\u0142a to dla firm i marek (ka\u017Cda ma w\u0142asn\u0105 domen\u0119). Ale z darmowych skrzynek jak {domain} korzystaj\u0105 miliony r\xF3\u017Cnych os\xF3b pod jedn\u0105 domen\u0105, wi\u0119c nie wskazuje ona konkretnego nadawcy. \u015Awiadomie nie weryfikujemy poczty prywatnej i nie przechowujemy adres\xF3w e-mail \u2014 to decyzja o ochronie prywatno\u015Bci.",
    vrf_none: "<strong>Nie rozpoznano \u017Cadnego obrazka w rejestrze.</strong> Mo\u017Ce to oznacza\u0107 jedynie, \u017Ce wydawca tej strony lub nadawca maila nie zarejestrowa\u0142 swoich materia\u0142\xF3w wizualnych w systemie KickTech \u2014 i po prostu z niego nie korzysta. Mo\u017Ce te\u017C jednak oznacza\u0107, \u017Ce kto\u015B podszywa si\u0119 pod w\u0142a\u015Bciciela tych obrazk\xF3w. Je\u015Bli masz w\u0105tpliwo\u015Bci, mo\u017Cesz zg\u0142osi\u0107 t\u0119 stron\u0119 do naszego zespo\u0142u \u2014 skontaktujemy si\u0119 z wydawc\u0105 w celu wyja\u015Bnienia.",
    vrf_mixed: "<strong>Weryfikacja pozytywna \u2014 z dodatkowym sygna\u0142em.</strong> Ten sam obrazek jest zarejestrowany przez kilka r\xF3\u017Cnych podmiot\xF3w w rejestrze. G\u0142\xF3wna weryfikacja przebieg\u0142a pomy\u015Blnie (strona jest autoryzowana), ale wykryli\u015Bmy r\xF3wnie\u017C dopasowanie do innego zarejestrowanego zasobu. To mo\u017Ce oznacza\u0107 wsp\xF3lne elementy graficzne lub zduplikowane wpisy w rejestrze. Prosimy o zg\u0142oszenie \u2014 nasz zesp\xF3\u0142 sprawdzi sytuacj\u0119 i uporz\u0105dkuje wpisy w rejestrze.",
    vrf_violation: "<strong>Uwaga \u2014 wykrywamy istotn\u0105 niezgodno\u015B\u0107.</strong> Rozpoznali\u015Bmy zarejestrowany obrazek, ale nadawca lub strona nie jest autoryzowanym w\u0142a\u015Bcicielem tego znaku. To mo\u017Ce oznacza\u0107 pr\xF3b\u0119 podszywania si\u0119 pod inn\u0105 organizacj\u0119. Prze\u015Blij zg\u0142oszenie do naszego zespo\u0142u \u2014 sprawdzimy sytuacj\u0119 i skontaktujemy si\u0119 z w\u0142a\u015Bcicielem znaku w celu potwierdzenia lub podj\u0119cia dzia\u0142a\u0144.",
    vrf_partial: "<strong>Cz\u0119\u015B\u0107 obrazk\xF3w nie zosta\u0142a rozpoznana w rejestrze.</strong> Zweryfikowali\u015Bmy niekt\xF3re materia\u0142y wizualne na tej stronie lub w tym mailu, ale pozosta\u0142e obrazki nie s\u0105 zarejestrowane w systemie KickTech. Mo\u017Cliwe, \u017Ce wydawca nie zarejestrowa\u0142 jeszcze wszystkich swoich zasob\xF3w. Je\u015Bli chcesz, mo\u017Cemy skontaktowa\u0107 si\u0119 z wydawc\u0105 w tej sprawie."
  },
  en: {
    err: "Error",
    no_domain: "No domain",
    gmail_no_sender: "Couldn't determine the sender domain \u2014 open your email and try again",
    no_content_script: "Content script unavailable\n(chrome:// page, pdf, or new tab)",
    challenge_verifying: "Anti-bot verification\u2026",
    cancel: "Cancel",
    verifying: "Verifying\u2026",
    verify_cancelled: "Verification cancelled",
    verify_failed: "Anti-bot verification failed \u2014 please try again",
    register: "Register",
    registering_chain: "Registering on blockchain\u2026",
    queue_wait: "Higher traffic \u2014 you're in the queue, one moment\u2026",
    registered: "\u2713 Registered",
    already_registered: "\u2713 Already registered",
    limit: "Limit",
    retry_in: "Try again in {n}s",
    queue: "Queue",
    busy_retry: "Heavy traffic \u2014 retry in {n}s",
    validation_err: "Validation error",
    invalid_request: "invalid request",
    err_retry: "Error \u2014 retry",
    data_consent: "\u26A0 Content never leaves your browser \u2014 only its hash is sent.",
    hmac_notice: "You are registering a personal post: your author identifier goes on-chain only as an HMAC (cryptographic digest) \u2014 never as a plaintext handle. The key stays server-side and is erasable (right to erasure). Details in the Privacy Policy.",
    hmac_notice_link: "Privacy Policy (\xA710.2)",
    report_verify: "Report for verification",
    learn_more: "Learn more about KickTech HumanBadge",
    empty_desc: "If you think this page should be verified by KickTech or want to report its publisher to our database \u2014 you can send us its address. We'll contact the publisher to determine whether they use or want to use our verification system.",
    refresh_btn: "\u21BA Refresh",
    connecting: "Connecting\u2026",
    no_active_tab: "No active tab",
    empty_title: "Nothing to verify on this page",
    empty_sub: "No verifiable content was found.",
    sending: "Sending\u2026",
    sent: "\u2713 Sent",
    found: "{n} found",
    view_details: "View details",
    click_copy: "Click to copy",
    copied: "\u2713 Copied",
    tagline: "Active proof of authorship",
    consumer_mail_body: "<strong>This is a message from a personal mailbox ({domain}).</strong> KickTech confirms authorship by the sender\u2019s domain \u2014 which works for companies and brands (each has its own domain). But free mailboxes like {domain} are used by millions of different people under one domain, so it doesn\u2019t identify a specific sender. We intentionally don\u2019t verify personal email and store no email addresses \u2014 a privacy decision.",
    vrf_none: "<strong>No image was recognized in the registry.</strong> This may simply mean that the publisher of this page or the email sender hasn't registered their visual assets in KickTech \u2014 and just doesn't use it. It could, however, also mean that someone is impersonating the owner of these images. If in doubt, you can report this page to our team \u2014 we'll contact the publisher to clarify.",
    vrf_mixed: "<strong>Verified \u2014 with an extra signal.</strong> The same image is registered by several different parties in the registry. The main verification passed (the page is authorized), but we also detected a match to another registered asset. This may indicate shared graphics or duplicate registry entries. Please report it \u2014 our team will review and tidy up the entries.",
    vrf_violation: "<strong>Warning \u2014 we detect a significant mismatch.</strong> We recognized a registered image, but the sender or page is not the authorized owner of this mark. This may indicate an impersonation attempt against another organization. Send a report to our team \u2014 we'll review and contact the mark owner to confirm or take action.",
    vrf_partial: "<strong>Some images were not recognized in the registry.</strong> We verified some of the visual assets on this page or in this email, but the remaining images are not registered in KickTech. The publisher may not have registered all their assets yet. If you'd like, we can contact the publisher about this."
  }
};
function t(key, vars) {
  let s = HB_I18N[HB_LANG] && HB_I18N[HB_LANG][key] || HB_I18N.en[key] || key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}
const ICON = { ok: "\u2713", bad: "\u2717", cdn_only: "\u26A0", unknown: "?", info: "\u2139", warn: "\u26A0" };
function $(id) {
  return document.getElementById(id);
}
function _hbIsPersonPublication(source, url) {
  const u = String(url || "");
  if (u.indexOf("/company/") !== -1) return false;
  return source === "X-TWEET-SIMHASH" || source === "LINKEDIN-FEED-SIMHASH" || source === "LINKEDIN-PROFILE-SIMHASH" || source === "LINKEDIN-URL-SIMHASH" || source === "LINKEDIN-PULSE-SIMHASH" || source === "LINKEDIN-COMMENT-SIMHASH" || source === "FACEBOOK-TEXT-SIMHASH";
}
function _hbSourceToPlatform(source) {
  if (!source) return "other";
  if (source.startsWith("TELEGRAM-")) return "telegram";
  if (source.startsWith("MESSENGER-")) return "messenger";
  if (source.startsWith("WHATSAPP-")) return "whatsapp";
  if (source.startsWith("X-")) return "x";
  if (source.startsWith("LINKEDIN-")) return "linkedin";
  if (source.startsWith("FACEBOOK-")) return "facebook";
  if (source === "EMAIL-SIGNATURE" || source === "TEXT-SIMHASH" || source === "SOCIAL-TEXT-SIMHASH") return "gmail";
  return "other";
}
const HB_KT_REGEX = /KT-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{6}/;
function _hbExtractKt(text) {
  if (!text) return null;
  const match = String(text).match(HB_KT_REGEX);
  return match ? match[0] : null;
}
function _hbExtractDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}
let _hbCurrentToken = null;
async function _hbLoadCurrentToken() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_CURRENT_TOKEN" }, (resp) => {
      if (resp && resp.ok && resp.token) {
        _hbCurrentToken = resp.token;
        const tokenEl = $("hbTokenValue");
        const expiresEl = $("hbTokenExpires");
        if (tokenEl) tokenEl.textContent = resp.token;
        if (expiresEl) expiresEl.textContent = "valid until " + (resp.windowEndUtcLabel || "\u2014");
      } else {
        const tokenEl = $("hbTokenValue");
        const expiresEl = $("hbTokenExpires");
        if (tokenEl) tokenEl.textContent = "\u2014";
        if (expiresEl) expiresEl.textContent = "token unavailable";
      }
      resolve(resp);
    });
  });
}
const HB_BACKEND_URL = "https://verify.kicktech.io";
function _hbGetSessionId() {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage({ type: "GET_SESSION_ID" }, (resp) => {
        resolve(resp && resp.sessionId ? resp.sessionId : null);
      });
    } catch (e) {
      resolve(null);
    }
  });
}
function _hbRunChallenge(sessionId) {
  return new Promise((resolve, reject) => {
    const extId = chrome.runtime.id;
    const overlay = document.createElement("div");
    overlay.id = "hbChallengeOverlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(10,10,15,.93);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;";
    const label = document.createElement("div");
    label.textContent = t("challenge_verifying");
    label.style.cssText = "color:#e6e6e6;font-size:12px;";
    const iframe = document.createElement("iframe");
    iframe.src = HB_BACKEND_URL + "/challenge?sid=" + encodeURIComponent(sessionId) + "&ext=" + encodeURIComponent(extId) + "&lang=" + encodeURIComponent(HB_LANG);
    iframe.style.cssText = "width:320px;height:170px;border:0;background:transparent;";
    iframe.setAttribute("title", "KickTech weryfikacja");
    const cancel = document.createElement("button");
    cancel.textContent = t("cancel");
    cancel.style.cssText = "font-size:11px;background:none;border:1px solid #555;color:#aaa;border-radius:4px;padding:3px 10px;cursor:pointer;";
    overlay.appendChild(label);
    overlay.appendChild(iframe);
    overlay.appendChild(cancel);
    document.body.appendChild(overlay);
    let done = false;
    let timer = null;
    const cleanup = () => {
      if (done) return;
      done = true;
      window.removeEventListener("message", onMsg);
      if (timer) clearTimeout(timer);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    };
    const onMsg = (event) => {
      if (event.origin !== HB_BACKEND_URL) return;
      const d = event.data || {};
      if (d.sessionId !== sessionId) return;
      if (d.type === "KT_HART" && d.hart) {
        cleanup();
        resolve(d.hart);
      } else if (d.type === "KT_HART_FAIL") {
        cleanup();
        reject(new Error(d.reason || "failed"));
      }
    };
    window.addEventListener("message", onMsg);
    cancel.addEventListener("click", () => {
      cleanup();
      reject(new Error("cancelled"));
    });
    timer = setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, 12e4);
  });
}
function _hbRandHex(nBytes) {
  const a = new Uint8Array(nBytes);
  crypto.getRandomValues(a);
  return "0x" + Array.from(a).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function _hbGetTextSha256(rawHash) {
  return new Promise((resolve) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const id = tabs && tabs[0] && tabs[0].id;
        if (!id) {
          resolve(null);
          return;
        }
        chrome.tabs.sendMessage(id, { type: "KT_PLUS_TEXT_SHA256", hash: rawHash }, (resp) => {
          if (chrome.runtime.lastError) {
            resolve(null);
            return;
          }
          resolve(resp && resp.ok ? resp.sha256 : null);
        });
      });
    } catch (e) {
      resolve(null);
    }
  });
}
function _hbBuildPlusTypedData(m) {
  return {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" }
      ],
      PlusRegistration: [
        { name: "platform", type: "string" },
        { name: "domain", type: "string" },
        { name: "contentHash", type: "bytes8" },
        { name: "sha256", type: "bytes32" },
        { name: "nonce", type: "bytes32" },
        { name: "issuedAt", type: "uint256" },
        { name: "signer", type: "address" }
      ]
    },
    primaryType: "PlusRegistration",
    domain: { name: "HumanBadge PLUS", version: "1", chainId: 84532 },
    message: {
      platform: m.platform,
      domain: m.domain,
      contentHash: m.contentHash,
      sha256: m.sha256,
      nonce: m.nonce,
      issuedAt: m.issuedAt,
      signer: m.signer
    }
  };
}
function _hbTxLink(info, txHash) {
  const link = document.createElement("a");
  link.href = "https://sepolia.basescan.org/tx/" + txHash;
  link.target = "_blank";
  link.textContent = "tx \u2197";
  link.title = txHash;
  info.innerHTML = "";
  info.appendChild(link);
}
function _hbRenderRegisterResult(resp, button, info) {
  button.classList.remove("registering");
  const status = resp && resp.status;
  const data = resp && resp.data;
  if (resp && resp.ok && status === 200) {
    button.classList.add("registered");
    button.textContent = t("registered");
    const txHash = data && data.txHash;
    if (txHash) _hbTxLink(info, txHash);
  } else if (status === 409) {
    button.classList.add("registered");
    button.textContent = t("already_registered");
    const priorTx = data && data.prior && data.prior.txHash;
    if (priorTx) _hbTxLink(info, priorTx);
  } else {
    button.classList.add("failed");
    button.textContent = t("err_retry");
    const detail = data && (data.detail || data.error);
    info.textContent = (detail || "unknown").toString().slice(0, 48);
    setTimeout(() => {
      button.classList.remove("failed");
      button.disabled = false;
      button.textContent = t("register");
    }, 3e3);
  }
}
function _hbSendPlusRegister(button, info, img, currentTabUrl2, domain, platform, hart, plus) {
  const contentHash = "0x" + img.hash;
  const nonce = _hbRandHex(32);
  const issuedAt = Math.floor(Date.now() / 1e3);
  const signer = String(plus.address).toLowerCase();
  const typedData = _hbBuildPlusTypedData({ platform, domain, contentHash, sha256: plus.sha256, nonce, issuedAt, signer });
  const reg = {
    contentHash,
    domain,
    platform,
    urlHint: img.permalink || currentTabUrl2,
    authorDomain: img.authorDomain,
    hart,
    address: signer,
    nonce,
    sha256: plus.sha256,
    issuedAt
  };
  info.textContent = t("plus_sign_prompt");
  _plusSend("PLUS_REGISTER", { reg, typedData }).then((resp) => {
    if (!resp || !resp.ok || !resp.req) {
      button.classList.remove("registering");
      button.classList.add("failed");
      button.textContent = t("err");
      info.textContent = t("plus_error");
      setTimeout(() => {
        button.classList.remove("failed");
        button.disabled = false;
        button.textContent = t("register");
      }, 3e3);
      return;
    }
    _hbPollPlusRegister(resp.req, button, info);
  });
}
function _hbPollPlusRegister(req, button, info) {
  const deadline = Date.now() + 18e4;
  const tick = () => {
    if (Date.now() > deadline) return;
    _plusSend("PLUS_RESULT", { req }).then((r) => {
      const res = r && r.result;
      if (!res) {
        setTimeout(tick, 800);
        return;
      }
      if (res.kind === "plus_register") {
        _hbRenderRegisterResult({ ok: res.ok, status: res.status, data: res.data }, button, info);
      }
    });
  };
  setTimeout(tick, 800);
}
function _hbTriggerRegister(button, info, img, currentTabUrl2) {
  button.disabled = true;
  button.classList.remove("registered", "failed");
  button.classList.add("registering");
  button.textContent = "...";
  info.textContent = "";
  const domain = _hbExtractDomain(currentTabUrl2);
  if (!domain) {
    button.classList.remove("registering");
    button.classList.add("failed");
    button.textContent = t("err");
    info.textContent = t("no_domain");
    return;
  }
  const platform = _hbSourceToPlatform(img.source);
  if (platform === "gmail" && !img.authorDomain) {
    button.classList.remove("registering");
    button.classList.add("failed");
    button.textContent = t("err");
    info.textContent = t("gmail_no_sender");
    return;
  }
  info.textContent = t("verifying");
  _hbGetSessionId().then((sessionId) => {
    if (!sessionId) throw new Error("no_session");
    return _hbRunChallenge(sessionId);
  }).then(async (hart) => {
    let plus = null;
    try {
      const st = await _plusSend("PLUS_STATE");
      const wallet = st && st.wallet;
      if (wallet && wallet.address) {
        const sha = await _hbGetTextSha256(img.hash);
        if (sha) plus = { address: wallet.address, sha256: sha };
      }
    } catch (e) {
    }
    if (plus) _hbSendPlusRegister(button, info, img, currentTabUrl2, domain, platform, hart, plus);
    else _hbSendRegister(button, info, img, currentTabUrl2, domain, platform, hart);
  }).catch((err) => {
    button.classList.remove("registering");
    button.classList.add("failed");
    button.textContent = t("err");
    info.textContent = err && err.message === "cancelled" ? t("verify_cancelled") : t("verify_failed");
    setTimeout(() => {
      button.classList.remove("failed");
      button.disabled = false;
      button.textContent = t("register");
      info.textContent = "";
    }, 3e3);
  });
  return;
}
function _hbSendRegister(button, info, img, currentTabUrl2, domain, platform, hart) {
  let _hbQueueT1 = setTimeout(() => {
    info.textContent = t("registering_chain");
  }, 1500);
  let _hbQueueT2 = setTimeout(() => {
    info.textContent = t("queue_wait");
  }, 5e3);
  const _hbClearQueueMsgs = () => {
    clearTimeout(_hbQueueT1);
    clearTimeout(_hbQueueT2);
  };
  chrome.runtime.sendMessage({
    type: "REGISTER_HASH",
    contentHash: "0x" + img.hash,
    domain,
    platform,
    // FB posts carry the post permalink (extractFacebookPermalink) so the
    // backend composes a post/user-level pattern; other sources use the tab url.
    urlHint: img.permalink || currentTabUrl2,
    // Gmail: publisher domain (forward-aware capture) → backend writes
    // <authorDomain>/* so verification's senderDomain matches.
    authorDomain: img.authorDomain,
    // Bot-resistance: single-use HART from the Turnstile challenge. Backend
    // consumes it (GETDEL) as admission control before the on-chain write.
    hart
  }, (resp) => {
    _hbClearQueueMsgs();
    button.classList.remove("registering");
    if (resp && resp.ok && resp.status === 200) {
      const txHash = resp.data && resp.data.txHash;
      button.classList.add("registered");
      button.textContent = t("registered");
      if (txHash) {
        const link = document.createElement("a");
        link.href = "https://sepolia.basescan.org/tx/" + txHash;
        link.target = "_blank";
        link.textContent = "tx \u2197";
        link.title = txHash;
        info.innerHTML = "";
        info.appendChild(link);
      }
    } else if (resp && resp.status === 409) {
      const prior = resp.data && resp.data.prior;
      const priorTx = prior && prior.txHash;
      button.classList.add("registered");
      button.textContent = t("already_registered");
      if (priorTx) {
        const link = document.createElement("a");
        link.href = "https://sepolia.basescan.org/tx/" + priorTx;
        link.target = "_blank";
        link.textContent = "tx \u2197";
        link.title = priorTx;
        info.innerHTML = "";
        info.appendChild(link);
      }
    } else if (resp && resp.status === 429) {
      const retryAfter = resp.data && resp.data.retryAfter || 60;
      button.classList.add("failed");
      button.textContent = t("limit");
      info.textContent = t("retry_in", { n: retryAfter });
      setTimeout(() => {
        button.classList.remove("failed");
        button.disabled = false;
        button.textContent = t("register");
        info.textContent = "";
      }, retryAfter * 1e3);
    } else if (resp && resp.status === 503) {
      const retryAfter = resp.data && resp.data.retryAfter || 5;
      button.classList.add("failed");
      button.textContent = t("queue");
      info.textContent = t("busy_retry", { n: retryAfter });
      setTimeout(() => {
        button.classList.remove("failed");
        button.disabled = false;
        button.textContent = t("register");
        info.textContent = "";
      }, retryAfter * 1e3);
    } else if (resp && resp.status === 400) {
      button.classList.add("failed");
      button.textContent = t("validation_err");
      const details = resp.data && resp.data.details;
      info.textContent = details && details[0] && details[0].message ? details[0].message.slice(0, 40) : t("invalid_request");
    } else {
      button.classList.add("failed");
      button.textContent = t("err_retry");
      const detail = resp && resp.data && (resp.data.detail || resp.data.error);
      info.textContent = (detail || "unknown").toString().slice(0, 40);
      setTimeout(() => {
        button.classList.remove("failed");
        button.disabled = false;
        button.textContent = t("register");
      }, 3e3);
    }
  });
}
function kindClass(kind) {
  if (kind === "ok") return "ok";
  if (kind === "bad") return "bad";
  if (kind === "info" || kind === "warn") return "cdn_only";
  return "warn";
}
function renderVerification(v, idx) {
  const kc = kindClass(v.kind);
  const item = document.createElement("div");
  item.className = "result-item";
  item.style.animationDelay = idx * 55 + "ms";
  const iconDiv = document.createElement("div");
  iconDiv.className = "status-icon icon-" + kc;
  iconDiv.textContent = ICON[v.kind] || "?";
  const body = document.createElement("div");
  const issuer = document.createElement("div");
  issuer.className = "result-issuer";
  issuer.textContent = v.issuerName;
  const status = document.createElement("div");
  status.className = "result-status " + kc;
  status.textContent = v.desc || v.kind;
  const meta = document.createElement("div");
  meta.className = "result-meta";
  const ctxTag = document.createElement("span");
  ctxTag.className = "tag " + (v.context === "email" ? "email" : "web");
  ctxTag.textContent = v.context === "email" ? "EMAIL" : "WEB";
  meta.appendChild(ctxTag);
  if (v.senderEmail) {
    const s = document.createElement("span");
    s.className = "tag sender";
    s.textContent = v.senderEmail;
    meta.appendChild(s);
  }
  body.appendChild(issuer);
  if (v.assetLabel) {
    const assetLbl = document.createElement("div");
    assetLbl.className = "result-asset";
    assetLbl.textContent = v.assetLabel;
    body.appendChild(assetLbl);
  }
  body.appendChild(status);
  body.appendChild(meta);
  item.appendChild(iconDiv);
  item.appendChild(body);
  return item;
}
function createDisclaimer(mode) {
  const box = document.createElement("div");
  box.className = "disclaimer disclaimer-" + mode;
  const icon = document.createElement("div");
  icon.className = "disc-icon";
  const text = document.createElement("div");
  text.className = "disc-text";
  if (mode === "none") {
    icon.textContent = "\u2717";
    text.innerHTML = t("vrf_none");
  } else if (mode === "mixed") {
    icon.textContent = "\u2139";
    text.innerHTML = t("vrf_mixed");
  } else if (mode === "violation") {
    icon.textContent = "\u26D4";
    text.innerHTML = t("vrf_violation");
  } else {
    icon.textContent = "\u26A0";
    text.innerHTML = t("vrf_partial");
  }
  const note = document.createElement("div");
  note.className = "disc-note";
  note.textContent = t("data_consent");
  const btnLabel = t("learn_more");
  const btn = document.createElement("button");
  btn.className = "btn-report";
  btn.id = "btnReport";
  btn.textContent = btnLabel;
  box.appendChild(icon);
  box.appendChild(text);
  box.appendChild(note);
  box.appendChild(btn);
  return box;
}
let currentTabUrl = "";
let currentVerifications = [];
function load() {
  $("scanDot").className = "scan-dot scanning";
  $("scanUrl").textContent = t("connecting");
  $("stateNone").style.display = "none";
  $("stateResults").style.display = "none";
  $("resultsList").innerHTML = "";
  $("disclaimerBox").innerHTML = "";
  $("errorMsg").style.display = "none";
  _hbLoadCurrentToken();
  chrome.runtime.sendMessage({ type: "GET_ISSUERS" }, (resp) => {
    const n = resp?.issuers?.length || 0;
    if (n > 0) {
      $("issuerPill").classList.add("live");
    }
  });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs?.[0];
    if (!tab?.id) {
      showError(t("no_active_tab"));
      return;
    }
    currentTabUrl = tab.url || "";
    const shortUrl = currentTabUrl.replace(/^https?:\/\//, "").replace(/\?.*$/, "").slice(0, 48);
    $("scanUrl").textContent = shortUrl || "\u2014";
    chrome.tabs.sendMessage(tab.id, { type: "GET_PAGE_STATUS" }, (resp) => {
      if (chrome.runtime.lastError || !resp?.ok) {
        showError(t("no_content_script"));
        return;
      }
      $("scanDot").className = "scan-dot done";
      currentVerifications = resp.verifications || [];
      const unmatched = resp.unmatched || 0;
      const matched = currentVerifications.length;
      const uniqueIssuers = new Set(currentVerifications.map((v) => v.issuerName));
      const pill = $("issuerPill");
      if (uniqueIssuers.size > 0) {
        pill.textContent = t("found", { n: uniqueIssuers.size });
        pill.classList.add("live");
      } else {
        pill.textContent = t("found", { n: 0 });
        pill.classList.remove("live");
      }
      if (matched === 0 && resp.consumerMail) {
        const box = $("stateNone");
        const ic = box.querySelector(".disc-icon");
        if (ic) ic.textContent = "\u2709";
        const tx = box.querySelector(".disc-text");
        if (tx) tx.innerHTML = t("consumer_mail_body", { domain: resp.consumerMail });
        const nt = box.querySelector(".disc-note");
        if (nt) nt.style.display = "none";
        const rb = $("btnReportNone");
        if (rb) rb.style.display = "none";
        box.style.display = "flex";
        return;
      }
      if (matched === 0 && unmatched === 0) {
        showEmpty(t("empty_title"), t("empty_sub"));
        return;
      }
      if (matched === 0) {
        const box = $("stateNone");
        const ic = box.querySelector(".disc-icon");
        if (ic) ic.textContent = "\u2717";
        const tx = box.querySelector(".disc-text");
        if (tx) tx.innerHTML = t("vrf_none");
        const nt = box.querySelector(".disc-note");
        if (nt) {
          nt.style.display = "";
          nt.textContent = t("data_consent");
        }
        const rb = $("btnReportNone");
        if (rb) {
          rb.style.display = "";
          rb.textContent = t("learn_more");
        }
        box.style.display = "flex";
        attachReportHandler($("btnReportNone"));
        return;
      }
      $("stateResults").style.display = "block";
      const list = $("resultsList");
      currentVerifications.forEach((v, i) => list.appendChild(renderVerification(v, i)));
      const hasBad = currentVerifications.some((v) => v.kind === "bad");
      const hasOk = currentVerifications.some((v) => v.kind === "ok");
      if (hasBad && hasOk) {
        const disc = createDisclaimer("mixed");
        $("disclaimerBox").appendChild(disc);
        attachReportHandler(disc.querySelector("#btnReport"));
      } else if (hasBad) {
        const disc = createDisclaimer("violation");
        $("disclaimerBox").appendChild(disc);
        attachReportHandler(disc.querySelector("#btnReport"));
      } else if (unmatched > 0) {
        const disc = createDisclaimer("partial");
        $("disclaimerBox").appendChild(disc);
        attachReportHandler(disc.querySelector("#btnReport"));
      }
    });
  });
}
function attachReportHandler(btn) {
  if (!btn) return;
  btn.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://www.kicktech.io" });
  });
}
function showEmpty(title, sub) {
  $("stateNone").style.display = "none";
  const emptyEl = $("emptyCustom");
  emptyEl.querySelector(".empty-title").textContent = title;
  emptyEl.querySelector(".empty-sub").textContent = sub;
  const dt = emptyEl.querySelector(".empty-disc-text");
  if (dt) dt.textContent = t("empty_desc");
  const dn = emptyEl.querySelector(".disc-note");
  if (dn) dn.textContent = t("data_consent");
  emptyEl.style.display = "block";
  const eb = $("btnReportEmpty");
  if (eb) eb.textContent = t("learn_more");
  attachReportHandler($("btnReportEmpty"));
}
function showError(msg) {
  $("scanDot").className = "scan-dot err";
  $("errorMsg").textContent = msg;
  $("errorMsg").style.display = "block";
}
$("btnRefresh").textContent = t("refresh_btn");
$("btnRefresh").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "CLEAR_CACHE" }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs?.[0]?.id;
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { type: "RESCAN" }, () => {
          setTimeout(load, 800);
        });
      } else {
        load();
      }
    });
  });
});
let harvestData = null;
$("btnHarvest").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs?.[0];
    if (!tab?.id) return;
    chrome.tabs.sendMessage(tab.id, { type: "GET_HARVEST_DATA" }, (resp) => {
      if (chrome.runtime.lastError || !resp?.ok) {
        $("btnHarvest").textContent = "\u26CF Error";
        setTimeout(() => {
          $("btnHarvest").textContent = "\u26CF Harvest";
        }, 1500);
        return;
      }
      harvestData = resp;
      renderHarvest(resp);
    });
  });
});
function renderHarvest(data) {
  const panel = $("harvestPanel");
  const list = $("harvestList");
  const overlay = $("harvestDetail");
  list.innerHTML = "";
  if (overlay) list.appendChild(overlay);
  $("harvestCount").textContent = "Harvest: " + data.images.length + " images (" + data.matchedCount + " matched)";
  const sorted = [...data.images].sort((a, b) => {
    if (a.inHeader !== b.inHeader) return a.inHeader ? -1 : 1;
    return a.position.top - b.position.top;
  });
  for (const img of sorted) {
    const isTextHash = img.tag === "TEXT" || img.tag === "TXT" || img.source === "TEXT-SIMHASH" || img.source === "SOCIAL-TEXT-SIMHASH" || img.source === "FACEBOOK-TEXT-SIMHASH" || img.source === "TELEGRAM-TEXT-SIMHASH" || img.source === "MESSENGER-TEXT-SIMHASH" || img.source === "WHATSAPP-TEXT-SIMHASH" || img.source === "X-TWEET-SIMHASH" || img.source === "X-DM-SIMHASH" || img.source === "EMAIL-SIGNATURE";
    const isInlineSvg = img.url && img.url.startsWith("(inline-svg)");
    const isBlob = img.url && (img.url.startsWith("blob:") || img.url.includes(" blob:"));
    const actualBlobUrl = img.url && img.url.includes(" blob:") ? (img.url.match(/blob:https?:\/\/[\w./-]+/) || [null])[0] || img.url : img.url;
    const item = document.createElement("div");
    item.className = "harvest-item" + (img.inHeader ? " in-header" : "");
    item.title = "Click to copy hash: 0x" + img.hash;
    const thumb = document.createElement("div");
    thumb.className = "harvest-thumb";
    if (isTextHash) {
      const textIcon = document.createElement("div");
      textIcon.className = "no-preview";
      textIcon.style.cssText = "font-size:14px; color: #5b8def; font-family: var(--mono);";
      textIcon.textContent = img.source === "EMAIL-SIGNATURE" ? "\u2712" : img.source === "TEXT-SIMHASH" ? "\u2709" : "TXT";
      thumb.appendChild(textIcon);
    } else if (isInlineSvg && img.thumbDataUrl) {
      const thumbImg = document.createElement("img");
      thumbImg.src = img.thumbDataUrl;
      thumbImg.style.cssText = "background:#fff; padding:2px;";
      thumbImg.onerror = () => {
        thumbImg.replaceWith(noPreview(img));
      };
      thumb.appendChild(thumbImg);
    } else if (!isInlineSvg && img.url && (img.url.startsWith("http") || isBlob)) {
      const thumbImg = document.createElement("img");
      const blobMatch = isBlob ? null : img.url.match(/blob:https?:\/\/\S+/) || null;
      thumbImg.src = img.thumbDataUrl || actualBlobUrl || img.url;
      thumbImg.onerror = () => {
        thumbImg.replaceWith(noPreview(img));
      };
      thumb.appendChild(thumbImg);
    } else {
      thumb.appendChild(noPreview(img));
    }
    const info = document.createElement("div");
    const hashLine = document.createElement("div");
    hashLine.className = "harvest-hash";
    hashLine.textContent = "0x" + img.hash;
    if (img.inHeader) {
      const hdrBadge = document.createElement("span");
      hdrBadge.className = "harvest-badge-hdr";
      hdrBadge.textContent = "HEADER";
      hashLine.appendChild(hdrBadge);
    }
    if (isTextHash) {
      const txtBadge = document.createElement("span");
      txtBadge.className = "harvest-badge-hdr";
      txtBadge.style.cssText = "background:rgba(91,141,239,.15); color:#5b8def; border-color:rgba(91,141,239,.3);";
      txtBadge.textContent = img.source === "TELEGRAM-TEXT-SIMHASH" ? "TELEGRAM TEXT" : img.source === "MESSENGER-TEXT-SIMHASH" ? "MESSENGER TEXT" : img.source === "WHATSAPP-TEXT-SIMHASH" ? "WHATSAPP TEXT" : img.source === "X-TWEET-SIMHASH" ? "X TWEET" : img.source === "X-DM-SIMHASH" ? "X DM" : img.source === "LINKEDIN-FEED-SIMHASH" ? "LINKEDIN FEED" : img.source === "LINKEDIN-URL-SIMHASH" ? "LINKEDIN POST" : img.source === "LINKEDIN-PROFILE-SIMHASH" ? "LINKEDIN PROFILE" : img.source === "LINKEDIN-PULSE-SIMHASH" ? "LINKEDIN ARTICLE" : img.source === "LINKEDIN-COMMENT-SIMHASH" ? "LINKEDIN COMMENT" : img.source === "LINKEDIN-MSG-SIMHASH" ? "LINKEDIN DM" : img.source === "FACEBOOK-TEXT-SIMHASH" ? "FACEBOOK TEXT" : img.source === "SOCIAL-TEXT-SIMHASH" ? "SOCIAL TEXT" : img.source === "TEXT-SIMHASH" ? "WEB TEXT" : img.source === "EMAIL-SIGNATURE" ? "EMAIL SIGNATURE" : "EMAIL TEXT";
      hashLine.appendChild(txtBadge);
    }
    const metaLine = document.createElement("div");
    metaLine.className = "harvest-meta";
    const blobLabel = isBlob && img.alt && !img.url.includes("telegram-img") ? img.alt : null;
    metaLine.textContent = isTextHash ? img.alt ? '"' + img.alt + '"' : img.url : blobLabel || img.url;
    if (blobLabel) metaLine.title = img.url;
    const dimsLine = document.createElement("div");
    dimsLine.className = "harvest-dims";
    if (isTextHash) {
      dimsLine.textContent = img.source + (img.alt ? " preview: " + img.alt.slice(0, 60) : "");
    } else {
      dimsLine.textContent = img.width + "\xD7" + img.height + "px (nat: " + img.naturalWidth + "\xD7" + img.naturalHeight + ") T" + img.tier + " " + img.source + (img.alt ? ' alt="' + img.alt + '"' : "");
    }
    info.appendChild(hashLine);
    info.appendChild(metaLine);
    info.appendChild(dimsLine);
    if (isTextHash && img.alt) {
      const ktPrefix = _hbExtractKt(img.alt);
      const isCurrentTokenMatch = ktPrefix && _hbCurrentToken && ktPrefix === _hbCurrentToken;
      if (isCurrentTokenMatch) {
        const registerRow = document.createElement("div");
        registerRow.className = "hb-register-row";
        const registerBtn = document.createElement("button");
        registerBtn.className = "hb-register-btn";
        registerBtn.textContent = t("register");
        const registerInfo = document.createElement("span");
        registerInfo.className = "hb-register-info";
        registerBtn.onclick = (ev) => {
          ev.stopPropagation();
          _hbTriggerRegister(registerBtn, registerInfo, img, currentTabUrl);
        };
        registerRow.appendChild(registerBtn);
        registerRow.appendChild(registerInfo);
        registerRow.addEventListener("click", (ev) => ev.stopPropagation());
        info.appendChild(registerRow);
        if (_hbIsPersonPublication(img.source, img.permalink || currentTabUrl)) {
          const hmacNote = document.createElement("div");
          hmacNote.className = "hb-hmac-notice";
          hmacNote.textContent = t("hmac_notice") + " ";
          const pLink = document.createElement("a");
          pLink.className = "hb-hmac-link";
          pLink.href = "https://www.kicktech.io/privacy#10-2";
          pLink.target = "_blank";
          pLink.rel = "noopener noreferrer";
          pLink.textContent = t("hmac_notice_link");
          pLink.addEventListener("click", (ev) => ev.stopPropagation());
          hmacNote.appendChild(pLink);
          info.appendChild(hmacNote);
        }
      }
    }
    item.appendChild(thumb);
    item.appendChild(info);
    item.addEventListener("click", () => {
      navigator.clipboard.writeText("0x" + img.hash).then(() => {
        hashLine.style.color = "var(--ok)";
        setTimeout(() => {
          hashLine.style.color = "";
        }, 800);
      });
    });
    const mag = document.createElement("button");
    mag.className = "harvest-magnifier";
    mag.textContent = "\u{1F50D}";
    mag.title = t("view_details");
    mag.addEventListener("click", (e) => {
      e.stopPropagation();
      showHarvestDetail(img, item);
    });
    item.appendChild(mag);
    list.appendChild(item);
  }
  if (!$("harvestDetail").dataset.bound) {
    $("harvestDetail").dataset.bound = "1";
    $("harvestDetailClose").addEventListener("click", (e) => {
      e.stopPropagation();
      $("harvestDetail").classList.remove("visible");
    });
    $("harvestDetailHash").addEventListener("click", (e) => {
      e.stopPropagation();
      const hash = $("harvestDetailHash").dataset.hash;
      if (hash) navigator.clipboard.writeText(hash).then(() => {
        $("harvestDetailHash").style.opacity = ".4";
        setTimeout(() => {
          $("harvestDetailHash").style.opacity = "";
          $("harvestDetail").classList.remove("visible");
        }, 500);
      });
    });
    document.addEventListener("click", (e) => {
      const d = $("harvestDetail");
      if (d.classList.contains("visible") && !d.contains(e.target) && !e.target.classList.contains("harvest-magnifier")) {
        d.classList.remove("visible");
      }
    });
  }
  panel.style.display = "block";
}
function showHarvestDetail(img, anchorItem) {
  const detail = $("harvestDetail");
  const imgDiv = $("harvestDetailImg");
  const hashEl = $("harvestDetailHash");
  const metaEl = $("harvestDetailMeta");
  const dimsEl = $("harvestDetailDims");
  imgDiv.innerHTML = "";
  const src = img.url || "";
  const isText = img.source && (img.source.includes("SIMHASH") || img.source.includes("TEXT"));
  if (isText) {
    const pre = document.createElement("div");
    pre.style.cssText = "font-size:11px;color:var(--info);padding:8px;background:rgba(91,141,239,.08);border-radius:4px;margin-bottom:6px;word-break:break-word;";
    pre.textContent = img.alt || "(text hash)";
    imgDiv.appendChild(pre);
  } else if (src.startsWith("http") || src.startsWith("blob:")) {
    const i = document.createElement("img");
    i.src = src;
    i.onerror = () => i.remove();
    imgDiv.appendChild(i);
  }
  const hashStr = "0x" + img.hash;
  hashEl.textContent = hashStr;
  hashEl.dataset.hash = hashStr;
  hashEl.title = t("click_copy");
  const blobLabel = src.startsWith("blob:") && img.alt ? img.alt : null;
  metaEl.textContent = blobLabel || (src.length > 55 ? src.slice(0, 52) + "\u2026" : src);
  if (blobLabel) metaEl.title = src;
  dimsEl.textContent = img.width + "\xD7" + img.height + "px (nat: " + img.naturalWidth + "\xD7" + img.naturalHeight + ") T" + img.tier + " " + img.source;
  const listEl = $("harvestList");
  const itemTop = anchorItem.offsetTop;
  detail.style.top = itemTop + anchorItem.offsetHeight + 2 + "px";
  detail.classList.add("visible");
  setTimeout(() => detail.scrollIntoView && detail.scrollIntoView({ block: "nearest" }), 10);
}
function noPreview(img) {
  const el = document.createElement("div");
  el.className = "no-preview";
  if (!img) {
    el.textContent = "SVG";
    return el;
  }
  const src = img.url || "";
  if (src.startsWith("(inline-svg)")) {
    el.textContent = "SVG";
  } else if (src.startsWith("blob:")) {
    el.textContent = img.alt ? img.alt.slice(0, 3).toUpperCase() || "IMG" : "IMG";
    el.style.fontSize = "7px";
    el.style.padding = "2px";
  } else {
    el.textContent = img.tag || "IMG";
  }
  return el;
}
$("btnCopyHarvest").addEventListener("click", () => {
  if (!harvestData) return;
  const exportData = {
    url: harvestData.url,
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    totalScanned: harvestData.totalScanned,
    matchedCount: harvestData.matchedCount,
    images: harvestData.images
  };
  navigator.clipboard.writeText(JSON.stringify(exportData, null, 2)).then(() => {
    const btn = $("btnCopyHarvest");
    btn.textContent = t("copied");
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = "Copy JSON";
      btn.classList.remove("copied");
    }, 1500);
  });
});
$("btnCloseHarvest").addEventListener("click", () => {
  $("harvestPanel").style.display = "none";
});
$("btnThemeToggle").addEventListener("click", () => {
  const isLight = document.body.classList.toggle("light");
  $("btnThemeToggle").textContent = isLight ? "\u{1F319}" : "\u2600\uFE0F";
  $("btnThemeToggle").title = isLight ? "Switch to dark theme" : "Switch to light theme";
});
Object.assign(HB_I18N.pl, {
  plus_title: "Tryb PLUS",
  plus_mode_hint: "Rejestruj wpisy pod tagiem Twojej organizacji (wymaga portfela Issuera).",
  plus_connect: "Po\u0142\u0105cz portfel",
  plus_connecting: "Otwieram okno portfela\u2026",
  plus_window_opened: "Otwarto okno portfela \u2014 potwierd\u017A po\u0142\u0105czenie, potem wr\xF3\u0107 tutaj.",
  plus_connected: "Po\u0142\u0105czono",
  plus_disconnect: "Od\u0142\u0105cz",
  plus_disconnect_wallet: "Od\u0142\u0105cz portfel",
  plus_signtest: "Test podpisu",
  plus_sign_prompt: "Podpisz w portfelu, potem wr\xF3\u0107 tutaj po wynik\u2026",
  plus_reg_last_ok: "Ostatnia rejestracja PLUS: \u2713",
  plus_reg_last_fail: "Ostatnia rejestracja PLUS: b\u0142\u0105d",
  plus_signtest_open: "Otwarto okno \u2014 podpisz wiadomo\u015B\u0107 testow\u0105.",
  plus_signtest_ok: "\u2713 Podpis testowy OK",
  plus_cancelled: "Anulowano",
  plus_error: "B\u0142\u0105d portfela"
});
Object.assign(HB_I18N.en, {
  plus_title: "PLUS mode",
  plus_mode_hint: "Register posts under your organization's tag (requires the Issuer wallet).",
  plus_connect: "Connect wallet",
  plus_connecting: "Opening wallet window\u2026",
  plus_window_opened: "Wallet window opened \u2014 approve the connection, then come back here.",
  plus_connected: "Connected",
  plus_disconnect: "Disconnect",
  plus_disconnect_wallet: "Disconnect wallet",
  plus_signtest: "Test signature",
  plus_sign_prompt: "Sign in your wallet, then come back here for the result\u2026",
  plus_reg_last_ok: "Last PLUS registration: \u2713",
  plus_reg_last_fail: "Last PLUS registration: error",
  plus_signtest_open: "Window opened \u2014 sign the test message.",
  plus_signtest_ok: "\u2713 Test signature OK",
  plus_cancelled: "Cancelled",
  plus_error: "Wallet error"
});
function _plusSend(type, payload) {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(Object.assign({ type }, payload || {}), (resp) => {
        if (chrome.runtime.lastError) {
          resolve(null);
          return;
        }
        resolve(resp || null);
      });
    } catch (e) {
      resolve(null);
    }
  });
}
function _shortAddr(a) {
  if (!a || a.length < 10) return a || "";
  return a.slice(0, 6) + "\u2026" + a.slice(-4);
}
function _plusRender(wallet) {
  const bar = $("hbPlusBar");
  if (!bar) return;
  const status = $("hbPlusStatus");
  const toggleBtn = $("hbPlusConnect");
  const addrEl = $("hbPlusAddr");
  const testBtn = $("hbPlusTest");
  if (wallet && wallet.address) {
    if (status && !status.textContent) {
      status.textContent = t("plus_connected");
      status.className = "hb-plus-status ok";
    }
    if (toggleBtn) {
      toggleBtn.style.display = "inline-block";
      toggleBtn.disabled = false;
      toggleBtn.dataset.mode = "disconnect";
      toggleBtn.textContent = t("plus_disconnect_wallet");
      toggleBtn.classList.add("ghost");
    }
    if (addrEl) {
      addrEl.style.display = "inline-block";
      addrEl.textContent = _shortAddr(wallet.address);
    }
    if (testBtn) testBtn.style.display = "inline-block";
  } else {
    if (status) {
      status.textContent = "";
      status.className = "hb-plus-status";
    }
    if (toggleBtn) {
      toggleBtn.style.display = "inline-block";
      toggleBtn.disabled = false;
      toggleBtn.dataset.mode = "connect";
      toggleBtn.textContent = t("plus_connect");
      toggleBtn.classList.remove("ghost");
    }
    if (addrEl) addrEl.style.display = "none";
    if (testBtn) testBtn.style.display = "none";
  }
}
async function _plusPoll(req, mode) {
  const deadline = Date.now() + 12e4;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 700));
    const resp = await _plusSend("PLUS_RESULT", { req });
    const result = resp && resp.result;
    if (!result) continue;
    const status = $("hbPlusStatus");
    if (result.ok && (result.mode === "connect" || result.mode === "signtest")) {
      const st = await _plusSend("PLUS_STATE");
      _plusRender(st && st.wallet);
      if (result.mode === "signtest" && status) {
        status.textContent = t("plus_signtest_ok");
        status.className = "hb-plus-status ok";
      }
    } else if (result.ok && result.mode === "sign") {
      if (status) {
        status.textContent = "\u2713";
        status.className = "hb-plus-status ok";
      }
    } else {
      _plusRender(null);
      if (status) {
        status.textContent = result.error === "window_closed" ? t("plus_cancelled") : t("plus_error") + ": " + (result.error || "?");
        status.className = "hb-plus-status err";
      }
    }
    return;
  }
}
async function initPlusWallet() {
  const bar = $("hbPlusBar");
  if (!bar) return;
  const connectBtn = $("hbPlusConnect");
  const testBtn = $("hbPlusTest");
  const titleEl = $("hbPlusTitle");
  const hintEl = $("hbPlusHint");
  if (titleEl) titleEl.textContent = t("plus_title");
  if (hintEl) hintEl.textContent = t("plus_mode_hint");
  const st = await _plusSend("PLUS_STATE");
  _plusRender(st && st.wallet);
  if (st && st.lastRegister) {
    const status = $("hbPlusStatus");
    const lr = st.lastRegister;
    if (status) {
      const okReg = lr.ok && lr.status === 200;
      status.textContent = okReg ? t("plus_reg_last_ok") : t("plus_reg_last_fail");
      status.className = "hb-plus-status " + (okReg ? "ok" : "err");
    }
  }
  if (connectBtn) connectBtn.addEventListener("click", async () => {
    const status = $("hbPlusStatus");
    if (connectBtn.dataset.mode === "disconnect") {
      connectBtn.disabled = true;
      await _plusSend("PLUS_DISCONNECT");
      _plusRender(null);
      return;
    }
    connectBtn.disabled = true;
    connectBtn.textContent = t("plus_connecting");
    const resp = await _plusSend("PLUS_CONNECT");
    if (!resp || !resp.ok || !resp.req) {
      _plusRender(null);
      if (status) {
        status.textContent = t("plus_error");
        status.className = "hb-plus-status err";
      }
      return;
    }
    if (status) {
      status.textContent = t("plus_window_opened");
      status.className = "hb-plus-status";
    }
    _plusPoll(resp.req, "connect");
  });
  if (testBtn) testBtn.addEventListener("click", async () => {
    const status = $("hbPlusStatus");
    const resp = await _plusSend("PLUS_SIGNTEST");
    if (resp && resp.ok && resp.req) {
      if (status) {
        status.textContent = t("plus_signtest_open");
        status.className = "hb-plus-status";
      }
      _plusPoll(resp.req, "signtest");
    }
  });
}
load();
initPlusWallet();
(() => {
  const tag = document.querySelector(".brand-text p");
  if (tag) tag.textContent = t("tagline");
})();
