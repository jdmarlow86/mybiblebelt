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
            id: "baptist",
            title: "Baptist — Starter Kit",
            intro: "Emphasizes believer’s baptism, local church autonomy, and the authority of Scripture.",
            badgeColor: "#2563eb",    // blue
            badgeEmoji: "??",
            studies: [{ title: "Distinctives", content: "Born from 17th-century English Separatism; focus on personal conversion and congregational rule." }]
        },
        {
            id: "methodist",
            title: "Methodist — Starter Kit",
            intro: "Centers on grace, holiness, and accountable discipleship inspired by John Wesley.",
            badgeColor: "#dc2626",    // red
            badgeEmoji: "??",
            studies: [{ title: "Grace & Growth", content: "Prevenient, justifying, and sanctifying grace; small group ‘bands’ for mutual support." }]
        },
        {
            id: "catholic",
            title: "Catholic — Starter Kit",
            intro: "Historic Christian church tracing back to the apostles, emphasizing sacrament and tradition.",
            badgeColor: "#d97706",    // gold/amber
            badgeEmoji: "?",
            studies: [{ title: "Faith & Sacraments", content: "Seven sacraments; unity through the Eucharist; Catechism as guide to faith and morals." }]
        },
        {
            id: "orthodox",
            title: "Eastern Orthodox — Starter Kit",
            intro: "Ancient communion emphasizing liturgy, icons, and the mystery of divine transformation.",
            badgeColor: "#7c2d12",    // deep maroon
            badgeEmoji: "???",
            studies: [{ title: "Theosis", content: "Salvation as participation in God’s life; icons as windows to heaven." }]
        },
        {
            id: "lutheran",
            title: "Lutheran — Starter Kit",
            intro: "Rooted in the Reformation, highlighting salvation by grace through faith alone.",
            badgeColor: "#7c3aed",    // purple
            badgeEmoji: "??",
            studies: [{ title: "Justification", content: "Luther’s ‘sola fide’; Word and Sacrament central to worship." }]
        },
        {
            id: "presbyterian",
            title: "Presbyterian — Starter Kit",
            intro: "Governed by elders and shaped by Reformed theology’s focus on God’s sovereignty.",
            badgeColor: "#0d9488",    // teal
            badgeEmoji: "???",
            studies: [{ title: "Covenant Faith", content: "Calvin’s influence; confessions like the Westminster Standards." }]
        },
        {
            id: "seventhday",
            title: "Seventh-day Adventist — Starter Kit",
            intro: "Advent hope, holistic health, and Sabbath rest rooted in Scripture and the soon return of Christ.",
            badgeColor: "#16a34a",    // green
            badgeEmoji: "??",
            studies: [{ title: "Advent Hope", content: "19th-century origins; Saturday Sabbath, healthful living, Christ’s ministry in heaven." }]
        },
        {
            id: "pentecostal",
            title: "Pentecostal — Starter Kit",
            intro: "Emphasizes the Holy Spirit’s gifts, expressive worship, and active evangelism.",
            badgeColor: "#f97316",    // orange
            badgeEmoji: "?",
            studies: [{ title: "Spirit & Power", content: "Azusa Street Revival; tongues and healing as Spirit’s work." }]
        },
        {
            id: "non-denom",
            title: "Non-Denominational — Starter Kit",
            intro: "Independent congregations focused on simple gospel preaching and contemporary worship.",
            badgeColor: "#6b7280",    // gray
            badgeEmoji: "??",
            studies: [{ title: "Unity in Simplicity", content: "Emphasis on a personal relationship with Jesus, Bible teaching, and local mission." }]
        },
        {
            id: "jewish",
            title: "Messianic / Jewish Roots — Starter Kit",
            intro: "Explores Hebraic roots and the Torah’s moral heart viewed through faith in the Messiah.",
            badgeColor: "#0ea5e9",    // sky blue
            badgeEmoji: "??",
            studies: [{ title: "Roots of Faith", content: "Sabbaths, feasts, and covenants understood through fulfillment in the Messiah." }]
        }
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

/* ========= Recovery (steps memory, print, signups, admin) ========= */
(() => {
    const section = $("#recovery");
    if (!section) return; // not on this page build

    // ----- Remember which <details> are open -----
    const OPEN_KEY = "recovery-open-steps-v1";
    const stepsWrap = $("#recoverySteps");
    if (stepsWrap) {
        try {
            const openSet = new Set(JSON.parse(localStorage.getItem(OPEN_KEY) || "[]"));
            stepsWrap.querySelectorAll("details.re-step[data-step]").forEach(d => {
                const no = d.getAttribute("data-step");
                if (openSet.has(no)) d.setAttribute("open", "");
                else d.removeAttribute("open");
            });
        } catch { }
        stepsWrap.addEventListener("toggle", () => {
            const open = [];
            stepsWrap.querySelectorAll("details.re-step[data-step]").forEach(d => {
                if (d.open) open.push(d.getAttribute("data-step"));
            });
            try { localStorage.setItem(OPEN_KEY, JSON.stringify(open)); } catch { }
        });
    }

    // ----- Print current plan -----
    $("#recoveryPrintBtn")?.addEventListener("click", () => {
        const node = section; // print the whole tab
        const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");
        if (!w) return;
        const styles = Array.from(document.styleSheets)
            .map(s => { try { return s.href ? `<link rel="stylesheet" href="${s.href}">` : ""; } catch { return ""; } })
            .join("");
        w.document.write(`
      <html>
        <head>
          <title>Recovery Power in Christ</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          ${styles}
          <style>
            body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; padding:24px; background:#fff; color:#111;}
            .card{border:0}
            details.re-step{page-break-inside:avoid;}
          </style>
        </head>
        <body></body>
      </html>
    `);
        w.document.body.appendChild(node.cloneNode(true));
        w.document.close(); w.focus(); w.print(); w.close();
    });

    // ----- Signups + Admin -----
    const LS_KEY = "RECOVERY_SIGNUPS_V1";
    const HIDE_KEY = "RECOVERY_SIGNUPS_HIDDEN";
    const ADMIN_KEY = "RECOVERY_ADMIN_ON"; // sessionStorage
    const ADMIN_PIN = ""; // optional PIN, e.g., "7777"

    const listEl = $("#recoverySignupList");
    const modal = $("#recoveryModal");
    const form = $("#recoveryForm");

    const btnOpen = $("#recoverySignUpBtn");
    const btnCsv = $("#recoveryDownloadCsvBtn");
    const btnAdmin = $("#recoveryAdminBtn");
    const adminBadge = $("#recoveryAdminBadge");
    const adminBar = $("#recoveryAdminBar");
    const toggleHidePublic = $("#recoveryHidePublic");
    const btnClearAll = $("#recoveryClearAllBtn");
    const modalClose = $("#recoveryModalClose");
    const modalCancel = $("#recoveryCancel");
    const modalBackdrop = modal?.querySelector?.("[data-close-modal]");

    if (!listEl) return;

    const isAdmin = () => sessionStorage.getItem(ADMIN_KEY) === "1";
    const setAdmin = (on) => {
        if (on) sessionStorage.setItem(ADMIN_KEY, "1");
        else sessionStorage.removeItem(ADMIN_KEY);
        updateAdminUI(); render();
    };
    const isHiddenPublic = () => localStorage.getItem(HIDE_KEY) === "1";
    const setHiddenPublic = (on) => { try { on ? localStorage.setItem(HIDE_KEY, "1") : localStorage.removeItem(HIDE_KEY); } catch { } };

    const loadAll = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; } };
    const saveAll = (rows) => { try { localStorage.setItem(LS_KEY, JSON.stringify(rows)); } catch { } };

    function updateAdminUI() {
        const admin = isAdmin();
        adminBadge?.classList.toggle("hidden", !admin);
        adminBar?.classList.toggle("hidden", !admin);
        if (toggleHidePublic) toggleHidePublic.checked = isHiddenPublic();
        if (btnAdmin) btnAdmin.textContent = admin ? "Admin (on)" : "Admin";
    }

    function escapeHtml(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }
    function csvEscape(val) { if (val == null) return ""; const s = String(val); return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }

    function render() {
        const admin = isAdmin();
        const rows = loadAll();

        if (!admin && isHiddenPublic()) {
            listEl.innerHTML = `<div class="muted">Signups are currently hidden.</div>`;
            return;
        }
        if (!rows.length) {
            listEl.innerHTML = `<div class="muted">No sign ups yet. Be the first—click “Sign Up”.</div>`;
            return;
        }

        const thead = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Preferred</th>
          <th>Notes</th>
          <th>Date</th>
          ${admin ? `<th>Actions</th>` : ``}
        </tr>
      </thead>`;
        const tbody = rows.map((r, i) => `
      <tr>
        <td>${escapeHtml(r.fullName || "")}</td>
        <td>${r.email ? `<a href="mailto:${escapeAttr(r.email)}">${escapeHtml(r.email)}</a>` : "—"}</td>
        <td>${r.phone ? `<a href="tel:${escapeAttr(r.phone)}">${escapeHtml(r.phone)}</a>` : "—"}</td>
        <td><span class="signup-badge">${escapeHtml(r.preferred || "")}</span></td>
        <td>${escapeHtml((r.notes || ""))}</td>
        <td>${new Date(r.createdAt).toLocaleString()}</td>
        ${admin ? `<td><button class="btn ghost sm" data-remove-index="${i}">Remove</button></td>` : ``}
      </tr>`).join("");

        listEl.innerHTML = `
      <div class="mt">
        <table class="signup-table">
          ${thead}
          <tbody>${tbody}</tbody>
        </table>
      </div>`;
    }

    function toCsv(rows) {
        const headers = ["Full Name", "Email", "Phone", "Preferred", "Notes", "Created At"];
        const lines = [headers];
        rows.forEach(r => {
            lines.push([
                r.fullName || "", r.email || "", r.phone || "",
                r.preferred || "", String(r.notes || "").replace(/\r?\n/g, " "),
                new Date(r.createdAt).toISOString()
            ]);
        });
        return lines.map(cols => cols.map(csvEscape).join(",")).join("\r\n");
    }

    function downloadCsv() {
        const rows = loadAll();
        const csv = toCsv(rows);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "recovery_signups.csv";
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    }

    function openModal() {
        modal?.classList?.remove("hidden");
        modal?.showModal?.();
    }
    function closeModal() {
        modal?.classList?.add("hidden");
        modal?.close?.();
        form?.reset?.();
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!form) return;

        const data = new FormData(form);
        const fullName = (data.get("fullName") || "").toString().trim();
        const email = (data.get("email") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const preferred = (data.get("preferred") || "").toString();
        const notes = (data.get("notes") || "").toString();
        const consent = !!data.get("consent");

        if (!fullName) return alert("Please enter your full name.");
        if (!preferred) return alert("Please choose a preferred contact method.");
        if (!consent) return alert("Please consent to be contacted.");
        if (!email && !phone) return alert("Provide at least one contact detail (email or phone).");

        const row = { fullName, email, phone, preferred, notes, createdAt: Date.now() };
        const rows = loadAll(); rows.push(row); saveAll(rows);
        render(); closeModal();
    }

    function toggleAdmin() {
        if (isAdmin()) { setAdmin(false); return; }
        if (typeof ADMIN_PIN === "string" && ADMIN_PIN.length) {
            const entered = prompt("Enter admin PIN:");
            if (entered !== ADMIN_PIN) return alert("Incorrect PIN.");
        }
        setAdmin(true);
    }

    function onRemoveRow(idx) {
        const rows = loadAll();
        if (!rows[idx]) return;
        const ok = confirm(`Remove signup for "${rows[idx].fullName || "this person"}"?`);
        if (!ok) return;
        rows.splice(idx, 1); saveAll(rows); render();
    }

    function onClearAll() {
        const rows = loadAll();
        if (!rows.length) return alert("No signups to clear.");
        if (!confirm("This will permanently remove ALL signups on this device. Continue?")) return;
        saveAll([]); render();
    }

    // Wire-up
    updateAdminUI(); render();
    btnOpen?.addEventListener("click", openModal);
    btnCsv?.addEventListener("click", downloadCsv);
    btnAdmin?.addEventListener("click", toggleAdmin);
    btnClearAll?.addEventListener("click", onClearAll);
    toggleHidePublic?.addEventListener("change", () => { setHiddenPublic(!!toggleHidePublic.checked); render(); });

    listEl.addEventListener("click", (e) => {
        const btn = e.target.closest?.("[data-remove-index]");
        if (!btn) return;
        if (!isAdmin()) return alert("Admin mode is off.");
        const idx = parseInt(btn.getAttribute("data-remove-index"), 10);
        if (Number.isFinite(idx)) onRemoveRow(idx);
    });

    form?.addEventListener("submit", onSubmit);
    modalClose?.addEventListener("click", closeModal);
    modalCancel?.addEventListener("click", closeModal);
    modalBackdrop?.addEventListener("click", closeModal);
})();

/* ========= Community (Video + Chat + Join + Notes + Projects) ========= */
(() => {
    // Elements
    const video = document.getElementById("communityVideo");
    const startCamBtn = document.getElementById("startCamBtn");
    const stopCamBtn = document.getElementById("stopCamBtn");

    const chatBox = document.getElementById("communityChatMessages");
    const chatInput = document.getElementById("communityChatInput");
    const sendChatBtn = document.getElementById("sendCommunityMsgBtn");
    const clearChatBtn = document.getElementById("clearCommunityChatBtn");

    const nameEl = document.getElementById("communityName");
    const emailEl = document.getElementById("communityEmail");
    const joinBtn = document.getElementById("joinCommunityBtn");
    const dlCsvBtn = document.getElementById("downloadCommunityCsvBtn");
    const membersCount = document.getElementById("communityMembersCount");

    const notesText = document.getElementById("communityNotesText");
    const saveNotesBtn = document.getElementById("saveCommunityNotesBtn");
    const clearNotesBtn = document.getElementById("clearCommunityNotesBtn");
    const notesSavedEl = document.getElementById("communityNotesSaved");

    const helpBtn = document.getElementById("helpBtn");

    const projectTitle = document.getElementById("projectTitle");
    const projectOwner = document.getElementById("projectOwner");
    const projectDesc = document.getElementById("projectDesc");
    const newProjectBtn = document.getElementById("newProjectBtn");
    const clearProjectsBtn = document.getElementById("clearProjectsBtn");
    const projectsList = document.getElementById("communityProjectsList");

    // Bail if the Community section isn't on this page
    if (!document.getElementById("community")) return;

    /* ---- Camera Preview ---- */
    let localStream = null;
    startCamBtn?.addEventListener("click", async () => {
        if (!video) return;
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = localStream;
        } catch (err) {
            alert("Camera access was blocked or unavailable.");
            console.error(err);
        }
    });
    stopCamBtn?.addEventListener("click", () => {
        if (localStream) {
            localStream.getTracks().forEach(t => t.stop());
            localStream = null;
        }
        if (video) video.srcObject = null;
    });

    /* ---- Chat (local only) ---- */
    const CHAT_KEY = "community_chat_v1";
    let chat = storage.get(CHAT_KEY, []); // [{id, text, ts}]

    function renderChat() {
        if (!chatBox) return;
        chatBox.innerHTML = "";
        chat.forEach(m => {
            const d = document.createElement("div");
            d.className = "msg";
            d.innerHTML = `<div>${m.text}</div><div class="msg-meta">${new Date(m.ts).toLocaleString()}</div>`;
            chatBox.appendChild(d);
        });
    }
    renderChat();

    sendChatBtn?.addEventListener("click", () => {
        const text = (chatInput?.value || "").trim();
        if (!text) return;
        chat = [{ id: Date.now(), text, ts: Date.now() }, ...chat];
        storage.set(CHAT_KEY, chat);
        if (chatInput) chatInput.value = "";
        renderChat();
    });
    clearChatBtn?.addEventListener("click", () => {
        if (!confirm("Clear chat?")) return;
        chat = [];
        storage.set(CHAT_KEY, chat);
        renderChat();
    });

    /* ---- Join Community + CSV ---- */
    const MEMBERS_KEY = "community_members_v1";
    let members = storage.get(MEMBERS_KEY, []); // [{name, email, ts}]
    function updateMembersUI() {
        if (membersCount) {
            membersCount.textContent = members.length
                ? `Members on this device: ${members.length}`
                : `No members yet.`;
        }
    }
    updateMembersUI();

    joinBtn?.addEventListener("click", () => {
        const name = (nameEl?.value || "").trim();
        const email = (emailEl?.value || "").trim();
        if (!name) return alert("Please enter your name.");
        if (!email) return alert("Please enter your email.");
        members.push({ name, email, ts: Date.now() });
        storage.set(MEMBERS_KEY, members);
        nameEl && (nameEl.value = "");
        emailEl && (emailEl.value = "");
        updateMembersUI();
        alert("Welcome! You’ve been added locally.");
    });

    dlCsvBtn?.addEventListener("click", () => {
        const lines = [["Name", "Email", "Joined (ISO)"]];
        members.forEach(m => lines.push([m.name, m.email, new Date(m.ts).toISOString()]));
        const csv = lines.map(r => r.map(csvEscape).join(",")).join("\r\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "community_members.csv";
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
    });

    function csvEscape(val) {
        if (val == null) return "";
        const s = String(val);
        return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }

    /* ---- Notes ---- */
    const NOTES_KEY = "community_notes_v1";
    const initialNotes = storage.get(NOTES_KEY, "");
    if (notesText) notesText.value = initialNotes;

    function markSaved() {
        if (!notesSavedEl) return;
        notesSavedEl.textContent = "Saved " + new Date().toLocaleTimeString();
        setTimeout(() => { if (notesSavedEl) notesSavedEl.textContent = ""; }, 1500);
    }

    // Manual save
    saveNotesBtn?.addEventListener("click", () => {
        storage.set(NOTES_KEY, notesText?.value || "");
        markSaved();
    });
    // Auto-save on input (throttled lightweight)
    notesText?.addEventListener("input", () => {
        storage.set(NOTES_KEY, notesText.value);
    });
    clearNotesBtn?.addEventListener("click", () => {
        if (!notesText) return;
        notesText.value = "";
        storage.set(NOTES_KEY, "");
        markSaved();
    });

    /* ---- Help button ---- */
    helpBtn?.addEventListener("click", () => {
        window.location.href = "mailto:jonmarlow@gmail.com?subject=Community%20Help&body=Hi%20Jonathan,%0D%0A%0D%0A";
    });

    /* ---- Projects ---- */
    const PROJECTS_KEY = "community_projects_v1";
    let projects = storage.get(PROJECTS_KEY, []); // [{id,title,owner,desc,ts}]
    function renderProjects() {
        if (!projectsList) return;
        if (!projects.length) {
            projectsList.innerHTML = `<div class="muted">No projects yet—create one!</div>`;
            return;
        }
        projectsList.innerHTML = projects.map(p => `
      <div class="project-pill">
        <h4>${escapeHtml(p.title)}</h4>
        <div class="project-meta">Owner: ${escapeHtml(p.owner || "—")} • Created: ${new Date(p.ts).toLocaleString()}</div>
        <div style="margin-top:6px; white-space:pre-wrap;">${escapeHtml(p.desc || "")}</div>
        <div class="row gap mt">
          <button class="btn sm" data-del="${p.id}">Remove</button>
        </div>
      </div>
    `).join("");
    }
    renderProjects();

    newProjectBtn?.addEventListener("click", () => {
        const title = (projectTitle?.value || "").trim();
        const owner = (projectOwner?.value || "").trim();
        const desc = (projectDesc?.value || "").trim();
        if (!title) return alert("Please enter a project title.");
        const item = { id: "prj_" + Date.now(), title, owner, desc, ts: Date.now() };
        projects = [item, ...projects];
        storage.set(PROJECTS_KEY, projects);
        if (projectTitle) projectTitle.value = "";
        if (projectOwner) projectOwner.value = "";
        if (projectDesc) projectDesc.value = "";
        renderProjects();
    });

    clearProjectsBtn?.addEventListener("click", () => {
        if (!projects.length) return alert("No projects to clear.");
        const ok = confirm("Clear all projects on this device?");
        if (!ok) return;
        projects = [];
        storage.set(PROJECTS_KEY, projects);
        renderProjects();
    });

    // Delete single project (event delegation)
    projectsList?.addEventListener("click", (e) => {
        const btn = e.target.closest?.("[data-del]");
        if (!btn) return;
        const id = btn.getAttribute("data-del");
        projects = projects.filter(p => p.id !== id);
        storage.set(PROJECTS_KEY, projects);
        renderProjects();
    });

    // Small helpers
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
})();

/* ========= Church Finder (Leaflet + OSM) ========= */
(() => {
    // Abort if the Church tab isn't on this page
    const section = document.getElementById("church");
    if (!section) return;

    // Elements
    const inputCity = document.getElementById("churchSearch");
    const radiusSel = document.getElementById("churchRadius");
    const useMyLocBtn = document.getElementById("churchUseMyLocation");
    const searchBtn = document.getElementById("churchSearchBtn");
    const clearBtn = document.getElementById("churchClearBtn");
    const statusEl = document.getElementById("churchStatus");
    const resultsEl = document.getElementById("churchResults");
    const mapEl = document.getElementById("churchMap");

    // State
    let map, markersLayer;

    // Helpers
    function miToMeters(mi) { return Math.max(1, Number(mi) || 5) * 1609.34; }
    function setStatus(msg, isError = false) {
        if (!statusEl) return;
        statusEl.textContent = msg || "";
        statusEl.style.color = isError ? "#b91c1c" : "var(--muted)";
    }
    function clearResults() {
        if (resultsEl) resultsEl.innerHTML = "";
        if (markersLayer) markersLayer.clearLayers();
    }
    function ensureMap(lat = 35.9606, lon = -83.9207, zoom = 12) {
        if (!mapEl || typeof L === "undefined") return;
        if (!map) {
            map = L.map(mapEl).setView([lat, lon], zoom);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "&copy; OpenStreetMap contributors"
            }).addTo(map);
            markersLayer = L.layerGroup().addTo(map);
        } else {
            map.setView([lat, lon], zoom);
        }
    }
    function addMarker(lat, lon, name, denom, addr) {
        if (!markersLayer || typeof L === "undefined") return;
        const title = name || "Church";
        const lines = [
            `<strong>${escapeHtml(title)}</strong>`,
            denom ? `<div>${escapeHtml(denom)}</div>` : "",
            addr ? `<div class="meta">${escapeHtml(addr)}</div>` : ""
        ].join("");
        L.marker([lat, lon]).addTo(markersLayer).bindPopup(lines);
    }
    function renderItem(place) {
        const div = document.createElement("div");
        div.className = "church-item";
        const name = place.tags.name || "Unnamed Church";
        const denom = place.tags.denomination || place.tags.religion || "";
        const addr = [
            place.tags["addr:housenumber"] || "",
            place.tags["addr:street"] || "",
            place.tags["addr:city"] || "",
            place.tags["addr:state"] || "",
            place.tags["addr:postcode"] || ""
        ].filter(Boolean).join(" ");

        const lat = place.lat || place.center?.lat;
        const lon = place.lon || place.center?.lon;

        const gmaps = (lat && lon)
            ? `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
            : null;

        div.innerHTML = `
      <div style="font-weight:600;">${escapeHtml(name)}</div>
      <div class="meta">${escapeHtml(denom || "—")}</div>
      ${addr ? `<div class="meta">${escapeHtml(addr)}</div>` : ""}
      <div class="row gap mt">
        ${gmaps ? `<a class="btn" href="${gmaps}" target="_blank" rel="noopener">Open in Google Maps</a>` : ""}
      </div>
    `;
        resultsEl.appendChild(div);
    }
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // Fetch nearby churches (radius meters)
    async function fetchChurches(lat, lon, radiusMeters) {
        setStatus("Searching nearby churches…");
        clearResults();

        // Overpass query: Christian churches around point
        const query = `
      [out:json][timeout:25];
      (
        node["amenity"="place_of_worship"]["religion"="christian"](around:${Math.floor(radiusMeters)},${lat},${lon});
        way["amenity"="place_of_worship"]["religion"="christian"](around:${Math.floor(radiusMeters)},${lat},${lon});
        relation["amenity"="place_of_worship"]["religion"="christian"](around:${Math.floor(radiusMeters)},${lat},${lon});
      );
      out center tags;
    `;
        try {
            const resp = await fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=UTF-8" },
                body: query
            });
            if (!resp.ok) throw new Error("Overpass request failed");
            const data = await resp.json();
            const elements = (data && data.elements) ? data.elements : [];
            if (!elements.length) {
                setStatus("No churches found in range. Try a larger radius.");
                return;
            }

            // Fit map and render
            ensureMap(lat, lon);
            const bounds = [];
            elements.forEach(el => {
                const eLat = el.lat || el.center?.lat;
                const eLon = el.lon || el.center?.lon;
                if (typeof eLat === "number" && typeof eLon === "number") {
                    addMarker(eLat, eLon, el.tags?.name, el.tags?.denomination || el.tags?.religion, [
                        el.tags?.["addr:housenumber"] || "",
                        el.tags?.["addr:street"] || "",
                        el.tags?.["addr:city"] || "",
                        el.tags?.["addr:state"] || "",
                        el.tags?.["addr:postcode"] || ""
                    ].filter(Boolean).join(" "));
                    bounds.push([eLat, eLon]);
                    renderItem(el);
                }
            });
            if (bounds.length && map && typeof L !== "undefined") {
                map.fitBounds(bounds, { padding: [20, 20] });
            } else {
                ensureMap(lat, lon, 12);
            }
            setStatus(`Found ${elements.length} place(s).`);
        } catch (err) {
            console.error(err);
            setStatus("Error fetching churches. Please try again.", true);
        }
    }

    // Geocode city to coords (Nominatim)
    async function geocodeCity(q) {
        // Keep queries polite; Nominatim prefers sensible referer and modest frequency
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`;
        const resp = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!resp.ok) throw new Error("Geocoding failed");
        const arr = await resp.json();
        return (arr && arr[0]) ? { lat: Number(arr[0].lat), lon: Number(arr[0].lon), display: arr[0].display_name } : null;
    }

    // Actions
    useMyLocBtn?.addEventListener("click", () => {
        if (!navigator.geolocation) return setStatus("Geolocation is not supported in this browser.", true);
        setStatus("Getting your location…");
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const radiusMeters = miToMeters(radiusSel?.value);
                ensureMap(lat, lon, 13);
                fetchChurches(lat, lon, radiusMeters);
            },
            (err) => {
                console.error(err);
                setStatus("Location denied or unavailable.", true);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
        );
    });

    searchBtn?.addEventListener("click", async () => {
        const q = (inputCity?.value || "").trim();
        if (!q) return setStatus("Enter a city/town to search.");
        setStatus("Looking up that place…");
        try {
            const hit = await geocodeCity(q);
            if (!hit) return setStatus("Place not found. Try another search.", true);
            const radiusMeters = miToMeters(radiusSel?.value);
            ensureMap(hit.lat, hit.lon, 12);
            fetchChurches(hit.lat, hit.lon, radiusMeters);
        } catch (e) {
            console.error(e);
            setStatus("Search failed. Please try again.", true);
        }
    });

    clearBtn?.addEventListener("click", () => {
        if (inputCity) inputCity.value = "";
        setStatus("");
        clearResults();
        ensureMap(); // default view
    });

    // Lazy-init map on first tab show or immediately if already visible
    const initIfVisible = () => {
        const hidden = section.classList.contains("hidden");
        if (!hidden && !map) ensureMap(); // default center (Knoxville area fallback)
    };
    // If your app uses hash-based tabs, this covers both initial + changes:
    window.addEventListener("hashchange", initIfVisible);
    // Try once on load in case the tab is already active:
    initIfVisible();
})();
