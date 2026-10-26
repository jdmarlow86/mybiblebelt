// Configuration for the My Bible Belt prayer request page.
// Configure the secure submission endpoint and approved-only sheet feed before accepting requests.
// Never put private response-sheet URLs, passwords, or credentials in this public file.
window.PRAYER_CONFIG = {
    // HTTPS server-side endpoint that privately stores submissions and returns JSON {"success": true}.
    // Do not use a public spreadsheet as the submission destination.
    submissionEndpoint: "https://script.google.com/macros/s/AKfycbz8tC6mdeMddfiVeYepVkwPMzdIsT9xWQzEnTU31lZNLgiCLY0tEF0v6ncChdyePQ/exec",
    // Publish an APPROVED-ONLY Google Sheets tab to the web as CSV, then paste its URL here.
    // Required headers: request, category, display name, date (public approval/publication date)
    approvedRequestsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRxc5A-55PvZ74bkH1y8W0HAYUePGMfhKkbSMgS--WoRJESt6jPQgqh92DyHnlUqMRCOJImob-vH29Z/pub?gid=0&single=true&output=csv"
};
