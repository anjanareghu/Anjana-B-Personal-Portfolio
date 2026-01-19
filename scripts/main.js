/**
 * Anjana B - Professional Portfolio
 * Main JavaScript File
 * Handles navigation, animations, particles, and form functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initParticles();
  initScrollAnimations();
  initSmoothScroll();
  initContactForm();
  initNavbarScroll();
  initCustomCursor();
  initThemeToggle();
  init3DEffects();
  initStarField();
  initJourneyTimeline();
});

/**
 * 3D Tilt Effect on Cards (Three.js inspired)
 */
function init3DEffects() {
  const cards = document.querySelectorAll('.project-card, .skill-category, .glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // Mouse parallax on hero section
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      heroContent.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'translate(0, 0)';
    });
  }
}

/**
 * Dynamic Star Field Effect
 */
function initStarField() {
  const heroBackground = document.querySelector('.hero-bg');
  if (!heroBackground) return;

  // Create star field container
  const starField = document.createElement('div');
  starField.className = 'star-field-container';
  starField.style.cssText = `
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  `;

  // Generate stars
  const starCount = 100;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;

    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      left: ${left}%;
      top: ${top}%;
      opacity: ${Math.random() * 0.5 + 0.2};
      animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
    `;

    starField.appendChild(star);
  }

  heroBackground.appendChild(starField);

  // Add floating orbs
  const orb1 = document.createElement('div');
  orb1.className = 'floating-orb';
  orb1.style.cssText = `
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    top: 20%;
    right: 10%;
    animation: floatOrb 8s ease-in-out infinite;
    pointer-events: none;
  `;

  const orb2 = document.createElement('div');
  orb2.className = 'floating-orb';
  orb2.style.cssText = `
    position: absolute;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    bottom: 30%;
    left: 5%;
    animation: floatOrb 10s ease-in-out infinite reverse;
    pointer-events: none;
  `;

  heroBackground.appendChild(orb1);
  heroBackground.appendChild(orb2);

  // Initialize contact section stars
  initContactStars();
}

/**
 * Contact Section Floating Stars & Shooting Stars
 */
function initContactStars() {
  const contactStars = document.getElementById('contact-stars');
  if (!contactStars) return;

  // Generate floating stars
  const starCount = 50;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'contact-star';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * 4;

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    contactStars.appendChild(star);
  }

  // Add shooting stars
  for (let i = 0; i < 3; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.cssText = `
      top: ${Math.random() * 50}%;
      left: ${Math.random() * 50}%;
      animation-delay: ${i * 4 + Math.random() * 2}s;
      animation-duration: ${3 + Math.random() * 2}s;
    `;
    contactStars.appendChild(shootingStar);
  }
}

/**
 * Journey Timeline - Simple scroll-based reveal animation
 */
function initJourneyTimeline() {
  const scrollRevealItems = document.querySelectorAll('.scroll-reveal');

  if (!scrollRevealItems.length) return;

  // Scroll-based reveal using IntersectionObserver
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after reveal for performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  scrollRevealItems.forEach(item => revealObserver.observe(item));

  // Also observe section cards for rotational animations
  const rotationCards = document.querySelectorAll(
    '.skill-category, .project-card, .education-card, .achievement-card, .cert-card-link, .publication-card'
  );

  const rotationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        rotationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  rotationCards.forEach(card => rotationObserver.observe(card));
}

/**
 * Theme toggle with localStorage persistence
 */
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');

  if (!toggle) return;

  // Check for saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    document.body.classList.add('light-mode');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
      }
    }
  });
}

/**
 * Custom cursor with hover effects
 */
function initCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');

  if (!cursor || !cursorDot) return;

  // Check if not touch device
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update dot immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth cursor follow
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .glass-card, .skill-tag, .project-card, .nav-link, .social-link, .btn, .cert-link-btn, .dev-feature-card');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
  });
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
}

/**
 * Navigation functionality
 */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY;

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

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

/**
 * Navbar background on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();
}

/**
 * Floating particles in hero section
 */
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 50;
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#a855f7'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 15;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      animation-delay: -${delay}s;
      animation-duration: ${duration}s;
    `;

    particlesContainer.appendChild(particle);
  }
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stagger-children');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Unobserve after animation
        setTimeout(() => {
          observer.unobserve(entry.target);
        }, 1000);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      `;
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success state
      submitBtn.innerHTML = `
        <span>Message Sent!</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

      // Reset form
      form.reset();

      // Reset button after delay
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });
  }
}

/**
 * Typing effect for hero section (optional enhancement)
 */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const words = ['Full-Stack Developer', 'AI/ML Enthusiast', 'Cloud Architect', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/**
 * Parallax effect for background elements
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

/**
 * Dark mode toggle (can be expanded)
 */
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');

  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    // Load saved preference
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }
  }
}

/**
 * Counter animation for stats
 */
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

/**
 * Utility: Debounce function for scroll events
 */
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Utility: Throttle function for performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spin {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

// Log ready state
console.log('🚀 Anjana B Portfolio loaded successfully!');

/**
 * Google Forms submission handler
 */
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc93Jg9SMM_TARPNfE6YKVnkKA2h_zOlODnHizakf3irYfhpw/formResponse';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('entry.960624569', document.getElementById('name').value);
      formData.append('entry.1656628902', document.getElementById('email').value);
      formData.append('entry.977600489', document.getElementById('message').value);

      try {
        // Submit to Google Forms using no-cors mode
        await fetch(GOOGLE_FORM_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });

        // Show confirmation popup
        showConfirmation();

        // Reset form
        contactForm.reset();
      } catch (error) {
        console.log('Form submitted (no-cors mode)');
        // Even if there's an error, Google Forms usually receives the data
        showConfirmation();
        contactForm.reset();
      }
    });
  }
});

/**
 * Show confirmation popup
 */
function showConfirmation() {
  const modal = document.getElementById('confirmation-modal');
  if (modal) {
    modal.classList.add('show');
  }
}

/**
 * Close confirmation popup
 */
function closeConfirmation() {
  const modal = document.getElementById('confirmation-modal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('confirmation-modal');
  if (e.target === modal) {
    closeConfirmation();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeConfirmation();
  }
});

/**
 * AI Chatbot Widget
 */

// ⚠️ API Key removed for security - Chatbot uses local knowledge base
// To enable Gemini AI: Set up a backend server to proxy API requests
const GEMINI_API_KEY = null; // Set to null for local-only mode

const CHATBOT_SYSTEM_PROMPT = `You are a professional AI assistant for Anjana B, a final-year B.Tech Computer Science and Engineering student at Sree Buddha College of Engineering, Kerala.

Your primary goal is to help visitors understand Anjana's background, skills, projects, and interests in a clear, concise, and professional manner.

Key Information about Anjana:
- Education: B.Tech in Computer Science and Engineering (2021-2025)
- Current Role: Full Stack Web Development Intern at Edunet Foundation | EY Global Delivery Services (EY GDS) since January 2026
- Also serves as Newsletter Editor at IEEE Student Branch, SBCE since February 2025
- Skills: Python, Java, C, SQL, Flask, React, Machine Learning, NLP, REST APIs, Git
- IEEE Publication: 2nd Author at ICCPCT 2025 for StellarisAI project
- Achievement: 1st Prize in RAG Competition at IEEE SB SBCE

Main Projects:
1. ReMind (Connectome Analysis) - Brain network analysis for neurological recovery prediction using Graph Neural Networks
2. StellarisAI - AI-powered smart hiring platform (IEEE Published)
3. FoodSnap AI - Real-time food recognition with nutrition analysis using Flask, React, Google Vision
4. Food_D - Real-time delivery optimization with microservices architecture
5. YouTube Script Summarizer - NLP-based video transcript summarization using DistilBART

Behavior Guidelines:
- Be polite, confident, and technically accurate
- Keep responses concise but informative (2-3 sentences max for simple questions)
- If information is not available, suggest contacting Anjana via the contact form
- Only discuss Anjana's professional profile and projects

Contact: Visitors can reach out through the contact form on the website or connect via LinkedIn (linkedin.com/in/anjana-b-b0b865204) and GitHub (github.com/anjanareghu)`;

// Knowledge base for offline/fallback responses
const KNOWLEDGE_BASE = {
  skills: "Anjana is skilled in Python, Java, C, SQL, Flask, React, Machine Learning, NLP, REST APIs, and Git. She has experience with full-stack development and cloud-based solutions.",
  projects: "Anjana has worked on several notable projects including ReMind (brain network analysis), StellarisAI (AI hiring platform - IEEE published), FoodSnap AI (food recognition), Food_D (delivery optimization), and a YouTube Script Summarizer.",
  education: "Anjana is a final-year B.Tech Computer Science and Engineering student at Sree Buddha College of Engineering, Kerala (2021-2025).",
  experience: "Anjana is currently a Full Stack Web Development Intern at Edunet Foundation | EY GDS since January 2026. She also serves as Newsletter Editor at IEEE Student Branch since February 2025.",
  contact: "You can reach Anjana through the contact form on this website, or connect via LinkedIn at linkedin.com/in/anjana-b-b0b865204 and GitHub at github.com/anjanareghu.",
  achievements: "Anjana won 1st Prize in the RAG Competition at IEEE SB SBCE and has an IEEE publication as 2nd author at ICCPCT 2025 for the StellarisAI project.",
  stellaris: "StellarisAI is an AI-powered smart hiring platform that uses LLaMA 3.2 and Flask for intelligent recruitment. It was published at IEEE ICCPCT 2025, where Anjana is the 2nd author.",
  remind: "ReMind is a brain connectome analysis project that uses Graph Neural Networks to predict neurological recovery patterns from brain network data.",
  foodsnap: "FoodSnap AI is a real-time food recognition application that uses Google Vision and Nutritionix APIs to provide comprehensive nutrition analysis.",
  default: "I can help you learn about Anjana's skills, projects, education, and experience. Feel free to ask specific questions, or use the contact form to reach her directly!"
};

// Toggle chatbot window
function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  container.classList.toggle('open');
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chatbot-toggle');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  if (toggle) {
    toggle.addEventListener('click', toggleChatbot);
  }

  if (input && sendBtn) {
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// Send message
async function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessage(message, 'user');
  input.value = '';

  // Show typing indicator
  showTypingIndicator();

  // Get AI response
  const response = await getAIResponse(message);

  // Remove typing indicator and add bot response
  hideTypingIndicator();
  addMessage(response, 'bot');
}

// Add message to chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById('chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}-message`;

  const avatar = sender === 'bot' ? '🤖' : '👤';

  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <p>${text}</p>
    </div>
  `;

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatbot-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot-message';
  typingDiv.id = 'typing-indicator';

  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Get AI response (with Gemini API or fallback)
async function getAIResponse(userMessage) {
  // Use local knowledge base when API key is not configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    return getLocalResponse(userMessage);
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${CHATBOT_SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nAssistant:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }

    return getLocalResponse(userMessage);
  } catch (error) {
    console.error('Chatbot API error:', error);
    return getLocalResponse(userMessage);
  }
}

// Local response when API is not available
function getLocalResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('skill') || lowerMessage.includes('know') || lowerMessage.includes('tech')) {
    return KNOWLEDGE_BASE.skills;
  }
  if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
    return KNOWLEDGE_BASE.projects;
  }
  if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('college') || lowerMessage.includes('degree')) {
    return KNOWLEDGE_BASE.education;
  }
  if (lowerMessage.includes('experience') || lowerMessage.includes('intern') || lowerMessage.includes('job')) {
    return KNOWLEDGE_BASE.experience;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('connect')) {
    return KNOWLEDGE_BASE.contact;
  }
  if (lowerMessage.includes('achieve') || lowerMessage.includes('award') || lowerMessage.includes('publication') || lowerMessage.includes('ieee')) {
    return KNOWLEDGE_BASE.achievements;
  }
  if (lowerMessage.includes('stellaris') || lowerMessage.includes('hiring')) {
    return KNOWLEDGE_BASE.stellaris;
  }
  if (lowerMessage.includes('remind') || lowerMessage.includes('brain') || lowerMessage.includes('connectome')) {
    return KNOWLEDGE_BASE.remind;
  }
  if (lowerMessage.includes('food') || lowerMessage.includes('nutrition')) {
    return KNOWLEDGE_BASE.foodsnap;
  }
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 I'm Anjana's AI assistant. How can I help you today? You can ask about her skills, projects, education, or experience!";
  }
  if (lowerMessage.includes('thank')) {
    return "You're welcome! Feel free to ask if you have more questions, or use the contact form to reach Anjana directly.";
  }

  return KNOWLEDGE_BASE.default;
}
