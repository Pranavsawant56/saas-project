'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// Dynamically import locomotive-scroll only on client side
let LocomotiveScroll = null;

if (typeof window !== 'undefined') {
  import('locomotive-scroll').then((module) => {
    LocomotiveScroll = module.default;
  });
}

gsap.registerPlugin(ScrollTrigger);

export const useLocomotiveScroll = (enabled = true) => {
  const scrollRef = useRef(null);
  const locomotiveRef = useRef(null);
  const initTimeoutRef = useRef(null);

  useEffect(() => {
    // Check if we're on client side
    if (typeof window === 'undefined' || !enabled) return;

    // Wait for locomotive-scroll to be loaded
    const waitForLocomotiveScroll = () => {
      if (!LocomotiveScroll) {
        initTimeoutRef.current = setTimeout(waitForLocomotiveScroll, 100);
        return;
      }

      initScroll();
    };

    const initScroll = () => {
      if (!scrollRef.current || !LocomotiveScroll) return;

      try {
        const isMobile = window.innerWidth < 768;

        // Only initialize locomotive scroll on larger screens
        if (!isMobile) {
          locomotiveRef.current = new LocomotiveScroll({
            el: scrollRef.current,
            smooth: true,
            smartphone: {
              smooth: false,
              breakpoint: 768,
            },
            tablet: {
              smooth: true,
              breakpoint: 768,
            },
            multiplier: 1,
            lerp: 0.1,
            class: 'is-reveal',
            scrollFromAnywhere: true,
            resetNativeScroll: true,
            direction: 'vertical',
          });

          // Update ScrollTrigger when locomotive scroll updates
          if (locomotiveRef.current) {
            locomotiveRef.current.on('scroll', () => {
              ScrollTrigger.update();
            });

            // Refresh ScrollTrigger on load
            window.addEventListener('load', () => {
              if (locomotiveRef.current) {
                locomotiveRef.current.update();
                ScrollTrigger.refresh();
              }
            });
          }
        } else {
          // On mobile, use native smooth scrolling
          if (scrollRef.current) {
            scrollRef.current.style.scrollBehavior = 'smooth';
          }
        }

        // Initial refresh
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
      } catch (error) {
        console.warn('Locomotive Scroll initialization:', error.message);
      }
    };

    // Start waiting for locomotive scroll
    initTimeoutRef.current = setTimeout(waitForLocomotiveScroll, 100);

    // Handle window resize
    const handleResize = () => {
      if (locomotiveRef.current) {
        try {
          locomotiveRef.current.update();
          ScrollTrigger.refresh();
        } catch (error) {
          console.warn('Error during scroll update:', error.message);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clear timeout
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }

      // Remove event listener
      window.removeEventListener('resize', handleResize);

      // Cleanup
      try {
        if (locomotiveRef.current) {
          locomotiveRef.current.destroy();
          locomotiveRef.current = null;
        }

        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach((trigger) => {
          try {
            trigger.kill();
          } catch (error) {
            // Silently ignore errors during cleanup
          }
        });
      } catch (error) {
        console.warn('Error during cleanup:', error.message);
      }
    };
  }, [enabled]);

  return { scrollRef, locomotiveRef };
};

export default useLocomotiveScroll;
