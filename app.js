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
$("#themeToggleMobile")?.addEventListener("click", toggleTheme);

/* ========= Router (tabs) =========
   - We have ONE Recovery section with id "recovery-plan".
   - The nav/hash "recovery" maps to that id.
*/
const mapHashToId = (hash) => {
    const t = (hash || "#welcome").replace("#", "");
    return t === "recovery" ? "recovery-plan" : t;
};

function showTabById(id) {
    $$(".tab").forEach(s => s.classList.add("hidden"));
    const sec = document.getElementById(id);
    if (sec) sec.classList.remove("hidden");

    // sync mobile <select> and hash
    const tab = (id === "recovery-plan") ? "recovery" : id;
    const mobile = $("#mobileNav");
    if (mobile && mobile.value !== tab) mobile.value = tab;

    const desiredHash = "#" + tab;
    if (location.hash !== desiredHash) history.replaceState(null, "", desiredHash);
}

function showTab(tabKey) { showTabById(mapHashToId("#" + tabKey)); }

// navbar buttons
$$(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

// mobile select
$("#mobileNav")?.addEventListener("change", (e) => showTab(e.target.value));

// hash navigation (deep links like #recovery)
window.addEventListener("hashchange", () => showTabById(mapHashToId(location.hash)));

// initial render
showTabById(mapHashToId(location.hash || "#welcome"));

/* ========= Recovery: Print ========= */
function serializeRecoveryForPrint(root) {
    const clone = root.cloneNode(true);
    clone.querySelectorAll("details").forEach(d => d.setAttribute("open", ""));

    // convert inputs/selects/textarea into static values
    clone.querySelectorAll("input, textarea, select").forEach(el => {
        let value = "";
        if (el.tagName === "TEXTAREA") value = el.value.trim();
        else if (el.tagName === "SELECT") value = el.options[el.selectedIndex]?.text ?? "";
        else if (el.type === "checkbox") value = el.checked ? "? Yes" : "—";
        else if (el.type === "radio") { if (!el.checked) { el.remove(); return; } else value = el.value; }
        else value = el.value ?? "";

        const span = document.createElement("span");
        span.className = "print-value";
        span.textContent = value || "—";

        const wrapper = document.createElement("div");
        wrapper.className = "print-field";

        let labelText = "";
        if (el.id) {
            const lbl = clone.querySelector(`label[for="${el.id}"]`);
            if (lbl) labelText = lbl.textContent.trim();
        } else {
            const lbl = el.closest("label");
            if (lbl) labelText = lbl.textContent.trim();
        }

        if (labelText) {
            const strong = document.createElement("strong");
            strong.textContent = labelText.replace(/\*\s*$/, "") + ": ";
            wrapper.appendChild(strong);
            wrapper.appendChild(span);
            el.replaceWith(wrapper);
        } else {
            el.replaceWith(span);
        }
    });

    // remove UI-only controls inside the print clone
    clone.querySelectorAll("button,.icon-btn,dialog").forEach(n => n.remove());
    return clone.outerHTML;
}

function openPrintWindow(htmlBody, title = "Recovery Plan") {
    const win = window.open("", "PrintPlan", "width=900,height=700,noopener");
    if (!win) { alert("Popup was blocked. Allow popups for this site and try again."); return; }
    const styles = `
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; line-height:1.5; padding:24px; }
      h1 { margin:0 0 .5rem; font-size:1.6rem; }
      .meta { color:#666; font-size:.95rem; margin-bottom:1rem; }
      .print-field { margin:.25rem 0; }
      .print-field strong { font-weight:600; }
      .print-value { white-space:pre-wrap; }
      details { margin:12px 0; }
      summary { font-weight:600; margin-bottom:6px; }
      @media print { body { padding:0; } }
    </style>
  `;
    const now = new Date();
    win.document.open();
    win.document.write(`<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>${styles}</head>
<body>
  <h1>${title}</h1>
  <div class="meta">Generated on ${now.toLocaleString()}</div>
  ${htmlBody}
  <script>window.onload=function(){setTimeout(function(){window.print();},120);};<\/script>
</body></html>`);
    win.document.close();
}

$("#printPlanBtn")?.addEventListener("click", () => {
    const source = document.getElementById("recovery-plan");
    if (!source) return alert("Recovery Plan section not found.");
    openPrintWindow(serializeRecoveryForPrint(source), "Recovery Plan");
});

/* ========= Church: minimal Leaflet init ========= */
(function initMap() {
    const el = $("#churchMap");
    if (!el || typeof L === "undefined") return;
    const map = L.map(el).setView([36.0, -84.0], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18, attribution: "&copy; OpenStreetMap"
    }).addTo(map);
})();
