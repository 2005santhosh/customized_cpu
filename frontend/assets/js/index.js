 // 1. Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 2. Scroll Reveal Animation (Intersection Observer)
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // 3. Blueprint Hotspot Interaction
        function showInfo(id) {
            // Remove active class from all info boxes
            document.querySelectorAll('.info-box').forEach(box => {
                box.classList.remove('active');
            });
            
            // Remove active class from all hotspots
            document.querySelectorAll('.hotspot').forEach(spot => {
                spot.classList.remove('active');
            });

            // Activate selected
            const selectedBox = document.getElementById('info-' + id);
            if (selectedBox) selectedBox.classList.add('active');
            
            // Activate hotspot
            const selectedSpot = document.querySelector(`.hotspot[data-id="${id}"]`);
            if (selectedSpot) selectedSpot.classList.add('active');
        }

        // 4. Stats Counter Animation
        const statsSection = document.getElementById('metrics');
        let statsAnimated = false;

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    const counters = document.querySelectorAll('.metric-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps
                        
                        let current = 0;
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 });

        if(statsSection) statsObserver.observe(statsSection);

        // 5. Toast Notification System
        function showToast(message) {
            const toast = document.getElementById('toast');
            const msgEl = document.getElementById('toastMsg');
            
            msgEl.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

               // --- REDIRECT FUNCTIONS ---
        function goToLogin() {
            console.log("Redirecting to Login..."); // Debugging line
            window.location.href = '../pages/login.html';
            return false; // Prevents default anchor behavior
        }

        function goToSignup() {
            console.log("Redirecting to Signup..."); // Debugging line
            window.location.href = '../pages/signup.html';
            return false; 
        }

        // 6. Mobile Menu Logic
        function toggleMenu() {
            if (window.innerWidth <= 768) {
                const navList = document.getElementById('nav-list');
                const menuIcon = document.getElementById('menu-icon');
                
                navList.classList.toggle('nav-active');
                
                if (navList.classList.contains('nav-active')) {
                    menuIcon.classList.remove('ri-menu-4-line');
                    menuIcon.classList.add('ri-close-line');
                } else {
                    menuIcon.classList.remove('ri-close-line');
                    menuIcon.classList.add('ri-menu-4-line');
                }
            }
        }

        // --- NEW: Helper to close mobile menu when links are clicked ---
        function closeMobileMenu() {
            if (window.innerWidth <= 768) {
                const navList = document.getElementById('nav-list');
                const menuIcon = document.getElementById('menu-icon');
                
                navList.classList.remove('nav-active');
                menuIcon.classList.remove('ri-close-line');
                menuIcon.classList.add('ri-menu-4-line');
            }
        }

        // Reset menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                const navList = document.getElementById('nav-list');
                const menuIcon = document.getElementById('menu-icon');
                navList.classList.remove('nav-active');
                menuIcon.classList.remove('ri-close-line');
                menuIcon.classList.add('ri-menu-4-line');
            }
        });