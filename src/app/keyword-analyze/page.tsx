import { Suspense } from "react";
import KeywordAnalyzeComponent from "./components/keyword-analyze.component";
import LoadingDots from "@/components/loading/loading-dots";

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  return {
    title: "1hour.dev | keyword analyze tool",
    description:
      "Optimize SEO with keyword analyze tool, it will help you identifies and visualizes key website keywords",
    keywords:
      "optimize seo, keyword analyze tool, identifies keyword, audit website keyword",
    alternates: {
      canonical: `https://www.${siteUrl}/tools/keyword-analyze`,
    },
  };
}

export default function KeywordResearchPage() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <KeywordAnalyzeComponent />
    </Suspense>
  );
}
