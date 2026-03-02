# MÄDCHEN & WOLF — Restaurant Website

Restaurant website for MÄDCHEN & WOLF in Wiener Neustadt, built with [Astro](https://astro.build) and Tailwind CSS v4.

## Commands

| Command             | Action                                        |
| :------------------ | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server at `localhost:4321`     |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview build locally before deploying        |

## Deployment

### GitHub Pages (preview)

Automatic via GitHub Actions — every push to `main` deploys to:
`https://klinge01.github.io/website-muw/`

The workflow sets `GITHUB_PAGES=true` so Astro adds the `/website-muw/` base path.

### Production (maedchenundwolf.at)

Build and upload `dist/` to your hosting provider:

```sh
npm run build
```

No special env vars needed — the default config targets the root domain.

### Other platforms (Vercel, Netlify)

Set the `SITE_URL` env var to match the deployment URL, then build normally. No `GITHUB_PAGES` variable needed since these platforms serve from root.

## Environment Variables

| Variable        | Purpose                                       | Default                         |
| :-------------- | :-------------------------------------------- | :------------------------------ |
| `SITE_URL`      | Canonical site URL for sitemap & meta tags    | `https://maedchenundwolf.at`    |
| `GITHUB_PAGES`  | Set to `true` to add `/website-muw/` base path| *(unset)*                       |
