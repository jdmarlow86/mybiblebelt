/* ========= Utilities ========= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const pad = (n) => String(n).padStart(2, "0");

/* ========= Theme ========= */
const sunSVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"></line></svg>`;
const moonSVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>`;

function setTheme(mode) {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("theme", mode); } catch { }
    const icon = root.classList.contains("dark") ? sunSVG : moonSVG;
    const t1 = $("#themeToggle"); const t2 = $("#themeToggleMobile");
    if (t1) t1.innerHTML = icon; if (t2) t2.innerHTML = icon;
}
function toggleTheme() { setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"); }
(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved); else setTheme("light");
    $("#themeToggle")?.addEventListener("click", toggleTheme);
    $("#themeToggleMobile")?.addEventListener("click", toggleTheme);
})();

/* ========= Tabs ========= */
(() => {
    const sections = $$(".tab-section");
    const TAB_IDS = new Set(sections.map(s => s.id));
    const DEFAULT = "welcome";

    function showTab(raw) {
        const id = TAB_IDS.has(raw) ? raw : DEFAULT;
        sections.forEach(s => s.classList.toggle("hidden", s.id !== id));
        $$(".nav-btn[data-tab]").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
        if ($("#mobileNav") && $("#mobileNav").value !== id) $("#mobileNav").value = id;
        if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
    }

    $(".nav")?.addEventListener("click", (e) => {
        const btn = e.target.closest(".nav-btn[data-tab]");
        if (!btn) return; showTab(btn.dataset.tab);
    });
    $("#mobileNav")?.addEventListener("change", (e) => showTab(e.target.value));
    document.addEventListener("click", (e) => {
        const j = e.target.closest?.("[data-jump]");
        if (!j) return; e.preventDefault(); showTab(j.getAttribute("data-jump"));
    });
    window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));

    showTab(location.hash.slice(1));
})();

/* ========= Footer Year ========= */
(() => { const y = $("#year"); if (y) y.textContent = String(new Date().getFullYear()); })();

/* ========= Resources (Starter Kits) ========= */
(() => {
    const SEED = [
        {
            id: "baptist", title: "Baptist — Starter Kit", intro: "Believer's baptism, congregational governance, Scripture-centric.",
            studies: [{ title: "History & Distinctives", content: "17th c. English Separatism; local autonomy." }]
        },
        {
            id: "methodist", title: "Methodist — Starter Kit", intro: "Grace (prevenient/justifying/sanctifying), connectionalism, holiness.",
            studies: [{ title: "Wesleyan Heritage", content: "John & Charles Wesley; band meetings." }]
        },
    ];
    let kits = (() => { try { return JSON.parse(localStorage.getItem("starterKits") || "null") || SEED; } catch { return SEED; } })();

    function render() {
        const grid = $("#kitsGrid"); if (!grid) return;
        grid.innerHTML = "";
        kits.forEach(k => {
            const card = document.createElement("div");
            card.className = "info-tile";
            card.innerHTML = `
        <div class="row spread">
          <div>
            <div class="section-title">${k.title}</div>
            <div class="muted">${k.intro}</div>
          </div>
          <button class="btn ghost" data-expand>Expand</button>
        </div>
        <div class="mt hidden" data-studies>
          ${(k.studies || []).map(s => `
            <div class="info-tile">
              <div class="info-title">${s.title}</div>
              <div class="info-body muted">${s.content}</div>
            </div>`).join("")}
        </div>`;
            const btn = $("[data-expand]", card);
            const studies = $("[data-studies]", card);
            btn.addEventListener("click", () => studies.classList.toggle("hidden"));
            grid.appendChild(card);
        });
    }
    render();

    $("#addKitBtn")?.addEventListener("click", () => {
        const title = $("#kitTitle")?.value.trim(); const intro = $("#kitIntro")?.value.trim();
        const study = $("#kitStudy")?.value.trim();
        if (!title) return;
        const newKit = { id: "user-" + Date.now(), title, intro: intro || "", studies: study ? [{ title: "Getting Started", content: study }] : [] };
        kits = [newKit, ...kits];
        try { localStorage.setItem("starterKits", JSON.stringify(kits)); } catch { }
        render();
        $("#kitTitle").value = ""; $("#kitIntro").value = ""; $("#kitStudy").value = "";
    });
    $("#clearKitFormBtn")?.addEventListener("click", () => {
        if ($("#kitTitle")) $("#kitTitle").value = "";
        if ($("#kitIntro")) $("#kitIntro").value = "";
        if ($("#kitStudy")) $("#kitStudy").value = "";
    });
})();

/* ========= Prayer (Rule + Timer + Requests) ========= */
(() => {
    if (!$("#prayer-section")) return;

    // Panel toggling
    const ruleBuilder = $("#ruleBuilder");
    const prayPanel = $("#prayPanel");
    const showPanel = (panel) => {
        if (ruleBuilder) ruleBuilder.classList.toggle("hidden", panel !== ruleBuilder);
        if (prayPanel) prayPanel.classList.toggle("hidden", panel !== prayPanel);
    };

    $("#btnCreateRule")?.addEventListener("click", () => showPanel(ruleBuilder));
    $("#btnPrayNow")?.addEventListener("click", () => {
        showPanel(prayPanel);
        const m = Number($("#prayMinutes")?.value || 10); updateTimerDisplay(m * 60);
    });

    // Rule builder
    const ruleForm = $("#ruleForm"), ruleText = $("#ruleText"), ruleOutput = $("#ruleOutput");
    $("#btnGenerateRule")?.addEventListener("click", () => {
        if (!ruleForm || !ruleText || !ruleOutput) return;
        const times = [...ruleForm.querySelectorAll('input[name="times"]:checked')].map(x => x.value);
        const focus = [...ruleForm.querySelectorAll('input[name="focus"]:checked')].map(x => x.value);
        const minutes = Math.max(1, Math.min(120, Number($("#duration")?.value) || 10));
        const scripture = ($("#scripture")?.value || "").trim();
        const notes = ($("#notes")?.value || "").trim();

        const per = Math.max(1, Math.floor((minutes * 60) / Math.max(1, focus.length)));
        const fmt = s => `${Math.floor(s / 60)}:${pad(s % 60)}`;

        let guide = `BEGINNER PRAYER RULE
====================

Times of day: ${times.length ? times.join(", ") : "Any time"}
Minutes per session: ${minutes}

Suggested structure (${minutes} min total):
${focus.map(f => `• ${f} — ~${fmt(per)}`).join("\n")}
${scripture ? `\nScripture reflection: ${scripture}\n` : ""}
${notes ? `\nPersonal notes:\n${notes}\n` : ""}
Tips:
- Choose a quiet place and silence notifications.
- Start and end with gratitude; keep requests simple and honest.
- Keep a short list of people/needs and update weekly.
`;
        ruleText.textContent = guide;
        ruleOutput.classList.remove("hidden");
        try { localStorage.setItem("mbb_last_prayer_rule", guide); } catch { }
    });
    $("#btnClearRule")?.addEventListener("click", () => { ruleForm?.reset(); ruleOutput?.classList.add("hidden"); });
    $("#btnCopyRule")?.addEventListener("click", async () => {
        if (!ruleText) return;
        try { await navigator.clipboard.writeText(ruleText.textContent || ""); } catch { }
    });
    $("#btnDownloadRule")?.addEventListener("click", () => {
        if (!ruleText) return;
        const blob = new Blob([ruleText.textContent || ""], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "prayer-guide.txt";
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 0);
    });
    try {
        const last = localStorage.getItem("mbb_last_prayer_rule");
        if (last && ruleText && ruleOutput) { ruleText.textContent = last; ruleOutput.classList.remove("hidden"); }
    } catch { }

    // Timer
    let timer = null, totalSeconds = 0, remaining = 0, paused = false;
    const timerDisplay = $("#timerDisplay");
    const timerBar = $("#timerBar");
    const timerHints = $("#timerHints");
    function updateTimerDisplay(sec) {
        if (!timerDisplay || !timerBar) return;
        const m = Math.floor(sec / 60), s = pad(Math.max(0, Math.floor(sec % 60)));
        timerDisplay.textContent = `${m}:${s}`;
        const elapsed = Math.max(0, totalSeconds - sec);
        const pct = totalSeconds ? (elapsed / totalSeconds) * 100 : 0;
        timerBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    $("#btnStartTimer")?.addEventListener("click", () => {
        totalSeconds = Math.max(60, Math.min(60 * 180, Number($("#prayMinutes")?.value) * 60 || 600));
        remaining = totalSeconds; paused = false;
        $("#btnPauseTimer")?.removeAttribute("disabled");
        $("#btnResetTimer")?.removeAttribute("disabled");

        const seg = Math.round(totalSeconds / 4 / 60);
        if (timerHints) timerHints.textContent = `Suggested flow: ${seg}m Praise • ${seg}m Confession • ${seg * 2}m Intercession • ${seg}m Listening`;

        clearInterval(timer);
        updateTimerDisplay(remaining);
        timer = setInterval(() => {
            if (paused) return;
            remaining--; updateTimerDisplay(remaining);
            if (remaining <= 0) {
                clearInterval(timer); timer = null;
                if (timerBar) timerBar.style.width = "100%";
                alert("Prayer time complete. Grace and peace!");
            }
        }, 1000);
    });
    $("#btnPauseTimer")?.addEventListener("click", (e) => {
        if (!timer) return;
        paused = !paused;
        e.currentTarget.textContent = paused ? "Resume" : "Pause";
    });
    $("#btnResetTimer")?.addEventListener("click", () => {
        clearInterval(timer); timer = null; paused = false;
        const m = Math.max(1, Math.min(180, Number($("#prayMinutes")?.value) || 10));
        totalSeconds = m * 60; remaining = totalSeconds; updateTimerDisplay(remaining);
        $("#btnPauseTimer")?.setAttribute("disabled", "true");
        $("#btnResetTimer")?.setAttribute("disabled", "true");
        const btnPause = $("#btnPauseTimer"); if (btnPause) btnPause.textContent = "Pause";
    });

    // Requests dialog
    const prayerDialog = $("#prayerDialog");
    $("#btnPrayerRequest")?.addEventListener("click", () => {
        if (prayerDialog?.showModal) prayerDialog.showModal();
        else alert("Your browser does not support modals.");
    });
    $("#btnSubmitRequest")?.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = $("#reqMessage")?.value.trim();
        if (!msg) { alert("Please enter a prayer request."); return; }
        try {
            const get = () => JSON.parse(localStorage.getItem("mbb_prayer_requests") || "[]");
            const set = (l) => localStorage.setItem("mbb_prayer_requests", JSON.stringify(l));
            const entry = {
                id: "req_" + Date.now(),
                type: (document.querySelector('input[name="reqType"]:checked') || {}).value || "For myself",
                name: $("#reqName")?.value.trim() || "",
                email: $("#reqEmail")?.value.trim() || "",
                privacy: (document.querySelector('input[name="privacy"]:checked') || {}).value || "Private",
                message: msg,
                createdAt: new Date().toISOString()
            };
            const list = get(); list.unshift(entry); set(list);
        } catch { }
        $("#prayerForm")?.reset();
        prayerDialog?.close();
        alert("Prayer request saved locally.");
    });
    prayerDialog?.addEventListener("click", (e) => {
        const card = prayerDialog.querySelector(".pg-dialog-card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) prayerDialog.close();
    });
})();

/* ========= Support Modal ========= */
(() => {
    const TAGS = { paypal: 'jdmarlow86', cashapp: '$jdmarlow', venmo: 'Jonathan-Marlow-19' };
    const dialog = $("#supportDialog");
    $("#btnSupport")?.addEventListener("click", () => dialog?.showModal?.());

    const getAmount = () => {
        const v = parseInt($("#supAmount")?.value || "", 10);
        return Number.isFinite(v) && v > 0 ? v : null;
    };
    const getNote = () => ($("#supNote")?.value || "").trim();

    function openNew(url) { window.open(url, "_blank", "noopener,noreferrer"); }
    async function copy(text, el) {
        try { await navigator.clipboard.writeText(text); el.textContent = "Copied!"; setTimeout(() => el.textContent = "Copy", 1200); }
        catch { alert("Copy failed—please copy manually: " + text); }
    }

    $("#ppWeb")?.addEventListener("click", () => {
        const amt = getAmount();
        const base = `https://www.paypal.com/paypalme/${encodeURIComponent(TAGS.paypal)}`;
        openNew(amt ? `${base}/${amt}` : base);
    });
    $("#ppCopy")?.addEventListener("click", (e) => copy(TAGS.paypal, e.currentTarget));

    $("#caWeb")?.addEventListener("click", () => {
        const amt = getAmount();
        const clean = TAGS.cashapp.startsWith('$') ? TAGS.cashapp.slice(1) : TAGS.cashapp;
        const base = `https://cash.app/$${encodeURIComponent(clean)}`;
        openNew(amt ? `${base}/${amt}` : base);
    });
    $("#caCopy")?.addEventListener("click", (e) => copy(TAGS.cashapp, e.currentTarget));

    $("#vmApp")?.addEventListener("click", () => {
        const amt = getAmount(); const note = getNote();
        const qp = new URLSearchParams();
        qp.set("recipients", TAGS.venmo);
        if (amt) qp.set("amount", amt);
        if (note) qp.set("note", note);
        location.href = `venmo://paycharge?${qp.toString()}`;
    });
    $("#vmWeb")?.addEventListener("click", () => openNew(`https://venmo.com/u/${encodeURIComponent(TAGS.venmo)}`));
    $("#vmCopy")?.addEventListener("click", (e) => copy(TAGS.venmo, e.currentTarget));
})();

/* ========= Misc demo ========= */
$("#findChurchBtn")?.addEventListener("click", () => alert("Coming soon: church finder!"));
