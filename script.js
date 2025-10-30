// ========================================
// Navigation & Scroll
// ========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
            
            // Smooth scroll to section
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Highlight active section in navbar
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navbar.offsetHeight - 50;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Keyboard accessibility for scroll to top
scrollTopBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when visible
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.setProperty('--progress-width', progress + '%');
                progressBar.style.width = progress + '%';
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Observe skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(skill => observer.observe(skill));

// ========================================
// Resume Modal
// ========================================

const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

// Open modal
viewResumeBtn.addEventListener('click', () => {
    resumeModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus trap - focus first focusable element in modal
    const firstFocusable = resumeModal.querySelector('button, a');
    if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
    }
});

// Close modal function
function closeModal() {
    resumeModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    viewResumeBtn.focus(); // Return focus to trigger button
}

// Close modal on close button click
modalClose.addEventListener('click', closeModal);

// Close modal on overlay click
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeModal();
    }
});

// Focus trap in modal
resumeModal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = resumeModal.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// ========================================
// Contact Form Validation & Submission
// ========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

subjectInput.addEventListener('blur', () => {
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
    } else {
        clearError(subjectInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
    } else {
        clearError(messageInput);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError(nameInput);
    clearError(emailInput);
    clearError(subjectInput);
    clearError(messageInput);
    successMessage.classList.remove('show');
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        
        // Simulate form submission
        console.log('Form Data:', {
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });
        
        // Show success message
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // Focus first invalid field
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }
});

// ========================================
// Lazy Loading Images
// ========================================

if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// Portfolio Filter (Optional Enhancement)
// ========================================

// You can add portfolio filtering functionality here if needed

// ========================================
// Performance Optimization
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}));

// ========================================
// Accessibility Enhancements
// ========================================

// Skip to main content link (add this to HTML if needed)
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Announce page navigation to screen readers
function announceNavigation(sectionName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Navigated to ${sectionName} section`;
    announcement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border-width: 0;
    `;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Update nav link click handler to announce navigation
navLinks.forEach(link => {
    const originalClickHandler = link.onclick;
    link.addEventListener('click', () => {
        const sectionId = link.getAttribute('href').substring(1);
        const sectionName = link.textContent;
        announceNavigation(sectionName);
    });
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%c👋 Welcome to Aditya S.C.\'s Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub: https://github.com/AdityaANKS', 'color: #b0b8d4; font-size: 14px;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #b0b8d4; font-size: 12px;');

// ========================================
// Initialize
// ========================================

// Set initial active nav link
window.addEventListener('load', () => {
    highlightNavigation();
    
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');
});