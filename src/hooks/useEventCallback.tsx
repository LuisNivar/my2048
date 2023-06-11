import { useRef, useEffect, useCallback } from "react";

function useEventCallback(callback: (...args: any[]) => unknown) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: unknown[]) => callbackRef.current(...args), []);
}

export default useEventCallback;
