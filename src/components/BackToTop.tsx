import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate scroll progress
  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    setScrollProgress(progress);
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress);
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center transition-all duration-300',
        'hover:scale-110 hover:shadow-xl',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
      aria-label="Back to top"
    >
      {/* Outer progress circle */}
      <svg className="absolute h-16 w-16 -m-2">
        <circle
          className="text-gray-200"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="32"
          cy="32"
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          strokeWidth="3"
          strokeDasharray={188.5}
          strokeDashoffset={188.5 - (188.5 * scrollProgress) / 100}
          strokeLinecap="round"
          stroke={`rgb(${224 - (224 - 249) * (scrollProgress / 100)}, ${37 - (37 - 170) * (scrollProgress / 100)}, ${44 - (44 - 49) * (scrollProgress / 100)})`}
          fill="transparent"
          r="30"
          cx="32"
          cy="32"
          transform="rotate(-90 32 32)"
        />
      </svg>

      {/* Inner button circle */}
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-gray-50">
        <ArrowUp className="h-5 w-5 text-primary transition-transform duration-300 hover:scale-110" />
      </div>
    </button>
  );
};
