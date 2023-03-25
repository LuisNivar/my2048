import { useEffect } from "react";
import useEventCallback from "./useEventCallback";

function useOnResize(
  callback: ResizeObserverCallback,
  element: HTMLElement = document.body
) {
  // Prevents the callback from changing on every render
  const onResizeCallback = useEventCallback(callback);

  useEffect(() => {
    const observer = new ResizeObserver(onResizeCallback);
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, [element, onResizeCallback]);
}

export default useOnResize;
