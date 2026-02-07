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
  // Cerchiamo prima il tag <figure> e, al suo interno, il primo <img src="...">.
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
  // Isoliamo qui la chiamata HTTP, così in futuro possiamo cambiare provider/API senza toccare la UI.
  const response = await fetch(MEDIUM_RSS2JSON_URL, {
    // Manteniamo la lista sempre aggiornata ma con cache controllata lato server.
    next: { revalidate: 1800 }
  });

  if (!response.ok) {
    throw new Error(`Unable to load Medium feed: HTTP ${response.status}`);
  }

  const payload = (await response.json()) as Rss2JsonResponse;

  if (payload.status !== 'ok' || !payload.items) {
    return [];
  }

  return payload.items.map(mapItemToMediumArticle);
}
