// ===================================
// PRELOADER
// ===================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// ===================================
// NAVIGATION
// ===================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('.section');

const highlightNavLink = () => {
    let scrollPosition = window.scrollY + 100;
    
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
};

window.addEventListener('scroll', highlightNavLink);

// ===================================
// THEME TOGGLE
// ===================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.querySelector('.typing-text');
const texts = [
    'Developer & Creative Thinker',
    'Full Stack Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation when page loads
setTimeout(type, 1000);

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.setProperty('--progress-width', `${progress}%`);
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    animateOnScroll.observe(item);
});

// ===================================
// ENHANCED CONTACT FORM
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccessInline = document.getElementById('formSuccessInline');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');
const submitButton = contactForm?.querySelector('.btn-submit');

// Character counter for message field
if (messageTextarea && charCount) {
    messageTextarea.addEventListener('input', () => {
        const currentLength = messageTextarea.value.length;
        const maxLength = messageTextarea.getAttribute('maxlength');
        
        charCount.textContent = `${currentLength} / ${maxLength}`;
        
        // Warning states
        charCount.classList.remove('warning', 'danger');
        if (currentLength > maxLength * 0.8) {
            charCount.classList.add('warning');
        }
        if (currentLength > maxLength * 0.95) {
            charCount.classList.add('danger');
        }
    });
}

// Form submission handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // If using Netlify forms with redirect, let the default behavior happen
        // The form will automatically redirect to thank-you.html
        
        // Add loading state to button
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        }
        
        // Optional: Google Analytics event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Portfolio Contact Form'
            });
        }
        
        // Optional: Console log for debugging
        console.log('Form submitted successfully');
        
        // Note: If i want to use the inline success message instead of redirect,
        // uncomment the code below and remove the action="/thank-you.html" from HTML
        
        /*
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Validate honeypot
        if (formData.get('bot-field')) {
            console.log('Bot detected!');
            return false;
        }
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Hide form, show success message
            contactForm.style.display = 'none';
            formSuccessInline.classList.add('show');
            
            // Reset after 5 seconds
            setTimeout(() => {
                formSuccessInline.classList.remove('show');
                contactForm.style.display = 'block';
                contactForm.reset();
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                if (charCount) charCount.textContent = '0 / 5000';
            }, 5000);
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            alert('Oops! Something went wrong. Please try again or email me directly.');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        });
        */
    });
}

// Email validation with better pattern
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone number formatting (optional enhancement)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.substr(0, 10);
        e.target.value = value;
    });
}

// Real-time validation feedback
const inputs = contactForm?.querySelectorAll('input[required], textarea[required]');
inputs?.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'var(--border-color)';
        }
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// DYNAMIC YEAR IN FOOTER
// ===================================

const updateYear = () => {
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = `&copy; ${currentYear} Aditya S.C. All rights reserved.`;
    }
};

updateYear();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-related functions are called here
    });
}, { passive: true });

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Welcome to Aditya\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/AdityaANKS', 'font-size: 14px; color: #64ffda;');

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
});

// Focus trap in mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// ===================================
// PARTICLE EFFECT (Optional Enhancement)
// ===================================

// Simple particle effect for hero section
const createParticles = () => {
    const homeSection = document.querySelector('.home-section');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
        `;
        homeSection.appendChild(particle);
    }
};

// Uncomment to enable particles
// createParticles();

// Add particle animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-10px, 10px);
        }
        75% {
            transform: translate(10px, 10px);
        }
    }
`;
document.head.appendChild(style);