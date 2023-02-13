import { Page } from "fsxa-api";

export function useContent() {
  const content = useState<Page | null>();
  return { content };
}
