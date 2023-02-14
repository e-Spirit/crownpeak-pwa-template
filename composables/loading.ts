export function useLoading() {
  const loading = useState<boolean>("loading", () => true);
  return { loading };
}
