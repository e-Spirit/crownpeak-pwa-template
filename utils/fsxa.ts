import {
  FSXAProxyApi,
  NavigationItem,
  ComparisonQueryOperatorEnum,
  LogicalQueryOperatorEnum,
  Dataset,
  Page,
} from "fsxa-api";

export const fetchDatasetByRoute = async (
  api: FSXAProxyApi,
  locale: string,
  route: string
) => {
  const data = await api.fetchByFilter({
    locale,
    pagesize: 1,
    filters: [
      {
        operator: LogicalQueryOperatorEnum.OR,
        filters: [
          {
            field: "route",
            operator: ComparisonQueryOperatorEnum.EQUALS,
            value: route,
          },
          {
            field: "routes.route",
            operator: ComparisonQueryOperatorEnum.EQUALS,
            value: route,
          },
        ],
      },
      {
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: "Dataset",
        field: "fsType",
      },
    ],
  });

  const bestMatch = data.items[0];

  return bestMatch as Dataset | null;
};

export const fetchDatasetById = async (
  api: FSXAProxyApi,
  id: string,
  locale: string
) => {
  const dataset = await api.fetchByFilter({
    filters: [
      {
        operator: ComparisonQueryOperatorEnum.EQUALS,
        value: id,
        field: "identifier",
      },
    ],
    locale,
  });

  return dataset.items[0] as Dataset | null;
};

export const fetchPageById = async (
  api: FSXAProxyApi,
  locale: string,
  id: string
) => {
  const page = await api.fetchElement<Page>({
    id,
    locale,
  });
  return page ?? null;
};

export const fetchPageByRoute = async (
  api: FSXAProxyApi,
  locale: string,
  route: string,
  cachedDataset?: Dataset | null
) => {
  const dataset =
    cachedDataset ?? (await fetchDatasetByRoute(api, locale, route));

  if (!dataset) throw new Error("No dataset found");

  const firstRoute = dataset.routes?.[0];
  if (!firstRoute) throw new Error("No route found");

  const page = await fetchPageById(api, locale, firstRoute.pageRef);

  return page || null;
};

export const fetchPageFromNavigationItem = (
  api: FSXAProxyApi,
  item: NavigationItem,
  locale: string,
  path: string,
  cachedDataset?: Dataset | null
) => {
  const { caasDocumentId, seoRouteRegex } = item;

  const isProjection = seoRouteRegex !== null;

  return isProjection
    ? fetchPageByRoute(api, locale, path, cachedDataset)
    : fetchPageById(api, locale, caasDocumentId);
};

export const fetchNavigationItemFromRoute = async (
  api: FSXAProxyApi,
  route: string
) => {
  // This could also be cached
  const data = await api.fetchNavigation({
    initialPath: route,
    locale: "",
  });
  if (!data) throw new Error("No navigation data found");

  // If any of the following lines throw an error, the Navigation Service is probably broken?
  const seoRouteId = data.seoRouteMap[route === "/" ? data.pages.index : route];

  if (!seoRouteId) throw new Error("No matching route found");

  const item = data.idMap[seoRouteId];
  if (!item) throw new Error("No navigation item found");

  return item;
};

export const getLocaleFromNavigationItem = (item: NavigationItem) => {
  const splitted = item?.contentReference?.split(".");

  if (!splitted || splitted.length < 2)
    throw new Error("No valid contentReference found");

  const locale = splitted?.pop();

  if (!locale) throw new Error("No locale found");

  return locale;
};

export const fetchTopLevelNavigation = (api: FSXAProxyApi, locale: string) => {
  return api.fetchNavigation({
    locale,
  });
};

export const getTranslatedRouteFromNavItem = async (
  api: FSXAProxyApi,
  navigationItemId: string,
  datasetId: string,
  locale: string
) => {
  const dataset = await fetchDatasetById(api, datasetId, locale);

  if (!dataset) throw new Error("No dataset found");

  const route = dataset.routes.find(
    (datasetRoute) => datasetRoute.pageRef === navigationItemId
  )?.route;

  if (!route) throw new Error("No route found");

  return { route, dataset };
};
