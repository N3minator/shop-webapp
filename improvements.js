// improvements.js — музыка, спутники, пасхалки, уведомления

document.addEventListener('DOMContentLoaded', () => {
  initMusicControl();
  generateSatellites();
  generateSecretStars();
});

// 🎵 Музыка
function initMusicControl() {
  const music = document.getElementById('background-music');
  const toggleBtn = document.getElementById('music-toggle');

  toggleBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play().then(() => {
        toggleBtn.textContent = '🔊 Музыка Вкл';
      }).catch(() => {
        alert('⚠️ Автовоспроизведение заблокировано. Нажмите кнопку ещё раз!');
      });
    } else {
      music.pause();
      toggleBtn.textContent = '🔇 Музыка Выкл';
    }
  });
}

// 🛰️ Спутники
function generateSatellites() {
  setInterval(() => {
    const satellite = document.createElement('div');
    satellite.className = 'satellite';
    satellite.style.left = Math.random() * window.innerWidth + 'px';
    satellite.style.top = '-20px';
    document.body.appendChild(satellite);

    const speed = 30000 + Math.random() * 10000; // 30–40 секунд полёт
    satellite.animate([
      { transform: `translate(0, 0) rotate(0deg)` },
      { transform: `translate(-100vw, 100vh) rotate(360deg)` }
    ], {
      duration: speed,
      easing: 'linear'
    });

    setTimeout(() => satellite.remove(), speed);
  }, 5000); // Новый спутник каждые 5 секунд
}

// ⭐ Пасхалки (секретные звёзды)
function generateSecretStars() {
  const count = 5;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'secret-star';
    star.style.top = Math.random() * 90 + '%';
    star.style.left = Math.random() * 90 + '%';
    document.body.appendChild(star);

    star.addEventListener('click', () => {
      showStarNotification();
      star.remove();
    });
  }
}

// 🌟 Всплывающее уведомление
function showStarNotification() {
  const notification = document.getElementById('star-notification');
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
