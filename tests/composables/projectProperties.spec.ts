import { it, expect, describe } from "vitest";
import { useProjectProperties } from "../../composables/projectProperties";

describe("useProjectProperties", () => {
  it("useProjectProperties => provide undefined default projectProperties", () => {
    const { projectProperties } = useProjectProperties();

    expect(projectProperties.value).toBeUndefined();
  });
});
