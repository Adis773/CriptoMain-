import telebot
import requests

TOKEN = "7627103721:AAFGrhtxx8ZD9KcNKhIZOPqTXM9EjJV1nB8"
bot = telebot.TeleBot(TOKEN)

SERVER_URL = "https://criptomain.onrender.com"  # Адрес твоего сайта/сервера

@bot.message_handler(commands=['start'])
def start(message):
    bot.reply_to(message, "Привет! Для вывода денег используй команду: /withdraw username сумма метод")

@bot.message_handler(commands=['withdraw'])
def withdraw(message):
    data = message.text.split()
    if len(data) < 4:
        bot.reply_to(message, "Формат: /withdraw username сумма метод (monero/kaspi/halyk)")
        return

    username, amount, method = data[1], data[2], data[3]

    # Отправляем запрос на сервер
    response = requests.post(f"{SERVER_URL}/withdraw", json={
        "username": username,
        "amount": amount,
        "method": method
    })

    if response.status_code == 200:
        bot.reply_to(message, f"✅ Выплата {amount}₸ для {username} через {method} отправлена!")
    else:
        bot.reply_to(message, "❌ Ошибка выплаты! Попробуйте позже.")

bot.polling()
