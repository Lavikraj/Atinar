# ATINAR Frontend Web Portal – Deployment & Contribution Guide
<img width="157" height="40" alt="image" src="https://github.com/user-attachments/assets/6226eb9e-6624-434a-8b1d-8d7e2fe48c53" />

Welcome to the official frontend repository of **ATINAR** – a tech-first startup building sustainable and scalable solutions across industries.

This document is intended for **internal developers, designers, and collaborators** working on the ATINAR public website. It outlines the structure, tech stack, contribution practices, and deployment procedures to ensure consistency and quality across all environments.

---

## 📌 Overview

This static site showcases ATINAR’s brand identity and tech vision. It is designed with:

- ⚡ Performance-first principles  
- 🧩 Modular, scalable code  
- 🎨 Visual consistency and responsive UI  
- 🧠 SEO and accessibility considerations  

---

## 🧱 Tech Stack

| Layer        | Technology           |
|--------------|----------------------|
| Markup       | HTML5                |
| Styling      | Tailwind CSS         |
| Animations   | CSS / Framer Motion  |
| Scripts      | Vanilla JavaScript   |
| Assets       | Optimized SVGs + WebP|
| Design Ref   | Figma                |

Optional future integration: React / Vite for dynamic capabilities.

---

## 📁 Folder Structure

```
atinar-frontend/
├── index.html
├── /assets
│   ├── images/
│   └── icons/
├── /styles
│   └── main.css
├── /scripts
│   └── app.js
└── README.md
```

---

## 🛠️ Setup Instructions

Clone the repository and initialize the project:

```bash
git clone https://github.com/atinar/atinar-frontend.git
cd atinar-frontend
```

If using Node-based tooling:

```bash
npm install
```

Launch a live server (if applicable):

```bash
npx live-server
```

For Tailwind users, compile your styles (if not using CDN):

```bash
npx tailwindcss -i ./styles/main.css -o ./dist/output.css --watch
```

---

## 🚀 Deployment Workflow

ATINAR deploys using an internal CI/CD pipeline that auto-deploys on version tags.

### 🔁 Development to Production Flow

```bash
# Step 1: Create a feature branch
git checkout -b feature/<brief-feature-name>

# Step 2: Make code changes
# (edit HTML, CSS, JS, etc.)

# Step 3: Stage and commit changes
git add .
git commit -m "feat: improved hero animation on landing"

# Step 4: Push the branch
git push origin feature/<brief-feature-name>

# Step 5: Open a Merge Request (MR) on GitHub

# Step 6: After review & merge, tag the release
git checkout main
git pull origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```

Once tagged, the CI/CD service deploys to:

- **Staging**: `https://staging.atinar.in`
- **Production**: `https://www.atinar.in`

---

## 🔍 Pre-Deployment QA Checklist

Before tagging a release:

- [ ] ✅ Layout tested on mobile, tablet, and desktop
- [ ] ✅ No uncompressed images or unused files
- [ ] ✅ Responsive behavior validated (scrolls, hover, collapse)
- [ ] ✅ Lighthouse score ≥ 90 on Performance, SEO, Accessibility
- [ ] ✅ Navigation and buttons are functional
- [ ] ✅ All assets referenced relatively: `./assets/...`
- [ ] ✅ No hardcoded credentials or keys in code

---

## 🎯 Production Quality Targets

| Metric            | Target                            |
|-------------------|-----------------------------------|
| First Load Size   | ≤ 100 KB                          |
| Load Time (3G)    | ≤ 2.5s                            |
| Accessibility     | WCAG 2.1 Level AA                 |
| Compatibility     | Last 2 versions of major browsers |
| Visual Identity   | Matches latest Figma specs        |

---

## 🧪 Testing Tips

Use the following tools:

```bash
# Run Lighthouse Audit in Chrome DevTools

# Image optimization (optional)
npx imagemin ./assets/images/* --out-dir=./assets/images/
```

---

## 🔐 Security & Configuration

- Never commit `.env`, API keys, or credentials.
- Config vars (if needed) go in a `env.config.js` file (excluded from git).
- All production keys are stored in ATINAR Vault (ask DevOps team).

---

## 🧑‍💻 Developer Etiquette

- Use semantic commit messages:
  - `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.
- Keep PRs small and atomic.
- Avoid unnecessary dependencies.
- Prefer Tailwind utility classes over custom CSS where possible.
- All contributions must pass manual responsiveness checks.

---

## 📅 Last Updated

**August 2025**  
Maintained by the ATINAR Web Engineering Team.

---
