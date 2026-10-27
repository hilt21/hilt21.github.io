# Maintenance

## Data flow

Public GitHub repositories → Pages projects → Pages API or public homepage → complete snapshot → approved project list → static HTML → native GitHub Pages build.

External sites → approved project list.

No browser-side API calls, authentication, database, analytics, cookies, or Cloudflare DNS integration are added.

## Add or edit a destination

1. Edit `data/sites.json`. Use a unique lowercase slug, an HTTPS URL, category `rail`, `ai`, `lab`, or `about`, and an explicit `visible` value.
2. Add `repo` only for an owned public repository. The discovered Pages URL overrides its manual URL when available.
3. For a restricted destination, set `access: "需授权"`. An HTTP 200 after a login redirect does not prove public access or application health.
4. Featured entries require an `eyebrow` and one existing `visual`: `brake`, `lexicon`, or `effects`. The diagram is original conceptual artwork, not an engineering schematic.
5. Run `npm test`, `npm run build`, and `npm run check`. Review the page at desktop and phone widths before pushing.
6. Update the route-map destination anchors in `scripts/art.mjs` if replacing a featured destination.

## Refresh errors

Inspect the `Refresh project index` workflow. API errors record HTTP status and rate-limit headers without credentials. A Pages API 404 falls back only to a valid public repository homepage; 403, 429, invalid responses, and missing URL sources fail the complete sync. The previous snapshot remains in place.

The final workflow step marks discovery failures even if cached content publishes successfully. Repair the upstream issue, then manually run the workflow. Do not delete the existing snapshot as a recovery step.

## Publication

GitHub Pages source: branch `main`, folder `/`. This version uses native branch builds, including an explicit `POST /repos/{owner}/{repo}/pages/builds` after the bot refresh. Keep the repository's root custom domain unset to preserve project sites' existing URL structure.

Rollback: revert the change on `main`; the workflow regenerates from the reverted sources. To preserve a previous data snapshot, restore `data/discovered.json` in the same revert. A working native Pages build is the deployment acceptance signal.

## Design and accessibility

All project links are rendered as HTML. JavaScript progressively enables search, category filters, counts, reset, `/` search shortcut, Escape clearing, and scroll-to-top. The interactive SVG map uses native links. Focus styling, a skip link, screen-reader labels, and `prefers-reduced-motion` are provided. Animations carry no essential information.

DM Sans is self-hosted with its OFL license and `font-display: swap`; Chinese uses the system font stack. There are no runtime Google Fonts requests. Static route art, design primitives, and project cards are authored in the repository. There is no dependency on a screenshot service or generated raster illustration.
