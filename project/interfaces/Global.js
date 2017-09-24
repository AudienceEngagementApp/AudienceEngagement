declare var module: HotModuleReplacement;

declare type HotModuleReplacement = {
  hot: {
    accept: (path: string, action: () => void) => void,
  },
}

declare module CSSModule {
  declare var exports: { [key: string]: string };
}
