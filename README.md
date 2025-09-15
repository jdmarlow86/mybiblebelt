
````markdown
# mybiblebelt.org

A community-focused Bible study app and website built with **React + Vite + Tailwind CSS**.  
It includes resources for different faith backgrounds, local community tools, personal growth features, Bible study utilities, and donation tracking.

---

## ✨ Features

- **Welcome Page** – Bible-focused introduction and encouragement to connect with a local church  
- **Resources** – Starter Kits for different religions/denominations with expandable studies  
- **Community** – Local community info and lightweight contact chats  
- **Personal Growth** – Daily devotional, goal setting, journaling, and ministry tracker  
- **Bible Study** – Dated notes, Google Meet integration, and simple scheduling tools  
- **Pay It Forward** – Donation and fundraising progress tracker

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) **v18+**
- npm (comes with Node)

### 2. Clone the repository
```bash
git clone https://github.com/jdmarlow86/mybiblebelt.git
cd mybiblebelt
````

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm run dev
```

Visit: **[http://localhost:5173](http://localhost:5173)**

---

## 📦 Build for production

```bash
npm run build
npm run preview
```

* The build output goes into the `/dist` folder.

---

## 🌐 Deployment Options

### GitHub Pages

1. In `vite.config.js`, set:

   ```js
   base: '/mybiblebelt/'
   ```
2. Build the project:

   ```bash
   npm run build
   ```
3. Deploy `/dist` to GitHub Pages (via GitHub Actions or `gh-pages`).

### Vercel / Netlify

* Import the repo into [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
* Build command: `vite build`
* Output folder: `dist`

---

## 🛠 Notes

* All app data is stored in **localStorage** for demo purposes.
* Replace the **Stripe test link** in the “Pay It Forward” page with your live payment provider link when ready.
* Styling uses **Tailwind CSS** utilities — customize in `tailwind.config.js`.

---

## 📄 License

MIT (or your preferred license)

```

---

Do you want me to also make you a **GitHub Actions workflow file** (`.github/workflows/deploy.yml`) so it auto-deploys to GitHub Pages every time you push to `main`?
```
