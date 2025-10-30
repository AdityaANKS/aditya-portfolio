// ===================================
// CONFIGURATION
// Edit contact details and skill percentages here
// ===================================

const CONFIG = {
  contact: {
    name: "Aditya Chavan",
    phone: "+919972942264",
    email: "adityachavan6363@gmail.com",
    github: "https://github.com/AdityaANKS",
    location: "Bagalkot, India 587103"
  },
  
  skills: [
    {
      name: "Problem-solving",
      percent: 95,
      category: "core",
      example: "Diagnosed complex multi-threaded race condition causing intermittent payment failures"
    },
    {
      name: "Critical thinking",
      percent: 90,
      category: "core",
      example: "Analyzed user flow to identify UX bottleneck reducing conversion by 30%"
    },
    {
      name: "Bug reporting",
      percent: 95,
      category: "testing",
      example: "Created detailed bug reports with reproduction steps, reducing resolution time by 40%"
    },
    {
      name: "Regression testing",
      percent: 90,
      category: "testing",
      example: "Maintained comprehensive regression test suites covering 500+ test cases"
    },
    {
      name: "New feature testing",
      percent: 85,
      category: "testing",
      example: "Validated new payment gateway integration across 10+ browsers and devices"
    },
    {
      name: "Integration testing",
      percent: 85,
      category: "testing",
      example: "Tested API integrations between microservices ensuring data consistency"
    },
    {
      name: "Performance testing",
      percent: 88,
      category: "testing",
      example: "Load tested application handling 10K concurrent users, identified bottlenecks"
    },
    {
      name: "Test planning",
      percent: 87,
      category: "management",
      example: "Designed test strategies for major releases covering functional and non-functional requirements"
    },
    {
      name: "Functional testing",
      percent: 92,
      category: "testing",
      example: "Verified business logic correctness across e-commerce checkout workflows"
    },
    {
      name: "Version control",
      percent: 80,
      category: "technical",
      example: "Managed test automation scripts using Git with proper branching strategies"
    }
  ],
  
  portfolio: [
    {
      id: 1,
      title: "E-commerce Testing Project",
      category: "testing",
      description: "Comprehensive testing of e-commerce platform including payment integration, cart functionality, and user authentication. Identified 50+ critical bugs before production release.",
      tech: ["Manual Testing", "Regression Testing", "Cross-browser Testing"],
      image: null,
      github: null,
      demo: null,
      comingSoon: false
    },
    {
      id: 2,
      title: "API Automation Framework",
      category: "automation",
      description: "Developed automated test suite for RESTful API testing using Postman and Newman, reducing testing time by 60%.",
      tech: ["Postman", "Newman", "CI/CD"],
      image: null,
      github: null,
      demo: null,
      comingSoon: false
    },
    {
      id: 3,
      title: "Freelance Testing Sample",
      category: "testing",
      description: "Project coming soon — freelance testing sample showcasing bug reporting, test case design, and quality assurance methodology.",
      tech: ["Test Cases", "Bug Reports", "Documentation"],
      image: null,
      github: null,
      demo: null,
      comingSoon: true
    }
  ]
};

// ===================================
// STATE MANAGEMENT
// ===================================

const state = {
  theme: localStorage.getItem('theme') || 'light',
  currentFilter: 'all',
  modalOpen: false,
  focusTrap: null,
  lastFocusedElement: null,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkills();
  initPortfolio();
  initExperience();
  initLanguages();
  initContactForm();
  initModal();
  initAnimations();
  initPrintResume();
  
  // Log successful initialization
  console.log('✅ Portfolio website initialized successfully');
});

// ===================================
// THEME MANAGEMENT
// ===================================

function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Apply saved theme
  document.documentElement.setAttribute('data-theme', state.theme);
  
  themeToggle?.addEventListener('click', () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    
    showToast('Theme changed', `Switched to ${state.theme} mode`, 'success');
  });
}

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu?.querySelectorAll('a');
  
  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navMenu?.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks?.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu
        hamburger?.setAttribute('aria-expanded', 'false');
        navMenu?.classList.remove('active');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update focus
        targetSection.setAttribute('tabindex', '-1');
        targetSection.focus();
        setTimeout(() => targetSection.removeAttribute('tabindex'), 1000);
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      hamburger?.setAttribute('aria-expanded', 'false');
      navMenu?.classList.remove('active');
    }
  });
  
  // Navbar scroll effect
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ===================================
// SKILLS SECTION
// ===================================

function initSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  
  if (!skillsGrid) return;
  
  // Generate skill cards
  CONFIG.skills.forEach(skill => {
    const skillCard = createSkillCard(skill);
    skillsGrid.appendChild(skillCard);
  });
  
  // Setup intersection observer for animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressFill = entry.target.querySelector('.skill-progress-fill');
          if (progressFill && !progressFill.classList.contains('animate')) {
            // Only animate if user hasn't requested reduced motion
            if (!state.reducedMotion) {
              progressFill.classList.add('animate');
            } else {
              // Instantly set width without animation
              progressFill.style.transition = 'none';
              progressFill.style.width = progressFill.style.getPropertyValue('--skill-percent');
            }
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );
  
  document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
}

function createSkillCard(skill) {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.setAttribute('tabindex', '0');
  
  card.innerHTML = `
    <div class="skill-header">
      <h3 class="skill-name">${skill.name}</h3>
      <span class="skill-percent">${skill.percent}%</span>
    </div>
    <div class="skill-progress">
      <div class="skill-progress-fill" style="--skill-percent: ${skill.percent}%"></div>
    </div>
    <p class="skill-description">${skill.example}</p>
    <div class="skill-tooltip" role="tooltip">${skill.example}</div>
  `;
  
  return card;
}

// ===================================
// PORTFOLIO SECTION
// ===================================

function initPortfolio() {
  const portfolioGrid = document.querySelector('.portfolio-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (!portfolioGrid) return;
  
  // Generate portfolio items
  CONFIG.portfolio.forEach(project => {
    const projectCard = createPortfolioCard(project);
    portfolioGrid.appendChild(projectCard);
  });
  
  // Show all items initially
  filterPortfolio('all');
  
  // Setup filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      // Update active state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      // Filter portfolio
      filterPortfolio(filter);
      state.currentFilter = filter;
    });
  });
}

function createPortfolioCard(project) {
  const card = document.createElement('div');
  card.className = 'portfolio-item';
  card.setAttribute('data-category', project.category);
  
  const imageSrc = project.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23f3f4f6" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="16"%3ENo image%3C/text%3E%3C/svg%3E';
  
  card.innerHTML = `
    <img src="${imageSrc}" alt="${project.title}" class="portfolio-image" loading="lazy">
    <div class="portfolio-content">
      <h3 class="portfolio-title">${project.title}</h3>
      <span class="portfolio-category">${project.category}</span>
      <p class="portfolio-description">${project.description.substring(0, 100)}...</p>
      <div class="portfolio-tech">
        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  // Open modal on click
  card.addEventListener('click', () => {
    openProjectModal(project);
  });
  
  // Keyboard accessibility
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(project);
    }
  });
  
  return card;
}

function filterPortfolio(category) {
  const items = document.querySelectorAll('.portfolio-item');
  
  items.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    
    if (category === 'all' || itemCategory === category) {
      item.classList.add('show');
    } else {
      item.classList.remove('show');
    }
  });
}

function openProjectModal(project) {
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.getElementById('modal-title');
  
  modalTitle.textContent = project.title;
  
  const imageSrc = project.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23f3f4f6" width="600" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="20"%3EProject Preview%3C/text%3E%3C/svg%3E';
  
  modalBody.innerHTML = `
    <img src="${imageSrc}" alt="${project.title}" loading="lazy">
    <p>${project.description}</p>
    <h4>Technologies Used</h4>
    <div class="portfolio-tech">
      ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
    ${!project.comingSoon ? `
      <div class="modal-links">
        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub</a>` : ''}
        ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Live Demo</a>` : ''}
      </div>
    ` : '<p><em>This project is coming soon. Check back later for updates!</em></p>'}
  `;
  
  openModal();
}

// ===================================
// EXPERIENCE SECTION
// ===================================

function initExperience() {
  const toggleButtons = document.querySelectorAll('[data-toggle="experience"]');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetId = btn.getAttribute('aria-controls');
      const details = document.getElementById(targetId);
      
      btn.setAttribute('aria-expanded', !isExpanded);
      details?.classList.toggle('open');
      
      // Update button text
      const span = btn.querySelector('span');
      if (span) {
        span.textContent = isExpanded ? 'Show details' : 'Hide details';
      }
    });
  });
}

// ===================================
// LANGUAGES SECTION
// ===================================

function initLanguages() {
  const languageItems = document.querySelectorAll('.language-item[data-animate]');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressFill = entry.target.querySelector('.progress-fill');
          const percent = progressFill?.getAttribute('data-percent');
          
          if (progressFill && !progressFill.classList.contains('animate')) {
            progressFill.style.setProperty('--progress-width', `${percent}%`);
            
            if (!state.reducedMotion) {
              progressFill.classList.add('animate');
            } else {
              progressFill.style.transition = 'none';
              progressFill.style.width = `${percent}%`;
            }
            
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.5 }
  );
  
  languageItems.forEach(item => observer.observe(item));
}

// ===================================
// CONTACT FORM
// ===================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Check honeypot
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) {
      console.warn('Spam detected');
      return;
    }
    
    // Validate form
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const errors = validateContactForm(data);
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    if (Object.keys(errors).length > 0) {
      // Show errors
      Object.entries(errors).forEach(([field, message]) => {
        const input = form.querySelector(`[name="${field}"]`);
        const errorEl = input?.parentElement.querySelector('.error-message');
        
        if (input) input.classList.add('error');
        if (errorEl) errorEl.textContent = message;
      });
      
      showToast('Validation Error', 'Please fix the errors in the form', 'error');
      return;
    }
    
    // Form is valid - show success
    showToast('Message Sent!', 'Thank you for your message. I\'ll get back to you soon!', 'success');
    
    // Reset form
    form.reset();
    
    // In production, you would submit to a server here:
    /*
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        showToast('Message Sent!', 'Thank you for your message.', 'success');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      showToast('Error', 'Failed to send message. Please try again.', 'error');
    }
    */
  });
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      const errors = validateContactForm({ [input.name]: input.value });
      const errorEl = input.parentElement.querySelector('.error-message');
      
      if (errors[input.name]) {
        input.classList.add('error');
        if (errorEl) errorEl.textContent = errors[input.name];
      } else {
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
      }
    });
  });
}

function validateContactForm(data) {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===================================
// MODAL SYSTEM
// ===================================

function initModal() {
  const modal = document.getElementById('modal');
  const closeButtons = modal?.querySelectorAll('[data-close-modal]');
  
  // Close button handlers
  closeButtons?.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  
  // Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.modalOpen) {
      closeModal();
    }
  });
  
  // Outside click handler
  const overlay = modal?.querySelector('.modal-overlay');
  overlay?.addEventListener('click', closeModal);
}

function openModal() {
  const modal = document.getElementById('modal');
  
  if (!modal) return;
  
  // Store currently focused element
  state.lastFocusedElement = document.activeElement;
  
  // Show modal
  modal.removeAttribute('hidden');
  state.modalOpen = true;
  
  // Prevent body scroll
  document.body.classList.add('modal-open');
  
  // Focus first focusable element
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
  
  // Setup focus trap
  setupFocusTrap(modal, focusableElements);
}

function closeModal() {
  const modal = document.getElementById('modal');
  
  if (!modal) return;
  
  // Hide modal
  modal.setAttribute('hidden', '');
  state.modalOpen = false;
  
  // Restore body scroll
  document.body.classList.remove('modal-open');
  
  // Return focus to triggering element
  if (state.lastFocusedElement) {
    state.lastFocusedElement.focus();
    state.lastFocusedElement = null;
  }
  
  // Remove focus trap
  if (state.focusTrap) {
    document.removeEventListener('keydown', state.focusTrap);
    state.focusTrap = null;
  }
}

function setupFocusTrap(modal, focusableElements) {
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  state.focusTrap = (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };
  
  document.addEventListener('keydown', state.focusTrap);
}

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================

function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  
  const icon = getToastIcon(type);
  
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close notification">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;
  
  // Close button handler
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn?.addEventListener('click', () => {
    removeToast(toast);
  });
  
  // Add to container
  container.appendChild(toast);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    removeToast(toast);
  }, 5000);
}

function removeToast(toast) {
  toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
  setTimeout(() => {
    toast.remove();
  }, 300);
}

function getToastIcon(type) {
  const icons = {
    success: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    warning: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    info: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  
  return icons[type] || icons.info;
}

// ===================================
// ANIMATIONS
// ===================================

function initAnimations() {
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.skill-card, .timeline-item, .education-card, .portfolio-item');
  
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!state.reducedMotion) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 100);
          }
          
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  if (!state.reducedMotion) {
    fadeElements.forEach(el => fadeObserver.observe(el));
  }
}

// ===================================
// PRINT RESUME
// ===================================

function initPrintResume() {
  const printBtn = document.getElementById('print-resume');
  
  printBtn?.addEventListener('click', () => {
    window.print();
  });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===================================
// ERROR HANDLING
// ===================================

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Runtime error:', e.error);
  // Don't show error toast to users - log silently
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Don't show error toast to users - log silently
});

// ===================================
// EXPORT FOR TESTING (optional)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    validateContactForm,
    isValidEmail
  };
}