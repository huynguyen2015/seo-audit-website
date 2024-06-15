export function extractUrlsFromSitemap(xmlString: string) {
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = urlPattern.exec(xmlString)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

export function extractKeywordsFromMeta(htmlString: string) {
  const metaPattern =
    /<meta\s+name=["']keywords["']\s+content=["']([^"']*)["']\s*\/?>/i;
  const match = metaPattern.exec(htmlString);

  if (match) {
    return match[1].split(",").map((item) => item.trim().toLowerCase());
  } else {
    return null;
  }
}

export const analyzeKeywords = (keywords: string[]) => {
  const keywordCount: any = {};
  keywords.forEach((keyword) => {
    keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
  });
  return keywordCount;
};

export const findTopKeywords = (keywordCount: object, topN = 3) => {
  // Convert the keywordCount object to an array of [keyword, count] pairs
  const keywordArray = Object.entries(keywordCount);

  // Sort the array by count in descending order
  keywordArray.sort((a, b) => b[1] - a[1]);

  // Get the counts of the top N keywords
  const topCounts = Array.from(
    new Set(keywordArray.map((item) => item[1]))
  ).slice(0, topN);

  // Get all keywords with counts in the top N counts
  return keywordArray
    .filter((item) => topCounts.includes(item[1]))
    .map((item) => item[0]);
};
