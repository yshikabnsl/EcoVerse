// EcoVerse - Vanilla HTML/CSS/JS

const MOCK_USER = { name: 'Tanya', points: 1240 };
const MOCK_PICKUPS = [
  { id: '1', date: '2025-03-22', time: '9:00 AM', type: 'Mixed (Organic + Recyclable)', address: '123 Green Street, Apt 4B', status: 'scheduled' },
  { id: '2', date: '2025-03-20', time: '12:00 PM', type: 'Organic', address: '456 Eco Lane, Unit 12', status: 'in-progress' },
  { id: '3', date: '2025-03-18', time: '9:00 AM', type: 'Recyclable', address: '78 Recycle Road, Block A', status: 'completed' },
  { id: '4', date: '2025-03-15', time: '3:00 PM', type: 'Mixed (Organic + Recyclable)', address: '123 Green Street, Apt 4B', status: 'completed' }
];
const MOCK_HISTORY = [
  { action: 'Waste classification (Organic)', points: 10, date: '2025-03-19' },
  { action: 'Waste classification (Recyclable)', points: 10, date: '2025-03-18' },
  { action: 'Scheduled pickup completed', points: 25, date: '2025-03-18' },
  { action: 'Waste classification (Organic)', points: 10, date: '2025-03-17' }
];
const MOCK_ROUTE_STOPS = [
  { id: 1, address: 'Depot — 10 Municipal Way', waste: 'Start', status: 'completed' },
  { id: 2, address: '123 Green Street', waste: 'Mixed', status: 'completed' },
  { id: 3, address: '45 Eco Lane', waste: 'Organic', status: 'in-progress' },
  { id: 4, address: '78 Recycle Road', waste: 'Recyclable', status: 'pending' },
  { id: 5, address: '22 Sustainability Ave', waste: 'Mixed', status: 'pending' },
  { id: 6, address: '91 Green Street', waste: 'Organic', status: 'pending' }
];
const REWARDS = [
  { name: 'Free compost bag', cost: 100, icon: '🌱' },
  { name: 'Reusable shopping bag', cost: 200, icon: '🛍️' },
  { name: 'Water bottle', cost: 500, icon: '🫙' },
  { name: 'Garden compost bin', cost: 1000, icon: '🗑️' },
  { name: 'Smart bin upgrade', cost: 2500, icon: '📦' }
];
const SAMPLE_IMAGE = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="%236b8e23" width="200" height="200"/><text x="100" y="95" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif">Organic</text><text x="100" y="115" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="11" font-family="sans-serif">Food scraps</text></svg>');
const TYPE_COLORS = { organic: '#6b8e23', recyclable: '#4a90a4', hazardous: '#c94c4c' };
const STATUS_COLORS = { scheduled: '#4a90a4', 'in-progress': '#8b7355', completed: '#2d5a3d' };
const TYPE_TIPS = {
  organic: 'Compost it or place in green bin. Decomposes naturally.',
  recyclable: 'Place in blue bin. Can be processed into new materials.',
  hazardous: 'Dispose at designated facility. Do not mix with regular waste.'
};

// State
let pickups = [...MOCK_PICKUPS];
let points = MOCK_USER.points;
let redeemed = [];
let recentClassifications = [
  { type: 'Organic', confidence: 94 },
  { type: 'Recyclable', confidence: 87 },
  { type: 'Organic', confidence: 91 }
];

// Routing
function getPage() {
  const hash = (location.hash || '#dashboard').slice(1);
  return hash || 'dashboard';
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  const link = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');
  if (pageId === 'pickup') renderPickups();
  if (pageId === 'rewards') renderRewards();
  if (pageId === 'routes') renderRoutes();
}

window.addEventListener('hashchange', () => showPage(getPage()));
window.addEventListener('load', () => {
  const page = getPage();
  if (!document.getElementById('page-' + page)) location.hash = 'dashboard';
  showPage(getPage());
});

// Waste Classifier
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const uploadArea = document.getElementById('upload-area');
const previewArea = document.getElementById('preview-area');
const previewImg = document.getElementById('preview-img');
const uploadNewBtn = document.getElementById('upload-new-btn');
const trySampleBtn = document.getElementById('try-sample-btn');
const loadingBar = document.getElementById('loading-bar');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultData = document.getElementById('result-data');
const typeBadge = document.getElementById('type-badge');
const confidenceEl = document.getElementById('confidence');
const tipEl = document.getElementById('tip');
const pointsEarnedEl = document.getElementById('points-earned');
const recentList = document.getElementById('recent-list');

function runClassification(img) {
  previewImg.src = img;
  uploadBtn.style.display = 'none';
  previewArea.style.display = 'block';
  resultPlaceholder.style.display = 'block';
  resultData.style.display = 'none';
  loadingBar.style.display = 'flex';

  setTimeout(() => {
    const types = ['organic', 'recyclable', 'hazardous'];
    const confidences = [87, 91, 94, 96, 89];
    const idx = Math.floor(Math.random() * types.length);
    const type = types[idx];
    const conf = confidences[Math.floor(Math.random() * confidences.length)];
    const typeLabel = type[0].toUpperCase() + type.slice(1);

    recentClassifications = [{ type: typeLabel, confidence: conf }, ...recentClassifications.slice(0, 4)];
    recentList.innerHTML = recentClassifications.map(r =>
      `<div class="recent-item"><span class="recent-type">${r.type}</span><span class="recent-conf">${r.confidence}%</span></div>`
    ).join('');

    resultPlaceholder.style.display = 'none';
    resultData.style.display = 'block';
    typeBadge.textContent = typeLabel;
    typeBadge.style.background = TYPE_COLORS[type];
    confidenceEl.textContent = `AI confidence: `;
    confidenceEl.innerHTML = `AI confidence: <strong>${conf}%</strong>`;
    tipEl.textContent = TYPE_TIPS[type];
    pointsEarnedEl.textContent = '+10 reward points earned ✓';
    loadingBar.style.display = 'none';
  }, 1200);
}

uploadBtn?.addEventListener('click', () => fileInput?.click());
uploadNewBtn?.addEventListener('click', () => fileInput?.click());
trySampleBtn?.addEventListener('click', () => runClassification(SAMPLE_IMAGE));
fileInput?.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => runClassification(reader.result);
  reader.readAsDataURL(file);
  e.target.value = '';
});

// Pickup Schedule
const showFormBtn = document.getElementById('show-form-btn');
const pickupForm = document.getElementById('pickup-form');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const pickupsList = document.getElementById('pickups-list');

showFormBtn?.addEventListener('click', () => {
  pickupForm.style.display = pickupForm.style.display === 'none' ? 'block' : 'none';
});
cancelFormBtn?.addEventListener('click', () => { pickupForm.style.display = 'none'; });
pickupForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('pickup-date').value;
  const time = document.getElementById('pickup-time').value;
  const type = document.getElementById('pickup-type').value;
  const address = document.getElementById('pickup-address').value;
  if (!date || !address) return;
  pickups = [{ id: Date.now().toString(), date, time, type, address, status: 'scheduled' }, ...pickups];
  pickupForm.reset();
  document.getElementById('pickup-time').value = '9:00 AM';
  pickupForm.style.display = 'none';
  renderPickups();
});

function renderPickups() {
  if (!pickupsList) return;
  pickupsList.innerHTML = pickups.map(p => `
    <div class="pickup-card">
      <div class="pickup-header">
        <span class="status-badge" style="background:${STATUS_COLORS[p.status]}">${p.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
        <span class="pickup-date">${p.date}</span>
      </div>
      <p class="pickup-type">${p.type}</p>
      <p class="pickup-address">📍 ${p.address}</p>
      <p class="pickup-time">🕐 ${p.time}</p>
    </div>
  `).join('');
}

// Rewards
const pointsValueEl = document.getElementById('points-value');
const toastEl = document.getElementById('toast');
const rewardsListEl = document.getElementById('rewards-list');
const historyListEl = document.getElementById('history-list');

function renderRewards() {
  if (!pointsValueEl) return;
  pointsValueEl.textContent = points.toLocaleString();
  if (rewardsListEl) {
    rewardsListEl.innerHTML = REWARDS.map(r => `
      <div class="reward-item">
        <span class="reward-icon">${r.icon}</span>
        <div class="reward-info">
          <strong>${r.name}</strong>
          <span class="reward-cost">${r.cost} pts</span>
        </div>
        <button type="button" class="btn-primary redeem-btn" data-name="${r.name}" data-cost="${r.cost}"
          ${points < r.cost || redeemed.includes(r.name) ? 'disabled' : ''}>
          ${redeemed.includes(r.name) ? 'Redeemed ✓' : 'Redeem'}
        </button>
      </div>
    `).join('');
    rewardsListEl.querySelectorAll('.redeem-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const cost = +btn.dataset.cost;
        if (points >= cost && !redeemed.includes(name)) {
          points -= cost;
          redeemed.push(name);
          pointsValueEl.textContent = points.toLocaleString();
          btn.textContent = 'Redeemed ✓';
          btn.disabled = true;
          toastEl.textContent = `Redeemed ${name}!`;
          toastEl.style.display = 'block';
          setTimeout(() => { toastEl.style.display = 'none'; }, 3000);
        }
      });
    });
  }
  if (historyListEl) {
    historyListEl.innerHTML = MOCK_HISTORY.map(h =>
      `<div class="history-item"><span class="history-points">+${h.points}</span><div><div>${h.action}</div><div class="history-date">${h.date}</div></div></div>`
    ).join('');
  }
}

// Routes
const routeDiagram = document.getElementById('route-diagram');
const stopsList = document.getElementById('stops-list');

function renderRoutes() {
  if (routeDiagram) {
    routeDiagram.innerHTML = MOCK_ROUTE_STOPS.map((s, i) => {
      const bg = s.status === 'completed' ? '#2d5a3d' : s.status === 'in-progress' ? '#8b7355' : '#ccc';
      const addr = (s.address.split('—')[0] || s.address).trim();
      const line = i < MOCK_ROUTE_STOPS.length - 1 ? '<div class="route-line"></div>' : '';
      return `<div class="route-node"><div class="route-col"><div class="route-dot" style="background:${bg}">${i + 1}</div>${line}</div><span class="route-label">${addr}</span></div>`;
    }).join('');
  }
  if (stopsList) {
    stopsList.innerHTML = MOCK_ROUTE_STOPS.map((s, i) => `
      <div class="stop-item">
        <span class="stop-number">${i + 1}</span>
        <div class="stop-info">
          <strong>${s.address}</strong>
          <span class="stop-type">${s.waste}</span>
        </div>
        <span class="stop-status" style="color:${s.status === 'completed' ? 'var(--color-leaf)' : 'var(--color-earth)'}">${s.status}</span>
      </div>
    `).join('');
  }
}

// Init
showPage(getPage());
