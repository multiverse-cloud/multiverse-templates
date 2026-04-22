// ===== Clock =====
function updateClock() {
  const now = new Date();
  const opts = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  document.getElementById('clock').textContent = now.toLocaleDateString('en-US', opts);
}
updateClock();
setInterval(updateClock, 30000);

// ===== Window Management =====
let topZ = 20;

function bringToFront(win) {
  topZ++;
  win.style.zIndex = topZ;
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');

  // Update menubar app name
  const title = win.querySelector('.window-title').textContent;
  const appName = title.split('—').pop().trim();
  document.querySelector('.menubar-app').textContent = appName;
}

// ===== Window Dragging =====
let dragState = null;

document.addEventListener('mousedown', (e) => {
  const titlebar = e.target.closest('.window-titlebar');
  if (!titlebar) return;

  const win = titlebar.closest('.window');
  if (!win) return;

  bringToFront(win);

  const rect = win.getBoundingClientRect();
  dragState = {
    win,
    offsetX: e.clientX - rect.left,
    offsetY: e.clientY - rect.top
  };

  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!dragState) return;

  const { win, offsetX, offsetY } = dragState;
  const x = e.clientX - offsetX;
  const y = Math.max(28, e.clientY - offsetY); // Don't go above menubar

  win.style.left = x + 'px';
  win.style.top = y + 'px';
  win.style.transition = 'none';
});

document.addEventListener('mouseup', () => {
  if (dragState) {
    dragState.win.style.transition = '';
    dragState = null;
  }
});

// ===== Traffic Light Buttons =====
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tl-btn');
  if (!btn) return;

  const action = btn.dataset.action;
  const winId = btn.dataset.window;
  const win = document.getElementById(winId);

  if (action === 'close') {
    win.style.display = 'none';
    win.classList.remove('active');
    updateDockDots();
  } else if (action === 'minimize') {
    win.classList.add('minimized');
    updateDockDots();
  } else if (action === 'maximize') {
    if (win.dataset.maximized === 'true') {
      // Restore
      win.style.left = win.dataset.x + 'px';
      win.style.top = win.dataset.y + 'px';
      win.style.width = win.dataset.origWidth || '';
      win.style.height = '';
      win.dataset.maximized = 'false';
    } else {
      // Maximize
      win.dataset.origWidth = win.style.width;
      win.dataset.x = parseInt(win.style.left) || 0;
      win.dataset.y = parseInt(win.style.top) || 0;
      win.style.left = '0px';
      win.style.top = '28px';
      win.style.width = '100vw';
      win.style.height = 'calc(100vh - 92px)';
      win.dataset.maximized = 'true';
    }
    bringToFront(win);
  }
});

// ===== Dock Clicks =====
document.querySelectorAll('.dock-item[data-target]').forEach(item => {
  item.addEventListener('click', () => {
    const winId = item.dataset.target;
    const win = document.getElementById(winId);

    if (win.style.display === 'none') {
      win.style.display = '';
      win.classList.remove('minimized');
      // Re-trigger animation
      win.style.animation = 'none';
      win.offsetHeight; // force reflow
      win.style.animation = '';
    } else if (win.classList.contains('minimized')) {
      win.classList.remove('minimized');
    } else if (win.classList.contains('active')) {
      win.classList.add('minimized');
    }

    bringToFront(win);
    updateDockDots();
  });
});

// ===== Sidebar Navigation =====
document.querySelectorAll('.sidebar-item[data-target]').forEach(item => {
  item.addEventListener('click', () => {
    const winId = item.dataset.target;
    const win = document.getElementById(winId);

    if (win.style.display === 'none') {
      win.style.display = '';
      win.classList.remove('minimized');
      win.style.animation = 'none';
      win.offsetHeight;
      win.style.animation = '';
    }

    bringToFront(win);
    updateDockDots();

    // Update sidebar active states
    document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
    document.querySelectorAll(`.sidebar-item[data-target="${winId}"]`).forEach(s => s.classList.add('active'));
  });
});

// ===== Click on Window to Focus =====
document.addEventListener('mousedown', (e) => {
  const win = e.target.closest('.window');
  if (win) bringToFront(win);
});

// ===== Update Dock Dots =====
function updateDockDots() {
  document.querySelectorAll('.dock-item[data-target]').forEach(item => {
    const winId = item.dataset.target;
    const win = document.getElementById(winId);
    const isVisible = win.style.display !== 'none' && !win.classList.contains('minimized');

    if (isVisible) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ===== Contact Form =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('.send-btn');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<span>Sent!</span>';
  btn.style.background = 'linear-gradient(135deg, #22c55e, #4ade80)';

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    e.target.reset();
  }, 2000);
});

// Initial dock state
updateDockDots();
