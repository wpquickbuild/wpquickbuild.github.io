/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}, { passive: true });

/* ===== MOBILE NAV TOGGLE ===== */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentSection = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.closest('.services-grid, .projects-grid, .stats-grid, .testi-grid, .pricing-grid');
      if (siblings) {
        const cards = siblings.querySelectorAll('.reveal');
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, idx * 80);
        });
      } else {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60);
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('.stat-num[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  });
});

/* ===== FLOATING WHATSAPP SHOW/HIDE ===== */
const waFloat = document.getElementById('waFloat');

setTimeout(() => {
  waFloat.style.opacity = '1';
  waFloat.style.transform = 'scale(1)';
}, 2500);

waFloat.style.opacity = '0';
waFloat.style.transform = 'scale(0.7)';
waFloat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

/* ===== MARQUEE PAUSE ON HOVER ===== */
const marqueeInner = document.getElementById('marqueeInner');
if (marqueeInner) {
  const strip = marqueeInner.closest('.marquee-strip');
  if (strip) {
    strip.addEventListener('mouseenter', () => {
      marqueeInner.style.animationPlayState = 'paused';
    });
    strip.addEventListener('mouseleave', () => {
      marqueeInner.style.animationPlayState = 'running';
    });
  }
}

/* ===== INIT ===== */
updateActiveNavLink();
