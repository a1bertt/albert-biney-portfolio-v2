# Moving Image Project Entry Template

Use this template when adding a moving-image project to `src/content/projects/`.

```md
---
title: "Example Film"
slug: "example-film"
year: "2026"
category: "moving-image"
sortOrder: 1

coverImage: "/media/moving/example-film/cover.jpg"

# Optional
images:
  - "/media/moving/example-film/cover.jpg"

videos:
  - title: "Example Film"
    previewUrl: "/media/moving/example-film/preview.mp4"
    fullVideoUrl: "/media/moving/example-film/full.mp4"
    posterImage: "/media/moving/example-film/cover.jpg"

seo:
  title: "Example Film | Albert Biney"
  description: "A short description of the moving-image project."
  ogImage: "/media/moving/example-film/cover.jpg"
---

Optional project notes can go here.
```

## Instructions

1. Export the poster image, preview video, and full video.
2. Add the files to `public/media/moving/[project-slug]/`.
3. Use direct `/media/moving/[project-slug]/...` paths in the project entry.
4. Duplicate this template into `src/content/projects/[slug].md`.
5. Update the project metadata, video URLs, poster image, SEO fields, and `sortOrder`.
6. Keep file names predictable and lowercase.
7. Run `npm run build`.
