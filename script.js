// Инициализация Particles.js (анимированный космос)
particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 100,
      "density": {"enable": true, "value_area": 800}
    },
    "color": {"value": "#ffffff"},
    "shape": {"type": "circle"},
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
      "onhover": {"enable": true, "mode": "repulse"},
      "onclick": {"enable": false}
    },
    "modes": {
      "repulse": {"distance": 80, "duration": 0.4}
    }
  },
  "retina_detect": true
});

// Параллакс эффект по движению мышки
document.addEventListener('mousemove', e => {
  const moveX = (e.clientX / window.innerWidth) - 0.5;
  const moveY = (e.clientY / window.innerHeight) - 0.5;
  document.getElementById('particles-js').style.transform =
    `translate(${moveX * 20}px, ${moveY * 20}px)`;
});

// Telegram WebApp API
const tg = window.Telegram.WebApp;
let selectedPlan = 'moder';

// Выбор плана
document.querySelectorAll('.plan').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.plan').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    selectedPlan = el.dataset.plan;
  });
});
// Активировать первый по умолчанию
document.querySelector('.plan').classList.add('active');

// Кнопка "Оплатить"
document.getElementById('payBtn').addEventListener('click', () => {
  const duration = +document.getElementById('duration').value;
  const groupId = document.getElementById('groupId').value.trim();
  if (!groupId) {
    alert('Введите ID вашей группы');
    return;
  }
  tg.sendData(JSON.stringify({
    subscription: selectedPlan,
    duration,
    group_id: groupId,
    test: true
  }));
});

// Прятать главную кнопку Telegram
tg.MainButton.hide();
tg.ready();

// Метеоры (падающие звёзды)
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  document.body.appendChild(meteor);

  meteor.style.left = Math.random() * window.innerWidth + 'px';
  meteor.style.animationDuration = (1 + Math.random() * 1.5) + 's';

  setTimeout(() => {
    meteor.remove();
  }, 2000);
}

// Появление метеора каждые 7-15 секунд
setInterval(() => {
  if (Math.random() < 0.5) createMeteor();
}, 7000);

// Стили для метеоров
const style = document.createElement('style');
style.innerHTML = `
.meteor {
  position: fixed;
  top: -20px;
  width: 2px;
  height: 80px;
  background: linear-gradient(180deg, white, rgba(255,255,255,0));
  opacity: 0.7;
  z-index: 2;
  pointer-events: none;
  animation: meteorFall linear forwards;
}
@keyframes meteorFall {
  0% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.9;
  }
  100% {
    transform: translateY(100vh) translateX(-200px) rotate(45deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
