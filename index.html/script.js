// ── Partículas de polvo de hadas ──
const container = document.getElementById('particles');
const COUNT = 35;

for (let i = 0; i < COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left    = Math.random() * 100 + 'vw';
  p.style.setProperty('--dur',   (5 + Math.random() * 8) + 's');
  p.style.setProperty('--delay', (Math.random() * 8) + 's');
  // Variedad de tamaños
  const size = 3 + Math.random() * 6;
  p.style.width  = size + 'px';
  p.style.height = size + 'px';
  // Variedad de colores dorados
  const colors = ['#f5d97a', '#c9a84c', '#ffe8a3', '#e8c96a', '#fff0c0'];
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  container.appendChild(p);
}

// ── Cuenta regresiva ──
// ⚠️ Cambia esta fecha por la fecha real del evento
const EVENT_DATE = new Date('2025-07-12T19:00:00');

function updateCountdown() {
  const now  = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-family:\'Cormorant Garamond\',serif; font-style:italic; color:#f5d97a; font-size:1.5rem;">✨ ¡Hoy es el gran día! ✨</p>';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── Animación de entrada al hacer scroll ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.invite__card, .countdown-section, .rsvp').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(el);
});