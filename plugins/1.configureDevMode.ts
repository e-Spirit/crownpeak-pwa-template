export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig() // .env
  const appConfig = useAppConfig() // app.config.ts
  const { showDev } = useDev()
  showDev.value =
    appConfig?.devMode || runtimeConfig?.private?.devMode === 'true'
})
