// ===================================
// CONFIGURATION
// ===================================

const CONFIG = {
    skills: [
        { name: 'Problem-solving', percentage: 95, tooltip: 'Resolved complex testing challenges across multiple projects' },
        { name: 'Critical thinking', percentage: 92, tooltip: 'Analyzed system behavior to identify root causes of defects' },
        { name: 'Bug reporting', percentage: 90, tooltip: 'Documented and tracked 100+ bugs with detailed reproduction steps' },
        { name: 'Regression testing', percentage: 88, tooltip: 'Led regression cycles ensuring zero critical bugs in production' },
        { name: 'New feature testing', percentage: 85, tooltip: 'Validated new features against requirements and user stories' },
        { name: 'Integration testing', percentage: 87, tooltip: 'Tested API integrations and third-party service connections' },
        { name: 'Performance testing', percentage: 90, tooltip: 'Optimized load times and identified performance bottlenecks' },
        { name: 'Test planning', percentage: 86, tooltip: 'Created comprehensive test plans and test case documentation' },
        { name: 'Functional testing', percentage: 89, tooltip: 'Verified functionality across web and mobile platforms' },
        { name: 'Version control', percentage: 83, tooltip: 'Managed test scripts and documentation using Git/GitHub' }
    ],
    languages: [
        { name: 'English', percentage: 90 },
        { name: 'Kannada', percentage: 95 },
        { name: 'Hindi', percentage: 85 }
    ],
    projects: [
        {
            id: 1,
            title: 'Freelance Testing Portfolio',
            description: 'Comprehensive collection of testing projects and bug reports from freelance engagements.',
            category: 'testing',
            tags: ['Testing', 'QA', 'Bug Reporting'],
            thumbnail: 'assets/projects/placeholder.jpg',
            images: ['assets/projects/placeholder.jpg'],
            technologies: ['Manual Testing', 'Regression Testing', 'Performance Testing'],
            links: {
                github: 'https://github.com/AdityaANKS',
                live: null
            },
            fullDescription: 'Project coming soon — freelance testing sample. This will showcase detailed bug reports, test cases, and quality assurance documentation from real client projects.'
        }
        // Add more projects here as they become available
    ]
};

// ===================================
// GLOBAL STATE
// ===================================

let observerInitialized = false;
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let lastFocusedElement = null;

// ===================================
// THEME MANAGEMENT
// ===================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.getElementById('mainNav');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
}

// ===================================
// SKILLS SECTION
// ===================================

function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    CONFIG.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item observe-fade';
        skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="skill-bar-bg">
                <div class="skill-bar-fill" style="--skill-width: ${skill.percentage}%"></div>
            </div>
            <div class="skill-tooltip">${skill.tooltip}</div>
        `;
        skillsGrid.appendChild(skillItem);
    });
}

// ===================================
// LANGUAGES SECTION
// ===================================

function renderLanguages() {
    const languagesGrid = document.getElementById('languagesGrid');
    
    CONFIG.languages.forEach(lang => {
        const langItem = document.createElement('div');
        langItem.className = 'language-item observe-fade';
        langItem.innerHTML = `
            <div class="language-header">
                <span class="language-name">${lang.name}</span>
                <span class="language-percentage">${lang.percentage}%</span>
            </div>
            <div class="language-bar-bg">
                <div class="language-bar-fill" style="--lang-width: ${lang.percentage}%"></div>
            </div>
        `;
        languagesGrid.appendChild(langItem);
    });
}

// ===================================
// EXPERIENCE SECTION
// ===================================

function initExperience() {
    const expToggle = document.getElementById('exp-toggle-1');
    const expDetails = document.getElementById('exp-details-1');
    
    expToggle.addEventListener('click', () => {
        const isExpanded = expToggle.getAttribute('aria-expanded') === 'true';
        
        expToggle.setAttribute('aria-expanded', !isExpanded);
        expDetails.setAttribute('aria-hidden', isExpanded);
    });
}

// ===================================
// PORTFOLIO SECTION
// ===================================

function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Render project cards
    CONFIG.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card observe-fade`;
        card.dataset.category = project.category;
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" class="project-thumbnail" loading="lazy">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <span class="project-cta">
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </span>
            </div>
        `;
        
        // Open project modal on click
        card.addEventListener('click', () => openProjectModal(project));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(project);
            }
        });
        
        portfolioGrid.appendChild(card);
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ===================================
// PROJECT MODAL
// ===================================

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');
    
    lastFocusedElement = document.activeElement;
    
    const linksHTML = `
        <div class="project-links">
            ${project.links.github ? `<a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub</a>` : ''}
            ${project.links.live ? `<a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Live Demo</a>` : ''}
        </div>
    `;
    
    modalContent.innerHTML = `
        <h2 id="projectModalTitle">${project.title}</h2>
        <div class="project-images">
            ${project.images.map(img => `<img src="${img}" alt="${project.title} screenshot" loading="lazy">`).join('')}
        </div>
        <p>${project.fullDescription}</p>
        <div class="project-tech">
            <h3>Technologies Used</h3>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
        </div>
        ${linksHTML}
    `;
    
    modal.setAttribute('aria-labelledby', 'projectModalTitle');
    openModal(modal);
}

// ===================================
// RESUME MODAL
// ===================================

function initResumeModal() {
    const openBtnPDF = document.getElementById('openResumeModal');
    const openBtnJPG = document.getElementById('openResumeModalJPG');
    const closeBtn = document.getElementById('closeResumeModal');
    const modal = document.getElementById('resumeModal');
    
    openBtnPDF.addEventListener('click', () => {
        lastFocusedElement = openBtnPDF;
        openModal(modal);
    });
    
    openBtnJPG.addEventListener('click', () => {
        lastFocusedElement = openBtnJPG;
        openModal(modal);
    });
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    
    // Focus trap
    trapFocus(modal);
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    
    // Return focus
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function trapFocus(element) {
    const focusable = element.querySelectorAll(focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    
    // Focus first element
    setTimeout(() => firstFocusable?.focus(), 100);
    
    element.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
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
    });
}

// ===================================
// CONTACT FORM
// ===================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const honeypot = document.getElementById('website');
    const formMessage = document.getElementById('formMessage');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Honeypot check
        if (honeypot.value) {
            return; // Silent fail for bots
        }
        
        // Validation
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
            showError('message', 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate form submission (replace with actual backend endpoint)
        try {
            // Example: await fetch('YOUR_BACKEND_ENDPOINT', { method: 'POST', body: new FormData(form) });
            
            // For now, show success message
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            form.reset();
            
            // Alternative: open mailto as fallback
            // window.location.href = `mailto:adityachavan6363@gmail.com?subject=Contact from ${nameInput.value}&body=${messageInput.value}`;
            
        } catch (error) {
            formMessage.textContent = 'Oops! Something went wrong. Please try again or email directly.';
            formMessage.className = 'form-message error';
        }
    });
    
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearErrors() {
        const inputs = [nameInput, emailInput, messageInput];
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = document.getElementById(`${input.id}Error`);
            if (errorElement) errorElement.textContent = '';
        });
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// INTERSECTION OBSERVER
// ===================================

function initObserver() {
    if (observerInitialized) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    if (!prefersReducedMotion) {
                        entry.target.classList.add('animate');
                    } else {
                        // Instantly show full width if reduced motion
                        const fill = entry.target.querySelector('.skill-bar-fill');
                        if (fill) fill.style.width = fill.style.getPropertyValue('--skill-width');
                    }
                }
                
                // Animate language bars
                if (entry.target.classList.contains('language-item')) {
                    if (!prefersReducedMotion) {
                        entry.target.classList.add('animate');
                    } else {
                        const fill = entry.target.querySelector('.language-bar-fill');
                        if (fill) fill.style.width = fill.style.getPropertyValue('--lang-width');
                    }
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements
    const observeElements = document.querySelectorAll('.observe-fade, .skill-item, .language-item');
    observeElements.forEach(el => observer.observe(el));
    
    observerInitialized = true;
}

// ===================================
// CLOSE PROJECT MODAL
// ===================================

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeProjectModal');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(modal));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    renderSkills();
    renderLanguages();
    initExperience();
    renderPortfolio();
    initResumeModal();
    initProjectModal();
    initContactForm();
    initBackToTop();
    
    // Initialize observer after a short delay to ensure DOM is ready
    setTimeout(initObserver, 100);
});

// Re-initialize observer on dynamic content changes
window.addEventListener('load', () => {
    initObserver();
});