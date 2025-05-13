
import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useInView(
  options: IntersectionObserverOptions = {}
) {
  const [ref, setRef] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { root = null, rootMargin = '0px', threshold = 0, triggerOnce = false } = options;

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // Unobserve if triggerOnce is true and element is intersecting
        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold, triggerOnce]);

  return { ref: setRef, inView: isIntersecting };
}
