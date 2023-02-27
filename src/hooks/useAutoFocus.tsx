import { useEffect, useRef } from "react";

function useAutoFocus<TElement extends HTMLElement>() {
  const ref = useRef<TElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return ref;
}

export default useAutoFocus;
