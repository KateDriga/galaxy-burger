import { useEffect, useState } from 'react';

export const useIsInViewport = refs => {
  const [intersectingRef, setIntersectingRef] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top > 0) {
          setIntersectingRef(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    refs.forEach(r => observer.observe(r.current));

    return () => {
      observer.disconnect();
    };
  }, [refs]);

  return [...refs.entries()].find(
    ([_, v]) => v.current === intersectingRef
  )?.[0];
};
