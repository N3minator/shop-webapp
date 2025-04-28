// Инициализация Particles.js для космоса
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 100,
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.7,
      "random": true
    },
    "size": {
      "value": 2,
      "random": true
    },
    "move": {
      "enable": true,
      "speed": 0.6,
      "direction": "none",
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": false }
    },
    "modes": {
      "repulse": { "distance": 80, "duration": 0.4 }
    }
  },
  "retina_detect": true
});

// Параллакс эффект движения космоса
document.addEventListener('mousemove', e => {
  const moveX = (e.clientX / window.innerWidth) - 0.5;
  const moveY = (e.clientY / window.innerHeight) - 0.5;
  document.getElementById('particles-js').style.transform =
    `translate(${moveX * 20}px, ${moveY * 20}px)`;
});

// Telegram WebApp API
const tg = window.Telegram.WebApp;
let selectedPlan = 'moder';

// Выбор подписки
document.querySelectorAll('.plan').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.plan').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    selectedPlan = el.dataset.plan;
  });
});
document.querySelector('.plan').classList.add('active');

// Проверка ID группы
const groupInput = document.getElementById('groupId');
const groupPreview = document.getElementById('groupPreview');

groupInput.addEventListener('input', () => {
  const value = groupInput.value.trim();
  if (value && /^\d{5,}$/.test(value)) {
    groupInput.classList.remove('error');
    groupPreview.textContent = `Введённый ID: ${value}`;
    groupPreview.classList.add('show');
  } else {
    groupInput.classList.add('error');
    groupPreview.classList.remove('show');
    groupPreview.textContent = '';
  }
});

// Кнопка "Оплатить"
document.getElementById('payBtn').addEventListener('click', () => {
  const duration = +document.getElementById('duration').value;
  const groupId = document.getElementById('groupId').value.trim();

  if (!groupId || !/^\d{5,}$/.test(groupId)) {
    alert('Введите корректный ID группы (только цифры, минимум 5 знаков).');
    groupInput.classList.add('error');
    return;
  }

  tg.sendData(JSON.stringify({
    subscription: selectedPlan,
    duration,
    group_id: groupId,
    test: true
  }));
});

// Прятать основную кнопку Telegram
tg.MainButton.hide();
tg.ready();

// Метеоры и вспышки
function createMeteor(big = false) {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  if (big) meteor.classList.add('big');
  document.body.appendChild(meteor);

  meteor.style.left = Math.random() * window.innerWidth + 'px';
  meteor.style.animationDuration = (1 + Math.random() * 1.5) + 's';

  setTimeout(() => {
    meteor.remove();
  }, 3000);
}

// Запуск обычных метеоров
setInterval(() => {
  if (Math.random() < 0.6) createMeteor();
}, 7000);

// Запуск больших метеоров с эффектом вспышки
setInterval(() => {
  if (Math.random() < 0.3) createMeteor(true);
}, 15000);

// Стили для метеоров
const style = document.createElement('style');
style.innerHTML = `
.meteor {
  position: fixed;
  top: -30px;
  width: 2px;
  height: 100px;
  background: linear-gradient(180deg, white, rgba(255,255,255,0));
  opacity: 0.7;
  z-index: 2;
  pointer-events: none;
  transform: rotate(45deg);
  animation: meteorFall linear forwards;
}
.meteor.big {
  width: 3px;
  height: 150px;
  background: linear-gradient(180deg, #ffffff, rgba(255,255,255,0));
  box-shadow: 0 0 25px #ffffff;
}
@keyframes meteorFall {
  0% {
    transform: translateY(0) translateX(0) rotate(45deg);
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh) translateX(-200px) rotate(45deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
