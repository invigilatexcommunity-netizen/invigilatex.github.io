// ===========================
// NAVIGATION
// ===========================

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// SMOOTH SCROLL & ACTIVE LINKS
// ===========================

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// PARTICLES ANIMATION
// ===========================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';

        // Random color from gradient
        const colors = ['rgba(147, 51, 234, 0.6)', 'rgba(59, 130, 246, 0.6)', 'rgba(6, 182, 212, 0.6)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';

        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;

        particlesContainer.appendChild(particle);
    }
}

// Add floating animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -20px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-20px, -40px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(40px, -20px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.glass-card, .skill-card, .community-card, .about-card');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===========================
// FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Create mailto link
    const mailtoLink = `mailto:invigilatex.community@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Show success message
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Opening email client...</span> <i class="fas fa-check"></i>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after delay
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';

        // Show thank you message
        alert('Thank you for your interest in INVIGILATEX! Your email client should open now. If not, please email us directly at invigilatex.community@gmail.com');
    }, 2000);
});

// ===========================
// TYPING EFFECT FOR HERO
// ===========================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const titleMain = document.querySelector('.title-main');
//     const titleSub = document.querySelector('.title-sub');
//     const originalMainText = titleMain.textContent;
//     const originalSubText = titleSub.textContent;

//     titleMain.style.opacity = '1';
//     titleSub.style.opacity = '1';

//     typeWriter(titleMain, originalMainText, 80);
//     setTimeout(() => typeWriter(titleSub, originalSubText, 80), originalMainText.length * 80);
// });

// ===========================
// MOUSE PARALLAX EFFECT
// ===========================

document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach(card => {
        const speed = card.dataset.speed || 5;
        const x = mouseX * speed;
        const y = mouseY * speed;

        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
});

// Reset transform on mouse leave
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.style.transform = '';
    });
});

// ===========================
// SKILL CARD 3D TILT EFFECT
// ===========================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.4s ease';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===========================
// COUNTER ANIMATION
// ===========================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Optional: Add counters if needed
// Example: <span class="counter" data-target="500">0</span>+
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===========================
// CURSOR TRAIL EFFECT
// ===========================

const cursorTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

function drawCursorTrail() {
    const existingTrails = document.querySelectorAll('.cursor-trail');
    existingTrails.forEach(trail => trail.remove());

    cursorTrail.forEach((pos, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.position = 'fixed';
        trail.style.left = pos.x + 'px';
        trail.style.top = pos.y + 'px';
        trail.style.width = '6px';
        trail.style.height = '6px';
        trail.style.borderRadius = '50%';
        trail.style.background = `rgba(147, 51, 234, ${index / trailLength})`;
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 500);
    });

    requestAnimationFrame(drawCursorTrail);
}

// Uncomment to enable cursor trail
// drawCursorTrail();

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #9333ea, #3b82f6);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(147, 51, 234, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
    this.style.boxShadow = '0 10px 30px rgba(147, 51, 234, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 5px 20px rgba(147, 51, 234, 0.4)';
});

// ===========================
// LAZY LOADING IMAGES
// ===========================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log('%cðŸš€ INVIGILATEX', 'font-size: 40px; font-weight: bold; background: linear-gradient(135deg, #9333ea, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cEmpowering Future Innovators Through Technology', 'font-size: 16px; color: #06b6d4; font-weight: bold;');
console.log('%cInterested in joining our community? Visit: https://www.instagram.com/invigilatex', 'font-size: 14px; color: #9333ea;');
console.log('%câ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”', 'color: #3b82f6;');

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

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

// Apply debounce to scroll and resize events
window.addEventListener('scroll', debounce(highlightNavLink, 10));
window.addEventListener('resize', debounce(() => {
    // Add any resize handlers here
}, 250));

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('ðŸŽ‰ INVIGILATEX website loaded successfully!');

    // Add any initialization code here
    // Example: Check for saved theme preference, load user data, etc.
});
