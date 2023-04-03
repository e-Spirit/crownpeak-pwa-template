export function useDev() {
  const showDev = useState<boolean>('showDev', () => false)
  return { showDev }
}
