/* ── SCROLL REVEAL ── */
        const reveals = document.querySelectorAll('.reveal');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    e.target.style.transitionDelay = (i * 0.08) + 's';
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => io.observe(el));

        /* ── COUNTER ANIMATION ── */
        function animateCounter(el) {
            const target = +el.dataset.target;
            const suffix = el.dataset.suffix || '';
            const divisor = +el.dataset.displayDivisor || 1;
            const duration = 2000;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const value = Math.floor(eased * target / divisor);

                if (divisor > 1) {
                    el.textContent = value + (divisor === 1000 ? 'K' : '') + suffix;
                } else {
                    el.textContent = value + suffix;
                }

                if (progress < 1) requestAnimationFrame(tick);
                else {
                    if (divisor > 1) el.textContent = (target / divisor) + (divisor === 1000 ? 'K' : '') + suffix;
                    else el.textContent = target + suffix;
                }
            }
            requestAnimationFrame(tick);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateCounter(e.target);
                    counterObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

        /* ── BEAST CARD PERSPECTIVE TILT ── */
        const beastCard = document.getElementById('beastCard');
        const beastWrap = document.getElementById('beastWrap');
        const beastGlow = document.getElementById('beastGlow');

        if (beastCard && beastWrap) {
            const MAX_TILT = 18;

            beastWrap.addEventListener('mousemove', (e) => {
                const rect = beastCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;

                const nx = (x - cx) / cx;
                const ny = (y - cy) / cy;

                const rotY =  nx * MAX_TILT;
                const rotX = -ny * MAX_TILT;

                beastCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
                beastCard.style.setProperty('--mx', (x / rect.width * 100) + '%');
                beastCard.style.setProperty('--my', (y / rect.height * 100) + '%');

                beastGlow.style.background = `radial-gradient(
                    ellipse 80% 60% at ${x / rect.width * 100}% ${y / rect.height * 100}%,
                    rgba(107,43,255,0.22) 0%,
                    transparent 65%
                )`;
            });

            beastWrap.addEventListener('mouseleave', () => {
                beastCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                beastGlow.style.background = 'none';
            });
        }

        /* ── MOBILE DRAWER ── */
        const menuToggle = document.getElementById('menuToggle');
        const menuClose = document.getElementById('menuClose');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const mobileOverlay = document.getElementById('mobileOverlay');

        function openDrawer() {
            mobileDrawer.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeDrawer() {
            mobileDrawer.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (menuToggle) menuToggle.addEventListener('click', openDrawer);
        if (menuClose) menuClose.addEventListener('click', closeDrawer);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

        document.querySelectorAll('.mobile-nav a').forEach(a => {
            a.addEventListener('click', closeDrawer);
        });

        /* ── SMOOTH SCROLL ── */
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
            });
        });