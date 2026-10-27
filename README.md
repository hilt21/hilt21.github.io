# Lu Tao · Project Atlas

A curated, automatically refreshed project index at **https://hilt21.github.io/**.

An editorial interface for rail engineering, AI systems, and creative experiments. Warm paper, cobalt blue, large typography, original animated SVGs, and an interactive route map. Static HTML first; navigation works without JavaScript.

## Develop

Requires Node.js 22+. No package installation or production JavaScript dependencies.

```sh
npm test
npm run sync
npm run build
npm run check
```

`index.html`, `assets/`, `robots.txt`, and `sitemap.xml` are served from the repository root by GitHub Pages. `dist/` is an ignored copy for local previews. Always edit `scripts/build.mjs`, `scripts/art.mjs`, `assets/`, or `data/sites.json`; `index.html` is generated.

## Curation and automatic discovery

- `data/sites.json`: approved destinations, descriptions, ordering, category, featured status, and access labels. Set `visible: false` to hide an entry. The `repo` field links a curated entry to discovered metadata.
- `data/discovered.json`: last complete discovery snapshot and unlisted candidates. It currently discovers four public Pages projects; Quiz410 is pending curation.
- Public repository listing only. Private, forked, archived, and root navigation repositories are excluded.
- Pages API supplies the published URL when accessible. A 404 may mean insufficient cross-repository Pages permissions; a valid public repository homepage is the fallback, recorded as `urlSource: repository-homepage`. Without either source, synchronization fails rather than inventing an address.
- Discovery does not automatically publish a new destination. Approve it in `data/sites.json` with suitable copy and visibility.
- External sites are explicitly curated. Cloudflare DNS inventory is not connected in this version.
- Any incomplete API run preserves the entire previous snapshot. Builds continue from that snapshot and the workflow reports failure after publication.
- Cross-repository discovery uses the public API. No PAT is required. The repository-scoped Actions token is used only for this repository's commit and Pages rebuild.

## Refresh and deployment

`.github/workflows/refresh.yml` runs on main pushes, manual dispatch, and daily at **08:25 Asia/Shanghai (00:25 UTC)**. GitHub schedules are best effort.

It tests, discovers, builds, checks, commits the generated HTML/snapshot, then requests a native Pages rebuild. GitHub Pages must publish from `main` / root. The explicit rebuild is necessary because commits made using `GITHUB_TOKEN` do not trigger another workflow. The bot commit cannot recursively run this workflow.

See [maintenance](docs/MAINTENANCE.md) and [verification](docs/QA.md) for current operating boundaries and evidence.
