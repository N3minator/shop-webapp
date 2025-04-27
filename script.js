const tg = window.Telegram.WebApp;
let selectedPlan = 'moder';

// выбор плана
document.querySelectorAll('.plan').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.plan').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    selectedPlan = el.dataset.plan;
  });
});
// активируем по-умолчанию
document.querySelector('.plan').classList.add('active');

// обработка «оплатить»
document.getElementById('payBtn').addEventListener('click', () => {
  const duration = +document.getElementById('duration').value;
  const groupId  = document.getElementById('groupId').value.trim();
  if (!groupId) {
    alert('Введите ID вашей группы');
    return;
  }
  // отправляем данные бэкенду
  tg.sendData(JSON.stringify({
    subscription: selectedPlan,
    duration,
    group_id: groupId,
    test: true   // флаг «тестовой» активации
  }));
});

// скрываем кнопку Telegram header
tg.MainButton.hide();
tg.ready();
