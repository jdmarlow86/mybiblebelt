/* ===== Helpers ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const storage = {
    get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }
};

/* ===== Theme ===== */
function setTheme(theme) {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.classList.toggle("light", theme !== "dark");
    storage.set("theme", theme);
}
function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
}
$("#themeToggle")?.addEventListener("click", toggleTheme);
$("#themeToggleMobile")?.addEventListener("click", toggleTheme);

/* ===== Router (tabs) =====
   We keep only ONE Recovery section (#recovery-plan).
   Links like #recovery are mapped to #recovery-plan internally.
*/
const mapHashToId = (hash) => {
    const t = (hash || "#welcome").replace("#", "");
    return t === "recovery" ? "recovery-plan" : t;
};

function showTabById(id) {
    $$(".tab").forEach(s => s.classList.add("hidden"));
    const sec = document.getElementById(id);
    if (sec) sec.classList.remove("hidden");

    // Sync mobile select & hash
    const tab = (id === "recovery-plan") ? "recovery" : id;
    const mobile = $("#mobileNav");
    if (mobile && mobile.value !== tab) mobile.value = tab;
    const desiredHash = `#${tab}`;
    if (location.hash !== desiredHash) history.replaceState(null, "", desiredHash);
}

function showTab(tabKey) {
    showTabById(mapHashToId("#" + tabKey));
}

$$(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

$("#mobileNav")?.addEventListener("change", (e) => showTab(e.target.value));

window.addEventListener("hashchange", () => {
    showTabById(mapHashToId(location.hash));
});

// Initial tab (default welcome)
showTabById(mapHashToId(location.hash || "#welcome"));

/* ===== Footer year ===== */
$("#year").textContent = new Date().getFullYear();

/* ===== Recovery: Modal ===== */
const recModal = $("#recoveryModal");
$("#recoverySignUpBtn")?.addEventListener("click", () => recModal.showModal());
$("#recoveryModalClose")?.addEventListener("click", () => recModal.close());
$("#recoveryCancel")?.addEventListener("click", () => recModal.close());
$("[data-close-modal]")?.addEventListener("click", () => recModal.close());

/* ===== Recovery: Print ===== */
function serializeRecoveryForPrint(root) {
    const clone = root.cloneNode(true);

    // Expand all details
    clone.querySelectorAll("details").forEach(d => d.setAttribute("open", ""));

    // Convert inputs/selects/textareas to plain text values
    clone.querySelectorAll("input, textarea, select").forEach(el => {
        let value = "";
        if (el.tagName === "TEXTAREA") value = el.value.trim();
        else if (el.tagName === "SELECT") value = el.options[el.selectedIndex]?.text ?? "";
        else if (el.type === "checkbox") value = el.checked ? "? Yes" : "—";
        else if (el.type === "radio") {
            if (!el.checked) { el.remove(); return; }
            value = el.value;
        } else value = el.value ?? "";

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

    // Remove UI-only elements inside the clone
    clone.querySelectorAll("#recoveryAdminBar, #recoveryAdminBtn, #recoverySignUpBtn, #printPlanBtn, dialog, button.icon-close").forEach(n => n.remove());

    return clone.outerHTML;
}

function openPrintWindow(htmlBody, title = "Recovery Plan") {
    const win = window.open("", "PrintPlan", "width=900,height=700,noopener");
    if (!win) {
        alert("Popup was blocked. Please allow popups for this site and try again.");
        return;
    }
    const styles = `
    <style>
      :root { color-scheme: light dark; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height: 1.5; padding: 24px; }
      h1 { margin: 0 0 .5rem; font-size: 1.6rem; }
      .meta { color: #666; font-size: .95rem; margin-bottom: 1rem; }
      .print-field { margin: .25rem 0; }
      .print-field strong { font-weight: 600; }
      .print-value { white-space: pre-wrap; }
      details { margin: 12px 0; }
      summary { font-weight: 600; margin-bottom: 6px; }
      @media print { body { padding: 0; } }
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

function handlePrint() {
    const source = document.getElementById("recovery-plan");
    if (!source) { alert("Recovery Plan section not found."); return; }
    const html = serializeRecoveryForPrint(source);
    openPrintWindow(html, "Recovery Plan");
}

$("#printPlanBtn")?.addEventListener("click", handlePrint);

/* ===== Church: simple Leaflet init (no external API) ===== */
(function initMap() {
    const el = $("#churchMap");
    if (!el || typeof L === "undefined") return;
    const map = L.map(el).setView([36.0, -84.0], 8); // East TN general area
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "&copy; OpenStreetMap"
    }).addTo(map);
})();

/* ===== Community: very small chat/cam demo ===== */
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
    const list = $("#communityChatMessages");
    list.innerHTML = "";
});
