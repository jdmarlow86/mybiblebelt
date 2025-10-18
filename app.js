// ==========================================
// Recovery Signups (no backend) + Admin mode
// ==========================================
(function () {
    const LS_KEY = "RECOVERY_SIGNUPS_V1";
    const HIDE_KEY = "RECOVERY_SIGNUPS_HIDDEN";
    const ADMIN_KEY = "RECOVERY_ADMIN_ON";   // sessionStorage key
    const ADMIN_PIN = ""; // Optional: set e.g. "7777" to require a PIN. Leave "" for no PIN.

    const btnOpen = document.getElementById("recoverySignUpBtn");
    const btnCsv = document.getElementById("recoveryDownloadCsvBtn");
    const listEl = document.getElementById("recoverySignupList");

    const modal = document.getElementById("recoveryModal");
    const modalClose = document.getElementById("recoveryModalClose");
    const modalCancel = document.getElementById("recoveryCancel");
    const modalBackdrop = modal && modal.querySelector("[data-close-modal]");
    const form = document.getElementById("recoveryForm");

    // Admin UI (add these elements in HTML if you want the controls):
    const btnAdmin = document.getElementById("recoveryAdminBtn");
    const adminBadge = document.getElementById("recoveryAdminBadge");
    const adminBar = document.getElementById("recoveryAdminBar");
    const toggleHidePublic = document.getElementById("recoveryHidePublic");
    const btnClearAll = document.getElementById("recoveryClearAllBtn");

    if (!listEl) return; // Recovery section not on this page

    // ---- State helpers
    const isAdmin = () => sessionStorage.getItem(ADMIN_KEY) === "1";
    const setAdmin = (on) => {
        if (on) sessionStorage.setItem(ADMIN_KEY, "1");
        else sessionStorage.removeItem(ADMIN_KEY);
        updateAdminUI();
        render();
    };

    function isHiddenPublic() { return localStorage.getItem(HIDE_KEY) === "1"; }
    function setHiddenPublic(on) {
        try { on ? localStorage.setItem(HIDE_KEY, "1") : localStorage.removeItem(HIDE_KEY); } catch { }
    }

    function loadAll() {
        try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
        catch { return []; }
    }
    function saveAll(rows) {
        try { localStorage.setItem(LS_KEY, JSON.stringify(rows)); } catch { }
    }

    // ---- UI updates
    function updateAdminUI() {
        const admin = isAdmin();
        if (admin) {
            adminBadge && adminBadge.classList.remove("hidden");
            adminBar && adminBar.classList.remove("hidden");
            if (toggleHidePublic) toggleHidePublic.checked = isHiddenPublic();
            if (btnAdmin) btnAdmin.textContent = "Admin (on)";
        } else {
            adminBadge && adminBadge.classList.add("hidden");
            adminBar && adminBar.classList.add("hidden");
            if (btnAdmin) btnAdmin.textContent = "Admin";
        }
    }

    // ---- Render list/table
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
          <th class="hide-sm">Phone</th>
          <th>Preferred</th>
          <th class="hide-sm">Notes</th>
          <th>Date</th>
          ${admin ? `<th>Actions</th>` : ``}
        </tr>
      </thead>
    `;

        const tbody = rows.map((r, idx) => `
      <tr>
        <td>${escapeHtml(r.fullName)}</td>
        <td>${r.email ? `<a href="mailto:${escapeAttr(r.email)}">${escapeHtml(r.email)}</a>` : "<span class='muted'>—</span>"}</td>
        <td class="hide-sm">${r.phone ? `<a href="tel:${escapeAttr(r.phone)}">${escapeHtml(r.phone)}</a>` : "<span class='muted'>—</span>"}</td>
        <td><span class="signup-badge">${escapeHtml(r.preferred)}</span></td>
        <td class="hide-sm">${r.notes ? escapeHtml(r.notes) : "<span class='muted'>—</span>"}</td>
        <td>${new Date(r.createdAt).toLocaleString()}</td>
        ${admin ? `<td><button class="btn sm" data-remove-index="${idx}">Remove</button></td>` : ``}
      </tr>
    `).join("");

        listEl.innerHTML = `
      <div class="mt">
        <table class="signup-table">
          ${thead}
          <tbody>${tbody}</tbody>
        </table>
      </div>
    `;
    }

    // ---- CSV download
    function toCsv(rows) {
        const headers = ["Full Name", "Email", "Phone", "Preferred", "Notes", "Created At"];
        const lines = [headers];
        rows.forEach(r => {
            lines.push([
                r.fullName || "",
                r.email || "",
                r.phone || "",
                r.preferred || "",
                (r.notes || "").replace(/\r?\n/g, " "),
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

    // ---- Modal controls
    function openModal() {
        if (!modal) return;
        modal.classList.remove("hidden");
        const first = form && form.querySelector("input, textarea, select, button");
        if (first) first.focus();
        document.addEventListener("keydown", onEsc, true);
    }
    function closeModal() {
        if (!modal) return;
        modal.classList.add("hidden");
        document.removeEventListener("keydown", onEsc, true);
        form && form.reset();
    }
    function onEsc(e) { if (e.key === "Escape") { e.preventDefault(); closeModal(); } }

    // ---- Form submit
    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(form);
        const fullName = (data.get("fullName") || "").toString().trim();
        const email = (data.get("email") || "").toString().trim();
        const phone = (data.get("phone") || "").toString().trim();
        const preferred = (data.get("preferred") || "").toString();
        const notes = (data.get("notes") || "").toString();
        const consent = data.get("consent") ? true : false;

        if (!fullName) return alert("Please enter your full name.");
        if (!preferred) return alert("Please choose a preferred contact method.");
        if (!consent) return alert("Please consent to be contacted.");
        if (!email && !phone) return alert("Please provide at least one contact detail (email or phone).");

        const row = { fullName, email, phone, preferred, notes, createdAt: Date.now() };
        const rows = loadAll(); rows.push(row); saveAll(rows);
        render(); closeModal();
    }

    // ---- Admin actions
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
        const ok = confirm(`Remove signup for "${rows[idx].fullName}"?`);
        if (!ok) return;
        rows.splice(idx, 1);
        saveAll(rows);
        render();
    }

    function onClearAll() {
        const rows = loadAll();
        if (!rows.length) return alert("No signups to clear.");
        const ok = confirm("This will permanently remove ALL signups on this device. Continue?");
        if (!ok) return;
        saveAll([]);
        render();
    }

    // ---- Small utils (scoped; won’t collide with your global helpers)
    function csvEscape(val) {
        if (val == null) return "";
        const s = String(val);
        return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }
    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }

    // ---- Wire-up
    updateAdminUI();
    if (toggleHidePublic) toggleHidePublic.checked = isHiddenPublic();
    render();

    btnOpen && btnOpen.addEventListener("click", openModal);
    btnCsv && btnCsv.addEventListener("click", downloadCsv);

    btnAdmin && btnAdmin.addEventListener("click", toggleAdmin);
    btnClearAll && btnClearAll.addEventListener("click", onClearAll);

    toggleHidePublic && toggleHidePublic.addEventListener("change", () => {
        setHiddenPublic(!!toggleHidePublic.checked);
        render();
    });

    listEl.addEventListener("click", (e) => {
        const btn = e.target.closest && e.target.closest("[data-remove-index]");
        if (!btn) return;
        if (!isAdmin()) return alert("Admin mode is off.");
        const idx = parseInt(btn.getAttribute("data-remove-index"), 10);
        if (!Number.isFinite(idx)) return;
        onRemoveRow(idx);
    });

    modalClose && modalClose.addEventListener("click", closeModal);
    modalCancel && modalCancel.addEventListener("click", closeModal);
    modalBackdrop && modalBackdrop.addEventListener("click", closeModal);
    form && form.addEventListener("submit", onSubmit);
})();
