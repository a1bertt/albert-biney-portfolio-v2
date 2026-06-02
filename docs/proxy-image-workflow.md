# Proxy Image Workflow

Original stills images stay in each project folder:

```text
public/images/stills/[project-name]/01.jpg
```

Site galleries should load generated proxy images:

```text
public/images/stills/[project-name]/proxies/01.jpg
```

Public gallery path:

```text
/images/stills/[project-name]/proxies/01.jpg
```

Run:

```sh
npm run generate-proxies -- [project-name]
```

Use `--force` to regenerate existing proxy files:

```sh
npm run generate-proxies -- [project-name] --force
```

The script skips `cover.*`, hidden files, non-image files, and existing proxies unless `--force` is passed.
