# Cloudflare R2 Media Workflow

Cloudflare R2 is the source of truth for all website media. The production delivery origin is:

```text
https://media.albertbiney.com/stills/project-name/01.jpg
```

Local source media may be staged temporarily under `public/` before synchronization, but it must not be deployed or committed as the production media source.

The synchronization mapping is:

```text
public/images/stills/project-name/01.jpg
```

maps to:

```text
stills/project-name/01.jpg
```

in the `albert-biney-media` R2 bucket. Moving-image assets map from `public/moving/` to `moving-images/`.

## Rules

- Use absolute `https://media.albertbiney.com/...` URLs in content entries.
- Keep project slugs, filenames, ordering, and content field names stable.
- Run `npm run sync-r2-media` after staging new or changed assets locally.
- Remove staged media from Git before publishing the site.
- Keep `public/CNAME` in GitHub Pages; it is site configuration, not portfolio media.

## Update Workflow

1. Stage stills under `public/images/stills/[project]/` and moving assets under `public/moving/[project]/`.
2. Run `npm run sync-r2-media`.
3. Verify the corresponding Cloudflare URL.
4. Update the project content entry with the absolute Cloudflare URL.
5. Remove the staged local media before committing.
