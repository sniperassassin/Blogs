/* ========================================
   SILIGURI-DARJEELING TOURISM BLOG JAVASCRIPT
   Interactive Features & Smooth UX
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Smooth Scroll with Offset for Fixed Navbar
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // Intersection Observer for Fade-in Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to cards
    const animatedElements = document.querySelectorAll(
        '.transport-card, .destination-card, .famous-card, .tip-card, .itinerary-card, .development-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    // ========================================
    // Active Navigation Link on Scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ========================================
    // Back to Top Button (Optional Enhancement)
    // ========================================
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2c5f2d 0%, #97b339 100%);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(button);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    };
    
    createBackToTopButton();
    
    // ========================================
    // Lazy Loading Images (if any are added later)
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // Copy Link to Clipboard (for sharing)
    // ========================================
    const addShareFunctionality = () => {
        const shareButtons = document.querySelectorAll('[data-share]');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const url = window.location.href;
                try {
                    await navigator.clipboard.writeText(url);
                    // Show feedback
                    const originalText = button.textContent;
                    button.textContent = '✓ Link Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    };
    
    addShareFunctionality();
    
    // ========================================
    // Print Functionality
    // ========================================
    const addPrintFunctionality = () => {
        const printButtons = document.querySelectorAll('[data-print]');
        
        printButtons.forEach(button => {
            button.addEventListener('click', () => {
                window.print();
            });
        });
    };
    
    addPrintFunctionality();
    
    // ========================================
    // Accessibility Enhancements
    // ========================================
    
    // Keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.destination-card, .tip-card');
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                card.click();
            }
        });
    });
    
    // Announce page sections to screen readers
    const announceSectionChange = () => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(announcement);
        
        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionTitle = section.querySelector('h2, h1');
                        if (sectionTitle) {
                            announcement.textContent = `Now viewing: ${sectionTitle.textContent}`;
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(section);
        });
    };
    
    announceSectionChange();
    
    // ========================================
    // Performance Monitoring
    // ========================================
    if ('PerformanceObserver' in window) {
        try {
            const perfObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.loadTime > 2500) {
                        console.warn(`Slow loading detected: ${entry.name}`);
                    }
                });
            });
            
            perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
        } catch (e) {
            // Observer not supported in some browsers
            console.log('Performance Observer not fully supported');
        }
    }
    
    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🏔️ Welcome to Siliguri-Darjeeling Tourism Guide! 🏔️', 
        'color: #2c5f2d; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%cExplore the beauty of Northeast India through this comprehensive guide.', 
        'color: #97b339; font-size: 14px; padding: 5px;');
    
    // ========================================
    // Easter Egg: Konami Code
    // ========================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            document.body.style.animation = 'rainbow 3s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 3000);
            
            console.log('🎉 Konami Code activated! Enjoy the rainbow! 🌈');
        }
    });
    
    // Rainbow animation CSS (injected)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Initialize all features
    // ========================================
    console.log('✓ All interactive features initialized successfully');
    
    // Mark page as fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ========================================
// Service Worker Registration (Progressive Web App - Optional)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ========================================
// Export functions for testing (if needed)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export any functions that need to be tested
    };
}
