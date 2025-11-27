
export async function getEntry(contentType, include = 10) {
  const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=${contentType}&include=${include}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
    next: { tags: [contentType] },
  }).then(r => r.json());

  if (!res?.items?.length) return null;

  return resolveLinked(res.items[0], res.includes);
}
export const getImageUrl = (asset) => {
  return asset?.file?.url ? `https:${asset.file.url}` : "";
};



export function resolveLinked(entry, includes = {}) {
  const assetMap = new Map((includes.Asset || []).map((a) => [a.sys.id, a.fields]));
  const entryMap = new Map((includes.Entry || []).map((e) => [e.sys.id, e.fields]));

  const resolveField = (field) => {
    if (Array.isArray(field)) {
      return field.map((item) => resolveField(item));
    }

    if (field?.sys?.linkType === "Asset") {
      return assetMap.get(field.sys.id) || field;
    }

    if (field?.sys?.linkType === "Entry") {
      const linked = entryMap.get(field.sys.id);
      if (!linked) return field;

      const resolvedEntry = {};
      for (const [k, v] of Object.entries(linked)) {
        resolvedEntry[k] = resolveField(v);
      }
      return resolvedEntry;
    }

    return field;
  };

  const resolvedFields = {};
  for (const [key, value] of Object.entries(entry.fields)) {
    resolvedFields[key] = resolveField(value);
  }

  return resolvedFields;
}