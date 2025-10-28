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

/* ========= Dialogs (Prayer/Recovery) ========= */
const prayerDialog = $("#prayerDialog");
$("#btnPrayerRequest")?.addEventListener("click", () => prayerDialog?.showModal());
$("#prayerModalClose")?.addEventListener("click", () => prayerDialog?.close());
document.querySelector('[data-close-modal]')?.addEventListener("click", () => prayerDialog?.close());

const recModal = $("#recoveryModal");
$("#recoverySignUpBtn")?.addEventListener("click", () => recModal?.showModal());
$("#recoveryModalClose")?.addEventListener("click", () => recModal?.close());
$("#recoveryCancel")?.addEventListener("click", () => recModal?.close());

/* ========= CHURCH: Map + Near Me + City Search ========= */
let churchMap, churchMarkersLayer, churchCircle;
const $status = $("#churchStatus");
const $results = $("#churchResults");

function miToMeters(mi) { return Number(mi) * 1609.344; }
function metersToMiles(m) { return m / 1609.344; }
function setStatus(msg) { if ($status) $status.textContent = msg || ""; }
function clearStatus() { setStatus(""); }
function clearResults() { if ($results) $results.innerHTML = ""; }

function haversineMiles(aLat, aLng, bLat, bLng) {
    const toRad = d => d * Math.PI / 180;
    const R = 6371e3; // meters
    const dLat = toRad(bLat - aLat);
    const dLng = toRad(bLng - aLng);
    const la1 = toRad(aLat);
    const la2 = toRad(bLat);
    const sinDLat = Math.sin(dLat / 2), sinDLng = Math.sin(dLng / 2);
    const h = sinDLat * sinDLat + Math.cos(la1) * Math.cos(la2) * sinDLng * sinDLng;
    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return metersToMiles(R * c);
}

function ensureMap() {
    if (churchMap) return;
    const el = $("#churchMap");
    if (!el || typeof L === "undefined") return;

    churchMap = L.map(el).setView([36.0, -84.0], 8); // default: East TN-ish
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(churchMap);

    churchMarkersLayer = L.layerGroup().addTo(churchMap);
}

function resetMapLayers() {
    if (churchMarkersLayer) churchMarkersLayer.clearLayers();
    if (churchCircle) { churchMap.removeLayer(churchCircle); churchCircle = null; }
}

function drawSearchCircle(lat, lng, radiusMeters) {
    if (!churchMap) return;
    if (churchCircle) churchMap.removeLayer(churchCircle);
    churchCircle = L.circle([lat, lng], {
        radius: radiusMeters,
        weight: 1,
        color: "#3b5bfd",
        fillOpacity: 0.06
    }).addTo(churchMap);
}

/** Render places list + markers */
function renderPlaces(center, places) {
    clearResults();
    resetMapLayers();

    if (!places?.length) {
        setStatus("No churches found in this radius.");
        drawSearchCircle(center.lat, center.lng, 0);
        return;
    }

    const frag = document.createDocumentFragment();

    places.forEach((p, idx) => {
        const lat = p.lat ?? p.center?.lat;
        const lng = p.lon ?? p.center?.lon;
        if (typeof lat !== "number" || typeof lng !== "number") return;

        // marker
        const m = L.marker([lat, lng]).addTo(churchMarkersLayer);
        const name = p.tags?.name || "Unnamed church";
        const denomBits = [
            p.tags?.denomination,
            p.tags?.religion
        ].filter(Boolean).join(" · ");

        m.bindPopup(`<strong>${name}</strong><br>${denomBits || ""}`);

        // list item
        const dMiles = haversineMiles(center.lat, center.lng, lat, lng);
        const li = document.createElement("div");
        li.className = "card";
        li.style.cursor = "pointer";
        li.style.userSelect = "none";
        li.style.padding = "12px";

        const dirUrl = `https://www.google.com/maps?q=${encodeURIComponent(lat + "," + lng)}`;

        li.innerHTML = `
      <div class="row" style="justify-content:space-between; align-items:flex-start;">
        <div>
          <div style="font-weight:600;">${name}</div>
          <div class="muted" style="margin-top:2px;">${denomBits || "—"}</div>
          ${buildAddressLine(p.tags)}
        </div>
        <div style="text-align:right; min-width:90px;">
          <div style="font-weight:600;">${dMiles.toFixed(1)} mi</div>
          <a href="${dirUrl}" target="_blank" class="btn" style="margin-top:6px; display:inline-block;">Directions</a>
        </div>
      </div>
    `;

        li.addEventListener("click", () => {
            churchMap.setView([lat, lng], Math.max(churchMap.getZoom(), 15));
            m.openPopup();
        });

        frag.appendChild(li);
    });

    $results.appendChild(frag);
}

function buildAddressLine(tags = {}) {
    const line = [
        tags["addr:housenumber"], tags["addr:street"],
        tags["addr:city"], tags["addr:state"], tags["addr:postcode"]
    ].filter(Boolean).join(" ");
    return line ? `<div class="muted" style="margin-top:2px;">${line}</div>` : "";
}

/** Query Overpass for churches around a point */
async function fetchNearbyChurches(lat, lng, radiusMeters) {
    // Fetch nodes/ways/relations with amenity=place_of_worship (any religion),
    // then we’ll show denomination/religion if present.
    const query = `
    [out:json][timeout:25];
    (
      node(around:${Math.round(radiusMeters)},${lat},${lng})["amenity"="place_of_worship"];
      way(around:${Math.round(radiusMeters)},${lat},${lng})["amenity"="place_of_worship"];
      relation(around:${Math.round(radiusMeters)},${lat},${lng})["amenity"="place_of_worship"];
    );
    out center tags 60;
  `.trim();

    const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        body: new URLSearchParams({ data: query })
    });

    if (!res.ok) throw new Error(`Overpass error: ${res.status}`);
    const data = await res.json();
    return data.elements || [];
}

/** Geocode a city string with Nominatim */
async function geocodeCity(q) {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "json");
    url.searchParams.set("q", q);
    url.searchParams.set("limit", "1");
    const res = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
    if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
    const data = await res.json();
    return data?.[0] ? { lat: +data[0].lat, lng: +data[0].lon, display: data[0].display_name } : null;
}

async function runSearch(center, radiusMeters) {
    ensureMap();
    if (!churchMap) return;

    setStatus("Searching nearby churches…");
    clearResults();
    resetMapLayers();
    drawSearchCircle(center.lat, center.lng, radiusMeters);

    churchMap.setView([center.lat, center.lng], 13);

    try {
        const places = await fetchNearbyChurches(center.lat, center.lng, radiusMeters);
        renderPlaces(center, places);
        const count = places?.length || 0;
        setStatus(count ? `Found ${count} place(s) of worship within ${Math.round(metersToMiles(radiusMeters))} miles.` : "No results found.");
    } catch (err) {
        console.error(err);
        setStatus("Sorry—there was a problem looking up nearby churches. Please try again.");
    }
}

/* Wire up buttons */
(function initChurchUI() {
    ensureMap();
    if (!churchMap) return;

    const $radius = $("#churchRadius");
    const $search = $("#churchSearch");
    const $btnNear = $("#churchUseMyLocation");
    const $btnCity = $("#churchSearchBtn");
    const $btnClear = $("#churchClearBtn");

    // Near Me
    $btnNear?.addEventListener("click", () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser.");
            return;
        }
        setStatus("Getting your location…");
        navigator.geolocation.getCurrentPosition(async pos => {
            const { latitude: lat, longitude: lng } = pos.coords;
            const radiusMeters = miToMeters($radius?.value || 5);
            await runSearch({ lat, lng }, radiusMeters);
        }, err => {
            console.error(err);
            setStatus("Couldn’t access your location. Check permissions and try again.");
        }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
    });

    // Search City
    $btnCity?.addEventListener("click", async () => {
        const q = ($search?.value || "").trim();
        if (!q) { setStatus("Please enter a city or town."); return; }
        setStatus(`Locating “${q}”…`);
        try {
            const hit = await geocodeCity(q);
            if (!hit) { setStatus("City not found. Try a different name."); return; }
            const radiusMeters = miToMeters($radius?.value || 5);
            await runSearch({ lat: hit.lat, lng: hit.lng }, radiusMeters);
        } catch (e) {
            console.error(e);
            setStatus("Sorry—geocoding failed. Please try again.");
        }
    });

    // Clear
    $btnClear?.addEventListener("click", () => {
        clearStatus();
        clearResults();
        resetMapLayers();
        churchMap.setView([36.0, -84.0], 8);
        if ($search) $search.value = "";
    });
})();
