# Stills Project Entry Template

Use this template when adding a stills project to `src/content/projects/`.

```md
---
title: "Example Project"
slug: "example-project"
year: "2026"
category: "stills"
sortOrder: 1

coverImage: "/media/stills/example-project/cover.jpg"

# Optional
client: "Example Client"

# Optional
credits:
  - role: "Photography"
    name: "Albert Biney"

images:
  - "/media/stills/example-project/01.jpg"
  - "/media/stills/example-project/02.jpg"

seo:
  title: "Example Project | Albert Biney"
  description: "A short description of the stills project."
  ogImage: "/media/stills/example-project/cover.jpg"
---

Optional project notes can go here.
```

## Instructions

1. Add images to `public/media/stills/[slug]/`.
2. Use direct `/media/stills/[slug]/...` paths in the project entry.
3. Duplicate this template into `src/content/projects/[slug].md`.
4. Update metadata.
5. Run `npm run build`.
