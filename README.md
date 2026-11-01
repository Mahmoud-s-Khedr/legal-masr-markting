# legal-masr-marketing

This project is an intermediate Astro migration of the existing Legal Masr landing page. Astro owns the public page routes; the existing React app is server-rendered into HTML and hydrated on the client to preserve its current interactions. The existing React components, CSS, assets, translations, and animation code have been retained.

## Requirements

Use a Node.js version supported by the current Astro release (Node.js 22.12.0+ is recommended).

## Install and run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Important migration notes

- Only `.astro` files live in `src/pages`; the original React page components are in `src/react-pages` to avoid Astro page-discovery warnings.
- The homepage and `/how-to-use` are Astro-generated pages. The React app is server-rendered for initial HTML and then hydrated to preserve existing interactions. This is an intermediate migration: the entire React application still hydrates, so it does not yet achieve Astro's smallest-JavaScript approach.
- The existing language selector still changes language on the current URL. For strong bilingual SEO, the next phase should create separate Arabic and English URLs, render each locale independently, and add reciprocal `hreflang` tags.
- Confirm canonical URLs once the production domain is finalized; they are intentionally not hard-coded here.
- The Feedback route remains disabled as in the source project.
- `package.json` pins the Vite major version to 7 through npm overrides because Astro 6 requires Vite 7. Reinstall dependencies after extracting this archive.
- Verify the visual design and all interactions in a local browser before deploying.
