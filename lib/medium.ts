const MEDIUM_RSS2JSON_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40giorgio.galassi';

type Rss2JsonItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories?: string[];
};

type Rss2JsonResponse = {
  status: 'ok' | 'error';
  items?: Rss2JsonItem[];
};

export type MediumArticle = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  categories: string[];
  imageUrl: string | null;
};

function toSlug(url: string) {
  return url
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractImageFromDescription(description: string) {
  // Search <figure> first and extract the first nested image.
  const figureMatch = description.match(/<figure\b[^>]*>([\s\S]*?)<\/figure>/i);
  const figureHtml = figureMatch?.[1] ?? '';
  const imageMatch = figureHtml.match(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/i);

  return imageMatch?.[1] ?? null;
}

function mapItemToMediumArticle(item: Rss2JsonItem): MediumArticle {
  return {
    id: toSlug(item.link),
    title: item.title,
    publishedAt: item.pubDate,
    url: item.link,
    categories: item.categories ?? [],
    imageUrl: extractImageFromDescription(item.description)
  };
}

export async function getMediumArticles(): Promise<MediumArticle[]> {
  try {
    const response = await fetch(MEDIUM_RSS2JSON_URL, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as Rss2JsonResponse;

    if (payload.status !== 'ok' || !Array.isArray(payload.items)) {
      return [];
    }

    return payload.items.map(mapItemToMediumArticle);
  } catch {
    return [];
  }
}
