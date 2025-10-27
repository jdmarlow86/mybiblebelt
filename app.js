/* ========= Helpers ========= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ========= Year ========= */
$("#year").textContent = new Date().getFullYear();

/* ========= Theme ========= */
function setTheme(theme) {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.classList.toggle("light", theme !== "dark");
    try { localStorage.setItem("theme", theme); } catch { }
}
function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
}
$("#themeToggle")?.addEventListener("click", toggleTheme);

/* ========= Router (tabs) =========
   - We have ONE Recovery section with id "recovery-plan".
   - The nav/hash "recovery" maps to that id.
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

function showTab(tabKey) {
    showTabById(mapHashToId("#" + tabKey));
}

// navbar buttons
$$(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

// hash navigation (deep links like #recovery)
window.addEventListener("hashchange", () => showTabById(mapHashToId(location.hash)));

// initial render
showTabById(mapHashToId(location.hash || "#welcome"));

/* ========= Church: minimal Leaflet init ========= */
(function initMap() {
    const el = $("#churchMap");
    if (!el || typeof L === "undefined") return;
    const map = L.map(el).setView([36.0, -84.0], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18, attribution: "&copy; OpenStreetMap"
    }).addTo(map);
})();

/* ========= Optional: community helpers (unchanged) ========= */
$("#startCamBtn")?.addEventListener("click", async () => {
    const v = $("#communityVideo");
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        v.srcObject = stream;
    } catch (e) { alert("Camera error: " + e.message); }
});
$("#stopCamBtn")?.addEventListener("click", () => {
    const v = $("#communityVideo");
    const s = v?.srcObject;
    if (s) s.getTracks().forEach(t => t.stop());
    v.srcObject = null;
});
$("#sendCommunityMsgBtn")?.addEventListener("click", () => {
    const input = $("#communityChatInput");
    const list = $("#communityChatMessages");
    const msg = (input.value || "").trim();
    if (!msg) return;
    const p = document.createElement("div");
    p.textContent = msg;
    list.appendChild(p);
    input.value = "";
    list.scrollTop = list.scrollHeight;
});
$("#clearCommunityChatBtn")?.addEventListener("click", () => {
    $("#communityChatMessages").innerHTML = "";
});

/* ========= Dialogs (Prayer/Recovery) ========= */
const prayerDialog = $("#prayerDialog");
$("#btnPrayerRequest")?.addEventListener("click", () => prayerDialog?.showModal());
$("#prayerModalClose")?.addEventListener("click", () => prayerDialog?.close());
document.querySelector('[data-close-modal]')?.addEventListener("click", () => prayerDialog?.close());

const recModal = $("#recoveryModal");
$("#recoverySignUpBtn")?.addEventListener("click", () => recModal?.showModal());
$("#recoveryModalClose")?.addEventListener("click", () => recModal?.close());
$("#recoveryCancel")?.addEventListener("click", () => recModal?.close());
