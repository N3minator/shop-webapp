# core/webapp/shop_cmd.py
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo


async def shop_cmd(update, ctx):
    kb = InlineKeyboardMarkup([[
        InlineKeyboardButton(
            text="🛒 Открыть магазин",
            web_app=WebAppInfo(url="https://shop-webapp-eight.vercel.app")
        )
    ]])
    await update.message.reply_text("Нажмите, чтобы открыть магазин", reply_markup=kb)
