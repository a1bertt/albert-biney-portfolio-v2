# Stills Project Entry Template

Use this template when adding a stills project to `src/content/projects/`.

```md
---
title: "Example Project"
slug: "example-project"
year: "2026"
category: "stills"
sortOrder: 1

coverImage: "https://media.albertbiney.com/stills/example-project/cover.jpg"

# Optional
client: "Example Client"

# Optional
credits:
  - role: "Photography"
    name: "Albert Biney"

images:
  - "https://media.albertbiney.com/stills/example-project/01.jpg"
  - "https://media.albertbiney.com/stills/example-project/02.jpg"

seo:
  title: "Example Project | Albert Biney"
  description: "A short description of the stills project."
  ogImage: "https://media.albertbiney.com/stills/example-project/cover.jpg"
---

Optional project notes can go here.
```

## Instructions

1. Upload images to R2.
2. Copy URLs.
3. Duplicate this template into `src/content/projects/[slug].md`.
4. Update metadata.
5. Run `npm run build`.
