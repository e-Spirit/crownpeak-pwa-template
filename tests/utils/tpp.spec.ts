import { it, describe, vitest, expect, beforeEach, afterEach } from "vitest";
import TPP_SNAP from "fs-tpp-api";
import {
  onNavigationChangeHandler,
  onRequestPreviewElementHandler,
  onRerenderViewHandler,
} from "../../utils/tpp";
import * as FSXA_UTILS from "../../utils/fsxa";
import * as NAVIGATION from "../../composables/navigation";

const oldWindowLocation = window.location;

beforeEach(() => {
  // @ts-ignore
  delete window.location;

  // @ts-ignore
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      reload: {
        configurable: true,
        value: vitest.fn(),
      },
    }
  );
});

afterEach(() => {
  window.location = oldWindowLocation;
});

describe("tpp utils", () => {
  describe("onNavigationChangeHandler", () => {
    it("call with no newPagePreviewId => dont do anything", () => {
      onNavigationChangeHandler("foo");

      expect(window.location.reload).not.toHaveBeenCalled();
    });

    it("call with newPagePreviewId => call location.reload()", () => {
      onNavigationChangeHandler(null);

      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe("onRequestPreviewElementHandler", () => {
    it("onRequestPreviewElementHandler with valid preview id => should call setPreviewElement and navigate", async () => {
      TPP_SNAP.setPreviewElement = vitest.fn();

      await onRequestPreviewElementHandler(
        "9266a682-aa19-4723-8761-1c9136945dd4.de_DE"
      );

      expect(TPP_SNAP.setPreviewElement).toHaveBeenCalled();
    });

    it("onRequestPreviewElementHandler with invalid preview id => do nothing", () => {
      TPP_SNAP.setPreviewElement = vitest.fn();

      onRequestPreviewElementHandler("");

      expect(TPP_SNAP.setPreviewElement).not.toHaveBeenCalled();
    });
  });

  describe("onRerenderViewHandler", () => {
    it("onRerenderViewHandler with valid page preview id and active nav item is page => should call fetchPageById", async () => {
      TPP_SNAP.getPreviewElement = vitest
        .fn()
        .mockReturnValue("9266a682-aa19-4723-8761-1c9136945dd4.de_DE");

      // @ts-ignore
      vitest.spyOn(NAVIGATION, "useNavigationData").mockReturnValue({
        activeNavigationItem: {
          value: {
            seoRouteRegex: null,
          },
        },
      });

      vitest.spyOn(FSXA_UTILS, "fetchPageById");

      await onRerenderViewHandler();

      expect(FSXA_UTILS.fetchPageById).toHaveBeenCalled();
    });

    it("onRerenderViewHandler with valid preview id and active nav item is dataset => should call fetchDatasetById", async () => {
      TPP_SNAP.getPreviewElement = vitest
        .fn()
        .mockReturnValue("9266a682-aa19-4723-8761-1c9136945dd4.de_DE");

      // @ts-ignore
      vitest.spyOn(NAVIGATION, "useNavigationData").mockReturnValue({
        activeNavigationItem: {
          value: {
            seoRouteRegex: "seoroute/regex",
          },
        },
      });

      vitest.spyOn(FSXA_UTILS, "fetchDatasetById");

      await onRerenderViewHandler();

      expect(FSXA_UTILS.fetchDatasetById).toHaveBeenCalled();
    });

    it("onRerenderViewHandler with invalid preview id (missing locale) => do nothing", async () => {
      TPP_SNAP.getPreviewElement = vitest
        .fn()
        .mockReturnValue("9266a682-aa19-4723-8761-1c9136945dd4");

      vitest.spyOn(FSXA_UTILS, "fetchDatasetById");
      vitest.spyOn(FSXA_UTILS, "fetchPageById");

      await onRerenderViewHandler();

      expect(FSXA_UTILS.fetchDatasetById).not.toHaveBeenCalled();
      expect(FSXA_UTILS.fetchPageById).not.toHaveBeenCalled();
    });

    it("onRerenderViewHandler with invalid preview id => do nothing", async () => {
      TPP_SNAP.getPreviewElement = vitest.fn().mockReturnValue("");

      vitest.spyOn(FSXA_UTILS, "fetchDatasetById");
      vitest.spyOn(FSXA_UTILS, "fetchPageById");

      await onRerenderViewHandler();

      expect(FSXA_UTILS.fetchDatasetById).not.toHaveBeenCalled();
      expect(FSXA_UTILS.fetchPageById).not.toHaveBeenCalled();
    });
  });
});
