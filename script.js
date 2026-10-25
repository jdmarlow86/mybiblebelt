// Scripture data for daily devotional
const scriptures = [
    {ref: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."},
    {ref: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want."},
    {ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me."},
    {ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end."},
    {ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."},
    {ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."},
    {ref: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest."},
    {ref: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."},
    {ref: "Joshua 1:9", text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."},
    {ref: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint."},
    {ref: "2 Corinthians 5:17", text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."},
    {ref: "Psalm 119:105", text: "Thy word is a lamp unto my feet, and a light unto my path."},
    {ref: "Hebrews 11:1", text: "Now faith is the substance of things hoped for, the evidence of things not seen."},
    {ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law."},
    {ref: "Matthew 6:33", text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you."},
    {ref: "Exodus 20:8-10", text: "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates."},
    {ref: "Isaiah 58:13-14", text: "If thou turn away thy foot from the sabbath, from doing thy pleasure on my holy day; and call the sabbath a delight, the holy of the LORD, honourable; and shalt honour him, not doing thine own ways, nor finding thine own pleasure, nor speaking thine own words: Then shalt thou delight thyself in the LORD."},
    {ref: "Revelation 14:12", text: "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus."}
];

const devotionals = [
    {
        title: "God's Unfailing Love",
        content: "God's love for us is not based on our performance but on His character. He loved us so much that He gave His only Son. Today, rest in the assurance that you are loved beyond measure, not because of what you do, but because of who He is."
    },
    {
        title: "The Shepherd's Care",
        content: "When we acknowledge the Lord as our Shepherd, we lack nothing of eternal value. He leads us beside still waters and restores our souls. In times of anxiety or want, remember that the Shepherd knows exactly what His sheep need."
    },
    {
        title: "Strength for Today",
        content: "Paul's declaration in Philippians 4:13 is not a promise of earthly success in all endeavors, but a testimony that through Christ, we can endure, overcome, and fulfill God's will. His strength is made perfect in our weakness."
    },
    {
        title: "God's Good Plans",
        content: "Jeremiah 29:11 was written to exiles in Babylon, reminding them that even in difficult circumstances, God had good plans for their future. Whatever season you're in, trust that God is working for your good and His glory."
    },
    {
        title: "Courage in His Presence",
        content: "Fear often comes from feeling alone or inadequate. But God's command to be strong and courageous is anchored in His promise: 'I am with thee.' You are not alone in your challenges. The God of the universe walks beside you."
    },
    {
        title: "The Sabbath Rest",
        content: "The Sabbath is presented in Scripture as a day of rest and worship, rooted in Creation. Genesis 2:2-3 describes God resting on the seventh day and blessing it; Exodus 20:8-11 calls people to remember the Sabbath and keep it holy."
    },
    {
        title: "Walking by Faith",
        content: "Faith is not blind optimism but confident trust in God's promises. Hebrews 11 shows us that faith believes God's word even when circumstances contradict it. Today, choose to walk by faith, not by sight."
    },
    {
        title: "The Fruit of the Spirit",
        content: "The fruit of the Spirit is the natural outflow of a life connected to Christ. We cannot manufacture these qualities by willpower; they grow as we abide in Him. Which fruit do you need to see more of in your life today?"
    }
];

// Display current date
function displayDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Load random scripture
function loadNewScripture() {
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    const scripture = scriptures[randomIndex];
    const verseRef = document.getElementById('verseRef');
    const verseText = document.getElementById('verseText');

    if (verseRef && verseText) {
        verseRef.textContent = scripture.ref;
        verseText.textContent = scripture.text;
    }
}

// Load daily devotional
function loadDevotional() {
    const devotionalText = document.getElementById('devotionalText');
    if (devotionalText) {
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const index = dayOfYear % devotionals.length;
        const devotional = devotionals[index];
        devotionalText.innerHTML = `<h4>${devotional.title}</h4><p>${devotional.content}</p>`;
    }
}

// Prayer requests use a hosted Google Form and a separately published,
// moderator-approved Google Sheets view. No requests are stored in this browser.
function configurePrayerForm() {
    const setupNotice = document.getElementById('prayerFormSetup');
    const embed = document.getElementById('prayerFormEmbed');
    const formUrl = window.PRAYER_CONFIG && window.PRAYER_CONFIG.formEmbedUrl;

    if (!setupNotice || !embed) return;

    if (formUrl && /^https:\/\/docs\.google\.com\/forms\/.*viewform/.test(formUrl)) {
        const iframe = document.createElement('iframe');
        iframe.src = formUrl;
        iframe.title = 'Submit a prayer request';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.width = '100%';
        iframe.height = '850';
        iframe.style.border = '0';
        iframe.setAttribute('allowfullscreen', '');
        embed.appendChild(iframe);
        embed.hidden = false;
        setupNotice.hidden = true;
    }
}

function parseCsv(text) {
    const rows = []; let row = []; let value = ''; let quoted = false;
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '"' && quoted && text[i + 1] === '"') { value += '"'; i++; }
        else if (ch === '"') quoted = !quoted;
        else if (ch === ',' && !quoted) { row.push(value); value = ''; }
        else if ((ch === '\n' || ch === '\r') && !quoted) {
            if (ch === '\r' && text[i + 1] === '\n') i++;
            row.push(value); if (row.some(cell => cell.trim())) rows.push(row); row = []; value = '';
        } else value += ch;
    }
    row.push(value); if (row.some(cell => cell.trim())) rows.push(row); return rows;
}

function parsePrayerDate(value) {
    if (!value) return null;
    const raw = String(value).trim();
    const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const date = iso ? new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])) : new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
}
function formatPrayerDate(date) {
    return date ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

async function loadApprovedPrayerRequests() {
    const list = document.getElementById('requestsList');
    const sortControl = document.getElementById('requestSort');
    const csvUrl = window.PRAYER_CONFIG && window.PRAYER_CONFIG.approvedRequestsCsvUrl;
    if (!list || !csvUrl || !csvUrl.startsWith('https://docs.google.com/spreadsheets/') || !csvUrl.includes('output=csv')) return;
    try {
        const response = await fetch(csvUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error('Could not load approved requests');
        const rows = parseCsv(await response.text());
        if (rows.length < 2) return;
        const headers = rows.shift().map(value => value.trim().toLowerCase());
        const ri = headers.indexOf('request'), ci = headers.indexOf('category'), ni = headers.indexOf('display name'), di = headers.indexOf('date');
        if (ri < 0) return;
        const approved = rows.map((row, index) => ({ request: row[ri] || '', category: ci >= 0 ? row[ci] : '', name: ni >= 0 ? row[ni] : '', date: di >= 0 ? parsePrayerDate(row[di]) : null, originalIndex: index })).filter(item => item.request.trim());
        function renderRequests() {
            const direction = sortControl ? sortControl.value : 'newest';
            approved.sort((a, b) => {
                if (a.date && !b.date) return -1; if (!a.date && b.date) return 1;
                if (a.date && b.date) { const delta = a.date.getTime() - b.date.getTime(); if (delta) return direction === 'oldest' ? delta : -delta; }
                return a.originalIndex - b.originalIndex;
            });
            list.replaceChildren();
            if (!approved.length) { const empty = document.createElement('p'); empty.className = 'empty-requests'; empty.textContent = 'There are no approved public prayer requests to display right now.'; list.appendChild(empty); return; }
            approved.forEach(item => {
                const card = document.createElement('article'); card.className = 'request-item';
                const request = document.createElement('p'); request.className = 'request-text'; request.textContent = '“' + item.request + '”'; card.appendChild(request);
                const parts = []; if (item.category) parts.push('Category: ' + item.category); if (item.name) parts.push('Shared by: ' + item.name); if (item.date) parts.push('Posted: ' + formatPrayerDate(item.date));
                if (parts.length) { const meta = document.createElement('p'); meta.className = 'request-meta'; meta.textContent = parts.join(' · '); card.appendChild(meta); }
                list.appendChild(card);
            });
        }
        if (sortControl) sortControl.addEventListener('change', renderRequests);
        renderRequests();
    } catch (error) { console.warn('Approved prayer requests are temporarily unavailable.'); }
}
// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayDate();
    loadNewScripture();
    loadDevotional();
    configurePrayerForm();
    loadApprovedPrayerRequests();

    // The Bible Study page's worksheet link only navigates to the standalone page.
    // Print preview is launched by the button on print-study-guide.html.
});
