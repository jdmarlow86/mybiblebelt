# My Bible Belt Prayer Request Setup

The prayer page is a static GitHub Pages site. It must not collect submissions into browser storage: browser storage is local to one visitor and is not a private inbox. The page now expects a hosted Google Form and a public feed containing only requests a moderator has explicitly approved.

## 1. Create the private submission form

1. Sign in to the Google account that will administer prayer requests and create a Google Form.
2. Add these fields:
   - **Name (optional)** — short answer.
   - **Prayer request** — paragraph, required.
   - **Category** — multiple choice or dropdown with Healing, Guidance, Family, Thanksgiving, Spiritual Growth, and Other.
   - **Sharing preference** — required multiple choice with exactly these choices:
     - **Private — keep this request off the public prayer board**
     - **Public — I give permission for this request to be considered for public display after review**
3. Explain that public requests are never posted automatically and must be explicitly approved. A Public choice is permission to consider publication, not a guarantee that it will be published.
4. In Form settings, do not collect email addresses unless you have a clear need and explain it to submitters. Do not allow respondents to view response summaries.
5. Set the form confirmation message to an encouraging note such as: “Thank you for sharing your prayer request. Your request has been submitted. If you chose Private, it will remain off the public prayer board. If you chose Public, it will only be displayed if reviewed and explicitly approved. May you find comfort in God’s promise: ‘Casting all your care upon him; for he careth for you’ (1 Peter 5:7).”
6. In **Responses**, link the form to a Google Sheet. Keep this response spreadsheet private; do not publish it to the web or share it publicly.
7. In Google Forms, use **Send → Embed HTML** and copy the URL inside the iframe `src` attribute. It should be a Google Forms `viewform` URL.

## 2. Create a separate public spreadsheet for approved requests

Use a **different spreadsheet** from the private form responses. This reduces the risk of accidentally exposing unreviewed requests or names.

1. Create a spreadsheet named something like **My Bible Belt — Approved Prayer Requests**.
2. Add a header row with these exact column names:
   - `request`
   - `category`
   - `display name`
   - `date` — date approved for public posting, formatted as `YYYY-MM-DD`
3. Review each request privately. Only requests marked Public in the form and explicitly approved by you may be copied into this separate public spreadsheet. Never copy requests marked Private. Put a name in `display name` only if you deliberately want it shown; otherwise leave it blank or use “Anonymous”.
4. Never put private or unapproved requests, submitter email addresses, original submission timestamps, internal notes, or moderation status in this public spreadsheet. The `date` field is the public posting/approval date, not the private submission timestamp.
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
- The website reads only the published CSV feed and does not provide an admin dashboard or moderation buttons. Approval is performed by manually copying reviewed, Public-preference requests into the separate public spreadsheet. The board can sort by “Newest first” or “Oldest first” using the public posting date. Private submissions must never be copied into the public sheet.
- Do not put credentials, private response-sheet URLs, or secrets in `prayer-config.js`; it is a public file.
- Avoid collecting highly sensitive personal details. A public prayer request can be copied or shared by visitors even if later removed.
