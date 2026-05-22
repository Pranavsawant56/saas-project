import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax effect with smooth motion
 * @param {HTMLElement} element - The element to apply parallax to
 * @param {number} speed - Speed multiplier (0.5 = slower, 1 = normal, 2 = faster)
 * @param {string} trigger - Trigger element selector
 */
export const parallaxEffect = (element, speed = 0.5, trigger = null) => {
  if (!element) return;

  gsap.to(element, {
    y: window.innerHeight * (1 - speed) * 0.5,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
  });
};

/**
 * Fade up animation on scroll
 * @param {HTMLElement} element - The element to animate
 * @param {number} delay - Animation delay in seconds
 * @param {string} trigger - Trigger element selector
 */
export const fadeUpAnimation = (element, delay = 0, trigger = null) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay,
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        markers: false,
      },
    }
  );
};

/**
 * Blur in animation
 * @param {HTMLElement} element - The element to animate
 * @param {number} delay - Animation delay
 */
export const blurInAnimation = (element, delay = 0) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      filter: 'blur(10px)',
    },
    {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out',
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 45%',
        scrub: false,
        markers: false,
      },
    }
  );
};

/**
 * Scale in animation
 * @param {HTMLElement} element - The element to animate
 * @param {number} delay - Animation delay
 */
export const scaleInAnimation = (element, delay = 0) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 45%',
        scrub: false,
        markers: false,
      },
    }
  );
};

/**
 * Stagger children animation
 * @param {HTMLElement} container - Container with children
 * @param {number} staggerDelay - Delay between each child animation
 */
export const staggerAnimation = (container, staggerDelay = 0.1) => {
  if (!container) return;

  const children = container.querySelectorAll('[data-stagger]');

  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        end: 'top 40%',
        scrub: false,
        markers: false,
      },
    }
  );
};

/**
 * Floating motion effect
 * @param {HTMLElement} element - The element to animate
 * @param {number} intensity - How much to float (default 20px)
 */
export const floatingMotion = (element, intensity = 20) => {
  if (!element) return;

  gsap.to(element, {
    y: intensity,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Horizontal drift effect
 * @param {HTMLElement} element - The element to animate
 * @param {number} distance - How far to drift (default 15px)
 */
export const horizontalDrift = (element, distance = 15) => {
  if (!element) return;

  gsap.to(element, {
    x: distance,
    duration: 4,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Rotation effect on scroll
 * @param {HTMLElement} element - The element to rotate
 * @param {number} degree - Rotation amount
 */
export const rotationEffect = (element, degree = 5) => {
  if (!element) return;

  gsap.to(element, {
    rotation: degree,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
  });
};

/**
 * Text reveal animation
 * @param {HTMLElement} element - The text element
 */
export const textRevealAnimation = (element) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      backgroundPosition: '100% 0',
    },
    {
      backgroundPosition: '0 0',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 45%',
        scrub: false,
        markers: false,
      },
    }
  );
};

/**
 * Smooth zoom on scroll
 * @param {HTMLElement} element - The element to zoom
 * @param {number} scale - Final scale value
 */
export const smoothZoom = (element, scale = 1.1) => {
  if (!element) return;

  gsap.to(element, {
    scale,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1.5,
      markers: false,
    },
  });
};

/**
 * Batch animate elements with stagger
 * @param {string} selector - CSS selector for elements
 * @param {Object} config - Animation configuration
 */
export const batchAnimateElements = (selector, config = {}) => {
  const {
    duration = 1,
    delay = 0,
    stagger = 0.1,
    fromVars = { opacity: 0, y: 40 },
    toVars = { opacity: 1, y: 0 },
  } = config;

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  gsap.fromTo(elements, fromVars, {
    ...toVars,
    duration,
    delay,
    stagger,
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 75%',
      end: 'top 25%',
      scrub: false,
      markers: false,
    },
  });
};

export default {
  parallaxEffect,
  fadeUpAnimation,
  blurInAnimation,
  scaleInAnimation,
  staggerAnimation,
  floatingMotion,
  horizontalDrift,
  rotationEffect,
  textRevealAnimation,
  smoothZoom,
  batchAnimateElements,
};
