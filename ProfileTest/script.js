

        // ============= QUANTUM GSAP INITIALIZATION ============= 
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // ============= QUANTUM LOADING SEQUENCE =============
        class QuantumLoader {
            constructor() {
                this.progress = 0;
                this.loader = document.getElementById('quantum-loader');
                this.progressBar = document.getElementById('progress-bar');
                this.progressText = document.getElementById('loading-progress');
                this.init();
            }

            init() {
                this.startLoading();
            }

            startLoading() {
                const timeline = gsap.timeline();
                
                timeline.to(this, {
                    progress: 100,
                    duration: 3,
                    ease: "power2.out",
                    onUpdate: () => {
                        this.progressBar.style.width = `${this.progress}%`;
                        this.progressText.textContent = Math.floor(this.progress);
                    }
                })
                .to(this.loader, {
                    opacity: 0,
                    duration: 1,
                    delay: 0.5,
                    onComplete: () => {
                        this.loader.style.display = 'none';
                        this.initQuantumExperience();
                    }
                });
            }

            initQuantumExperience() {
                // Initialize all quantum systems
                new QuantumParticles();
                new ThreeJSBackground();
                new QuantumTypewriter();
                new QuantumNavigation();
                new QuantumScrollEffects();
                new MatrixRain();
                new QuantumCounters();
                initAOS();
            }
        }

        // ============= THREE.JS QUANTUM BACKGROUND =============
        class ThreeJSBackground {
            constructor() {
                this.scene = new THREE.Scene();
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                this.renderer = new THREE.WebGLRenderer({ 
                    canvas: document.getElementById('three-canvas'),
                    alpha: true 
                });
                this.init();
            }

            init() {
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.camera.position.z = 5;

                // Create quantum particles
                const geometry = new THREE.BufferGeometry();
                const vertices = [];
                const colors = [];

                for (let i = 0; i < 1000; i++) {
                    vertices.push(
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 100
                    );
                    
                    const color = new THREE.Color();
                    color.setHSL(Math.random() * 0.2 + 0.5, 1, 0.5);
                    colors.push(color.r, color.g, color.b);
                }

                geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

                const material = new THREE.PointsMaterial({ 
                    size: 0.1, 
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.6
                });

                this.points = new THREE.Points(geometry, material);
                this.scene.add(this.points);

                this.animate();
                this.handleResize();
            }

            animate() {
                requestAnimationFrame(() => this.animate());
                
                this.points.rotation.x += 0.0005;
                this.points.rotation.y += 0.001;
                
                this.renderer.render(this.scene, this.camera);
            }

            handleResize() {
                window.addEventListener('resize', () => {
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                });
            }
        }

        // ============= QUANTUM PARTICLES SYSTEM =============
        class QuantumParticles {
            constructor() {
                this.initParticles();
            }

            initParticles() {
                particlesJS('particles-quantum', {
                    particles: {
                        number: { value: 100, density: { enable: true, value_area: 800 } },
                        color: { value: ["#00f5ff", "#bf00ff", "#ff0080", "#39ff14"] },
                        shape: {
                            type: "circle",
                            stroke: { width: 0, color: "#000000" },
                        },
                        opacity: {
                            value: 0.6,
                            random: true,
                            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#00f5ff",
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false,
                            attract: { enable: false, rotateX: 600, rotateY: 1200 }
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "repulse" },
                            onclick: { enable: true, mode: "push" },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 400, line_linked: { opacity: 1 } },
                            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                            repulse: { distance: 200, duration: 0.4 },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 }
                        }
                    },
                    retina_detect: true
                });
            }
        }

        // ============= MATRIX RAIN EFFECT =============
        class MatrixRain {
            constructor() {
                this.canvas = document.getElementById('matrix-rain');
                this.ctx = this.canvas.getContext('2d');
                this.init();
            }

            init() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;

                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
                this.lettersArray = letters.split('');

                const fontSize = 14;
                const columns = this.canvas.width / fontSize;

                this.drops = [];
                for (let x = 0; x < columns; x++) {
                    this.drops[x] = 1;
                }

                this.animate();
                this.handleResize();
            }

            animate() {
                this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                this.ctx.fillStyle = '#00f5ff';
                this.ctx.font = '14px monospace';

                for (let i = 0; i < this.drops.length; i++) {
                    const text = this.lettersArray[Math.floor(Math.random() * this.lettersArray.length)];
                    this.ctx.fillText(text, i * 14, this.drops[i] * 14);

                    if (this.drops[i] * 14 > this.canvas.height && Math.random() > 0.975) {
                        this.drops[i] = 0;
                    }
                    this.drops[i]++;
                }

                setTimeout(() => this.animate(), 35);
            }

            handleResize() {
                window.addEventListener('resize', () => {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                });
            }
        }

        // ============= QUANTUM TYPEWRITER EFFECT =============
        class QuantumTypewriter {
            constructor() {
                this.element = document.getElementById('quantum-typewriter');
                this.texts = [
                    'FULL STACK DEVELOPER',
                    'QUANTUM UI/UX DESIGNER', 
                    'AI INTEGRATION SPECIALIST',
                    'CLOUD ARCHITECT',
                    'BLOCKCHAIN DEVELOPER',
                    'CYBERSECURITY EXPERT',
                    'DIGITAL TRANSFORMATION CONSULTANT'
                ];
                this.textIndex = 0;
                this.charIndex = 0;
                this.isDeleting = false;
                this.init();
            }

            init() {
                this.type();
            }

            type() {
                const currentText = this.texts[this.textIndex];
                
                if (this.isDeleting) {
                    this.element.textContent = currentText.substring(0, this.charIndex - 1);
                    this.charIndex--;
                    
                    if (this.charIndex === 0) {
                        this.isDeleting = false;
                        this.textIndex = (this.textIndex + 1) % this.texts.length;
                        setTimeout(() => this.type(), 500);
                        return;
                    }
                } else {
                    this.element.textContent = currentText.substring(0, this.charIndex + 1);
                    this.charIndex++;
                    
                    if (this.charIndex === currentText.length) {
                        this.isDeleting = true;
                        setTimeout(() => this.type(), 2000);
                        return;
                    }
                }
                
                setTimeout(() => this.type(), this.isDeleting ? 50 : 100);
            }
        }

        // ============= QUANTUM NAVIGATION SYSTEM =============
        class QuantumNavigation {
            constructor() {
                this.header = document.getElementById('quantum-header');
                this.mobileMenuBtn = document.getElementById('neural-menu-btn');
                this.mobileMenu = document.getElementById('neural-menu');
                this.closeMobileMenu = document.getElementById('close-neural-menu');
                this.overlay = document.getElementById('quantum-overlay');
                this.hamburger = document.querySelector('.holo-hamburger');
                this.lastScrollY = window.scrollY;
                
                this.init();
            }

            init() {
                this.setupScrollEffects();
                this.setupMobileMenu();
                this.setupSmoothScrolling();
                this.setupActiveNavigation();
                this.setupThemeToggle();
            }

            setupScrollEffects() {
                window.addEventListener('scroll', () => {
                    const currentScrollY = window.scrollY;
                    
                    // Update progress bar
                    const progress = document.getElementById('quantum-progress');
                    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progressPercent = (currentScrollY / scrollHeight) * 100;
                    progress.style.width = `${progressPercent}%`;
                    
                    // Header appearance
                    if (currentScrollY > 50) {
                        this.header.classList.add('quantum-header');
                    } else {
                        this.header.classList.remove('quantum-header');
                    }
                    
                    // Auto-hide header
                    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                        gsap.to(this.header, { y: -100, duration: 0.3 });
                    } else {
                        gsap.to(this.header, { y: 0, duration: 0.3 });
                    }
                    
                    // Floating button visibility
                    const floatBtn = document.getElementById('quantum-scroll-top');
                    if (currentScrollY > 300) {
                        floatBtn.classList.add('visible');
                    } else {
                        floatBtn.classList.remove('visible');
                    }
                    
                    this.lastScrollY = currentScrollY;
                });
            }

            setupMobileMenu() {
                this.mobileMenuBtn.addEventListener('click', () => this.openMobileMenu());
                this.closeMobileMenu.addEventListener('click', () => this.closeMobileMenuFunc());
                this.overlay.addEventListener('click', () => this.closeMobileMenuFunc());
                
                // Close on nav link click
                const navLinks = document.querySelectorAll('.neural-nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => this.closeMobileMenuFunc());
                });
            }

            openMobileMenu() {
                gsap.timeline()
                    .set(this.overlay, { display: 'block' })
                    .to(this.overlay, { opacity: 1, duration: 0.3 })
                    .to(this.mobileMenu, { x: 0, duration: 0.5, ease: "back.out(1.7)" }, 0.1)
                    .to(this.hamburger, { rotation: 45, duration: 0.3 }, 0);
                
                document.body.style.overflow = 'hidden';
            }

            closeMobileMenuFunc() {
                gsap.timeline()
                    .to(this.mobileMenu, { x: '100%', duration: 0.4, ease: "back.in(1.7)" })
                    .to(this.overlay, { opacity: 0, duration: 0.3 }, 0.1)
                    .set(this.overlay, { display: 'none' })
                    .to(this.hamburger, { rotation: 0, duration: 0.3 }, 0);
                
                document.body.style.overflow = 'auto';
            }

            setupSmoothScrolling() {
                const navLinks = document.querySelectorAll('a[href^="#"]');
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetId = link.getAttribute('href');
                        const targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            gsap.to(window, {
                                duration: 1.5,
                                scrollTo: {
                                    y: targetSection,
                                    offsetY: 100
                                },
                                ease: "power2.out"
                            });
                        }
                    });
                });
            }

            setupActiveNavigation() {
                const sections = document.querySelectorAll('section[id]');
                const navLinks = document.querySelectorAll('.holo-nav, .neural-nav-link');
                
                window.addEventListener('scroll', () => {
                    let current = '';
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop - 120;
                        if (scrollY >= sectionTop) {
                            current = section.getAttribute('id');
                        }
                    });

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === `#${current}`) {
                            link.classList.add('active');
                        }
                    });
                });
            }

            setupThemeToggle() {
                const themeToggles = document.querySelectorAll('[id*="theme-toggle"]');
                let isDarkMode = false;

                themeToggles.forEach(toggle => {
                    toggle.addEventListener('click', () => {
                        isDarkMode = !isDarkMode;
                        const icon = isDarkMode ? 'fa-sun' : 'fa-atom';
                        
                        themeToggles.forEach(t => {
                            const iconElement = t.querySelector('i');
                            iconElement.className = `fas ${icon} text-white text-lg`;
                            
                            gsap.to(t, {
                                rotation: 360,
                                duration: 0.5,
                                ease: "back.out(1.7)"
                            });
                        });
                        
                        document.body.classList.toggle('dark-mode', isDarkMode);
                    });
                });
            }
        }

        // ============= QUANTUM SCROLL EFFECTS =============
        class QuantumScrollEffects {
            constructor() {
                this.init();
            }

            init() {
                this.setupScrollTriggers();
                this.setupParallaxEffects();
                this.setupFloatingElements();
            }

            setupScrollTriggers() {
                // Header animations
                gsap.fromTo('.quantum-logo', 
                    { opacity: 0, y: -50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        delay: 3.5,
                        ease: "back.out(1.7)" 
                    }
                );

                // Navigation links stagger
                gsap.fromTo('.holo-nav', 
                    { opacity: 0, y: -30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.6, 
                        delay: 4,
                        stagger: 0.1,
                        ease: "power2.out" 
                    }
                );

                // Section animations
                gsap.utils.toArray('section').forEach(section => {
                    gsap.fromTo(section, 
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 1,
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            }

            setupParallaxEffects() {
                // Background parallax
                gsap.to('.holographic-bg', {
                    yPercent: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: 'body',
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });

                // Floating shapes parallax
                gsap.utils.toArray('.shape').forEach((shape, i) => {
                    gsap.to(shape, {
                        y: (i + 1) * -100,
                        rotation: 360,
                        ease: "none",
                        scrollTrigger: {
                            trigger: 'body',
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                });
            }

            setupFloatingElements() {
                // Floating animation for quantum buttons
                gsap.to('.quantum-float', {
                    y: -10,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                });

                // Logo floating effect
                gsap.to('.logo-core', {
                    y: -5,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut"
                });
            }
        }

        // ============= QUANTUM COUNTERS =============
        class QuantumCounters {
            constructor() {
                this.init();
            }

            init() {
                const counters = document.querySelectorAll('[data-counter]');
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'));
                    
                    ScrollTrigger.create({
                        trigger: counter,
                        start: "top 80%",
                        onEnter: () => {
                            gsap.to(counter, {
                                textContent: target,
                                duration: 2,
                                ease: "power2.out",
                                snap: { textContent: 1 },
                                stagger: 0.1
                            });
                        }
                    });
                });
            }
        }

        // ============= FLOATING ACTION HANDLERS =============
        document.getElementById('quantum-scroll-top').addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: 0 },
                ease: "power2.out"
            });
        });

        // ============= AOS INITIALIZATION =============
        function initAOS() {
            AOS.init({
                duration: 1200,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }

        // ============= KEYBOARD SHORTCUTS =============
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navigation = new QuantumNavigation();
                navigation.closeMobileMenuFunc();
            }
            
            // Konami code for secret quantum mode
            const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
            // Implementation for secret features
        });

        // ============= QUANTUM ERROR HANDLING =============
        window.addEventListener('error', (e) => {
            console.error('Quantum system error:', e.error);
            // Graceful fallback for quantum features
        });

        // ============= PERFORMANCE MONITORING =============
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`🚀 Quantum interface loaded in ${loadTime.toFixed(2)}ms`);
        });

        // ============= QUANTUM CURSOR EFFECTS =============
        class QuantumCursor {
            constructor() {
                this.cursor = document.createElement('div');
                this.cursor.className = 'quantum-cursor';
                document.body.appendChild(this.cursor);
                this.init();
            }

            init() {
                document.addEventListener('mousemove', (e) => {
                    this.cursor.style.left = e.clientX - 10 + 'px';
                    this.cursor.style.top = e.clientY - 10 + 'px';
                    
                    // Create trail effect
                    this.createTrail(e.clientX, e.clientY);
                });

                document.addEventListener('mousedown', () => {
                    this.cursor.style.transform = 'scale(0.8)';
                });

                document.addEventListener('mouseup', () => {
                    this.cursor.style.transform = 'scale(1)';
                });
            }

            createTrail(x, y) {
                const trail = document.createElement('div');
                trail.className = 'quantum-cursor-trail';
                trail.style.left = x - 4 + 'px';
                trail.style.top = y - 4 + 'px';
                document.body.appendChild(trail);

                setTimeout(() => {
                    trail.remove();
                }, 500);
            }
        }

        // ============= QUANTUM DATA STREAMS =============
        class QuantumDataStreams {
            constructor() {
                this.init();
            }

            init() {
                setInterval(() => {
                    this.createDataStream();
                }, 2000);
            }

            createDataStream() {
                const stream = document.createElement('div');
                stream.className = 'quantum-data-stream';
                stream.style.left = Math.random() * 100 + '%';
                stream.style.animationDuration = (2 + Math.random() * 2) + 's';
                document.body.appendChild(stream);

                setTimeout(() => {
                    stream.remove();
                }, 4000);
            }
        }

        // ============= KONAMI CODE EASTER EGG =============
        class KonamiCode {
            constructor() {
                this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
                this.userInput = [];
                this.init();
            }

            init() {
                document.addEventListener('keydown', (e) => {
                    this.userInput.push(e.code);
                    
                    if (this.userInput.length > this.sequence.length) {
                        this.userInput.shift();
                    }
                    
                    if (this.userInput.join(',') === this.sequence.join(',')) {
                        this.activateQuantumMode();
                    }
                });
            }

            activateQuantumMode() {
                document.body.classList.add('konami-activated');
                
                const secret = document.createElement('div');
                secret.className = 'quantum-secret active';
                secret.innerHTML = `
                    <h3 class="text-2xl font-black text-cyan-400 mb-4 font-cyber">QUANTUM MODE ACTIVATED!</h3>
                    <p class="text-gray-300 mb-6">🎉 Bạn đã khám phá ra chế độ quantum bí mật!</p>
                    <button onclick="this.parentElement.remove(); document.body.classList.remove('konami-activated')" 
                            class="quantum-cta px-6 py-3 rounded-xl">
                        <i class="fas fa-rocket mr-2"></i>AWESOME!
                    </button>
                `;
                document.body.appendChild(secret);
                
                // Add special effects
                this.addQuantumEffects();
            }

            addQuantumEffects() {
                // Particle explosion effect
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        const particle = document.createElement('div');
                        particle.style.cssText = `
                            position: fixed;
                            width: 4px;
                            height: 4px;
                            background: var(--neon-cyan);
                            border-radius: 50%;
                            pointer-events: none;
                            z-index: 9999;
                            left: 50%;
                            top: 50%;
                            animation: explode 2s ease-out forwards;
                        `;
                        
                        const angle = (i / 50) * Math.PI * 2;
                        const distance = 100 + Math.random() * 200;
                        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
                        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
                        
                        document.body.appendChild(particle);
                        
                        setTimeout(() => particle.remove(), 2000);
                    }, i * 20);
                }
            }
        }

        // Add explosion animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes explode {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--x), var(--y)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // ============= INITIALIZE QUANTUM EXPERIENCE =============
        document.addEventListener('DOMContentLoaded', () => {
            new QuantumLoader();
            new QuantumCursor();
            new QuantumDataStreams();
            new KonamiCode();
            
            console.log('🌌 QUANTUM PORTFOLIO SYSTEM INITIALIZED');
            console.log('⚡ ALL SYSTEMS OPERATIONAL');
            console.log('🔮 WELCOME TO THE FUTURE');
            console.log('💡 TIP: Try the Konami Code! ↑↑↓↓←→←→BA');
        });
