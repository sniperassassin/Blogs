// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookieConsent')) {
        showCookieBanner();
    }
});

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookieConsentBanner';
    banner.innerHTML = `
        <div class="cookie-consent-content">
            <p>
                🍪 <strong>This website uses cookies and third-party services</strong><br>
                We use cookies and similar technologies to enhance your browsing experience, serve personalized advertisements through Google AdSense, and analyze our traffic. 
                Third parties, including Google, may place and read cookies on your browser or use web beacons to collect information for advertising purposes.
            </p>
            <p style="margin-top: 10px; font-size: 0.9em;">
                By clicking "Accept", you consent to the use of cookies as described in our 
                <a href="privacy-policy.html" target="_blank" style="color: #4CAF50; text-decoration: underline; font-weight: bold;">Privacy Policy</a> and to 
                <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener" style="color: #4CAF50; text-decoration: underline; font-weight: bold;">Google's use of your data</a>.
            </p>
            <div class="cookie-consent-buttons">
                <button onclick="acceptCookies()" class="btn-accept">Accept All Cookies</button>
                <button onclick="rejectCookies()" class="btn-reject">Reject Non-Essential</button>
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" class="btn-manage">Manage Ad Settings</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBanner();
    // Enable Google Analytics or other tracking if needed
    enableTracking();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    hideCookieBanner();
    // Disable non-essential tracking
    disableNonEssentialTracking();
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.style.animation = 'slideDown 0.5s ease-out';
        setTimeout(() => {
            banner.remove();
        }, 500);
    }
}

function enableTracking() {
    // Enable Google Analytics or other tracking services
    console.log('Tracking enabled');
    // Add your tracking initialization code here
}

function disableNonEssentialTracking() {
    // Disable non-essential cookies
    console.log('Non-essential tracking disabled');
    // Add code to disable non-essential tracking
}

// Mobile menu toggle (existing functionality)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#0') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Add navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.destination-card, .transport-card, .famous-card, .tip-card').forEach(element => {
        observer.observe(element);
    });
});
