# Moving Image Project Entry Template

Use this template when adding a moving-image project to `src/content/projects/`.

## Folder Structure

Create the project media folder here:

```text
public/moving/[project-name]/
```

Recommended files:

```text
cover.jpg
thumbnail.jpg
preview.mp4
full.mp4
```

The script creates optimised site assets in:

```text
public/moving/[project-name]/proxies/
```

Minimum useful setup:

```text
cover.jpg
```

Use `cover.jpg` as the project card image and poster unless the project needs a separate `thumbnail.jpg`.

Use `.mp4` for website video files where possible. The script accepts `.mov`, but `.mp4` is preferred because it is more reliable for browser playback. If both `preview.mp4` and `preview.mov` exist, the script uses `preview.mp4`.

## Content File

Create:

```text
src/content/projects/moving-[project-name].md
```

Or generate it after adding media files with:

```sh
npm run create-moving-project -- [project-name] --title "Project Title" --year 2026 --sort-order 3
```

```md
---
title: "Example Film"
slug: "moving-example-film"
year: "2026"
category: "moving-image"
sortOrder: 1

coverImage: "/moving/example-film/proxies/cover.jpg"

# Optional supporting stills only. Do not include cover.jpg or thumbnail.jpg.
images: []

videos:
  - title: "Example Film"
    previewUrl: "/moving/example-film/proxies/preview.mp4"
    fullVideoUrl: "/moving/example-film/proxies/full.mp4"
    posterImage: "/moving/example-film/proxies/cover.jpg"

seo:
  title: "Example Film | Albert Biney"
  description: "A short description of the moving-image project."
  ogImage: "/moving/example-film/proxies/cover.jpg"
---

Optional project notes can go here.
```

## Route

The `slug` field controls the public route.

```text
/moving-images/moving-example-film
```

The moving-image index at `/moving-images` will include the project automatically because it reads from the content collection.

## Instructions

1. Export the poster image, preview video, and full video.
2. Add the files to `public/moving/[project-name]/`.
3. Run `npm run create-moving-project -- [project-name] --title "Project Title" --year 2026 --sort-order 3`.
4. Review the generated `src/content/projects/moving-[project-name].md`.
5. Remove optional fields that are not used by the project.
6. Keep file names predictable and lowercase.
7. Run `npm run build`.

To update an existing content file, add `--update-content`.

To regenerate existing proxies, add `--force-proxies`.

## Path Rules

- Local source folder: `public/moving/[project-name]/`
- Proxy output folder: `public/moving/[project-name]/proxies/`
- Browser path for generated content: `/moving/[project-name]/proxies/...`
- `cover.jpg` is only for `coverImage`, poster metadata, and SEO.
- `thumbnail.jpg`, when present, is only for poster/thumbnail metadata.
- Do not use `/media/moving/...`.
- Do not place moving-image files in `public/images/stills/`.
- Do not use the stills proxy workflow for moving-image projects.
