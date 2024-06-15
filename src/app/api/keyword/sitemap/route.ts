import { extractUrlsFromSitemap } from "@/utils/keyword-helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;
  if (!url) {
    return NextResponse.json({ message: "Invalid param" }, { status: 500 });
  }

  try {
    const postUrls = await fetch(url)
      .then((res) => res.text())
      .then((xmlString) => {
        const urls = extractUrlsFromSitemap(xmlString);
        return urls;
      });

    return NextResponse.json({ results: postUrls });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message ?? "" });
  }
}
