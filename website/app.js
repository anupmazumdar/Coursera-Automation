/**
 * COURSERA AUTOMATION EXTENSION - LANDING PAGE INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initCurrencyToggle();
  initFaqAccordion();
  initSimulator();
  initBuyModal();
  initLiveToast();
  initMobileMenu();
});

// ================= 1. CURRENCY SWITCHER =================
function initCurrencyToggle() {
  const currencyBtns = document.querySelectorAll('.currency-btn');
  const priceVals = document.querySelectorAll('.price-val');
  const currencySymbols = document.querySelectorAll('.currency-symbol');

  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const currency = btn.dataset.currency;
      const symbol = currency === 'INR' ? '₹' : '$';

      currencySymbols.forEach(s => { s.textContent = symbol; });

      priceVals.forEach(el => {
        const val = currency === 'INR' ? el.dataset.inr : el.dataset.usd;
        el.textContent = val;
      });
    });
  });
}

// ================= 2. FAQ ACCORDION =================
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ================= 3. INTERACTIVE SIMULATOR =================
function initSimulator() {
  const simTriggerBtn = document.getElementById('simTriggerBtn');
  const simCurrentTask = document.getElementById('simCurrentTask');
  const simSubText = document.getElementById('simSubText');
  const simStatusPill = document.getElementById('simStatusPill');
  const simOverallProgress = document.getElementById('simOverallProgress');

  let isSimulating = false;

  function runSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    simTriggerBtn.disabled = true;
    simTriggerBtn.innerHTML = '<span>⚡ Running AI Solver Simulation...</span>';

    const steps = [
      { text: 'Analyzing Question 1/5: Linear cost functions...', status: 'Solving 1/5', pill: 'blue', prog: '75%' },
      { text: 'Analyzing Question 2/5: Gradient descent alpha steps...', status: 'Solving 2/5', pill: 'blue', prog: '80%' },
      { text: 'Analyzing Question 3/5: Vectorization in NumPy...', status: 'Solving 3/5', pill: 'blue', prog: '88%' },
      { text: 'Analyzing Question 4/5: Feature scaling techniques...', status: 'Solving 4/5', pill: 'blue', prog: '94%' },
      { text: 'Analyzing Question 5/5: Learning curves & bias...', status: 'Solving 5/5', pill: 'blue', prog: '98%' },
      { text: '✨ Quiz Passed with 100% Grade! Auto-Advancing to next week.', status: '100% Passed ✅', pill: 'green', prog: '100%' }
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        simSubText.textContent = steps[i].text;
        simStatusPill.textContent = steps[i].status;
        simStatusPill.className = `sim-pill ${steps[i].pill}`;
        simOverallProgress.textContent = steps[i].prog;
        i++;
      } else {
        clearInterval(interval);
        isSimulating = false;
        simTriggerBtn.disabled = false;
        simTriggerBtn.innerHTML = '<span>🔄 Replay Simulation</span>';
      }
    }, 900);
  }

  simTriggerBtn?.addEventListener('click', runSimulation);
}

// ================= 4. BUY / REQUEST MODAL =================
function initBuyModal() {
  const buyModal = document.getElementById('buyModal');
  const closeBtn = document.getElementById('closeBuyModal');
  const openBtns = document.querySelectorAll('.open-buy-modal');
  const modalPlanName = document.getElementById('modalPlanName');
  const modalPlanPrice = document.getElementById('modalPlanPrice');
  const modalTelegramBtn = document.getElementById('modalTelegramBtn');
  const userDeviceId = document.getElementById('userDeviceId');

  let currentTier = 'PRO_MAX';
  let currentPrice = '$9.99';

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tier = btn.dataset.tier;
      const activeCurrencyBtn = document.querySelector('.currency-btn.active');
      const isINR = activeCurrencyBtn?.dataset.currency === 'INR';
      
      const price = isINR 
        ? `₹${btn.dataset.priceInr}` 
        : `$${btn.dataset.priceUsd}`;

      currentTier = tier;
      currentPrice = price;

      modalPlanName.textContent = tier === 'ULTIMATE_VIP' ? 'ULTIMATE VIP (Lifetime)' : 'PRO MAX (30 Days)';
      modalPlanPrice.textContent = price;

      updateTelegramLink();
      buyModal.classList.remove('hidden');
    });
  });

  function updateTelegramLink() {
    const devId = userDeviceId.value.trim() || '[My Device ID]';
    const message = encodeURIComponent(`Hello! I would like to request an activation key for Coursera Automation Extension.\n\nPlan: ${currentTier} (${currentPrice})\nMy Device ID: ${devId}`);
    modalTelegramBtn.href = `https://t.me/automation_coursera?text=${message}`;
  }

  userDeviceId?.addEventListener('input', updateTelegramLink);

  closeBtn?.addEventListener('click', () => {
    buyModal.classList.add('hidden');
  });

  buyModal?.addEventListener('click', (e) => {
    if (e.target === buyModal) {
      buyModal.classList.add('hidden');
    }
  });
}

// ================= 5. LIVE SOCIAL PROOF NOTIFICATIONS =================
function initLiveToast() {
  const liveToast = document.getElementById('liveToast');
  const toastBuyer = document.getElementById('toastBuyer');
  const toastFlag = document.getElementById('toastFlag');
  const toastProduct = document.getElementById('toastProduct');
  const toastTime = document.getElementById('toastTime');

  const buyers = [
    { name: 'Janak', flag: '🇮🇳', plan: 'PRO MAX Plan', time: 'Just now' },
    { name: 'Marcus Brooks', flag: '🇺🇸', plan: 'ULTIMATE VIP Key', time: '2 mins ago' },
    { name: 'Arijeet Das', flag: '🇮🇳', plan: 'PRO MAX Plan', time: '5 mins ago' },
    { name: 'Ephren Taylor', flag: '🇬🇧', plan: 'PRO MAX Key', time: '8 mins ago' },
    { name: 'Vedant K.', flag: '🇮🇳', plan: 'ULTIMATE VIP Lifetime', time: '11 mins ago' },
    { name: 'Camila Rodriguez', flag: '🇨🇦', plan: 'PRO MAX Plan', time: '15 mins ago' },
    { name: 'Farhan Saleem', flag: '🇦🇪', plan: 'PRO MAX Key', time: '19 mins ago' }
  ];

  let currentIndex = 0;

  function showNextToast() {
    const b = buyers[currentIndex];
    toastBuyer.textContent = b.name;
    toastFlag.textContent = b.flag;
    toastProduct.textContent = b.plan;
    toastTime.textContent = b.time;

    liveToast.classList.add('show');

    setTimeout(() => {
      liveToast.classList.remove('show');
    }, 4500);

    currentIndex = (currentIndex + 1) % buyers.length;
  }

  // Initial show after 3 seconds
  setTimeout(() => {
    showNextToast();
    // Repeat every 14 seconds
    setInterval(showNextToast, 14000);
  }, 3000);
}

// ================= 6. MOBILE MENU =================
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileBtn?.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('show');
    });
  });
}
