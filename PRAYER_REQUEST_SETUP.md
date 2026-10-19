# My Bible Belt Prayer Request Setup

The prayer page is a static GitHub Pages site. It must not collect submissions into browser storage: browser storage is local to one visitor and is not a private inbox. The page now expects a hosted Google Form and a public feed containing only requests a moderator has explicitly approved.

## 1. Create the private submission form

1. Sign in to the Google account that will administer prayer requests and create a Google Form.
2. Add these fields:
   - **Name (optional)** — short answer.
   - **Prayer request** — paragraph, required.
   - **Category** — multiple choice or dropdown with Healing, Guidance, Family, Thanksgiving, Spiritual Growth, and Other.
3. In Form settings, do not collect email addresses unless you have a clear need and explain it to submitters. Do not allow respondents to view response summaries.
4. Add a short notice that submissions are received privately and may be published only after a reviewer approves them. Ask people not to submit sensitive personal information about themselves or others.
5. In **Responses**, link the form to a Google Sheet. Keep this response spreadsheet private; do not publish it to the web or share it publicly.
6. In Google Forms, use **Send → Embed HTML** and copy the URL inside the iframe's `src` attribute. It should be a Google Forms `viewform` URL.

## 2. Create a separate public spreadsheet for approved requests

Use a **different spreadsheet** from the private form responses. This reduces the risk of accidentally exposing unreviewed requests or names.

1. Create a spreadsheet named something like **My Bible Belt — Approved Prayer Requests**.
2. Add a header row with these exact column names:
   - `request`
   - `category`
   - `display name`
3. For every incoming request, review it privately first. If and only if you explicitly approve it for public display, manually copy the approved text and category into this separate public spreadsheet. Put a name in `display name` only if you deliberately want it shown; otherwise leave it blank or use “Anonymous”.
4. Never put unapproved requests, submitter email addresses, timestamps, internal notes, or moderation status in this public spreadsheet.
5. In that public spreadsheet, use **File → Share → Publish to web**. Select only the approved-requests sheet/tab, choose CSV format, and publish. Copy the published CSV URL. Do not publish the private response spreadsheet.

Publishing makes the approved entries public to anyone who can access the page or published feed. Only put content there that you are comfortable sharing publicly.

## 3. Configure the website

Edit `prayer-config.js` in the GitHub repository:

- Set `formEmbedUrl` to the Google Forms `viewform` URL copied from the embed iframe's `src`.
- Set `approvedRequestsCsvUrl` to the published CSV URL for the **separate approved-only spreadsheet**.

Commit the file to the `main` branch. GitHub Pages will redeploy the site. Test the prayer page on your phone and desktop.

## 4. Test before announcing it

- Submit a test request through the embedded form and confirm it appears in the **private** responses spreadsheet.
- Confirm the request does **not** appear on the public website automatically.
- Copy a test request into the separate approved spreadsheet only after deciding to approve it; verify it appears publicly after the feed refreshes.
- Remove the test request from both sheets when finished.
- Confirm no email addresses, private notes, or unapproved text are present in the published spreadsheet.

## Important limitations

- Google Forms and Sheets are separate Google services; this repository cannot create or configure them inside your Google account. You must create the form and spreadsheets and supply their URLs.
- The website reads only the published CSV feed and does not provide an admin dashboard or moderation buttons. Approval is performed by manually copying reviewed requests into the separate public spreadsheet.
- Do not put credentials, private response-sheet URLs, or secrets in `prayer-config.js`; it is a public file.
- Avoid collecting highly sensitive personal details. A public prayer request can be copied or shared by visitors even if later removed.
