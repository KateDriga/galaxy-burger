import { useEffect, useState } from 'react';
import { TCategoryRef } from '../utils/ts-types/ingredient-types';

export const useIsInViewport = (
  refs: Array<TCategoryRef>
): TCategoryRef | null => {
  const [intersectingRef, setIntersectingRef] = useState<Element | null>(null);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top > 0) {
          setIntersectingRef(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    refs.forEach(r => r.current && observer.observe(r.current));

    return () => {
      observer.disconnect();
    };
  }, [refs]);

  return refs.find(r => r.current === intersectingRef) ?? null;
};
