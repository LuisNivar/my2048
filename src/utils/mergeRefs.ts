function mergeRefs(
  ...refs: (React.MutableRefObject<unknown> | React.RefCallback<unknown>)[]
): React.RefCallback<unknown> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else {
        ref.current = value;
      }
    });
  };
}

export default mergeRefs;
