export default defineNuxtRouteMiddleware(async (to) => {
  const {
    config: {
      value: { activeLocale },
    },
    getLocaleFromPath,
  } = useLocale();

  if (activeLocale) return true;

  await getLocaleFromPath(decodeURIComponent(to.path));

  return true;
});
