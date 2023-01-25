import { it, expect, vi } from "vitest";
import { FSXAApiSingleton } from "fsxa-api";
import setupRemoteApi from "../../plugins/1.setupRemoteApi.server";
import runtimeConfig from "../fixtures/runtimeConfig.json";
import appConfig from "../fixtures/appConfig.json";

it("setupRemoteApi => FSXAApiSingleton is initialized", () => {
  const initSingleton = vi.spyOn(FSXAApiSingleton, "init");
  setupRemoteApi();
  expect(initSingleton).toHaveBeenCalledTimes(1);
  expect(FSXAApiSingleton.instance).toEqual(
    expect.objectContaining({
      _apikey: runtimeConfig.private.apiKey,
      _maxReferenceDepth: appConfig.maxReferenceDepth,
    })
  );
});
