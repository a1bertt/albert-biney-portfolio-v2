# Create Moving Image Project Workflow

Use this workflow when adding a moving-image project.

This is not the same as the stills project workflow. Moving-image projects use a different content category and route.

## Folder Structure

Create:

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

Use `.mp4` for website video files where possible. The script accepts `.mov`, but `.mp4` is preferred because it is more reliable for browser playback. If both `preview.mp4` and `preview.mov` exist, the script uses `preview.mp4`.

## Content File

Create:

```text
src/content/projects/moving-[project-name].md
```

After adding the media files, generate the content file with:

```sh
npm run create-moving-project -- [project-name] --title "Project Title" --year 2026 --sort-order 3
```

To update an existing content file, add `--update-content`.

To regenerate existing proxies, add `--force-proxies`.

Example:

```yaml
---
title: "Project Title"
slug: "moving-project-name"
year: "2026"
category: "moving-image"
sortOrder: 1

coverImage: "/moving/project-name/proxies/cover.jpg"

images: []

videos:
  - title: "Project Title"
    previewUrl: "/moving/project-name/proxies/preview.mp4"
    fullVideoUrl: "/moving/project-name/proxies/full.mp4"
    posterImage: "/moving/project-name/proxies/cover.jpg"

seo:
  title: "Project Title | Albert Biney"
  description: "Project Title."
  ogImage: "/moving/project-name/proxies/cover.jpg"
---

Project Title.
```

## Route

This content file creates:

```text
/moving-images/moving-project-name
```

The moving-image index at:

```text
/moving-images
```

will include the project automatically because it reads from the content collection.

## Notes

- Use `category: "moving-image"`.
- Use a `moving-` slug prefix, for example `moving-after-hours`.
- Keep file names lowercase and predictable.
- Use `cover.jpg` as the poster/thumbnail unless there is a specific reason to use a separate `thumbnail.jpg`.
- Do not add `cover.jpg` or `thumbnail.jpg` to `images`; those files are reserved for cover/poster metadata.
- Generated content should load from `/moving/[project-name]/proxies/...`.
- Do not use the stills proxy workflow for moving-image projects.
- Do not place moving-image files in `public/images/stills/`.

## Verify

Run:

```sh
npm run build
```

Then check:

```text
/moving-images
/moving-images/moving-[project-name]
```
