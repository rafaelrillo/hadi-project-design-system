// Path: src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 375,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1200,
  '2xl': 1440,
};

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < breakpoints.xs) {
        setBreakpoint('xs');
      } else if (width < breakpoints.sm) {
        setBreakpoint('sm');
      } else if (width < breakpoints.md) {
        setBreakpoint('md');
      } else if (width < breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width < breakpoints.xl) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

export function useIsMobile(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
}

export function useIsTablet(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'md' || breakpoint === 'lg';
}

export function useIsDesktop(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
}

// Media query hook for custom queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
