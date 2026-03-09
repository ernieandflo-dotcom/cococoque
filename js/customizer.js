/**
 * customizer.js — Coco Case
 * All interactive behaviour:
 *  - Custom cursor
 *  - Phone model selector
 *  - 3-D preview drag-to-rotate / zoom / view toggle
 *  - Design upload & image adjustments
 *  - Text overlay
 *  - Gradient / filter presets (built from data.js)
 *  - Order summary
 *  - Scroll reveal
 *  - Toast notifications
 */

/* ─────────────────────────────────────────
   CURSOR
───────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function loop() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();


/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}


/* ─────────────────────────────────────────
   BUILD DYNAMIC HTML FROM data.js
───────────────────────────────────────── */
(function buildDynamicUI() {

  /* ── Gradient presets ── */
  const gradientWrap = document.getElementById('gradientPresets');
  if (gradientWrap) {
    GRADIENT_PRESETS.forEach((g, i) => {
      const el = document.createElement('div');
      el.className = 'gradient-preset' + (i === 0 ? ' active' : '');
      el.style.background = g.value;
      el.title = g.label;
      el.addEventListener('click', () => applyGradient(el, g.value));
      gradientWrap.appendChild(el);
    });
  }

  /* ── Text colour swatches ── */
  const swatchWrap = document.getElementById('textColorSwatches');
  if (swatchWrap) {
    TEXT_COLORS.forEach((c, i) => {
      const el = document.createElement('div');
      el.className = 'color-swatch' + (i === 0 ? ' active' : '');
      el.style.background = c;
      if (c === '#000000') el.style.border = '1px solid #333';
      el.addEventListener('click', () => setTextColor(el, c));
      swatchWrap.appendChild(el);
    });
  }

  /* ── Filter chips ── */
  const filterWrap = document.getElementById('filterChips');
  if (filterWrap) {
    FILTERS.forEach((f, i) => {
      const el = document.createElement('div');
      el.className = 'filter-chip' + (i === 0 ? ' active' : '');
      el.textContent = f.label;
      el.addEventListener('click', () => applyFilter(el, f.value));
      filterWrap.appendChild(el);
    });
  }
})();


/* ─────────────────────────────────────────
   MODEL SELECTOR
───────────────────────────────────────── */
let currentBrand   = 'apple';
let selectedModel  = null;

function renderModels(brand, filter = '') {
  const list  = document.getElementById('modelList');
  const items = PHONE_MODELS[brand].filter(
    m => m.name.toLowerCase().includes(filter.toLowerCase())
  );

  list.innerHTML = items.map((m, i) => `
    <div class="model-item ${i === 0 && !selectedModel ? 'active' : ''}"
         data-name="${m.name}" data-price="${m.price}">
      <span class="model-name">${m.name}</span>
      <span class="model-price">${m.price}</span>
    </div>
  `).join('');

  list.querySelectorAll('.model-item').forEach(el => {
    el.addEventListener('click', () => selectModel(el));
  });

  if (items.length > 0 && !selectedModel) {
    selectedModel = items[0].name;
    document.getElementById('selectedModelName').textContent = items[0].name;
  }
}

function selectBrand(btn, brand) {
  document.querySelectorAll('.brand-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentBrand  = brand;
  selectedModel = null;
  document.getElementById('modelSearch').value = '';
  renderModels(brand);
}

function filterModels(val) {
  renderModels(currentBrand, val);
}

function selectModel(el) {
  document.querySelectorAll('.model-item').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  selectedModel = el.dataset.name;
  document.getElementById('selectedModelName').textContent = selectedModel;
  showToast('📱 ' + selectedModel + ' sélectionné');
}


/* ─────────────────────────────────────────
   ORDER / CART
───────────────────────────────────────── */
function addToCart() {
  if (!selectedModel) {
    showToast("⚠️ Sélectionne d'abord un modèle");
    return;
  }
  showToast('🛒 Ajouté au panier — ' + selectedModel);
}


/* ─────────────────────────────────────────
   IMAGE UPLOAD & ADJUSTMENTS
───────────────────────────────────────── */
let currentFilter = 'none';
let brightness    = 100;
let saturation    = 100;

function handleUpload(input) {
  const file = input.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const img = document.getElementById('designImg');
  img.src = url;
  img.style.opacity = '1';

  document.getElementById('designPlaceholder').style.display = 'none';

  const thumb = document.getElementById('designThumb');
  document.getElementById('thumbImg').src = url;
  thumb.style.display = 'block';

  document.getElementById('designArea').style.background = 'none';
  updateImageStyle();
  showToast('🎨 Design appliqué !');
}

function applyGradient(el, gradient) {
  document.querySelectorAll('.gradient-preset').forEach(g => g.classList.remove('active'));
  el.classList.add('active');
  const img = document.getElementById('designImg');
  if (img.style.opacity !== '1') {
    document.getElementById('designArea').style.background = gradient;
  }
  showToast('✨ Couleur appliquée');
}

function updateImageStyle() {
  const img = document.getElementById('designImg');
  let fs = currentFilter === 'none' ? '' : currentFilter + ' ';
  fs += `brightness(${brightness / 100}) saturate(${saturation / 100})`;
  img.style.filter = fs.trim();
}

function adjustImage() {
  brightness = document.getElementById('brightnessSlider').value;
  saturation = document.getElementById('saturationSlider').value;
  document.getElementById('brightnessVal').textContent = brightness + '%';
  document.getElementById('saturationVal').textContent = saturation + '%';
  updateImageStyle();
}

function applyFilter(el, filter) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentFilter = filter;
  updateImageStyle();
}


/* ─────────────────────────────────────────
   TEXT OVERLAY
───────────────────────────────────────── */
let textColor = '#FFFFFF';

function updateText(val) {
  const overlay = document.getElementById('textOverlay');
  overlay.textContent = val;
  overlay.style.opacity    = val ? '1' : '0';
  overlay.style.fontFamily = document.getElementById('fontStyle').value;
  overlay.style.color      = textColor;
}

function updateTextStyle() {
  document.getElementById('textOverlay').style.fontFamily =
    document.getElementById('fontStyle').value;
}

function setTextColor(el, color) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  textColor = color;
  document.getElementById('textOverlay').style.color = color;
}


/* ─────────────────────────────────────────
   3-D PREVIEW — VIEW / ZOOM / DRAG
───────────────────────────────────────── */
let currentZoom = 1;

function setView(btn, view) {
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const phone = document.getElementById('phone3d');
  if (view === 'back') {
    phone.style.animation = 'none';
    phone.style.transform = 'rotateY(-15deg) rotateX(5deg)';
  } else if (view === 'front') {
    phone.style.animation = 'none';
    phone.style.transform = 'rotateY(165deg) rotateX(5deg)';
  } else {
    phone.style.animation = 'phone3dIdle 6s ease-in-out infinite';
  }
}

function zoomIn() {
  currentZoom = Math.min(currentZoom + 0.15, 2);
  _applyZoom();
}

function zoomOut() {
  currentZoom = Math.max(currentZoom - 0.15, 0.5);
  _applyZoom();
}

function _applyZoom() {
  document.getElementById('phone3dContainer').style.transform = `scale(${currentZoom})`;
  document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}

function resetView() {
  currentZoom = 1;
  _applyZoom();
  const phone = document.getElementById('phone3d');
  phone.style.animation = 'phone3dIdle 6s ease-in-out infinite';
  showToast('🔄 Vue réinitialisée');
}

function setTool(btn) {
  document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* Drag-to-rotate */
(function initDrag() {
  const canvas = document.getElementById('previewCanvas');
  const phone  = document.getElementById('phone3d');
  let dragging = false, sx = 0, sy = 0, rotY = -15, rotX = 5;

  canvas.addEventListener('mousedown', e => {
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    phone.style.animation  = 'none';
    phone.style.transition = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    rotY += dx * 0.4;
    rotX  = Math.max(-30, Math.min(30, rotX - dy * 0.2));
    phone.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    sx = e.clientX; sy = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    phone.style.transition = '';
  });

  /* Touch support */
  canvas.addEventListener('touchstart', e => {
    dragging = true;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
    phone.style.animation  = 'none';
    phone.style.transition = 'none';
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - sx;
    const dy = e.touches[0].clientY - sy;
    rotY += dx * 0.4;
    rotX  = Math.max(-30, Math.min(30, rotX - dy * 0.2));
    phone.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    dragging = false;
    phone.style.transition = '';
  });
})();


/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
renderModels('apple');
