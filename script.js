        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link, .cta-button').forEach(anchor => {
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

        // Scroll indicator
        function updateScrollIndicator() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateScrollIndicator);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Active navigation highlighting
        function updateActiveNav() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Header background on scroll
        function updateHeader() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.9)';
            }
        }

        window.addEventListener('scroll', updateHeader);

        // Parallax effect for floating elements
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }

        window.addEventListener('scroll', updateParallax);

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('nav ul');

        mobileMenu.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.padding = '1rem';
            nav.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        });

        // Typing animation for hero text
        function typeWriter(element, text, speed = 50) {
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

        // Initialize animations on load
        window.addEventListener('load', () => {
            // Add initial visible class to first section
            document.querySelector('#about').classList.add('visible');
            
            // Add stagger animation to skill items
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });

            // Add hover sound effects (optional)
            document.querySelectorAll('.btn, .project, .skill-item').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    // You can add subtle sound effects here if desired
                });
            });
        });

        // Add mouse follower effect
        const mouseFollower = document.createElement('div');
        mouseFollower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(mouseFollower);

        document.addEventListener('mousemove', (e) => {
            mouseFollower.style.left = e.clientX - 10 + 'px';
            mouseFollower.style.top = e.clientY - 10 + 'px';
        });

        // Hide mouse follower on mobile
        if (window.innerWidth <= 768) {
            mouseFollower.style.display = 'none';
        }
