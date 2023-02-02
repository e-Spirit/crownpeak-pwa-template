import appConfig from "../fixtures/appConfig.json";
import runtimeConfig from "../fixtures/runtimeConfig.json";
import toplevelDE from "../fixtures/toplevelNavigation_de_DE.json";
import toplevelEN from "../fixtures/toplevelNavigation_en_GB.json";
import { useLocale } from "../../composables/locale";
import { fetchTopLevelNavigation } from "../../utils/fsxa";

export function defineNuxtPlugin(fun: Function) {
  return fun;
}

export function useRuntimeConfig() {
  return runtimeConfig;
}

export function useAppConfig() {
  return appConfig;
}

export function useState<T>(_key: string, init?: () => T) {
  return {
    value: init ? init() : undefined,
  };
}

export function useNuxtApp() {
  return {
    $fsxaApi: {
      fetchNavigation: ({ locale }: { locale: string }) =>
        locale === "de_DE" ? toplevelDE : toplevelEN,
    },
  };
}

export function useAsyncData(fun: Function, _options: { watch: any[] }) {
  fun();
}

export { useLocale };

export { fetchTopLevelNavigation };
