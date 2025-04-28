import logging
import sys
from telegram.ext import Application
from core.config import TOKEN
from utils.setup_jobqueue import setup_jobqueue  # заглушка или реальная инициализация
from core.setup_handlers import setup_all_handlers  # всё подключение хэндлеров здесь
from utils.users import init_db

# Логирование (поднять уровень INFO для webapp_handler)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s — %(name)s — %(levelname)s — %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)

logging.getLogger("telegram.ext").setLevel(logging.INFO)
logging.getLogger("telegram.bot").setLevel(logging.INFO)
# Теперь INFO-логи из модуля handle_web_app_data будут выводиться
logging.getLogger('core.webapp.webapp_handler').setLevel(logging.INFO)


# 🚀 post_init: вызывается после запуска — инициализирует очередь и пишет сообщение о перезапуске
async def post_init(app):
    init_db()
    await setup_jobqueue(app)


def main():
    app = Application.builder().token(TOKEN).post_init(post_init).build()
    setup_all_handlers(app)
    app.run_polling()


if __name__ == '__main__':
    main()

"""
🚀 Запуск Telegram-бота: Архитектура и Пояснение
==============================================

📌 Этот файл `main.py` — точка входа в Telegram-бота. Он отвечает за:
- Инициализацию Telegram Application
- Настройку логирования
- Запуск всех хэндлеров (команд, callback-кнопок, сообщений и т.д.)
- Обработку событий при старте (например, сообщение после перезапуска)
- Подключение JobQueue (если понадобится в будущем для фоновых задач)

🧩 Основные этапы запуска:
--------------------------
1. 🔐 Импортируется токен из `utils/config.py`, полученный из `.env`.
2. 🧱 Создаётся Telegram-приложение с помощью:
       `Application.builder().token(TOKEN).post_init(post_init).build()`
   - `post_init` — функция, вызываемая сразу после старта (подключает `JobQueue` и `on_bot_start`).
3. 🔌 В `setup_handlers.py` происходит регистрация всех хэндлеров (по группам, ролям, ЛС и т.д.)
4. 📬 Включается режим `run_polling()` — бот начинает слушать сообщения.

📂 Модули, участвующие в запуске:
---------------------------------
- `main.py`                — основной файл, точка входа.
- `utils/config.py`        — загрузка токена и логирования.
- `setup_handlers.py`      — регистрирует все команды, callback'и и ConversationHandler.
- `setup_jobqueue.py`      — заглушка для JobQueue (можно использовать позже для автоочистки, напоминаний).
- `handlers/...`           — директория со всеми обработчиками (команды, callback, утилиты, игры, роли).
- `creator_bot/restart_bot.py` — поддержка команды `!restart` и вывод инфо после перезапуска.
"""