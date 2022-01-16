import { useRef, useEffect } from 'react';
/* import { useRef, useCallbacks } from 'react';
export function usePersistFn<T extends (...args: any[]) => any> (fn: T) {
  const ref = useRef < Function > (() => {
    throw new Error('Cannot call function while rendering.')
  });
  ref.current = fn;
  return useCallbacks(ref.current as T, [ref]);
} */


export function useWhyDidYouUpdate (name, props) {
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    previousProps.current = props;
  });
}