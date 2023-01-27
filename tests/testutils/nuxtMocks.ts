import appConfig from "../fixtures/appConfig.json";
import runtimeConfig from "../fixtures/runtimeConfig.json";
import navigationDataSeoRoute from "../fixtures/navigationDataSeoRoute.json";

export function defineNuxtPlugin(fun: Function) {
  return fun;
}

export function useRuntimeConfig() {
  return runtimeConfig;
}

export function useAppConfig() {
  return appConfig;
}

export function useState<T>(_key: string, init: () => T) {
  return {
    value: init(),
  };
}

export function useNuxtApp() {
  return {
    $fsxaApi: {
      fetchNavigation: () => navigationDataSeoRoute,
    },
  };
}
