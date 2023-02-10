import { ProjectProperties } from "fsxa-api/dist/types";

export function useProjectProperties() {
  const projectProperties = useState<ProjectProperties | undefined>(
    "projectProperties"
  );

  return { projectProperties };
}
