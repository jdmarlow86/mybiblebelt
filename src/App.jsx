import React, { useEffect, useMemo, useState } from "react";

/**
 * mybiblebelt.org — Single-file MVP (Website + App-ready UI)
 * -----------------------------------------------------------
 * Stack: React + TailwindCSS (no external libs)
 * Notes:
 *  - Client-side routing via tabs (no backend required)
 *  - LocalStorage persistence for user data
 *  - Google Meet + Google Calendar links for real-time & scheduling
 *  - Donation page includes Stripe Checkout placeholder URL (replace later)
 *  - "Resources" includes Starter Kits with expandable studies and user-added kits
 *  - "Community" includes simple contact list + lightweight chat threads
 *  - "Personal Growth" includes Devotional, Goals, Journal, and Ministry tracker
 *  - "Bible Study" includes dated notes, Meet, and simple scheduling link creator
 *  - Mount <App /> in your root; Vite + Tailwind scaffold included
 */

// ------------------------------
// Utilities: Storage + Helpers
// ------------------------------
const storage = {
    get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch { }
    },
};

function clsx(...xs) {
    return xs.filter(Boolean).join(" ");
}

function nowLocalDateTimeStr() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function toGoogleCalendarDateRange(startISO, minutes = 60) {
    const start = new Date(startISO);
    const end = new Date(start.getTime() + minutes * 60000);
    const toCal = (dt) =>
        dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    return `${toCal(start)}/${toCal(end)}`;
}

// ------------------------------
// Seed Data
// ------------------------------
const SEED_STARTER_KITS = [
    {
        id: "baptist",
        title: "Baptist — Starter Kit",
        intro:
            "Overview of Baptist beliefs: believer's baptism, congregational governance, and emphasis on Scripture.",
        studies: [
            { title: "History & Distinctives", content: "Origins in 17th-century English Separatism; local church autonomy." },
            { title: "Baptism & Communion", content: "Believer's baptism by immersion; Lord's Supper as ordinance." },
            { title: "Study Path", content: "Read Gospel of John, Acts; explore Baptist Faith & Message." },
        ],
    },
    {
        id: "methodist",
        title: "Methodist — Starter Kit",
        intro:
            "Methodism emphasizes grace (prevenient, justifying, sanctifying), connectionalism, and practical holiness.",
        studies: [
            { title: "Wesleyan Heritage", content: "John & Charles Wesley; small groups; disciplined devotional life." },
            { title: "Grace & Discipleship", content: "Explore grace in Romans; practices of mercy and piety." },
            { title: "Study Path", content: "Gospels, Romans; Wesley's sermons; Book of Discipline overview." },
        ],
    },
    {
        id: "catholic",
        title: "Catholic — Starter Kit",
        intro:
            "Catholicism: Scripture and Tradition, sacramental life, and communion with the historic Church.",
        studies: [
            { title: "Tradition & Magisterium", content: "How teaching authority functions; ecumenical councils." },
            { title: "Sacraments", content: "Seven sacraments; grace in ordinary life; liturgical calendar." },
            { title: "Study Path", content: "Synoptic Gospels; Catechism selections; early Church Fathers." },
        ],
    },
    {
        id: "sda",
        title: "Seventh-day Adventist — Starter Kit",
        intro:
            "SDA distinctives include Sabbath observance, holistic health, and the blessed hope of Christ's return.",
        studies: [
            { title: "Sabbath & Creation", content: "Genesis 1-2; Exodus 20; rhythm of rest and worship." },
            { title: "Advent Hope", content: "Study Daniel & Revelation themes; focus on hope and mission." },
            { title: "Study Path", content: "Gospels, Hebrews; thematic studies on sanctuary & mission." },
        ],
    },
    {
        id: "pentecostal",
        title: "Pentecostal — Starter Kit",
        intro:
            "Pentecostalism highlights the work of the Holy Spirit, spiritual gifts, and vibrant worship.",
        studies: [
            { title: "Acts & the Spirit", content: "Read Acts; gifts listed in 1 Cor 12-14 and Romans 12." },
            { title: "Prayer & Worship", content: "Cultivate prayer, praise, and openness to the Spirit." },
            { title: "Study Path", content: "Gospels, Acts; resources on gifts and fruit of the Spirit." },
        ],
    },
    {
        id: "nondenom",
        title: "Non-Denominational — Starter Kit",
        intro:
            "Focus on biblical essentials, discipleship, and simple church expressions.",
        studies: [
            { title: "Core Beliefs", content: "Jesus-centered gospel; authority of Scripture; community life." },
            { title: "Practices", content: "Small groups, service, local mission, simple liturgy." },
            { title: "Study Path", content: "Gospels, Acts; read a whole Gospel; memorize key passages." },
        ],
    },
    {
        id: "judaism",
        title: "Judaism — Starter Kit",
        intro:
            "Explore Torah, Prophets, and Writings; synagogue life; cycles of prayer and festival.",
        studies: [
            { title: "Tanakh Overview", content: "Structure and themes; covenant; wisdom literature." },
            { title: "Life & Practice", content: "Shabbat, kosher, prayer services; Hebrew calendar." },
            { title: "Study Path", content: "Genesis, Exodus; Psalms; explore rabbinic commentary." },
        ],
    },
    {
        id: "islam",
        title: "Islam — Starter Kit",
        intro:
            "Overview of Qur'an, Prophetic tradition, Five Pillars, and diverse schools of thought.",
        studies: [
            { title: "Scripture & Prophethood", content: "Qur'an structure; role of hadith; prophets in Islam." },
            { title: "Five Pillars", content: "Shahada, Salat, Zakat, Sawm, Hajj; daily life rhythms." },
            { title: "Study Path", content: "Introductory surahs; biographies; comparative faith studies." },
        ],
    },
];

const SEED_VERSES = [
    { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
    { ref: "John 14:27", text: "Peace I leave with you; my peace I give to you…" },
    { ref: "Isaiah 40:31", text: "Those who hope in the Lord will renew their strength…" },
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything… the peace of God…" },
    { ref: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
];

// ------------------------------
// Shared UI
// ------------------------------
function Page({ title, subtitle, children, actions }) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>)}
                </div>
                {actions}
            </div>
            <div className="mt-6 grid gap-6">{children}</div>
        </div>
    );
}

function Card({ children, className }) {
    return (
        <div className={(["rounded-2xl shadow-sm border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 p-5", className].filter(Boolean).join(" "))}>
            {children}
        </div>
    );
}

function Input({ className, ...props }) {
    return (
        <input
            {...props}
            className={(["w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", className].filter(Boolean).join(" "))}
        />
    );
}

function Textarea({ className, ...props }) {
    return (
        <textarea
            {...props}
            className={(["w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", className].filter(Boolean).join(" "))}
        />
    );
}

function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={(["rounded-xl px-4 py-2 font-medium shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-[.99]", className].filter(Boolean).join(" "))}
        >
            {children}
        </button>
    );
}

function PrimaryButton({ children, className, ...props }) {
    return (
        <Button
            {...props}
            className={(["bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 dark:border-indigo-500", className].filter(Boolean).join(" "))}
        >
            {children}
        </Button>
    );
}

function SectionTitle({ children, className }) {
    return <h2 className={(["text-xl font-semibold tracking-tight", className].filter(Boolean).join(" "))}>{children}</h2>;
}

// ------------------------------
// Navbar + Shell
// ------------------------------
const TABS = [
    { id: "welcome", label: "Welcome" },
    { id: "resources", label: "Resources" },
    { id: "community", label: "Community" },
    { id: "growth", label: "Personal Growth" },
    { id: "study", label: "Bible Study" },
    { id: "payit", label: "Pay it Forward" },
];

// Small toggle button used in the header
function ThemeToggle({ theme, setTheme }) {
    const isDark = theme === "dark";
    return (
        <button
            type="button"
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100"
            title="Toggle dark mode"
        >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span>{isDark ? "Light" : "Dark"}</span>
        </button>
    );
}

function Shell({ active, setActive, theme, setTheme }) {
    return (
        <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/80 backdrop-blur">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4 gap-3">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold">BB</div>
                    <div>
                        <div className="text-lg font-semibold">mybiblebelt.org</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Bible-focused study • Find community • Grow daily</div>
                    </div>
                </div>
                <nav className="hidden md:flex items-center gap-1">
                    {TABS.map((t) => (
                        <Button key={t.id} onClick={() => setActive(t.id)} className={(["text-sm", active === t.id ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300" : ""].join(" "))}>
                            {t.label}
                        </Button>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <div className="md:hidden">
                        <select className="rounded-xl border px-3 py-2 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={active} onChange={(e) => setActive(e.target.value)}>
                            {TABS.map((t) => (<option key={t.id} value={t.id}>{t.label}</option>))}
                        </select>
                    </div>
                    {/* Dark mode toggle */}
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </div>
        </header>
    );
}

// ------------------------------
// Welcome Page
// ------------------------------
function WelcomePage() {
    return (
        <Page
            title="Welcome to mybiblebelt.org"
            subtitle="Bible-focused study with a warm invitation to worship in a local church of your preference."
            actions={
                <PrimaryButton onClick={() => window.open("https://www.churchfinder.com", "_blank")}>
                    Find a Local Church
                </PrimaryButton>
            }
        >
            <Card>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Our heart is to help you explore Scripture, find community, and grow daily. Whether you are just
                    beginning or continuing a lifelong journey, you are welcome here. We encourage you to visit a local
                    church—of your preference—to worship, learn, and serve alongside others.
                </p>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
                <Card>
                    <SectionTitle>Start Studying</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Open a study path that fits your background and goals.</p>
                    <div className="mt-3"><a className="text-indigo-600 dark:text-indigo-400 underline" href="#resources" onClick={(e) => { e.preventDefault(); }} data-jump="resources">Browse Starter Kits →</a></div>
                </Card>
                <Card>
                    <SectionTitle>Find Community</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Discover local info and start chats with trusted contacts.</p>
                    <div className="mt-3"><a className="text-indigo-600 dark:text-indigo-400 underline" href="#community" onClick={(e) => { e.preventDefault(); }} data-jump="community">Open Community →</a></div>
                </Card>
                <Card>
                    <SectionTitle>Grow Daily</SectionTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Devotionals, goals, journaling, and ministry ideas.</p>
                    <div className="mt-3"><a className="text-indigo-600 dark:text-indigo-400 underline" href="#growth" onClick={(e) => { e.preventDefault(); }} data-jump="growth">Go to Personal Growth →</a></div>
                </Card>
            </div>
        </Page>
    );
}

// ------------------------------
// Resources Page (Starter Kits)
// ------------------------------
function StarterKitCard({ kit }) {
    const [open, setOpen] = useState(false);
    return (
        <Card>
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{kit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{kit.intro}</p>
                </div>
                <Button onClick={() => setOpen((x) => !x)}>{open ? "Hide" : "Expand"}</Button>
            </div>
            {open && (
                <div className="mt-4 space-y-3">
                    {kit.studies?.map((s, i) => (
                        <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                            <div className="font-medium">{s.title}</div>
                            <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">{s.content}</div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}

function AddStarterKit({ onAdd }) {
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [study, setStudy] = useState("");

    const add = () => {
        if (!title.trim()) return;
        onAdd({
            id: `user-${Date.now()}`,
            title,
            intro,
            studies: study.trim()
                ? [{ title: "Getting Started", content: study }]
                : [],
        });
        setTitle("");
        setIntro("");
        setStudy("");
    };

    return (
        <Card>
            <SectionTitle>Add Your Own Starter Kit</SectionTitle>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
                <Input placeholder="Title (e.g., Lutheran — Starter Kit)" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Input placeholder="One-line intro" value={intro} onChange={(e) => setIntro(e.target.value)} />
            </div>
            <Textarea className="mt-3" rows={3} placeholder="Optional: First study content" value={study} onChange={(e) => setStudy(e.target.value)} />
            <div className="mt-3 flex gap-2">
                <PrimaryButton onClick={add}>Add Kit</PrimaryButton>
                <Button onClick={() => { setTitle(""); setIntro(""); setStudy(""); }}>Clear</Button>
            </div>
        </Card>
    );
}

function ResourcesPage() {
    const [kits, setKits] = useState(() => storage.get("starterKits", SEED_STARTER_KITS));
    useEffect(() => storage.set("starterKits", kits), [kits]);

    return (
        <Page title="Resources" subtitle="Browse a Starter Kit for many religions and denominations. Expand any study to go deeper.">
            <AddStarterKit onAdd={(kit) => setKits([kit, ...kits])} />
            <div className="grid md:grid-cols-2 gap-4">
                {kits.map((k) => (<StarterKitCard key={k.id} kit={k} />))}
            </div>
        </Page>
    );
}

// ------------------------------
// Community Page (Local info + Chats)
// ------------------------------
function LocalInfo() {
    const [city, setCity] = useState(storage.get("local.city", "LaFollette"));
    const [region, setRegion] = useState(storage.get("local.region", "TN"));
    useEffect(() => storage.set("local.city", city), [city]);
    useEffect(() => storage.set("local.region", region), [region]);

    return (
        <Card>
            <SectionTitle>Local Community</SectionTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Enter your city/region to personalize local info cards.</p>
            <div className="grid md:grid-cols-3 gap-3 mt-3">
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="State/Region" />
                <Button onClick={() => alert("In production: pull local events, churches, and services.")}>Refresh</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                    <div className="font-medium">Upcoming Events</div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">Town Hall, Food Pantry, Youth Night…</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                    <div className="font-medium">Churches Near {city}, {region}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">Baptist, Methodist, Catholic, SDA, Non-Denom…</div>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                    <div className="font-medium">Community Services</div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 mt-1">Clothing closet, counseling, shelters, tutoring.</div>
                </div>
            </div>
        </Card>
    );
}

function Contacts() {
    const [name, setName] = useState("");
    const [contacts, setContacts] = useState(() => storage.get("contacts", []));
    useEffect(() => storage.set("contacts", contacts), [contacts]);

    const add = () => {
        if (!name.trim()) return;
        setContacts([{ id: Date.now(), name: name.trim() }, ...contacts]);
        setName("");
    };
    const remove = (id) => setContacts(contacts.filter((c) => c.id !== id));

    return (
        <Card>
            <SectionTitle>Contacts</SectionTitle>
            <div className="mt-2 flex gap-2">
                <Input placeholder="Add contact name" value={name} onChange={(e) => setName(e.target.value)} />
                <PrimaryButton onClick={add}>Add</PrimaryButton>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                {contacts.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <div className="font-medium">{c.name}</div>
                        <div className="flex gap-2">
                            <Button onClick={() => startChatWith(c.name)}>Chat</Button>
                            <Button onClick={() => remove(c.id)}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function startChatWith(name) {
    window.dispatchEvent(new CustomEvent("open-chat", { detail: { contactName: name } }));
}

function ChatThreads() {
    const [threads, setThreads] = useState(() => storage.get("threads", {}));
    const [active, setActive] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => storage.set("threads", threads), [threads]);

    useEffect(() => {
        const handler = (e) => {
            const { contactName } = e.detail || {};
            if (!contactName) return;
            setActive(contactName);
            if (!threads[contactName]) {
                setThreads({ ...threads, [contactName]: [] });
            }
        };
        window.addEventListener("open-chat", handler);
        return () => window.removeEventListener("open-chat", handler);
    }, [threads]);

    const send = () => {
        if (!active || !message.trim()) return;
        const newMsg = { id: Date.now(), from: "me", text: message.trim(), ts: new Date().toLocaleString() };
        setThreads({ ...threads, [active]: [newMsg, ...(threads[active] || [])] });
        setMessage("");
    };

    const names = Object.keys(threads);

    return (
        <Card>
            <SectionTitle>Chats</SectionTitle>
            <div className="mt-3 grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <div className="rounded-xl border dark:border-gray-700 divide-y dark:divide-gray-700">
                        {names.length === 0 && <div className="p-3 text-gray-500 dark:text-gray-400">No chats yet. Add a contact and click Chat.</div>}
                        {names.map((n) => (
                            <div
                                key={n}
                                className={["p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800", active === n ? "bg-indigo-50 dark:bg-indigo-900/30" : ""].join(" ")}
                                onClick={() => setActive(n)}
                            >
                                <div className="font-medium">{n}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{(threads[n]?.[0]?.text || "Start the conversation")}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-2">
                    {!active ? (
                        <div className="text-gray-500 dark:text-gray-400">Select a chat on the left.</div>
                    ) : (
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-semibold">{active}</div>
                                <Button onClick={() => setThreads({ ...threads, [active]: [] })}>Clear</Button>
                            </div>
                            <div className="mt-3 h-64 overflow-auto rounded-xl border dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800 flex flex-col-reverse gap-2">
                                {(threads[active] || []).map((m) => (
                                    <div key={m.id} className="max-w-[80%] rounded-xl p-2 border dark:border-gray-700 bg-white dark:bg-gray-900">
                                        <div className="text-sm">{m.text}</div>
                                        <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{m.from} • {m.ts}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Input placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <PrimaryButton onClick={send}>Send</PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}

function CommunityPage() {
    return (
        <Page title="Community" subtitle="Local information and lightweight chats with your contacts.">
            <LocalInfo />
            <div className="grid md:grid-cols-2 gap-4">
                <Contacts />
                <ChatThreads />
            </div>
        </Page>
    );
}

// ------------------------------
// Personal Growth
// ------------------------------
function Devotional() {
    const [custom, setCustom] = useState("");
    const [items, setItems] = useState(() => storage.get("devotional", SEED_VERSES));
    useEffect(() => storage.set("devotional", items), [items]);
    const today = useMemo(() => items[new Date().getDate() % items.length], [items]);

    const add = () => {
        if (!custom.trim()) return;
        setItems([{ ref: "Custom", text: custom.trim() }, ...items]);
        setCustom("");
    };

    return (
        <Card>
            <SectionTitle>Daily Devotional</SectionTitle>
            <div className="mt-2 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                <div className="text-sm text-indigo-900 dark:text-indigo-300">Today</div>
                <div className="font-medium mt-1">{today?.text}</div>
                <div className="text-xs text-indigo-900/70 dark:text-indigo-300/70 mt-1">{today?.ref}</div>
            </div>
            <div className="mt-3 flex gap-2">
                <Input placeholder="Add your own devotional text" value={custom} onChange={(e) => setCustom(e.target.value)} />
                <PrimaryButton onClick={add}>Add</PrimaryButton>
            </div>
        </Card>
    );
}

function Goals() {
    const [text, setText] = useState("");
    const [goals, setGoals] = useState(() => storage.get("goals", []));
    useEffect(() => storage.set("goals", goals), [goals]);

    const add = () => {
        if (!text.trim()) return;
        setGoals([{ id: Date.now(), text: text.trim(), done: false }, ...goals]);
        setText("");
    };
    const toggle = (id) => setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
    const remove = (id) => setGoals(goals.filter(g => g.id !== id));

    return (
        <Card>
            <SectionTitle>Goals</SectionTitle>
            <div className="mt-2 flex gap-2">
                <Input placeholder="e.g., Read one chapter of John" value={text} onChange={(e) => setText(e.target.value)} />
                <PrimaryButton onClick={add}>Add</PrimaryButton>
            </div>
            <div className="mt-3 space-y-2">
                {goals.map((g) => (
                    <div key={g.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={g.done} onChange={() => toggle(g.id)} />
                            <span className={["font-medium", g.done ? "line-through text-gray-500 dark:text-gray-400" : ""].join(" ")}>{g.text}</span>
                        </label>
                        <Button onClick={() => remove(g.id)}>Remove</Button>
                    </div>
                ))}
                {goals.length === 0 && <div className="text-gray-500 dark:text-gray-400">No goals yet.</div>}
            </div>
        </Card>
    );
}

function Journal() {
    const [entry, setEntry] = useState("");
    const [items, setItems] = useState(() => storage.get("journal", []));
    useEffect(() => storage.set("journal", items), [items]);

    const add = () => {
        if (!entry.trim()) return;
        setItems([{ id: Date.now(), text: entry.trim(), date: new Date().toLocaleString() }, ...items]);
        setEntry("");
    };
    const remove = (id) => setItems(items.filter(i => i.id !== id));

    return (
        <Card>
            <SectionTitle>Journal</SectionTitle>
            <Textarea rows={4} placeholder="Write your thoughts, prayers, and reflections…" value={entry} onChange={(e) => setEntry(e.target.value)} />
            <div className="mt-2 flex gap-2">
                <PrimaryButton onClick={add}>Save Entry</PrimaryButton>
                <Button onClick={() => setEntry("")}>Clear</Button>
            </div>
            <div className="mt-3 space-y-2">
                {items.map((i) => (
                    <div key={i.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{i.date}</div>
                        <div className="mt-1 whitespace-pre-wrap">{i.text}</div>
                        <div className="mt-2"><Button onClick={() => remove(i.id)}>Delete</Button></div>
                    </div>
                ))}
                {items.length === 0 && <div className="text-gray-500 dark:text-gray-400">No entries yet.</div>}
            </div>
        </Card>
    );
}

function Ministry() {
    const [idea, setIdea] = useState("");
    const [acts, setActs] = useState(() => storage.get("ministry", []));
    useEffect(() => storage.set("ministry", acts), [acts]);

    const add = () => {
        if (!idea.trim()) return;
        setActs([{ id: Date.now(), text: idea.trim(), done: false }, ...acts]);
        setIdea("");
    };
    const toggle = (id) => setActs(acts.map(a => a.id === id ? { ...a, done: !a.done } : a));
    const remove = (id) => setActs(acts.filter(a => a.id !== id));

    return (
        <Card>
            <SectionTitle>Ministry (Pay It Forward in Action)</SectionTitle>
            <div className="mt-2 flex gap-2">
                <Input placeholder="e.g., Visit a neighbor, volunteer, write an encouragement note" value={idea} onChange={(e) => setIdea(e.target.value)} />
                <PrimaryButton onClick={add}>Add</PrimaryButton>
            </div>
            <div className="mt-3 space-y-2">
                {acts.map((a) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={a.done} onChange={() => toggle(a.id)} />
                            <span className={["font-medium", a.done ? "line-through text-gray-500 dark:text-gray-400" : ""].join(" ")}>{a.text}</span>
                        </label>
                        <Button onClick={() => remove(a.id)}>Remove</Button>
                    </div>
                ))}
                {acts.length === 0 && <div className="text-gray-500 dark:text-gray-400">No ministry items yet.</div>}
            </div>
        </Card>
    );
}

function PersonalGrowthPage() {
    return (
        <Page title="Personal Growth" subtitle="Devotional, goals, journal, and practical ministry.">
            <div className="grid md:grid-cols-2 gap-4">
                <Devotional />
                <Goals />
                <Journal />
                <Ministry />
            </div>
        </Page>
    );
}

// ------------------------------
// Bible Study
// ------------------------------
function DatedNotes() {
    const [date, setDate] = useState(() => nowLocalDateTimeStr());
    const [text, setText] = useState("");
    const [notes, setNotes] = useState(() => storage.get("notes", []));
    useEffect(() => storage.set("notes", notes), [notes]);

    const add = () => {
        if (!text.trim()) return;
        setNotes([{ id: Date.now(), at: date, text: text.trim() }, ...notes]);
        setText("");
    };
    const remove = (id) => setNotes(notes.filter(n => n.id !== id));

    return (
        <Card>
            <SectionTitle>Dated Notes</SectionTitle>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
                <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className="flex gap-2">
                    <PrimaryButton onClick={add}>Save Note</PrimaryButton>
                    <Button onClick={() => setText("")}>Clear</Button>
                </div>
            </div>
            <Textarea className="mt-2" rows={3} placeholder="Sermon notes, chapter insights, questions…" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="mt-3 space-y-2">
                {notes.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(n.at).toLocaleString()}</div>
                        <div className="mt-1 whitespace-pre-wrap">{n.text}</div>
                        <div className="mt-2"><Button onClick={() => remove(n.id)}>Delete</Button></div>
                    </div>
                ))}
                {notes.length === 0 && <div className="text-gray-500 dark:text-gray-400">No notes yet.</div>}
            </div>
        </Card>
    );
}

function MeetAndSchedule() {
    const [title, setTitle] = useState("Bible Study");
    const [start, setStart] = useState(() => nowLocalDateTimeStr());
    const [mins, setMins] = useState(60);

    const calendarUrl = useMemo(() => {
        const dates = toGoogleCalendarDateRange(start, Number(mins) || 60);
        const params = new URLSearchParams({ action: "TEMPLATE", text: title, details: "mybiblebelt.org study" });
        return `https://calendar.google.com/calendar/render?${params.toString()}&dates=${dates}`;
    }, [title, start, mins]);

    return (
        <Card>
            <SectionTitle>Meet & Schedule</SectionTitle>
            <div className="grid md:grid-cols-3 gap-3 mt-2">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
                <Input type="number" min={15} step={15} value={mins} onChange={(e) => setMins(e.target.value)} placeholder="Minutes" />
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
                <PrimaryButton onClick={() => window.open("https://meet.google.com/new", "_blank")}>Create Google Meet</PrimaryButton>
                <Button onClick={() => window.open(calendarUrl, "_blank")}>Add to Google Calendar</Button>
                <Button onClick={() => navigator.clipboard?.writeText(calendarUrl)}>Copy Invite Link</Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Tip: Paste the Meet or Calendar link into a Community chat.</p>
        </Card>
    );
}

function BibleStudyPage() {
    return (
        <Page title="Bible Study" subtitle="Keep dated notes, create a Google Meet, and set simple schedules.">
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Main content (2 columns) */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                    <DatedNotes />
                    <MeetAndSchedule />
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-4">
                    <StudyBookmarkCard />
                </aside>
            </div>
        </Page>
    );
}


// ------------------------------
// Pay It Forward
// ------------------------------
function CopyButton({ value, children = "Copy" }) {
    const [ok, setOk] = React.useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value || "");
            setOk(true);
            setTimeout(() => setOk(false), 1200);
        } catch {
            setOk(false);
            alert("Copy failed—select and copy manually.");
        }
    };
    return (
        <Button onClick={copy} className={ok ? "bg-green-600 text-white" : ""}>
            {ok ? "Copied!" : children}
        </Button>
    );
}

function Donations() {
    // --- FUNDRAISING BAR (kept from your original) ---
    const [raised, setRaised] = React.useState(() => storage.get("raised", 0));
    const [goal, setGoal] = React.useState(() => storage.get("goal", 2000));
    React.useEffect(() => storage.set("raised", raised), [raised]);
    React.useEffect(() => storage.set("goal", goal), [goal]);
    const pct = Math.min(100, Math.round((raised / Math.max(1, goal)) * 100));

    // --- PAYMENT METHODS ---
    const [method, setMethod] = React.useState(() => storage.get("pay.method", "cashapp"));
    React.useEffect(() => storage.set("pay.method", method), [method]);

    // Editable handles/addresses persisted locally
    const [pay, setPay] = React.useState(() =>
        storage.get("pay.handles", {
            cashappTag: "YourCashtag",                 // without the $
            venmoHandle: "your-venmo",                 // no @, just handle
            paypalLink: "https://paypal.me/yourname",  // full PayPal.me or checkout link
            btcAddress: "bc1qexampleexampleexample",   // your BTC address
            mailingAddress:
                "Your Name\n123 Example St\nLaFollette, TN 37766\nUnited States",
            showQR: true,
        })
    );
    React.useEffect(() => storage.set("pay.handles", pay), [pay]);

    // Helpers
    const update = (k, v) => setPay((p) => ({ ...p, [k]: v }));
    const cashAppUrl = `https://cash.app/$${encodeURIComponent(pay.cashappTag || "")}`;
    const venmoUrl = `https://venmo.com/u/${encodeURIComponent(pay.venmoHandle || "")}`;
    const paypalUrl = pay.paypalLink || "https://paypal.me/";
    const btcURI = `bitcoin:${encodeURIComponent(pay.btcAddress || "")}`;

    // Simple, dependency-free QR via external image API (optional)
    const qr = (data) =>
        `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
            data || ""
        )}`;

    return (
        <Card>
            <SectionTitle>Donate / Pay It Forward</SectionTitle>

            {/* Method selector */}
            <div className="mt-3 flex flex-wrap gap-2">
                {[
                    ["cashapp", "Cash App"],
                    ["venmo", "Venmo"],
                    ["paypal", "PayPal"],
                    ["btc", "Bitcoin (BTC)"],
                    ["mail", "Mailing Address"],
                ].map(([id, label]) => (
                    <Button
                        key={id}
                        onClick={() => setMethod(id)}
                        className={clsx(
                            "text-sm",
                            method === id
                                ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300"
                                : ""
                        )}
                    >
                        {label}
                    </Button>
                ))}
                <label className="ml-auto text-sm flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={!!pay.showQR}
                        onChange={(e) => update("showQR", e.target.checked)}
                    />
                    Show QR
                </label>
            </div>

            {/* Panels */}
            <div className="mt-4 grid md:grid-cols-2 gap-4">
                {/* Left: inputs / details */}
                <div className="space-y-3">
                    {method === "cashapp" && (
                        <>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Set your <b>Cashtag</b> (no dollar sign).
                            </div>
                            <Input
                                value={pay.cashappTag}
                                onChange={(e) => update("cashappTag", e.target.value)}
                                placeholder="YourCashtag"
                            />
                            <div className="flex flex-wrap gap-2">
                                <PrimaryButton onClick={() => window.open(cashAppUrl, "_blank")}>
                                    Open Cash App link
                                </PrimaryButton>
                                <CopyButton value={cashAppUrl}>Copy Link</CopyButton>
                                <CopyButton value={`$${pay.cashappTag || ""}`}>Copy $Cashtag</CopyButton>
                            </div>
                        </>
                    )}

                    {method === "venmo" && (
                        <>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Set your <b>Venmo handle</b> (no @).
                            </div>
                            <Input
                                value={pay.venmoHandle}
                                onChange={(e) => update("venmoHandle", e.target.value)}
                                placeholder="your-venmo"
                            />
                            <div className="flex flex-wrap gap-2">
                                <PrimaryButton onClick={() => window.open(venmoUrl, "_blank")}>
                                    Open Venmo link
                                </PrimaryButton>
                                <CopyButton value={venmoUrl}>Copy Link</CopyButton>
                                <CopyButton value={`@${pay.venmoHandle || ""}`}>Copy @Handle</CopyButton>
                            </div>
                        </>
                    )}

                    {method === "paypal" && (
                        <>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Set a full PayPal link (e.g., <code>https://paypal.me/yourname/25</code>).
                            </div>
                            <Input
                                value={pay.paypalLink}
                                onChange={(e) => update("paypalLink", e.target.value)}
                                placeholder="https://paypal.me/yourname"
                            />
                            <div className="flex flex-wrap gap-2">
                                <PrimaryButton onClick={() => window.open(paypalUrl, "_blank")}>
                                    Open PayPal link
                                </PrimaryButton>
                                <CopyButton value={paypalUrl}>Copy Link</CopyButton>
                            </div>
                        </>
                    )}

                    {method === "btc" && (
                        <>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Paste your <b>Bitcoin address</b>.
                            </div>
                            <Input
                                value={pay.btcAddress}
                                onChange={(e) => update("btcAddress", e.target.value)}
                                placeholder="bc1q…"
                            />
                            <div className="flex flex-wrap gap-2">
                                <CopyButton value={pay.btcAddress}>Copy BTC Address</CopyButton>
                                <CopyButton value={btcURI}>Copy bitcoin: URI</CopyButton>
                            </div>
                        </>
                    )}

                    {method === "mail" && (
                        <>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Enter your mailing address for checks/cash.
                            </div>
                            <Textarea
                                rows={4}
                                value={pay.mailingAddress}
                                onChange={(e) => update("mailingAddress", e.target.value)}
                                placeholder={"Your Name\n123 Example St\nCity, ST ZIP\nCountry"}
                            />
                            <div className="flex flex-wrap gap-2">
                                <CopyButton value={pay.mailingAddress}>Copy Address</CopyButton>
                                <Button onClick={() => window.print()}>Print</Button>
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Preview / QR */}
                <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                        <div className="font-medium mb-1">Share / Preview</div>
                        {method === "cashapp" && (
                            <>
                                <div className="text-sm">Link: {cashAppUrl}</div>
                                <div className="text-sm">Cashtag: ${pay.cashappTag || ""}</div>
                            </>
                        )}
                        {method === "venmo" && (
                            <>
                                <div className="text-sm">Link: {venmoUrl}</div>
                                <div className="text-sm">Handle: @{pay.venmoHandle || ""}</div>
                            </>
                        )}
                        {method === "paypal" && <div className="text-sm break-all">Link: {paypalUrl}</div>}
                        {method === "btc" && (
                            <>
                                <div className="text-sm break-all">Address: {pay.btcAddress || ""}</div>
                                <div className="text-sm break-all mt-1">URI: {btcURI}</div>
                            </>
                        )}
                        {method === "mail" && (
                            <pre className="text-sm whitespace-pre-wrap mt-1">{pay.mailingAddress}</pre>
                        )}
                    </div>

                    {pay.showQR && (method !== "mail") && (
                        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border dark:border-gray-700">
                            <div className="font-medium mb-2">QR Code (optional)</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                This uses a public QR image endpoint. Replace with your own QR generator if preferred.
                            </div>
                            <div className="grid place-items-center">
                                <img
                                    alt="QR"
                                    className="rounded-lg border dark:border-gray-700"
                                    src={qr(
                                        method === "cashapp"
                                            ? cashAppUrl
                                            : method === "venmo"
                                                ? venmoUrl
                                                : method === "paypal"
                                                    ? paypalUrl
                                                    : method === "btc"
                                                        ? btcURI
                                                        : ""
                                    )}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fundraising bar (unchanged UI, still editable) */}
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <div className="font-medium">Fundraising Progress</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        ${raised} / ${goal}
                    </div>
                </div>
                <div className="mt-2 h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden border dark:border-gray-700">
                    <div className="h-full bg-indigo-600" style={{ width: pct + "%" }} />
                </div>
                <div className="mt-3 grid md:grid-cols-3 gap-2">
                    <div className="flex gap-2 items-center">
                        <Button onClick={() => setRaised(Math.max(0, raised - 25))}>-25</Button>
                        <Button onClick={() => setRaised(raised + 25)}>+25</Button>
                        <Button onClick={() => setRaised(0)}>Reset Raised</Button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-sm">Goal:</span>
                        <Input
                            type="number"
                            min={100}
                            value={goal}
                            onChange={(e) => setGoal(Number(e.target.value) || goal)}
                        />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Use these controls while you integrate a real backend.
                    </div>
                </div>
            </div>
        </Card>
    );
}

function PayItForwardPage() {
    return (
        <Page title="Pay It Forward" subtitle="Fundraising and donations to support local ministry and platform costs.">
            <Donations />
        </Page>
    );
}

// ------------------------------
// Study Bookmark Card (Option A)
// ------------------------------
function StudyBookmarkCard() {
    // ----- Types removed for JS -----
    const LS_KEY = "studyBookmarks";

    const loadFromLocal = () => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            const data = raw ? JSON.parse(raw) : [];
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    };
    const saveToLocal = (bookmarks) => {
        localStorage.setItem(LS_KEY, JSON.stringify(bookmarks));
    };

    // Optional Electron IPC (auto-detect)
    const isElectron =
        typeof window !== "undefined" &&
        window?.electron?.ipcRenderer;

    const loadFromElectron = async () => {
        const res = await window.electron.ipcRenderer.invoke("study-bookmarks:load");
        return Array.isArray(res) ? res : [];
    };
    const saveToElectron = async (bookmarks) => {
        await window.electron.ipcRenderer.invoke("study-bookmarks:save", bookmarks);
    };

    const useElectronStorage = !!isElectron;

    const emptyForm = { title: "", schedule: "", notes: "" };
    const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

    const [bookmarks, setBookmarks] = React.useState([]);
    const [form, setForm] = React.useState(emptyForm);
    const [editingId, setEditingId] = React.useState(null);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        (async () => {
            if (useElectronStorage) {
                setBookmarks(await loadFromElectron());
            } else {
                setBookmarks(loadFromLocal());
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        (async () => {
            if (useElectronStorage) {
                await saveToElectron(bookmarks);
            } else {
                saveToLocal(bookmarks);
            }
        })();
    }, [bookmarks]); // persist whenever bookmarks change

    const filtered = React.useMemo(() => {
        const q = search.trim().toLowerCase();
        const sorted = [...bookmarks].sort((a, b) => b.updatedAt - a.updatedAt);
        if (!q) return sorted;
        return sorted.filter(
            (b) =>
                b.title.toLowerCase().includes(q) ||
                b.schedule.toLowerCase().includes(q) ||
                b.notes.toLowerCase().includes(q)
        );
    }, [bookmarks, search]);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = Date.now();

        if (editingId) {
            setBookmarks((prev) =>
                prev.map((b) => (b.id === editingId ? { ...b, ...form, updatedAt: now } : b))
            );
        } else {
            const item = {
                id: uid(),
                title: form.title.trim(),
                schedule: form.schedule.trim(),
                notes: form.notes.trim(),
                createdAt: now,
                updatedAt: now,
            };
            setBookmarks((prev) => [item, ...prev]);
        }
        resetForm();
    };

    const handleEdit = (id) => {
        const b = bookmarks.find((x) => x.id === id);
        if (!b) return;
        setForm({ title: b.title, schedule: b.schedule, notes: b.notes });
        setEditingId(id);
    };

    const handleDelete = (id) => {
        setBookmarks((prev) => prev.filter((b) => b.id !== id));
        if (editingId === id) resetForm();
    };

    return (
        <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg sm:text-xl font-semibold">Study Bookmark</h2>
                <Input
                    placeholder="Search…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-40 sm:w-56"
                />
            </div>

            {/* Add / Edit Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Title</label>
                        <Input
                            required
                            value={form.title}
                            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                            placeholder="e.g., Gospel of John — Ch. 3"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Schedule</label>
                        <Input
                            required
                            value={form.schedule}
                            onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                            placeholder="e.g., Daily 6:30 AM"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Notes</label>
                    <Textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                        placeholder="Key verses, questions, cross-references…"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <PrimaryButton type="submit">
                        {editingId ? "Update Bookmark" : "Add Bookmark"}
                    </PrimaryButton>
                    {editingId && (
                        <Button type="button" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>

            {/* List */}
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {filtered.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
                        No bookmarks yet. Add your first study above.
                    </p>
                ) : (
                    filtered.map((b) => (
                        <article key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold truncate">{b.title}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                                    Schedule: {b.schedule}
                                </p>
                                {!!b.notes && (
                                    <p className="text-sm mt-1 whitespace-pre-wrap break-words">{b.notes}</p>
                                )}
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                                    Updated {new Date(b.updatedAt).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button onClick={() => handleEdit(b.id)} className="text-amber-700 dark:text-amber-300">
                                    Edit
                                </Button>
                                <Button onClick={() => handleDelete(b.id)} className="text-red-700 dark:text-red-300">
                                    Delete
                                </Button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </Card>
    );
}


// ------------------------------
// Root App
// ------------------------------
export default function App() {
    const [active, setActive] = useState("welcome");

    // THEME (dark / light) --------------------------
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem("theme");
        if (stored) return stored;
        // fall back to OS preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        // Note: index.html head snippet can set the initial class to prevent flash
    });

    useEffect(() => {
        const html = document.documentElement;
        html.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    // -----------------------------------------------

    useEffect(() => {
        // quick jump links
        const handler = (e) => {
            const t = e.target.closest("[data-jump]");
            if (!t) return;
            const id = t.getAttribute("data-jump");
            if (id) setActive(id);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Shell active={active} setActive={setActive} theme={theme} setTheme={setTheme} />
            <main>
                {active === "welcome" && <WelcomePage />}
                {active === "resources" && <ResourcesPage />}
                {active === "community" && <CommunityPage />}
                {active === "growth" && <PersonalGrowthPage />}
                {active === "study" && <BibleStudyPage />}
                {active === "payit" && <PayItForwardPage />}
            </main>
            <footer className="mt-12 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto p-6 text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                    <div>© {new Date().getFullYear()} mybiblebelt.org</div>
                    <div className="flex gap-4">
                        <a className="hover:text-gray-700 dark:hover:text-gray-300" href="#resources" data-jump="resources">Resources</a>
                        <a className="hover:text-gray-700 dark:hover:text-gray-300" href="#community" data-jump="community">Community</a>
                        <a className="hover:text-gray-700 dark:hover:text-gray-300" href="#growth" data-jump="growth">Personal Growth</a>
                        <a className="hover:text-gray-700 dark:hover:text-gray-300" href="#study" data-jump="study">Bible Study</a>
                        <a className="hover:text-gray-700 dark:hover:text-gray-300" href="#payit" data-jump="payit">Donate</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
