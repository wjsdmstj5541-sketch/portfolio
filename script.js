// ==========================================
// DOM Elements
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.getElementById('cursor');
const loadingScreen = document.getElementById('loadingScreen');

// ==========================================
// 0. Loading Screen
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen?.classList.add('hidden');
    }, 1800);
});

// ==========================================
// Skills Progress Bar Animation
// ==========================================
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.dataset.progress;
            entry.target.style.setProperty('--progress', progress + '%');
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==========================================
// 1. Custom Cursor Effect
// ==========================================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .exp-card, .nav-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('hover');
    });
});

// ==========================================
// 2. Typing Effect
// ==========================================
const heroTag = document.querySelector('.hero-tag');
const typingText = '📷 Photographer';
let charIndex = 0;

function typeText() {
    if (heroTag && charIndex < typingText.length) {
        heroTag.textContent = typingText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing after page load
window.addEventListener('load', () => {
    if (heroTag) {
        heroTag.textContent = '';
        setTimeout(typeText, 500);
    }
});

// ==========================================
// 3. Parallax Scroll Effect
// ==========================================
const hero = document.querySelector('.hero');
const profileCard = document.querySelector('.profile-card');
const heroText = document.querySelector('.hero-text');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Parallax for hero elements
    if (profileCard && scrollY < window.innerHeight) {
        profileCard.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    if (heroText && scrollY < window.innerHeight) {
        heroText.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroText.style.opacity = 1 - (scrollY / 700);
    }

    // Navbar scroll effect
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// 4. 3D Tilt Card Effect
// ==========================================
const expCards = document.querySelectorAll('.exp-card');

expCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.15)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    });
});

// ==========================================
// Navigation
// ==========================================
// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Fade-in Animations
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.querySelectorAll('.exp-card, .philosophy-card, .about-content, .vision-content, .gallery-item, .project-card, .activity-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles with trendy animations
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    .section-header {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section-header.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Observe section headers too
document.querySelectorAll('.section-header').forEach(el => {
    observer.observe(el);
});

// Stagger animation for exp-cards
expCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger animation for gallery items
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger animation for project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Stagger animation for activity cards
document.querySelectorAll('.activity-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Portfolio Concept Tabs & Sliders
// ==========================================
const tabBtns = document.querySelectorAll('.tab-btn');
const conceptSliders = document.querySelectorAll('.concept-slider');

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const concept = btn.dataset.concept;

        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding slider
        conceptSliders.forEach(slider => {
            slider.classList.remove('active');
            if (slider.id === concept) {
                slider.classList.add('active');
            }
        });
    });
});

// Initialize each concept slider
conceptSliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dotsContainer = slider.querySelector('.slider-dots');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer && totalSlides > 0) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    const dots = slider.querySelectorAll('.slider-dot');

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
});

console.log('Portfolio loaded with all effects! ✨');
