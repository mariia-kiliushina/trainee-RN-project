type ConditionalWrapperParams = {
  condition: boolean | undefined;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
};

export const ConditionalWrapper: ({}: ConditionalWrapperParams) => JSX.Element =
  ({condition, wrapper, children}: ConditionalWrapperParams) =>
    condition === true ? wrapper(children) : children;
