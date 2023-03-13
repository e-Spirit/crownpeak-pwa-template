declare module "fs-tpp-api";

type OnRequestPreviewElementHandler = (previewId: string) => void;

type OnRerenderViewHandler = () => void;

type OnNavigationChangeHandler = (newPagePreviewId: string | null) => void;

type OnContentChangeHandler = (
  node: HTMLElement,
  previewId: string,
  content: unknown
) => any;
