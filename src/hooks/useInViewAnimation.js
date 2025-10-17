import { useEffect, useRef, useState } from "react";

export function useInViewAnimation(options = {}) {
  const ref = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
          observer.unobserve(el); // 🔥 run only once
        }
      },
      { threshold: 0, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isAnimated, options]);

  return [ref, isAnimated];
}
