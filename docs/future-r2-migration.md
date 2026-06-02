# Future R2 Migration

V1 serves portfolio media from local static files in `public/media/`.

Current local URL:

```text
/images/stills/project-name/01.jpg
```

Future R2 URL:

```text
https://media.albertbiney.com/stills/project-name/01.jpg
```

The folder structure should stay identical after the public `/media/` prefix:

```text
public/images/stills/project-name/01.jpg
```

maps to:

```text
stills/project-name/01.jpg
```

in a future R2 bucket.

## V1 Rules

- Keep media files in `public/media/`.
- Use direct paths in content entries.
- Do not use media host environment variables.
- Do not add image URL builders, loaders, CDN wrappers, or media services.

## Future Migration Steps

1. Upload `public/images/stills/` contents to the future R2 bucket under `stills/`.
2. Upload `public/moving/` contents to the future R2 bucket under `moving/`.
3. Replace local path prefixes in content entries:

```text
/media/
```

with:

```text
https://media.albertbiney.com/
```

4. Keep project slugs, filenames, ordering, and content field names unchanged.
