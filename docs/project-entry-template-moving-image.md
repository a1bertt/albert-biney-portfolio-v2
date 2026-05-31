# Moving Image Project Entry Template

Use this template when adding a moving-image project to `src/content/projects/`.

```md
---
title: "Example Film"
slug: "example-film"
year: "2026"
category: "moving-image"
sortOrder: 1

coverImage: "https://media.albertbiney.com/moving/example-film/poster.jpg"

# Optional
images:
  - "https://media.albertbiney.com/moving/example-film/poster.jpg"

videos:
  - title: "Example Film"
    previewUrl: "https://media.albertbiney.com/moving/example-film/preview.mp4"
    fullVideoUrl: "https://media.albertbiney.com/moving/example-film/full.mp4"
    posterImage: "https://media.albertbiney.com/moving/example-film/poster.jpg"

seo:
  title: "Example Film | Albert Biney"
  description: "A short description of the moving-image project."
  ogImage: "https://media.albertbiney.com/moving/example-film/poster.jpg"
---

Optional project notes can go here.
```

## Instructions

1. Export the poster image, preview video, and full video outside the repository.
2. Upload the files to R2 under `/moving/[project-slug]/`.
3. Copy the public URLs from `https://media.albertbiney.com`.
4. Duplicate this template into `src/content/projects/[slug].md`.
5. Update the project metadata, video URLs, poster image, SEO fields, and `sortOrder`.
6. Keep final video and image files out of GitHub.
7. Run `npm run build`.
