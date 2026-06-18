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
const STAR_COUNT = 150;

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
const EVENT_DATE = new Date('2026-07-04T19:00:00');

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

//AUDIO

const audio = document.getElementById("miAudio");
const btn = document.getElementById("btn-play");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    btn.textContent = "⏸";
  } else {
    audio.pause();
    btn.textContent = "▶";
  }
}

function reiniciar() {
  audio.currentTime = 0;
  audio.play();
  btn.textContent = "⏸";
}

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

// ══ CORTINA DE ENTRADA ══
function abrirCortina() {
  const cortina = document.getElementById('cortina');
  cortina.classList.add('abierta');

  // Intenta reproducir el audio al entrar
  const audio = document.getElementById('miAudio');
  if (audio) audio.play().catch(() => {});

  setTimeout(() => {
    cortina.classList.add('oculta');
  }, 1500);
}

// ══ LLUVIA DE SOBRES ══
function crearLluviaSobres() {
  const contenedor = document.getElementById('sobres-container');
  if (!contenedor) return;

  const emojis = ['💌', '✉️', '💛', '⭐'];
  const colores = ['#f7e099', '#c9a84c', '#ffe8b0', '#fff5d0', '#e8c96a'];

  // Sobres
  for (let i = 0; i < 18; i++) {
    const sobre = document.createElement('div');
    sobre.classList.add('sobre-item');
    sobre.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sobre.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${3 + Math.random() * 4}s;
      --delay: ${Math.random() * 6}s;
      font-size: ${1.2 + Math.random() * 1.4}rem;
    `;
    contenedor.appendChild(sobre);
  }

  // Partículas doradas
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particula-sobre');
    const size = 3 + Math.random() * 6;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --size: ${size}px;
      --color: ${colores[Math.floor(Math.random() * colores.length)]};
      --dur: ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 7}s;
    `;
    contenedor.appendChild(p);
  }
}

crearLluviaSobres();

// ══ LIBRO DE FIRMAS ══
const SUPABASE_URL = 'https://jndixndjzsnawaysogyf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGl4bmRqenNuYXdheXNvZ3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NDA3OTIsImV4cCI6MjA5NzMxNjc5Mn0.2RBSXcXVHUmdg0Wr1tSxqQi_ctURfGgjE9hEMPUGWgY';

async function cargarFirmas() {
  const lista = document.getElementById('firmas-lista');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/firmas?order=created_at.desc`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await res.json();
    if (!data.length) {
      lista.innerHTML = '<p class="firmas__cargando">Sé el primero en dejar un mensaje 💌</p>';
      return;
    }
  lista.innerHTML = data.map(f => `
    <div class="firma__card">
      <p class="firma__nombre">${f.nombre}</p>
      <p class="firma__mensaje">"${f.mensaje}"</p>
      <p class="firma__fecha">${new Date(f.created_at).toLocaleDateString('es-CO', { day:'numeric', month:'long', year:'numeric' })}</p>
      ${adminActivo ? `<button class="firma__borrar" onclick="borrarFirma(${f.id})">🗑️ Borrar</button>` : ''}
   </div>
  `).join('');
  } catch {
    lista.innerHTML = '<p class="firmas__cargando">No se pudieron cargar los mensajes.</p>';
  }
}

async function enviarFirma() {
  const nombre = document.getElementById('firma-nombre').value.trim();
  const mensaje = document.getElementById('firma-mensaje').value.trim();
  const status = document.getElementById('firma-status');

  if (!nombre || !mensaje) {
    status.textContent = 'Por favor escribe tu nombre y mensaje.';
    return;
  }

  status.textContent = 'Enviando…';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/firmas`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ nombre, mensaje })
    });

    if (res.ok) {
      status.textContent = '✨ ¡Mensaje enviado con amor!';
      document.getElementById('firma-nombre').value = '';
      document.getElementById('firma-mensaje').value = '';
      cargarFirmas();
    } else {
      status.textContent = 'Algo salió mal, intenta de nuevo.';
    }
  } catch {
    status.textContent = 'Error de conexión, intenta de nuevo.';
  }
}

cargarFirmas();

// ══ ADMIN ══
let adminActivo = false;
const ADMIN_PASSWORD = 'maria2026'; // Cambia esto por tu contraseña

function activarAdmin() {
  const clave = prompt('Contraseña de administrador:');
  if (clave === ADMIN_PASSWORD) {
    adminActivo = true;
    cargarFirmas();
    alert('✅ Modo administrador activado');
  } else {
    alert('Contraseña incorrecta');
  }
}

async function borrarFirma(id) {
  if (!confirm('¿Segura que quieres borrar este mensaje?')) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/firmas?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    if (res.ok) cargarFirmas();
  } catch {
    alert('Error al borrar el mensaje.');
  }
}