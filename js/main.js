document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Header Scroll Effect
       ========================================== */
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state


    /* ==========================================
       2. Hero Slider (Carousel)
       ========================================== */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let slideInterval = null;
    const slideDuration = 6000; // 6 seconds

    const updateSlider = (index) => {
        // Remove active class from current elements
        slides[currentSlide].classList.remove('active');
        indicators[currentSlide].classList.remove('active');

        // Set current slide index
        currentSlide = (index + slides.length) % slides.length;

        // Add active class to new elements
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        updateSlider(currentSlide + 1);
    };

    const prevSlide = () => {
        updateSlider(currentSlide - 1);
    };

    const startSlideShow = () => {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, slideDuration);
    };

    const stopSlideShow = () => {
        if (slideInterval) clearInterval(slideInterval);
    };

    // Button controls
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startSlideShow(); // Reset interval
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startSlideShow(); // Reset interval
        });
    }

    // Indicator controls
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlider(index);
            startSlideShow(); // Reset interval
        });
    });

    // Initialize slide show
    startSlideShow();


    /* ==========================================
       3. Curated Projects Filter
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to current button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                    // Add fade-in transition
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    /* ==========================================
       4. Testimonials Slider
       ========================================== */
    const testSlides = document.querySelectorAll('.testimonial-slide');
    const testPrev = document.querySelector('.test-prev');
    const testNext = document.querySelector('.test-next');
    let currentTest = 0;

    const updateTestimonial = (index) => {
        testSlides[currentTest].classList.remove('active');
        currentTest = (index + testSlides.length) % testSlides.length;
        testSlides[currentTest].classList.add('active');
    };

    if (testNext) {
        testNext.addEventListener('click', () => {
            updateTestimonial(currentTest + 1);
        });
    }

    if (testPrev) {
        testPrev.addEventListener('click', () => {
            updateTestimonial(currentTest - 1);
        });
    }


    /* ==========================================
       5. Mobile Navigation Menu
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('opened');
        mobileOverlay.classList.toggle('opened');
        
        // Prevent background scrolling when menu is open
        if (mobileOverlay.classList.contains('opened')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('opened');
            mobileOverlay.classList.remove('opened');
            document.body.style.overflow = '';
        });
    });


    /* ==========================================
       6. Search Overlay Toggle
       ========================================== */
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('opened');
            document.body.style.overflow = 'hidden';
            setTimeout(() => searchInput.focus(), 300);
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('opened');
            document.body.style.overflow = '';
        });
    }

    // Close search overlay with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('opened')) {
            searchOverlay.classList.remove('opened');
            document.body.style.overflow = '';
        }
    });

});
