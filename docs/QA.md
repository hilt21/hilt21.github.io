# Verification record

Date: 2026-10-27 (Asia/Shanghai).

## Automated checks completed

- Six Node tests: HTTPS and credential rejection, escaping, curated visibility and deduplication, public-only discovery, partial-response rejection, pagination, and cross-repository Pages 404 fallback.
- Static integrity: all nine approved destinations rendered, a single H1, required assets and SEO files, no Hello World content or script URLs.
- A complete live GitHub discovery succeeded: four eligible Pages repositories. Quiz410 is a hidden candidate; three Pages sites already belong to the approved catalog.
- Nine destination HTTP checks reached 200 responses. EM-Brake and AI-MLS redirect to Cloudflare Access; both are labeled `需授权`. HTTP checks do not validate authenticated application functions.

## Browser checks completed

Cloud Chromium, local managed preview:

- Desktop viewport approximately 1348 × 926: hero composition, map, featured SVGs, cards, and directory reviewed visually.
- Native 390px iframe viewport: responsive hero and mobile layout reviewed. Content width and scroll width both 375px with the browser's 15px scrollbar, so no horizontal overflow.
- AI filter shows 4/9 projects. Rail filter shows 2/9 projects on the phone layout.
- Unmatched search shows the empty state and 0/9 results. Reset restores 9/9.
- Native project links and CTA anchors are present and usable.
- Console capture contained browser-extension metadata errors; no application-origin script error was observed in that capture.

## Boundaries

- Responsive checks use real nested browser viewports, not physical iOS or Android devices.
- Reduced motion and no-JavaScript navigation are implemented and source-checked; OS-level reduced-motion emulation and disabled-JavaScript browser sessions have not been exercised.
- Restricted project authentication and application functions are out of scope.
## Hosted deployment evidence

- Source commit: `474ecb61f6688ee4a160f1e6a04e19323b176763`.
- First refresh workflow: https://github.com/hilt21/hilt21.github.io/actions/runs/40457233348, all applicable steps passed. This includes real discovery, generated snapshot commit, and explicit native Pages rebuild request.
- The Actions runner successfully read actual Pages URLs for all four discovered projects (`urlSource: pages-api`). The local unauthenticated check exercised the homepage fallback.
- Native Pages deployment succeeded: https://github.com/hilt21/hilt21.github.io/actions/runs/40457249890.
- Cloud browser opened https://hilt21.github.io/ and rendered the new project atlas successfully.
- Clicking the featured State of Rail card reached the public research station; its loaded content showed the current published evidence matrix and monitoring data.
- Additional 320px viewport has matching content and scroll widths of 305px. The narrow headline was adjusted to retain its intended two-line composition.

Future scheduled execution is configured; only the initial push-triggered execution has been observed.
