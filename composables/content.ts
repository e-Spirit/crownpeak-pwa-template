import { Page } from "fsxa-api";

export function useContent() {
  const currentPage = useState<Page | null>("currentPage");
  const cachedPages = useState<{
    [caasId: string]: Page;
  }>("cachedPages", () => ({}));

  function findCachedPageBySeoRoute(seoRoute: string) {
    return cachedPages.value[seoRoute];
  }

  function addToCache(seoRoute: string, data: Page) {
    if (!cachedPages.value[seoRoute]) cachedPages.value[seoRoute] = data;
  }

  return {
    currentPage,
    cachedPages,
    addToCache,
    findCachedPageBySeoRoute,
  };
}
