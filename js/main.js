/**
 * Sun Soul Style - Client-Side Interactive Logic
 * Implements sticky navigation, custom cursor tracker, mobile menu toggles, 
 * scroll-triggered reveal animations, and adaptive video loading.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular components
  initResponsiveHeroVideo();
  initCustomCursor();
  initMobileMenu();
  initStickyHeader();
  initScrollReveal();
});

/**
 * 1. Adaptive Video Loader & Playback Verification
 * Swaps video files depending on the screen size (desktop vs mobile breakpoint)
 * and falls back to a static image if autoplay is disabled/fails.
 */
function initResponsiveHeroVideo() {
  const container = document.getElementById('hero-media-container');
  if (!container) return;

  const breakpoint = 768; // Tablet breakpoint
  const isDesktop = window.innerWidth >= breakpoint;
  
  const videoSrc = isDesktop ? 'assets/hero-video.mp4' : 'assets/hero-mobile.mp4';
  const fallbackImgSrc = 'assets/hero-interior.jpg';

  // Create Video element
  const videoEl = document.createElement('video');
  videoEl.className = 'hero-video';
  videoEl.muted = true;
  videoEl.loop = true;
  videoEl.playsInline = true;
  videoEl.autoplay = true;
  videoEl.preload = 'auto';
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('webkit-playsinline', '');

  // Add source
  const sourceEl = document.createElement('source');
  sourceEl.src = videoSrc;
  sourceEl.type = 'video/mp4';
  videoEl.appendChild(sourceEl);

  // Attempt video playback
  videoEl.play()
    .then(() => {
      // Autoplay succeeded: Clear container and append video
      container.innerHTML = '';
      container.appendChild(videoEl);
    })
    .catch((error) => {
      // Autoplay failed (Safari power-saving, user settings, etc.)
      // Fallback: keep the static poster image
      console.warn('Hero video autoplay failed. Falling back to static image.', error);
      container.innerHTML = `<img src="${fallbackImgSrc}" alt="Sun Soul Style Interior Living Space" class="hero-fallback-image">`;
    });

  // Listen for window resize to swap video source if crossing breakpoint
  let currentMode = isDesktop;
  window.addEventListener('resize', debounce(() => {
    const newIsDesktop = window.innerWidth >= breakpoint;
    if (newIsDesktop !== currentMode) {
      currentMode = newIsDesktop;
      initResponsiveHeroVideo(); // Re-initialize to swap video files
    }
  }, 250));
}

/**
 * 2. Sticky Header Transitions
 * Adds a solid backdrop class as the page scrolls down past 50px.
 */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Run once in case page starts scrolled
}

/**
 * 3. Mobile Hamburger & Navigation Slide-out
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('mobile-nav');
  
  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Restore scroll
    } else {
      navMenu.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking navigation links
  const links = navMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside menu
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
      toggleMenu();
    }
  });
}

/**
 * 4. Custom Cursor Movement & Interaction States (Desktop Only)
 */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  // Track coordinates
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Instant cursor position
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth lerped follower position
  function render() {
    const ease = 0.12; // lower = smoother lag
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;
    
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // Setup Hover States
  const interactiveSelectors = 'a, button, select, input, textarea, .collection-item, .mobile-menu-toggle';
  const bindHoverEvents = () => {
    const elements = document.querySelectorAll(interactiveSelectors);
    elements.forEach(el => {
      // Mouse Enter
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      // Mouse Leave
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  };

  bindHoverEvents();

  // Re-bind hover events for dynamically loaded/changed elements
  const observer = new MutationObserver(bindHoverEvents);
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * 5. IntersectionObserver Scroll Reveal
 * Slow, elegant editorial transitions as blocks enter viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1, // Trigger when 10% is visible
      rootMargin: '0px 0px -60px 0px' // Offset to trigger slightly before coming into view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates only once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
}

/**
 * Utility: Debounce helper for performance optimization during scroll/resize events
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
