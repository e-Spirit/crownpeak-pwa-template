export function useDev() {
  const showDev = useState<boolean>("showDev");
  return { showDev };
}
