type ConditionalWrapperParams = {
  condition: boolean | undefined;
  wrapper: (wrapperChildren: JSX.Element) => JSX.Element;
  children: JSX.Element;
};

export const ConditionalWrapper: ({}: ConditionalWrapperParams) => JSX.Element =
  ({condition, wrapper, children}: ConditionalWrapperParams) =>
    condition === true ? wrapper(children) : children;
