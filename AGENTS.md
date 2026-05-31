# AGENTS.md

## Project Summary

This repository is the Astro implementation of Albert Biney's portfolio platform: a minimal, editorial, image-first photography website for stills and moving-image work. The site should feel restrained, precise, and visually confident, with the interface acting as a quiet frame for the work rather than a decorative brand layer.

The homepage is the stills index. There is no separate marketing landing page in V1.

## Tech Stack

- Astro
- TypeScript
- Astro content collections
- Markdown/MDX project content
- Custom CSS only

Do not add Tailwind CSS. Do not introduce utility-first CSS frameworks, component CSS frameworks, or generated design-system packages unless explicitly requested.

## Repo Structure

- `src/pages/` contains route files.
- `src/layouts/BaseLayout.astro` contains the shared page shell, metadata defaults, fixed left-side navigation, and main content frame.
- `src/content.config.ts` defines Astro content collections.
- `src/content/projects/` contains project entries as Markdown or MDX.
- `src/styles/` contains global styling and design tokens.
- `src/types/` contains shared TypeScript types.
- `docs/design-specification.md` is the source of truth for visual direction and product intent.
- `public/` is for lightweight static assets only, such as favicons. Do not place final high-resolution image sets or videos here.

Use lowercase hyphenated names for new files and folders.

## Routes

Maintain these public routes:

- `/` for the STILLS index and homepage
- `/moving-images` for the moving-image index
- `/info` for biography, contact, and professional context
- `/work/[slug]` for stills project pages
- `/moving-images/[slug]` for moving-image project pages

Keep navigation labels concise and uppercase: `STILLS`, `MOVING IMAGES`, `INFO`.

## Layout Direction

Use a fixed left-side vertical navigation system, similar in structure to the Aitor Sola reference. Do not use a top horizontal navbar.

`ALBERT BINEY` should sit at the top left as the site identity. The primary page links should sit vertically below the identity on the left side. Social or contact links may sit near the lower left when useful.

Main page content scrolls vertically to the right of the fixed sidebar. STILLS, MOVING IMAGES, INFO, stills project pages, and moving-image project pages should all sit within this same fixed-sidebar layout system.

STILLS remains the homepage. MOVING IMAGES should follow the same page/index logic as STILLS, using collection-derived project entries and intentional sequencing rather than a separate hard-coded page structure.

## Content Rules

Use Astro content collections for project data. Project content belongs in Markdown or MDX files under `src/content/projects/`, validated by `src/content.config.ts`.

Do not hard-code project lists directly in page components when they can be derived from content collections.

Project data should include route-friendly slugs, titles, year, category, sort order, cover media, image/video URLs, SEO metadata where available, and optional client/credits. Optional fields must not render empty labels.

Use `sortOrder` to control project sequencing and homepage rhythm. Lower numbers appear earlier.

## Visual Direction

The visual language is minimal, editorial, restrained, and image-first. Borrow from gallery walls, contact sheets, and printed lookbooks rather than startup landing pages or generic portfolio templates.

The fixed sidebar should behave as a quiet frame for the work. It should feel precise and stable, not like a decorative brand panel.

Avoid:

- Decorative gradients
- Loud accent colors
- Heavy parallax
- Dramatic hover scaling
- Oversized cursor effects
- Full-screen intro animations
- Decorative loading screens
- Startup-style hero sections
- Generic agency-template language

Motion should be subtle, functional, and respectful of `prefers-reduced-motion`.

## Typography

Proxima Nova is the primary typeface for identity, navigation, project titles, metadata, captions, buttons, and interface text.

Cormorant Garamond is a restrained secondary typeface for selected editorial emphasis, mainly on the INFO page or carefully controlled lines.

Do not use Cormorant Garamond for navigation or large blocks of body text. Typography should feel controlled, not romantic, theatrical, or faux-luxury.

## Media Rules

Do not commit final high-resolution images or videos to the repository.

Use Cloudflare Images URLs for final still image delivery. Use Cloudflare Stream URLs or embeds for final video delivery.

Local placeholder media may be used only when needed for layout work. Keep placeholders lightweight and replace final production media with Cloudflare URLs in content collection entries.

All meaningful images need descriptive alt text. Use empty alt text only for genuinely decorative imagery.

## CSS Rules

Keep styling in `src/styles/`.

Use shared tokens for color, typography, spacing, sizing, and motion wherever practical. Avoid one-off values in components unless the exception is intentional and local.

Custom CSS is the styling system. Keep selectors understandable and aligned with the existing global style approach.

The interface palette should remain narrow: black, off-white/white, and subtle greys. Let the photography provide the color.

## Accessibility Rules

- Use semantic HTML for navigation, main content, sections, lists, figures, and links.
- Ensure all project cards and media links are keyboard reachable.
- Preserve visible focus states that are restrained but easy to see.
- Write useful alt text for meaningful images.
- Keep text contrast sufficient.
- Ensure lightbox or modal interactions can be opened, navigated, and closed by keyboard.
- Avoid motion that cannot be paused if it becomes distracting.
- Respect `prefers-reduced-motion` where motion is added.

## Build Rules

Always run this before finishing a task:

```sh
npm run build
```

If the build cannot run, report the reason clearly in the final response.

## Change Discipline

Make small, focused changes that satisfy the task. Do not rewrite unrelated files, reformat the repo broadly, or change visual direction without a clear reason.

Before changing architecture, check `docs/design-specification.md` and the existing Astro/content collection patterns.

Prefer simple static Astro patterns and minimal client-side JavaScript. Add abstractions only when they reduce real duplication or match an established local pattern.
