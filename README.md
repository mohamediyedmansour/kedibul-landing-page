# Kedibul Landing Page

Responsive React/Vite landing page for Kedibul, Istanbul's stray cat safety network.

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The generated site is written to `dist/`. It is intentionally ignored by Git because
the GitHub Pages workflow builds and publishes it automatically.

## GitHub Pages

Pushes to `main` trigger [the Pages workflow](./.github/workflows/deploy-pages.yml).
It builds the React app and deploys the generated `dist/` folder to GitHub Pages.

After the first successful workflow run, enable **GitHub Pages → GitHub Actions**
in the repository settings if GitHub has not enabled it automatically.
