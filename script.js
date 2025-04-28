// Инициализация Particles.js для космоса
particlesJS('particles-js', {
  "particles": {
    "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.7, "random": true },
    "size": { "value": 2, "random": true },
    "move": { "enable": true, "speed": 0.6, "direction": "none", "out_mode": "out" }
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
  // убираем ведущий минус для подсчёта цифр
  const digitsOnly = value.startsWith('-') ? value.slice(1) : value;

  // пропускаем "-123456" или "123456", но не меньше 5 цифр
  if (/^\d+$/.test(digitsOnly) && digitsOnly.length >= 5) {
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

  // логируем клик по кнопке
  console.log('🔔 [WebApp] Pay button clicked', {
    plan: selectedPlan,
    duration,
    groupId
  });

  // проверяем цифры без минуса
  const digits = groupId.startsWith('-') ? groupId.slice(1) : groupId;
  if (!/^\d+$/.test(digits) || digits.length < 5) {
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
  top: -150px; /* старт чуть выше экрана */
  width: 2px;
  height: 100px;
  background: linear-gradient(rgba(255,255,255,0), white);
  opacity: 0.8;
  z-index: 2;
  pointer-events: none;
  transform-origin: top center; /* голова — точка вращения */
  animation: meteorFall linear forwards;
}
.meteor.big {
  width: 3px;
  height: 150px;
  background: linear-gradient(rgba(255,255,255,0), white);
  box-shadow: 0 0 25px #fff;
  transform-origin: top center;
}

@keyframes meteorFall {
  0% {
    /* поворот на −45° (вниз–влево), затем без смещения */
    transform: rotate(-45deg) translateY(0);
    opacity: 1;
  }
  100% {
    /* та же ориентация + смещаемся вдоль локальной оси Y за пределы экрана */
    transform: rotate(-45deg) translateY(120vh);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// Параллакс эффект движения космоса
document.addEventListener('mousemove', e => {
  const moveX = (e.clientX / window.innerWidth) - 0.5;
  const moveY = (e.clientY / window.innerHeight) - 0.5;
  document.getElementById('particles-js').style.transform =
    `translate(${moveX * 20}px, ${moveY * 20}px)`;
});

// Новый trail-эффект: несколько шариков при каждом движении
document.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    // рандомный размер
    const size = Math.random() * 8 + 4;
    dot.style.width = dot.style.height = size + 'px';
    // центрируем относительно курсора
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    // рандомный светлый цвет в пурпурной гамме
    const hue = 270 + (Math.random() * 40 - 20); // 250–290°
    dot.style.background = `hsl(${hue}, 70%, 75%)`;
    document.body.appendChild(dot);
    // удаляем через секунду
    setTimeout(() => dot.remove(), 1000);
  }
});
