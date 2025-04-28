import json
import sqlite3
from datetime import datetime, timedelta
from telegram import Update
from telegram.ext import ContextTypes

# Путь к вашей chat_config.db
DB_PATH = 'database/data_main/chat_config.db'


async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = json.loads(update.message.web_app_data.data)
    subscription = data.get("subscription")
    duration = int(data.get("duration", 0))
    group_id = data.get("group_id")
    test_mode = data.get("test", False)

    # валидация
    if not subscription or not duration or not group_id:
        await update.message.reply_text("❗ Ошибка: неполные данные заказа.")
        return

    # Тестовый режим — сразу активируем в БД и отвечаем
    if test_mode:
        # вычисляем дату окончания
        until = datetime.utcnow() + timedelta(days=30 * duration)
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        # поля для каждой подписки
        mapping = {
            'moder': ('mode_pro_moder', 'pro_moder_until'),
            'game':  ('mode_pro_game',  'pro_game_until'),
            'full':  ('mode_pro_full',  'pro_full_until'),
        }
        flag_col, until_col = mapping[subscription]
        # обновляем
        cur.execute(f"""
          UPDATE chat_config
             SET {flag_col} = 1,
                 {until_col} = ?
           WHERE chat_id = ?
        """, (until.isoformat(), group_id))
        conn.commit()
        conn.close()

        # отвечаем пользователю
        await update.message.reply_text(
            f"✅ [TEST] Подписка «{subscription.upper()}» активирована на {duration} мес. "
            f"(до {until.date()}) для группы {group_id}."
        )
        return

    # ...здесь может идти настоящая send_invoice(), если отключить тест
    await update.message.reply_text("⚠️ Работает только тестовый режим подстановки.")

