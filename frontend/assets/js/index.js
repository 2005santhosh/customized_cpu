/* ─── TYPEWRITER EFFECT ─── */
document.addEventListener('DOMContentLoaded', () => {
    
    const typeTextElement = document.getElementById("typewriter");
    if(typeTextElement) {
        const words = ["Performance", "Speed", "Gaming", "Action", "Power", "Immersion"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typeTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 150;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }
        typeWriter();
    }
});

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => io.observe(el));

/* ─── COUNTER ANIMATION ─── */
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

/* ─── BEAST CARD PERSPECTIVE TILT ─── */
const beastCard = document.getElementById('beastCard');
const beastWrap = document.getElementById('beastWrap');
const beastGlow = document.getElementById('beastGlow');

if (beastCard && beastWrap) {
    const MAX_TILT = 15;

    beastWrap.addEventListener('mousemove', (e) => {
        const rect = beastCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const nx = (x - cx) / cx;
        const ny = (y - cy) / cy;

        const rotY = nx * MAX_TILT;
        const rotX = -ny * MAX_TILT;

        beastCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
        
        beastCard.style.setProperty('--angle', `${Math.atan2(e.clientY - window.innerHeight / 2, e.clientX - window.innerWidth / 2) * 180 / Math.PI + 90}deg`);

        beastGlow.style.background = `radial-gradient(
            ellipse 80% 60% at ${x / rect.width * 100}% ${y / rect.height * 100}%,
            rgba(107,43,255,0.25) 0%,
            transparent 65%
        )`;
    });

    beastWrap.addEventListener('mouseleave', () => {
        beastCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        beastGlow.style.background = 'none';
    });
}

/* ─── MOBILE FULL MENU (FIXED TOGGLE) ─── */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function openMenu() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Robust Toggle Logic
    function toggleMenu(e) {
        e.stopPropagation(); // Stop bubbling if needed
        if (mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (menuClose) {
        menuClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.mm-link').forEach(link => {
        link.addEventListener('click', () => {
            // Slight delay to allow user to see the click effect
            setTimeout(closeMenu, 200);
        });
    });
});

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});