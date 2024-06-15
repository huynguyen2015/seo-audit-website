import { extractKeywordsFromMeta } from "@/utils/keyword-helper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { url } = body;
  if (!url) {
    return NextResponse.json({ message: "Invalid param" }, { status: 500 });
  }

  try {
    const keywords = await fetch(url)
      .then((res) => res.text())
      .then((htmlString) => {
        const data = extractKeywordsFromMeta(htmlString);
        return data;
      });

    return NextResponse.json({ results: keywords });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.message ?? "" });
  }
}
