// ===========================
// INVIGILATEX - Interactive Animations
// Modern, Futuristic, Tech-driven
// ===========================

// Particle Animation System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        // Gradient color based on position
        const hue = (particle.x / this.canvas.width) * 60 + 240;
        this.ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${particle.opacity})`;
        this.ctx.fill();
    }

    updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (this.mouse.radius - distance) / this.mouse.radius;
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        this.connectParticles();

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.links = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.menu.classList.toggle('active');
        });

        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.toggle.classList.remove('active');
                this.menu.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll Animation
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Reveal Animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        this.observeElements();
        // Initial check for elements already in view
        this.checkElements();
    }

    observeElements() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }

    checkElements() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.85;

            if (isVisible) {
                el.classList.add('animated');
            }
        });
    }
}

// Navbar Background on Scroll
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 15, 0.8)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        );
        const mailtoLink = `mailto:invigilatex.community@gmail.com?subject=${subject}&body=${body}`;

        // Open mail client
        window.location.href = mailtoLink;

        // Show success message
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        const button = this.form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = '<span>Message Sent!</span>';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            this.form.reset();
        }, 3000);
    }
}

// 3D Card Tilt Effect
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.glass-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
            card.addEventListener('mouseleave', () => this.resetTilt(card));
        });
    }

    handleTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }

    resetTilt(card) {
        card.style.transform = '';
    }
}

// Typing Animation for Hero
class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.hero-subtitle');
        this.text = this.element ? this.element.textContent : '';
        this.init();
    }

    init() {
        if (!this.element) return;

        this.element.textContent = '';
        this.element.style.opacity = '1';

        let index = 0;
        const speed = 30;

        const type = () => {
            if (index < this.text.length) {
                this.element.textContent += this.text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };

        setTimeout(type, 500);
    }
}

// Active Link Highlighter
class ActiveLinkHighlighter {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Cursor Glow Effect
class CursorGlow {
    constructor() {
        this.glow = document.createElement('div');
        this.init();
    }

    init() {
        if (window.innerWidth < 768) return; // Disable on mobile

        this.glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;

        document.body.appendChild(this.glow);

        document.addEventListener('mousemove', (e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
            this.glow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// Add data-animate attributes to elements
function addAnimationAttributes() {
    // Add to section cards
    document.querySelectorAll('.about-card, .skill-card, .community-card').forEach(el => {
        el.setAttribute('data-animate', '');
    });

    // Add to section headers
    document.querySelectorAll('.section-header').forEach(el => {
        el.setAttribute('data-animate', '');
    });

    // Add to founder card
    const founderCard = document.querySelector('.founder-card');
    if (founderCard) founderCard.setAttribute('data-animate', '');

    // Add to contact content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) contactContent.setAttribute('data-animate', '');
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }

    // Add animation attributes
    addAnimationAttributes();

    // Initialize all features
    new MobileMenu();
    new SmoothScroll();
    new ScrollReveal();
    new NavbarScroll();
    new ContactForm();
    new CardTilt();
    new TypingAnimation();
    new ActiveLinkHighlighter();
    new CursorGlow();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Debounce resize events
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Re-initialize scroll reveal on resize
    const scrollReveal = new ScrollReveal();
}, 250));

// Preload critical assets
window.addEventListener('load', () => {
    // Force paint optimization
    document.body.style.willChange = 'auto';

    // Remove loading states
    document.querySelectorAll('[data-loading]').forEach(el => {
        el.removeAttribute('data-loading');
    });
});