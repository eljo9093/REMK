(function initRemkV345CleanUiMaster() {
  "use strict";
  if (window.__remkV345CleanLoaded) return;
  window.__remkV345CleanLoaded = true;

  const LOGS_KEY = "remk_v34_workout_logs_v1";
  const PR_KEY = "remk_v34_pr_map_v1";
  const HIST_KEY = "remk_v34_history_v1";
  const SEAT_KEY = "remk_v34_seat_pins_v1";
  const PIN_EX_KEY = "remk_v352_pinned_exercises_v1";

  window.v34State = window.v34State || {
    startTileMode: localStorage.getItem("remk_v34_tile_mode") || "training",
    fitSubTab: "logger",        // logger | analytics | complete
    nutriSubTab: "tracker",     // tracker | plan | recipes
    activeDayIdx: 0,
    activeExIdx: 0,
    activeSetIdx: 0,
    activeField: "kg",
    activeRir: 2,
    numpadOpen: !(typeof window !== "undefined" && window.innerWidth >= 1024 && window.matchMedia && window.matchMedia("(pointer: fine)").matches),
    numpadBuffer: "",
    analyticsMetric: "sets",
    readinessMode: "green",     // green (1.0) | yellow (0.95) | red (0.85)
    workoutStartTs: Date.now(),
    activeNutriDay: parseInt(localStorage.getItem("remk_active_nday_tab") || "1", 10) || 1,
    activeNutriWeek: 1,
    recipeQuery: "",
    recipeFilter: "all",
    cuisineFilter: localStorage.getItem("remk_v361_cuisine_filter") || "all",
    porkFreeOnly: localStorage.getItem("remk_v361_pork_free") === "true",
    recipeLimit: 40,
    hideCheckedShop: false,
    showExAnatomy: true,
    platePortionMode: "personal" // personal | pot
  };

  function escHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeJsonParse(raw, fallback) {
    try {
      const p = JSON.parse(raw);
      return p && typeof p === "object" ? p : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function getV351PartnerSlot() {
    if (typeof window.getActiveTrainingPartnerSlot === "function") {
      try {
        const s = window.getActiveTrainingPartnerSlot();
        if (s === "p2") return "p2";
      } catch (e) {}
    }
    return "p1";
  }
  function getV351ScopedKey(baseKey) {
    return getV351PartnerSlot() === "p2" ? (baseKey + "_p2") : baseKey;
  }
  function getV351DomLogPrefix() {
    if (typeof window.getPartnerLogPrefix === "function") {
      try { return window.getPartnerLogPrefix() || "remk_log_"; } catch (e) {}
    }
    return getV351PartnerSlot() === "p2" ? "remk_p2_log_" : "remk_log_";
  }

  let _v351ToastTimer = null;
  window.showV351Toast = function (msg) {
    let el = document.getElementById("remk-v351-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "remk-v351-toast";
      document.body.appendChild(el);
    }
    el.textContent = String(msg || "");
    el.classList.add("show");
    if (_v351ToastTimer) clearTimeout(_v351ToastTimer);
    _v351ToastTimer = setTimeout(function () { el.classList.remove("show"); }, 2300);
  };

  function loadV34Logs() {
    return safeJsonParse(localStorage.getItem(getV351ScopedKey(LOGS_KEY)) || "{}", {});
  }
  function saveV34Logs(obj) {
    try { localStorage.setItem(getV351ScopedKey(LOGS_KEY), JSON.stringify(obj)); } catch (e) {}
  }
  function loadPrMap() {
    return safeJsonParse(localStorage.getItem(getV351ScopedKey(PR_KEY)) || "{}", {});
  }
  function savePrMap(obj) {
    try { localStorage.setItem(getV351ScopedKey(PR_KEY), JSON.stringify(obj)); } catch (e) {}
  }
  function loadWorkoutHistory() {
    const raw = safeJsonParse(localStorage.getItem(getV351ScopedKey(HIST_KEY)) || "[]", []);
    return Array.isArray(raw) ? raw : [];
  }
  function saveWorkoutHistory(arr) {
    try { localStorage.setItem(getV351ScopedKey(HIST_KEY), JSON.stringify(arr.slice(-60))); } catch (e) {}
  }

  // =========================================================================
  // 1. THEME SYNC (HELLES CLEAN-UI STANDARD + ECHTER DARK-MODE UMSCHALTER)
  // =========================================================================
  function syncV345ThemeState() {
    const saved = localStorage.getItem("remk_theme_mode");
    const wantDark = (saved === "dark");
    document.body.classList.add("remk-v34-active");
    if (wantDark) {
      document.documentElement.classList.remove("remk-light-html");
      document.documentElement.classList.add("remk-v34-dark-html");
      document.body.classList.remove("remk-light-mode");
      document.body.classList.add("remk-v34-dark");
    } else {
      document.documentElement.classList.add("remk-light-html");
      document.documentElement.classList.remove("remk-v34-dark-html");
      document.body.classList.add("remk-light-mode");
      document.body.classList.remove("remk-v34-dark");
    }
  }

  function isDarkModeActive() {
    return document.body.classList.contains("remk-v34-dark");
  }

  // =========================================================================
  // 2. TOP-BAR AUTO-HIDE, SCROLL-STABILISIERUNG & MODAL SWIPE-ZURÜCK
  // =========================================================================
  let _v345LastScrollY = window.scrollY || 0;
  let _v345ScrollBound = false;
  let _v345TickerStarted = false;

  // FIX #3 (v35.2): Eine einzige, dauerhaft stabile Top-Bar (kein Austauschen, kein Wegscroll-Flackern)
  window.renderV352LockedTopBar = function () {
    const pinBar = document.getElementById("remk-pinned-display-widget");
    if (!pinBar) return;
    pinBar.classList.remove("collapsed", "remk-topbar-scroll-hidden");
    document.body.classList.add("has-remk-pinned-widget");

    const isLight = !isDarkModeActive();
    const isPartnerEnabled = localStorage.getItem("remk_partner_mode_enabled") === "true";
    const slot = getV351PartnerSlot();
    const names = (typeof window.getTrainingPartnerNames === "function")
      ? window.getTrainingPartnerNames()
      : { p1: localStorage.getItem("remk_user_name") || "Athlet 1", p2: localStorage.getItem("remk_partner_custom_name") || "Partner/in" };

    const userSwitchHtml = !isPartnerEnabled
      ? `
        <div class="remk-slim-user-switch">
          <button type="button" class="remk-slim-user-btn active-p1" onclick="if(typeof openProfileQuickModal==='function') openProfileQuickModal(); else if(typeof editActiveProfileNameQuick==='function') editActiveProfileNameQuick('p1');" title="Profil &amp; Partner verwalten">
            👤 ${escHtml(names.p1)}
          </button>
          <button type="button" class="remk-slim-user-plus" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('👥 Partner-Modus (p1 / p2)');return;}if(typeof togglePartnerCockpitMode==='function') togglePartnerCockpitMode(); window.renderV352LockedTopBar();" title="Partner hinzufügen">➕</button>
        </div>
      `
      : `
        <div class="remk-slim-user-switch">
          <button type="button" class="remk-slim-user-btn ${slot === 'p1' ? 'active-p1' : ''}" onclick="if(typeof switchTrainingPartnerSlot==='function') switchTrainingPartnerSlot('p1'); window.renderV352LockedTopBar();" title="Zu ${escHtml(names.p1)} wechseln">
            👤 ${escHtml(names.p1)}
          </button>
          <button type="button" class="remk-slim-user-btn ${slot === 'p2' ? 'active-p2' : ''}" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('👥 Partner-Modus (p1 / p2)');return;}if(typeof switchTrainingPartnerSlot==='function') switchTrainingPartnerSlot('p2'); window.renderV352LockedTopBar();" title="Zu ${escHtml(names.p2)} wechseln">
            👤 ${escHtml(names.p2)}
          </button>
          <button type="button" class="remk-slim-user-plus" onclick="if(typeof openProfileQuickModal==='function') openProfileQuickModal();" title="Namen bearbeiten">✏️</button>
        </div>
      `;

    pinBar.innerHTML = `
      ${userSwitchHtml}
      <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;">
        <button type="button" id="remk-v274-top-watch-btn" class="remk-v274-top-watch-btn" onclick="if(typeof openStandaloneWatchAppModalV256==='function')openStandaloneWatchAppModalV256();else if(typeof openSmartwatchHubModal==='function')openSmartwatchHubModal();" title="Watch Live-Sync">⌚ Watch</button>
        <button type="button" id="btn-slim-theme-toggle" onclick="if(typeof toggleRemkThemeMode==='function')toggleRemkThemeMode(); setTimeout(function(){syncV345ThemeState();window.renderV352LockedTopBar();}, 25);" class="remk-pin-quick-btn" style="padding:5px 8px;font-size:0.82rem;" title="Hell / Dunkel wechseln">${isLight ? "🌙" : "☀️"}</button>
      </div>
    `;
  };

  window.rebuildSlimTopBarWithUserAndThemeV17_3 = window.renderV352LockedTopBar;

  function setupTopbarAutoHideAndScrollV345() {
    try {
      if (window._remkWatchLivePollTimerV280) clearInterval(window._remkWatchLivePollTimerV280);
      if (window._remkWatchLivePollTimerV273) clearInterval(window._remkWatchLivePollTimerV273);
    } catch (e) {}

    if (!window.__remkV345OrigScrollTo) {
      window.__remkV345OrigScrollTo = window.scrollTo.bind(window);
      window.scrollTo = function () {
        if (window.__remkAllowScrollV345) {
          return window.__remkV345OrigScrollTo.apply(window, arguments);
        }
      };
    }

    if (typeof window.cleanCorruptedBodyweightRowsInDomV252 === "function") {
      window.cleanCorruptedBodyweightRowsInDomV252 = function () {};
    }
    if (typeof window.applyBeginnerStarterWeightV228 === "function") {
      window.applyBeginnerStarterWeightV228 = function () {};
    }

    window.renderV352LockedTopBar();

    // Halte die Top-Bar dauerhaft sichtbar und unterdrücke ältere Scroll-Hide-Klassen
    if (!_v345ScrollBound) {
      _v345ScrollBound = true;
      window.addEventListener("scroll", function () {
        const pinBar = document.getElementById("remk-pinned-display-widget");
        if (pinBar && pinBar.classList.contains("remk-topbar-scroll-hidden")) {
          pinBar.classList.remove("remk-topbar-scroll-hidden");
        }
      }, { passive: true });
    }

    if (!_v345TickerStarted) {
      _v345TickerStarted = true;
      setInterval(function () {
        const swEl = document.getElementById("v34-live-stopwatch");
        if (swEl && document.body.classList.contains("remk-v34-in-workout")) {
          const sec = Math.max(1, Math.floor((Date.now() - window.v34State.workoutStartTs) / 1000));
          const h = Math.floor(sec / 3600);
          const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
          const s = String(sec % 60).padStart(2, "0");
          swEl.textContent = `${h}:${m}:${s}`;
        }
        const rdEl = document.getElementById("v34-live-rest-disp");
        const legacyTimer = document.getElementById("timer-display");
        if (rdEl && legacyTimer) {
          rdEl.textContent = legacyTimer.innerText || "00:00";
        }
      }, 1000);
    }
  }

  window.v345SmoothTop = function (instant) {
    const pinBar = document.getElementById("remk-pinned-display-widget");
    if (pinBar) pinBar.classList.remove("remk-topbar-scroll-hidden");
    window.__remkAllowScrollV345 = true;
    try {
      if (instant) window.scrollTo(0, 0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {}
    setTimeout(function () { window.__remkAllowScrollV345 = false; }, instant ? 40 : 320);
  };

  window.closeV345OpenModals = function () {
    let closed = false;
    ["remk-v34-recipe-modal", "remk-v34-warmup-modal"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.style.display && el.style.display !== "none") {
        el.style.display = "none";
        el.style.transform = "";
        closed = true;
      }
    });
    return closed;
  };

  function bindSwipeBackOnModal(modalEl) {
    if (!modalEl || modalEl.dataset.v345SwipeBound === "1") return;
    modalEl.dataset.v345SwipeBound = "1";
    let sx = 0, sy = 0, tracking = false;

    modalEl.addEventListener("touchstart", function (e) {
      if (!e.touches || e.touches.length !== 1) return;
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      tracking = true;
      modalEl.style.transition = "none";
    }, { passive: true });

    modalEl.addEventListener("touchmove", function (e) {
      if (!tracking || !e.touches || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - sx;
      const dy = e.touches[0].clientY - sy;
      if (dx > 18 && dx > Math.abs(dy) * 1.35) {
        modalEl.style.transform = `translateX(${Math.min(dx, 260)}px)`;
      }
    }, { passive: true });

    modalEl.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      modalEl.style.transition = "transform 0.2s ease-out";
      const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : sx;
      const endY = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : sy;
      const dx = endX - sx;
      const dy = endY - sy;
      if (dx > 75 && dx > Math.abs(dy) * 1.25) {
        modalEl.style.transform = "translateX(100%)";
        setTimeout(function () {
          modalEl.style.display = "none";
          modalEl.style.transform = "";
        }, 160);
        if (typeof window.triggerIosHaptic === "function") window.triggerIosHaptic("light");
      } else {
        modalEl.style.transform = "";
      }
    }, { passive: true });
  }

  // Android / Browser Zurück-Geste schließt ZUERST unsere Clean-UI Modals (ohne die Seite zu verlassen!)
  window.addEventListener("popstate", function (evt) {
    if (window.closeV345OpenModals()) {
      if (evt && typeof evt.stopImmediatePropagation === "function") evt.stopImmediatePropagation();
      if (typeof window.triggerIosHaptic === "function") window.triggerIosHaptic("light");
    }
  }, true);

  // =========================================================================
  // 3. START-HUB ("Was möchtest du heute generieren?") IN #remk-home-pane-planer
  // =========================================================================
  function getPersonalAthleteTargetCals() {
    if (typeof window.computeExactHouseholdBreakdownV228 === "function") {
      try {
        const sh = window.computeExactHouseholdBreakdownV228();
        if (sh && sh.athleteCals > 800) return Math.round(sh.athleteCals);
      } catch (e) {}
    }
    if (window.householdShares && window.householdShares.athleteCals > 800) {
      return Math.round(window.householdShares.athleteCals);
    }
    return parseInt(document.getElementById("calories")?.value || "2500", 10) || 2500;
  }

  window.renderV345StartHub = function () {
    const step1 = document.getElementById("step-1");
    if (!step1) return;

    const targetHost = document.getElementById("remk-home-pane-planer") || step1;
    let hub = document.getElementById("remk-v34-start-hub");
    if (!hub) {
      hub = document.createElement("div");
      hub.id = "remk-v34-start-hub";
      targetHost.insertBefore(hub, targetHost.firstChild);
    } else if (hub.parentNode !== targetHost) {
      targetHost.insertBefore(hub, targetHost.firstChild);
    }

    const usr = localStorage.getItem("remk_user_name") || "Athlet";
    const cals = getPersonalAthleteTargetCals();
    const mode = window.v34State.startTileMode || "training";
    const curGoal = document.getElementById("goal_training")?.value || "muskelaufbau";
    const curEquip = document.getElementById("equipment")?.value || "gym";
    const curDays = document.getElementById("training_days")?.value || "3";
    const curDiet = document.getElementById("diet_type")?.value || "classic";
    const hasSavedPlan = Boolean(localStorage.getItem("remk_last_plan_html"));

    hub.innerHTML = `
      <div class="v34-hello-card">
        <div>
          <div style="font-size:0.72rem;font-weight:900;color:#ff5e00;text-transform:uppercase;letter-spacing:0.4px;">
            RE:MK 360° &bull; v36.3 &bull; Hallo ${escHtml(usr)} 👋
          </div>
          <div style="font-size:1.05rem;font-weight:900;margin-top:2px;">
            Dein persönlicher Coaching-Hub
          </div>
        </div>
        <div class="v34-kcal-badge" onclick="window.openV345CockpitDirectly()" style="cursor:pointer;" title="Zum Cockpit">🔥 ${cals} kcal</div>
      </div>

      ${(function () {
        const sb = window.REMK_SCIENCE_BRAIN;
        const role = sb ? sb.getUserRoleMode() : "all";
        const prot = sb ? sb.getProtectionMode() : { mode: "none" };
        const mChk = sb ? sb.getTodayMorningReadiness() : null;
        const ver = (sb && sb.getBrainConfig().version) || "2026.11";
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
            <div style="display:inline-flex;gap:4px;flex-wrap:wrap;">
              ${[["all", "✨ Alle"], ["privat", "💪 Privat"], ["familie", "👨‍👩‍👧 Familie"], ["verein", "🏟️ Verein"]].map(function (p) {
                const act = role === p[0];
                return `<button type="button" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.setUserRoleMode('${p[0]}')" style="border:1px solid ${act ? '#ff5e00' : 'var(--v34-border)'};background:${act ? 'rgba(255,94,0,0.16)' : 'var(--v34-card-soft)'};color:${act ? '#ff5e00' : 'var(--v34-muted)'};border-radius:99px;padding:4px 9px;font-size:0.7rem;font-weight:800;cursor:pointer;">${p[1]}</button>`;
              }).join("")}
            </div>
            <span onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openScienceExplainSheet('acwr','🧠 RE:MK Science-Core ' + '${ver}');" style="font-size:0.65rem;font-weight:800;color:#10b981;cursor:pointer;">🧠 Core ${escHtml(ver)}</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:10px;">
            <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openMorningReadinessModal()" style="padding:8px 9px;border-radius:12px;font-size:0.73rem;font-weight:800;text-align:left;">
              ☀️ Morgen-Check ${mChk ? (mChk.mode === 'green' ? '🟢' : (mChk.mode === 'yellow' ? '🟡' : '🔴')) : '· 30s'}
            </button>
            <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN){const cur=window.REMK_SCIENCE_BRAIN.getProtectionMode().mode;window.REMK_SCIENCE_BRAIN.setProtectionMode(cur==='none'?'sick':(cur==='sick'?'travel':'none'));}" style="padding:8px 9px;border-radius:12px;font-size:0.73rem;font-weight:800;text-align:left;${prot.mode !== 'none' ? 'border-color:#38bdf8;color:#38bdf8;' : ''}">
              ${prot.mode === 'sick' ? '🤒 Krank-Schutz aktiv' : (prot.mode === 'travel' ? '✈️ Urlaub-Schutz aktiv' : '🛡️ Krank / Urlaub')}
            </button>
          </div>
        `;
      })()}

      <h2 style="font-size:1.3rem;font-weight:900;margin:0 0 4px 0;">Was möchtest du heute generieren?</h2>
      <div style="font-size:0.82rem;color:var(--v34-muted);font-weight:600;margin-bottom:8px;">
        Wähle deinen Schwerpunkt oder nutze eine 1-Tap Schnellstart-Vorlage:
      </div>

      <div class="v34-presets-strip">
        <button type="button" class="v34-preset-chip" onclick="window.applyV345QuickPreset('cut')">🔥 Abnehmen (-400)</button>
        <button type="button" class="v34-preset-chip" onclick="window.applyV345QuickPreset('bulk')">💪 Muskelaufbau (+250)</button>
        <button type="button" class="v34-preset-chip" onclick="window.applyV345QuickPreset('shift')">⚡ Schicht &amp; Büro</button>
        <button type="button" class="v34-preset-chip" onclick="window.applyV345QuickPreset('family')">👨‍👩‍👧 Familie</button>
        <button type="button" class="v34-preset-chip" onclick="if(typeof window.requireRemkPro==='function'&&!window.requireRemkPro('🤸 Calisthenics- &amp; Freeletics-Generator'))return;if(typeof window.startCalisthenicsFreeleticsGeneratorModeV2211==='function'){document.body.classList.remove('remk-v34-in-workout','remk-v34-in-nutrition');window.startCalisthenicsFreeleticsGeneratorModeV2211();}else{window.selectV345StartTile('training');window.openV345DetailedWizard();}">🤸 Calisthenics</button>
      </div>

      <div class="v34-2x2-grid">
        <div class="v34-mode-tile ${mode === 'training' ? 'active' : ''}" onclick="window.selectV345StartTile('training')">
          <span style="font-size:2.1rem;line-height:1;">🏋️</span>
          <span>Fitness</span>
        </div>
        <div class="v34-mode-tile ${mode === 'ernaehrung' ? 'active' : ''}" onclick="window.selectV345StartTile('ernaehrung')">
          <span style="font-size:2.1rem;line-height:1;">🍲</span>
          <span>Ernährung</span>
        </div>
        <div class="v34-mode-tile ${mode === 'stretching' ? 'active' : ''}" onclick="window.selectV345StartTile('stretching')">
          <span style="font-size:2.1rem;line-height:1;">🧘</span>
          <span>Mobility</span>
        </div>
        <div class="v34-mode-tile ${mode === 'athletik_verein' ? 'active' : ''}" onclick="window.selectV345StartTile('athletik_verein')">
          <span style="font-size:2.1rem;line-height:1;">⚽</span>
          <span>Vereinssport</span>
        </div>
      </div>

      ${(function () {
        const isPro = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
        const usedStarter = localStorage.getItem("remk_free_starter_gen_used") === "true";
        const ctaLbl = isPro
          ? "⚡ Plan sofort generieren"
          : (usedStarter ? "🔒 KI-Generator (RE:MK Pro)" : "⚡ 1× Starter-Plan kostenlos generieren");
        return `
          ${!isPro ? `
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;border-radius:14px;background:rgba(255,94,0,0.10);border:1px solid rgba(255,94,0,0.36);margin-bottom:10px;">
              <span style="font-size:0.74rem;font-weight:800;">⭐ <strong>RE:MK Free aktiv</strong> &bull; Logbuch &amp; Baukasten frei</span>
              <button type="button" onclick="if(typeof window.openRemkProUpgradeSheet==='function')window.openRemkProUpgradeSheet('🚀 Alle RE:MK Pro-Funktionen');" style="border:none;background:#ff5e00;color:#fff;border-radius:9px;padding:5px 9px;font-size:0.71rem;font-weight:900;cursor:pointer;white-space:nowrap;">⚡ Pro</button>
            </div>
          ` : ''}
          <button type="button" class="v34-primary-cta" onclick="window.executeV345QuickGenerate()">
            ${ctaLbl}
          </button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.openManualPlanBuilderSheet();" style="width:100%;height:42px;border-radius:14px;font-weight:800;font-size:0.82rem;margin-bottom:8px;">
            🛠️ Eigenen Plan selbst bauen (${isPro ? 'Unbegrenzt' : 'Free · bis 2 Pläne'})
          </button>
        `;
      })()}

      ${hasSavedPlan ? `
        <button type="button" onclick="window.openV345SavedPlanDirect()" style="width:100%;height:44px;border-radius:14px;border:1.5px solid #10b981;background:rgba(16,185,129,0.1);color:#059669;font-weight:900;font-size:0.86rem;cursor:pointer;margin-bottom:10px;">
          ▶️ Aktiven gespeicherten Plan öffnen
        </button>
      ` : ''}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
        <button type="button" class="v34-btn-soft" onclick="window.openV345DetailedWizard()" style="height:44px;border-radius:14px;font-weight:800;font-size:0.8rem;">
          ⚙️ Detail-Setup öffnen
        </button>
        <button type="button" class="v34-btn-soft" onclick="window.selectV345StartTile('beides');window.executeV345QuickGenerate();" style="height:44px;border-radius:14px;font-weight:800;font-size:0.8rem;">
          🏃 Kombi: Fit + Essen
        </button>
      </div>

      <details style="background:var(--v34-card);border:1px solid var(--v34-border);border-radius:16px;padding:11px 14px;margin-bottom:10px;">
        <summary style="font-size:0.86rem;font-weight:800;color:var(--v34-text);cursor:pointer;">
          🎛️ Schnell-Optionen &amp; Eigene Inhalte (Optional)
        </summary>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;">
          <div>
            <label style="font-size:0.72rem;font-weight:800;color:var(--v34-muted);display:block;margin-bottom:4px;">Trainingsziel</label>
            <select onchange="const el=document.getElementById('goal_training');if(el)el.value=this.value;" style="padding:9px;border-radius:10px;font-weight:800;font-size:0.82rem;background:var(--v34-card-soft);color:var(--v34-text);border:1px solid var(--v34-border);">
              <option value="muskelaufbau" ${curGoal === 'muskelaufbau' ? 'selected' : ''}>💪 Muskelaufbau</option>
              <option value="kraft" ${curGoal === 'kraft' ? 'selected' : ''}>🏋️ Maximalkraft</option>
              <option value="athletik" ${curGoal === 'athletik' ? 'selected' : ''}>⚡ Athletik</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.72rem;font-weight:800;color:var(--v34-muted);display:block;margin-bottom:4px;">Trainingsort</label>
            <select onchange="const el=document.getElementById('equipment');if(el)el.value=this.value;" style="padding:9px;border-radius:10px;font-weight:800;font-size:0.82rem;background:var(--v34-card-soft);color:var(--v34-text);border:1px solid var(--v34-border);">
              <option value="gym" ${curEquip === 'gym' ? 'selected' : ''}>🏟️ Fitnessstudio</option>
              <option value="homegym" ${curEquip === 'homegym' ? 'selected' : ''}>🏠 Home-Gym</option>
              <option value="bodyweight" ${curEquip === 'bodyweight' ? 'selected' : ''}>🤸 Körpergewicht</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.72rem;font-weight:800;color:var(--v34-muted);display:block;margin-bottom:4px;">Tage / Woche</label>
            <select onchange="const el=document.getElementById('training_days');if(el)el.value=this.value;" style="padding:9px;border-radius:10px;font-weight:800;font-size:0.82rem;background:var(--v34-card-soft);color:var(--v34-text);border:1px solid var(--v34-border);">
              <option value="2" ${curDays === '2' ? 'selected' : ''}>2 Tage</option>
              <option value="3" ${curDays === '3' ? 'selected' : ''}>3 Tage</option>
              <option value="4" ${curDays === '4' ? 'selected' : ''}>4 Tage</option>
              <option value="5" ${curDays === '5' ? 'selected' : ''}>5 Tage</option>
              <option value="6" ${curDays === '6' ? 'selected' : ''}>6 Tage</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.72rem;font-weight:800;color:var(--v34-muted);display:block;margin-bottom:4px;">Ernährungsweise</label>
            <select onchange="if(typeof window.setDietType==='function')window.setDietType(this.value);" style="padding:9px;border-radius:10px;font-weight:800;font-size:0.82rem;background:var(--v34-card-soft);color:var(--v34-text);border:1px solid var(--v34-border);">
              <option value="classic" ${curDiet === 'classic' ? 'selected' : ''}>🥩 Klassisch</option>
              <option value="all" ${curDiet === 'all' ? 'selected' : ''}>🍽️ Flexitarisch</option>
              <option value="veggie" ${curDiet === 'veggie' ? 'selected' : ''}>🌱 Veggie / Vegan</option>
            </select>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
          <button type="button" class="v34-btn-soft" onclick="if(typeof window.openCustomExerciseModal==='function')window.openCustomExerciseModal();" style="padding:9px;border-radius:10px;font-size:0.76rem;font-weight:800;">+ Eigene Übung</button>
          <button type="button" class="v34-btn-soft" onclick="if(typeof window.openCustomRecipeModal==='function')window.openCustomRecipeModal();" style="padding:9px;border-radius:10px;font-size:0.76rem;font-weight:800;">+ Eigenes Rezept</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:7px;">
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_COURSE_CLUB)window.REMK_COURSE_CLUB.openCourseGeneratorModal();" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;border-color:rgba(16,185,129,0.4);color:#10b981;">🔥 Kursgenerator (Verein)</button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openAutoCooldownFlowModal();" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;">🧘 Auto-Cool-Down</button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openProgressPhotoStudioModal();" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;">📸 Vorher/Nachher-Studio</button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN){const p=window.REMK_SCIENCE_BRAIN.getActiveGymProfile();window.REMK_SCIENCE_BRAIN.setActiveGymProfile(p==='studio_a'?'homegym':(p==='homegym'?'travel':'studio_a'));}" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;">${(function(){const p=window.REMK_SCIENCE_BRAIN?window.REMK_SCIENCE_BRAIN.getActiveGymProfile():'studio_a';return p==='homegym'?'🏠 Home-Gym (2kg)':(p==='travel'?'✈️ Reise-Profil':'🏢 Studio A (2,5kg)');})()}</button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.exportFullBackupJson();" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;">💾 Voll-Backup</button>
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.importFullBackupJson();" style="padding:9px;border-radius:10px;font-size:0.75rem;font-weight:800;">📂 Backup laden</button>
        </div>
        ${(localStorage.getItem("remk_user_role") === "Admin" || localStorage.getItem("remk_admin_free_preview_v360") === "true") ? `
          <button type="button" class="v34-btn-soft" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.toggleAdminFreePreview();" style="width:100%;margin-top:8px;padding:8px;border-radius:10px;font-size:0.74rem;font-weight:800;border-color:rgba(255,94,0,0.45);color:#ff5e00;">
            ${localStorage.getItem("remk_admin_free_preview_v360") === "true" ? '🔥 Admin-Vorschau beenden (Zurück zu Pro)' : '👀 Free-Modus als Admin testen'}
          </button>
        ` : ''}
      </details>
    `;
  };

  window.selectV345StartTile = function (modeKey) {
    window.v34State.startTileMode = modeKey;
    try { localStorage.setItem("remk_v34_tile_mode", modeKey); } catch (e) {}
    window.renderV345StartHub();
  };

  window.applyV345QuickPreset = function (presetKey) {
    if (presetKey === "family" && typeof window.requireRemkPro === "function" && !window.requireRemkPro("👨‍👩‍👧 Familien- &amp; Kinder-Topf-Skalierung")) return;
    const setVal = function (id, v) { const el = document.getElementById(id); if (el) el.value = v; };
    if (presetKey === "cut") {
      setVal("athlete_goal", "-300");
      setVal("goal_training", "muskelaufbau");
      setVal("food_style", "athlet");
      window.v34State.startTileMode = "beides";
    } else if (presetKey === "bulk") {
      setVal("athlete_goal", "250");
      setVal("goal_training", "muskelaufbau");
      setVal("food_style", "athlet");
      window.v34State.startTileMode = "beides";
    } else if (presetKey === "shift") {
      setVal("food_style", "schicht");
      setVal("prep_style", "schnell");
      setVal("meal_prep_days", "3");
      window.v34State.startTileMode = "beides";
    } else if (presetKey === "family") {
      setVal("food_style", "familie");
      const hp = document.getElementById("has_partner");
      if (hp && !hp.checked) {
        hp.checked = true;
        const ps = document.getElementById("partner_setup");
        if (ps) ps.style.display = "grid";
      }
      window.v34State.startTileMode = "ernaehrung";
    }
    if (typeof window.autoCalcCalories === "function") window.autoCalcCalories();
    if (typeof window.saveFormState === "function") window.saveFormState();
    window.renderV345StartHub();
  };

  window.openV345DetailedWizard = function () {
    const mode = window.v34State.startTileMode || "training";
    const isPro = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
    if (!isPro) {
      if (mode === "ernaehrung" || mode === "beides") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("🍲 Detail-Setup: Ernährungs- &amp; Familien-Generator");
        return;
      }
      if (mode === "athletik_verein" || mode === "stretching") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("⚽ Spezial-Setup (Vereins-Athletik &amp; Mobility)");
        return;
      }
      if (localStorage.getItem("remk_free_starter_gen_used") === "true") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("⚙️ Detail-Setup: KI-Trainingsplan-Generator");
        return;
      }
    }
    document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
    if (typeof window.selectMode === "function") window.selectMode(mode);
    window.v345SmoothTop(true);
  };

  window.openV345CockpitDirectly = function () {
    document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
    if (typeof window.handleIosDockNav === "function") window.handleIosDockNav("cockpit");
    else if (typeof window.switchHomeSlide === "function") window.switchHomeSlide("cockpit");
    window.v345SmoothTop(true);
  };

  window.openV345SavedPlanDirect = function () {
    if (typeof window.resumeLastSavedPlan === "function") window.resumeLastSavedPlan();
    setTimeout(function () {
      window.syncV345ActiveScreenState();
      window.v345SmoothTop(true);
    }, 60);
  };

  window.executeV345QuickGenerate = function () {
    const mode = window.v34State.startTileMode || "training";
    const isPro = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();

    if (!isPro) {
      if (mode === "ernaehrung" || mode === "beides") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("🍲 Vollautomatischer Ernährungs- & Familien-Plan-Generator");
        return;
      }
      if (mode === "athletik_verein" || mode === "stretching") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet(mode === "stretching" ? "🧘 Mobility & Stretching-Generator" : "⚽ Vereins-Athletik & Team-Zirkel-Generator");
        return;
      }
      if (localStorage.getItem("remk_free_starter_gen_used") === "true") {
        if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("⚡ Unbegrenzter KI-Trainingsplan-Generator (Mesozyklen)");
        return;
      }
      localStorage.setItem("remk_free_starter_gen_used", "true");
      window.__remkV361AllowCurrentStarterGen = true;
      window.showV351Toast("🎁 Dein kostenloser Starter-Plan wird generiert!");
    }

    if (mode === "athletik_verein" || mode === "stretching") {
      document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
      if (typeof window.selectMode === "function") window.selectMode(mode);
      window.v345SmoothTop(true);
      return;
    }
    const targetScreen = (mode === "ernaehrung") ? "nutrition" : "workout";
    localStorage.setItem("remk_active_single_page", targetScreen);
    window.v34State.fitSubTab = "logger";
    window.v34State.activeDayIdx = 0;
    window.v34State.activeExIdx = 0;
    window.v34State.activeSetIdx = 0;

    if (typeof window.setRemkCurrentMode === "function") window.setRemkCurrentMode(mode);
    if (typeof window.generateMasterPlan === "function") window.generateMasterPlan();

    activateV345ScreenMode(targetScreen);
    setTimeout(function () {
      const rb = document.getElementById("result-box");
      if (rb) rb.style.display = "block";
      activateV345ScreenMode(targetScreen);
      window.v345SmoothTop(true);
    }, 90);
  };

  // =========================================================================
  // 4. FITNESS CLEAN-UI (LOGGER, WOCHEN-SWITCH, NUMPAD, RIR, 1RM/PR, ANATOMIE)
  // =========================================================================
  function isBodyweightExerciseName(exName) {
    const n = String(exName || "").toLowerCase();
    return /push-?up|liegestütz|planche|plank|klimmzug|pull-?up|chin-?up|dip|burpee|sprawl|crunch|sit-?up|dead bug|bird-?dog|bodyweight|freeletics|calisthenics|pistol|shrimp|skater squat|air squat|jump squat|hollow|l-sit|dragon flag|mountain climber|bear crawl|wall sit/.test(n);
  }

  function getRecommendedRestSeconds(exName, mech) {
    const n = String(exName || "").toLowerCase();
    const m = String(mech || "").toLowerCase();
    const userPref = parseInt(document.getElementById("rest_times")?.value || "90", 10) || 90;
    if (m.includes("squat") || m.includes("hinge") || n.includes("kniebeuge") || n.includes("kreuzheben") || n.includes("bankdrücken") || n.includes("military")) {
      return Math.max(userPref, 120);
    }
    if (m.includes("iso") || m.includes("core") || m.includes("calf") || n.includes("curl") || n.includes("seitheben") || n.includes("plank")) {
      return Math.min(userPref, 60);
    }
    return userPref;
  }

  function getCleanExNameForNoteV351(exName) {
    return String(exName || "").replace(/\[[^\]]*\]/g, "").trim();
  }

  function getSeatPinV345(exName) {
    const clean = getCleanExNameForNoteV351(exName);
    if (typeof window.getPinnedExerciseNoteV197 === "function") {
      try {
        const n197 = window.getPinnedExerciseNoteV197(clean);
        if (n197 && n197.trim()) return n197.trim();
      } catch (e) {}
    }
    if (typeof window.getSeatPinForExerciseV290 === "function") {
      try {
        const p = window.getSeatPinForExerciseV290(clean);
        if (p && p.trim()) return p.trim();
      } catch (e) {}
    }
    const _gymP = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getActiveGymProfile === "function") ? ("_" + window.REMK_SCIENCE_BRAIN.getActiveGymProfile()) : "";
    const map = safeJsonParse(localStorage.getItem(getV351ScopedKey(SEAT_KEY) + _gymP) || localStorage.getItem(getV351ScopedKey(SEAT_KEY)) || "{}", {});
    return map[clean.toLowerCase()] || "";
  }

  // FIX #1 (v35.2): Stilles Speichern OHNE Re-Render beim Tippen (verhindert 1-Buchstaben-Reset!)
  let _v352NoteDebounceTimer = null;
  window.saveV351InlineExerciseNote = function (exName, rawText, isFinalBlur) {
    const clean = getCleanExNameForNoteV351(exName);
    if (!clean) return;
    const rawStr = String(rawText == null ? "" : rawText);
    const val = isFinalBlur ? rawStr.trim() : rawStr;

    // 1. Direkt in den v197 Storage-Key schreiben (OHNE savePinnedExerciseNoteV197 aufzurufen, das sonst das DOM zerstört!)
    try {
      if (typeof window.getExNoteStorageKeyV197 === "function") {
        const k197 = window.getExNoteStorageKeyV197(clean);
        if (val.trim()) localStorage.setItem(k197, val);
        else localStorage.removeItem(k197);
      } else {
        const slot = getV351PartnerSlot();
        const kFallback = `remk_ex_note_v197_${slot}_${clean.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "_")}`;
        if (val.trim()) localStorage.setItem(kFallback, val);
        else localStorage.removeItem(kFallback);
      }
    } catch (e) {}

    // 2. Direkt in den v290 Seat-Pin Key schreiben (ohne UI-Redraw)
    try {
      const k290 = "remk_seat_pin_v290_" + clean.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "_");
      if (val.trim()) localStorage.setItem(k290, val);
      else localStorage.removeItem(k290);
    } catch (e) {}

    // 3. Clean-UI Partner-Scoped Map speichern
    const map = safeJsonParse(localStorage.getItem(getV351ScopedKey(SEAT_KEY)) || "{}", {});
    if (val.trim()) map[clean.toLowerCase()] = val;
    else delete map[clean.toLowerCase()];
    try { localStorage.setItem(getV351ScopedKey(SEAT_KEY), JSON.stringify(map)); } catch (e) {}

    // 4. Hintergrund-Sync in die Legacy-Tabelle erst verzögert nach Tipp-Pause
    if (_v352NoteDebounceTimer) clearTimeout(_v352NoteDebounceTimer);
    if (isFinalBlur) {
      try {
        if (typeof window.syncPinnedNotesIntoTableDomV197 === "function") window.syncPinnedNotesIntoTableDomV197();
      } catch (e) {}
    } else {
      _v352NoteDebounceTimer = setTimeout(function () {
        try {
          if (typeof window.syncPinnedNotesIntoTableDomV197 === "function") window.syncPinnedNotesIntoTableDomV197();
        } catch (e) {}
      }, 650);
    }
  };

  // FIX #2 (v35.2): Pin-Funktion für Übungen (Fixieren gegen Tausch) + Geräte-Pin
  function loadPinnedExMapV352() {
    return safeJsonParse(localStorage.getItem(getV351ScopedKey(PIN_EX_KEY)) || "{}", {});
  }
  window.isV352ExercisePinned = function (exName) {
    const clean = getCleanExNameForNoteV351(exName).toLowerCase();
    if (!clean) return false;
    return Boolean(loadPinnedExMapV352()[clean]);
  };
  window.toggleV352PinExercise = function (exName) {
    const clean = getCleanExNameForNoteV351(exName);
    if (!clean) return;
    const key = clean.toLowerCase();
    const map = loadPinnedExMapV352();
    const next = !map[key];
    if (next) map[key] = true;
    else delete map[key];
    try { localStorage.setItem(getV351ScopedKey(PIN_EX_KEY), JSON.stringify(map)); } catch (e) {}
    window.showV351Toast(next ? `📌 „${clean}“ angepinnt & geschützt` : `📌 Pin für „${clean}“ gelöst`);
    window.renderV345FitnessCleanPanel();
  };

  window.editV345SeatPin = function (exName) {
    const cur = getSeatPinV345(exName);
    const applyPin = function (next) {
      window.saveV351InlineExerciseNote(exName, next, true);
      const inp = document.getElementById("v351-ex-inline-note-inp");
      if (inp) inp.value = String(next || "").trim();
      window.showV351Toast("📌 Geräte-Pin gespeichert");
    };
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openPromptSheet({
        title: "📌 Geräte-Pin & Sitzhöhe",
        subtitle: exName,
        placeholder: "z. B. Sitz 4, Lehne 2, Pin 7, Kabel 2:1",
        initialValue: cur,
        onSave: applyPin
      });
    } else {
      applyPin(cur);
    }
  };

  window.setV345Readiness = function (mode) {
    window.v34State.readinessMode = mode;
    if (typeof window.setDailyWorkoutReadinessMode === "function") {
      try {
        const map = { green: "normal", yellow: "moderate", red: "tired" };
        window.setDailyWorkoutReadinessMode(map[mode] || "normal");
      } catch (e) {}
    }
    window.renderV345FitnessCleanPanel();
  };

  window.cycleV345ActiveWeek = function (delta) {
    const mesoW = parseInt(document.getElementById("meso_weeks")?.value || "8", 10) || 8;
    const curW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const nextW = Math.max(1, Math.min(mesoW, curW + delta));
    localStorage.setItem("remk_active_week", String(nextW));
    if (typeof window.switchMobileWeek === "function") {
      try { window.switchMobileWeek(nextW); } catch (e) {}
    }
    window.renderV345FitnessCleanPanel();
  };

  function getV345WorkoutDaysData() {
    const resBox = document.getElementById("result-box");
    const tables = resBox ? Array.from(resBox.querySelectorAll("table.plan-table")) : [];
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const logs = loadV34Logs();
    const prMap = loadPrMap();
    const readinessMult = window.v34State.readinessMode === "red" ? 0.85 : (window.v34State.readinessMode === "yellow" ? 0.95 : 1.0);
    const days = [];

    tables.forEach(function (tbl, dIdx) {
      let dayTitle = `Tag ${dIdx + 1}`;
      let prev = tbl.previousElementSibling;
      while (prev) {
        if (prev.tagName === "H4") { dayTitle = prev.innerText.trim(); break; }
        prev = prev.previousElementSibling;
      }

      const rows = Array.from(tbl.querySelectorAll("tbody tr"));
      const exercises = [];

      rows.forEach(function (tr, eIdx) {
        const exName = tr.querySelector(".exercise-name")?.innerText.trim() || `Übung ${eIdx + 1}`;
        const mech = tr.getAttribute("data-mech") || "push_horiz";
        const noteTxt = tr.querySelector(".target-note")?.innerText || "3x10 | Pause: 90s";
        const tempoRaw = (tr.querySelector(".tempo-note")?.innerText || "").replace(/^Tempo:\s*/i, "").trim();
        const mInfo = (typeof window.getMuscleInfoByMechanic === "function") ? window.getMuscleInfoByMechanic(mech, exName) : null;
        const musclePrimary = mInfo ? mInfo.primary : "";
        const muscleSecondary = mInfo ? mInfo.secondary : "";
        const sm = noteTxt.match(/(\d+)\s*[x×]\s*(\d+)/i);
        const targetSetsCount = sm ? (parseInt(sm[1], 10) || 3) : 3;
        const targetRepsCount = sm ? (parseInt(sm[2], 10) || 10) : 10;
        const vidLink = tr.querySelector('a[target="_blank"]')?.href || `https://www.youtube.com/results?search_query=${encodeURIComponent(exName + " Ausführung")}`;

        const tdWeek = tr.querySelector(`td.week-col[data-week="${activeW}"]`) || tr.querySelector("td.week-col");
        const tdPrevWeek = activeW > 1 ? tr.querySelector(`td.week-col[data-week="${activeW - 1}"]`) : null;
        const domInputs = tdWeek ? Array.from(tdWeek.querySelectorAll("input.log-input-box")) : [];
        const prevDomInputs = tdPrevWeek ? Array.from(tdPrevWeek.querySelectorAll("input.log-input-box")) : [];
        const domPrefix = getV351DomLogPrefix();
        const isSuperset = (typeof window.isExerciseSupersetPairedV213 === "function") ? Boolean(window.isExerciseSupersetPairedV213(dIdx, eIdx)) : false;
        const firstId = domInputs[0]?.id || `w${activeW}_d${dIdx}_e${eIdx}_0`;
        const idMatch = firstId.match(/^w\d+_(.+)_\d+$/);
        const exId = idMatch ? idMatch[1] : `ex_${dIdx}_${eIdx}`;

        const isBw = isBodyweightExerciseName(exName);
        const nLow = exName.toLowerCase();
        let defaultKg = 50;
        if (isBw) defaultKg = 0;
        else if (nLow.includes("kniebeuge") || nLow.includes("kreuzheben") || nLow.includes("beinpresse") || nLow.includes("deadlift") || nLow.includes("squat")) defaultKg = 80;
        else if (nLow.includes("seitheben") || nLow.includes("curl") || nLow.includes("trizeps") || nLow.includes("face pull")) defaultKg = 15;

        const extraSetsCount = parseInt(logs[`extra_sets_w${activeW}_d${dIdx}_e${eIdx}`] || "0", 10) || 0;
        const totalSets = Math.max(1, Math.max(targetSetsCount, domInputs.length) + extraSetsCount);
        const sets = [];
        const bestPr = parseFloat(prMap[exId] || "0") || 0;

        for (let sIdx = 0; sIdx < totalSets; sIdx++) {
          const logKey = `w${activeW}_d${dIdx}_e${eIdx}_s${sIdx}_${exId}`;
          const prevLogKey = activeW > 1 ? `w${activeW - 1}_d${dIdx}_e${eIdx}_s${sIdx}_${exId}` : "";
          const savedEntry = logs[logKey];
          const prevSaved = prevLogKey ? logs[prevLogKey] : null;
          const domRaw = domInputs[sIdx]?.value || localStorage.getItem(domPrefix + (domInputs[sIdx]?.id || "")) || "";
          let prevTxt = "";
          if (prevSaved && prevSaved.done) {
            prevTxt = `W${activeW - 1}: ${prevSaved.kg}×${prevSaved.reps}`;
          } else if (prevDomInputs[sIdx]) {
            const pRaw = prevDomInputs[sIdx].value || localStorage.getItem(domPrefix + prevDomInputs[sIdx].id) || "";
            if (pRaw) prevTxt = `W${activeW - 1}: ${String(pRaw).replace(/\s*kg/i, "").trim().slice(0, 12)}`;
          }

          let kgVal = isBw ? 0 : (Math.round((defaultKg * readinessMult) / 2.5) * 2.5);
          let repsVal = targetRepsCount;
          let done = false;
          let rir = 2;
          const domInpId = domInputs[sIdx]?.id || "";
          const watchSetDone = domInpId ? (localStorage.getItem("remk_set_done_" + domInpId) === "1") : false;

          if (savedEntry && typeof savedEntry === "object") {
            kgVal = savedEntry.kg !== undefined ? savedEntry.kg : kgVal;
            repsVal = savedEntry.reps !== undefined ? savedEntry.reps : targetRepsCount;
            done = Boolean(savedEntry.done) || (watchSetDone && savedEntry.done === undefined);
            rir = savedEntry.rir !== undefined ? savedEntry.rir : 2;
          } else if (domRaw) {
            const pm = String(domRaw).match(/([0-9]+(?:[.,][0-9]+)?)\s*(?:kg)?\s*(?:[x×]\s*([0-9]+))?/i);
            if (pm) {
              if (!isBw) kgVal = parseFloat(pm[1].replace(",", ".")) || kgVal;
              if (pm[2]) repsVal = parseInt(pm[2], 10) || repsVal;
            }
            if (watchSetDone) done = true;
          } else {
            if (sIdx > 0 && sets[sIdx - 1]) {
              kgVal = sets[sIdx - 1].kg;
              repsVal = sets[sIdx - 1].reps;
            }
            if (watchSetDone) done = true;
          }

          const setType = (savedEntry && savedEntry.setType) ? savedEntry.setType : "N";
          const effLoadKg = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getEffectiveLoadKg === "function")
            ? window.REMK_SCIENCE_BRAIN.getEffectiveLoadKg(exName, mech, kgVal, isBw)
            : (kgVal > 0 ? kgVal : 0);
          const est1Rm = effLoadKg > 0
            ? ((window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.calc1RmUpTo25 === "function")
              ? window.REMK_SCIENCE_BRAIN.calc1RmUpTo25(effLoadKg, repsVal || 1)
              : Math.round(effLoadKg * (1 + (repsVal || 1) / 30)))
            : 0;
          const isPr = done && setType !== "W" && est1Rm > 0 && est1Rm >= bestPr && bestPr > 0;

          sets.push({
            sIdx, logKey, domInputId: domInputs[sIdx]?.id || "",
            targetReps: targetRepsCount, kg: kgVal, effLoadKg: effLoadKg, reps: repsVal,
            done, rir, setType, est1Rm, isPr, prevTxt
          });
        }

        exercises.push({
          dIdx, eIdx, exId, name: exName, mech, isBw, targetReps: targetRepsCount,
          videoUrl: vidLink, restSec: getRecommendedRestSeconds(exName, mech),
          seatPin: getSeatPinV345(exName), musclePrimary, muscleSecondary, tempo: tempoRaw, isSuperset, sets
        });
      });

      days.push({ dIdx, title: dayTitle, exercises });
    });

    return days;
  }

  window.updateV345SetRecord = function (dIdx, eIdx, sIdx, patchObj, propagateOpen) {
    const days = getV345WorkoutDaysData();
    const ex = days[dIdx]?.exercises[eIdx];
    const setObj = ex?.sets[sIdx];
    if (!setObj) return;

    const logs = loadV34Logs();
    const cur = logs[setObj.logKey] || { kg: setObj.kg, reps: setObj.reps, done: setObj.done, rir: setObj.rir };
    if (patchObj.kg !== undefined) cur.kg = patchObj.kg;
    if (patchObj.reps !== undefined) cur.reps = patchObj.reps;
    if (patchObj.done !== undefined) cur.done = patchObj.done;
    if (patchObj.rir !== undefined) cur.rir = patchObj.rir;
    if (patchObj.setType !== undefined) cur.setType = patchObj.setType;
    logs[setObj.logKey] = cur;

    if (propagateOpen && ex) {
      for (let nextS = sIdx + 1; nextS < ex.sets.length; nextS++) {
        const ns = ex.sets[nextS];
        if (!logs[ns.logKey] || !logs[ns.logKey].done) {
          logs[ns.logKey] = { kg: cur.kg, reps: cur.reps, done: false, rir: cur.rir };
        }
      }
    }
    saveV34Logs(logs);

    if (cur.done && cur.kg > 0 && cur.setType !== 'W') {
      const est1Rm = Math.round(cur.kg * (1 + (cur.reps || 1) / 30));
      const prMap = loadPrMap();
      if (est1Rm > (parseFloat(prMap[ex.exId] || "0") || 0)) {
        prMap[ex.exId] = est1Rm;
        savePrMap(prMap);
      }
    }

    if (setObj.domInputId) {
      const domInp = document.getElementById(setObj.domInputId);
      const valStr = `${cur.kg}x${cur.reps}`;
      if (domInp) {
        domInp.value = valStr;
        domInp.setAttribute("value", valStr);
      }
      localStorage.setItem(getV351DomLogPrefix() + setObj.domInputId, valStr);
      localStorage.setItem("remk_set_done_" + setObj.domInputId, cur.done ? "1" : "0");

      if (cur.done && typeof window.calcProgression === "function") {
        const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
        const mesoW = parseInt(document.getElementById("meso_weeks")?.value || "8", 10) || 8;
        try {
          window.calcProgression(ex.exId, sIdx, mesoW, ex.name.toLowerCase(), ex.targetReps || 10, activeW);
        } catch (e) {}
      }
    }

    if (typeof window.syncAll4NativeWidgetsV247 === "function") {
      try { window.syncAll4NativeWidgetsV247(); } catch (e) {}
    }
  };

  function formatShortExerciseLabelV354(rawName) {
    let s = String(rawName || "")
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, " ")
      .replace(/\([^)]*\)/g, " ")
      .replace(/^(kurzhantel|langhantel|kabelzug|maschine|sz-stange|kh|lh)[\s\-–]+/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!s) s = "Übung";
    const first = s.split(/[\s\-]+/)[0] || s;
    if (first.length <= 11) return first;
    return first.slice(0, 10) + ".";
  }

  function getExerciseMiniSvg(mech, exName, sizePx) {
    if (window.REMK_ANATOMY && typeof window.REMK_ANATOMY.renderExerciseThumb === "function") {
      return window.REMK_ANATOMY.renderExerciseThumb({ mech: mech || "", name: exName || "" }, sizePx || 42);
    }
    return `<div style="width:40px;height:40px;border-radius:10px;background:rgba(255,94,0,0.14);display:flex;align-items:center;justify-content:center;font-weight:900;color:#ff5e00;font-size:0.75rem;">${escHtml(formatShortExerciseLabelV354(exName).slice(0,2).toUpperCase())}</div>`;
  }

  function detectTrainedMuscleGroups(exercises) {
    const active = { chest: false, shoulders: false, arms: false, abs: false, quads: false, back: false, glutes: false, hams: false, calves: false };
    (exercises || []).forEach(function (ex) {
      const m = String(ex.mech || "").toLowerCase();
      const n = String(ex.name || "").toLowerCase();
      if (m.includes("push_horiz") || n.includes("brust") || n.includes("bankdrücken") || n.includes("liegestütz") || n.includes("push-up") || n.includes("dip")) {
        active.chest = true; active.shoulders = true; active.arms = true;
      }
      if (m.includes("push_vert") || m.includes("push_iso") || n.includes("schulter") || n.includes("seitheben") || n.includes("trizeps")) {
        active.shoulders = true; active.arms = true;
      }
      if (m.includes("pull_vert") || m.includes("pull_horiz") || m.includes("pull_iso") || n.includes("rudern") || n.includes("lat") || n.includes("klimmzug") || n.includes("curl") || n.includes("bizeps")) {
        active.back = true; active.arms = true;
      }
      if (m.includes("leg_squat") || m.includes("leg_press") || m.includes("leg_uni") || n.includes("kniebeuge") || n.includes("beinpresse") || n.includes("ausfallschritt")) {
        active.quads = true; active.glutes = true;
      }
      if (m.includes("hinge") || m.includes("leg_curl") || n.includes("kreuzheben") || n.includes("rdl") || n.includes("beinbeuger") || n.includes("hip thrust")) {
        active.hams = true; active.glutes = true; active.back = true;
      }
      if (m.includes("calf") || n.includes("wade")) active.calves = true;
      if (m.includes("core") || n.includes("plank") || n.includes("bauch") || n.includes("crunch") || n.includes("dead bug")) active.abs = true;
    });
    return active;
  }

  function buildDynamicAnatomicalMuscleMapSvg(exercises, opts) {
    const o = opts || {};
    if (window.REMK_ANATOMY && typeof window.REMK_ANATOMY.renderPair === "function") {
      const m = window.REMK_ANATOMY.detectExerciseMuscles(exercises || []);
      return `
        <div class="v352-anatomy-panel-box">
          ${window.REMK_ANATOMY.renderPair({
            exercises: exercises || [],
            mode: o.mode || "workout",
            primary: m.primary,
            secondary: m.secondary,
            primaryLabel: o.primaryLabel || "",
            secondaryLabel: o.secondaryLabel || "",
            showControls: o.showControls !== false,
            showLegend: o.showLegend !== false,
            height: o.height || "235px"
          })}
        </div>
      `;
    }
    return "";
  }

  function calculateBarbellPlatesText(totalKg) {
    const kg = parseFloat(totalKg) || 0;
    if (kg <= 20) return "Nur Stange (20 kg) oder Kurzhanteln / Eigengewicht";
    let perSide = (kg - 20) / 2;
    const plates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const used = [];
    plates.forEach(function (p) {
      while (perSide >= p - 0.01) {
        used.push(`${p} kg`);
        perSide -= p;
      }
    });
    return used.length > 0 ? `Pro Seite (20 kg LH): ${used.join(" + ")}` : "Nur Stange (20 kg)";
  }

  window.renderV345FitnessCleanPanel = function (preserveScroll) {
    const isBgRefresh = (preserveScroll === "background");
    const _keepScrollY = (preserveScroll === true || isBgRefresh) ? (window.scrollY || 0) : null;
    // FIX v35.7: Notiz-Fokus blockiert NUR stille Hintergrund-Refreshes, NIEMALS echte Button-/Tab-/Karten-Klicks!
    const activeEl = document.activeElement;
    if (activeEl && activeEl.id === "v351-ex-inline-note-inp") {
      if (isBgRefresh) return;
      try {
        if (typeof window.saveV351InlineExerciseNote === "function") {
          window.saveV351InlineExerciseNote(activeEl.dataset.exName || "", activeEl.value, true);
        }
        activeEl.blur();
      } catch (e) {}
    }

    const resBox = document.getElementById("result-box");
    if (!resBox) return;

    // FIX v35.7: Etwaige doppelte oder eingefrorene Alt-Panels aus gespeicherten Snapshots bereinigen
    const allFitPanels = Array.from(resBox.querySelectorAll("#remk-v34-fitness-clean-panel"));
    let panel = allFitPanels[0] || null;
    for (let i = 1; i < allFitPanels.length; i++) {
      try { allFitPanels[i].remove(); } catch (e) {}
    }
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "remk-v34-fitness-clean-panel";
      resBox.insertBefore(panel, resBox.firstChild);
    }

    const days = getV345WorkoutDaysData();
    if (days.length === 0) {
      panel.innerHTML = `<div style="padding:16px;text-align:center;">
        <h3 style="margin:0 0 10px 0;">🏋️ Noch kein Trainingsplan aktiv</h3>
        <button type="button" class="v34-primary-cta" onclick="window.selectV345StartTile('training');window.executeV345QuickGenerate();">⚡ Jetzt Trainingsplan generieren</button>
      </div>`;
      return;
    }

    const st = window.v34State;
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const mesoW = parseInt(document.getElementById("meso_weeks")?.value || "8", 10) || 8;
    const isDeloadW = (typeof window.isPlannedDeloadWeek === "function") && window.isPlannedDeloadWeek(activeW, mesoW);

    if (st.activeDayIdx >= days.length) st.activeDayIdx = 0;
    const curDay = days[st.activeDayIdx];
    if (!curDay || !Array.isArray(curDay.exercises) || curDay.exercises.length === 0) {
      panel.innerHTML = `<div style="padding:16px;text-align:center;">
        <h3 style="margin:0 0 10px 0;">🏋️ Keine Übungen für diesen Tag gefunden</h3>
        <button type="button" class="v34-primary-cta" onclick="window.selectV345StartTile('training');window.executeV345QuickGenerate();">⚡ Trainingsplan neu erstellen</button>
      </div>`;
      return;
    }
    if (st.activeExIdx >= curDay.exercises.length) st.activeExIdx = 0;
    const curEx = curDay.exercises[st.activeExIdx];
    window.currentProFocusExIdx = st.activeExIdx;
    try { localStorage.setItem("remk_active_wday_tab", String(st.activeDayIdx + 1)); } catch (e) {}

    let totalDoneSets = 0, totalPlannedSets = 0, totalVolumeKg = 0;
    days.forEach(function (d) {
      d.exercises.forEach(function (ex) {
        ex.sets.forEach(function (s) {
          totalPlannedSets++;
          if (s.done) {
            totalDoneSets++;
            totalVolumeKg += (parseFloat(s.effLoadKg !== undefined ? s.effLoadKg : s.kg) || 0) * (parseInt(s.reps, 10) || 0);
          }
        });
      });
    });

    const subTabsHtml = `
      <div class="v34-fit-subtabs">
        <button type="button" class="v34-fit-subtab ${st.fitSubTab === 'logger' ? 'active' : ''}" onclick="window.v34State.fitSubTab='logger';window.renderV345FitnessCleanPanel();">🏋️ Training</button>
        <button type="button" class="v34-fit-subtab ${st.fitSubTab === 'analytics' ? 'active' : ''}" onclick="window.v34State.fitSubTab='analytics';window.renderV345FitnessCleanPanel();">📊 Sets &amp; Volume</button>
        <button type="button" class="v34-fit-subtab ${st.fitSubTab === 'complete' ? 'active' : ''}" onclick="window.v34State.fitSubTab='complete';window.renderV345FitnessCleanPanel();">🏆 Abschluss</button>
      </div>
    `;

    const dayPillsHtml = days.map(function (d, idx) {
      const isAct = idx === st.activeDayIdx;
      return `
        <button type="button" class="v34-day-pill ${isAct ? 'active-day' : ''}" onclick="window.v34State.activeDayIdx=${idx};window.v34State.activeExIdx=0;window.v34State.activeSetIdx=0;window.renderV345FitnessCleanPanel();">
          Tag ${idx + 1}
        </button>
      `;
    }).join("");

    // --- TAB 2: SETS & VOLUME ANALYSE ---
    if (st.fitSubTab === "analytics") {
      const isVol = st.analyticsMetric === "volume";
      const hist = loadWorkoutHistory();
      const dayBars = days.map(function (d, idx) {
        let dSets = 0, dVol = 0;
        d.exercises.forEach(function (ex) {
          ex.sets.forEach(function (s) {
            if (s.done) {
              dSets++;
              dVol += (parseFloat(s.kg) || 0) * (parseInt(s.reps, 10) || 0);
            }
          });
        });
        return { label: `T${idx + 1}`, val: isVol ? Math.round(dVol) : dSets };
      });

      const histTotalVol = hist.reduce(function (sum, h) { return sum + (h.volumeKg || 0); }, 0) + Math.round(totalVolumeKg);
      const histTotalSets = hist.reduce(function (sum, h) { return sum + (h.doneSets || 0); }, 0) + totalDoneSets;
      const sessionsCount = Math.max(1, hist.length + (totalDoneSets > 0 ? 1 : 0));
      const avgVal = isVol ? Math.round(histTotalVol / sessionsCount) : Math.round(histTotalSets / sessionsCount);
      const maxBar = Math.max(...dayBars.map(function (b) { return b.val; }), isVol ? 1000 : 12);

      const barsHtml = dayBars.map(function (b) {
        const hPct = Math.max(10, Math.round((b.val / maxBar) * 100));
        return `
          <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
            <span style="font-size:0.68rem;font-weight:800;color:var(--v34-muted);margin-bottom:4px;">${b.val > 0 ? b.val : "0"}</span>
            <div style="height:130px;width:100%;display:flex;align-items:flex-end;justify-content:center;border-bottom:1px solid var(--v34-border);padding:0 4px;">
              <div style="width:100%;max-width:34px;height:${hPct}%;background:linear-gradient(180deg,#ff5e00 0%,#f28466 100%);border-top-left-radius:6px;border-top-right-radius:6px;"></div>
            </div>
            <span style="font-size:0.74rem;color:var(--v34-muted);font-weight:800;margin-top:6px;">${b.label}</span>
          </div>
        `;
      }).join("");

      const topEx = curDay.exercises.slice().sort(function (a, b) {
        const va = a.sets.reduce(function (s, x) { return s + (x.done ? x.kg * x.reps : 0); }, 0);
        const vb = b.sets.reduce(function (s, x) { return s + (x.done ? x.kg * x.reps : 0); }, 0);
        return vb - va;
      }).slice(0, 6);

      panel.innerHTML = `
        ${subTabsHtml}
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:10px;gap:6px;">
          <strong style="font-size:1.02rem;white-space:nowrap;">Fortschritt (Woche ${activeW}/${mesoW})</strong>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">${dayPillsHtml}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:2px solid var(--v34-border);margin-bottom:14px;">
          <button type="button" onclick="window.v34State.analyticsMetric='sets';window.renderV345FitnessCleanPanel();" style="border:none;background:transparent;padding:9px;font-weight:900;color:${!isVol ? 'var(--v34-text)' : 'var(--v34-muted)'};border-bottom:${!isVol ? '2.5px solid #ff5e00' : 'none'};border-radius:0;cursor:pointer;">🎯 Sätze</button>
          <button type="button" onclick="window.v34State.analyticsMetric='volume';window.renderV345FitnessCleanPanel();" style="border:none;background:transparent;padding:9px;font-weight:900;color:${isVol ? 'var(--v34-text)' : 'var(--v34-muted)'};border-bottom:${isVol ? '2.5px solid #ff5e00' : 'none'};border-radius:0;cursor:pointer;">🏋️ Tonnage (kg)</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
          <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:14px;padding:10px 12px;">
            <div style="font-size:0.72rem;color:var(--v34-muted);font-weight:700;">${isVol ? 'Ø Volumen / Session' : 'Ø Sätze / Session'}</div>
            <div style="font-size:1.3rem;font-weight:900;">${avgVal.toLocaleString('de-DE')} <span style="font-size:0.76rem;color:var(--v34-muted);">${isVol ? 'kg' : 'Sätze'}</span></div>
          </div>
          <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:14px;padding:10px 12px;">
            <div style="font-size:0.72rem;color:var(--v34-muted);font-weight:700;">${isVol ? 'Gesamt-Tonnage' : 'Erledigte Sätze'}</div>
            <div style="font-size:1.3rem;font-weight:900;">${(isVol ? Math.round(totalVolumeKg) : totalDoneSets).toLocaleString('de-DE')} <span style="font-size:0.76rem;color:var(--v34-muted);">${isVol ? 'kg' : '/ ' + totalPlannedSets}</span></div>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:16px;">${barsHtml}</div>
        ${(function () {
          if (!window.REMK_INTELLIGENCE) return "";
          const hasProLic = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
          if (!hasProLic) {
            return `
              <div style="background:var(--v34-card-soft);border:1.5px dashed rgba(255,94,0,0.45);border-radius:16px;padding:14px;margin-bottom:14px;text-align:center;">
                <div style="font-size:0.86rem;font-weight:900;margin-bottom:4px;">🔒 Pro Sportwissenschafts-Cockpit</div>
                <div style="font-size:0.74rem;color:var(--v34-muted);line-height:1.45;margin-bottom:10px;">
                  ACWR Belastungs-Ampel &bull; MEV/MAV/MRV Volumen &bull; Symmetrie-Wächter &bull; Effektive Wdh. (Junk-Volume) &bull; Relativkraft-Level (DOTS)
                </div>
                <button type="button" onclick="window.openRemkProUpgradeSheet('📊 Pro Sportwissenschafts-Analyse (ACWR, MEV/MRV, DOTS)');" style="border:none;background:#ff5e00;color:#fff;border-radius:11px;padding:8px 14px;font-size:0.76rem;font-weight:900;cursor:pointer;">⚡ Mit RE:MK Pro freischalten</button>
              </div>
            `;
          }
          const isPro = window.REMK_INTELLIGENCE.isProMode();
          const acwr = window.REMK_INTELLIGENCE.computeAcwrStats(hist, totalVolumeKg, totalDoneSets);
          const volSym = window.REMK_INTELLIGENCE.computeWeeklyVolumeAndSymmetry(days);
          const stim = window.REMK_INTELLIGENCE.computeStimulatingRepsStats(days);
          const relStr = window.REMK_INTELLIGENCE.computeRelativeStrengthLevels(days);
          const ampelRows = volSym.ampel.filter(function (a) { return a.planned > 0; }).map(function (a) {
            const pct = Math.min(100, Math.round((a.planned / Math.max(1, a.mrv)) * 100));
            return `
              <div style="margin-bottom:7px;">
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;font-weight:800;margin-bottom:3px;">
                  <span>${escHtml(a.label)}</span>
                  <span style="color:${a.color};">${a.done}/${a.planned} Sätze &bull; ${a.zone}</span>
                </div>
                <div style="height:6px;border-radius:99px;background:rgba(148,163,184,0.18);overflow:hidden;">
                  <div style="width:${pct}%;height:100%;background:${a.color};border-radius:99px;"></div>
                </div>
              </div>
            `;
          }).join("");

          return `
            <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:12px 13px;margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;">
                <strong style="font-size:0.84rem;">⚡ ACWR Belastungs-Ampel <span onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openScienceExplainSheet('acwr');" style="cursor:pointer;opacity:0.8;">ⓘ</span> (7d vs. 28d)</strong>
                <span style="font-size:0.74rem;font-weight:900;padding:3px 9px;border-radius:99px;background:var(--v34-card);border:1.5px solid ${acwr.color};color:${acwr.color};">${acwr.ratio} &bull; ${acwr.label}</span>
              </div>
              <div style="font-size:0.73rem;color:var(--v34-muted);line-height:1.4;">${escHtml(acwr.hint)}</div>
              ${acwr.status === 'high' ? `
                <button type="button" onclick="window.setV345Readiness('red');window.v34State.fitSubTab='logger';window.renderV345FitnessCleanPanel();" style="margin-top:8px;border:1px solid rgba(239,68,68,0.5);background:rgba(239,68,68,0.15);color:#f87171;border-radius:10px;padding:6px 10px;font-size:0.73rem;font-weight:800;cursor:pointer;">🔴 −15% Readiness aktivieren</button>
              ` : ''}
            </div>

            ${isPro ? `
              <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:12px 13px;margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                  <strong style="font-size:0.84rem;">📊 MEV / MAV / MRV Volumen-Ampel</strong>
                  <span style="font-size:0.68rem;color:var(--v34-muted);font-weight:700;">Wochen-Sätze</span>
                </div>
                ${ampelRows || '<div style="font-size:0.74rem;color:var(--v34-muted);">Keine Wochen-Sätze gefunden.</div>'}
              </div>

              <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:12px 13px;margin-bottom:14px;">
                <strong style="font-size:0.84rem;display:block;margin-bottom:7px;">⚖️ Symmetrie- &amp; Dysbalancen-Wächter</strong>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px;">
                  <div style="padding:8px 10px;border-radius:12px;background:var(--v34-card);border:1px solid var(--v34-border);">
                    <div style="font-size:0.69rem;color:var(--v34-muted);font-weight:700;">Push : Pull</div>
                    <div style="font-size:0.95rem;font-weight:900;color:${volSym.symmetry.ppColor};">${volSym.symmetry.pushSets} : ${volSym.symmetry.pullSets} (${volSym.symmetry.ppRatio})</div>
                  </div>
                  <div style="padding:8px 10px;border-radius:12px;background:var(--v34-card);border:1px solid var(--v34-border);">
                    <div style="font-size:0.69rem;color:var(--v34-muted);font-weight:700;">Quad : Hintere Kette</div>
                    <div style="font-size:0.95rem;font-weight:900;color:${volSym.symmetry.qhColor};">${volSym.symmetry.quadSets} : ${volSym.symmetry.postSets} (${volSym.symmetry.qhRatio})</div>
                  </div>
                </div>
                <div style="font-size:0.72rem;color:var(--v34-muted);line-height:1.4;">• ${escHtml(volSym.symmetry.ppHint)}<br>• ${escHtml(volSym.symmetry.qhHint)}</div>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
                <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:11px 12px;">
                  <div style="font-size:0.7rem;color:var(--v34-muted);font-weight:800;">🎯 Effektive Wdh.</div>
                  <div style="font-size:1.18rem;font-weight:900;color:${stim.color};margin:2px 0;">${stim.stimReps} <span style="font-size:0.68rem;color:var(--v34-muted);">(${stim.junkPct}% Junk)</span></div>
                  <div style="font-size:0.67rem;color:var(--v34-muted);line-height:1.3;">${escHtml(stim.verdict)}</div>
                </div>
                <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:11px 12px;">
                  <div style="font-size:0.7rem;color:var(--v34-muted);font-weight:800;">🏅 Kraft-Level (DOTS) <span onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openScienceExplainSheet('dots');" style="cursor:pointer;opacity:0.8;">ⓘ</span></div>
                  <div style="font-size:1.12rem;font-weight:900;color:${relStr.color};margin:2px 0;">${escHtml(relStr.tier)}</div>
                  <div style="font-size:0.67rem;color:var(--v34-muted);line-height:1.3;">Score ~${relStr.dotsApprox} &bull; ${relStr.best1Rm > 0 ? relStr.best1Rm + ' kg (' + relStr.bw + ' kg KG)' : 'Logge Sätze'}</div>
                </div>
              </div>
            ` : `
              <div style="text-align:center;margin-bottom:12px;">
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.toggleExperienceMode()" style="padding:7px 12px;border-radius:10px;font-size:0.74rem;font-weight:800;">🔥 Profi-Metriken (MEV/MRV &amp; Symmetrie) einblenden</button>
              </div>
            `}
          `;
        })()}
        <h4 style="font-size:0.94rem;font-weight:900;margin:0 0 8px 0;">Übungen im aktuellen Tag</h4>
        ${topEx.map(function (ex) {
          const exDone = ex.sets.filter(function (s) { return s.done; }).length;
          const exVol = Math.round(ex.sets.reduce(function (a, s) { return a + (s.done ? s.kg * s.reps : 0); }, 0));
          return `
            <div onclick="window.v34State.fitSubTab='logger';window.v34State.activeExIdx=${ex.eIdx};window.renderV345FitnessCleanPanel();" style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-radius:14px;background:var(--v34-card-soft);border:1px solid var(--v34-border);margin-bottom:8px;cursor:pointer;">
              <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                ${getExerciseMiniSvg(ex.mech, ex.name)}
                <div style="min-width:0;">
                  <div style="font-weight:800;font-size:0.84rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(ex.name)}</div>
                  <div style="font-size:0.72rem;color:var(--v34-muted);">${exDone}/${ex.sets.length} Sätze &bull; ${exVol.toLocaleString('de-DE')} kg</div>
                </div>
              </div>
              <span style="font-weight:900;font-size:0.8rem;color:#ff5e00;white-space:nowrap;">Öffnen ›</span>
            </div>
          `;
        }).join("")}
      `;
      return;
    }

    // --- TAB 3: WORKOUT COMPLETE, ANATOMIE & ZYKLUS FORTSETZEN ---
    if (st.fitSubTab === "complete") {
      let bestEx = curDay.exercises[0];
      let best1Rm = 0, bestReps = 0, dayVol = 0, dayDone = 0;
      curDay.exercises.forEach(function (ex) {
        ex.sets.forEach(function (s) {
          if (s.done) {
            dayDone++;
            dayVol += (parseFloat(s.effLoadKg !== undefined ? s.effLoadKg : s.kg) || 0) * (parseInt(s.reps, 10) || 0);
            if (s.setType !== 'W') {
              if (s.reps > bestReps) bestReps = s.reps;
              if (s.est1Rm > best1Rm) { best1Rm = s.est1Rm; bestEx = ex; }
            }
          }
        });
      });
      if (best1Rm === 0 && bestEx && bestEx.sets[0]) {
        best1Rm = bestEx.sets[0].est1Rm || 0;
        bestReps = bestEx.sets[0].reps || 10;
      }
      window._v356LastSummaryPayload = {
        dayTitle: curDay.title || "",
        dayDone: dayDone,
        dayVol: Math.round(dayVol),
        best1Rm: best1Rm,
        bestEx: formatShortExerciseLabelV354(bestEx?.name || "")
      };

      panel.innerHTML = `
        ${subTabsHtml}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <button type="button" onclick="window.v34State.fitSubTab='logger';window.renderV345FitnessCleanPanel();" style="border:none;background:transparent;color:var(--v34-text);font-size:1.25rem;font-weight:800;cursor:pointer;padding:4px 8px;">✕</button>
          <span style="font-size:1.06rem;font-weight:900;">Workout Complete</span>
          <span style="font-size:0.76rem;font-weight:800;color:#10b981;">${dayDone} Sätze ✓</span>
        </div>
        ${buildDynamicAnatomicalMuscleMapSvg(curDay.exercises, { mode: 'summary', height: '215px' })}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          <div style="grid-column:1 / -1;min-width:0;overflow:hidden;background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:12px 14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
              <span style="font-size:0.74rem;font-weight:800;color:var(--v34-muted);">🏆 Session Tonnage</span>
              <strong style="font-size:1.02rem;color:#ff5e00;white-space:nowrap;">${Math.round(dayVol).toLocaleString('de-DE')} kg</strong>
            </div>
            <div style="font-weight:800;font-size:0.82rem;margin-top:5px;line-height:1.35;word-break:break-word;">${escHtml(curDay.title)}</div>
          </div>
          <div style="min-width:0;overflow:hidden;background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:11px 12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span>☀️</span><strong style="font-size:0.88rem;white-space:nowrap;">${bestReps} Wdh.</strong></div>
            <div style="font-weight:800;font-size:0.75rem;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(formatShortExerciseLabelV354(bestEx?.name || 'Übung'))}</div>
            <div style="font-size:0.67rem;color:var(--v34-muted);">Max Reps</div>
          </div>
          <div style="min-width:0;overflow:hidden;background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:11px 12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span>🥇</span><strong style="font-size:0.88rem;white-space:nowrap;">${best1Rm} kg</strong></div>
            <div style="font-weight:800;font-size:0.75rem;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(formatShortExerciseLabelV354(bestEx?.name || 'Übung'))}</div>
            <div style="font-size:0.67rem;color:var(--v34-muted);">Bestes 1-RM</div>
          </div>
        </div>
        ${(function () {
          if (!window.REMK_INTELLIGENCE || typeof window.REMK_INTELLIGENCE.getSessionFeedback !== "function") return "";
          const fb = window.REMK_INTELLIGENCE.getSessionFeedback();
          const adv = window.REMK_INTELLIGENCE.getNextWeekVolumeAdvice(fb);
          const mkBtn = function (field, val, lbl) {
            const act = fb[field] === val;
            return `<button type="button" onclick="window.REMK_INTELLIGENCE.setSessionFeedback('${field}',${val})" style="border:1px solid ${act ? '#ff5e00' : 'var(--v34-border)'};background:${act ? 'rgba(255,94,0,0.2)' : 'var(--v34-card)'};color:${act ? '#ff5e00' : 'var(--v34-muted)'};border-radius:9px;padding:4px 8px;font-size:0.69rem;font-weight:800;cursor:pointer;">${lbl}</button>`;
          };
          return `
            <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:12px 13px;margin-bottom:10px;">
              <div style="font-size:0.8rem;font-weight:900;margin-bottom:8px;">🎯 Stimulus- &amp; Gelenk-Check (für nächste Woche)</div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;font-size:0.73rem;font-weight:800;">
                <span>🔥 Pump</span>
                <div style="display:flex;gap:4px;">${mkBtn('pump',1,'Wenig')}${mkBtn('pump',2,'Gut')}${mkBtn('pump',3,'Stark')}</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;font-size:0.73rem;font-weight:800;">
                <span>🩹 Gelenke</span>
                <div style="display:flex;gap:4px;">${mkBtn('joints',1,'Zwickt')}${mkBtn('joints',2,'Okay')}${mkBtn('joints',3,'Top')}</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;font-size:0.73rem;font-weight:800;">
                <span>⚡ Ermüdung</span>
                <div style="display:flex;gap:4px;">${mkBtn('fatigue',1,'Frisch')}${mkBtn('fatigue',2,'Mittel')}${mkBtn('fatigue',3,'Platt')}</div>
              </div>
              <div style="font-size:0.72rem;font-weight:800;color:${adv.color};line-height:1.35;padding-top:6px;border-top:1px solid var(--v34-border);">${adv.text}</div>
            </div>
          `;
        })()}
                ${(function () {
          if (!window.REMK_INTELLIGENCE || typeof window.REMK_INTELLIGENCE.buildWeeklyRecapSummary !== "function") return "";
          const rc = window.REMK_INTELLIGENCE.buildWeeklyRecapSummary(days);
          window._v361RecapDaysCache = days;
          return `
            <div style="background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:16px;padding:11px 13px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;">
                <strong style="font-size:0.82rem;">📅 Wochen-Recap (7 Tage)</strong>
                <button type="button" onclick="window.REMK_INTELLIGENCE.shareWeeklyRecapSummary(window._v361RecapDaysCache || []);" style="border:1px solid rgba(255,94,0,0.45);background:rgba(255,94,0,0.14);color:#ff5e00;border-radius:9px;padding:4px 9px;font-size:0.7rem;font-weight:900;cursor:pointer;">📤 Teilen</button>
              </div>
              <div style="font-size:0.74rem;color:var(--v34-muted);font-weight:700;">
                🏋️ ${rc.sessions} Einheiten &bull; ${rc.totalSets} Sätze &bull; ${rc.totalVol.toLocaleString('de-DE')} kg &bull; 🔥 ${rc.consistencyPct}% Konstanz
              </div>
            </div>
          `;
        })()}
        <button type="button" class="v34-btn-soft" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.shareCoachCheckinSummary(window._v356LastSummaryPayload || {});" style="width:100%;min-height:44px;height:auto;padding:10px 12px;line-height:1.25;border-radius:14px;font-size:0.8rem;font-weight:800;margin-bottom:8px;">
          📤 Coach-Check-in teilen (WhatsApp / Kopieren)
        </button>
        <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openAutoCooldownFlowModal();" style="width:100%;min-height:42px;height:auto;padding:9px 12px;border-radius:14px;font-size:0.78rem;font-weight:800;margin-bottom:8px;border-color:rgba(16,185,129,0.45);color:#10b981;">
          🧘 Auto-Cool-Down starten (8 Min. · passend zum Training)
        </button>
        <button type="button" onclick="window.finishAndSaveV345Workout(${Math.round(dayVol)}, ${dayDone})" class="v34-primary-cta" style="margin-bottom:8px;">
          💾 Training abschließen &amp; speichern
        </button>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <button type="button" class="v34-btn-soft" onclick="if(typeof window.continuePlanNextCycle==='function')window.continuePlanNextCycle(false);" style="height:44px;border-radius:14px;font-size:0.78rem;font-weight:800;">
            📈 Zyklus fortsetzen
          </button>
          <button type="button" class="v34-btn-soft" onclick="if(typeof window.requireRemkPro==='function'&&!window.requireRemkPro('📤 PDF / CSV / QR Plan-Export'))return;if(typeof window.openShareExportHubModal==='function')window.openShareExportHubModal('plan');else window.print();" style="height:44px;border-radius:14px;font-size:0.78rem;font-weight:800;">
            📤 PDF / CSV Export
          </button>
        </div>
      `;
      return;
    }

    // --- TAB 1: AKTIVER WORKOUT-LOGGER ---
    if (st.activeSetIdx >= curEx.sets.length) st.activeSetIdx = Math.max(0, curEx.sets.length - 1);
    const elapsedSec = Math.max(1, Math.floor((Date.now() - st.workoutStartTs) / 1000));
    const hrs = Math.floor(elapsedSec / 3600);
    const mins = String(Math.floor((elapsedSec % 3600) / 60)).padStart(2, "0");
    const secs = String(elapsedSec % 60).padStart(2, "0");
    const restDisp = document.getElementById("timer-display")?.innerText || "00:00";

    const _isProFit = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
    let autoregBannerHtml = "";
    if (_isProFit && window.REMK_INTELLIGENCE) {
      const rampIn = typeof window.REMK_INTELLIGENCE.computeDetrainingRampIn === "function"
        ? window.REMK_INTELLIGENCE.computeDetrainingRampIn()
        : null;
      if (rampIn && st.readinessMode === "green") {
        autoregBannerHtml += `
          <div style="background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.48);border-radius:14px;padding:9px 11px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <span style="font-size:0.74rem;font-weight:700;line-height:1.35;">${escHtml(rampIn.label)}</span>
            <button type="button" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🔴 Readiness-Ampel (-5% / -15%)');return;}window.setV345Readiness('red')" style="background:#38bdf8;color:#000;border:none;border-radius:10px;padding:6px 9px;font-size:0.71rem;font-weight:900;cursor:pointer;white-space:nowrap;">−15% Schutz</button>
          </div>
        `;
      }
      const plateau = typeof window.REMK_INTELLIGENCE.detectExercisePlateau === "function"
        ? window.REMK_INTELLIGENCE.detectExercisePlateau(curEx.name)
        : null;
      if (plateau) {
        autoregBannerHtml += `
          <div style="background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.45);border-radius:14px;padding:8px 11px;margin-bottom:8px;font-size:0.73rem;font-weight:700;line-height:1.35;">
            ${escHtml(plateau.tip)}
          </div>
        `;
      }
      const smartAuto = typeof window.REMK_INTELLIGENCE.evaluateSmartAutoreg === "function"
        ? window.REMK_INTELLIGENCE.evaluateSmartAutoreg(curEx)
        : null;
      if (smartAuto) {
        autoregBannerHtml += `
          <div style="background:${smartAuto.bg};border:1px solid ${smartAuto.border};border-radius:14px;padding:9px 11px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <span style="font-size:0.75rem;font-weight:700;line-height:1.35;">${smartAuto.text}</span>
            <button type="button" onclick="window.applyV345Backoff(${smartAuto.nextIdx}, ${smartAuto.recKg})" style="background:${smartAuto.color};color:#000;border:none;border-radius:10px;padding:6px 10px;font-size:0.72rem;font-weight:900;cursor:pointer;white-space:nowrap;">Übernehmen</button>
          </div>
        `;
      }
    }
    const _sfrBadge = (_isProFit && window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.getExerciseSfrBadge === "function")
      ? window.REMK_INTELLIGENCE.getExerciseSfrBadge(curEx.name)
      : null;

    const exThumbsHtml = curDay.exercises.map(function (ex, idx) {
      const allDone = ex.sets.length > 0 && ex.sets.every(function (s) { return s.done; });
      const isPin = window.isV352ExercisePinned(ex.name);
      const shortLbl = formatShortExerciseLabelV354(ex.name);
      return `
        <div class="v34-ex-thumb-card ${idx === st.activeExIdx ? 'active' : ''} ${allDone ? 'done' : ''} ${isPin ? 'pinned' : ''}" onclick="window.v34State.activeExIdx=${idx};window.v34State.activeSetIdx=0;window.v34State.numpadBuffer='';window.renderV345FitnessCleanPanel(true);">
          ${isPin ? `<span class="v352-thumb-pin-badge" title="Übung angepinnt">📌</span>` : ''}
          ${getExerciseMiniSvg(ex.mech, ex.name)}
          <span style="font-size:0.6rem;font-weight:800;color:var(--v34-muted);max-width:62px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;">${escHtml(shortLbl)}</span>
        </div>
      `;
    }).join("") + `
      <div class="v34-ex-thumb-card" onclick="window.addV345SetToCurrentExercise()" title="Satz hinzufügen">
        <span style="font-size:1.45rem;font-weight:700;color:var(--v34-muted);">+</span>
      </div>
    `;

    const setsRowsHtml = curEx.sets.map(function (s, idx) {
      const isKgAct = st.activeSetIdx === idx && st.activeField === "kg";
      const isRepsAct = st.activeSetIdx === idx && st.activeField === "reps";
      const prTag = s.isPr ? ` <span style="color:#f59e0b;font-weight:900;">🏆PR</span>` : "";
      const rmTxt = s.est1Rm > 0 ? `1RM ${s.est1Rm}kg` : (curEx.isBw ? `BW • ${s.targetReps}+` : `${s.targetReps}+ Wdh.`);
      return `
        <div class="v34-set-row ${s.done ? 'done-row' : ''}">
          <button type="button" class="v34-set-num-circle ${s.setType === 'W' ? 'set-type-w' : (s.setType === 'D' ? 'set-type-d' : (s.setType === 'F' ? 'set-type-f' : ''))}" onclick="window.cycleV355SetType(${idx})" title="Satz-Typ umschalten: Normal / Warm-up (W) / Dropsatz (D) / Failure (F)" style="border:none;cursor:pointer;">${s.setType && s.setType !== 'N' ? s.setType : (idx + 1)}</button>
          <div style="font-size:0.72rem;font-weight:700;color:var(--v34-muted);text-align:center;line-height:1.25;">
            <div onclick="if(curEx.isBw&&window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openScienceExplainSheet('bw_load');">${curEx.isBw ? (s.kg === 0 ? ('BW' + (s.effLoadKg > 0 ? ' ~' + Math.round(s.effLoadKg) + 'kg' : '')) : ('BW' + (s.kg > 0 ? '+' : '') + s.kg + '=' + Math.round(s.effLoadKg) + 'kg')) : s.kg}×${s.targetReps}+${prTag}</div>
            <div style="font-size:0.64rem;opacity:0.88;color:${s.prevTxt ? '#059669' : 'var(--v34-muted)'};">${s.prevTxt ? escHtml(s.prevTxt) : rmTxt}</div>
          </div>
          <div>
            <input type="text" inputmode="decimal" id="v34-inp-kg-${idx}"
              class="v34-set-pill-input ${isKgAct ? 'active-cell' : ''}"
              value="${s.kg}"
              onclick="window.focusV345Cell(${idx}, 'kg')"
              oninput="window.onV345DirectInput(${idx}, 'kg', this.value)">
          </div>
          <div>
            <input type="text" inputmode="numeric" id="v34-inp-reps-${idx}"
              class="v34-set-pill-input ${isRepsAct ? 'active-cell' : ''}"
              value="${s.reps}"
              onclick="window.focusV345Cell(${idx}, 'reps')"
              oninput="window.onV345DirectInput(${idx}, 'reps', this.value)">
          </div>
          <div style="text-align:center;">
            <button type="button" class="v34-set-check-box ${s.done ? 'checked' : ''}" onclick="window.toggleV345SetDone(${idx})">✓</button>
          </div>
        </div>
      `;
    }).join("");

    const rirColors = [
      { v: 0, l: "0", c: "#e11d48" }, { v: 1, l: "1", c: "#ef4444" }, { v: 2, l: "2", c: "#f59e0b" },
      { v: 3, l: "3", c: "#eab308" }, { v: 4, l: "4", c: "#22c55e" }, { v: 5, l: "5", c: "#10b981" }, { v: 6, l: "6+", c: "#3b82f6" }
    ];
    const safeExEsc = escHtml(curEx.name).replace(/'/g, "");

    panel.innerHTML = `
      ${subTabsHtml}
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:8px;">
        <span style="font-size:0.9rem;font-weight:900;white-space:nowrap;">⏱️ <span id="v34-live-stopwatch">${hrs}:${mins}:${secs}</span></span>
        <div style="display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;">${dayPillsHtml}</div>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.startRestTimer==='function')window.startRestTimer(${curEx.restSec});" style="padding:5px 10px !important;">🔔 <span id="v34-live-rest-disp">${escHtml(restDisp)}</span></button>
      </div>

      <!-- 1 KOMPAKTE HORIZONTALE STEUERZEILE (WOCHE | TAGESFORM | EXPRESS | WOD) -->
      <div class="v34-compact-strip">
        <div style="display:inline-flex;align-items:center;gap:3px;background:var(--v34-card-soft);border:1px solid var(--v34-border);border-radius:999px;padding:2px 6px;flex-shrink:0;">
          <button type="button" onclick="window.cycleV345ActiveWeek(-1)" style="border:none;background:transparent;color:var(--v34-text);font-weight:900;font-size:0.85rem;padding:2px 5px;cursor:pointer;">‹</button>
          <span style="font-size:0.72rem;font-weight:900;white-space:nowrap;">W${activeW}/${mesoW}${isDeloadW ? ' 🛡️' : ''}</span>
          <button type="button" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('📈 Mesozyklus Wochen-Progression (W1–W8)');return;}window.cycleV345ActiveWeek(1)" style="border:none;background:transparent;color:var(--v34-text);font-weight:900;font-size:0.85rem;padding:2px 5px;cursor:pointer;">›</button>
        </div>
        <button type="button" onclick="window.setV345Readiness('green')" class="v34-gray-pill ${st.readinessMode === 'green' ? 'active-pill' : ''}" style="padding:5px 9px !important;font-size:0.71rem !important;">🟢 100%</button>
        <button type="button" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🟡 Readiness-Ampel (-5% / -15%)');return;}window.setV345Readiness('yellow')" class="v34-gray-pill ${st.readinessMode === 'yellow' ? 'active-pill' : ''}" style="padding:5px 9px !important;font-size:0.71rem !important;">🟡 -5%</button>
        <button type="button" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🔴 Readiness-Ampel (-5% / -15%)');return;}window.setV345Readiness('red')" class="v34-gray-pill ${st.readinessMode === 'red' ? 'active-pill' : ''}" style="padding:5px 9px !important;font-size:0.71rem !important;">🔴 -15%</button>
        <button type="button" class="v34-gray-pill" style="padding:5px 9px !important;font-size:0.71rem !important;" onclick="if(typeof window.toggleExpress30MinWorkout==='function')window.toggleExpress30MinWorkout();else if(typeof window.toggleExpressWorkoutMode==='function')window.toggleExpressWorkoutMode();">⚡ 30m</button>
        <button type="button" class="v34-gray-pill" style="padding:5px 9px !important;font-size:0.71rem !important;" onclick="if(typeof window.requireRemkPro==='function'&&!window.requireRemkPro('🔥 WOD / Tabata / EMOM Intervall-Timer'))return;if(typeof window.openRemkWodModalV290==='function')window.openRemkWodModalV290();">🔥 WOD</button>
      </div>

      <div class="v34-ex-thumb-strip">${exThumbsHtml}</div>

      <div style="margin:2px 0 4px 0;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
          <h3 style="font-size:1.12rem;font-weight:900;margin:0;line-height:1.25;flex:1;">${escHtml(curEx.name)}</h3>
          <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;">
            ${getV351PartnerSlot() === 'p2' ? `<span style="background:rgba(168,85,247,0.16);color:#9333ea;border:1px solid rgba(168,85,247,0.4);border-radius:8px;padding:3px 7px;font-size:0.68rem;font-weight:900;white-space:nowrap;">👤 Partner</span>` : ''}
            <button type="button" class="v352-pin-toggle-btn ${window.isV352ExercisePinned(curEx.name) ? 'is-pinned' : ''}" onclick="window.toggleV352PinExercise('${safeExEsc}')" title="Übung anpinnen / gegen Tauschen fixieren">
              📌 ${window.isV352ExercisePinned(curEx.name) ? 'Fixiert' : 'Pin'}
            </button>
          </div>
        </div>
        <div class="v351-muscle-tempo-bar">
          ${curEx.musclePrimary ? `<span class="v351-meta-chip muscle">🔴 ${escHtml(curEx.musclePrimary.split('(')[0].trim())}</span>` : ''}
          ${curEx.muscleSecondary ? `<span class="v351-meta-chip v352-sec-chip">🔵 ${escHtml(curEx.muscleSecondary.split('(')[0].trim())}</span>` : ''}
          ${curEx.tempo ? `<span class="v351-meta-chip">⏱️ TUT ${escHtml(curEx.tempo)}</span>` : ''}
          <span class="v351-meta-chip">Satz ${st.activeSetIdx + 1}/${curEx.sets.length} &bull; ${curEx.restSec}s</span>
          ${curEx.isSuperset ? `<span class="v351-meta-chip superset">🔗 Supersatz</span>` : ''}
          ${_sfrBadge ? `<span class="v351-meta-chip" style="color:${_sfrBadge.color};border-color:${_sfrBadge.color};">${escHtml(_sfrBadge.label)}</span>` : ''}
        </div>
      </div>

      <!-- DIREKT SICHTBARE & STABILE INLINE-NOTIZBOX + GERÄTE-PIN (OHNE 1-BUCHSTABEN-BUG!) -->
      <div class="v351-ex-inline-note-box">
        <span style="font-size:0.95rem;flex-shrink:0;" title="Übungs- &amp; Geräte-Notiz">📝</span>
        <input type="text" id="v351-ex-inline-note-inp" class="v351-ex-inline-note-input"
          data-ex-name="${escHtml(curEx.name)}"
          value="${escHtml(curEx.seatPin)}"
          placeholder="Notiz: Sitz, Lehne, Griff, Kabelzug oder Technik-Tipp..."
          oninput="window.saveV351InlineExerciseNote(this.dataset.exName, this.value, false)"
          onblur="window.saveV351InlineExerciseNote(this.dataset.exName, this.value, true)"
          onkeydown="if(event.key==='Enter'){this.blur();window.showV351Toast('📝 Notiz gespeichert');}">
        <button type="button" class="v352-seat-pin-btn" onclick="window.editV345SeatPin('${safeExEsc}')" title="Geräte-Pin / Sitzhöhe">📌</button>
      </div>

      <div class="v34-action-pills-row">
        <button type="button" class="v34-gray-pill ${st.showExAnatomy ? 'active-pill' : ''}" onclick="window.v34State.showExAnatomy=!window.v34State.showExAnatomy;window.renderV345FitnessCleanPanel(true);">🧬 Muskeln</button>
        <button type="button" class="v34-gray-pill ${window.isV352ExercisePinned(curEx.name) ? 'active-pill' : ''}" onclick="window.toggleV352PinExercise('${safeExEsc}')">📌 ${window.isV352ExercisePinned(curEx.name) ? 'Fixiert' : 'Anpinnen'}</button>
        <button type="button" class="v34-gray-pill" onclick="window.openV362TechniqueModal()">▶️ Technik</button>
        <button type="button" class="v34-gray-pill" onclick="window.insertV362AutoWarmupSets()">🔥 +Aufwärmen</button>
        <button type="button" id="remk-v362-metro-btn" class="v34-gray-pill" onclick="window.toggleV362TempoMetronome()">🎵 Tempo</button>
        <button type="button" class="v34-gray-pill" onclick="window.openV351QrForCurrentEx()">📱 QR</button>
        <button type="button" class="v34-gray-pill" onclick="window.openV345WarmupModal()">🔥 Warm-Up &amp; Extras</button>
        <button type="button" class="v34-gray-pill" onclick="window.openV351GearCableModal()">⚙️ Kabelzug</button>
        <button type="button" class="v34-gray-pill ${curEx.isSuperset ? 'active-pill' : ''}" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🔗 Supersätze &amp; 30-Min-Express');return;}window.toggleV351Superset()">🔗 Supersatz</button>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🗣️ KI-Sprach- &amp; Technik-Coach');return;}window.speakV351CoachTip()">🗣️ Coach</button>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('⌚ Smartwatch Live-Sync &amp; Lockscreen-Cockpit');return;}if(typeof window.openWatchGearAndLockscreenModalV250==='function')window.openWatchGearAndLockscreenModalV250();">⌚ Watch</button>
        <button type="button" class="v34-gray-pill" onclick="window.swapV345Exercise()">⇄ Tauschen</button>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('🩹 Akuter Gelenkschutz-Schmerztauscher');return;}window.openV354PainSwap()">🩹 Zwickt</button>
        <button type="button" class="v34-gray-pill" onclick="window.deferV354OccupiedExercise()">⏳ Besetzt</button>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.isRemkProUnlocked==='function'&&!window.isRemkProUnlocked()){window.openRemkProUpgradeSheet('💡 Intelligenter Startgewicht-Assistent');return;}window.applyV354StarterWeight()">💡 Start-kg</button>
        <button type="button" class="v34-gray-pill" onclick="if(typeof window.openFlexEnvironmentModalV255==='function')window.openFlexEnvironmentModalV255('exercise');">🏠 5-Orte</button>
        <button type="button" class="v34-gray-pill ${st.numpadOpen ? 'active-pill' : ''}" onclick="window.v34State.numpadOpen=!window.v34State.numpadOpen;window.renderV345FitnessCleanPanel(true);">⌨️ Numpad</button>
        <button type="button" class="v34-gray-pill" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.openCleanWorkoutHistoryModal();else if(typeof window.openWorkoutHistoryModal==='function')window.openWorkoutHistoryModal();">📜 Verlauf</button>
        <button type="button" class="v34-gray-pill" onclick="if(window.REMK_INTELLIGENCE)window.REMK_INTELLIGENCE.toggleExperienceMode();">${(window.REMK_INTELLIGENCE && !window.REMK_INTELLIGENCE.isProMode()) ? '🌱 Einsteiger' : '🔥 Profi'}</button>
      </div>

      <div class="v363-desktop-fit-grid ${st.showExAnatomy ? 'has-anatomy' : 'no-anatomy'}">
        <div class="v363-fit-side-col">
          ${st.showExAnatomy ? buildDynamicAnatomicalMuscleMapSvg([curEx], {
            mode: "workout",
            primaryLabel: curEx.musclePrimary ? curEx.musclePrimary.split('(')[0].trim() : "",
            secondaryLabel: curEx.muscleSecondary ? curEx.muscleSecondary.split('(')[0].trim() : "",
            height: "220px"
          }) : ''}
        </div>
        <div class="v363-fit-main-col">
      ${autoregBannerHtml}

      <div class="v34-sets-header">
        <span>Set</span><span>Ziel / 1RM</span><span>Kg</span><span>Wdh.</span><span>✓</span>
      </div>
      <div>${setsRowsHtml}</div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;gap:6px;">
        <div style="display:flex;gap:6px;">
          <button type="button" class="v34-btn-soft" onclick="window.addV345SetToCurrentExercise()" style="padding:8px 12px;border-radius:10px;font-weight:800;font-size:0.78rem;">+ Satz</button>
          ${curEx.sets.length > 1 ? `<button type="button" class="v34-btn-soft" onclick="window.removeV351SetFromCurrentExercise()" style="padding:8px 10px;border-radius:10px;font-weight:800;font-size:0.78rem;">− Satz</button>` : ''}
        </div>
        <button type="button" onclick="window.v34State.fitSubTab='complete';window.renderV345FitnessCleanPanel();" style="background:rgba(16,185,129,0.14);border:1px solid rgba(16,185,129,0.5);border-radius:10px;padding:8px 13px;font-weight:800;font-size:0.78rem;color:#059669;cursor:pointer;">🏆 Abschluss ›</button>
      </div>

      ${st.numpadOpen ? `
        <div class="v34-numpad-dock">
          <div class="v34-rir-strip">
            ${rirColors.map(function (r) {
              return `<button type="button" class="v34-rir-dot ${st.activeRir === r.v ? 'active-rir' : ''}" style="background:${r.c} !important;" onclick="window.v34State.activeRir=${r.v};window.updateV345SetRecord(${st.activeDayIdx},${st.activeExIdx},${st.activeSetIdx},{rir:${r.v}},false);window.renderV345FitnessCleanPanel();">${r.l}</button>`;
            }).join("")}
            <span style="font-size:0.74rem;font-weight:900;color:var(--v34-muted);padding:0 4px;">RIR</span>
          </div>
          <div class="v34-numpad-grid">
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('1')">1</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('2')">2</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('3')">3</button>
            <button type="button" class="v34-num-action" onclick="window.stepV345Cell(-2.5)">−2,5</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('4')">4</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('5')">5</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('6')">6</button>
            <button type="button" class="v34-num-action" onclick="window.stepV345Cell(2.5)">+2,5</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('7')">7</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('8')">8</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('9')">9</button>
            <button type="button" class="v34-num-action" onclick="window.v34State.activeField=(window.v34State.activeField==='kg'?'reps':'kg');window.v34State.numpadBuffer='';window.renderV345FitnessCleanPanel();">${st.activeField === 'kg' ? '➔ Wdh.' : '➔ Kg'}</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('.')">,</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('0')">0</button>
            <button type="button" class="v34-num-key" onclick="window.pressV345Numpad('DEL')">⌫</button>
            <button type="button" class="v34-num-check" onclick="if(window.v34State.activeField==='kg'){window.v34State.activeField='reps';window.v34State.numpadBuffer='';window.renderV345FitnessCleanPanel();}else{window.toggleV345SetDone(window.v34State.activeSetIdx);}">✓</button>
          </div>
        </div>
      ` : ''}
        </div>
      </div>
    `;

    if (_keepScrollY !== null) { try { requestAnimationFrame(function () { window.scrollTo(0, _keepScrollY); }); } catch (e) {} }
  };

  window.applyV345Backoff = function (setIdx, newKg) {
    const st = window.v34State;
    window.updateV345SetRecord(st.activeDayIdx, st.activeExIdx, setIdx, { kg: newKg }, true);
    window.renderV345FitnessCleanPanel(true);
  };

  // v35.5 (Hevy/Alpha Progression Standard): 1-Tap Satz-Typ umschalten (N -> W -> D -> F)
  window.cycleV355SetType = function (sIdx) {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curSet = days[st.activeDayIdx]?.exercises[st.activeExIdx]?.sets[sIdx];
    if (!curSet) return;
    const order = ["N", "W", "D", "F"];
    const next = order[(order.indexOf(curSet.setType || "N") + 1) % order.length];
    const labels = { N: "Arbeitssatz", W: "Warm-up (zählt nicht als MEV-Satz)", D: "Dropsatz", F: "Muskelversagen (RIR 0)" };
    window.updateV345SetRecord(st.activeDayIdx, st.activeExIdx, sIdx, { setType: next }, false);
    window.showV351Toast(`Satz ${sIdx + 1}: ${labels[next]}`);
    window.renderV345FitnessCleanPanel(true);
  };

  window.finishAndSaveV345Workout = function (volumeKg, doneSets) {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curDay = days[st.activeDayIdx];
    if (curDay && window.REMK_INTELLIGENCE) {
      curDay.exercises.forEach(function (ex) {
        ex.sets.forEach(function (s) {
          if (s.done && s.setType !== "W") {
            window.REMK_INTELLIGENCE.syncExerciseRecordToArchive(ex.name, s.kg, s.reps, s.rir);
          }
        });
      });
      if (typeof window.REMK_INTELLIGENCE.markDayConsistent === "function") window.REMK_INTELLIGENCE.markDayConsistent();
      if (typeof window.REMK_INTELLIGENCE.getSessionFeedback === "function" && typeof window.REMK_INTELLIGENCE.recordExerciseSfr === "function") {
        const fb = window.REMK_INTELLIGENCE.getSessionFeedback();
        curDay.exercises.forEach(function (ex) {
          if (ex.sets.some(function (s) { return s.done; })) {
            window.REMK_INTELLIGENCE.recordExerciseSfr(ex.name, fb.pump, fb.joints);
        if (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.learnFromSessionFeedback === 'function') window.REMK_SCIENCE_BRAIN.learnFromSessionFeedback([curDay], fb);
          }
        });
      }
    }
    const hist = loadWorkoutHistory();
    hist.push({ date: new Date().toISOString().slice(0, 10), volumeKg: volumeKg || 0, doneSets: doneSets || 0 });
    saveWorkoutHistory(hist);
    window.v34State.workoutStartTs = Date.now();
    window.v34State.fitSubTab = "analytics";
    if (typeof window.saveCurrentPlanSnapshot === "function") window.saveCurrentPlanSnapshot();
    if (typeof window.syncAll4NativeWidgetsV247 === "function") window.syncAll4NativeWidgetsV247();
    window.showV351Toast("💾 Training abgeschlossen & im Verlauf gespeichert!");
    window.renderV345FitnessCleanPanel();
  };

  window.focusV345Cell = function (sIdx, field) {
    window.v34State.activeSetIdx = sIdx;
    window.v34State.activeField = field;
    window.v34State.numpadBuffer = "";
    document.querySelectorAll(".v34-set-pill-input").forEach(function (el) { el.classList.remove("active-cell"); });
    const el = document.getElementById(`v34-inp-${field}-${sIdx}`);
    if (el) el.classList.add("active-cell");
  };

  window.onV345DirectInput = function (sIdx, field, rawVal) {
    const st = window.v34State;
    st.activeSetIdx = sIdx;
    st.activeField = field;
    const cleanNum = parseFloat(String(rawVal || "0").replace(",", ".")) || 0;
    const patch = field === "kg" ? { kg: cleanNum } : { reps: Math.max(0, Math.round(cleanNum)) };
    window.updateV345SetRecord(st.activeDayIdx, st.activeExIdx, sIdx, patch, true);

    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (curEx) {
      for (let nextS = sIdx + 1; nextS < curEx.sets.length; nextS++) {
        if (!curEx.sets[nextS].done) {
          const nextDom = document.getElementById(`v34-inp-${field}-${nextS}`);
          if (nextDom && document.activeElement !== nextDom) {
            nextDom.value = field === "kg" ? cleanNum : Math.max(0, Math.round(cleanNum));
          }
        }
      }
    }
  };

  window.pressV345Numpad = function (key) {
    const st = window.v34State;
    const inp = document.getElementById(`v34-inp-${st.activeField}-${st.activeSetIdx}`);
    if (!inp) return;
    if (key === "DEL") st.numpadBuffer = String(inp.value || "").slice(0, -1);
    else st.numpadBuffer = (st.numpadBuffer || "") + key;
    const disp = st.numpadBuffer === "" ? "0" : st.numpadBuffer;
    inp.value = disp;
    window.onV345DirectInput(st.activeSetIdx, st.activeField, disp);
  };

  window.stepV345Cell = function (delta) {
    const st = window.v34State;
    const inp = document.getElementById(`v34-inp-${st.activeField}-${st.activeSetIdx}`);
    if (!inp) return;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    const cur = parseFloat(String(inp.value || "0").replace(",", ".")) || 0;
    const gymStep = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getGymStepIncrement === "function")
      ? window.REMK_SCIENCE_BRAIN.getGymStepIncrement()
      : 2.5;
    const kgStep = (Math.abs(delta) === 2.5) ? (delta > 0 ? gymStep : -gymStep) : delta;
    const step = st.activeField === "reps" ? (delta > 0 ? 1 : -1) : kgStep;
    const minVal = (st.activeField === "kg" && curEx && curEx.isBw) ? -60 : 0;
    const next = Math.max(minVal, Math.round((cur + step) * 100) / 100);
    st.numpadBuffer = "";
    inp.value = next;
    window.onV345DirectInput(st.activeSetIdx, st.activeField, next);
  };

  window.toggleV345SetDone = function (sIdx) {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    const setObj = curEx?.sets[sIdx];
    if (!setObj) return;
    const kgDom = document.getElementById(`v34-inp-kg-${sIdx}`);
    const repsDom = document.getElementById(`v34-inp-reps-${sIdx}`);
    const finalKg = kgDom ? (parseFloat(String(kgDom.value).replace(",", ".")) || 0) : setObj.kg;
    const finalReps = repsDom ? (parseInt(repsDom.value, 10) || setObj.reps) : setObj.reps;
    const nextDone = !setObj.done;

    window.updateV345SetRecord(st.activeDayIdx, st.activeExIdx, sIdx, { kg: finalKg, reps: finalReps, done: nextDone }, true);
    let autoAdvanceTarget = null;
    let allDayFinished = false;
    if (nextDone) {
      const isProUser = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
      if (window.REMK_INTELLIGENCE) {
        window.REMK_INTELLIGENCE.recordMuscleFatigue(curEx, setObj.rir);
        window.REMK_INTELLIGENCE.syncExerciseRecordToArchive(curEx.name, finalKg, finalReps, setObj.rir);
      }
      if (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.syncCleanSetToStrengthMemory === "function") {
        window.REMK_SCIENCE_BRAIN.syncCleanSetToStrengthMemory(curEx, finalKg, finalReps);
        if (typeof window.REMK_INTELLIGENCE.markDayConsistent === "function") window.REMK_INTELLIGENCE.markDayConsistent();
      }
      window.currentProFocusExIdx = st.activeExIdx;
      const dynRest = (isProUser && window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.computeDynamicRestSeconds === "function")
        ? window.REMK_INTELLIGENCE.computeDynamicRestSeconds(curEx, { reps: finalReps, rir: setObj.rir }, st.readinessMode)
        : (curEx.restSec || 90);

      const refreshedDays = getV345WorkoutDaysData();
      const refDay = refreshedDays[st.activeDayIdx];
      const refEx = refDay?.exercises[st.activeExIdx];
      const exNowAllDone = refEx && refEx.sets.length > 0 && refEx.sets.every(function (x) { return x.done; });

      if (exNowAllDone && refDay) {
        const nextOpenAfter = refDay.exercises.findIndex(function (exItem, i) {
          return i > st.activeExIdx && exItem.sets.some(function (x) { return !x.done; });
        });
        const nextOpenBefore = refDay.exercises.findIndex(function (exItem, i) {
          return i < st.activeExIdx && exItem.sets.some(function (x) { return !x.done; });
        });
        const nextIdx = nextOpenAfter >= 0 ? nextOpenAfter : nextOpenBefore;
        if (nextIdx >= 0) {
          autoAdvanceTarget = { idx: nextIdx, name: formatShortExerciseLabelV354(refDay.exercises[nextIdx].name) };
        } else {
          allDayFinished = true;
        }
      } else if (sIdx + 1 < curEx.sets.length) {
        st.activeSetIdx = sIdx + 1;
        st.activeField = "kg";
      }

      if (typeof window.startRestTimer === "function") window.startRestTimer(dynRest);
      if (typeof window.triggerIosHaptic === "function") window.triggerIosHaptic("success");
    }
    st.numpadBuffer = "";
    if (typeof window.pushCleanUiStateToWatchV359 === "function") window.pushCleanUiStateToWatchV359();
    window.renderV345FitnessCleanPanel(true);

    if (autoAdvanceTarget) {
      const expectedDay = st.activeDayIdx;
      const expectedFrom = st.activeExIdx;
      setTimeout(function () {
        if (window.v34State.fitSubTab === "logger" && window.v34State.activeDayIdx === expectedDay && window.v34State.activeExIdx === expectedFrom) {
          window.v34State.activeExIdx = autoAdvanceTarget.idx;
          window.v34State.activeSetIdx = 0;
          window.currentProFocusExIdx = autoAdvanceTarget.idx;
          window.showV351Toast(`✅ Übung fertig! Weiter zu ${autoAdvanceTarget.name}`);
          window.renderV345FitnessCleanPanel(true);
        }
      }, 650);
    } else if (allDayFinished) {
      const expectedDay = st.activeDayIdx;
      setTimeout(function () {
        if (window.v34State.fitSubTab === "logger" && window.v34State.activeDayIdx === expectedDay) {
          window.showV351Toast("🏆 Alle Sätze heute geschafft! Tippe auf Abschluss.");
        }
      }, 650);
    }
  };

  window.openV362TechniqueModal = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    if (window.REMK_COURSE_CLUB && typeof window.REMK_COURSE_CLUB.openTechniqueAndVideoModal === "function") {
      window.REMK_COURSE_CLUB.openTechniqueAndVideoModal(curEx);
    } else if (curEx.videoUrl) {
      window.open(curEx.videoUrl, "_blank");
    }
  };

  window.toggleV362TempoMetronome = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (window.REMK_COURSE_CLUB && typeof window.REMK_COURSE_CLUB.toggleTempoMetronome === "function") {
      window.REMK_COURSE_CLUB.toggleTempoMetronome(curEx?.tempo || "3-1-1-0");
    }
  };

  window.insertV362AutoWarmupSets = function () {
    const st = window.v34State;
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx || !curEx.sets.length) return;
    const firstWork = curEx.sets.find(function (s) { return s.setType !== "W"; }) || curEx.sets[0];
    if (curEx.isBw || (parseFloat(firstWork.kg) || 0) < 20) {
      window.showV351Toast("🔥 Leichte/BW-Übung: 1 lockerer Mobilitäts-Satz genügt!");
      return;
    }
    const baseKg = parseFloat(firstWork.kg) || 50;
    const warmups = [
      { kg: Math.max(10, Math.round((baseKg * 0.5) / 2.5) * 2.5), reps: 8, done: false, rir: 4, setType: "W" },
      { kg: Math.max(15, Math.round((baseKg * 0.72) / 2.5) * 2.5), reps: 4, done: false, rir: 3, setType: "W" }
    ];
    const logs = loadV34Logs();
    const shift = warmups.length;
    const extraKey = `extra_sets_w${activeW}_d${st.activeDayIdx}_e${st.activeExIdx}`;
    logs[extraKey] = (parseInt(logs[extraKey] || "0", 10) || 0) + shift;
    const oldSets = curEx.sets.slice();
    for (let i = oldSets.length - 1; i >= 0; i--) {
      const targetKey = `w${activeW}_d${st.activeDayIdx}_e${st.activeExIdx}_s${i + shift}`;
      logs[targetKey] = { kg: oldSets[i].kg, reps: oldSets[i].reps, done: oldSets[i].done, rir: oldSets[i].rir, setType: oldSets[i].setType || "N" };
    }
    warmups.forEach(function (wObj, wIdx) {
      logs[`w${activeW}_d${st.activeDayIdx}_e${st.activeExIdx}_s${wIdx}`] = wObj;
    });
    saveV34Logs(logs);
    st.activeSetIdx = 0;
    window.showV351Toast(`🔥 2 Aufwärmsätze (${warmups[0].kg} kg & ${warmups[1].kg} kg) vor Satz 1 eingefügt!`);
    window.renderV345FitnessCleanPanel(true);
  };

  window.addV345SetToCurrentExercise = function () {
    const st = window.v34State;
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const logs = loadV34Logs();
    const key = `extra_sets_w${activeW}_d${st.activeDayIdx}_e${st.activeExIdx}`;
    logs[key] = (parseInt(logs[key] || "0", 10) || 0) + 1;
    saveV34Logs(logs);
    window.showV351Toast("➕ Satz hinzugefügt");
    window.renderV345FitnessCleanPanel();
  };

  window.removeV351SetFromCurrentExercise = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx || curEx.sets.length <= 1) return;
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const logs = loadV34Logs();
    const key = `extra_sets_w${activeW}_d${st.activeDayIdx}_e${st.activeExIdx}`;
    logs[key] = (parseInt(logs[key] || "0", 10) || 0) - 1;
    saveV34Logs(logs);
    window.showV351Toast("➖ Letzten Satz entfernt");
    window.renderV345FitnessCleanPanel();
  };

  window.openV351QrForCurrentEx = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    if (typeof window.openQrVideoModal === "function") {
      const mTxt = curEx.musclePrimary ? (curEx.musclePrimary + (curEx.muscleSecondary ? " | " + curEx.muscleSecondary : "")) : "";
      window.openQrVideoModal(curEx.name, curEx.videoUrl, mTxt);
      const qm = document.getElementById("qr-video-modal");
      if (qm) qm.style.zIndex = "2000750";
    } else {
      window.open(curEx.videoUrl, "_blank");
    }
  };

  window.openV351GearCableModal = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    const setObj = curEx.sets[st.activeSetIdx] || curEx.sets[0];
    if (typeof window.openWorkoutGearWheelModalV234 === "function" && setObj && setObj.domInputId) {
      try {
        window.openWorkoutGearWheelModalV234(setObj.domInputId, curEx.name);
        const gm = document.getElementById("remk-v234-gear-modal") || document.getElementById("remk-v234-gear-picker-modal");
        if (gm) gm.style.zIndex = "2000750";
        return;
      } catch (e) {}
    }
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openPromptSheet({
        title: "⚙️ Kabelzug- / Flaschenzug-Rechner",
        subtitle: `Steckgewicht am Turm (kg) für "${curEx.name}" eingeben:`,
        placeholder: "z. B. 40",
        initialValue: String(setObj?.kg || 40),
        inputType: "text",
        confirmLabel: "Umrechnen & speichern",
        onSave: function (stackKg) {
          const v = parseFloat(String(stackKg || "").replace(",", ".")) || 0;
          if (v > 0) {
            const eff21 = Math.round((v * 0.5) * 2) / 2;
            window.saveV351InlineExerciseNote(curEx.name, `⚙️ 2:1 Kabelzug: ${v} kg Stack = ${eff21} kg effektiv`, true);
            window.showV351Toast(`⚙️ 2:1 effektiv: ${eff21} kg (in Notiz gespeichert)`);
            window.renderV345FitnessCleanPanel(true);
          }
        }
      });
    }
  };

  window.toggleV351Superset = function () {
    const st = window.v34State;
    if (typeof window.toggleSupersetWithNextExerciseV213 === "function") {
      try {
        window.toggleSupersetWithNextExerciseV213(st.activeDayIdx, st.activeExIdx);
        window.showV351Toast("🔗 Supersatz-Kopplung aktualisiert");
        window.renderV345FitnessCleanPanel();
        return;
      } catch (e) {}
    }
    window.showV351Toast("🔗 Supersatz-Funktion ab 2 Übungen verfügbar");
  };

  window.buildAccurateExerciseVoiceCueV360 = function (ex) {
    if (!ex) return "Voller Fokus auf saubere Technik!";
    const m = String(ex.mech || "").toLowerCase();
    const n = String(ex.name || "").toLowerCase();
    const cleanName = formatShortExerciseLabelV354(ex.name);
    if (m.includes("pull_horiz") || /rudern|row|t-?bar|pendlay/.test(n)) {
      return `${cleanName}: Ellbogen eng am Körper nach hinten ziehen, Schulterblätter fest zusammendrücken und kontrolliert nachgeben!`;
    }
    if (m.includes("pull_vert") || /klimmzug|klimmzüg|pull-?up|latzug|überzüg/.test(n)) {
      return `${cleanName}: Schultern tief ziehen, Brust stolz und über den breiten Rücken nach unten ziehen!`;
    }
    if (/\bdip|dips/.test(n)) {
      return `${cleanName}: Schultern tief stabilisieren, kontrolliert tief absenken und kraftvoll ausdrücken!`;
    }
    if (m.includes("hinge") || m.includes("leg_curl") || /kreuzheben|deadlift|sumo|rdl|beinbeug|hip thrust/.test(n)) {
      return `${cleanName}: Rücken wie ein Brett, Bauch fest und die Hüfte kraftvoll nach vorne strecken!`;
    }
    if (m.includes("leg_squat") || m.includes("leg_press") || m.includes("leg_uni") || /kniebeug|squat|beinpress|split|lunge/.test(n)) {
      return `${cleanName}: Knie stabil über den Zehenspitzen führen, kontrolliert tief und explosiv hochdrücken!`;
    }
    if (m.includes("push_vert") || /schulterdrück|military|overhead/.test(n)) {
      return `${cleanName}: Rumpf und Gesäß anspannen, kein Hohlkreuz und sauber über Kopf drücken!`;
    }
    if (/seitheben|lateral/.test(n)) {
      return `${cleanName}: Mit den Ellbogen führen, kein Schwung und oben kurz die seitliche Schulter halten!`;
    }
    if (m.includes("pull_iso") || /bizeps|curl/.test(n)) {
      return `${cleanName}: Oberarme ruhig am Körper fixieren, oben sauber anspannen und langsam ablassen!`;
    }
    if (m.includes("push_iso") || /trizeps|pushdown|french/.test(n)) {
      return `${cleanName}: Ellbogen fest fixiert, sauber in die volle Streckung drücken!`;
    }
    if (m.includes("core") || /plank|bauch|crunch|ab wheel|rollout/.test(n)) {
      return `${cleanName}: Rippenbogen Richtung Becken ziehen und unter voller Bauchspannung ausatmen!`;
    }
    if (m.includes("calf") || /wade|calf/.test(n)) {
      return `${cleanName}: Unten voll in die Dehnung gehen und oben eine Sekunde halten!`;
    }
    if (m.includes("push_horiz") || /bankdrück|schrägbank|butterfly|fly|brust(?!gestütz)/.test(n)) {
      return `${cleanName}: Schulterblätter fest in die Bank drücken, kontrolliert absenken und explosiv hoch!`;
    }
    return `${cleanName}: Volle Konzentration, kontrolliertes Tempo und saubere Technik!`;
  };

  window.speakV351CoachTip = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    window.currentProFocusExIdx = st.activeExIdx;
    const cue = window.buildAccurateExerciseVoiceCueV360(curEx);
    if (typeof window.speakRemkCoachV247 === "function") {
      try { window.speakRemkCoachV247(cue); window.showV351Toast("🗣️ Coach-Ansage gestartet"); return; } catch (e) {}
    }
    if (typeof window.speakRemkCoachText === "function") {
      try { window.speakRemkCoachText(cue); window.showV351Toast("🗣️ Coach-Ansage gestartet"); return; } catch (e) {}
    }
    window.showV351Toast("🗣️ " + cue.slice(0, 70));
  };

  window.swapV345Exercise = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (curEx && window.isV352ExercisePinned(curEx.name)) {
      window.showV351Toast("📌 Übung ist angepinnt – erst Pin lösen zum Tauschen!");
      return;
    }
    const resBox = document.getElementById("result-box");
    const tables = resBox ? Array.from(resBox.querySelectorAll("table.plan-table")) : [];
    const tr = tables[st.activeDayIdx]?.querySelectorAll("tbody tr")[st.activeExIdx];
    const btn = tr?.querySelector('button[onclick*="rerollExercise"]');
    if (btn) btn.click();
    window.renderV345FitnessCleanPanel(true);
  };

  // v35.4: "⏳ Gerät besetzt" -> schiebt aktuelle Übung ans Ende des Tages
  window.deferV354OccupiedExercise = function () {
    const st = window.v34State;
    const resBox = document.getElementById("result-box");
    const tables = resBox ? Array.from(resBox.querySelectorAll("table.plan-table")) : [];
    const tbody = tables[st.activeDayIdx]?.querySelector("tbody");
    if (!tbody) return;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    if (rows.length < 2 || st.activeExIdx >= rows.length - 1) {
      window.showV351Toast("ℹ️ Übung steht bereits am Ende des Tages");
      return;
    }
    tbody.appendChild(rows[st.activeExIdx]);
    st.activeSetIdx = 0;
    window.showV351Toast("⏳ Übung ans Tagesende geschoben – nächste Übung bereit!");
    window.renderV345FitnessCleanPanel(true);
  };

  // v35.6: "🩹 Zwickt heute" -> synchronisiert Tag/Übungs-Index & tauscht exakt die aktive Übung!
  window.openV354PainSwap = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    if (window.isV352ExercisePinned(curEx.name)) {
      window.showV351Toast("📌 Übung ist angepinnt – erst Pin lösen zum Tauschen!");
      return;
    }
    if (typeof window.swapCurrentExerciseForJointPainFriendly === "function") {
      try {
        window.currentProFocusExIdx = st.activeExIdx;
        localStorage.setItem("remk_active_wday_tab", String(st.activeDayIdx));
        if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.addJointProtectionFlag(curEx.musclePrimary || curEx.name);
        window.swapCurrentExerciseForJointPainFriendly();
        window.showV351Toast("🩹 Gelenkschonende Alternative geladen!");
        setTimeout(function () { window.renderV345FitnessCleanPanel(true); }, 120);
        return;
      } catch (e) {}
    }
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openConfirmSheet({
        title: "🩹 Gelenkschonend tauschen?",
        message: `"${curEx.name}" schmerzt oder zwickt heute? Wir tauschen direkt auf eine schonendere Alternative.`,
        confirmLabel: "Jetzt tauschen",
        onConfirm: function () {
          window.swapV345Exercise();
          window.showV351Toast("🩹 Alternative geladen – trainiere schmerzfrei!");
        }
      });
    } else {
      window.swapV345Exercise();
    }
  };

  // v35.4: "💡 Startgewicht-Assistent" (ignoriert Bodyweight-Übungen automatisch)
  window.applyV354StarterWeight = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    if (isBodyweightExerciseName(curEx.name)) {
      window.showV351Toast("🤸 Eigengewichts-Übung – kein Zusatzgewicht nötig!");
      return;
    }
    const bw = parseFloat(document.getElementById("weight")?.value || localStorage.getItem("remk_saved_weight") || "75") || 75;
    const isFemale = (window.REMK_ANATOMY && window.REMK_ANATOMY.getGender() === "w");
    const factor = isFemale ? 0.65 : 1.0;
    const m = String(curEx.mech || "").toLowerCase();
    const n = String(curEx.name || "").toLowerCase();
    let rec = Math.round((bw * 0.35 * factor) / 2.5) * 2.5;
    if (/leg_squat|leg_press|hinge|kniebeug|kreuzheben|beinpress/.test(m + " " + n)) {
      rec = Math.round((bw * 0.65 * factor) / 2.5) * 2.5;
    } else if (/iso|kurzhantel|seitheben|curl|trizeps|butterfly|fly/.test(m + " " + n)) {
      rec = Math.max(4, Math.round((bw * 0.14 * factor) / 1.25) * 1.25);
    }
    rec = Math.max(2.5, rec);
    curEx.sets.forEach(function (s, idx) {
      if (!s.done) window.updateV345SetRecord(st.activeDayIdx, st.activeExIdx, idx, { kg: rec }, idx === curEx.sets.length - 1);
    });
    window.showV351Toast(`💡 Startgewicht gesetzt: ${rec} kg (basierend auf ${bw} kg KG)`);
    window.renderV345FitnessCleanPanel(true);
  };

  function getV351DayRampAndCardioHtml(dayIdx) {
    const resBox = document.getElementById("result-box");
    if (!resBox) return "";
    const tables = Array.from(resBox.querySelectorAll("table.plan-table"));
    const tbl = tables[dayIdx];
    let htmlParts = [];
    if (tbl) {
      const prevDet = tbl.previousElementSibling;
      if (prevDet && prevDet.tagName === "DETAILS") {
        const inner = prevDet.querySelector("div")?.innerText?.trim() || "";
        if (inner) {
          htmlParts.push(`<div class="v34-nutri-card"><div style="font-weight:900;font-size:0.93rem;margin-bottom:6px;color:#ff5e00;">🔥 Sportart-RAMP Warm-Up (Tag ${dayIdx + 1})</div><div style="font-size:0.82rem;color:var(--v34-muted);line-height:1.5;white-space:pre-line;">${escHtml(inner)}</div></div>`);
        }
      }
      const nextDet = tbl.nextElementSibling;
      if (nextDet && nextDet.tagName === "DETAILS") {
        const inner = nextDet.querySelector("div")?.innerText?.trim() || "";
        if (inner) {
          htmlParts.push(`<div class="v34-nutri-card"><div style="font-weight:900;font-size:0.93rem;margin-bottom:6px;color:#0284c7;">🧘 Cool-Down &amp; Regeneration</div><div style="font-size:0.82rem;color:var(--v34-muted);line-height:1.5;white-space:pre-line;">${escHtml(inner)}</div></div>`);
        }
      }
    }
    const extraCards = Array.from(resBox.querySelectorAll(".result-section > div")).filter(function (d) {
      const t = d.innerText || "";
      return /Zone 2|HIIT Intervall|Kurs-Timing|Kraftausdauer-Kurs|High-Intensity Kurs/i.test(t) && t.length < 1600;
    });
    extraCards.forEach(function (d) {
      const h4 = d.querySelector("h4")?.innerText?.trim() || "🏃 Ausdauer & Kurse";
      const txt = d.innerText.replace(h4, "").trim();
      htmlParts.push(`<div class="v34-nutri-card"><div style="font-weight:900;font-size:0.93rem;margin-bottom:6px;color:#10b981;">${escHtml(h4)}</div><div style="font-size:0.81rem;color:var(--v34-muted);line-height:1.5;white-space:pre-line;">${escHtml(txt.slice(0, 900))}</div></div>`);
    });
    return htmlParts.join("");
  }

  window.openV345WarmupModal = function () {
    const st = window.v34State;
    const days = getV345WorkoutDaysData();
    const curEx = days[st.activeDayIdx]?.exercises[st.activeExIdx];
    if (!curEx) return;
    const workKg = curEx.sets[0]?.kg || 60;
    const w1 = Math.max(0, Math.round((workKg * 0.5) / 2.5) * 2.5);
    const w2 = Math.max(0, Math.round((workKg * 0.75) / 2.5) * 2.5);
    const w3 = Math.max(0, Math.round((workKg * 0.9) / 2.5) * 2.5);

    let modal = document.getElementById("remk-v34-warmup-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "remk-v34-warmup-modal";
      document.body.appendChild(modal);
    }
    bindSwipeBackOnModal(modal);
    try { window.history.pushState({ v34Modal: "warmup" }, ""); } catch (e) {}

    modal.innerHTML = `
      <div style="max-width:480px;margin:0 auto;padding:20px 18px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="margin:0;font-size:1.18rem;font-weight:900;">🔥 Warm-Up &amp; Hantelscheiben</h2>
          <button type="button" class="v34-btn-soft" onclick="window.closeV345OpenModals();" style="border-radius:999px;padding:7px 14px;font-weight:900;font-size:0.82rem;">‹ Zurück</button>
        </div>

        <div class="v34-nutri-card">
          <div style="font-size:0.74rem;font-weight:800;color:#ff5e00;text-transform:uppercase;">Aktuelle Übung</div>
          <div style="font-size:1.05rem;font-weight:900;margin-top:2px;">${escHtml(curEx.name)}</div>
          <div style="font-size:0.84rem;color:var(--v34-muted);margin-top:4px;">Arbeitsgewicht: <strong>${workKg} kg</strong></div>
        </div>

        <div class="v34-nutri-card">
          <div style="font-weight:900;font-size:0.95rem;margin-bottom:8px;">🏋️ Hantelscheiben-Rechner (20 kg Stange)</div>
          <div style="background:rgba(255,94,0,0.1);border:1px solid rgba(255,94,0,0.4);border-radius:12px;padding:12px;font-weight:800;font-size:0.9rem;color:#ea580c;">
            ${escHtml(calculateBarbellPlatesText(workKg))}
          </div>
        </div>

        <div class="v34-nutri-card">
          <div style="font-weight:900;font-size:0.95rem;margin-bottom:10px;">⚡ 3-Stufen Aufwärm-Pyramide</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:0.88rem;">
            <div style="display:flex;justify-content:space-between;padding:9px 12px;border-radius:12px;background:var(--v34-card-soft);">
              <span>1. Mobilisation (50 %)</span><strong>${w1} kg &times; 12 Wdh.</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:9px 12px;border-radius:12px;background:var(--v34-card-soft);">
              <span>2. Potenzierung (75 %)</span><strong>${w2} kg &times; 6 Wdh.</strong>
            </div>
            <div style="display:flex;justify-content:space-between;padding:9px 12px;border-radius:12px;background:var(--v34-card-soft);">
              <span>3. ZNS-Aktivierung (90 %)</span><strong>${w3} kg &times; 2 Wdh.</strong>
            </div>
          </div>
        </div>

        ${getV351DayRampAndCardioHtml(st.activeDayIdx)}

        <button type="button" onclick="window.closeV345OpenModals();" class="v34-primary-cta">
          Verstanden &amp; zurück zum Training
        </button>
      </div>
    `;
    modal.style.display = "block";
    modal.scrollTop = 0;
  };

  // =========================================================================
  // 5. NEUES ERNÄHRUNGS-COCKPIT (OHNE ALT-UI-DOPPLUNG!)
  // =========================================================================
  function buildSvgScoreRing(scoreNum, size, color) {
    const val = Math.max(1, Math.min(10, parseFloat(scoreNum) || 7.6));
    const displayStr = val.toFixed(1).replace(".", ",");
    const r = Math.round(size * 0.39);
    const cx = Math.round(size / 2);
    const c = Math.round(2 * Math.PI * r);
    const offset = Math.round(c - (val / 10) * c);
    const track = isDarkModeActive() ? "#2a354b" : "#e2e8f0";
    return `
      <div style="position:relative;width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;">
        <svg width="${size}" height="${size}" style="transform:rotate(-90deg);">
          <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${track}" stroke-width="5"/>
          <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color || '#5f9e8f'}" stroke-width="5"
            stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
        </svg>
        <span style="position:absolute;font-weight:900;font-size:${Math.round(size * 0.25)}px;color:var(--v34-text);">${displayStr}</span>
      </div>
    `;
  }

  function inferMealTags(title, ingStr) {
    const t = (String(title || "") + " " + String(ingStr || "")).toLowerCase();
    const tags = [];
    if (t.includes("hähnchen") || t.includes("pute") || t.includes("rind") || t.includes("lachs") || t.includes("thunfisch") || t.includes("skyr") || t.includes("quark") || t.includes("tofu")) tags.push("Viel Prot.");
    if (t.includes("curry") || t.includes("bowl") || t.includes("wrap") || t.includes("quick") || t.includes("schnell") || t.includes("skyr") || t.includes("oats")) tags.push("Schnell");
    if (!t.includes("hähnchen") && !t.includes("pute") && !t.includes("rind") && !t.includes("schwein") && !t.includes("lachs") && !t.includes("thunfisch") && !t.includes("kabeljau") && !t.includes("seelachs") && !t.includes("garnele")) tags.push("Veggie");
    if (t.includes("brokkoli") || t.includes("spinat") || t.includes("paprika") || t.includes("tomate") || t.includes("gurke") || t.includes("gemüse") || t.includes("zucchini") || t.includes("beeren")) tags.push("Mikro-Top");
    if (tags.length < 2) tags.push("Balance");
    return tags.slice(0, 3);
  }

  function computeRealMealScores(kcal, prot, carbs, fat, ingStr) {
    const k = Math.max(100, kcal || 550);
    const protPct = (prot * 4) / k;
    const fatPct = (fat * 9) / k;
    const low = String(ingStr || "").toLowerCase();
    const hasVeg = /brokkoli|spinat|paprika|tomate|gurke|zucchini|beeren|karotte|bohne|salat|kohl|apfel/.test(low);
    const hasWhole = /vollkorn|hafer|quinoa|kartoffel|süßkartoffel|linse|kichererbse|naturreis|skyr|quark|buchweizen/.test(low);

    const energy = Math.max(6.2, Math.min(9.6, 7.0 + (protPct >= 0.25 ? 1.4 : 0.4) + (fatPct <= 0.35 ? 0.7 : -0.4)));
    const micro = Math.max(6.5, Math.min(9.7, 7.1 + (hasVeg ? 1.5 : 0.3) + (hasWhole ? 0.7 : 0.2)));
    const food = Math.max(6.8, Math.min(9.8, 7.3 + (hasWhole ? 1.3 : 0.4) + (prot >= 30 ? 0.8 : 0.2)));
    const total = (energy + micro + food) / 3;
    return { total, energy, micro, food, color: total >= 8.2 ? "#10b981" : "#5f9e8f" };
  }

  function formatKitchenMeasureHint(amtStr, nameStr) {
    const m = String(amtStr || "").match(/([0-9]+(?:[.,][0-9]+)?)\s*(g|ml|stück|el|tl)?/i);
    if (!m) return "";
    const val = parseFloat(m[1].replace(",", ".")) || 0;
    const unit = (m[2] || "g").toLowerCase();
    const low = String(nameStr || "").toLowerCase();
    if (unit === "stück" || unit === "el" || unit === "tl" || val <= 0) return "";
    if (low.includes("öl") || low.includes("sojasauce") || low.includes("honig") || low.includes("mus") || low.includes("senf")) {
      const el = Math.max(0.5, Math.round((val / 12) * 2) / 2);
      return ` (~${String(el).replace(".", ",")} EL)`;
    }
    if (low.includes("hafer") || low.includes("flocken") || low.includes("reis") || low.includes("couscous") || low.includes("quinoa")) {
      const el = Math.max(1, Math.round(val / 15));
      return ` (~${el} EL)`;
    }
    if (low.includes("quark") || low.includes("skyr") || low.includes("joghurt") || low.includes("hüttenkäse")) {
      const el = Math.max(1, Math.round(val / 35));
      return ` (~${el} geh. EL)`;
    }
    if (low.includes("beeren") || low.includes("spinat") || low.includes("brokkoli") || low.includes("nuss") || low.includes("mandel")) {
      const hf = Math.max(1, Math.round(val / 45));
      return ` (~${hf} Handvoll)`;
    }
    return "";
  }

  function scaleIngredientAmountLine(line, factor) {
    const match = String(line || "").match(/^([\d.,/]+)\s*([a-zA-ZäöüÄÖÜß]*)\s+(.*)$/);
    if (!match) return { amt: "1 Portion", name: line };
    const rawNum = parseFloat(match[1].replace(",", ".")) || 0;
    const unit = match[2] || "";
    const name = match[3] || "";
    if (rawNum <= 0 || Math.abs(factor - 1) < 0.01) {
      return { amt: `${match[1]}${unit ? ' ' + unit : ''}`, name };
    }
    const scaled = unit.toLowerCase() === "stück"
      ? Math.max(0.5, Math.round(rawNum * factor * 2) / 2)
      : Math.max(1, Math.round(rawNum * factor));
    return { amt: `${String(scaled).replace(".", ",")}${unit ? ' ' + unit : ''}`, name };
  }

  function getHouseholdShareInfo() {
    if (typeof window.computeExactHouseholdBreakdownV228 === "function") {
      try {
        const sh = window.computeExactHouseholdBreakdownV228();
        if (sh && sh.totalCals > 0) return sh;
      } catch (e) {}
    }
    const base = window.householdShares || { athleteCals: 2500, partnerCals: 0, kidsCals: 0, totalCals: 2500 };
    const tot = Math.max(1, base.totalCals || base.athleteCals || 2500);
    return {
      athleteCals: base.athleteCals || tot,
      partnerCals: base.partnerCals || 0,
      kidsCals: base.kidsCals || 0,
      totalCals: tot,
      athleteRatio: (base.athleteCals || tot) / tot
    };
  }

  function getNutritionDayGroups() {
    const resBox = document.getElementById("result-box");
    if (!resBox) return [];
    const grouped = Array.from(resBox.querySelectorAll(".remk-nutrition-day-group"));
    if (grouped.length > 0) return grouped;

    const list = resBox.querySelector(".recipe-list");
    if (!list) return [];
    const days = [];
    let cur = null;
    Array.from(list.children).forEach(function (ch) {
      if (ch.classList.contains("day-header")) {
        cur = { header: ch.innerText.trim(), items: [] };
        days.push(cur);
      } else if (ch.classList.contains("recipe-item")) {
        if (!cur) { cur = { header: "Tag 1", items: [] }; days.push(cur); }
        cur.items.push(ch);
      }
    });
    return days;
  }

  function getV345DayMeals(dayNum) {
    const groups = getNutritionDayGroups();
    if (groups.length === 0) return [];
    const safeDay = Math.max(1, Math.min(groups.length, dayNum || 1));
    const grp = groups[safeDay - 1];
    const rawItems = grp instanceof Element
      ? Array.from(grp.querySelectorAll(".recipe-item"))
      : (grp && Array.isArray(grp.items) ? grp.items : []);

    const sh = getHouseholdShareInfo();
    const athleteRatio = (sh.athleteCals && sh.totalCals && sh.totalCals > sh.athleteCals)
      ? (sh.athleteCals / sh.totalCals)
      : 1.0;

    const slotNames = ["Frühstück", "Mittagessen", "Workout-Snack", "Abendessen", "Spät-Snack"];
    const favsRaw = safeJsonParse(localStorage.getItem("remk_favorite_recipes") || "[]", []);
    const favSet = new Set(Array.isArray(favsRaw) ? favsRaw.map(function (f) { return typeof f === "string" ? f : (f && f.name ? f.name : ""); }) : []);

    return rawItems.map(function (li, idx) {
      const _rawTitle = (li.querySelector("h4")?.innerText || "RE:MK Gericht").trim();
      const title = _rawTitle.replace(/\s*\((?:[^)]*(?:vegan|vegetar|gluten|laktose|nuss|protein|low[- ]?carb|high[- ]?carb|no[- ]?cook)[^)]*)\)/gi, "").trim() || _rawTitle;
      const metaTxt = li.querySelector(".recipe-meta")?.innerText || "";
      const macroTxt = li.querySelector(".macros")?.innerText || "550 kcal | EW: 40g | KH: 60g | Fett: 16g";
      const prepMultEl = li.querySelector("[data-prep-mult]");
      const prepMult = parseInt(prepMultEl?.getAttribute("data-prep-mult") || "1", 10) || 1;
      const isCarryOver = metaTxt.toLowerCase().includes("vorgekocht") || metaTxt.toLowerCase().includes("vortag");

      const potKcal = parseInt((macroTxt.match(/(\d+)\s*kcal/i) || [])[1] || "550", 10);
      const potProt = parseInt((macroTxt.match(/EW:\s*(\d+)/i) || [])[1] || "40", 10);
      const potCarbs = parseInt((macroTxt.match(/KH:\s*(\d+)/i) || [])[1] || "60", 10);
      const potFat = parseInt((macroTxt.match(/Fett:\s*(\d+)/i) || [])[1] || "16", 10);

      const kcal = Math.round((potKcal / prepMult) * athleteRatio);
      const prot = Math.round((potProt / prepMult) * athleteRatio);
      const carbs = Math.round((potCarbs / prepMult) * athleteRatio);
      const fat = Math.round((potFat / prepMult) * athleteRatio);

      const ings = Array.from(li.querySelectorAll(".recipe-details-content ul li")).map(function (el) { return el.innerText.trim(); });
      const steps = Array.from(li.querySelectorAll(".recipe-details-content ol li")).map(function (el) { return el.innerText.trim(); });
      const tags = inferMealTags(title, ings.join(" "));
      const sc = computeRealMealScores(kcal, prot, carbs, fat, ings.join(" "));

      const eatenKey1 = `remk_meal_eaten_d${safeDay}_m${idx}`;
      const eatenKey2 = `remk_v34_eaten_d${safeDay}_m${idx}`;
      const isEaten = localStorage.getItem(eatenKey1) === "1" || localStorage.getItem(eatenKey2) === "1";

      return {
        idx, dayNum: safeDay,
        slot: slotNames[idx] || `Mahlzeit ${idx + 1}`,
        title, kcal, prot, carbs, fat,
        potKcal, potProt, potCarbs, potFat,
        athleteRatio, prepMult, isCarryOver,
        ings, steps, tags, sc, isEaten,
        isFav: favSet.has(title),
        domLi: li
      };
    });
  }

  window.swapV352MealPlate = function (mealIdx) {
    const m = (window.__v345CurrentMeals || [])[mealIdx];
    const sb = m?.domLi?.querySelector('button[onclick*="rerollRecipe"]');
    if (sb) {
      sb.click();
      window.showV351Toast("🔄 Teller getauscht & Einkaufsliste aktualisiert");
      setTimeout(function () {
        window.renderV345NutritionCleanPanel();
      }, 90);
    } else {
      window.showV351Toast("ℹ️ Bitte erst einen Ernährungsplan generieren");
    }
  };

  window.swapV352MealNoCook = function (mealIdx) {
    window.currentProNutriMealIdx = mealIdx;
    if (typeof window.swapActiveMealForQuickNoCookV209 === "function") {
      try {
        window.swapActiveMealForQuickNoCookV209();
        window.closeV345OpenModals();
        window.showV351Toast("⚡ Auf schnelles No-Cook Gericht getauscht");
        setTimeout(window.renderV345NutritionCleanPanel, 90);
        return;
      } catch (e) {}
    }
    window.swapV352MealPlate(mealIdx);
    window.closeV345OpenModals();
  };

  window.scaleV352MealPortion = function (mealIdx, factor) {
    window.currentProNutriMealIdx = mealIdx;
    if (typeof window.applyQuickMealPortionScaleV213 === "function") {
      try {
        window.applyQuickMealPortionScaleV213(factor);
        window.showV351Toast(`⚖️ Portion auf ${Math.round(factor * 100)}% angepasst`);
        setTimeout(function () {
          window.renderV345NutritionCleanPanel();
          if (window.__v345CurrentMeals && window.__v345CurrentMeals[mealIdx]) {
            window.__v345ActiveModalMeal = window.__v345CurrentMeals[mealIdx];
            renderPlateModalContent(window.__v345ActiveModalMeal, false);
          }
        }, 80);
        return;
      } catch (e) {}
    }
  };

  window.toggleV345MealEaten = function (dayNum, mealIdx) {
    const k1 = `remk_meal_eaten_d${dayNum}_m${mealIdx}`;
    const k2 = `remk_v34_eaten_d${dayNum}_m${mealIdx}`;
    const next = !(localStorage.getItem(k1) === "1" || localStorage.getItem(k2) === "1");
    if (next && window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.markDayConsistent === 'function') {
      window.REMK_INTELLIGENCE.markDayConsistent();
    }
    localStorage.setItem(k1, next ? "1" : "0");
    localStorage.setItem(k2, next ? "1" : "0");
    localStorage.setItem("remk_meal_slot_done_" + mealIdx, next ? "1" : "0");
    if (typeof window.syncAll4NativeWidgetsV247 === "function") {
      try { window.syncAll4NativeWidgetsV247(); } catch (e) {}
    }
    if (typeof window.pushCleanUiStateToWatchV359 === "function") window.pushCleanUiStateToWatchV359();
    window.renderV345NutritionCleanPanel();
  };

  window.toggleV345MealFavorite = function (mealIdx) {
    const m = (window.__v345CurrentMeals || [])[mealIdx];
    if (!m) return;
    if (typeof window.toggleFavoriteRecipe === "function") {
      try { window.toggleFavoriteRecipe(m.title); } catch (e) {}
    } else {
      const list = safeJsonParse(localStorage.getItem("remk_favorite_recipes") || "[]", []);
      const arr = Array.isArray(list) ? list : [];
      const pos = arr.findIndex(function (x) { return (typeof x === "string" ? x : x?.name) === m.title; });
      if (pos >= 0) arr.splice(pos, 1);
      else arr.push(m.title);
      try { localStorage.setItem("remk_favorite_recipes", JSON.stringify(arr)); } catch (e) {}
    }
    window.renderV345NutritionCleanPanel();
  };

  window.stepV345Water = function (deltaL) {
    const cur = parseFloat(localStorage.getItem("remk_drank_liters_today") || "0") || 0;
    const next = Math.max(0, Math.round((cur + deltaL) * 100) / 100);
    localStorage.setItem("remk_drank_liters_today", String(next));
    if (typeof window.syncAll4NativeWidgetsV247 === "function") {
      try { window.syncAll4NativeWidgetsV247(); } catch (e) {}
    }
    if (typeof window.pushCleanUiStateToWatchV359 === "function") window.pushCleanUiStateToWatchV359();
    window.renderV345NutritionCleanPanel();
  };

  window.editV345Steps = function () {
    const cur = parseInt(localStorage.getItem("remk_daily_steps_count") || localStorage.getItem("remk_steps_today") || "5000", 10) || 5000;
    const applySteps = function (inp) {
      const n = Math.max(0, parseInt(String(inp || "0").replace(/[^0-9]/g, ""), 10) || 0);
      localStorage.setItem("remk_daily_steps_count", String(n));
      localStorage.setItem("remk_steps_today", String(n));
      if (typeof window.applyStepsToNutritionAndPortions === "function") {
        try { window.applyStepsToNutritionAndPortions(n); } catch (e) {}
      }
      if (typeof window.syncAll4NativeWidgetsV247 === "function") {
        try { window.syncAll4NativeWidgetsV247(); } catch (e) {}
      }
      window.showV351Toast(`🚶 ${n.toLocaleString("de-DE")} Schritte gespeichert`);
      window.renderV345NutritionCleanPanel();
    };
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openPromptSheet({
        title: "🚶 Heutige Schritte",
        subtitle: "Passt deinen Tagesverbrauch automatisch an.",
        placeholder: "z. B. 8500",
        initialValue: String(cur),
        inputType: "number",
        onSave: applySteps
      });
    }
  };

  window.resetV345NutritionWeek = function () {
    const doReset = function () {
      for (let d = 1; d <= 28; d++) {
        for (let m = 0; m < 6; m++) {
          localStorage.removeItem(`remk_meal_eaten_d${d}_m${m}`);
          localStorage.removeItem(`remk_v34_eaten_d${d}_m${m}`);
        }
      }
      localStorage.setItem("remk_drank_liters_today", "0");
      if (typeof window.resetAllNutritionMealChecksForNewWeek === "function") {
        try { window.resetAllNutritionMealChecksForNewWeek(); } catch (e) {}
      }
      if (typeof window.resetTodayHydrationV202 === "function") {
        try { window.resetTodayHydrationV202(); } catch (e) {}
      }
      window.showV351Toast("🔄 Ernährungswoche & Wasser zurückgesetzt");
      window.renderV345NutritionCleanPanel();
    };
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openConfirmSheet({
        title: "🔄 Woche zurücksetzen?",
        message: "Alle abgehakten Mahlzeiten dieser Woche und der heutige Wasserstand werden auf 0 gesetzt.",
        confirmLabel: "Zurücksetzen",
        danger: true,
        onConfirm: doReset
      });
    } else {
      doReset();
    }
  };

  window.renderV345NutritionCleanPanel = function () {
    const resBox = document.getElementById("result-box");
    if (!resBox) return;

    const allNutPanels = Array.from(resBox.querySelectorAll("#remk-v34-nutri-clean-panel"));
    let panel = allNutPanels[0] || null;
    for (let i = 1; i < allNutPanels.length; i++) {
      try { allNutPanels[i].remove(); } catch (e) {}
    }
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "remk-v34-nutri-clean-panel";
      resBox.insertBefore(panel, resBox.firstChild);
    }

    const groups = getNutritionDayGroups();
    if (groups.length === 0) {
      panel.innerHTML = `<div class="v34-nutri-card" style="text-align:center;">
        <h3 style="margin:0 0 8px 0;">🍎 Noch kein Ernährungsplan aktiv</h3>
        <p style="font-size:0.84rem;color:var(--v34-muted);margin-bottom:14px;">Erstelle deinen persönlichen Wochenplan inkl. Makros &amp; 1-Seiten-Einkaufsliste.</p>
        <button type="button" class="v34-primary-cta" onclick="window.selectV345StartTile('ernaehrung');window.executeV345QuickGenerate();">⚡ Ernährungsplan generieren</button>
      </div>`;
      return;
    }

    const st = window.v34State;
    const totalDays = groups.length;
    if (st.activeNutriDay > totalDays) st.activeNutriDay = 1;
    const curDay = st.activeNutriDay || 1;
    localStorage.setItem("remk_active_nday_tab", String(curDay));

    const meals = getV345DayMeals(curDay);
    window.__v345CurrentMeals = meals;

    const subTabsHtml = `
      <div class="v34-nutri-subtabs v351-tabs-4">
        <button type="button" class="v34-nutri-subtab ${st.nutriSubTab === 'tracker' ? 'active' : ''}" onclick="window.v34State.nutriSubTab='tracker';window.renderV345NutritionCleanPanel();">📊 Heute</button>
        <button type="button" class="v34-nutri-subtab ${st.nutriSubTab === 'plan' ? 'active' : ''}" onclick="window.v34State.nutriSubTab='plan';window.renderV345NutritionCleanPanel();">📅 Plan</button>
        <button type="button" class="v34-nutri-subtab ${st.nutriSubTab === 'shopping' ? 'active' : ''}" onclick="window.v34State.nutriSubTab='shopping';window.renderV345NutritionCleanPanel();">🛒 Einkauf</button>
        <button type="button" class="v34-nutri-subtab ${st.nutriSubTab === 'recipes' ? 'active' : ''}" onclick="window.v34State.nutriSubTab='recipes';window.renderV345NutritionCleanPanel();">📖 Rezepte</button>
      </div>
    `;

    // TAB 1: TAGES-COCKPIT (ENTSCHLACKT: KALORIEN, MAKROS, WASSER/SCHRITTE + TÄGLICHES SCHNELL-TRACKING)
    if (st.nutriSubTab === "tracker") {
      const mealSumKcal = meals.reduce(function (s, m) { return s + m.kcal; }, 0);
      const personalTargetKcal = getPersonalAthleteTargetCals();
      const baseTargetKcal = mealSumKcal > 800 ? mealSumKcal : personalTargetKcal;
      const _dtProf = (window.REMK_SCIENCE_BRAIN && typeof window.REMK_SCIENCE_BRAIN.getDayTypeNutritionProfile === "function")
        ? window.REMK_SCIENCE_BRAIN.getDayTypeNutritionProfile(baseTargetKcal, st.activeNutriDay || 1)
        : { kcal: baseTargetKcal, label: "", carbHint: "", extraWaterL: 0, dayType: "even", color: "#94a3b8" };
      const targetKcal = _dtProf.kcal || baseTargetKcal;
      const _qa = (window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.getTodayQuickAdd === "function")
        ? window.REMK_INTELLIGENCE.getTodayQuickAdd()
        : { kcal: 0, prot: 0 };
      const eatenKcal = meals.filter(function (m) { return m.isEaten; }).reduce(function (s, m) { return s + m.kcal; }, 0) + (_qa.kcal || 0);
      const leftKcal = Math.max(0, targetKcal - eatenKcal);

      const targetProt = meals.reduce(function (s, m) { return s + m.prot; }, 0) || 160;
      const eatenProt = meals.filter(function (m) { return m.isEaten; }).reduce(function (s, m) { return s + m.prot; }, 0) + (_qa.prot || 0);
      const targetCarbs = meals.reduce(function (s, m) { return s + m.carbs; }, 0) || 250;
      const eatenCarbs = meals.filter(function (m) { return m.isEaten; }).reduce(function (s, m) { return s + m.carbs; }, 0);
      const targetFat = meals.reduce(function (s, m) { return s + m.fat; }, 0) || 70;
      const eatenFat = meals.filter(function (m) { return m.isEaten; }).reduce(function (s, m) { return s + m.fat; }, 0);

      const drankL = parseFloat(localStorage.getItem("remk_drank_liters_today") || "0") || 0;
      const waterTarget = (typeof window.getEffectiveWaterTargetLitersV270 === "function")
        ? (parseFloat(window.getEffectiveWaterTargetLitersV270()) || 3.0)
        : 3.0;
      const stepsToday = parseInt(localStorage.getItem("remk_daily_steps_count") || localStorage.getItem("remk_steps_today") || "0", 10) || 0;
      const burnedKcal = Math.round(stepsToday * 0.045);

      const ringPct = Math.min(100, Math.round((eatenKcal / Math.max(1, targetKcal)) * 100));
      const r = 56;
      const c = Math.round(2 * Math.PI * r);
      const offset = Math.round(c - (ringPct / 100) * c);
      const trackCol = isDarkModeActive() ? "#2a354b" : "#e2e8f0";

      const openProt = Math.max(0, targetProt - eatenProt);
      const coachTip = openProt > 45
        ? `Dir fehlen heute noch ${openProt} g Protein – perfekt für deine nächste Hauptmahlzeit oder Skyr/Quark.`
        : (drankL < waterTarget * 0.5
          ? `Trink-Impuls: Erst ${drankL.toFixed(1)} L getrunken – trinke jetzt ein großes Glas Wasser (+500 ml).`
          : `Starke Konstanz! Makros und Hydration laufen sauber im Zielkorridor.`);

      const hasGeminiKey = Boolean((localStorage.getItem("remk_gemini_vision_key") || "").trim());

      panel.innerHTML = `
        ${subTabsHtml}

        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px;">
          <button type="button" class="v34-day-arrow-btn" onclick="window.v34State.activeNutriDay=${Math.max(1, curDay - 1)};window.renderV345NutritionCleanPanel();">‹</button>
          <button type="button" class="v34-btn-dark-green" onclick="window.v34State.nutriSubTab='plan';window.renderV345NutritionCleanPanel();" style="flex:1;">
            📅 TAG ${curDay} VON ${totalDays} &bull; ${meals.filter(function(m){return m.isEaten;}).length}/${meals.length} GEGESSEN
          </button>
          <button type="button" class="v34-day-arrow-btn" onclick="window.v34State.activeNutriDay=${Math.min(totalDays, curDay + 1)};window.renderV345NutritionCleanPanel();">›</button>
        </div>

        <div class="v34-nutri-card" style="display:flex;justify-content:space-around;align-items:center;">
          <div style="text-align:center;">
            <div style="font-size:1.25rem;">🎯</div>
            <div style="font-weight:900;font-size:0.98rem;margin-top:2px;">${targetKcal}</div>
            <div style="font-size:0.7rem;color:var(--v34-muted);">Ziel kcal</div>
          </div>

          <div style="position:relative;width:132px;height:132px;display:flex;align-items:center;justify-content:center;">
            <svg width="132" height="132" style="transform:rotate(-90deg);">
              <circle cx="66" cy="66" r="${r}" fill="none" stroke="${trackCol}" stroke-width="10"/>
              <circle cx="66" cy="66" r="${r}" fill="none" stroke="#10b981" stroke-width="10"
                stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
            </svg>
            <div style="position:absolute;text-align:center;line-height:1.2;">
              <div style="font-size:0.7rem;font-weight:800;color:var(--v34-muted);">Gegessen</div>
              <div style="font-size:1.06rem;font-weight:900;">${eatenKcal}</div>
              <div style="font-size:0.7rem;font-weight:800;color:var(--v34-muted);margin-top:4px;">Verbleibend</div>
              <div style="font-size:0.98rem;font-weight:900;color:#10b981;">${leftKcal}</div>
            </div>
          </div>

          <div style="text-align:center;">
            <div style="font-size:1.25rem;">🔥</div>
            <div style="font-weight:900;font-size:0.98rem;margin-top:2px;">${burnedKcal}</div>
            <div style="font-size:0.7rem;color:var(--v34-muted);">Aktivität</div>
          </div>
        </div>

        <div class="v34-nutri-card">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;text-align:center;margin-bottom:14px;">
            <div>
              <div style="font-weight:800;font-size:0.84rem;margin-bottom:6px;">Protein</div>
              <div style="height:7px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:6px;">
                <div style="width:${Math.min(100, Math.round((eatenProt / Math.max(1, targetProt)) * 100))}%;height:100%;background:#10b981;"></div>
              </div>
              <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;">${eatenProt} / ${targetProt} g</div>
            </div>
            <div>
              <div style="font-weight:800;font-size:0.84rem;margin-bottom:6px;">Carbs</div>
              <div style="height:7px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:6px;">
                <div style="width:${Math.min(100, Math.round((eatenCarbs / Math.max(1, targetCarbs)) * 100))}%;height:100%;background:#eab308;"></div>
              </div>
              <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;">${eatenCarbs} / ${targetCarbs} g</div>
            </div>
            <div>
              <div style="font-weight:800;font-size:0.84rem;margin-bottom:6px;">Fett</div>
              <div style="height:7px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:6px;">
                <div style="width:${Math.min(100, Math.round((eatenFat / Math.max(1, targetFat)) * 100))}%;height:100%;background:#e11d48;"></div>
              </div>
              <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;">${eatenFat} / ${targetFat} g</div>
            </div>
          </div>
          <div style="text-align:center;">
            <button type="button" class="v34-btn-dark-green" onclick="window.v34State.nutriSubTab='plan';window.renderV345NutritionCleanPanel();">
              🍽️ Heutige Mahlzeiten &amp; Scores öffnen
            </button>
          </div>
        </div>

        <div class="v34-nutri-card" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;text-align:center;">
          <div>
            <div style="font-weight:800;font-size:0.86rem;margin-bottom:6px;">💧 Wasser</div>
            <div style="height:7px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:6px;">
              <div style="width:${Math.min(100, Math.round((drankL / Math.max(0.5, waterTarget)) * 100))}%;height:100%;background:#38bdf8;"></div>
            </div>
            <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;margin-bottom:8px;">${drankL.toFixed(2).replace(".", ",")} / ${waterTarget.toFixed(1).replace(".", ",")} L</div>
            <div style="display:flex;justify-content:center;gap:6px;">
              <button type="button" class="v34-water-btn v34-btn-soft" onclick="window.stepV345Water(-0.25)">−250</button>
              <button type="button" class="v34-water-btn v34-btn-blue" onclick="window.stepV345Water(0.25)">+250 ml</button>
            </div>
          </div>
          <div>
            <div style="font-weight:800;font-size:0.86rem;margin-bottom:6px;">🚶 Schritte</div>
            <div style="height:7px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:6px;">
              <div style="width:${Math.min(100, Math.round((stepsToday / 10000) * 100))}%;height:100%;background:#4ade80;"></div>
            </div>
            <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;margin-bottom:8px;">${stepsToday.toLocaleString('de-DE')} / 10.000</div>
            <button type="button" class="v34-water-btn v34-btn-soft" onclick="window.editV345Steps()">✏️ Anpassen</button>
          </div>
        </div>

        <!-- AUFGERÄUMTE ALLTAGS-SCHNELLAKTIONEN (OHNE ÜBERLADENE PROFI-TOOL-BOXEN) -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px;">
          <button type="button" class="v34-btn-soft" onclick="window.v34State.nutriSubTab='plan';window.renderV345NutritionCleanPanel();" style="padding:11px 6px;border-radius:14px;font-size:0.76rem;font-weight:800;">
            🔄 Teller tauschen
          </button>
          <button type="button" class="v34-btn-soft" onclick="window.openV350ProTool('fridge')" style="padding:11px 6px;border-radius:14px;font-size:0.76rem;font-weight:800;">
            🧊 Kühlschrank
          </button>
          <button type="button" class="v34-btn-soft" onclick="window.openV350ProTool('custom')" style="padding:11px 6px;border-radius:14px;font-size:0.76rem;font-weight:800;">
            🍽️ Eigener Teller
          </button>
        </div>

        ${(function () {
          if (!window.REMK_INTELLIGENCE || typeof window.REMK_INTELLIGENCE.getWeeklyConsistencyStrip !== "function") return "";
          const cons = window.REMK_INTELLIGENCE.getWeeklyConsistencyStrip();
          const dayDots = cons.days.map(function (d) {
            const bg = d.done ? '#10b981' : (d.isToday ? 'rgba(255,94,0,0.22)' : 'var(--v34-card)');
            const bd = d.done ? '#10b981' : (d.isToday ? '#ff5e00' : 'var(--v34-border)');
            const col = d.done ? '#ffffff' : (d.isToday ? '#ff5e00' : 'var(--v34-muted)');
            return `
              <div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1;">
                <div style="width:26px;height:26px;border-radius:99px;background:${bg};border:1.5px solid ${bd};color:${col};display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:900;">${d.done ? '✓' : (d.isFuture ? '·' : '')}</div>
                <span style="font-size:0.64rem;font-weight:800;color:${d.isToday ? '#ff5e00' : 'var(--v34-muted)'};">${d.label}</span>
              </div>
            `;
          }).join("");
          return `
            <div class="v34-nutri-card" style="padding:12px 14px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-weight:900;font-size:0.82rem;">⚡ Schnell-Kalorien (Snack / Kantine)</span>
                ${_qa.kcal > 0 ? `<button type="button" onclick="window.REMK_INTELLIGENCE.resetTodayQuickAdd()" style="border:none;background:transparent;color:#f87171;font-size:0.68rem;font-weight:800;cursor:pointer;">↺ +${_qa.kcal} kcal löschen</button>` : '<span style="font-size:0.68rem;color:var(--v34-muted);font-weight:700;">1-Tap Log</span>'}
              </div>
              <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                <button type="button" class="v34-btn-soft" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openBlsQuickFoodSearchModal();" style="grid-column:span 3;padding:8px;border-radius:11px;font-size:0.75rem;font-weight:900;border-color:rgba(16,185,129,0.45);color:#10b981;margin-bottom:2px;">🔎 Offline-Lebensmittelsuche (BLS DACH · z. B. Skyr, Banane, Brötchen)</button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addQuickNutrition(150, 15)" style="padding:7px 4px;border-radius:11px;font-size:0.7rem;font-weight:800;">+150 kcal<br><span style="font-size:0.62rem;color:#10b981;">+15g EW</span></button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addQuickNutrition(300, 25)" style="padding:7px 4px;border-radius:11px;font-size:0.7rem;font-weight:800;">+300 kcal<br><span style="font-size:0.62rem;color:#10b981;">+25g EW</span></button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addQuickNutrition(500, 35)" style="padding:7px 4px;border-radius:11px;font-size:0.7rem;font-weight:800;">+500 kcal<br><span style="font-size:0.62rem;color:#10b981;">+35g EW</span></button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addQuickNutrition(120, 30)" style="padding:7px 4px;border-radius:11px;font-size:0.7rem;font-weight:800;">🥤 Shake<br><span style="font-size:0.62rem;color:#10b981;">+30g EW</span></button>
              </div>
            </div>

            <div class="v34-nutri-card" style="padding:12px 14px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-weight:900;font-size:0.82rem;">🔥 Wochen-Konstanz (Mo–So)</span>
                <span style="font-size:0.74rem;font-weight:900;color:${cons.pct >= 90 ? '#10b981' : '#ff5e00'};">${cons.pct}% (${cons.hit}/${cons.passed} Tage)</span>
              </div>
              <div style="display:flex;justify-content:space-between;gap:4px;">${dayDots}</div>
              <div style="font-size:0.65rem;color:var(--v34-muted);margin-top:7px;text-align:center;">🔒 100% lokal &amp; DSGVO-sicher gespeichert</div>
            </div>
          `;
        })()}

        ${(function () {
          if (!window.REMK_INTELLIGENCE) return "";
          const tdee = window.REMK_INTELLIGENCE.computeAdaptiveTdeeStatus(targetKcal);
          return `
            <div class="v34-nutri-card" style="padding:13px 15px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;">
                <span style="font-weight:900;font-size:0.84rem;">🎯 Stoffwechsel-Kalibrator</span>
                <span style="font-size:0.72rem;font-weight:900;color:#10b981;">~${tdee.estRealTdee} kcal/T</span>
              </div>
              <div style="font-size:0.76rem;color:var(--v34-muted);line-height:1.4;margin-bottom:${tdee.deltaKcal ? '8px' : '0'};">${escHtml(tdee.badge)}</div>
              ${tdee.deltaKcal ? `
                <button type="button" onclick="if(typeof window.requireRemkPro==='function'&&!window.requireRemkPro('🎯 Adaptiver TDEE-Kalibrator'))return;window.REMK_INTELLIGENCE.applyQuickTdeeAdjust(${tdee.deltaKcal})" style="border:1px solid rgba(255,94,0,0.45);background:rgba(255,94,0,0.14);color:#ff5e00;border-radius:10px;padding:6px 11px;font-size:0.74rem;font-weight:900;cursor:pointer;">
                  ✨ ${tdee.deltaKcal > 0 ? '+' : ''}${tdee.deltaKcal} kcal jetzt übernehmen
                </button>
              ` : ''}
            </div>
          `;
        })()}

        ${(function () {
          if (!window.REMK_INTELLIGENCE || typeof window.REMK_INTELLIGENCE.computeProteinTimingAndRefeed !== "function") return "";
          const isProN = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
          if (!isProN) return "";
          const pt = window.REMK_INTELLIGENCE.computeProteinTimingAndRefeed(meals, targetKcal);
          return `
            <div class="v34-nutri-card" style="padding:12px 14px;margin-bottom:10px;">
              <div style="font-weight:900;font-size:0.82rem;margin-bottom:4px;">🥩 Protein-Timing (Leucin) &amp; Refeed</div>
              <div style="font-size:0.75rem;color:${pt.timingOk ? '#10b981' : '#f59e0b'};font-weight:700;line-height:1.4;">${escHtml(pt.timingText)}</div>
              ${pt.refeedText ? `<div style="font-size:0.73rem;color:var(--v34-muted);margin-top:4px;line-height:1.4;">${escHtml(pt.refeedText)}</div>` : ''}
            </div>
          `;
        })()}

        ${(function () {
          const dtCard = window.REMK_SCIENCE_BRAIN ? `
            <div class="v34-nutri-card" style="padding:11px 14px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:4px;">
                <span style="font-weight:900;font-size:0.81rem;color:${_dtProf.color};">${escHtml(_dtProf.label)} <span onclick="window.REMK_SCIENCE_BRAIN.openScienceExplainSheet('cycling')" style="cursor:pointer;opacity:0.8;">ⓘ</span></span>
                <div style="display:flex;gap:5px;">
                  <button type="button" onclick="window.REMK_SCIENCE_BRAIN.cycleDayTypeForDayNum(${st.activeNutriDay || 1})" style="border:1px solid var(--v34-border);background:var(--v34-card-soft);color:var(--v34-text);border-radius:8px;padding:3px 7px;font-size:0.68rem;font-weight:800;cursor:pointer;">Tagestyp ↻</button>
                  <button type="button" onclick="window.REMK_SCIENCE_BRAIN.toggleNutritionCycling()" style="border:1px solid ${window.REMK_SCIENCE_BRAIN.isNutritionCyclingEnabled() ? '#10b981' : 'var(--v34-border)'};background:${window.REMK_SCIENCE_BRAIN.isNutritionCyclingEnabled() ? 'rgba(16,185,129,0.16)' : 'var(--v34-card-soft)'};color:${window.REMK_SCIENCE_BRAIN.isNutritionCyclingEnabled() ? '#10b981' : 'var(--v34-muted)'};border-radius:8px;padding:3px 7px;font-size:0.68rem;font-weight:900;cursor:pointer;">${window.REMK_SCIENCE_BRAIN.isNutritionCyclingEnabled() ? 'AN' : 'AUS'}</button>
                </div>
              </div>
              <div style="font-size:0.72rem;color:var(--v34-muted);line-height:1.38;">${escHtml(_dtProf.carbHint)}</div>
            </div>
          ` : "";
          if (!window.REMK_INTELLIGENCE || typeof window.REMK_INTELLIGENCE.getCalorieBankStatus !== "function") return dtCard;
          const cb = window.REMK_INTELLIGENCE.getCalorieBankStatus();
          return dtCard + `
            <div class="v34-nutri-card" style="padding:12px 14px;margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
                <span style="font-weight:900;font-size:0.82rem;">🏦 Wochen-Kalorien-Bank</span>
                ${cb.surplusKcal !== 0 ? `<button type="button" onclick="window.REMK_INTELLIGENCE.resetCalorieBank()" style="border:none;background:transparent;color:#f87171;font-size:0.68rem;font-weight:800;cursor:pointer;">↺ Reset</button>` : '<span style="font-size:0.68rem;color:var(--v34-muted);font-weight:700;">Flexibel</span>'}
              </div>
              <div style="font-size:0.74rem;color:var(--v34-muted);line-height:1.4;margin-bottom:8px;">${escHtml(cb.hint)}</div>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addCalorieBankEntry(-250)" style="padding:6px 4px;border-radius:10px;font-size:0.7rem;font-weight:800;">🔋 −250 sparen</button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addCalorieBankEntry(350)" style="padding:6px 4px;border-radius:10px;font-size:0.7rem;font-weight:800;">🍕 +350 Extra</button>
                <button type="button" class="v34-btn-soft" onclick="window.REMK_INTELLIGENCE.addCalorieBankEntry(600)" style="padding:6px 4px;border-radius:10px;font-size:0.7rem;font-weight:800;">🔥 +600 Grillen</button>
              </div>
            </div>
          `;
        })()}

        <div class="v34-nutri-card" style="padding:13px 15px;">
          <div style="font-weight:900;font-size:0.84rem;margin-bottom:5px;">📢 Coach-Impuls</div>
          <div style="font-size:0.78rem;color:var(--v34-muted);line-height:1.45;">${escHtml(coachTip)}</div>
        </div>
      `;
      return;
    }

    // TAB 2: MEIN PLAN (INKL. KONTEXT-TOOLS: KÜHLSCHRANK-RETTER, PARTNER-SYNC, PDF, RESET)
    if (st.nutriSubTab === "plan") {
      const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
      if (st.activeNutriWeek > totalWeeks) st.activeNutriWeek = 1;
      const startDayOfWeek = (st.activeNutriWeek - 1) * 7 + 1;
      const dayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

      const weekPagerHtml = totalWeeks > 1 ? `
        <div style="display:flex;gap:6px;margin:8px 0 6px 0;">
          ${Array.from({ length: totalWeeks }, function (_, wi) {
            const wNum = wi + 1;
            const isW = wNum === st.activeNutriWeek;
            return `<button type="button" class="${isW ? 'v34-btn-sage' : 'v34-btn-soft'}" onclick="window.v34State.activeNutriWeek=${wNum};window.v34State.activeNutriDay=${(wNum - 1) * 7 + 1};window.renderV345NutritionCleanPanel();" style="flex:1;padding:7px !important;border-radius:10px !important;font-size:0.76rem !important;">Woche ${wNum}</button>`;
          }).join("")}
        </div>
      ` : "";

      const dayTilesHtml = dayLabels.map(function (lbl, i) {
        const dNum = startDayOfWeek + i;
        if (dNum > totalDays) return `<div class="v34-day-tile" style="opacity:0.3;pointer-events:none;"><span>${lbl}</span><span>–</span></div>`;
        const isAct = dNum === curDay;
        const anyEaten = [0, 1, 2, 3, 4].some(function (mIdx) {
          return localStorage.getItem(`remk_meal_eaten_d${dNum}_m${mIdx}`) === "1" || localStorage.getItem(`remk_v34_eaten_d${dNum}_m${mIdx}`) === "1";
        });
        return `
          <div class="v34-day-tile ${isAct ? 'active' : ''}" onclick="window.v34State.activeNutriDay=${dNum};window.renderV345NutritionCleanPanel();">
            <span>${lbl}</span>
            <span style="font-size:0.82rem;font-weight:900;color:${isAct ? '#ffffff' : (anyEaten ? '#10b981' : 'transparent')};">✓</span>
          </div>
        `;
      }).join("");

      const sh = getHouseholdShareInfo();
      let householdRadarHtml = "";
      if ((sh.partnerCals || 0) > 0 || (sh.kidsCals || 0) > 0) {
        const tot = Math.max(1, sh.totalCals || sh.athleteCals);
        const aPct = Math.round((sh.athleteCals / tot) * 100);
        const pPct = sh.partnerCals > 0 ? Math.round((sh.partnerCals / tot) * 100) : 0;
        const kPct = sh.kidsCals > 0 ? Math.max(0, 100 - aPct - pPct) : 0;
        householdRadarHtml = `
          <div class="v34-nutri-card" style="padding:11px 13px;font-size:0.77rem;line-height:1.45;">
            <div style="font-weight:900;color:#ff5e00;margin-bottom:3px;">👨‍👩‍👧 Familien-Schöpf-Schlüssel (1× Kochen im Topf)</div>
            <div>👤 <strong>Du:</strong> ${aPct}% (${sh.athleteCals} kcal)${pPct > 0 ? ` &bull; ❤️ <strong>Partner:</strong> ${pPct}% (${sh.partnerCals} kcal)` : ''}${kPct > 0 ? ` &bull; 🧒 <strong>Kinder:</strong> ${kPct}% (${sh.kidsCals} kcal)` : ''}</div>
          </div>
        `;
      }

      const mealCardsHtml = meals.map(function (m) {
        const tagsHtml = m.tags.map(function (t) { return `<span class="v34-meal-tag">${escHtml(t)}</span>`; }).join("");
        const prepTag = m.prepMult > 1
          ? `<span style="background:rgba(16,185,129,0.15);color:#059669;border-radius:6px;padding:1px 6px;font-size:0.66rem;font-weight:900;margin-left:5px;">🍱 ${m.prepMult}× Prep</span>`
          : (m.isCarryOver ? `<span style="background:rgba(56,189,248,0.15);color:#0284c7;border-radius:6px;padding:1px 6px;font-size:0.66rem;font-weight:900;margin-left:5px;">🥡 Vorgekocht</span>` : "");
        const macroLine = `${m.kcal} kcal | ${m.carbs} g Carbs | ${m.fat} g Fett | ${m.prot} g Prot.`;

        const swapRowBtns = `
          <div style="display:flex;align-items:center;gap:6px;margin-top:8px;" onclick="event.stopPropagation();">
            <button type="button" class="v352-plate-swap-btn" onclick="window.swapV352MealPlate(${m.idx})" title="Kompletten Teller gegen passendes Gericht tauschen">
              🔄 Teller tauschen
            </button>
            <button type="button" class="v352-plate-mini-btn" onclick="window.openV345PlateModal(${m.idx})" title="Zutaten, 1:1 Tausch &amp; Portion">
              ⚖️ Zutaten
            </button>
          </div>
        `;

        if (m.isEaten) {
          return `
            <div class="v34-meal-card" onclick="window.openV345PlateModal(${m.idx})">
              <div class="v34-meal-eaten-left" onclick="event.stopPropagation();window.toggleV345MealEaten(${m.dayNum},${m.idx});" title="Als offen markieren">✓</div>
              ${window.REMK_FOOD_VISUALS ? `<div style="display:flex;align-items:center;padding:10px 0 10px 10px;">${window.REMK_FOOD_VISUALS.renderFoodThumbHtml(m.title, (m.ings || []).join(' '), '', 56)}</div>` : ''}
              <div class="v34-meal-body">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                  <span style="font-size:0.68rem;font-weight:800;color:#5f9e8f;text-transform:uppercase;">${escHtml(m.slot)}${prepTag}</span>
                  <span onclick="event.stopPropagation();window.toggleV345MealFavorite(${m.idx});" style="font-size:1rem;cursor:pointer;">${m.isFav ? '❤️' : '🤍'}</span>
                </div>
                <div style="font-size:1rem;font-weight:800;margin-bottom:6px;line-height:1.3;">${escHtml(m.title)}</div>
                <div>${tagsHtml}</div>
                <div style="font-size:0.74rem;color:var(--v34-muted);font-weight:600;margin-top:3px;">${macroLine}</div>
                ${swapRowBtns}
              </div>
            </div>
          `;
        }

        return `
          <div class="v34-meal-card" onclick="window.openV345PlateModal(${m.idx})">
            ${window.REMK_FOOD_VISUALS ? `<div style="display:flex;align-items:center;padding:10px 0 10px 10px;">${window.REMK_FOOD_VISUALS.renderFoodThumbHtml(m.title, (m.ings || []).join(' '), '', 62)}</div>` : ''}
            <div class="v34-meal-body">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
                <span style="font-size:0.68rem;font-weight:800;color:#5f9e8f;text-transform:uppercase;">${escHtml(m.slot)}${prepTag}</span>
                <span onclick="event.stopPropagation();window.toggleV345MealFavorite(${m.idx});" style="font-size:1rem;cursor:pointer;">${m.isFav ? '❤️' : '🤍'}</span>
              </div>
              <div style="font-size:1rem;font-weight:800;margin-bottom:6px;line-height:1.3;">${escHtml(m.title)}</div>
              <div>${tagsHtml}</div>
              <div style="font-size:0.74rem;color:var(--v34-muted);font-weight:600;margin-top:3px;">${macroLine}</div>
              ${swapRowBtns}
            </div>
            <div class="v34-meal-score-col" onclick="event.stopPropagation();window.toggleV345MealEaten(${m.dayNum},${m.idx});" title="Antippen = Gegessen">
              <span style="font-size:0.63rem;font-weight:800;color:var(--v34-muted);margin-bottom:3px;">Mein Score</span>
              ${buildSvgScoreRing(m.sc.total, 52, m.sc.color)}
            </div>
          </div>
        `;
      }).join("");

      panel.innerHTML = `
        ${subTabsHtml}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;">
          <div>
            <h2 style="font-size:1.42rem;font-weight:900;margin:0;letter-spacing:-0.4px;">Mein Plan</h2>
            <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:600;">Tag ${curDay} &bull; Antippen für Zutaten, 1:1 Tausch &amp; Zahnrad</div>
          </div>
          <button type="button" class="v34-btn-soft" onclick="window.openV350ProTool('fridge')" style="padding:8px 11px;border-radius:12px;font-size:0.74rem;font-weight:800;white-space:nowrap;">🧊 Kühlschrank</button>
        </div>
        ${weekPagerHtml}
        <div class="v34-day-tiles-row">${dayTilesHtml}</div>
        ${householdRadarHtml}
        <div class="v363-desktop-cards-grid">${mealCardsHtml}</div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">
          <button type="button" class="v34-btn-soft" onclick="window.print()" style="padding:10px;border-radius:12px;font-size:0.78rem;font-weight:800;">📄 Plan als PDF</button>
          <button type="button" class="v34-btn-soft" onclick="window.resetV345NutritionWeek()" style="padding:10px;border-radius:12px;font-size:0.78rem;font-weight:800;">🔄 Neue Woche</button>
        </div>
      `;
      return;
    }

    // TAB 3: EIGENER SCREEN – 1-SEITEN-EINKAUFSLISTE IM CLEAN-UI-DESIGN
    if (st.nutriSubTab === "shopping") {
      if (typeof window.isRemkProUnlocked === "function" && !window.isRemkProUnlocked()) {
        panel.innerHTML = `
          ${subTabsHtml}
          <div class="v34-nutri-card" style="text-align:center;padding:24px 16px;">
            <div style="font-size:2rem;margin-bottom:6px;">🛒🔒</div>
            <h3 style="margin:0 0 6px 0;font-size:1rem;font-weight:900;">2-Phasen Supermarkt-Einkaufsliste (Pro)</h3>
            <p style="font-size:0.8rem;color:var(--v34-muted);line-height:1.45;margin-bottom:14px;">
              Die vollautomatische Einkaufsliste inklusive Familien-/Kinder-Skalierung und Abteilungs-Sortierung ist Teil von <strong>RE:MK Pro</strong>.
            </p>
            <button type="button" class="v34-primary-cta" onclick="window.openRemkProUpgradeSheet('🛒 2-Phasen Supermarkt-Einkaufsliste');">⚡ RE:MK Pro freischalten</button>
          </div>
        `;
        return;
      }
      const freshMode = (typeof window.getShoppingFreshnessMode === "function")
        ? window.getShoppingFreshnessMode()
        : (localStorage.getItem("remk_shopping_freshness_mode") || "split_2_trips");

      const shopModel = buildV350CompactShoppingModel();
      const customItems = (typeof window.getSavedCustomShoppingItemsV216 === "function")
        ? (window.getSavedCustomShoppingItemsV216() || [])
        : safeJsonParse(localStorage.getItem("remk_v351_custom_shop_items") || "[]", []);

      const customDone = customItems.filter(function (c) { return c && c.checked; }).length;
      const allTotal = shopModel.totalCount + customItems.length;
      const allDone = (shopModel.totalCount - shopModel.openCount) + customDone;
      const allOpen = Math.max(0, allTotal - allDone);
      const donePct = allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0;

      const customCardHtml = customItems.length > 0 ? `
        <div class="v351-shop-cat-card">
          <div class="v35-shop-cat-head" style="margin-top:0;">
            <span>✍️ Eigene Artikel</span>
            <span>${customItems.length - customDone}/${customItems.length}</span>
          </div>
          <div class="v35-shop-compact-grid">
            ${customItems.map(function (ci, cIdx) {
              if (st.hideCheckedShop && ci.checked) return "";
              return `
                <div class="v34-shop-row ${ci.checked ? 'checked' : ''}" onclick="window.toggleV351CustomShopItem(${cIdx})">
                  <span style="width:20px;height:20px;border-radius:6px;border:2px solid ${ci.checked ? '#10b981' : 'var(--v34-muted)'};background:${ci.checked ? '#10b981' : 'transparent'};color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:0.74rem;font-weight:900;flex-shrink:0;">${ci.checked ? '✓' : ''}</span>
                  <span style="flex:1;min-width:0;">${escHtml(ci.text || ci.name || '')}</span>
                  <button type="button" onclick="event.stopPropagation();window.deleteV351CustomShopItem(${cIdx});" style="border:none;background:transparent;color:var(--v34-muted);font-size:0.85rem;padding:2px 5px;cursor:pointer;" title="Entfernen">✕</button>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      ` : "";

      const sectionsHtml = shopModel.totalCount > 0
        ? shopModel.sections.map(function (sec) {
            const visibleItems = st.hideCheckedShop
              ? sec.items.filter(function (it) { return !it.checked; })
              : sec.items;
            if (visibleItems.length === 0) return "";
            const stageHead = sec.stageLabel
              ? `<div class="v35-shop-stage-banner">${escHtml(sec.stageLabel)}</div>`
              : "";
            const rowsHtml = visibleItems.map(function (it) {
              return `
                <div class="v34-shop-row ${it.checked ? 'checked' : ''}" onclick="window.toggleV345ShopItem(${it.domIdx})">
                  <span style="width:20px;height:20px;border-radius:6px;border:2px solid ${it.checked ? '#10b981' : 'var(--v34-muted)'};background:${it.checked ? '#10b981' : 'transparent'};color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:0.74rem;font-weight:900;flex-shrink:0;">${it.checked ? '✓' : ''}</span>
                  <span style="flex:1;min-width:0;">${it.amt ? `<strong>${escHtml(it.amt)}</strong> ` : ''}${escHtml(it.name)}${it.badge ? ` <span style="font-size:0.68rem;color:var(--v34-muted);font-weight:700;">${escHtml(it.badge)}</span>` : ''}</span>
                </div>
              `;
            }).join("");
            return `
              ${stageHead}
              <div class="v351-shop-cat-card">
                <div class="v35-shop-cat-head" style="margin-top:0;">
                  <span>${escHtml(sec.catTitle)}</span>
                  <span>${sec.openCount}/${sec.items.length} offen</span>
                </div>
                <div class="v35-shop-compact-grid">${rowsHtml}</div>
              </div>
            `;
          }).join("")
        : `<div class="v34-nutri-card" style="text-align:center;font-size:0.84rem;color:var(--v34-muted);">Erstelle einen 7-Tage-Ernährungsplan für die automatische Supermarkt-Einkaufsliste.</div>`;

      panel.innerHTML = `
        ${subTabsHtml}

        <div class="v34-nutri-card">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
            <div>
              <h2 style="font-size:1.3rem;font-weight:900;margin:0;letter-spacing:-0.3px;">🛒 Einkaufsliste</h2>
              <div style="font-size:0.76rem;color:var(--v34-muted);font-weight:700;">${allDone} von ${allTotal} im Wagen &bull; ${allOpen} offen</div>
            </div>
            <button type="button" class="v34-btn-soft" onclick="window.v34State.hideCheckedShop=!window.v34State.hideCheckedShop;window.renderV345NutritionCleanPanel();" style="padding:7px 10px;border-radius:10px;font-size:0.72rem;font-weight:800;white-space:nowrap;">
              ${st.hideCheckedShop ? '👁️ Alle zeigen' : '👁️ Offene'}
            </button>
          </div>

          <div style="height:8px;background:var(--v34-card-soft);border-radius:99px;overflow:hidden;margin-bottom:10px;">
            <div style="width:${donePct}%;height:100%;background:linear-gradient(90deg,#10b981,#34d399);transition:width 0.25s ease;"></div>
          </div>

          <div class="v35-shop-mode-row">
            <button type="button" class="v34-preset-chip ${freshMode === 'classic_all' ? 'active-chip' : ''}" onclick="window.setV350FreshnessMode('classic_all')">📦 1× Komplett</button>
            <button type="button" class="v34-preset-chip ${freshMode === 'split_2_trips' ? 'active-chip' : ''}" onclick="window.setV350FreshnessMode('split_2_trips')">🥦 2× Frische (Mo / Do)</button>
            <button type="button" class="v34-preset-chip ${freshMode === 'tk_smart_guard' ? 'active-chip' : ''}" onclick="window.setV350FreshnessMode('tk_smart_guard')">❄️ TK-Smart</button>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:4px;">
            <button type="button" class="v34-btn-soft" onclick="if(typeof window.copyShoppingListForNotes==='function')window.copyShoppingListForNotes(this);window.showV351Toast('📋 Kopiert');" style="padding:8px 6px;border-radius:10px;font-size:0.73rem;font-weight:800;">📋 Kopieren</button>
            <button type="button" class="v34-btn-emerald" onclick="if(typeof window.sendShoppingListWhatsApp==='function')window.sendShoppingListWhatsApp();" style="padding:8px 6px;border-radius:10px;font-size:0.73rem;font-weight:900;">💬 WhatsApp</button>
            <button type="button" class="v34-btn-soft" onclick="window.openV350ShareHub()" style="padding:8px 6px;border-radius:10px;font-size:0.73rem;font-weight:800;">📤 Export</button>
          </div>

          <div class="v351-shop-add-bar">
            <input type="text" id="v351-custom-shop-inp" placeholder="+ Eigenen Artikel hinzufügen (z. B. Kaffee, Zitronen)..." onkeydown="if(event.key==='Enter')window.addV351CustomShopItem();">
            <button type="button" class="v34-btn-sage" onclick="window.addV351CustomShopItem()" style="padding:8px 14px !important;border-radius:12px !important;font-size:0.84rem !important;">+</button>
          </div>
        </div>

        ${customCardHtml}
        ${sectionsHtml}
      `;
      return;
    }

    // TAB 4: EIGENER SCREEN – REZEPTE-DATENBANK IM CLEAN-UI-DESIGN (OHNE FOKUSVERLUST BEIM TIPPEN!)
    const allRecs = window.getV350AllRecipes();
    const flt = st.recipeFilter || "all";

    panel.innerHTML = `
      ${subTabsHtml}

      <div class="v351-sticky-search-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:8px;">
          <div>
            <h2 style="font-size:1.3rem;font-weight:900;margin:0;letter-spacing:-0.3px;">📖 Rezepte-Datenbank</h2>
            <div id="v351-rec-count-sub" style="font-size:0.74rem;color:var(--v34-muted);font-weight:700;">${allRecs.length} Gerichte verfügbar</div>
          </div>
          <button type="button" class="v34-btn-orange" onclick="window.openV350ProTool('custom')" style="padding:7px 12px;border-radius:11px;font-size:0.74rem;font-weight:900;white-space:nowrap;">+ Eigenes</button>
        </div>

        <input type="text" id="v351-recipe-search-inp" value="${escHtml(st.recipeQuery)}" placeholder="Suche z. B. Hähnchen, Skyr, Curry, Lachs..."
          oninput="window.v34State.recipeQuery=this.value;window.renderV351RecipeCardsOnly();"
          style="width:100%;padding:10px 12px;border-radius:12px;border:1px solid var(--v34-border);background:var(--v34-card-soft);color:var(--v34-text);font-size:0.86rem;margin-bottom:8px;box-sizing:border-box;">

        <div class="v34-presets-strip" style="padding-bottom:4px;">
          ${[
            ["all", "Alle (" + allRecs.length + ")"], ["fav", "⭐ Favoriten"], ["highprot", "💪 High-Protein"],
            ["nocook", "⚡ No-Cook"], ["ofen", "🔥 Ofen"], ["veggie", "🌱 Veggie"]
          ].map(function (pair) {
            const isAct = flt === pair[0];
            return `<button type="button" onclick="window.v34State.recipeFilter='${pair[0]}';window.renderV345NutritionCleanPanel();" class="v34-preset-chip ${isAct ? 'active-chip' : ''}">${pair[1]}</button>`;
          }).join("")}
          <button type="button" onclick="window.v34State.porkFreeOnly=!window.v34State.porkFreeOnly;localStorage.setItem('remk_v361_pork_free',window.v34State.porkFreeOnly?'true':'false');window.renderV345NutritionCleanPanel();" class="v34-preset-chip ${st.porkFreeOnly ? 'active-chip' : ''}">🚫🐷 Ohne Schwein</button>
          <button type="button" onclick="if(window.REMK_SCIENCE_BRAIN)window.REMK_SCIENCE_BRAIN.openBlockedIngredientsModal();" class="v34-preset-chip ${(window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.getBlockedIngredients().length) ? 'active-chip' : ''}">🚫 Zutaten${(window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.getBlockedIngredients().length) ? ' (' + window.REMK_SCIENCE_BRAIN.getBlockedIngredients().length + ')' : ''}</button>
        </div>
        <div class="v34-presets-strip" style="padding-bottom:2px;">
          ${[
            ["all", "🌍 Alle Küchen"], ["deutsch", "🇩🇪 Alltag"], ["indisch", "🇮🇳 Indisch"],
            ["tuerkisch", "🇹🇷 Türkisch"], ["mediterran", "🇮🇹 Mediterran"], ["asiatisch", "🍜 Asiatisch"], ["texmex", "🇲🇽 Tex-Mex"]
          ].map(function (pair) {
            const isAct = (st.cuisineFilter || "all") === pair[0];
            return `<button type="button" onclick="window.v34State.cuisineFilter='${pair[0]}';localStorage.setItem('remk_v361_cuisine_filter','${pair[0]}');window.renderV345NutritionCleanPanel();" class="v34-preset-chip ${isAct ? 'active-chip' : ''}">${pair[1]}</button>`;
          }).join("")}
        </div>
      </div>

      <div id="v351-recipe-list-host"></div>
    `;
    window.renderV351RecipeCardsOnly();
  };

  // v35.1 Teil-Renderer für Rezepte-Karten (hält Tastatur & Cursor beim Tippen 100% stabil!)
  window.renderV351RecipeCardsOnly = function () {
    const host = document.getElementById("v351-recipe-list-host");
    if (!host) return;
    const st = window.v34State;
    const allRecs = window.getV350AllRecipes();
    const q = (st.recipeQuery || "").toLowerCase().trim();
    const flt = st.recipeFilter || "all";
    const favsRaw = safeJsonParse(localStorage.getItem("remk_favorite_recipes") || "[]", []);
    const favSet = new Set(Array.isArray(favsRaw) ? favsRaw.map(function (f) { return typeof f === "string" ? f : (f && f.name ? f.name : ""); }) : []);

    const cFlt = st.cuisineFilter || "all";
    const porkFree = Boolean(st.porkFreeOnly);
    function detectRecipeCuisineV361(r) {
      if (r && r.cuisine) return String(r.cuisine).toLowerCase();
      const t = String((r && r.name) || "").toLowerCase();
      if (/tikka|masala|curry|dal|daal|tandoori|biryani|chana|palak|paneer|keema/.test(t)) return "indisch";
      if (/türk|menemen|shakshuka|köfte|döner|mercimek|lahmacun|dürüm|falafel|hummus|tavuk|karnıyarık|çılbır/.test(t)) return "tuerkisch";
      if (/griech|gyros|tzatziki|feta|bifteki|pasta|spaghetti|penne|gnocchi|bolognese|caprese|mediterran|paella|gambas|frittata|toskan/.test(t)) return "mediterran";
      if (/asia|teriyaki|wok|poke|ramen|bulgogi|thai|reisnudel|glasnudel|edamame|matcha|fried rice|süß-?sauer/.test(t)) return "asiatisch";
      if (/mexik|burrito|fajita|chili|quesadilla|taco|huevos|enchilada|guacamole|tex-?mex/.test(t)) return "texmex";
      return "deutsch";
    }
    function isRecipePorkFreeV361(r) {
      if (r && r.porkFree === true) return true;
      const blob = (String(r.name || "") + " " + (r.ingredients || []).map(function (i) { return i.name || ""; }).join(" ")).toLowerCase();
      return !/schwein|schinken|speck|bacon|kasseler|mett|bratwurst|currywurst|leberkäse|salami|lachsschinken|kochschinken/.test(blob);
    }
    const matchedRecs = allRecs.filter(function (r) {
      if (!r || !r.name) return false;
      if (q && !r.name.toLowerCase().includes(q)) return false;
      if (flt === "fav" && !favSet.has(r.name)) return false;
      if (flt === "highprot" && (r.prot || 0) < 40) return false;
      if (flt === "nocook" && r.prep !== "nocook") return false;
      if (flt === "ofen" && r.prep !== "ofen") return false;
      if (flt === "veggie" && r.type !== "veggie") return false;
      if (porkFree && !isRecipePorkFreeV361(r)) return false;
      if (window.REMK_SCIENCE_BRAIN && window.REMK_SCIENCE_BRAIN.isRecipeBlockedByIngredients(r)) return false;
      if (cFlt !== "all" && detectRecipeCuisineV361(r) !== cFlt) return false;
      return true;
    });

    const sub = document.getElementById("v351-rec-count-sub");
    if (sub) {
      sub.textContent = `${matchedRecs.length}${matchedRecs.length !== allRecs.length ? ' von ' + allRecs.length : ''} Gerichte`;
    }

    const _isProRec = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
    const recLimit = !_isProRec
      ? Math.min(matchedRecs.length, 18)
      : ((q || flt !== "all") ? matchedRecs.length : Math.min(matchedRecs.length, st.recipeLimit || 40));
    const filteredRecs = matchedRecs.slice(0, recLimit);

    if (filteredRecs.length === 0) {
      host.innerHTML = `<div class="v34-nutri-card" style="text-align:center;color:var(--v34-muted);font-size:0.84rem;">Keine Rezepte für diesen Filter gefunden.</div>`;
      return;
    }

    host.innerHTML = filteredRecs.map(function (r) {
      const kcal = Math.round(r.cals || 550);
      const prot = Math.round(r.prot || 35);
      const carbs = Math.round(r.carbs || Math.max(10, Math.round((kcal - prot * 4) * 0.55 / 4)));
      const fat = Math.round(r.fat || Math.max(5, Math.round((kcal - prot * 4) * 0.45 / 9)));
      const ingJoined = (r.ingredients || []).map(function (i) { return i.name || ""; }).join(" ");
      const tags = inferMealTags(r.name, ingJoined).map(function (t) { return `<span class="v34-meal-tag">${escHtml(t)}</span>`; }).join("");
      const sc = computeRealMealScores(kcal, prot, carbs, fat, ingJoined);
      const isFav = favSet.has(r.name);
      const safeRecName = escHtml(r.name).replace(/'/g, "");
      const cleanDispName = String(r.name || "").replace(/^BUISNESS(?:\s+Extreme)?:\s*/i, "").replace(/\s*\((?:[^)]*(?:vegan|vegetar|gluten|laktose|nuss|ohne ei|protein|low[- ]?carb|high[- ]?carb|no[- ]?cook)[^)]*)\)/gi, "").trim() || r.name;

      return `
        <div class="v34-meal-card" onclick="window.openV345DbRecipeModal('${safeRecName}')">
          ${window.REMK_FOOD_VISUALS ? `<div style="display:flex;align-items:center;padding:10px 0 10px 10px;">${window.REMK_FOOD_VISUALS.renderFoodThumbHtml(r.name, ingJoined, r.cuisine || '', 62, r.type || '')}</div>` : ''}
          <div class="v34-meal-body">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
              <span style="font-size:0.67rem;font-weight:800;color:#5f9e8f;text-transform:uppercase;">${escHtml(r.mealCategory || 'Gericht')}${r.prep === 'nocook' ? ' • ⚡ No-Cook' : (r.prep === 'ofen' ? ' • 🔥 Ofen' : '')}</span>
              <span onclick="event.stopPropagation();window.toggleV351DbRecipeFavorite('${safeRecName}');" style="font-size:1rem;cursor:pointer;">${isFav ? '❤️' : '🤍'}</span>
            </div>
            <div style="font-size:0.96rem;font-weight:800;margin-bottom:5px;line-height:1.28;">${escHtml(cleanDispName)}</div>
            <div>${tags}</div>
            <div style="font-size:0.73rem;color:var(--v34-muted);font-weight:600;margin-top:3px;">${kcal} kcal | ${carbs} g Carbs | ${fat} g Fett | ${prot} g Prot.</div>
          </div>
          <div class="v34-meal-score-col">
            <span style="font-size:0.61rem;font-weight:800;color:var(--v34-muted);margin-bottom:3px;">Score</span>
            ${buildSvgScoreRing(sc.total, 48, sc.color)}
          </div>
        </div>
      `;
    }).join("") + ((!_isProRec && allRecs.length > 18) ? `
      <div class="v34-nutri-card" style="text-align:center;border:1.5px dashed rgba(255,94,0,0.48);margin-top:10px;">
        <div style="font-weight:900;font-size:0.86rem;margin-bottom:4px;">🔒 ${allRecs.length - 18}+ weitere RE:MK Rezepte in Pro</div>
        <div style="font-size:0.75rem;color:var(--v34-muted);margin-bottom:10px;">Schalte alle 160+ Rezepte, den Wochenplan-Generator &amp; Familien-Skalierung frei.</div>
        <button type="button" onclick="window.openRemkProUpgradeSheet('📖 Alle 160+ RE:MK Rezepte freischalten');" style="border:none;background:#ff5e00;color:#fff;border-radius:11px;padding:8px 14px;font-size:0.76rem;font-weight:900;cursor:pointer;">⚡ RE:MK Pro ansehen</button>
      </div>
    ` : (filteredRecs.length < matchedRecs.length ? `
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button type="button" class="v34-btn-soft" onclick="window.v34State.recipeLimit=(window.v34State.recipeLimit||40)+60;window.renderV351RecipeCardsOnly();" style="flex:1;padding:11px;border-radius:14px;font-size:0.8rem;font-weight:800;">
          +60 weitere laden (${filteredRecs.length}/${matchedRecs.length})
        </button>
        <button type="button" class="v34-btn-dark-green" onclick="window.v34State.recipeLimit=${matchedRecs.length};window.renderV351RecipeCardsOnly();" style="padding:11px 14px !important;border-radius:14px !important;font-size:0.78rem !important;">
          Alle ${matchedRecs.length}
        </button>
      </div>
    ` : ""));
  };

  window.toggleV351DbRecipeFavorite = function (recName) {
    const list = safeJsonParse(localStorage.getItem("remk_favorite_recipes") || "[]", []);
    const arr = Array.isArray(list) ? list : [];
    const pos = arr.findIndex(function (x) { return (typeof x === "string" ? x : x?.name || "").replace(/'/g, "") === recName; });
    if (pos >= 0) {
      arr.splice(pos, 1);
      window.showV351Toast("🤍 Aus Favoriten entfernt");
    } else {
      const allRecs = window.getV350AllRecipes();
      const rec = allRecs.find(function (r) { return r && r.name && r.name.replace(/'/g, "") === recName; });
      arr.push(rec ? rec.name : recName);
      window.showV351Toast("❤️ Als Favorit gespeichert");
    }
    try { localStorage.setItem("remk_favorite_recipes", JSON.stringify(arr)); } catch (e) {}
    window.renderV351RecipeCardsOnly();
  };

  window.addV351CustomShopItem = function () {
    const inp = document.getElementById("v351-custom-shop-inp");
    const txt = (inp?.value || "").trim();
    if (!txt) return;
    if (typeof window.getSavedCustomShoppingItemsV216 === "function" && typeof window.saveCustomShoppingItemsV216 === "function") {
      const list = window.getSavedCustomShoppingItemsV216() || [];
      list.push({ id: "c_" + Date.now(), text: txt, checked: false });
      window.saveCustomShoppingItemsV216(list);
    } else {
      const list = safeJsonParse(localStorage.getItem("remk_v351_custom_shop_items") || "[]", []);
      list.push({ id: "c_" + Date.now(), text: txt, checked: false });
      try { localStorage.setItem("remk_v351_custom_shop_items", JSON.stringify(list)); } catch (e) {}
    }
    window.showV351Toast(`🛒 „${txt}“ hinzugefügt`);
    window.renderV345NutritionCleanPanel();
  };

  window.toggleV351CustomShopItem = function (idx) {
    if (typeof window.getSavedCustomShoppingItemsV216 === "function" && typeof window.saveCustomShoppingItemsV216 === "function") {
      const list = window.getSavedCustomShoppingItemsV216() || [];
      if (list[idx]) list[idx].checked = !list[idx].checked;
      window.saveCustomShoppingItemsV216(list);
    } else {
      const list = safeJsonParse(localStorage.getItem("remk_v351_custom_shop_items") || "[]", []);
      if (list[idx]) list[idx].checked = !list[idx].checked;
      try { localStorage.setItem("remk_v351_custom_shop_items", JSON.stringify(list)); } catch (e) {}
    }
    window.renderV345NutritionCleanPanel();
  };

  window.deleteV351CustomShopItem = function (idx) {
    if (typeof window.getSavedCustomShoppingItemsV216 === "function" && typeof window.saveCustomShoppingItemsV216 === "function") {
      const list = window.getSavedCustomShoppingItemsV216() || [];
      list.splice(idx, 1);
      window.saveCustomShoppingItemsV216(list);
    } else {
      const list = safeJsonParse(localStorage.getItem("remk_v351_custom_shop_items") || "[]", []);
      list.splice(idx, 1);
      try { localStorage.setItem("remk_v351_custom_shop_items", JSON.stringify(list)); } catch (e) {}
    }
    window.renderV345NutritionCleanPanel();
  };

  window.openV351GeminiKeyConfig = function () {
    const cur = localStorage.getItem("remk_gemini_vision_key") || "";
    if (window.REMK_INTELLIGENCE) {
      window.REMK_INTELLIGENCE.openPromptSheet({
        title: "🔑 Google Gemini Vision API-Key",
        subtitle: "Kostenlos unter aistudio.google.com · Leer lassen zum Entfernen.",
        placeholder: "AIza...",
        initialValue: cur,
        confirmLabel: "Key speichern",
        onSave: function (inp) {
          if (String(inp || "").trim()) localStorage.setItem("remk_gemini_vision_key", String(inp).trim());
          else localStorage.removeItem("remk_gemini_vision_key");
          const ok = Boolean((localStorage.getItem("remk_gemini_vision_key") || "").trim());
          window.showV351Toast(ok ? "✅ Gemini API-Key aktiv!" : "ℹ️ Lokaler KI-Key entfernt");
          window.renderV345NutritionCleanPanel();
        }
      });
    }
  };

  // v35.0/v35.1 Hilfsfunktion: Vollständige Rezepte-Datenbank sicher einsammeln
  window.getV350AllRecipes = function () {
    const seen = new Set();
    const out = [];
    function addPool(pool) {
      if (!Array.isArray(pool)) return;
      pool.forEach(function (r) {
        if (!r || !(r.name || r.title)) return;
        const nm = String(r.name || r.title).trim();
        const key = nm.toLowerCase();
        if (!nm || seen.has(key)) return;
        seen.add(key);
        out.push(r);
      });
    }
    if (typeof window.getSafeRecipeDB === "function") {
      try { addPool(window.getSafeRecipeDB()); } catch (e) {}
    }
    try { if (typeof recipeDB !== "undefined") addPool(recipeDB); } catch (e) {}
    addPool(window.recipeDB);
    addPool(window.BUILTIN_RECIPE_FALLBACK);
    addPool(window.rezepte_teil3);
    addPool(window.rezepte_teil4);
    return out;
  };

  // v35.0/v35.1 Hilfsfunktion: Saubere, kompakte 1-Seiten-Einkaufsliste ohne lange Frische-Textblöcke
  function extractCleanShopItemText(li) {
    const strong = li.querySelector("strong");
    const amt = strong ? strong.innerText.trim() : "";
    let full = "";
    const clone = li.cloneNode(true);
    clone.querySelectorAll(".box, .remk-store-brand-tag, small, .freshness-subtext").forEach(function (n) { n.remove(); });
    clone.querySelectorAll("div > span").forEach(function (sp) {
      const t = (sp.innerText || "").trim();
      if (t.length > 26 || /halte|tages|tage|frisch holen|welk|lagerbar|kühlschrank|schimmel/i.test(t)) {
        sp.remove();
      }
    });
    full = (clone.innerText || "").replace(/✓/g, "").replace(/\s+/g, " ").trim();
    if (amt && full.startsWith(amt)) {
      full = full.slice(amt.length).trim();
    }
    full = full.replace(/\s*(?:🍓|🥬|🥦|🍌|🥩|📦|❄️|🥔)\s*[^•\n]{18,}.*$/g, "").trim();
    full = full.replace(/\s*\(❄️[^)]{18,}\)/g, " (TK)").trim();
    let badge = "";
    const origTxt = (li.innerText || "");
    if (/Do–So|Etappe 2|Nachkauf/i.test(origTxt)) badge = "• Do–So";
    else if (/Mo–Mi/i.test(origTxt)) badge = "• Mo–Mi";
    else if (/TK-|\(TK\)/i.test(origTxt)) badge = "• ❄️ TK";
    return { amt: amt, name: full || origTxt.replace(/✓/g, "").trim().slice(0, 60), badge: badge };
  }

  function buildV350CompactShoppingModel() {
    const shopContainer = document.getElementById("remk-shopping-list-container");
    if (!shopContainer) return { sections: [], totalCount: 0, openCount: 0 };

    const allLis = Array.from(shopContainer.querySelectorAll(".shopping-items li"));
    const liIndexMap = new Map();
    allLis.forEach(function (li, i) { liIndexMap.set(li, i); });

    const cards = Array.from(shopContainer.querySelectorAll(".shopping-cat-card"));
    const sections = [];
    let totalCount = 0;
    let openCount = 0;

    if (cards.length > 0) {
      let stage2Marked = false;
      cards.forEach(function (card) {
        const lis = Array.from(card.querySelectorAll(".shopping-items li")).filter(function (li) {
          return li.style.display !== "none" && !li.classList.contains("pantry-hidden-item");
        });
        if (lis.length === 0) return;

        const h4 = card.querySelector(".shopping-category");
        let catTitle = h4
          ? (h4.getAttribute("data-orig-title") || h4.innerText || "").replace(/\(\d+\).*$/, "").replace(/[▸▾]/g, "").trim()
          : "";
        let stageLabel = "";
        const isStage2Card = (!h4 && (card.style.borderColor || "").includes("56")) || /Etappe 2|Donnerstag/i.test(card.previousElementSibling?.innerText || "");
        if (isStage2Card && !stage2Marked) {
          stage2Marked = true;
          stageLabel = "🥬 Etappe 2: Kurzer Frische-Nachkauf (Do–So)";
          if (!catTitle) catTitle = "Frische-Nachkauf (Do–So)";
        }

        const items = lis.map(function (li) {
          const parsed = extractCleanShopItemText(li);
          const isCh = li.classList.contains("checked");
          totalCount++;
          if (!isCh) openCount++;
          return {
            domIdx: liIndexMap.get(li),
            checked: isCh,
            amt: parsed.amt,
            name: parsed.name,
            badge: parsed.badge
          };
        });
        sections.push({
          stageLabel: stageLabel,
          catTitle: catTitle || "Einkauf",
          items: items,
          openCount: items.filter(function (x) { return !x.checked; }).length
        });
      });
    } else if (allLis.length > 0) {
      const items = allLis.map(function (li, i) {
        const parsed = extractCleanShopItemText(li);
        const isCh = li.classList.contains("checked");
        totalCount++;
        if (!isCh) openCount++;
        return { domIdx: i, checked: isCh, amt: parsed.amt, name: parsed.name, badge: parsed.badge };
      });
      sections.push({ stageLabel: "", catTitle: "Alle Artikel", items: items, openCount: openCount });
    }

    return { sections: sections, totalCount: totalCount, openCount: openCount };
  }

  window.setV350FreshnessMode = function (mode) {
    localStorage.setItem("remk_shopping_freshness_mode", mode);
    if (typeof window.setShoppingFreshnessMode === "function") {
      try { window.setShoppingFreshnessMode(mode); } catch (e) {}
    } else if (typeof window.rebuildShoppingListFromCurrentDom === "function") {
      try { window.rebuildShoppingListFromCurrentDom(); } catch (e) {}
    }
    setTimeout(window.renderV345NutritionCleanPanel, 40);
  };

  window.openV350ShareHub = function () {
    if (typeof window.openShareExportHubModal === "function") {
      window.openShareExportHubModal("shopping");
      const m = document.getElementById("remk-share-export-hub-modal");
      if (m) m.style.zIndex = "2000750";
    } else if (typeof window.sendShoppingListWhatsApp === "function") {
      window.sendShoppingListWhatsApp();
    }
  };

  window.openV350ProTool = function (toolKey) {
    if (toolKey === "bls") {
      if (typeof window.openHybridFoodSearchModalV238 === "function") {
        window.openHybridFoodSearchModalV238("");
        const m = document.getElementById("remk-v238-hybrid-food-modal");
        if (m) m.style.zIndex = "2000750";
      }
      return;
    }
    if (toolKey === "scanner") {
      // v35.1 FIX: Nutze IMMER die 3-Stufen-Pipeline (remk-v269-modal-plate-file -> analyzePlateImageFileV269),
      // die ZUERST deinen lokalen Gemini API-Key (remk_gemini_vision_key) mit gemini-2.5-flash prüft!
      if (typeof window.openLiveFoodCameraModalV272 === "function") {
        window.openLiveFoodCameraModalV272(function (capturedFile) {
          if (typeof window.openCustomRecipeModal === "function") window.openCustomRecipeModal();
          setTimeout(function () {
            const cm = document.getElementById("remk-custom-recipe-modal");
            if (cm) cm.style.zIndex = "2000750";
            const inp269 = document.getElementById("remk-v269-modal-plate-file");
            const inpFallback = document.getElementById("remk-v268-plate-file");
            const targetInp = inp269 || inpFallback;
            if (targetInp && capturedFile && typeof DataTransfer !== "undefined") {
              try {
                const dt = new DataTransfer();
                dt.items.add(capturedFile);
                targetInp.files = dt.files;
                targetInp.dispatchEvent(new Event("change", { bubbles: true }));
              } catch (e) {}
            } else if (capturedFile && typeof window.analyzePlateImageFileV269 === "function") {
              window.analyzePlateImageFileV269(capturedFile, "", function (res) {
                window.showV351Toast(`📸 Erkannt: ${res?.mealName || 'Teller'}`);
              });
            }
          }, 140);
        }, "remk-v269-modal-plate-file");
        const m = document.getElementById("remk-v272-live-camera-modal");
        if (m) m.style.zIndex = "2000750";
      } else if (typeof window.openCustomRecipeModal === "function") {
        window.openCustomRecipeModal();
        const cm = document.getElementById("remk-custom-recipe-modal");
        if (cm) cm.style.zIndex = "2000750";
      }
      return;
    }
    if (toolKey === "fastfood") {
      if (typeof window.openBurgerAndFastFoodModalV234 === "function") {
        window.openBurgerAndFastFoodModalV234();
        const m = document.getElementById("remk-custom-recipe-modal");
        if (m) m.style.zIndex = "2000750";
      }
      return;
    }
    if (toolKey === "fridge") {
      if (typeof window.openFridgeRescuerModal === "function") {
        window.openFridgeRescuerModal();
        const m = document.getElementById("remk-fridge-rescuer-modal");
        if (m) m.style.zIndex = "2000750";
      }
      return;
    }
    if (toolKey === "swap") {
      if (typeof window.openIngredientSwapModalV197 === "function") {
        const meals = window.__v345CurrentMeals || getV345DayMeals(window.v34State.activeNutriDay || 1);
        const firstMeal = meals.find(function (m) { return m && m.domLi && m.domLi.querySelector(".recipe-details-content ul li"); }) || meals[0];
        if (firstMeal && firstMeal.domLi) {
          window.openIngredientSwapModalV197(0, firstMeal.domLi);
          const m = document.getElementById("remk-v197-recipe-picker-modal");
          if (m) m.style.zIndex = "2000750";
        } else {
          window.showV351Toast("⚖️ Öffne ein Gericht im Plan für 1:1 Tausch");
        }
      }
      return;
    }
    if (toolKey === "partner") {
      if (typeof window.openPartnerTwoDeviceSyncModalV228 === "function") {
        window.openPartnerTwoDeviceSyncModalV228();
        const m = document.getElementById("remk-v228-partner-sync-modal");
        if (m) m.style.zIndex = "2000750";
      }
      return;
    }
    if (toolKey === "custom") {
      if (typeof window.openCustomRecipeModal === "function") {
        window.openCustomRecipeModal();
        const m = document.getElementById("remk-custom-recipe-modal");
        if (m) m.style.zIndex = "2000750";
      }
      return;
    }
  };

  window.toggleV345ShopItem = function (idx) {
    const shopContainer = document.getElementById("remk-shopping-list-container");
    const items = shopContainer ? Array.from(shopContainer.querySelectorAll(".shopping-items li")) : [];
    const target = items[idx];
    if (target) target.click();
    if (typeof window.saveShoppingCheckedStateV226 === "function") {
      try { window.saveShoppingCheckedStateV226(); } catch (e) {}
    }
    if (typeof window.pushCleanUiStateToWatchV359 === "function") window.pushCleanUiStateToWatchV359();
    window.renderV345NutritionCleanPanel();
  };

  window.uploadV361RecipePhoto = function () {
    const m = window.__v345ActiveModalMeal;
    if (!m || !window.REMK_FOOD_VISUALS) return;
    window.REMK_FOOD_VISUALS.triggerCustomPhotoPicker(m.title, function () {
      renderPlateModalContent(m, false);
      if (document.body.classList.contains("remk-v34-in-nutrition")) window.renderV345NutritionCleanPanel();
    });
  };

  window.removeV361RecipePhoto = function () {
    const m = window.__v345ActiveModalMeal;
    if (!m || !window.REMK_FOOD_VISUALS) return;
    window.REMK_FOOD_VISUALS.deleteCustomPhoto(m.title).then(function () {
      window.showV351Toast("🖼️ Standard-Foto wiederhergestellt");
      renderPlateModalContent(m, false);
      if (document.body.classList.contains("remk-v34-in-nutrition")) window.renderV345NutritionCleanPanel();
    });
  };

  window.openV345DbRecipeModal = function (recName) {
    const allRecs = window.getV350AllRecipes();
    const rec = allRecs.find(function (r) { return r && r.name && r.name.replace(/'/g, "") === recName; });
    if (!rec) return;
    const ings = (rec.ingredients || []).map(function (i) { return `${Math.round(i.amount || 100)} ${i.unit || 'g'} ${i.name}`; });
    const sc = computeRealMealScores(rec.cals || 550, rec.prot || 35, rec.carbs || 55, rec.fat || 15, ings.join(" "));
    window.__v345ActiveModalMeal = {
      idx: -1, dayNum: window.v34State.activeNutriDay || 1,
      title: rec.name, kcal: Math.round(rec.cals || 550), prot: Math.round(rec.prot || 35),
      carbs: Math.round(rec.carbs || 55), fat: Math.round(rec.fat || 15),
      potKcal: Math.round(rec.cals || 550), potProt: Math.round(rec.prot || 35),
      potCarbs: Math.round(rec.carbs || 55), potFat: Math.round(rec.fat || 15),
      athleteRatio: 1.0, prepMult: 1,
      ings: ings, steps: rec.steps || [], tags: inferMealTags(rec.name, ings.join(" ")),
      sc: sc, type: rec.type || '', cuisine: rec.cuisine || '', isEaten: false, isFav: false
    };
    renderPlateModalContent(window.__v345ActiveModalMeal, true);
  };

  window.openV345PlateModal = function (mealIdx) {
    const m = (window.__v345CurrentMeals || [])[mealIdx];
    if (!m) return;
    window.__v345ActiveModalMeal = m;
    renderPlateModalContent(m, true);
  };

  window.setV345PlatePortionMode = function (mode) {
    window.v34State.platePortionMode = mode;
    if (window.__v345ActiveModalMeal) {
      renderPlateModalContent(window.__v345ActiveModalMeal, false);
    }
  };

  function renderPlateModalContent(m, pushHist) {
    let modal = document.getElementById("remk-v34-recipe-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "remk-v34-recipe-modal";
      document.body.appendChild(modal);
    }
    bindSwipeBackOnModal(modal);
    if (pushHist) {
      try { window.history.pushState({ v34Modal: "recipe" }, ""); } catch (e) {}
    }

    const hasFamilyPot = (m.athleteRatio < 0.96 || (m.prepMult || 1) > 1);
    const showPot = hasFamilyPot && window.v34State.platePortionMode === "pot";
    const scaleForIngs = showPot ? 1.0 : ((m.athleteRatio || 1.0) / Math.max(1, m.prepMult || 1));

    const dispKcal = showPot ? m.potKcal : m.kcal;
    const dispCarbs = showPot ? m.potCarbs : m.carbs;
    const dispFat = showPot ? m.potFat : m.fat;
    const dispProt = showPot ? m.potProt : m.prot;

    const tagsHtml = (m.tags || []).map(function (t) { return `<span class="v34-meal-tag">${escHtml(t)}</span>`; }).join("");
    const ingsRowsHtml = (m.ings || []).map(function (line, ingIdx) {
      const scaledObj = scaleIngredientAmountLine(line, scaleForIngs);
      const hint = formatKitchenMeasureHint(scaledObj.amt, scaledObj.name);
      const safeLine = escHtml(line).replace(/'/g, "");
      const swapBtn = (m.idx >= 0 && m.domLi && typeof window.openIngredientSwapModalV197 === "function")
        ? `<button type="button" class="v34-btn-soft" onclick="window.closeV345OpenModals();window.openIngredientSwapModalV197(${ingIdx}, window.__v345ActiveModalMeal.domLi);" style="border-radius:8px;padding:5px 7px;font-size:0.74rem;" title="1:1 Makro-Tausch">⚖️</button>`
        : "";
      const gearBtn = (m.idx >= 0 && typeof window.openRecipeGramGearModalV234 === "function")
        ? `<button type="button" class="v34-btn-soft" onclick="window.closeV345OpenModals();window.openRecipeGramGearModalV234(${ingIdx}, '${safeLine}');" style="border-radius:8px;padding:5px 7px;font-size:0.74rem;margin-left:4px;" title="Gramm-Zahnrad">⚙️</button>`
        : "";
      const rowActions = `<div style="display:flex;align-items:center;">${swapBtn}${gearBtn}</div>`;
      return `
        <div style="display:grid;grid-template-columns:96px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--v34-border);font-size:0.89rem;">
          <div style="text-align:right;font-weight:800;color:var(--v34-muted);">${escHtml(scaledObj.amt)}</div>
          <div style="text-align:left;font-weight:600;">${escHtml(scaledObj.name)}<span style="font-size:0.75rem;color:#5f9e8f;font-weight:700;">${escHtml(hint)}</span></div>
          ${rowActions}
        </div>
      `;
    }).join("");

    const stepsHtml = (m.steps || []).map(function (st, i) {
      return `<div style="padding:7px 0;font-size:0.9rem;color:var(--v34-muted);line-height:1.55;text-align:left;"><strong style="color:var(--v34-text);">${i + 1}.</strong> ${escHtml(st)}</div>`;
    }).join("");

    const portionToggleHtml = hasFamilyPot ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;background:var(--v34-card-soft);border:1px solid var(--v34-border);padding:4px;border-radius:12px;margin:0 0 14px 0;">
        <button type="button" class="${!showPot ? 'v34-btn-sage' : 'v34-btn-soft'}" onclick="window.setV345PlatePortionMode('personal')" style="padding:8px 6px !important;border-radius:9px !important;font-size:0.76rem !important;border:none !important;">
          👤 Meine Portion (${Math.round((m.athleteRatio || 1) * 100)}%)
        </button>
        <button type="button" class="${showPot ? 'v34-btn-sage' : 'v34-btn-soft'}" onclick="window.setV345PlatePortionMode('pot')" style="padding:8px 6px !important;border-radius:9px !important;font-size:0.76rem !important;border:none !important;">
          👨‍🍳 Ganzer Topf (${m.potKcal} kcal)
        </button>
      </div>
    ` : "";

    modal.innerHTML = `
      <div class="v363-recipe-modal-shell">
      <div class="v34-recipe-hero" style="overflow:hidden;">
        ${window.REMK_FOOD_VISUALS
          ? window.REMK_FOOD_VISUALS.renderFoodHeroInnerHtml(m.title, (m.ings || []).join(' '), m.cuisine || '', m.type || '')
          : '<div class="v34-plate-bowl"><div class="v34-plate-food-inner">🍲</div></div>'}
        <button type="button" class="v34-modal-back-btn" style="z-index:4;" onclick="window.closeV345OpenModals();">‹ Zurück</button>
        ${m.idx >= 0 ? `<button type="button" class="v34-modal-fav-btn" style="z-index:4;" onclick="window.toggleV345MealFavorite(${m.idx});window.openV345PlateModal(${m.idx});">${m.isFav ? '❤️' : '🤍'}</button>` : ''}
        <div style="position:absolute;right:12px;bottom:10px;z-index:4;display:flex;gap:6px;">
          <button type="button" onclick="window.uploadV361RecipePhoto()" style="border:none;border-radius:999px;padding:7px 12px;background:rgba(15,23,42,0.82);color:#ffffff;font-size:0.74rem;font-weight:900;cursor:pointer;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.22);">📷 Eigenes Foto</button>
          ${(window.REMK_FOOD_VISUALS && window.REMK_FOOD_VISUALS.getCustomPhoto(m.title)) ? `<button type="button" onclick="window.removeV361RecipePhoto()" title="Eigenes Foto entfernen" style="border:none;border-radius:999px;padding:7px 10px;background:rgba(239,68,68,0.88);color:#ffffff;font-size:0.74rem;font-weight:900;cursor:pointer;">🗑️</button>` : ''}
        </div>
      </div>

      <div style="max-width:460px;margin:0 auto;padding:18px 18px calc(130px + env(safe-area-inset-bottom, 16px)) 18px;text-align:center;">
        <div style="font-size:0.72rem;color:var(--v34-muted);font-weight:700;margin-bottom:6px;">👉 Nach rechts wischen oder „‹ Zurück“ antippen</div>
        <h2 style="font-size:1.3rem;font-weight:900;margin:0 0 14px 0;line-height:1.3;">${escHtml(m.title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;">
          <div><div style="font-size:0.72rem;font-weight:800;margin-bottom:5px;">Gesamt</div>${buildSvgScoreRing(m.sc.total, 58, m.sc.color)}</div>
          <div><div style="font-size:0.72rem;font-weight:800;margin-bottom:5px;">Energie</div>${buildSvgScoreRing(m.sc.energy, 58, m.sc.color)}</div>
          <div><div style="font-size:0.72rem;font-weight:800;margin-bottom:5px;">Nährstoffe</div>${buildSvgScoreRing(m.sc.micro, 58, m.sc.color)}</div>
          <div><div style="font-size:0.72rem;font-weight:800;margin-bottom:5px;">Qualität</div>${buildSvgScoreRing(m.sc.food, 58, m.sc.color)}</div>
        </div>
        <div style="margin-bottom:10px;">${tagsHtml}</div>
        <div style="font-size:0.88rem;font-weight:700;margin-bottom:14px;">${dispKcal} kcal | ${dispCarbs} g Carbs | ${dispFat} g Fett | ${dispProt} g Prot.</div>
        ${portionToggleHtml}
        ${m.idx >= 0 ? `
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:14px;">
            <button type="button" class="v34-btn-soft" onclick="window.scaleV352MealPortion(${m.idx}, 0.8)" style="padding:6px 9px;border-radius:9px;font-size:0.72rem;font-weight:800;">−20%</button>
            <button type="button" class="v34-btn-soft" onclick="window.scaleV352MealPortion(${m.idx}, 0.9)" style="padding:6px 9px;border-radius:9px;font-size:0.72rem;font-weight:800;">−10%</button>
            <button type="button" class="v34-btn-soft" onclick="window.scaleV352MealPortion(${m.idx}, 1.1)" style="padding:6px 9px;border-radius:9px;font-size:0.72rem;font-weight:800;">+10%</button>
            <button type="button" class="v34-btn-soft" onclick="window.scaleV352MealPortion(${m.idx}, 1.2)" style="padding:6px 9px;border-radius:9px;font-size:0.72rem;font-weight:800;">+20%</button>
            <button type="button" class="v34-btn-soft" onclick="window.swapV352MealNoCook(${m.idx})" style="padding:6px 10px;border-radius:9px;font-size:0.72rem;font-weight:800;color:#ff5e00;">⚡ No-Cook</button>
          </div>
        ` : ''}
        <div style="height:2px;background:#5f9e8f;margin:0 8px 16px 8px;"></div>
        <h3 style="font-size:1.06rem;font-weight:900;margin:0 0 10px 0;">Zutaten &amp; Alltagsmaße</h3>
        <div style="margin-bottom:20px;">${ingsRowsHtml}</div>
        ${stepsHtml ? `<h3 style="font-size:1.06rem;font-weight:900;margin:0 0 10px 0;">Zubereitung</h3><div>${stepsHtml}</div>` : ''}
      </div>

      <div style="position:fixed;bottom:0;left:0;right:0;background:var(--v34-card);border-top:1px solid var(--v34-border);padding:12px 16px calc(12px + env(safe-area-inset-bottom, 0px)) 16px;display:grid;grid-template-columns:${m.idx >= 0 ? '1fr 1fr' : '1fr'};gap:10px;z-index:2000610;">
        ${m.idx >= 0 ? `
          <button type="button" class="v34-btn-sage" onclick="window.toggleV345MealEaten(${m.dayNum},${m.idx});window.closeV345OpenModals();" style="height:46px !important;">
            ✓ ${m.isEaten ? 'Als offen markieren' : 'Gegessen ✓'}
          </button>
          <button type="button" class="v34-btn-soft" onclick="const sb=window.__v345CurrentMeals[${m.idx}]?.domLi?.querySelector('button[onclick*=rerollRecipe]');if(sb)sb.click();window.closeV345OpenModals();setTimeout(window.renderV345NutritionCleanPanel,80);" style="height:46px;border-radius:14px;font-weight:800;font-size:0.9rem;">
            🔄 Gericht tauschen
          </button>
        ` : `
          <button type="button" class="v34-btn-sage" onclick="window.closeV345OpenModals();" style="height:46px !important;">
            Schließen
          </button>
        `}
      </div>
      </div>
    `;
    modal.style.display = "block";
    if (pushHist) modal.scrollTop = 0;
  }

  // =========================================================================
  // 6. ZENTRALER SCREEN-CONTROLLER & ECHTE HOOKS IN ALLE V23-V31 FUNKTIONEN!
  // =========================================================================
  function activateV345ScreenMode(screenKey) {
    const isWorkout = (screenKey === "workout" || screenKey === "training");
    const isNutri = (screenKey === "nutrition" || screenKey === "ernaehrung");
    document.body.classList.toggle("remk-v34-in-workout", isWorkout);
    document.body.classList.toggle("remk-v34-in-nutrition", isNutri);
    if (isWorkout) {
      window.renderV345FitnessCleanPanel();
    } else if (isNutri) {
      window.renderV345NutritionCleanPanel();
    }
  }

  window.syncV345ActiveScreenState = function () {
    syncV345ThemeState();
    const resBox = document.getElementById("result-box");
    const step1 = document.getElementById("step-1");
    const resVisible = resBox && resBox.style.display !== "none" && resBox.innerHTML.trim().length > 40;

    if (resVisible) {
      const activePage = localStorage.getItem("remk_active_single_page") || "";
      const hasTrain = resBox.querySelector("table.plan-table") !== null;
      const hasNutri = resBox.querySelector(".recipe-list") !== null || resBox.querySelector(".remk-nutrition-day-group") !== null;
      const isAthOrStretch = resBox.querySelector(".circuit-grid") !== null || resBox.innerHTML.includes("Stretching");

      if (isAthOrStretch && !hasTrain && !hasNutri) {
        document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
      } else if (activePage === "nutrition" || activePage === "ernaehrung" || (!hasTrain && hasNutri)) {
        activateV345ScreenMode("nutrition");
      } else if (activePage === "workout" || activePage === "training" || hasTrain) {
        activateV345ScreenMode("workout");
      }
    } else {
      document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
      if (step1 && step1.classList.contains("active")) {
        window.renderV345StartHub();
      }
    }
  };

  // HOOK #1: Start-Hub-Renderer
  const origRenderAppStartV230 = window.renderOneScreenAppStartV230;
  window.renderOneScreenAppStartV230 = function () {
    if (typeof origRenderAppStartV230 === "function") {
      try { origRenderAppStartV230.apply(this, arguments); } catch (e) {}
    }
    window.renderV345StartHub();
  };

  // HOOK #2: Planer <-> Cockpit
  const origSwitchHomeSlide = window.switchHomeSlide;
  if (typeof origSwitchHomeSlide === "function") {
    window.switchHomeSlide = function (slideKey) {
      const res = origSwitchHomeSlide.apply(this, arguments);
      document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
      if (slideKey === "planer") {
        setTimeout(window.renderV345StartHub, 20);
      }
      window.v345SmoothTop(true);
      return res;
    };
  }

  // HOOK #3: SinglePageScreen (workout <-> nutrition)
  const origSwitchSinglePage = window.switchSinglePageScreen;
  if (typeof origSwitchSinglePage === "function") {
    window.switchSinglePageScreen = function (pageKey) {
      const res = origSwitchSinglePage.apply(this, arguments);
      activateV345ScreenMode(pageKey);
      window.v345SmoothTop(true);
      return res;
    };
  }

  // HOOK #4: Bottom Dock (5 Tabs)
  const origHandleIosDock = window.handleIosDockNav;
  if (typeof origHandleIosDock === "function") {
    window.handleIosDockNav = function (target) {
      window.closeV345OpenModals();
      const res = origHandleIosDock.apply(this, arguments);
      setTimeout(function () {
        if (target === "workout") {
          const hasT = document.querySelector("#result-box table.plan-table") !== null;
          if (hasT) activateV345ScreenMode("workout");
          else document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
          window.v345SmoothTop(true);
        } else if (target === "nutrition") {
          const hasN = document.querySelector("#result-box .recipe-list, #result-box .remk-nutrition-day-group") !== null;
          if (hasN) activateV345ScreenMode("nutrition");
          else document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
          window.v345SmoothTop(true);
        } else if (target === "home" || target === "cockpit") {
          document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
          if (target === "home") window.renderV345StartHub();
          window.v345SmoothTop(true);
        }
      }, 60);
      return res;
    };
  }

  // HOOK #5: goToStep
  const origGoToStep = window.goToStep;
  if (typeof origGoToStep === "function") {
    window.goToStep = function (stepId) {
      window.closeV345OpenModals();
      document.body.classList.remove("remk-v34-in-workout", "remk-v34-in-nutrition");
      const res = origGoToStep.apply(this, arguments);
      if (stepId === "step-1") {
        setTimeout(window.renderV345StartHub, 30);
      }
      window.v345SmoothTop(true);
      return res;
    };
  }

  // v35.7 Hilfsfunktion: Entfernt eingefrorene Alt-Panels aus wiederhergestellten Snapshots
  function purgeStaleCleanPanelsV357() {
    try {
      document.querySelectorAll("#result-box #remk-v34-fitness-clean-panel, #result-box #remk-v34-nutri-clean-panel, #result-box .remk-motion-demo-bar").forEach(function (el) {
        el.remove();
      });
    } catch (e) {}
  }

  // HOOK #6: resumeLastSavedPlan & resumeCategoryPlan (immer mit frischem v35.7-Render!)
  const origResumeLast = window.resumeLastSavedPlan;
  if (typeof origResumeLast === "function") {
    window.resumeLastSavedPlan = function () {
      const res = origResumeLast.apply(this, arguments);
      purgeStaleCleanPanelsV357();
      setTimeout(function () {
        purgeStaleCleanPanelsV357();
        window.syncV345ActiveScreenState();
        window.v345SmoothTop(true);
      }, 60);
      return res;
    };
  }
  const origResumeCat = window.resumeCategoryPlan;
  if (typeof origResumeCat === "function") {
    window.resumeCategoryPlan = function (catKey) {
      const res = origResumeCat.apply(this, arguments);
      purgeStaleCleanPanelsV357();
      setTimeout(function () {
        purgeStaleCleanPanelsV357();
        if (catKey === "ernaehrung") activateV345ScreenMode("nutrition");
        else if (catKey === "training" || catKey === "beides") activateV345ScreenMode("workout");
        else window.syncV345ActiveScreenState();
        window.v345SmoothTop(true);
      }, 60);
      return res;
    };
  }

  // HOOK #11 (v36.0 Non-Destructive Snapshot-Reinigung — verhindert schwarzen Screen bei Resume/Lockscreen!)
  function scrubCleanPanelsFromStoredSnapshot(keyName) {
    try {
      const raw = localStorage.getItem(keyName);
      if (!raw || (raw.indexOf("remk-v34-fitness-clean-panel") === -1 && raw.indexOf("remk-v34-nutri-clean-panel") === -1)) return;
      const tmp = document.createElement("div");
      tmp.innerHTML = raw;
      tmp.querySelectorAll("#remk-v34-fitness-clean-panel, #remk-v34-nutri-clean-panel, .remk-motion-demo-bar").forEach(function (el) { el.remove(); });
      localStorage.setItem(keyName, tmp.innerHTML);
    } catch (e) {}
  }

  if (typeof window.saveCurrentPlanSnapshot === "function" && !window.__remkV360SnapHooked) {
    window.__remkV360SnapHooked = true;
    const origSaveSnapV360 = window.saveCurrentPlanSnapshot;
    window.saveCurrentPlanSnapshot = function () {
      const res = origSaveSnapV360.apply(this, arguments);
      setTimeout(function () {
        scrubCleanPanelsFromStoredSnapshot("remk_last_plan_html");
        scrubCleanPanelsFromStoredSnapshot("remk_last_plan_html_p2");
      }, 90);
      return res;
    };
  }

  // HOOK #12 (v36.0 Sofort-Fix gegen leere Seite nach Trainingsplan-Generierung):
  if (typeof window.generateMasterPlan === "function" && !window.__remkV360GenHooked) {
    window.__remkV360GenHooked = true;
    const origGenMasterV360 = window.generateMasterPlan;
    window.generateMasterPlan = function () {
      const isProGen = (typeof window.isRemkProUnlocked !== "function") || window.isRemkProUnlocked();
      if (!isProGen) {
        const curModeChk = String(window.currentMode || window.v34State.startTileMode || "training").toLowerCase();
        if (curModeChk === "ernaehrung" || curModeChk === "beides") {
          if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("🍲 Vollautomatischer Ernährungsplan-Generator");
          return;
        }
        if (localStorage.getItem("remk_free_starter_gen_used") === "true" && !window.__remkV361AllowCurrentStarterGen) {
          if (typeof window.openRemkProUpgradeSheet === "function") window.openRemkProUpgradeSheet("⚡ Unbegrenzter KI-Trainingsplan-Generator");
          return;
        }
        localStorage.setItem("remk_free_starter_gen_used", "true");
      }
      window.__remkV361AllowCurrentStarterGen = false;
      const res = origGenMasterV360.apply(this, arguments);
      try {
        const resBox = document.getElementById("result-box");
        if (resBox) {
          resBox.style.display = "block";
          const hasT = resBox.querySelector("table.plan-table") !== null;
          const hasN = resBox.querySelector(".recipe-list, .remk-nutrition-day-group") !== null;
          const curMode = String(window.currentMode || window.v34State.startTileMode || "training").toLowerCase();
          const target = (curMode === "ernaehrung" || (!hasT && hasN)) ? "nutrition" : "workout";
          localStorage.setItem("remk_active_single_page", target);
          if (target === "workout") {
            window.v34State.fitSubTab = "logger";
            window.v34State.activeDayIdx = 0;
            window.v34State.activeExIdx = 0;
            window.v34State.activeSetIdx = 0;
            window.currentProFocusExIdx = 0;
          }
          activateV345ScreenMode(target);
          setTimeout(function () {
            if (resBox) resBox.style.display = "block";
            activateV345ScreenMode(target);
            window.v345SmoothTop(true);
            if (typeof window.pushCleanUiStateToWatchV359 === "function") window.pushCleanUiStateToWatchV359(false);
          }, 85);
        }
      } catch (e) {}
      return res;
    };
  }

  // HOOK #7 (v35.7 Safe Re-Entry Guard): Hintergrund-Refreshes respektieren Notiz-Fokus
  let _v356LastWorkoutRenderTs = 0;
  const origRenderWorkout = window.renderProFocusWorkoutView;
  if (typeof origRenderWorkout === "function") {
    window.renderProFocusWorkoutView = function () {
      const activePage = localStorage.getItem("remk_active_single_page") || "";
      const now = Date.now();
      if (document.body.classList.contains("remk-v34-in-workout") && (activePage === "workout" || activePage === "training")) {
        if (now - _v356LastWorkoutRenderTs < 140) return;
        _v356LastWorkoutRenderTs = now;
        window.renderV345FitnessCleanPanel("background");
        return;
      }
      const res = origRenderWorkout.apply(this, arguments);
      if (activePage === "workout" || activePage === "training") {
        activateV345ScreenMode("workout");
      }
      return res;
    };
  }

  let _v356LastNutriRenderTs = 0;
  const origRenderNutri = window.renderProNutritionView;
  if (typeof origRenderNutri === "function") {
    window.renderProNutritionView = function () {
      const activePage = localStorage.getItem("remk_active_single_page") || "";
      const now = Date.now();
      if (document.body.classList.contains("remk-v34-in-nutrition") && (activePage === "nutrition" || activePage === "ernaehrung")) {
        if (now - _v356LastNutriRenderTs < 140) return;
        _v356LastNutriRenderTs = now;
        const res = origRenderNutri.apply(this, arguments);
        window.renderV345NutritionCleanPanel();
        return res;
      }
      const res = origRenderNutri.apply(this, arguments);
      if (activePage === "nutrition" || activePage === "ernaehrung") {
        activateV345ScreenMode("nutrition");
      }
      return res;
    };
  }

  // HOOK #8: Android Zurück-Taste / Modal-Schließer (Punkt 3!)
  const origCloseTopModal = window.closeTopmostOpenModalV226;
  window.closeTopmostOpenModalV226 = function () {
    if (window.closeV345OpenModals()) return true;
    if (typeof origCloseTopModal === "function") return origCloseTopModal.apply(this, arguments);
    return false;
  };
  window.closeAnyOpenRemkModal = window.closeTopmostOpenModalV226;

  const origNavBack = window.navigateBackOneLevelV231;
  window.navigateBackOneLevelV231 = function () {
    if (window.closeV345OpenModals()) return true;
    if (typeof origNavBack === "function") return origNavBack.apply(this, arguments);
    return false;
  };

  // HOOK #10: Partner-Wechsel (p1 <-> p2) hält Clean-UI Trainingslogs & Notizen live synchron
  ["switchActiveTrainingPartnerSlot", "switchTrainingPartnerSlot"].forEach(function (fnName) {
    const orig = window[fnName];
    if (typeof orig === "function") {
      window[fnName] = function () {
        const res = orig.apply(this, arguments);
        setTimeout(function () {
          if (typeof window.renderV352LockedTopBar === "function") window.renderV352LockedTopBar();
          if (document.body.classList.contains("remk-v34-in-workout")) {
            window.renderV345FitnessCleanPanel();
          } else if (document.body.classList.contains("remk-v34-in-nutrition")) {
            window.renderV345NutritionCleanPanel();
          } else {
            window.renderV345StartHub();
          }
        }, 35);
        return res;
      };
    }
  });

  // HOOK #9: Theme-Umschalter synchron halten
  ["toggleRemkThemeMode", "toggleLightDarkTheme", "applyRemkThemeMode"].forEach(function (fnName) {
    const orig = window[fnName];
    if (typeof orig === "function") {
      window[fnName] = function () {
        const res = orig.apply(this, arguments);
        setTimeout(syncV345ThemeState, 20);
        return res;
      };
    }
  });

  // FIX #6: Cockpit auf Clean-UI angleichen & Topbar bei jedem Screen-Wechsel stabil halten
  if (typeof window.renderUnifiedHomeCockpitAndBodyLab === "function" && !window.__remkV352CockpitHooked) {
    window.__remkV352CockpitHooked = true;
    const origCockpitV352 = window.renderUnifiedHomeCockpitAndBodyLab;
    window.renderUnifiedHomeCockpitAndBodyLab = function () {
      const res = origCockpitV352.apply(this, arguments);
      const pane = document.getElementById("remk-home-pane-cockpit");
      if (pane) pane.classList.add("remk-v352-clean-cockpit");
      if (typeof window.renderV352LockedTopBar === "function") window.renderV352LockedTopBar();
      return res;
    };
  }

  function bindSwAutoRefreshV357() {
    if (window.__remkSwAutoRefreshV357) return;
    window.__remkSwAutoRefreshV357 = true;
    try {
      if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
        navigator.serviceWorker.addEventListener("controllerchange", function () {
          try {
            if (!sessionStorage.getItem("remk_sw_reloaded_v363")) {
              sessionStorage.setItem("remk_sw_reloaded_v363", "1");
              window.location.reload();
            }
          } catch (e) {}
        });
      }
    } catch (e) {}
  }

  // =========================================================================
  // v36.0: REPARIERTER 2-WEGE WATCH LIVE-SYNC + KI-VOICE-CONTEXT + RESUME-SHIELD
  // =========================================================================
  let _v360WatchPushTimer = null;

  function buildV360LiveWatchPayload() {
    const days = getV345WorkoutDaysData();
    const activeW = parseInt(localStorage.getItem("remk_active_week") || "1", 10) || 1;
    const slot = getV351PartnerSlot();
    const targetCals = getPersonalAthleteTargetCals();
    const weightKg = parseFloat(document.getElementById(slot === "p2" ? "partner_weight" : "athlete_weight")?.value || "80") || 80;
    const targetProt = Math.round(weightKg * 2.0);
    const completedMap = {};
    let doneSetsToday = 0;

    const compactDays = days.slice(0, 6).map(function (d, dIdx) {
      return {
        t: String(d.title || `Tag ${dIdx + 1}`).slice(0, 28),
        e: (d.exercises || []).slice(0, 12).map(function (ex, eIdx) {
          const ds = (ex.sets || []).filter(function (s) { return s.done; }).length;
          if (dIdx === (window.v34State.activeDayIdx || 0)) doneSetsToday += ds;
          if (ex.exId) completedMap[ex.exId] = ds;
          completedMap[`d${dIdx}_e${eIdx}`] = ds;
          const firstS = ex.sets[0] || { kg: 40, reps: 10 };
          return {
            i: ex.exId || `ex_${dIdx}_${eIdx}`,
            n: String(ex.name || "Übung").replace(/\[[^\]]+\]/g, "").replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu, "").trim().slice(0, 30),
            s: Math.max(1, (ex.sets || []).length),
            r: parseInt(ex.targetReps || firstS.reps || 10, 10) || 10,
            w: ex.isBw ? 0 : (parseFloat(firstS.kg) || 0),
            p: String(firstS.prevTxt || `${ex.isBw ? 'BW' : firstS.kg + 'kg'} × ${firstS.reps}`).slice(0, 18),
            u: /einarm|einbeinig|bulgar|split|lunge|kickback/i.test(ex.name || "") ? 1 : 0,
            ds: ds
          };
        })
      };
    });

    const curMeals = getV345DayMeals(window.v34State.activeNutriDay || 1);
    const qa = (window.REMK_INTELLIGENCE && typeof window.REMK_INTELLIGENCE.getTodayQuickAdd === "function")
      ? window.REMK_INTELLIGENCE.getTodayQuickAdd()
      : { kcal: 0 };
    const eatenKcal = curMeals.filter(function (m) { return m.isEaten; }).reduce(function (s, m) { return s + m.kcal; }, 0) + (qa.kcal || 0);

    const compactMeals = curMeals.slice(0, 5).map(function (m, idx) {
      return {
        s: m.slot || `Mahlzeit ${idx + 1}`,
        n: String(m.title || "Gericht").slice(0, 28),
        k: Math.round(m.kcal || 500),
        dn: m.isEaten ? 1 : 0
      };
    });

    const shopModel = buildV350CompactShoppingModel();
    const compactShop = [];
    (shopModel.sections || []).forEach(function (sec) {
      (sec.items || []).forEach(function (it) {
        if (compactShop.length < 25) {
          compactShop.push({ n: String(it.name || "").slice(0, 32), dn: it.checked ? 1 : 0 });
        }
      });
    });

    const drankL = parseFloat(localStorage.getItem("remk_drank_liters_today") || "0") || 0;
    const processedEventIds = safeJsonParse(localStorage.getItem("remk_processed_watch_event_ids_v274") || "[]", []);
    const compactPlan = {
      k: targetCals,
      p: targetProt,
      w: activeW,
      slot: slot,
      d: compactDays,
      m: compactMeals,
      sh: compactShop
    };

    localStorage.setItem("remk_done_sets_today_v256", String(doneSetsToday));
    localStorage.setItem("remk_v248_eaten_kcal_today", String(Math.round(eatenKcal)));

    const sharedBundle = {
      activeWeek: activeW,
      targetCals: targetCals,
      targetProt: targetProt,
      activePartnerSlot: slot,
      days: compactDays.map(function (cd) {
        return {
          title: cd.t,
          exercises: cd.e.map(function (x) {
            return { id: x.i, name: x.n, sets: x.s, reps: x.r, kg: x.w, prev: x.p, unilateral: Boolean(x.u), doneSets: x.ds };
          })
        };
      }),
      meals: compactMeals.map(function (cm, idx) { return { idx: idx, slot: cm.s, name: cm.n, kcal: cm.k, done: cm.dn === 1 }; }),
      shopping: compactShop.map(function (cs) { return { name: cs.n, done: cs.dn === 1 }; }),
      updatedAt: Date.now()
    };
    localStorage.setItem("remk_watch_shared_bundle_v256", JSON.stringify(sharedBundle));

    const extraDetails = (typeof window.collectCrossDeviceDetailStateV290 === "function")
      ? window.collectCrossDeviceDetailStateV290()
      : { logValuesMap: {}, seatPinsMap: {}, eveningBufferKcal: 0, adaptiveTdee: 0 };

    return {
      source: "app_v36_0",
      ts: Date.now(),
      doneSetsToday: doneSetsToday,
      drankLiters: drankL,
      hydrationMl: Math.round(drankL * 1000),
      openKcal: Math.max(0, targetCals - Math.round(eatenKcal)),
      completedSetsMap: JSON.stringify(completedMap),
      ackEventIds: Array.isArray(processedEventIds) ? processedEventIds.slice(-80) : [],
      watchPlanCompactJson: JSON.stringify(compactPlan),
      logValuesMap: JSON.stringify(extraDetails.logValuesMap || {}),
      seatPinsMap: JSON.stringify(extraDetails.seatPinsMap || {}),
      eveningBufferKcal: extraDetails.eveningBufferKcal || 0,
      adaptiveTdee: extraDetails.adaptiveTdee || 0
    };
  }

  function updateWatchSyncStatusUiV360(msg) {
    const el = document.getElementById("remk-v360-watch-sync-status");
    if (el) el.textContent = msg;
  }

  window.pushCleanUiStateToWatchV359 = function (showFeedbackToast) {
    if (typeof window.isRemkProUnlocked === "function" && !window.isRemkProUnlocked()) return;
    clearTimeout(_v360WatchPushTimer);
    _v360WatchPushTimer = setTimeout(async function () {
      try {
        const syncData = buildV360LiveWatchPayload();
        if (window.RemkAndroidBridge && typeof window.RemkAndroidBridge.saveWatchSyncPayloadNative === "function") {
          try { window.RemkAndroidBridge.saveWatchSyncPayloadNative(JSON.stringify(syncData)); } catch (e) {}
        }
        const scriptUrl = (typeof GOOGLE_SCRIPT_API_URL !== "undefined") ? GOOGLE_SCRIPT_API_URL : "";
        if (!scriptUrl) return;
        const syncKey = (typeof window.getOrCreateRemkCloudSyncKeyV272 === "function")
          ? window.getOrCreateRemkCloudSyncKeyV272()
          : (localStorage.getItem("remk_license_key") || "1");
        const usr = (localStorage.getItem("remk_user_name") || "").trim();
        const devId = (typeof window.getOrCreateDeviceId === "function") ? window.getOrCreateDeviceId() : "APP";

        updateWatchSyncStatusUiV360("⌚ Synchronisiere...");
        const resp = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "syncPush",
            user: usr,
            key: syncKey,
            deviceId: devId,
            syncData: syncData
          })
        });
        const ok = resp && resp.ok;
        const hhmm = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        updateWatchSyncStatusUiV360(ok ? `⌚ Live-Sync ✅ ${hhmm} (Key: ${syncKey})` : "⌚ Offline – lokal zwischengespeichert");
        if (showFeedbackToast) {
          window.showV351Toast(ok ? `⌚ Watch-Sync erfolgreich (${hhmm})!` : "⚠️ Keine Verbindung – lokal gesichert");
        }
      } catch (e) {
        updateWatchSyncStatusUiV360("⌚ Offline – lokal zwischengespeichert");
      }
    }, showFeedbackToast ? 20 : 280);
  };

  function syncWatchSetsIntoCleanUiLogsV359() {
    try {
      const days = getV345WorkoutDaysData();
      const logs = loadV34Logs();
      let changed = false;
      days.forEach(function (d) {
        d.exercises.forEach(function (ex) {
          ex.sets.forEach(function (s) {
            if (!s.domInputId) return;
            const flag = localStorage.getItem("remk_set_done_" + s.domInputId);
            if (flag === "1" && (!logs[s.logKey] || !logs[s.logKey].done)) {
              logs[s.logKey] = { kg: s.kg, reps: s.reps, done: true, rir: s.rir, setType: s.setType || "N" };
              changed = true;
            } else if (flag === "0" && logs[s.logKey] && logs[s.logKey].done) {
              logs[s.logKey].done = false;
              changed = true;
            }
          });
        });
      });
      if (changed) saveV34Logs(logs);
      return changed;
    } catch (e) {
      return false;
    }
  }

  function installV359WatchLiveBridge() {
    if (window.__remkV359WatchBridgeInstalled) return;
    window.__remkV359WatchBridgeInstalled = true;

    window.pushLiveStateToGoogleSheetWatchBridgeV272 = function (immediate) {
      window.pushCleanUiStateToWatchV359(Boolean(immediate === "toast"));
    };

    const origGetWatchCtx = window.getCurrentWorkoutWatchContext;
    window.getCurrentWorkoutWatchContext = function () {
      try {
        if (document.body.classList.contains("remk-v34-in-workout")) {
          const st = window.v34State;
          const days = getV345WorkoutDaysData();
          const curDay = days[st.activeDayIdx];
          const curEx = curDay?.exercises[st.activeExIdx];
          if (curEx) {
            const curSet = curEx.sets[st.activeSetIdx] || curEx.sets[0] || { kg: 0, reps: 10 };
            return {
              exIdx: st.activeExIdx + 1,
              totalEx: curDay.exercises.length,
              exName: formatShortExerciseLabelV354(curEx.name),
              setNum: st.activeSetIdx + 1,
              totalSets: curEx.sets.length,
              kg: curEx.isBw ? "BW" : String(curSet.kg || ""),
              reps: String(curSet.reps || curEx.targetReps || 10),
              restSec: curEx.restSec || 90
            };
          }
        }
      } catch (e) {}
      return (typeof origGetWatchCtx === "function")
        ? origGetWatchCtx.apply(this, arguments)
        : { exIdx: 1, totalEx: 1, exName: "Training", setNum: 1, totalSets: 3, kg: "", reps: "10", restSec: 90 };
    };

    window.speakExerciseSpecificCoachV249 = function (exName, mech) {
      const cue = window.buildAccurateExerciseVoiceCueV360({ name: exName || "", mech: mech || "" });
      if (typeof window.speakRemkCoachV247 === "function") window.speakRemkCoachV247(cue);
      else if (typeof window.speakRemkCoachText === "function") window.speakRemkCoachText(cue);
    };

    const origWatchEvt = window.onStandaloneWatchSyncEventV256;
    if (typeof origWatchEvt === "function") {
      window.onStandaloneWatchSyncEventV256 = function (evt) {
        const res = origWatchEvt.apply(this, arguments);
        try {
          const act = evt && evt.action ? String(evt.action) : "";
          if (act === "WATCH_SET_COMPLETED" || act === "WATCH_SET_UNDO") {
            syncWatchSetsIntoCleanUiLogsV359();
            if (document.body.classList.contains("remk-v34-in-workout")) {
              window.renderV345FitnessCleanPanel("background");
            }
          } else if (act === "WATCH_MEAL_TOGGLED" || act === "WATCH_WATER_ADDED" || act === "WATCH_SHOP_TOGGLED") {
            if (act === "WATCH_MEAL_TOGGLED" && evt.payload) {
              const slotIdx = parseInt(evt.payload.slotIdx !== undefined ? evt.payload.slotIdx : evt.payload.idx, 10) || 0;
              const isDone = String(evt.payload.done) === "1" || evt.payload.done === true;
              const dNum = window.v34State.activeNutriDay || 1;
              localStorage.setItem(`remk_meal_eaten_d${dNum}_m${slotIdx}`, isDone ? "1" : "0");
              localStorage.setItem(`remk_v34_eaten_d${dNum}_m${slotIdx}`, isDone ? "1" : "0");
            }
            if (document.body.classList.contains("remk-v34-in-nutrition")) {
              window.renderV345NutritionCleanPanel();
            }
          }
        } catch (e) {}
        return res;
      };
    }

    const origApplyMap = window.applyCompletedSetsMapFromWatchV285;
    if (typeof origApplyMap === "function") {
      window.applyCompletedSetsMapFromWatchV285 = function () {
        const res = origApplyMap.apply(this, arguments);
        try {
          if (syncWatchSetsIntoCleanUiLogsV359() && document.body.classList.contains("remk-v34-in-workout")) {
            window.renderV345FitnessCleanPanel("background");
          }
        } catch (e) {}
        return res;
      };
    }

    // v36.1 Performance-Fix: Ersetzt die 4-fach gestapelten syncPull-Ketten durch EINEN einzigen schnellen HTTP-Pull!
    let _v361PullInFlight = false;
    window.pullWatchEventsFromGoogleSheetV272 = async function () {
      if (_v361PullInFlight) return;
      if (typeof window.isRemkProUnlocked === "function" && !window.isRemkProUnlocked()) return;
      _v361PullInFlight = true;
      try {
        const scriptUrl = (typeof GOOGLE_SCRIPT_API_URL !== "undefined") ? GOOGLE_SCRIPT_API_URL : "";
        if (!scriptUrl) return;
        const key = (typeof window.getOrCreateRemkCloudSyncKeyV272 === "function")
          ? window.getOrCreateRemkCloudSyncKeyV272()
          : (localStorage.getItem("remk_license_key") || "1");
        const usr = (localStorage.getItem("remk_user_name") || "").trim();
        const beforeWater = localStorage.getItem("remk_drank_liters_today") || "0";
        const resp = await fetch(`${scriptUrl}?action=syncPull&user=${encodeURIComponent(usr)}&key=${encodeURIComponent(key)}&t=${Date.now()}`);
        const json = await resp.json();
        if (!json || !json.valid || !json.syncData) return;

        const sData = json.syncData;
        const processed = safeJsonParse(localStorage.getItem("remk_processed_watch_event_ids_v274") || "[]", []);
        const procSet = new Set(Array.isArray(processed) ? processed : []);
        let anyEventApplied = false;

        if (Array.isArray(sData.eventsQueue) && typeof window.onStandaloneWatchSyncEventV256 === "function") {
          sData.eventsQueue.forEach(function (ev) {
            if (!ev || !ev.action) return;
            const evId = String(ev.id || `${ev.action}_${ev.ts || ""}`);
            if (procSet.has(evId)) return;
            procSet.add(evId);
            anyEventApplied = true;
            const parsedPayload = {};
            if (ev.details && typeof ev.details === "string") {
              ev.details.split("&").forEach(function (pair) {
                const eq = pair.indexOf("=");
                if (eq > 0) parsedPayload[decodeURIComponent(pair.slice(0, eq).trim())] = decodeURIComponent(pair.slice(eq + 1).trim());
              });
            } else if (ev.details && typeof ev.details === "object") {
              Object.assign(parsedPayload, ev.details);
            }
            window.onStandaloneWatchSyncEventV256({ action: ev.action, payload: parsedPayload, details: ev.details || "" });
          });
          localStorage.setItem("remk_processed_watch_event_ids_v274", JSON.stringify(Array.from(procSet).slice(-200)));
        }

        if (typeof sData.drankLiters === "number" && sData.drankLiters > 0) {
          const curL = parseFloat(localStorage.getItem("remk_drank_liters_today") || "0") || 0;
          if (sData.drankLiters > curL) localStorage.setItem("remk_drank_liters_today", String(sData.drankLiters));
        }

        if (sData.completedSetsMap && typeof window.applyCompletedSetsMapFromWatchV285 === "function") {
          window.applyCompletedSetsMapFromWatchV285(sData.completedSetsMap);
        }
        if (typeof window.applyCrossDeviceDetailStateV290 === "function") {
          window.applyCrossDeviceDetailStateV290(sData);
        }

        const afterWater = localStorage.getItem("remk_drank_liters_today") || "0";
        const setsChanged = syncWatchSetsIntoCleanUiLogsV359();
        if ((setsChanged || anyEventApplied) && document.body.classList.contains("remk-v34-in-workout")) {
          window.renderV345FitnessCleanPanel("background");
        }
        if ((afterWater !== beforeWater || anyEventApplied) && document.body.classList.contains("remk-v34-in-nutrition")) {
          window.renderV345NutritionCleanPanel();
        }
        if (anyEventApplied && typeof window.syncAll4NativeWidgetsV247 === "function") {
          window.syncAll4NativeWidgetsV247();
        }
      } catch (e) {
      } finally {
        _v361PullInFlight = false;
      }
    };

    function ensureVisibleOnResumeV360() {
      try {
        if (document.hidden) return;
        document.documentElement.classList.remove("remk-v359-booting");
        const resBox = document.getElementById("result-box");
        if (document.body.classList.contains("remk-v34-in-workout")) {
          if (resBox && resBox.style.display === "none") resBox.style.display = "block";
          const fp = document.getElementById("remk-v34-fitness-clean-panel");
          if (!fp || fp.innerHTML.trim().length < 40) {
            window.renderV345FitnessCleanPanel("background");
          }
        } else if (document.body.classList.contains("remk-v34-in-nutrition")) {
          if (resBox && resBox.style.display === "none") resBox.style.display = "block";
          const np = document.getElementById("remk-v34-nutri-clean-panel");
          if (!np || np.innerHTML.trim().length < 40) {
            window.renderV345NutritionCleanPanel();
          }
        }
      } catch (e) {}
    }
    document.addEventListener("visibilitychange", ensureVisibleOnResumeV360);
    window.addEventListener("pageshow", ensureVisibleOnResumeV360);
    window.addEventListener("focus", ensureVisibleOnResumeV360);
  }

  // v36.3 Windows/Desktop Komfort: ESC schließt offene Modals sofort
  if (!window.__remkV363EscBound) {
    window.__remkV363EscBound = true;
    document.addEventListener("keydown", function (ev) {
      if (ev.key !== "Escape") return;
      ["remk-v362-club-modal", "remk-v362-sheet", "remk-v354-sheet-modal", "remk-v354-history-modal"].forEach(function (mid) {
        const el = document.getElementById(mid);
        if (el && el.style.display && el.style.display !== "none") el.style.display = "none";
      });
      if (typeof window.closeV345OpenModals === "function") window.closeV345OpenModals();
    });
  }

  let _v359Booted = false;
  function releaseBootShieldV359() {
    try {
      requestAnimationFrame(function () {
        document.documentElement.classList.remove("remk-v359-booting");
      });
    } catch (e) {
      try { document.documentElement.classList.remove("remk-v359-booting"); } catch (e2) {}
    }
  }

  function bootV345CleanUI() {
    if (_v359Booted) return;
    _v359Booted = true;
    bindSwAutoRefreshV357();
    syncV345ThemeState();
    setupTopbarAutoHideAndScrollV345();
    installV359WatchLiveBridge();
    const pane = document.getElementById("remk-home-pane-cockpit");
    if (pane) pane.classList.add("remk-v352-clean-cockpit");
    purgeStaleCleanPanelsV357();
    window.syncV345ActiveScreenState();
    releaseBootShieldV359();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootV345CleanUI);
  } else {
    bootV345CleanUI();
  }
  // Sicherheits-Nachprüfung ohne unnötiges Flackern: nur rendern, falls beim Start noch kein Hub/Panel existiert
  setTimeout(function () {
    installV359WatchLiveBridge();
    const hasMounted = document.getElementById("remk-v34-start-hub")
      || document.getElementById("remk-v34-fitness-clean-panel")
      || document.getElementById("remk-v34-nutri-clean-panel");
    if (!hasMounted) {
      window.syncV345ActiveScreenState();
    }
    releaseBootShieldV359();
  }, 360);
})();
