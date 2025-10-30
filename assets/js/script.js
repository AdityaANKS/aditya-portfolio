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
// CONTACT FORM
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        formSuccess.classList.remove('show');
        contactForm.style.display = 'block';
        contactForm.reset();
    }, 5000);
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