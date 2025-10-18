/* ========= Utilities ========= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const storage = {
    get(key, fallback) {
        try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch { } }
};
const pad = (n) => String(n).padStart(2, "0");
const nowLocalDateTimeStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const toGoogleCalendarDateRange = (startISO, minutes = 60) => {
    const start = new Date(startISO);
    const end = new Date(start.getTime() + minutes * 60000);
    const toCal = (dt) => dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    return `${toCal(start)}/${toCal(end)}`;
};

/* ========= Theme (SVG icons) ========= */
const sunSVG = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <circle cx="12" cy="12" r="4"></circle>
  <line x1="12" y1="2" x2="12" y2="5"></line>
  <line x1="12" y1="19" x2="12" y2="22"></line>
  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"></line>
  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"></line>
  <line x1="2" y1="12" x2="5" y2="12"></line>
  <line x1="19" y1="12" x2="22" y2="12"></line>
  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"></line>
  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"></line>
</svg>`;
const moonSVG = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
</svg>`;

const setTheme = (mode /* 'light' | 'dark' */) => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark"); else root.classList.remove("dark");
    try { localStorage.setItem("theme", mode); } catch { }
    const iconHTML = root.classList.contains("dark") ? sunSVG : moonSVG;
    const t1 = document.getElementById("themeToggle");
    const t2 = document.getElementById("themeToggleMobile");
    if (t1) t1.innerHTML = iconHTML;
    if (t2) t2.innerHTML = iconHTML;
};

const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
};

// Initialize icon once on load (the dark class may already be set by inline script)
(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const iconHTML = isDark ? sunSVG : moonSVG;
    document.getElementById("themeToggle")?.insertAdjacentHTML("afterbegin", iconHTML);
    document.getElementById("themeToggleMobile")?.insertAdjacentHTML("afterbegin", iconHTML);
})();

/* ========= Nav / Tabs ========= */
const sections = $$(".tab-section");
const navBtns = $$(".nav-btn[data-tab]");
const mobileNav = $("#mobileNav");

function showTab(id) {
    sections.forEach(s => s.classList.toggle("hidden", s.id !== id));
    navBtns.forEach(b => b.classList.toggle("active", b.dataset.tab === id));
    if (mobileNav) mobileNav.value = id;
    history.replaceState(null, "", `#${id}`);
}

navBtns.forEach(btn => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
mobileNav?.addEventListener("change", () => showTab(mobileNav.value));

document.addEventListener("click", (e) => {
    const t = e.target.closest?.("[data-jump]");
    if (!t) return;
    e.preventDefault();
    showTab(t.getAttribute("data-jump"));
});

const initial = location.hash?.slice(1) || "welcome";
showTab(initial);

/* ========= Footer Year ========= */
$("#year").textContent = new Date().getFullYear();

/* ========= Theme Toggle Bindings ========= */
$("#themeToggle")?.addEventListener("click", toggleTheme);
$("#themeToggleMobile")?.addEventListener("click", toggleTheme);

/* ========= Welcome ========= */
$("#findChurchBtn")?.addEventListener("click", () => {
    alert("Coming soon: church finder!");
});

/* ========= Resources (Starter Kits) ========= */
const SEED_STARTER_KITS = [
    {
        id: "baptist", title: "Baptist — Starter Kit", intro: "Overview of Baptist beliefs: believer's baptism, congregational governance, and emphasis on Scripture.",
        studies: [
            { title: "History & Distinctives", content: "Origins in 17th-century English Separatism; local church autonomy." },
            { title: "Baptism & Communion", content: "Believer's baptism by immersion; Lord's Supper as ordinance." },
            { title: "Study Path", content: "Read Gospel of John, Acts; explore Baptist Faith & Message." },
        ]
    },
    {
        id: "methodist", title: "Methodist — Starter Kit", intro: "Methodism emphasizes grace (prevenient, justifying, sanctifying), connectionalism, and practical holiness.",
        studies: [
            { title: "Wesleyan Heritage", content: "John & Charles Wesley; small groups; disciplined devotional life." },
            { title: "Grace & Discipleship", content: "Explore grace in Romans; practices of mercy and piety." },
            { title: "Study Path", content: "Gospels, Romans; Wesley's sermons; Book of Discipline overview." },
        ]
    },
    {
        id: "catholic", title: "Catholic — Starter Kit", intro: "Catholicism: Scripture and Tradition, sacramental life, and communion with the historic Church.",
        studies: [
            { title: "Tradition & Magisterium", content: "How teaching authority functions; ecumenical councils." },
            { title: "Sacraments", content: "Seven sacraments; grace in ordinary life; liturgical calendar." },
            { title: "Study Path", content: "Synoptic Gospels; Catechism selections; early Church Fathers." },
        ]
    },
    {
        id: "sda", title: "Seventh-day Adventist — Starter Kit", intro: "SDA distinctives include Sabbath observance, holistic health, and the blessed hope of Christ's return.",
        studies: [
            { title: "Sabbath & Creation", content: "Genesis 1-2; Exodus 20; rhythm of rest and worship." },
            { title: "Advent Hope", content: "Study Daniel & Revelation themes; focus on hope and mission." },
            { title: "Study Path", content: "Gospels, Hebrews; thematic studies on sanctuary & mission." },
        ]
    },
    {
        id: "pentecostal", title: "Pentecostal — Starter Kit", intro: "Pentecostalism highlights the work of the Holy Spirit, spiritual gifts, and vibrant worship.",
        studies: [
            { title: "Acts & the Spirit", content: "Read Acts; gifts listed in 1 Cor 12-14 and Romans 12." },
            { title: "Prayer & Worship", content: "Cultivate prayer, praise, and openness to the Spirit." },
            { title: "Study Path", content: "Gospels, Acts; resources on gifts and fruit of the Spirit." },
        ]
    },
    {
        id: "nondenom", title: "Non-Denominational — Starter Kit", intro: "Focus on biblical essentials, discipleship, and simple church expressions.",
        studies: [
            { title: "Core Beliefs", content: "Jesus-centered gospel; authority of Scripture; community life." },
            { title: "Practices", content: "Small groups, service, local mission, simple liturgy." },
            { title: "Study Path", content: "Gospels, Acts; read a whole Gospel; memorize key passages." },
        ]
    },
    {
        id: "judaism", title: "Judaism — Starter Kit", intro: "Explore Torah, Prophets, and Writings; synagogue life; cycles of prayer and festival.",
        studies: [
            { title: "Tanakh Overview", content: "Structure and themes; covenant; wisdom literature." },
            { title: "Life & Practice", content: "Shabbat, kosher, prayer services; Hebrew calendar." },
            { title: "Study Path", content: "Genesis, Exodus; Psalms; explore rabbinic commentary." },
        ]
    },
    {
        id: "islam", title: "Islam — Starter Kit", intro: "Overview of Qur'an, Prophetic tradition, Five Pillars, and diverse schools of thought.",
        studies: [
            { title: "Scripture & Prophethood", content: "Qur'an structure; role of hadith; prophets in Islam." },
            { title: "Five Pillars", content: "Shahada, Salat, Zakat, Sawm, Hajj; daily life rhythms." },
            { title: "Study Path", content: "Introductory surahs; biographies; comparative faith studies." },
        ]
    },
];
let kits = storage.get("starterKits", SEED_STARTER_KITS);

function renderKits() {
    const grid = $("#kitsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    kits.forEach(kit => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <div class="row spread">
        <div>
          <div class="section-title">${kit.title}</div>
          <div class="muted">${kit.intro}</div>
        </div>
        <button class="btn" data-expand>Expand</button>
      </div>
      <div class="mt hidden" data-studies>
        ${(kit.studies || []).map(s => `
          <div class="info-tile">
            <div class="info-title">${s.title}</div>
            <div class="info-body">${s.content}</div>
          </div>`).join("")}
      </div>
    `;
        const expandBtn = $("[data-expand]", card);
        const studies = $("[data-studies]", card);
        expandBtn.addEventListener("click", () => studies.classList.toggle("hidden"));
        grid.appendChild(card);
    });
}
renderKits();

$("#addKitBtn")?.addEventListener("click", () => {
    const title = $("#kitTitle").value.trim();
    const intro = $("#kitIntro").value.trim();
    const study = $("#kitStudy").value.trim();
    if (!title) return;
    const newKit = {
        id: "user-" + Date.now(),
        title, intro,
        studies: study ? [{ title: "Getting Started", content: study }] : []
    };
    kits = [newKit, ...kits];
    storage.set("starterKits", kits);
    renderKits();
    $("#kitTitle").value = ""; $("#kitIntro").value = ""; $("#kitStudy").value = "";
});
$("#clearKitFormBtn")?.addEventListener("click", () => {
    $("#kitTitle").value = ""; $("#kitIntro").value = ""; $("#kitStudy").value = "";
});

/* ========= Community ========= */
const cityInput = $("#localCity");
const regionInput = $("#localRegion");
if (cityInput && regionInput) {
    cityInput.value = storage.get("local.city", "LaFollette");
    regionInput.value = storage.get("local.region", "TN");
    function updateChurchesNear() {
        $("#churchesNear").textContent = `Churches Near ${cityInput.value || "…"}, ${regionInput.value || "…"}`;
    }
    updateChurchesNear();
    ["input", "change"].forEach(ev => {
        cityInput.addEventListener(ev, () => { storage.set("local.city", cityInput.value); updateChurchesNear(); });
        regionInput.addEventListener(ev, () => { storage.set("local.region", regionInput.value); updateChurchesNear(); });
    });
    $("#localRefresh")?.addEventListener("click", () => alert("In production: pull local events, churches, and services."));
}

/* Contacts */
let contacts = storage.get("contacts", []);
function renderContacts() {
    const list = $("#contactsList"); if (!list) return;
    list.innerHTML = "";
    contacts.forEach(c => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <div class="item-row">
        <strong>${c.name}</strong>
        <div class="row gap">
          <button class="btn" data-chat>Chat</button>
          <button class="btn" data-remove>Remove</button>
        </div>
      </div>
    `;
        $("[data-chat]", item).addEventListener("click", () => openChat(c.name));
        $("[data-remove]", item).addEventListener("click", () => {
            contacts = contacts.filter(x => x.id !== c.id);
            storage.set("contacts", contacts);
            renderContacts(); renderChatSidebar();
        });
        list.appendChild(item);
    });
}
renderContacts();

$("#addContactBtn")?.addEventListener("click", () => {
    const name = $("#contactName").value.trim();
    if (!name) return;
    contacts = [{ id: Date.now(), name }, ...contacts];
    storage.set("contacts", contacts);
    $("#contactName").value = "";
    renderContacts(); renderChatSidebar();
});

/* Chats */
let threads = storage.get("threads", {}); // { [contactName]: [ {id, from, text, ts} ] }
let activeChat = null;

function renderChatSidebar() {
    const side = $("#chatSidebar"); if (!side) return;
    side.innerHTML = "";
    const names = Object.keys(threads);
    if (names.length === 0) {
        side.innerHTML = `<div class="chat-item">No chats yet. Add a contact and click Chat.</div>`;
        return;
    }
    names.forEach(n => {
        const top = threads[n]?.[0]?.text || "Start the conversation";
        const div = document.createElement("div");
        div.className = "chat-item" + (activeChat === n ? " active" : "");
        div.innerHTML = `<div><strong>${n}</strong></div><div class="muted" style="font-size:12px;">${top}</div>`;
        div.addEventListener("click", () => { activeChat = n; renderChatSidebar(); renderChatMain(); });
        side.appendChild(div);
    });
}
function renderChatMain() {
    const title = $("#activeChatName");
    const msgBox = $("#chatMessages");
    if (!title || !msgBox) return;
    title.textContent = activeChat || "Select a chat";
    msgBox.innerHTML = "";
    if (!activeChat) return;
    (threads[activeChat] || []).forEach(m => {
        const d = document.createElement("div");
        d.className = "msg";
        d.innerHTML = `<div>${m.text}</div><div class="msg-meta">${m.from} • ${m.ts}</div>`;
        msgBox.appendChild(d);
    });
}
function openChat(name) {
    activeChat = name;
    if (!threads[name]) threads[name] = [];
    storage.set("threads", threads);
    renderChatSidebar(); renderChatMain();
}
renderChatSidebar(); renderChatMain();

$("#sendChatBtn")?.addEventListener("click", () => {
    const input = $("#chatInput"); if (!input) return;
    const text = input.value.trim();
    if (!activeChat || !text) return;
    const newMsg = { id: Date.now(), from: "me", text, ts: new Date().toLocaleString() };
    threads[activeChat] = [newMsg, ...(threads[activeChat] || [])];
    storage.set("threads", threads);
    input.value = "";
    renderChatMain(); renderChatSidebar();
});
$("#clearChatBtn")?.addEventListener("click", () => {
    if (!activeChat) return;
    threads[activeChat] = [];
    storage.set("threads", threads);
    renderChatMain(); renderChatSidebar();
});

/* ========= Personal Growth ========= */
const SEED_VERSES = [
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
    { ref: "John 14:27", text: "Peace I leave with you; my peace I give to you…" },
    { ref: "Isaiah 40:31", text: "Those who hope in the Lord will renew their strength…" },
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything… the peace of God…" },
    { ref: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
];
let devotionals = storage.get("devotional", SEED_VERSES);
function renderDevotionalToday() {
    const today = devotionals[new Date().getDate() % devotionals.length];
    const el = $("#devotionalToday"); if (!el) return;
    el.innerHTML = `
    <div class="muted" style="font-size:13px;">Today</div>
    <div style="font-weight:600">${today?.text || ""}</div>
    <div class="muted" style="font-size:12px;margin-top:4px">${today?.ref || ""}</div>
  `;
}
renderDevotionalToday();
$("#addDevotionalBtn")?.addEventListener("click", () => {
    const v = $("#devotionalCustom").value.trim();
    if (!v) return;
    devotionals = [{ ref: "Custom", text: v }, ...devotionals];
    storage.set("devotional", devotionals);
    $("#devotionalCustom").value = "";
    renderDevotionalToday();
});

/* Goals */
let goals = storage.get("goals", []);
function renderGoals() {
    const list = $("#goalsList"); if (!list) return;
    list.innerHTML = "";
    goals.forEach(g => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <div class="item-row">
        <label class="row gap">
          <input type="checkbox" ${g.done ? "checked" : ""} data-toggle />
          <span style="${g.done ? "text-decoration:line-through;opacity:.7" : ""}">${g.text}</span>
        </label>
        <button class="btn" data-remove>Remove</button>
      </div>
    `;
        $("[data-toggle]", item).addEventListener("change", () => {
            goals = goals.map(x => x.id === g.id ? { ...x, done: !x.done } : x);
            storage.set("goals", goals); renderGoals();
        });
        $("[data-remove]", item).addEventListener("click", () => {
            goals = goals.filter(x => x.id !== g.id);
            storage.set("goals", goals); renderGoals();
        });
        list.appendChild(item);
    });
}
renderGoals();
$("#addGoalBtn")?.addEventListener("click", () => {
    const text = $("#goalInput").value.trim();
    if (!text) return;
    goals = [{ id: Date.now(), text, done: false }, ...goals];
    storage.set("goals", goals);
    $("#goalInput").value = "";
    renderGoals();
});

/* Journal */
let journal = storage.get("journal", []);
function renderJournal() {
    const list = $("#journalList"); if (!list) return;
    list.innerHTML = "";
    journal.forEach(j => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <div class="muted"><small>${j.date}</small></div>
      <div style="white-space:pre-wrap;margin-top:6px">${j.text}</div>
      <div class="actions"><button class="btn" data-del>Delete</button></div>
    `;
        $("[data-del]", item).addEventListener("click", () => {
            journal = journal.filter(x => x.id !== j.id);
            storage.set("journal", journal);
            renderJournal();
        });
        list.appendChild(item);
    });
}
renderJournal();
$("#saveJournalBtn")?.addEventListener("click", () => {
    const text = $("#journalEntry").value.trim();
    if (!text) return;
    journal = [{ id: Date.now(), text, date: new Date().toLocaleString() }, ...journal];
    storage.set("journal", journal);
    $("#journalEntry").value = "";
    renderJournal();
});
$("#clearJournalBtn")?.addEventListener("click", () => $("#journalEntry").value = "");

/* Ministry */
let ministry = storage.get("ministry", []);
function renderMinistry() {
    const list = $("#ministryList"); if (!list) return;
    list.innerHTML = "";
    ministry.forEach(m => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <div class="item-row">
        <label class="row gap">
          <input type="checkbox" ${m.done ? "checked" : ""} data-toggle />
          <span style="${m.done ? "text-decoration:line-through;opacity:.7" : ""}">${m.text}</span>
        </label>
        <button class="btn" data-remove>Remove</button>
      </div>
    `;
        $("[data-toggle]", item).addEventListener("change", () => {
            ministry = ministry.map(x => x.id === m.id ? { ...x, done: !x.done } : x);
            storage.set("ministry", ministry); renderMinistry();
        });
        $("[data-remove]", item).addEventListener("click", () => {
            ministry = ministry.filter(x => x.id !== m.id);
            storage.set("ministry", ministry); renderMinistry();
        });
        list.appendChild(item);
    });
}
renderMinistry();
$("#addMinistryBtn")?.addEventListener("click", () => {
    const text = $("#ministryIdea").value.trim();
    if (!text) return;
    ministry = [{ id: Date.now(), text, done: false }, ...ministry];
    storage.set("ministry", ministry);
    $("#ministryIdea").value = "";
    renderMinistry();
});

/* ========= Bible Study ========= */
$("#noteDate") && ($("#noteDate").value = nowLocalDateTimeStr());
let notes = storage.get("notes", []);
function renderNotes() {
    const list = $("#notesList"); if (!list) return;
    list.innerHTML = "";
    notes.forEach(n => {
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
      <div class="muted"><small>${new Date(n.at).toLocaleString()}</small></div>
      <div style="white-space:pre-wrap;margin-top:6px">${n.text}</div>
      <div class="actions"><button class="btn" data-del>Delete</button></div>
    `;
        $("[data-del]", item).addEventListener("click", () => {
            notes = notes.filter(x => x.id !== n.id);
            storage.set("notes", notes); renderNotes();
        });
        list.appendChild(item);
    });
}
renderNotes();
$("#saveNoteBtn")?.addEventListener("click", () => {
    const at = $("#noteDate").value;
    const text = $("#noteText").value.trim();
    if (!text) return;
    notes = [{ id: Date.now(), at, text }, ...notes];
    storage.set("notes", notes);
    $("#noteText").value = "";
    renderNotes();
});
$("#clearNoteTextBtn")?.addEventListener("click", () => $("#noteText").value = "");

/* Meet & Schedule */
$("#meetStart") && ($("#meetStart").value = nowLocalDateTimeStr());
function calendarUrl() {
    const title = $("#meetTitle").value || "Bible Study";
    const start = $("#meetStart").value;
    const mins = Math.max(15, Number($("#meetMins").value) || 60);
    const dates = toGoogleCalendarDateRange(start, mins);
    const params = new URLSearchParams({ action: "TEMPLATE", text: title, details: "mybiblebelt.org study" });
    return `https://calendar.google.com/calendar/render?${params.toString()}&dates=${dates}`;
}
$("#createMeetBtn")?.addEventListener("click", () => window.open("https://meet.google.com/new", "_blank"));
$("#addCalendarBtn")?.addEventListener("click", () => window.open(calendarUrl(), "_blank"));
$("#copyInviteBtn")?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(calendarUrl()); alert("Invite link copied!"); } catch { alert("Copy failed."); }
});

/* ========= Pay it Forward ========= */
let raised = storage.get("raised", 0);
let goal = storage.get("goal", 2000);
const progressBar = $("#progressBar");
const progressLabel = $("#progressLabel");
const goalInput2 = $("#goalInput2");
if (goalInput2) goalInput2.value = goal;

function renderProgress() {
    if (!progressBar || !progressLabel) return;
    const pct = Math.min(100, Math.round((raised / Math.max(1, goal)) * 100));
    progressBar.style.width = pct + "%";
    progressLabel.textContent = `$${raised} / $${goal}`;
}
renderProgress();

$("#inc25")?.addEventListener("click", () => { raised += 25; storage.set("raised", raised); renderProgress(); });
$("#dec25")?.addEventListener("click", () => { raised = Math.max(0, raised - 25); storage.set("raised", raised); renderProgress(); });
$("#resetRaised")?.addEventListener("click", () => { raised = 0; storage.set("raised", raised); renderProgress(); });
goalInput2?.addEventListener("change", () => { goal = Math.max(100, Number(goalInput2.value) || goal); storage.set("goal", goal); renderProgress(); });

$("#donDonateBtn")?.addEventListener("click", () => {
    const amount = Math.max(1, Number($("#donAmount").value) || 1);
    const purpose = $("#donPurpose").value || "General Support";
    const url = `https://buy.stripe.com/test_1234567890abcdef?amount=${amount}&purpose=${encodeURIComponent(purpose)}`;
    window.open(url, "_blank");
});
$("#donMoreBtn")?.addEventListener("click", () => alert("In production: receipts & recurring giving"));

/* ==== Recovery: remember which steps are open & print section ==== */
(function () {
    const KEY = "recovery-open-steps-v1";
    const wrap = document.getElementById("recoverySteps");
    if (wrap) {
        try {
            const openSet = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
            wrap.querySelectorAll("details.re-step[data-step]").forEach(d => {
                const no = d.getAttribute("data-step");
                if (openSet.has(no)) d.setAttribute("open", "");
                else d.removeAttribute("open");
            });
        } catch { }
        wrap.addEventListener("toggle", () => {
            const open = [];
            wrap.querySelectorAll("details.re-step[data-step]").forEach(d => {
                if (d.open) open.push(d.getAttribute("data-step"));
            });
            try { localStorage.setItem(KEY, JSON.stringify(open)); } catch { }
        });
    }

    const printBtn = document.getElementById("recoveryPrintBtn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            const node = document.getElementById("recovery");
            if (!node) return window.print();
            const clone = node.cloneNode(true);
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
            <style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;padding:24px;} #recovery .card{page-break-inside:avoid;}</style>
          </head>
          <body></body>
        </html>
      `);
            w.document.body.appendChild(clone);
            w.document.close(); w.focus(); w.print(); w.close();
        });
    }
})();

/* ==========================================
   Recovery Signups (no backend) + Admin mode
========================================== */
(function () {
    const LS_KEY = "RECOVERY_SIGNUPS_V1";
    const HIDE_KEY = "RECOVERY_SIGNUPS_HIDDEN";
    const ADMIN_KEY = "RECOVERY_ADMIN_ON";   // sessionStorage key
    const ADMIN_PIN = ""; // Optional: "7777" to require a PIN. Leave "" for no PIN.

    const btnOpen = document.getElementById("recoverySignUpBtn");
    const btnCsv = document.getElementById("recoveryDownloadCsvBtn");
    const listEl = document.getElementById("recoverySignupList");

    const modal = document.getElementById("recoveryModal");
    const modalClose = document.getElementById("recoveryModalClose");
    const modalCancel = document.getElementById("recoveryCancel");
    const modalBackdrop = modal && modal.querySelector("[data-close-modal]");
    const form = document.getElementById("recoveryForm");

    // Admin UI
    const btnAdmin = document.getElementById("recoveryAdminBtn");
    const adminBadge = document.getElementById("recoveryAdminBadge");
    const adminBar = document.getElementById("recoveryAdminBar");
    const toggleHidePublic = document.getElementById("recoveryHidePublic");
    const btnClearAll = document.getElementById("recoveryClearAllBtn");

    if (!listEl) return;

    // State helpers
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

    // UI updates
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

    // Render table
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

    // CSV
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

    // Modal controls
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

    // Submit
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

    // Admin actions
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

    // Utils (scoped)
    function csvEscape(val) {
        if (val == null) return "";
        const s = String(val);
        return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }
    function escapeHtml(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }

    // Wire-up
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
