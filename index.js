// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            closeMenu();
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('[v0] Hamburger clicked');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    console.log('[v0] Closing menu');
    if (hamburger) {
        hamburger.classList.remove('active');
    }
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    }
});

// Active nav link tracking
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add subtle parallax effect on scroll
const heroAccent = document.querySelector('.hero-accent');
if (heroAccent) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroAccent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
}

// Intersection Observer for fade-in animations
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

// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add a class to nav links when they are active
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-green) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Dynamically adjust color scheme on load
window.addEventListener('load', () => {
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add ripple effect on button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('[Portfolio] Interactive features loaded successfully');
