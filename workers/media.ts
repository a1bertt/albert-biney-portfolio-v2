interface Env {
  MEDIA_BUCKET: R2Bucket;
}

const MEDIA_PREFIX = "/media/";

const CONTENT_TYPES: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  mp4: "video/mp4",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

function getContentType(key: string) {
  const extension = key.split(".").pop()?.toLowerCase();
  return extension ? CONTENT_TYPES[extension] : undefined;
}

function objectKeyFromPath(pathname: string) {
  const decodedPath = decodeURIComponent(pathname);

  if (!decodedPath.startsWith(MEDIA_PREFIX)) {
    return undefined;
  }

  return decodedPath.slice(MEDIA_PREFIX.length);
}

function objectHeaders(object: R2Object) {
  const headers = new Headers();

  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=86400, s-maxage=604800");

  const contentType = headers.get("content-type") ?? getContentType(object.key);
  if (contentType) {
    headers.set("content-type", contentType);
  }

  return headers;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          allow: "GET, HEAD",
        },
      });
    }

    const url = new URL(request.url);
    const key = objectKeyFromPath(url.pathname);

    if (!key || key.endsWith("/")) {
      return new Response("Not found", { status: 404 });
    }

    const object = await env.MEDIA_BUCKET.get(key);

    if (!object) {
      return new Response("Not found", {
        status: 404,
        headers: {
          "cache-control": "public, max-age=60",
        },
      });
    }

    const headers = objectHeaders(object);

    if (request.method === "HEAD") {
      return new Response(null, { headers });
    }

    return new Response(object.body, { headers });
  },
};
