import { FetchByFilterParams, FetchElementParams } from "fsxa-api";
import appConfig from "../fixtures/appConfig.json";
import runtimeConfig from "../fixtures/runtimeConfig.json";
import toplevelDE from "../fixtures/toplevelNavigation_de_DE.json";
import toplevelEN from "../fixtures/toplevelNavigation_en_GB.json";
import page from "../fixtures/page.json";
import projectProperties from "../fixtures/projectProperties.json";
import { useDev } from "../../composables/showDev";
import { useLocale } from "../../composables/locale";
import { useContent } from "../../composables/content";
import { useNavigationData } from "../../composables/navigation";
import { useProjectProperties } from "../../composables/projectProperties";
import {
  fetchTopLevelNavigation,
  fetchNavigationItemFromRoute,
  fetchProducts,
  getLocaleFromNavigationItem,
} from "../../utils/fsxa";

let mockedState: any = {};

export function clearMockedState() {
  mockedState = {};
}

export function defineNuxtPlugin(fun: Function) {
  return fun;
}

export function useRuntimeConfig() {
  return runtimeConfig;
}

export function useAppConfig() {
  return appConfig;
}

export function useState<T>(key: string, init?: () => T) {
  if (!mockedState[key]) {
    mockedState[key] = {
      value: init ? init() : undefined,
    };
  }
  return mockedState[key];
}

export function useNuxtApp() {
  return {
    $fsxaApi: {
      fetchNavigation: ({ locale }: { locale: string }) =>
        locale === "de_DE" ? toplevelDE : toplevelEN,
      fetchProjectProperties: (_config: { locale: string }) =>
        projectProperties,
      fetchElement: (_config: FetchElementParams) => page,
      fetchByFilter: (_config: FetchByFilterParams) => ({
        items: [],
      }),
    },
  };
}

export function useAsyncData(fun: Function, _options: { watch: any[] }) {
  fun();
  return { pending: false };
}

export function definePageMeta() {}

export function useHead() {}

export function navigateTo(_args: unknown) {}

export function createError(err: {
  statusCode: number;
  statusMessage: string;
}) {
  return new Error(err.statusMessage);
}

export function useRoute() {
  return {
    fullPath: "/?testquery#teshash",
    query: "testquery",
    hash: "testhash",
    path: "/",
    params: {},
  };
}

export function useRouter() {
  return {
    push: navigateTo,
    currentRoute: {
      value: {
        path: "/",
      },
    },
  };
}

export {
  useDev,
  useLocale,
  fetchTopLevelNavigation,
  fetchNavigationItemFromRoute,
  fetchProducts,
  useContent,
  useNavigationData,
  useProjectProperties,
  getLocaleFromNavigationItem,
};
