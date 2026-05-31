# Cloudflare R2 Media Workflow

This document describes the current upload workflow for portfolio project media.

Cloudflare R2 is used to store public-facing portfolio media assets:

- still project images
- moving-image poster images
- moving-image preview video files
- moving-image full video files

Final media files should live in R2, not in this GitHub repository.

## Bucket And Domain

Recommended R2 bucket name:

```text
albert-biney-media
```

Recommended custom domain:

```text
media.albertbiney.com
```

The custom domain should point to the public R2 bucket so project Markdown files can use stable, readable media URLs.

## Folder Structure

Use lowercase, route-friendly project slugs. Keep file names predictable so project entries stay easy to scan.

```text
/stills/[project-slug]/cover.jpg
/stills/[project-slug]/01.jpg
/stills/[project-slug]/02.jpg
/moving/[project-slug]/poster.jpg
/moving/[project-slug]/preview.mp4
/moving/[project-slug]/full.mp4
```

Example stills project keys:

```text
/stills/quiet-summer/cover.jpg
/stills/quiet-summer/01.jpg
/stills/quiet-summer/02.jpg
```

Example moving-image project keys:

```text
/moving/after-hours/poster.jpg
/moving/after-hours/preview.mp4
/moving/after-hours/full.mp4
```

## Public URL Examples

Store the public R2 URLs in project Markdown files.

```text
https://media.albertbiney.com/stills/quiet-summer/cover.jpg
https://media.albertbiney.com/stills/quiet-summer/01.jpg
https://media.albertbiney.com/stills/quiet-summer/02.jpg
```

```text
https://media.albertbiney.com/moving/after-hours/poster.jpg
https://media.albertbiney.com/moving/after-hours/preview.mp4
https://media.albertbiney.com/moving/after-hours/full.mp4
```

## Repository Rules

- Do not commit final image files or video files to GitHub.
- Only store public R2 URLs in Markdown project files.
- Lightweight local placeholders may be used for layout work only, and should be replaced with public R2 URLs before production use.

## R2, Cloudflare Images, And Stream

R2 is the current upload workflow for portfolio media. It provides a simple, predictable place to store the source public assets that project content references.

Cloudflare Images and Cloudflare Stream can still be introduced later for generated image variants, responsive delivery, transformations, adaptive video streaming, or richer playback controls. If that happens, project Markdown entries can be updated to reference the new Images or Stream URLs while R2 remains the storage source for uploaded originals or production-ready files.

## New Project Checklist

1. Choose the project slug.
2. Prepare final export files outside the repository.
3. Upload stills projects to `/stills/[project-slug]/`.
4. Upload moving-image projects to `/moving/[project-slug]/`.
5. Confirm every uploaded object is publicly reachable through `https://media.albertbiney.com`.
6. Add or update the project Markdown file in `src/content/projects/`.
7. Store only public R2 URLs in the project frontmatter or content.
8. Add useful alt text for meaningful still images and poster images.
9. Set `sortOrder` to control project sequencing.
10. Run `npm run build` before finishing.
