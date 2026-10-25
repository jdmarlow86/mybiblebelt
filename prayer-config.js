// Configuration for the My Bible Belt prayer request page.
// Configure the secure submission endpoint and approved-only sheet feed before accepting requests.
// Never put private response-sheet URLs, passwords, or credentials in this public file.
window.PRAYER_CONFIG = {
    // HTTPS server-side endpoint that privately stores submissions and returns JSON {"success": true}.
    // Do not use a public spreadsheet as the submission destination.
    submissionEndpoint: "",
    // Publish an APPROVED-ONLY Google Sheets tab to the web as CSV, then paste its URL here.
    // Required headers: request, category, display name, date (public approval/publication date)
    approvedRequestsCsvUrl: ""
};
