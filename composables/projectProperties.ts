import { ProjectProperties } from "fsxa-api";

export function useProjectProperties() {
  const projectProperties = useState<ProjectProperties | null>(
    "projectProperties"
  );

  return { projectProperties };
}
