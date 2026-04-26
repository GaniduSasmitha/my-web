/* ================================================
   Ganidu Sasmitha — Portfolio Scripts
   script.js
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* — CUSTOM CURSOR — */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactables = document.querySelectorAll('a, button, input, textarea, .skill-card, .cert-card, .ach-card, .project-card, .role-card, .social-icon, .btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '55px';
            cursorRing.style.height = '55px';
            cursorRing.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '32px';
            cursorRing.style.height = '32px';
            cursorRing.style.backgroundColor = 'transparent';
        });
    });

    /* — SCROLL REVEAL — */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });

    /* — MOBILE NAV HAMBURGER — */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navAnchors = navLinks.querySelectorAll('a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                mobileMenuBtn.innerText = '✕';
            } else {
                mobileMenuBtn.innerText = '☰';
            }
        });
        
        navAnchors.forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerText = '☰';
            });
        });
    }

    /* — FILE UPLOAD — */
    // No explicit file upload JS was found in index.html

    // Form removed, CTA card used instead.

    /* — ANIMATION DELAYS — */
    const setStaggerDelays = (containerSelector, itemSelector, delayMultiplier) => {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const items = container.querySelectorAll(itemSelector);
            items.forEach((item, index) => {
                item.style.transitionDelay = `${index * delayMultiplier}s`;
            });
        });
    };

    setStaggerDelays('.skills-grid', '.skill-card', 0.15);
    setStaggerDelays('.achievements-grid', '.ach-card', 0.2);
    setStaggerDelays('.projects-grid', '.project-card', 0.2);
    setStaggerDelays('.timeline', '.timeline-item', 0.25);
    setStaggerDelays('.roles-grid', '.role-card', 0.15);

    /* — CERTIFICATES CAROUSEL — */
    const certCarousel = document.getElementById('cert-carousel');
    const certPrev = document.getElementById('certPrev');
    const certNext = document.getElementById('certNext');

    if (certCarousel && certPrev && certNext) {
        certNext.addEventListener('click', () => {
            certCarousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
        certPrev.addEventListener('click', () => {
            certCarousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    /* — CV MODAL — */
    const modal = document.getElementById('cv-modal');
    const btnOpenModal = document.getElementById('btn-preview-cv');
    const btnCloseModal = document.querySelector('.modal-close');

    if (btnOpenModal && modal) {
        btnOpenModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    const closeModal = () => modal.classList.remove('active');

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModal);
    }
    
    const btnCloseModalFooter = document.querySelector('.close-modal-btn');
    if(btnCloseModalFooter) {
        btnCloseModalFooter.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
