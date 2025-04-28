// script.js — базовая логика космоса и магазина

// Плавная прокрутка к основной части (если понадобится позже)
function scrollToMain() {
  document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
}

// Обработка выбора подписки
let selectedPlan = null;
const planElements = document.querySelectorAll('.plan');

planElements.forEach(plan => {
  plan.addEventListener('click', () => {
    selectedPlan = plan.dataset.plan;
    planElements.forEach(p => p.classList.remove('selected'));
    plan.classList.add('selected');
  });
});

// Обработка оплаты
document.getElementById('payBtn').addEventListener('click', () => {
  const duration = document.getElementById('duration').value;
  const groupId = document.getElementById('groupId').value.trim();

  if (!selectedPlan || !duration || !groupId) {
    alert('⚠️ Пожалуйста, выберите подписку и заполните все поля!');
    return;
  }

  const orderData = {
    subscription: selectedPlan,
    duration: duration,
    groupId: groupId
  };

  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(orderData));
  } else {
    alert('Telegram WebApp не инициализирован!');
  }
});

// Валидация ID группы
const groupIdInput = document.getElementById('groupId');
const groupPreview = document.getElementById('groupPreview');

groupIdInput.addEventListener('input', () => {
  const id = groupIdInput.value.trim();
  if (/^\d+$/.test(id) && id.length >= 6) {
    groupIdInput.style.border = '2px solid #22c55e'; // Зелёная рамка
    groupPreview.textContent = `ID группы: ${id}`;
  } else {
    groupIdInput.style.border = '2px solid #ef4444'; // Красная рамка
    groupPreview.textContent = '';
  }
});


// 🚀 Инициализация фона частиц (разноцветные звезды)
particlesJS('particles-js', {
  particles: {
    number: {
      value: 120,
      density: { enable: true, value_area: 800 }
    },
    color: {
      value: ["#a5f3fc", "#c084fc", "#f472b6", "#facc15"]
    },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" }
    },
    opacity: { value: 0.6, random: true },
    size: { value: 2.5, random: true },
    move: {
      enable: true,
      speed: 0.9,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});
