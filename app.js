(function () {
  var html = document.documentElement;

  // ============ THEME ============
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  var saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  themeIcon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  themeToggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  });

  // ============ CLOCK ============
  var clockEl = document.getElementById('clock');
  function updateClock() {
    var d = new Date();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var h = d.getHours(), m = d.getMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = h % 12 || 12;
    var pad = function (n) { return n < 10 ? '0' + n : n; };
    clockEl.textContent = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + h12 + ':' + pad(m) + ' ' + ampm;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // ============ WINDOW MANAGER ============
  var desktop = document.getElementById('desktopArea');
  var menubarAppName = document.querySelector('.menubar .app-name');
  var windows = Array.prototype.slice.call(document.querySelectorAll('.window[data-app]'));
  var dockItems = document.querySelectorAll('.dock-item[data-app]');

  var zCounter = 100;
  var openOrder = 0;
  var state = {}; // { about: {initialized, x, y, w, h, prev} }

  var titleMap = {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    packages: 'Packages',
    publications: 'Publications',
    blog: 'Blog',
    lectures: 'Lectures',
    growth: 'Growth',
    contact: 'Contact'
  };

  function getArea() {
    return { w: desktop.clientWidth, h: desktop.clientHeight };
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function initWindow(win, idx) {
    var id = win.getAttribute('data-app');
    var w = parseInt(win.getAttribute('data-w'), 10) || 720;
    var h = parseInt(win.getAttribute('data-h'), 10) || 540;
    var area = getArea();

    w = Math.min(w, area.w - 40);
    h = Math.min(h, area.h - 120);

    // cascade: center + small offset
    var baseX = Math.max(20, (area.w - w) / 2 - 120);
    var baseY = Math.max(20, (area.h - h) / 2 - 60);
    var x = baseX + (idx % 6) * 32;
    var y = baseY + (idx % 6) * 26;

    win.style.width = w + 'px';
    win.style.height = h + 'px';
    win.style.left = x + 'px';
    win.style.top = y + 'px';

    state[id] = { initialized: true, maximized: false, prev: null };
  }

  function focusWindow(win) {
    windows.forEach(function (w) { w.classList.remove('focused'); });
    win.classList.add('focused');
    zCounter += 1;
    win.style.zIndex = zCounter;
    var id = win.getAttribute('data-app');
    if (menubarAppName && titleMap[id]) menubarAppName.textContent = titleMap[id];
    updateDockActive();
  }

  function isOpen(win) {
    return win.classList.contains('open');
  }

  function openApp(id) {
    var win = document.querySelector('.window[data-app="' + id + '"]');
    if (!win) return;
    if (!state[id] || !state[id].initialized) {
      initWindow(win, openOrder++);
    }
    if (!isOpen(win)) {
      win.classList.add('open');
    }
    focusWindow(win);
  }

  function closeApp(win) {
    win.classList.remove('open');
    win.classList.remove('focused');
    var id = win.getAttribute('data-app');
    if (state[id]) state[id].initialized = false; // reset cascade next open
    updateDockActive();
    // focus another if exists
    var remaining = windows.filter(function (w) { return isOpen(w); });
    if (remaining.length) {
      focusWindow(remaining[remaining.length - 1]);
    } else if (menubarAppName) {
      menubarAppName.textContent = 'Resume';
    }
  }

  function minimizeApp(win) {
    win.classList.add('minimizing');
    setTimeout(function () {
      win.classList.remove('open');
      win.classList.remove('minimizing');
      win.classList.remove('focused');
      updateDockActive();
    }, 320);
  }

  function maximizeApp(win) {
    var id = win.getAttribute('data-app');
    var st = state[id];
    if (!st) return;
    if (st.maximized) {
      // restore
      win.style.left = st.prev.left;
      win.style.top = st.prev.top;
      win.style.width = st.prev.width;
      win.style.height = st.prev.height;
      st.maximized = false;
    } else {
      st.prev = {
        left: win.style.left, top: win.style.top,
        width: win.style.width, height: win.style.height
      };
      win.style.left = '8px';
      win.style.top = '8px';
      win.style.width = 'calc(100% - 16px)';
      win.style.height = 'calc(100% - 16px)';
      st.maximized = true;
    }
  }

  function updateDockActive() {
    dockItems.forEach(function (el) {
      var id = el.getAttribute('data-app');
      var win = document.querySelector('.window[data-app="' + id + '"]');
      el.classList.toggle('active', !!(win && isOpen(win)));
    });
  }

  // ============ WIRE UP WINDOWS ============
  windows.forEach(function (win) {
    // focus on mousedown
    win.addEventListener('mousedown', function () { focusWindow(win); });

    // traffic lights
    var closeBtn = win.querySelector('.light.close');
    var minBtn = win.querySelector('.light.minimize');
    var maxBtn = win.querySelector('.light.maximize');
    if (closeBtn) closeBtn.addEventListener('click', function (e) {
      e.stopPropagation(); closeApp(win);
    });
    if (minBtn) minBtn.addEventListener('click', function (e) {
      e.stopPropagation(); minimizeApp(win);
    });
    if (maxBtn) maxBtn.addEventListener('click', function (e) {
      e.stopPropagation(); maximizeApp(win);
    });

    // drag by titlebar
    var titlebar = win.querySelector('.titlebar');
    var dragging = false;
    var startX = 0, startY = 0, baseLeft = 0, baseTop = 0;

    titlebar.addEventListener('mousedown', function (e) {
      if (e.target.closest('.traffic-lights')) return;
      dragging = true;
      focusWindow(win);
      startX = e.clientX;
      startY = e.clientY;
      baseLeft = win.offsetLeft;
      baseTop = win.offsetTop;
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var area = getArea();
      var nx = clamp(baseLeft + (e.clientX - startX), -win.offsetWidth + 80, area.w - 80);
      var ny = clamp(baseTop + (e.clientY - startY), 0, area.h - 40);
      win.style.left = nx + 'px';
      win.style.top = ny + 'px';
    });
    document.addEventListener('mouseup', function () {
      if (dragging) { dragging = false; document.body.style.userSelect = ''; }
    });

    titlebar.addEventListener('dblclick', function (e) {
      if (e.target.closest('.traffic-lights')) return;
      maximizeApp(win);
    });
  });

  // ============ DOCK ============
  dockItems.forEach(function (el) {
    el.addEventListener('click', function () {
      var id = el.getAttribute('data-app');
      if (!id) return;
      var win = document.querySelector('.window[data-app="' + id + '"]');
      if (!win) return;
      if (isOpen(win) && win.classList.contains('focused')) {
        minimizeApp(win);
      } else {
        openApp(id);
      }
    });
  });

  // ============ BOOT ============
  // Open About by default
  openApp('about');
})();
