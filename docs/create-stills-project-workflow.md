# Create Stills Project Workflow

Use this workflow to create a stills project page and generate proxy images in one command.

## 1. Add Source Images

Create the project folder:

```text
public/images/stills/[project-name]/
```

Add:

```text
cover.jpg
01.jpg
02.jpg
03.jpg
```

The script skips hidden files, non-image files, `cover.jpg`, and existing proxies.

## 2. Run The One-Step Command

```sh
npm run create-stills-project -- [project-name] --title "Project Title" --year 2026 --sort-order 3
```

Example:

```sh
npm run create-stills-project -- seren --title "Seren" --year 2026 --sort-order 4
```

This command:

- reads `public/images/stills/[project-name]/`
- creates `public/images/stills/[project-name]/proxies/`
- generates proxy images at roughly 1600px longest edge
- writes JPG proxies at quality 82
- creates `src/content/projects/stills-[project-name].md`
- points gallery images at `/images/stills/[project-name]/proxies/...`
- creates the route `/work/stills-[project-name]`

## Existing Files

If proxies already exist, they are skipped.

If the content file already exists, it is not overwritten unless you pass:

```sh
--update-content
```

To regenerate existing proxies:

```sh
--force-proxies
```

Full update example:

```sh
npm run create-stills-project -- seren --title "Seren" --year 2026 --sort-order 4 --update-content --force-proxies
```

## Generated Content Shape

```yaml
---
title: "Project Title"
slug: "stills-project-name"
year: "2026"
category: "stills"
sortOrder: 3

coverImage: "/images/stills/project-name/cover.jpg"

images:
  - "/images/stills/project-name/proxies/01.jpg"
  - "/images/stills/project-name/proxies/02.jpg"

seo:
  title: "Project Title | Albert Biney"
  description: "Project Title."
  ogImage: "/images/stills/project-name/cover.jpg"
---
```

## Verify

Run:

```sh
npm run build
```

Then check:

```text
/work/stills-[project-name]
```
