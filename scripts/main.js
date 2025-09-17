document.addEventListener('DOMContentLoaded', () => {
    /**
     * Initializes the project carousel functionality.
     */
    function initCarousel() {
        const portfolioSection = document.getElementById('portfolio');
        if (!portfolioSection) return;

        const prevButton = portfolioSection.querySelector('.carousel-button.prev');
        const nextButton = portfolioSection.querySelector('.carousel-button.next');
        const projectsWrapper = portfolioSection.querySelector('.projects-wrapper');
        const projectsContainer = portfolioSection.querySelector('.projects');

        if (!prevButton || !nextButton || !projectsWrapper || !projectsContainer) return;

        const scrollProjects = (direction) => {
            const card = projectsContainer.querySelector('.project-card');
            if (!card) return;

            const cardWidth = card.offsetWidth;
            const gap = parseInt(window.getComputedStyle(projectsContainer).gap, 10) || 20;
            const scrollAmount = (cardWidth + gap) * direction;

            projectsWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };

        nextButton.addEventListener('click', () => scrollProjects(1));
        prevButton.addEventListener('click', () => scrollProjects(-1));
    }

    /**
     * Initializes the dark mode toggle functionality.
     */
    function initDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (!darkModeToggle) return;

        const enableDarkMode = () => {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.checked = true;
        };

        const disableDarkMode = () => {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.checked = false;
        };

        if (localStorage.getItem('darkMode') === 'enabled') {
            enableDarkMode();
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    /**
     * Initializes the active menu link highlighting on scroll (ScrollSpy).
     */
    function initScrollSpy() {
        const menuLinks = document.querySelectorAll('.menu-link');
        const sections = document.querySelectorAll('main > section');
        const header = document.querySelector('header');

        if (menuLinks.length === 0 || sections.length === 0 || !header) return;

        const onScroll = () => {
            let currentSectionId = '';
            const scrollPosition = window.pageYOffset;
            const headerOffset = header.offsetHeight + 23;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollPosition >= sectionTop - headerOffset) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            menuLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); 
    }

    /**
     * Initializes smooth scrolling for anchor links, accounting for the fixed header.
     */
    function initSmoothScrolling() {
        const menuLinks = document.querySelectorAll('.menu-link');
        const header = document.querySelector('header');

        if (!header) return;

        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerOffset = header.offsetHeight + 20; 
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * Updates the copyright year in the footer to the current year.
     */
    function updateCopyrightYear() {
        const copyrightYearSpan = document.getElementById('copyright-year');
        if (copyrightYearSpan) {
            copyrightYearSpan.textContent = new Date().getFullYear();
        }
    }

    /**
     * Handles the contact form submission simulation.
     */
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Prevent the default form submission
                e.preventDefault(); 
                // Redirect to the "thank you" page
                window.location.href = contactForm.action;
            });
        }
    }

    /**
     * Animation for timeline items 
     */
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.33
        });

        timelineItems.forEach(item => observer.observe(item));
    }

    /**
     * Initializes a scroll-triggered animation for elements using IntersectionObserver.
     */
    function initScrollAnimation() {
        const hiddenElements = document.querySelectorAll('.hidden-section');
        if (hiddenElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-section');
                } else {
                    entry.target.classList.remove('show-section');
                }
            });
        }, {
            threshold: 0.1
        });

        hiddenElements.forEach((el) => observer.observe(el));
    }

    /**
     * Initializes animations for elements in the "About Me" section.
     */
    function initAboutMeAnimation() {
        const animatedElements = document.querySelectorAll('.animate-from-left, .animate-from-right');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.30
        });

        animatedElements.forEach(item => observer.observe(item));
    }

    // --- Initialize all features ---
    initCarousel();
    initDarkMode();
    initScrollSpy();
    initSmoothScrolling();
    updateCopyrightYear();
    initContactForm();
    initScrollAnimation();
    initTimelineAnimation();
    initAboutMeAnimation();
});