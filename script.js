// ══════════════════════════════════════
// Partículas de polvo de hadas
// ══════════════════════════════════════
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 45;
const GOLD_COLORS = ['#f7e099','#c9a84c','#ffe8b0','#e8c96a','#fff5d0','#f0d060'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = 3 + Math.random() * 7;
  p.style.cssText = `
    left: ${Math.random() * 100}vw;
    width: ${size}px;
    height: ${size}px;
    background: ${GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]};
    --dur: ${5 + Math.random() * 9}s;
    --delay: ${Math.random() * 10}s;
  `;
  particleContainer.appendChild(p);
}

// ══════════════════════════════════════
// Estrellas en el hero
// ══════════════════════════════════════
const starsContainer = document.getElementById('stars');
const STAR_COUNT = 80;

for (let i = 0; i < STAR_COUNT; i++) {
  const s = document.createElement('div');
  s.classList.add('star');
  const size = 1 + Math.random() * 3;
  s.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size}px;
    --tw: ${2 + Math.random() * 4}s;
    --td: ${Math.random() * 5}s;
  `;
  starsContainer.appendChild(s);
}

// ══════════════════════════════════════
// Cuenta regresiva
// ══════════════════════════════════════
// ⚠️ Cambia esta fecha por la fecha real del evento
const EVENT_DATE = new Date('2025-07-12T19:00:00');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = EVENT_DATE - new Date();
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      `<p style="font-family:'Cormorant Garamond',serif;font-style:italic;color:#f7e099;font-size:1.6rem;letter-spacing:.1em;">
        ✨ ¡Esta noche es el gran cuento de hadas! ✨
      </p>`;
    return;
  }
  document.getElementById('days').textContent    = pad(Math.floor(diff / 86400000));
  document.getElementById('hours').textContent   = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000) / 60000));
  document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000) / 1000));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ══════════════════════════════════════
// Scroll reveal con retraso escalonado
// ══════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Hijos con retraso escalonado
const childObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-child');
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
      childObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-child').forEach(el => childObserver.observe(el));