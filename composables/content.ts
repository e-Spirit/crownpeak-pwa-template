import { Page } from "fsxa-api";

export function useContent() {
  const currentPage = useState<Page | null>("currentPage");
  const cachedPages = useState<{
    [caasId: string]: Page;
  }>("cachedPages", () => ({}));

  function findCachedPageByCaaSId(caasDocumentId: string) {
    return cachedPages.value[caasDocumentId];
  }

  function addToCache(key: string, data: Page) {
    if (!cachedPages.value[key]) cachedPages.value[key] = data;
  }

  return {
    currentPage,
    cachedPages,
    addToCache,
    findCachedPageByCaaSId,
  };
}
