// app/api/revalidate/route.js
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  const secret = req.headers.get("x-webhook-secret");
  const validSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;

  if (secret !== validSecret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const contentTypeId = body?.sys?.contentType?.sys?.id;

    const typeToTag = {
      aboutMe: 'aboutMe',
      angebot: 'angebot',
      booking: 'booking',
      kontakt: 'kontakt',
      faqs: 'faqs',
      // add other mappings as needed
    };

    if (contentTypeId && typeToTag[contentTypeId]) {
      await revalidateTag(typeToTag[contentTypeId]);
      return NextResponse.json({ revalidated: true, tag: typeToTag[contentTypeId] });
    } else {
      return NextResponse.json({ message: "Unknown content type" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}

