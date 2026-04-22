// ===== Clock in status bar =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('statusClock').textContent = `${h}:${m}:${s}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== Floating bugs =====
const bugsContainer = document.getElementById('floatingBugs');
const bugEmojis = ['🐛', '🪲', '🐞', '🦗'];

for (let i = 0; i < 15; i++) {
  const bug = document.createElement('div');
  bug.className = 'fbug';
  bug.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];
  bug.style.left = Math.random() * 100 + '%';
  bug.style.fontSize = (12 + Math.random() * 16) + 'px';
  bug.style.animationDuration = (15 + Math.random() * 25) + 's';
  bug.style.animationDelay = -(Math.random() * 30) + 's';
  bugsContainer.appendChild(bug);
}

// ===== Typewriter for hero role =====
const roles = [
  'QA Engineer',
  'Bug Hunter',
  'Test Automation Architect',
  'Quality Guardian',
  'Chaos Engineer'
];

const typer = document.getElementById('heroTyper');
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
let pauseTimer = 0;

function typeRole() {
  const current = roles[roleIdx];

  if (!deleting) {
    typer.textContent = current.slice(0, charIdx + 1);
    charIdx++;

    if (charIdx >= current.length) {
      pauseTimer = 40;
      deleting = true;
    }
  } else {
    if (pauseTimer > 0) {
      pauseTimer--;
    } else {
      charIdx--;
      typer.textContent = current.slice(0, charIdx);

      if (charIdx <= 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
  }

  const speed = deleting && pauseTimer <= 0 ? 40 : 80;
  setTimeout(typeRole, speed);
}

typeRole();

// ===== Counter animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.hstat-val[data-target]');

  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ===== Bug squash counter =====
let squashCount = 0;
const squashEl = document.querySelector('#bugCounter .counter');

function incrementSquash() {
  squashCount++;
  squashEl.textContent = squashCount;
}

// ===== Scroll reveal =====
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 0.1}s`;
        entry.target.classList.add('visible');
        incrementSquash();
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(el => revealObserver.observe(el));

// ===== Coverage bar animation =====
const covFills = document.querySelectorAll('.cov-fill');

const covObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.setProperty('--target-width', width + '%');
        fill.classList.add('animate');
        covObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.5 }
);

covFills.forEach(el => covObserver.observe(el));

// ===== Start hero counters when visible =====
const heroStats = document.querySelector('.hero-stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  },
  { threshold: 0.5 }
);

if (heroStats) {
  statsObserver.observe(heroStats);
}

// ===== Terminal scan animation =====
const scanLines = document.querySelectorAll('#scanOutput .tc-line');

scanLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateX(-10px)';
  line.style.transition = 'opacity 0.3s, transform 0.3s';

  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateX(0)';
  }, 300 + i * 200);
});

// ===== Contact form =====
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit span');
  btn.textContent = '✓ Report Filed!';

  setTimeout(() => {
    btn.textContent = 'Submit Report';
    form.reset();
  }, 3000);
});

// ===== Nav active state =====
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('data-section') === current) {
      link.style.color = 'var(--text)';
      link.style.background = 'rgba(255,255,255,0.04)';
    }
  });
});
