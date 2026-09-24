/* — CAROUSEL SCROLL FUNCTION (TOP-LEVEL) — */
window.scrollCarousel = function(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const card = carousel.querySelector('.project-card, .cert-card');
    const step = (card ? card.offsetWidth : 300) + 24;
    const target = carousel.scrollLeft + (direction * step);
    
    if (typeof carousel.scrollTo === 'function') {
        carousel.scrollTo({ left: target, behavior: 'smooth' });
    } else {
        carousel.scrollLeft = target;
    }
};

function initPortfolio() {

    /* — SANITIZE INPUT HELPER — */
    function sanitizeInput(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* — CUSTOM CURSOR — */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    if (cursorDot && cursorRing) {
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

        const interactables = document.querySelectorAll('a, button, input, textarea, .skill-card, .cert-card, .ach-card, .project-card, .role-card, .social-icon, .btn, .cert-nav-btn, .carousel-prev, .carousel-next, .carousel-dot, .carousel-item');
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
    }

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

    if (mobileMenuBtn && navLinks) {
        const navAnchors = navLinks.querySelectorAll('a');
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
    setStaggerDelays('.cert-carousel', '.cert-card', 0.2);
    setStaggerDelays('.timeline', '.timeline-item', 0.25);
    setStaggerDelays('.roles-grid', '.role-card', 0.15);

    /* — CAROUSEL SCROLL FUNCTION — */
    window.scrollCarousel = function(carouselId, direction) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        const card = carousel.querySelector('.project-card') || carousel.querySelector('.cert-card');
        const step = (card ? card.offsetWidth : 300) + 24;
        const target = carousel.scrollLeft + (direction * step);
        
        try {
            carousel.scrollTo({ left: target, behavior: 'smooth' });
        } catch (err) {
            carousel.scrollLeft = target;
        }
    };

    /* — CERTIFICATES CAROUSEL — */
    const certCarousel = document.getElementById('cert-carousel');
    const certPrev = document.getElementById('certPrev');
    const certNext = document.getElementById('certNext');

    if (certCarousel && certPrev && certNext) {
        certNext.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollCarousel('cert-carousel', 1);
        });
        certPrev.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollCarousel('cert-carousel', -1);
        });
    }

    /* — 3D PROJECT CAROUSEL — */
    const carousel = document.getElementById('projectCarousel');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (carousel) {
      const items = Array.from(
        carousel.querySelectorAll('.carousel-item')
      );
      let currentIndex = 0;
      let autoPlayTimer = null;

      // Create dots
      items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });

      function updateCarousel() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        items.forEach((item, i) => {
          item.classList.remove(
            'active', 'prev', 'next', 
            'far-prev', 'far-next', 'hidden'
          );
          
          const diff = i - currentIndex;
          
          if (diff === 0) {
            item.classList.add('active');
          } else if (diff === -1 || 
            (currentIndex === 0 && i === items.length - 1)) {
            item.classList.add('prev');
          } else if (diff === 1 || 
            (currentIndex === items.length - 1 && i === 0)) {
            item.classList.add('next');
          } else if (diff === -2 || 
            diff === items.length - 2) {
            item.classList.add('far-prev');
          } else if (diff === 2 || 
            diff === -(items.length - 2)) {
            item.classList.add('far-next');
          } else {
            item.classList.add('hidden');
          }
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentIndex);
        });
      }

      function goToSlide(index) {
        currentIndex = (index + items.length) % items.length;
        updateCarousel();
        resetAutoPlay();
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function prevSlide() {
        goToSlide(currentIndex - 1);
      }

      function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 4000);
      }

      function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
      }

      // Button events
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);

      // Pause on hover
      carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
      });
      carousel.addEventListener('mouseleave', startAutoPlay);

      // Touch/swipe support for mobile
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoPlayTimer);
      }, { passive: true });

      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startAutoPlay();
      }, { passive: true });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });

      // Click on side cards to navigate
      items.forEach((item, i) => {
        item.addEventListener('click', () => {
          if (!item.classList.contains('active')) {
            goToSlide(i);
          }
        });
      });

      // Initialize
      updateCarousel();
      startAutoPlay();
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

    const closeModal = () => modal && modal.classList.remove('active');

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
