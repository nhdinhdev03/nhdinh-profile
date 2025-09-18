// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.language-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const floatingIcons = document.querySelectorAll('.floating-icon');
const centralOrb = document.querySelector('.central-orb');
const buttons = document.querySelectorAll('.btn');

// Theme Toggle Functionality
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    const icon = themeToggle.querySelector('i');
    
    if (isDarkMode) {
        icon.className = 'fas fa-moon';
        document.body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)';
    } else {
        icon.className = 'fas fa-sun';
        document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)';
        document.body.style.color = '#1e293b';
    }
});

// Language Toggle
let currentLang = 'EN';
const languages = {
    'EN': {
        flag: 'https://flagcdn.com/us.svg',
        text: 'EN'
    },
    'VI': {
        flag: 'https://flagcdn.com/vn.svg', 
        text: 'VI'
    }
};

languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'EN' ? 'VI' : 'EN';
    const flag = languageToggle.querySelector('.flag');
    const text = languageToggle.querySelector('span');
    
    flag.src = languages[currentLang].flag;
    text.textContent = languages[currentLang].text;
    
    // Add animation
    languageToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        languageToggle.style.transform = 'scale(1)';
    }, 150);
});

// Navigation Active State
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Add click animation
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    });
});

// Floating Icons Interactive Animation
floatingIcons.forEach((icon, index) => {
    // Add hover effect
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.boxShadow = 'none';
    });
    
    // Add random floating animation
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomRotate = (Math.random() - 0.5) * 30;
        
        icon.style.transform += `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        
        setTimeout(() => {
            icon.style.transform = icon.style.transform.replace(`translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`, '');
        }, 2000);
    }, 3000 + index * 500);
});

// Central Orb Click Effect
centralOrb.addEventListener('click', () => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.background = 'rgba(59, 130, 246, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.8s ease-out';
    ripple.style.pointerEvents = 'none';
    
    centralOrb.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
});

// Button Click Effects
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
        
        // Add particle effect
        createParticles(e.target);
    });
});

// Particle Effect Function
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#3b82f6';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `particle-${i} 0.8s ease-out forwards`;
        
        // Create unique animation for each particle
        const keyframes = `
            @keyframes particle-${i} {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${vx}px, ${vy}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
            style.remove();
        }, 800);
    }
}

// Scroll Animations
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-left, .hero-right');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Mouse Parallax Effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        icon.style.transform += ` translate(${x}px, ${y}px)`;
    });
    
    // Central orb parallax
    const orbX = (mouseX - 0.5) * 10;
    const orbY = (mouseY - 0.5) * 10;
    centralOrb.style.transform += ` translate(${orbX}px, ${orbY}px)`;
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    if (e.key === 'Escape') {
        // Reset all active states
        navLinks.forEach(link => link.blur());
        buttons.forEach(button => button.blur());
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add ripple animation keyframes
const rippleKeyframes = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleKeyframes;
document.head.appendChild(rippleStyle);

// Initialize
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', () => {
    handleScrollAnimations();
    
    // Add initial load animation
    const elements = document.querySelectorAll('.hero-left, .hero-right');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Update any continuous animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Resize handler
window.addEventListener('resize', () => {
    requestTick();
});

console.log('🚀 Portfolio website loaded successfully!');