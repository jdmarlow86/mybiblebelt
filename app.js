/* ========= Helpers ========= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const storage = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch { } }
};

/* ========= Year ========= */
$("#year") && ($("#year").textContent = new Date().getFullYear());

/* ========= Theme ========= */
function setTheme(theme) {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.classList.toggle("light", theme !== "dark");
    try { localStorage.setItem("theme", theme); } catch { }
}
(function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    setTheme(stored || (prefersDark ? "dark" : "light"));
})();
$("#themeToggle")?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
});

/* ========= Router (tabs) =========
   - ONE Recovery section with id "recovery-plan".
   - Hash "recovery" maps to that id.
*/
const mapHashToId = (hash) => {
    const t = (hash || "#welcome").replace("#", "");
    return t === "recovery" ? "recovery-plan" : t;
};

function hideAllSections() {
    $$(".welcome, .tab-section").forEach(s => s.classList.add("hidden"));
}
function showTabById(id) {
    hideAllSections();
    const sec = document.getElementById(id);
    if (sec) sec.classList.remove("hidden");
    const tab = (id === "recovery-plan") ? "recovery" : id;
    const desiredHash = "#" + tab;
    if (location.hash !== desiredHash) history.replaceState(null, "", desiredHash);
}
function showTab(tabKey) { showTabById(mapHashToId("#" + tabKey)); }
$$(".nav-btn").forEach(btn => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
window.addEventListener("hashchange", () => showTabById(mapHashToId(location.hash)));
showTabById(mapHashToId(location.hash || "#welcome"));

/* =========================================================
   PRAYER — Rule Builder, Timer, and Requests
   ========================================================= */

/* ---------- Elements ---------- */
const $prayerInfo = $("#prayerInfo");

/* Rule builder */
const $btnCreateRule = $("#btnCreateRule");
const $ruleBuilder = $("#ruleBuilder");
const $ruleForm = $("#ruleForm");
const $duration = $("#duration");
const $scripture = $("#scripture");
const $notes = $("#notes");
const $btnGenerateRule = $("#btnGenerateRule");
const $btnClearRule = $("#btnClearRule");
const $btnCopyRule = $("#btnCopyRule");
const $btnDownloadRule = $("#btnDownloadRule");
const $ruleOutput = $("#ruleOutput");
const $ruleText = $("#ruleText");

/* Timer */
const $btnPrayNow = $("#btnPrayNow");
const $prayPanel = $("#prayPanel");
const $prayMinutes = $("#prayMinutes");
const $btnStartTimer = $("#btnStartTimer");
const $btnPauseTimer = $("#btnPauseTimer");
const $btnResetTimer = $("#btnResetTimer");
const $timerBar = $("#timerBar");
const $timerDisplay = $("#timerDisplay");
const $timerHints = $("#timerHints");

/* Prayer Request Modal */
const $prayerDialog = $("#prayerDialog");
const $btnPrayerRequest = $("#btnPrayerRequest");
const $btnSubmitRequest = $("#btnSubmitRequest");
const $reqName = $("#reqName");
const $reqEmail = $("#reqEmail");
const $reqMessage = $("#reqMessage");

/* ---------- Utilities ---------- */
function formatMinutes(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}
function download(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------- Rule Builder: toggle ---------- */
$btnCreateRule?.addEventListener("click", () => {
    const show = $ruleBuilder.classList.toggle("hidden");
    // toggle returns true if now hidden; we want opposite to show text
    if (!show) {
        $prayerInfo.textContent = "Create a simple, repeatable rule to guide daily prayer.";
        // load any previously saved rule inputs
        const saved = storage.get("prayer_rule_inputs", null);
        if (saved) {
            // restore duration/scripture/notes & checkboxes by value
            if ($duration) $duration.value = saved.duration ?? $duration.value;
            if ($scripture) $scripture.value = saved.scripture ?? "";
            if ($notes) $notes.value = saved.notes ?? "";
            // times/focus checkboxes
            $$("#ruleForm input[type=checkbox][name=times]").forEach(cb => cb.checked = saved.times?.includes(cb.value) ?? cb.checked);
            $$("#ruleForm input[type=checkbox][name=focus]").forEach(cb => cb.checked = saved.focus?.includes(cb.value) ?? cb.checked);
        }
        // load last generated rule text
        const lastRule = storage.get("prayer_rule_text", "");
        if (lastRule) {
            $ruleText.textContent = lastRule;
            $ruleOutput.classList.remove("hidden");
        }
    }
});

/* ---------- Rule Builder: generate ---------- */
$btnGenerateRule?.addEventListener("click", () => {
    const times = $$("#ruleForm input[name=times]:checked").map(i => i.value);
    const focus = $$("#ruleForm input[name=focus]:checked").map(i => i.value);
    const mins = Math.max(1, Math.min(120, Number($duration.value || 10)));
    const scr = ($scripture.value || "").trim();
    const note = ($notes.value || "").trim();

    // Save inputs for convenience next visit
    storage.set("prayer_rule_inputs", { times, focus, duration: mins, scripture: scr, notes: note });

    const blocks = [
        times.includes("Morning") && `• Morning — ${Math.ceil(mins / 3)} min: Scripture + short prayer${scr ? ` (e.g., ${scr})` : ""}`,
        times.includes("Midday") && `• Midday — ${Math.ceil(mins / 3)} min: Breath prayer (“Lord Jesus, have mercy”) + intercession`,
        times.includes("Evening") && `• Evening — ${Math.ceil(mins / 3)} min: Examen (gratitude x3, confession, resolve)`
    ].filter(Boolean).join("\n");

    const focusLine = focus.length ? `Focus areas: ${focus.join(", ")}.` : "Focus areas: (choose at least one).";

    const text = [
        "Personal Prayer Rule",
        "---------------------",
        focusLine,
        blocks || "• Choose a time of day to begin (Morning, Midday, Evening).",
        note && `Notes: ${note}`
    ].filter(Boolean).join("\n");

    $ruleText.textContent = text;
    $ruleOutput.classList.remove("hidden");
    storage.set("prayer_rule_text", text);
    $prayerInfo.textContent = "Rule generated. You can copy, download, or tweak it anytime.";
});

/* ---------- Rule Builder: clear / copy / download ---------- */
$btnClearRule?.addEventListener("click", () => {
    $ruleForm.reset();
    $ruleText.textContent = "";
    $ruleOutput.classList.add("hidden");
    storage.set("prayer_rule_text", "");
    storage.set("prayer_rule_inputs", null);
});

$btnCopyRule?.addEventListener("click", async () => {
    const text = $ruleText.textContent.trim();
    if (!text) return;
    try { await navigator.clipboard.writeText(text); $prayerInfo.textContent = "Copied your rule to clipboard."; }
    catch { $prayerInfo.textContent = "Copy failed. You can still use Download."; }
});

$btnDownloadRule?.addEventListener("click", () => {
    const text = $ruleText.textContent.trim();
    if (!text) return;
    const stamp = new Date().toISOString().slice(0, 10);
    download(`prayer-rule-${stamp}.txt`, text);
});

/* ---------- Timer ---------- */
let timer = {
    total: 0,        // total seconds
    remaining: 0,    // remaining seconds
    intervalId: null,
    running: false
};

function resetTimerUI() {
    $timerDisplay.textContent = "0:00";
    $timerBar.style.width = "0%";
    $timerHints.textContent = "";
    $btnPauseTimer.disabled = true;
    $btnResetTimer.disabled = true;
    $btnStartTimer.disabled = false;
}
resetTimerUI();

$btnPrayNow?.addEventListener("click", () => {
    $prayPanel.classList.toggle("hidden");
    if (!$prayPanel.classList.contains("hidden")) {
        $prayerInfo.textContent = "Set a time and press Start. You can pause any time.";
    }
});

$btnStartTimer?.addEventListener("click", () => {
    const mins = Math.max(1, Math.min(180, Number($prayMinutes.value || 10)));
    timer.total = mins * 60;
    timer.remaining = timer.total;
    $btnStartTimer.disabled = true;
    $btnPauseTimer.disabled = false;
    $btnResetTimer.disabled = false;
    timer.running = true;

    tick(); // update immediately
    timer.intervalId = setInterval(tick, 1000);
});

$btnPauseTimer?.addEventListener("click", () => {
    if (!timer.intervalId) return;
    if (timer.running) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        timer.running = false;
        $btnPauseTimer.textContent = "Resume";
        $timerHints.textContent = "Paused. Breathe: “Lord Jesus, have mercy.”";
    } else {
        timer.intervalId = setInterval(tick, 1000);
        timer.running = true;
        $btnPauseTimer.textContent = "Pause";
    }
});

$btnResetTimer?.addEventListener("click", () => {
    if (timer.intervalId) clearInterval(timer.intervalId);
    timer.intervalId = null;
    timer.running = false;
    $btnPauseTimer.textContent = "Pause";
    resetTimerUI();
});

function tick() {
    timer.remaining = Math.max(0, timer.remaining - 1);
    const elapsed = timer.total - timer.remaining;
    $timerDisplay.textContent = formatMinutes(timer.remaining);

    const pct = timer.total ? (elapsed / timer.total) * 100 : 0;
    $timerBar.style.width = `${pct}%`;

    // Gentle rotating hints based on progress thirds
    const third = timer.total / 3;
    if (elapsed < third) {
        $timerHints.textContent = "Praise — thank God for 3 specific gifts today.";
    } else if (elapsed < 2 * third) {
        $timerHints.textContent = "Confession — be honest about the hardest thing this week.";
    } else {
        $timerHints.textContent = "Intercession — pray for others by name.";
    }

    if (timer.remaining <= 0) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        timer.running = false;
        $btnPauseTimer.disabled = true;
        $timerHints.textContent = "Amen. Consider one next step you’ll take today.";
        try { new AudioContext(); } catch { }
    }
}

/* ---------- Prayer Requests (modal) ---------- */
$btnPrayerRequest?.addEventListener("click", () => $prayerDialog?.showModal());

$btnSubmitRequest?.addEventListener("click", (e) => {
    e.preventDefault();
    const form = $("#prayerForm");
    if (!form) return;

    const reqType = form.querySelector('input[name="reqType"]:checked')?.value || "For myself";
    const privacy = form.querySelector('input[name="privacy"]:checked')?.value || "Private";
    const name = $reqName?.value?.trim() || "";
    const email = $reqEmail?.value?.trim() || "";
    const message = $reqMessage?.value?.trim() || "";

    if (!message) { alert("Please share a brief request so we know how to pray."); return; }

    const all = storage.get("prayer_requests", []);
    all.push({
        id: Date.now(),
        when: new Date().toISOString(),
        type: reqType,
        privacy,
        name, email, message
    });
    storage.set("prayer_requests", all);

    $prayerDialog?.close();
    form.reset();
    $prayerInfo.textContent = "Prayer request saved privately on this device.";
});

/* ESC to close dialog backdrop click is native; no extra wiring needed */
/* =========================
   STUDY LIBRARY: links list
   ========================= */
(function initStudyLibrary() {
    const grid = document.getElementById("studyLinksGrid");
    if (!grid) return;

    const STORAGE_KEY = "study_links";

    const DEFAULT_STUDY_LINKS = [
        // — General Tools —
        {
            title: "BibleProject — Learn", url: "https://bibleproject.com/explore/",
            desc: "Animated explanations of biblical themes, books, and word studies.",
            tags: ["General"]
        },

        {
            title: "Blue Letter Bible", url: "https://www.blueletterbible.org/",
            desc: "Deep word tools: lexicons, interlinear, cross-references.",
            tags: ["General"]
        },

        {
            title: "STEP Bible", url: "https://www.stepbible.org/",
            desc: "Multi-language Bible study with original-language helps.",
            tags: ["General"]
        },

        {
            title: "Bible Gateway", url: "https://www.biblegateway.com/",
            desc: "Read and compare translations; audio and reading plans.",
            tags: ["General"]
        },

        {
            title: "GotQuestions", url: "https://www.gotquestions.org/",
            desc: "Short, searchable answers to thousands of Bible questions.",
            tags: ["General", "Apologetics"]
        },

        // — Seventh-day Adventist —
        {
            title: "SDA: Sabbath School (Adult Bible Study Guide)",
            url: "https://absg.adventist.org/",
            desc: "Weekly lessons with teacher helps and archives.",
            tags: ["Seventh-day Adventist"]
        },

        {
            title: "SDA: Amazing Facts — Study Guides",
            url: "https://www.amazingfacts.org/media-library/study-guides",
            desc: "27 illustrated, foundational Bible study lessons.",
            tags: ["Seventh-day Adventist"]
        },

        // — Baptist —
        {
            title: "Baptist Faith & Message (2000)",
            url: "https://bfm.sbc.net/",
            desc: "Doctrinal statement with Scripture references (SBC).",
            tags: ["Baptist", "Confessions"]
        },

        {
            title: "IMB: Foundations — 40 Essentials",
            url: "https://www.imb.org/foundations/",
            desc: "Core discipleship lessons used broadly in Baptist missions.",
            tags: ["Baptist", "Discipleship"]
        },

        // — Methodist / Wesleyan —
        {
            title: "UMC: What We Believe",
            url: "https://www.umc.org/en/what-we-believe",
            desc: "Articles on doctrine, grace, and Christian living.",
            tags: ["Methodist"]
        },

        {
            title: "Seedbed (Wesleyan Resources)",
            url: "https://seedbed.com/",
            desc: "Wesleyan formation: class meetings, bands, and studies.",
            tags: ["Methodist", "Wesleyan"]
        },

        // — Catholic —
        {
            title: "USCCB: Catechism of the Catholic Church",
            url: "https://www.usccb.org/faith-and-doctrine/catechism",
            desc: "Official catechism text and teaching resources.",
            tags: ["Catholic", "Catechism"]
        },

        {
            title: "Formed (Intro & Parish Finder)",
            url: "https://watch.formed.org/browse",
            desc: "Video studies and devotionals (many parishes provide access).",
            tags: ["Catholic", "Media"]
        },

        // — Orthodox —
        {
            title: "OCA: The Orthodox Faith",
            url: "https://www.oca.org/orthodoxy/the-orthodox-faith",
            desc: "Concise articles on doctrine, worship, and history.",
            tags: ["Orthodox"]
        },

        {
            title: "Ancient Faith Ministries",
            url: "https://www.ancientfaith.com/",
            desc: "Podcasts, blogs, and catechesis from the Orthodox tradition.",
            tags: ["Orthodox", "Media"]
        },

        // — Reformed —
        {
            title: "Ligonier — Learn",
            url: "https://www.ligonier.org/learn",
            desc: "Courses and articles on Reformed theology and Bible.",
            tags: ["Reformed"]
        },

        {
            title: "The Gospel Coalition — Topics",
            url: "https://www.thegospelcoalition.org/topics/",
            desc: "Biblical essays, sermons, and guides across many themes.",
            tags: ["Reformed", "Evangelical"]
        },

        // — Pentecostal / Charismatic —
        {
            title: "Assemblies of God — Fundamental Truths",
            url: "https://ag.org/Beliefs/Statement-of-Fundamental-Truths",
            desc: "Doctrinal summary with Scripture.",
            tags: ["Pentecostal"]
        },

        {
            title: "Vineyard Resources",
            url: "https://resources.vineyardusa.org/",
            desc: "Vineyard training guides, theology, and small-group helps.",
            tags: ["Charismatic", "Pentecostal"]
        },

        // — Anglican / Lutheran —
        {
            title: "Church of England — Daily Prayer",
            url: "https://www.churchofengland.org/prayer-and-worship/join-us-in-daily-prayer",
            desc: "Morning/Evening prayer and lectionary readings.",
            tags: ["Anglican", "Prayer"]
        },

        {
            title: "Luther’s Small Catechism (LCMS)",
            url: "https://catechism.cph.org/",
            desc: "Interactive catechism with explanations and Scripture.",
            tags: ["Lutheran", "Catechism"]
        },
    ];

    const storage = {
        get() {
            try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
            catch { return []; }
        },
        set(val) {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(val)); } catch { }
        },
        ensureDefaults() {
            const cur = this.get();
            if (!cur || cur.length === 0) this.set(DEFAULT_STUDY_LINKS);
        }
    };

    function render(links) {
        grid.innerHTML = "";
        if (!links || links.length === 0) {
            grid.innerHTML = `<div class="muted">No links yet. (They’re saved on this device.)</div>`;
            return;
        }
        const frag = document.createDocumentFragment();

        links.forEach(link => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
        <div class="row" style="justify-content:space-between; align-items:flex-start;">
          <div style="min-width:200px;">
            <div style="font-weight:600; margin-bottom:2px;">
              <a href="${link.url}" target="_blank" rel="noopener">${escapeHtml(link.title)}</a>
            </div>
            <div class="muted" style="margin:4px 0;">${escapeHtml(link.desc || "")}</div>
            <div class="muted" style="font-size:.9em;">${(link.tags || []).map(t => `<span class="badge" style="margin-right:6px;">${escapeHtml(t)}</span>`).join(" ")}</div>
          </div>
          <div style="text-align:right; min-width:120px;">
            <a class="btn" href="${link.url}" target="_blank" rel="noopener">Open</a>
            <button class="btn ghost" data-copy="${link.url}">Copy URL</button>
          </div>
        </div>
      `;
            frag.appendChild(card);
        });

        grid.appendChild(frag);

        // copy buttons
        grid.querySelectorAll("button[data-copy]").forEach(btn => {
            btn.addEventListener("click", async () => {
                const url = btn.getAttribute("data-copy");
                try { await navigator.clipboard.writeText(url); btn.textContent = "Copied!"; setTimeout(() => btn.textContent = "Copy URL", 1200); }
                catch { btn.textContent = "Failed"; setTimeout(() => btn.textContent = "Copy URL", 1200); }
            });
        });
    }

    function escapeHtml(s = "") {
        return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
    }

    // Export CSV of links
    function exportLinksCsv() {
        const rows = [["Title", "URL", "Description", "Tags"]];
        const links = storage.get();
        links.forEach(l => rows.push([
            l.title, l.url, (l.desc || ""), (l.tags || []).join("|")
        ]));
        const csv = rows.map(r => r.map(field => {
            const val = String(field ?? "");
            return /[",\n]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = `study-links-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    // Clear links
    function clearLinks() {
        if (!confirm("Delete all links from this device?")) return;
        storage.set([]);
        render([]);
    }

    // Init
    storage.ensureDefaults();
    render(storage.get());

    // Wire buttons
    document.getElementById("studyExportLinksBtn")?.addEventListener("click", exportLinksCsv);
    document.getElementById("studyClearLinksBtn")?.addEventListener("click", clearLinks);
})();
