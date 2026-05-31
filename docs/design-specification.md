# Albert Biney Portfolio Platform Technical Design Specification

ALBERT BINEY
Portfolio Platform
Technical Design Specification
Version 1.0

Prepared for: Albert Biney Website Build
Purpose: Codex-ready design and implementation specification
Status: Final V1 design direction

Contents

1. Document Control

2. Executive Summary

3. Project Vision

4. Brand and Positioning

5. Target Audience

6. Success Criteria

7. Creative Reference Analysis

8. Design Principles

9. Information Architecture

10. Navigation System

11. Typography System

12. Colour System

13. Layout and Grid System

14. STILLS Page Specification

15. Project Page Specification

16. Moving Images Specification

17. INFO Page Specification

18. Lightbox Specification

19. Motion Design Specification

20. Mobile Experience Specification

21. Accessibility Specification

22. SEO and Metadata Strategy

23. Media Infrastructure

24. Cloudflare Architecture

25. Content Models

26. Astro Application Architecture

27. Repository Structure

28. Deployment Architecture

29. Development Workflow

30. Future Versions

31. Codex Build Specification

32. Appendices

1. Document Control

1.1 Revision Summary

Typography revised to Proxima Nova as primary and Cormorant Garamond as restrained editorial secondary.

Navigation revised to STILLS, MOVING IMAGES, INFO.

Project pages revised to include title, year, image sequence, optional client, and optional credits.

Content model extended to include sortOrder, SEO metadata, Cloudflare image URLs, and optional video records.

Tailwind CSS removed from the technical stack in favour of custom CSS.

Cloudflare Images and Cloudflare Stream added as V1 requirements rather than future enhancements.

Lightbox behaviour approved and formalised.

STILLS page curation strategy added: the homepage is the stills index, so projects are managed through sequencing and sort order rather than a separate featured-only rule.

SEO and metadata strategy added for site-wide and project-level sharing.

2. Executive Summary

Albert Biney Portfolio Platform V1 is a premium editorial photography website for a photographer working across film and digital, with an emphasis on portraiture, fashion, stillness, everyday spaces, texture, light, and controlled composition. The website is designed as a visual calling card rather than a conventional agency brochure. It should communicate seriousness, taste, and visual confidence through restraint.

The V1 website is organised around three public navigation items: STILLS, MOVING IMAGES, and INFO. The STILLS page is also the homepage. It functions as the primary project index and the principal visual statement. The MOVING IMAGES page supports film and video work through autoplaying muted loops and project entry points. The INFO page contains the photographer portrait, concise biography, location, availability, representation status when present, contact details, and social links.

The website should feel like a gallery wall, a campaign contact sheet stripped to essentials, and a printed lookbook translated into a digital environment. It should avoid startup styling, generic agency templates, decorative animations, faux-luxury effects, and over-explained creative language.

Technically, the platform will be built with Astro, TypeScript, custom CSS, and minimal JavaScript. GitHub will hold source code. GitHub Pages will host the generated site. Cloudflare will manage DNS, CDN, SSL, image delivery through Cloudflare Images, and video delivery through Cloudflare Stream. The GitHub repository should not store final large image sets or final video files.

3. Project Vision

The project is not simply a personal website. It is the first digital expression of a controlled visual identity. The site must frame Albert Biney as a serious image-maker who can sit within fashion, editorial, cultural, and art-facing contexts without needing excessive written explanation.

The website should create immediate confidence. A viewer should understand within seconds that the photographer has a coherent visual world, an intentional relationship to subject and space, and enough discipline to let the work speak. The interface should disappear into the rhythm of the images.

The V1 build should be achievable, technically clean, and expandable. It should not attempt to solve every future need at launch. It should prioritise a strong first impression, simple project navigation, elegant media presentation, and a maintainable codebase.

3.1 Primary Goals

Present Albert Biney as a serious photographer and creative working across still image and moving image.

Create a refined, image-led digital environment that feels editorial and controlled.

Allow visitors to move directly from the homepage into individual projects.

Use Cloudflare-hosted images and videos from V1 to keep the repository light and scalable.

Make the site easy to maintain in VS Code with simple data files and predictable structure.

Build a foundation that can later support Vault, CMS, archive features, and richer editorial content.

3.2 Anti-Goals

Do not create a generic photographer template.

Do not create a startup-style landing page.

Do not use loud animation, parallax-heavy effects, oversized cursors, or gimmick interactions.

Do not rely on decorative branding or strong accent colours.

Do not overload the site with biography, manifesto language, or broad service descriptions.

Do not store final high-resolution media assets directly in GitHub.

4. Brand and Positioning

Albert Biney is a photographer working across film and digital, focusing on portraiture and fashion. The work is defined by a controlled and structured approach, emphasising stillness. Everyday spaces play an integral role, defining the relationship between subject and styling. Through light, texture, and composition, the work balances intention with observation, creating images that feel deliberate yet natural.

The brand voice should be refined, exacting, editorial, controlled, fashion-adjacent, culturally literate, and visually confident. The site should communicate seriousness and taste through restraint rather than through declarations of luxury.

4.1 Positioning Statement

Albert Biney is a photographer and creative focused on portraiture, fashion, image-making, moving image, and visual direction. The website positions him as a calm, precise, and visually confident image-maker whose work is rooted in stillness, environment, and composition.

4.2 Tone Rules

Use concise language.

Let the images carry the strongest emotional weight.

Avoid inflated art language.

Avoid service-heavy commercial copy in V1.

Avoid tone that feels overly warm, corporate, exaggeratedly artistic, aggressively luxurious, or jargon-heavy.

Use short labels and clear metadata rather than long explanatory blocks.

5. Target Audience

The site is designed for people who make decisions about image-making, publication, collaboration, commissioning, and creative credibility. The experience must be quick to understand but slow enough to encourage looking.

6. Success Criteria

The site loads quickly despite image-led presentation.

The homepage immediately communicates a serious editorial photography identity.

Navigation is simple enough to understand without instruction.

Each stills project can be entered from the homepage/STILLS index.

Image viewing feels calm, fast, and intentional.

Moving image work feels alive through autoplaying previews.

The INFO page gives enough contact and positioning information without breaking the visual tone.

Images and videos are delivered through Cloudflare rather than stored as final large assets in GitHub.

The codebase is simple enough to maintain manually in VS Code.

The platform can later support Vault, archive expansion, and optional CMS integration.

7. Creative Reference Analysis

The following references define the design direction. They should be treated as functional references rather than sites to copy. Each reference contributes a specific behaviour, feeling, or structure.

7.1 What to Borrow

Borrow calm asymmetry, not randomness.

Borrow visual confidence, not decorative luxury.

Borrow restrained hover behaviours, not interactive gimmicks.

Borrow editorial pacing, not over-built editorial effects.

Borrow the sense of a curated world, not the full complexity of each reference site.

7.2 What to Avoid

No heavy parallax systems.

No dramatic scaling on hover.

No blur-heavy overlays.

No unnecessary page transition theatrics.

No full-screen intro animation before seeing work.

No decorative gradients or loud accent colour system.

8. Design Principles

Reduction

Every visual and functional element should justify its presence. The design should remove noise and focus attention on image, sequence, and spacing.

Stillness

The site should feel calm. Motion exists only to clarify interaction, soften state changes, or support browsing.

Image Hierarchy

Photography is the primary proof. Interface, typography, and colour should frame the work rather than compete with it.

Asymmetry With Discipline

The homepage layout should feel freeform and editorial, but it must sit on an underlying grid. It should never feel randomly scattered.

Negative Space

Whitespace is an active design tool. Gaps between images create rhythm, confidence, and pacing.

Editorial Pacing

The viewer should experience changes in image scale, position, and spacing as they scroll. The page should feel sequenced, not simply populated.

Maintainability

The system must be simple to update. Adding a project should primarily involve uploading media to Cloudflare and editing a data file.

9. Information Architecture

The site architecture is intentionally minimal. The homepage is not a separate marketing page. The homepage is the STILLS page. This aligns the visitor experience with the main purpose of the site: seeing the work immediately.

9.1 V1 Pages

9.2 Future Pages

10. Navigation System

Navigation should be fixed or visually stable while the user scrolls. It should feel like a quiet framing device, not a branded header. The navigation should use uppercase labels and sharp spacing.

11. Typography System

The typography system uses a controlled two-typeface approach. Proxima Nova carries the structural voice of the site. Cormorant Garamond is used sparingly for selected editorial emphasis, mainly on the INFO page or occasional carefully controlled lines.

11.1 Typography Usage Rules

Use Proxima Nova for site identity, navigation, project titles, metadata, captions, buttons, and interface text.

Use Cormorant Garamond only for selected editorial lines or controlled emphasis on the INFO page.

Do not use Cormorant Garamond for navigation or large blocks of body text.

Do not allow typography to become decorative, romantic, theatrical, or overly luxury-coded.

Let proportion, spacing, and hierarchy carry the expensive feeling rather than font ornament.

12. Colour System

The site should use a narrow colour system. The photography provides the colour. Interface colour should remain nearly invisible, functioning only as structure and contrast.

No decorative gradients.

No glossy highlights.

No loud accent colour.

No colour-coded categories in V1.

No brand colour beyond black, white/off-white, and subtle grey.

13. Layout and Grid System

The layout should appear freeform but be governed by a hidden grid. The goal is editorial asymmetry with discipline. The grid should support varied image sizes, portrait and landscape crops, and intentional gaps without becoming a simple masonry wall.

13.1 Spacing Scale

Spacing may be adjusted during design implementation, but the project should avoid one-off values wherever possible. Rhythm matters more than mathematical rigidity.

14. STILLS Page Specification

The STILLS page is the homepage. It is the heart of the website and should reveal the work immediately. There should be no separate landing page before the stills index. The visitor arrives directly inside the photographic world.

14.1 STILLS Page Curation Strategy

Because the homepage is the STILLS page, the site should not use a separate featured-only homepage rule in V1. All active still-image projects should be available from the STILLS page. Curation is managed through sequencing, spacing, visual hierarchy, and sort order rather than by hiding work.

The most important work should appear first.

Projects should be ordered intentionally to create visual rhythm.

Large and small image placements should create pacing across the scroll.

Projects may be reordered at any time using sortOrder in the content model.

If the body of work grows beyond the active portfolio, older projects can move into a future archive rather than cluttering the STILLS page.

14.2 Project Card Hover Behaviour

Image remains stable.

No dramatic scale shift.

Project title fades in at the centre of the image.

Image may darken with a black overlay up to 40% opacity.

Cursor changes to pointer/hand over clickable project cards.

Hover transition should feel subtle and quick, not flashy.

14.3 Touch Behaviour

On mobile and touch devices there is no reliable hover. Project titles must remain accessible. The preferred V1 behaviour is to show project titles below or over images in a restrained way on mobile, or reveal title on first tap and enter on second tap only if implementation remains intuitive. The simpler mobile approach is preferred: title visible or semi-visible without requiring hover.

15. Project Page Specification

Project pages are simple, image-led, and restrained. They should not become long case studies in V1. Their purpose is to allow the visitor to see a specific body of work in sequence.

15.1 Project Metadata Display

Client and credits should never show as empty labels. If the project has no client, the client row does not render. If the project has no credits, the credits section does not render.

16. Moving Images Specification

The MOVING IMAGES page is a film/video index. It should feel connected to the stills experience but introduce motion through autoplaying video previews. The page should remain minimal and restrained.

16.1 Moving Image Project Pages

Moving image project pages should follow the same restraint as stills project pages. They may include one primary video, supporting stills, project title, year, optional client, and optional credits. Videos should be embedded from Cloudflare Stream and should not be committed to the GitHub repository.

17. INFO Page Specification

The INFO page replaces a conventional ABOUT or CONTACT page. It should provide identity, contact, and professional context without breaking the minimal visual world.

17.1 Suggested INFO Copy

Albert Biney is a photographer working across film and digital, focusing on portraiture and fashion.

His work is defined by a controlled and structured approach, emphasising stillness. Everyday spaces play an integral role in his work, defining the relationship between subject and styling.

Through light, texture, and composition, he balances intention with observation, creating images that feel deliberate yet natural.

18. Lightbox Specification

The lightbox should provide a calm, fullscreen viewing experience. It should not feel like a plugin or generic gallery overlay. The interface should be minimal, keyboard-accessible, and quick to dismiss.

19. Motion Design Specification

Motion should be subtle and functional. It should support browsing and state changes without becoming an identity in itself.

No parallax-heavy effects.

No decorative loading screen.

No bouncing or elastic easing.

No scroll-jacking.

No oversized cursor systems.

20. Mobile Experience Specification

Desktop carries the primary aesthetic, but mobile must be elegant and usable. The mobile version should simplify layout rather than trying to reproduce desktop asymmetry at all costs.

Navigation remains simple and visible.

Project layout becomes vertically stacked or simplified.

Project titles remain accessible without hover.

Images lazy load as the user scrolls.

Lightbox supports close button and swipe where possible.

Moving image autoplay should respect browser restrictions and use muted inline playback.

INFO page stacks cleanly with readable text and adequate spacing.

21. Accessibility Specification

Accessibility should be treated as part of the design system, not an afterthought. The site is minimal, so accessibility can be achieved without visual compromise.

Use semantic HTML elements for navigation, main content, sections, and links.

Provide descriptive alt text for meaningful images.

Use empty alt text only for purely decorative images, if any.

Ensure all project links are keyboard reachable.

Ensure lightbox can be opened, navigated, and closed by keyboard.

Provide visible focus states that remain restrained but usable.

Maintain sufficient contrast between text and background.

Avoid motion that cannot be paused if it becomes distracting.

Respect prefers-reduced-motion where appropriate.

22. SEO and Metadata Strategy

The site should be built with clean metadata from the beginning. Even a minimal photography portfolio benefits from project-level titles, descriptions, Open Graph images, semantic routes, and alt text.

22.1 Project Metadata Requirements

Every public page should have a unique title.

Every project should have a meaningful slug.

Every project should define a cover image usable for social sharing.

Image alt text should be written with visual clarity, not keyword stuffing.

Metadata should be generated from project data where possible.

23. Media Infrastructure

V1 uses Cloudflare for image and video hosting. This is a deliberate architecture decision. The GitHub repository should remain code-focused and should not grow into a media storage bucket.

23.1 Cloudflare Images Usage

Upload final stills project images to Cloudflare Images.

Use Cloudflare delivery URLs in project data.

Use variants for responsive sizing if configured.

Keep GitHub free of final large image assets.

Use a clear naming convention outside the codebase so media remains manageable.

23.2 Cloudflare Stream Usage

Upload moving image content to Cloudflare Stream.

Use Stream embed or playback URLs in moving image project data.

Autoplay previews must be muted and looped.

Use Cloudflare Images poster frames where useful.

Do not commit final video files to GitHub.

24. Cloudflare Architecture

The Cloudflare account and GitHub repository still need to be created. V1 implementation should include setup tasks for both. Cloudflare R2 is not required for V1 unless a general object-storage workflow becomes necessary later.

24.1 Cloudflare Setup Checklist

Create Cloudflare account.

Add custom domain to Cloudflare.

Update domain nameservers at the domain registrar.

Enable SSL/TLS and basic CDN protections.

Enable Cloudflare Images.

Enable Cloudflare Stream.

Upload sample image and video assets.

Copy delivery URLs into the Astro project data.

Connect DNS records to GitHub Pages after deployment.

25. Content Models

Content should be represented in TypeScript-friendly data structures. The data model should keep presentation separate from project content and media URLs.

25.1 Sort Order Strategy

STILLS page sequencing is controlled using sortOrder. Lower numbers appear earlier. This gives direct editorial control over rhythm without needing a separate featured boolean in V1.

26. Astro Application Architecture

Astro is suitable because the site is content-led, fast, mostly static, and benefits from clean routing and componentisation without unnecessary client-side framework weight.

26.1 Component Responsibilities

27. Repository Structure

The repository should remain clean and predictable. Final images and videos should not be committed to GitHub. Local placeholder files may be included to allow layout work before Cloudflare media URLs are available.

Use lowercase hyphenated file and folder names.

Keep all data in src/data or Astro content collections.

Keep all global styling in src/styles.

Keep documentation in docs.

Do not commit large exported images, high-resolution scans, or video files.

Use .gitignore to prevent accidental media commits.

28. Deployment Architecture

The deployment flow should be simple enough to maintain without a complex backend. Astro produces a static site. GitHub Pages serves it. Cloudflare provides domain, SSL, CDN, and media delivery.

29. Development Workflow

Create GitHub repository.

Create Cloudflare account.

Create Astro project locally.

Commit base project structure.

Create initial project data with placeholder Cloudflare URLs or temporary placeholders.

Build FixedHeader, STILLS grid, ProjectCard, and INFO page.

Add project page routes and image sequence rendering.

Add lightbox behaviour.

Add MOVING IMAGES page using Cloudflare Stream sample URLs.

Add SEO metadata component.

Deploy to GitHub Pages.

Connect custom domain through Cloudflare.

Test desktop, mobile, keyboard, and performance.

Replace placeholders with final Cloudflare-hosted media.

30. Future Versions

30.1 Future Archive Approach

When the active stills portfolio grows beyond the point where all projects should remain in the primary STILLS sequence, introduce an archive layer. Until then, the STILLS page should remain the main project index and should be managed through sortOrder and careful curation.

31. Codex Build Specification

The following section can be used as the implementation brief for Codex. It should be supplied together with this full document so Codex has complete context.

32. Appendices

32.1 Initial Setup Requirements

VS Code installed.

Node.js LTS installed.

Git installed.

GitHub account active.

GitHub repository created.

Cloudflare account created.

Custom domain available and ready to add to Cloudflare.

Cloudflare Images enabled.

Cloudflare Stream enabled.

Initial still images and video samples prepared for upload.

32.2 Final V1 Page Routes

32.3 Final V1 Navigation

32.4 Final V1 Summary

Albert Biney Portfolio Platform V1 is a minimal, editorial, image-first photography portfolio. It uses STILLS as the homepage, MOVING IMAGES as a video index, and INFO as the photographer information and contact page. The system is built with Astro, TypeScript, custom CSS, GitHub Pages, Cloudflare Images, Cloudflare Stream, and Cloudflare DNS/CDN. It is designed to launch cleanly, remain easy to maintain, and scale into Vault, archive, CMS, and advanced media features later.

