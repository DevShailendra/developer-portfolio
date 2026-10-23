# Shailendra Dwivedi — Developer Portfolio

A responsive React + Vite portfolio with a light-first design, optional dark mode, project filters, GitHub repository preview, experience, education and a contact form that prepares an email in the visitor's default email app.

## Requirements

- Node.js 20 LTS or later
- Git
- GitHub account: `DevShailendra`

## 1. Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## 2. Personalize before publishing

Open `src/main.jsx` and update the `PROFILE` object:

- `email`: your public/professional contact email. This is needed for the contact action.
- `linkedin`: replace the generic LinkedIn URL with your actual profile URL.
- `resume`: after adding your resume as `public/resume.pdf`, set this to `./resume.pdf`.
- Confirm all project descriptions, dates, skills and education details before publishing.

The contact form currently validates its fields and opens a prefilled `mailto:` draft. It does **not** send or store messages by itself. For a true web-submitted form, connect a service such as Formspree or EmailJS and follow its current setup instructions; never put private API keys in client-side source code.

The GitHub repository panel calls GitHub's public REST API in the visitor's browser. If the API is unavailable or rate-limited, the rest of the portfolio remains usable and the GitHub profile link still works.

## 3. Publish to GitHub Pages

### Option A — recommended: use a dedicated repository

1. Create a **new, empty public repository** on GitHub named `developer-portfolio` under `DevShailendra`.
2. In `vite.config.js`, keep `base: '/developer-portfolio/'` (it is already configured for this repository name).
3. In the project directory, run:

   ```bash
   git init
   git add .
   git commit -m "Build developer portfolio"
   git branch -M main
   git remote add origin https://github.com/DevShailendra/developer-portfolio.git
   git push -u origin main
   ```

4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select **GitHub Actions**.
6. Add the workflow file below as `.github/workflows/deploy.yml`, commit and push it.
7. Wait for the Actions workflow to finish. The site should be available at:
   `https://devshailendra.github.io/developer-portfolio/`

### GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy portfolio to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

GitHub's supported action versions and Pages settings can change; check the current GitHub Pages documentation if GitHub prompts you to update the workflow.

### Option B — use `DevShailendra.github.io`

If you want the clean URL `https://devshailendra.github.io/`, create the repository with the exact name `DevShailendra.github.io`, then change `base` in `vite.config.js` to `/`. Use the same GitHub Actions steps above.

## 4. Verify before sharing

- `npm run build` completes without errors.
- The website loads on desktop and mobile.
- Project source links point to the right repositories.
- Contact email, LinkedIn and resume links have been configured.
- GitHub Actions succeeds and the deployed URL loads.
- Review career dates and mark concept projects as planned until they are implemented.

## Structure

```text
developer-portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── (add resume.pdf here)
└── src/
    ├── main.jsx
    └── styles.css
```
