import { useEffect, useMemo, useState } from 'react';

export const useIsInViewport = refs => {
  const [intersectingRef, setIntersectingRef] = useState(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting || entry.boundingClientRect.top > 0) {
            setIntersectingRef(entry.target);
          }
        },
        { threshold: 0.5 }
      ),
    []
  );

  useEffect(() => {
    refs.forEach(r => observer.observe(r.current));
    return () => {
      observer.disconnect();
    };
  }, [refs, observer]);

  return intersectingRef;
};
