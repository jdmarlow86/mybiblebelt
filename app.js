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
