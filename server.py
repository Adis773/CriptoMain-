from flask import Flask, request, jsonify

app = Flask(__name__)

# База данных балансов (простая, можно заменить на SQLite)
balances = {}

@app.route("/register", methods=["POST"])
def register():
    user = request.json["user"]
    balances[user] = 0
    return jsonify({"message": "Регистрация успешна!", "balance": balances[user]})

@app.route("/earn", methods=["POST"])
def earn():
    user = request.json["user"]
    if user in balances:
        balances[user] += 1  # 1 Monero за клик (можно изменить)
        return jsonify({"message": "Доход засчитан!", "balance": balances[user]})
    return jsonify({"error": "Пользователь не найден!"}), 400

@app.route("/withdraw", methods=["POST"])
def withdraw():
    user = request.json["user"]
    if user in balances and balances[user] >= 10:  # Минимум 10 Monero на вывод
        balances[user] -= 10
        return jsonify({"message": "Выплата отправлена!", "balance": balances[user]})
    return jsonify({"error": "Недостаточно средств!"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
vip_users = set()  # Список VIP-пользователей

@app.route("/buy_vip", methods=["POST"])
def buy_vip():
    user = request.json["user"]
    vip_users.add(user)
    return jsonify({"message": "Вы стали VIP! Доход x2"})
    referrals = {}  # Кто кого пригласил

@app.route("/set_referral", methods=["POST"])
def set_referral():
    user = request.json["user"]
    referrer = request.json["referrer"]
    referrals[user] = referrer
    return jsonify({"message": f"Вы привязаны к {referrer}!"})

@app.route("/earn", methods=["POST"])
def earn():
    user = request.json["user"]
    amount = 2 if user in vip_users else 1  # VIP x2
    balances[user] += amount

    # Начисление рефералу 1% от дохода
    if user in referrals:
        referrer = referrals[user]
        balances[referrer] += 0.01 * amount

    return jsonify({"message": "Доход засчитан!", "balance": balances[user]})
@app.route("/pay_vip", methods=["POST"])
def pay_vip():
    user = request.json["user"]
    amount = request.json["amount"]
    payment_method = request.json["method"]  # Kaspi или Halyk

    # Эмулируем успешный платеж (нужно заменить на API Kaspi/Halyk)
    if amount >= 10:  # Цена VIP
        vip_users.add(user)
        return jsonify({"message": "Вы стали VIP!"})
    else:
        return jsonify({"error": "Недостаточная сумма!"}), 400
import requests

TON_API_KEY = "7627103721:AAFGrhtxx8ZD9KcNKhIZOPqTXM9EjJV1nB8"
TON_WALLET="UQDrILjKb9MOeJfbeTuba3YxQNIbpvSYz_93arukX4Ek1tuI"

@app.route("/withdraw", methods=["POST"])
def withdraw():
    user = request.json["user"]
    amount = balances.get(user, 0)
    
    if amount < 1:  # Минимальный вывод
        return jsonify({"error": "Недостаточно средств!"}), 400

    # Запрос на вывод через Telegram-бот
    response = requests.post(f"https://api.telegram.org/bot{TON_API_KEY}/sendMessage", json={
        "chat_id": user,  # ID кошелька (добавить систему привязки)
        "text": f"Ваши {amount} TON отправлены!"
    })

    if response.status_code == 200:
        balances[user] = 0  # Обнуляем баланс после вывода
        return jsonify({"message": "Вывод успешен!"})
    else:
        return jsonify({"error": "Ошибка при выводе!"}), 500
@app.route("/invite/<user>")
def invite(user):
    if user not in ref_rewards:
        ref_rewards[user] = 0
    ref_rewards[user] += 1
    return jsonify({"message": f"{user} получил бонус за приглашение!"})
    @app.route("/bonus", methods=["POST"])
def bonus():
    user = request.json["user"]
    if clicks[user] >= 100:
        balances[user] += balances[user] * 0.05  # +5%
        return jsonify({"message": "Вы получили +5% к доходу!"})
    return jsonify({"error": "Недостаточно кликов!"}), 400
    @app.route("/leaderboard")
def leaderboard():
    sorted_users = sorted(balances.items(), key=lambda x: x[1], reverse=True)
    return jsonify({"leaders": sorted_users[:10]})  # ТОП-10
@app.route("/withdraw", methods=["POST"])
def withdraw():
    user = request.json["user"]
    amount = float(request.json["amount"])
    wallet = request.json["wallet"]
    currency = request.json["currency"]

    if user not in balances or balances[user] < amount:
        return jsonify({"error": "Недостаточно средств"}), 400

    balances[user] -= amount  # Списываем средства

    # Симуляция отправки выплаты
    return jsonify({"message": f"Выплата {amount} {currency} отправлена на {wallet}!"})
    vip_users = {}

@app.route("/buy_vip", methods=["POST"])
def buy_vip():
    user = request.json["user"]
    cost = 0.01  # Цена VIP (в XMR)

    if balances.get(user, 0) < cost:
        return jsonify({"error": "Недостаточно средств"}), 400

    balances[user] -= cost
    vip_users[user] = True
    return jsonify({"message": "Поздравляем! Вы стали VIP!"})
    achievements = {
    "first_click": "Первая монетка!",
    "100_clicks": "100 монет!",
    "1_xmr": "Ты добыл 1 XMR!"
}

user_achievements = {}

@app.route("/get_achievements")
def get_achievements():
    return jsonify(user_achievements.get(request.args["user"], []))
    messages = []

@app.route("/send_message", methods=["POST"])
def send_message():
    user = request.json["user"]
    text = request.json["text"]
    
    messages.append(f"{user}: {text}")
    if len(messages) > 20:  # Храним только 20 сообщений
        messages.pop(0)
    
    return jsonify({"status": "OK"})

@app.route("/get_messages")
def get_messages():
    return jsonify({"messages": messages})
    referrals = {}

@app.route("/add_referral", methods=["POST"])
def add_referral():
    user = request.json["user"]
    referrer = request.json["referrer"]

    if user in referrals:
        return jsonify({"error": "Реферал уже добавлен"}), 400

    referrals[user] = referrer
    balances[referrer] += 0.001  # Бонус за приглашение

    return jsonify({"message": "Реферал добавлен, бонус начислен!"})
    @app.route("/leaderboard")
def leaderboard():
    top_players = sorted(balances.items(), key=lambda x: x[1], reverse=True)[:10]
    return jsonify({"leaderboard": top_players})
    levels = {}

@app.route("/update_level", methods=["POST"])
def update_level():
    user = request.json["user"]
    balance = balances.get(user, 0)

    if balance >= 10:
        levels[user] = "💎 Алмазный"
    elif balance >= 5:
        levels[user] = "🔥 Золотой"
    elif balance >= 2:
        levels[user] = "🥈 Серебряный"
    else:
        levels[user] = "🥉 Бронзовый"

    return jsonify({"level": levels[user]})
daily_quests = {}

@app.route("/daily_quest", methods=["POST"])
def daily_quest():
    user = request.json["user"]
    if daily_quests.get(user, False):
        return jsonify({"message": "Вы уже выполнили квест сегодня!"})
    
    balances[user] += 0.002  # Бонус за выполнение
    daily_quests[user] = True

    return jsonify({"message": "Квест выполнен! Бонус зачислен."})
    vip_users = {}

@app.route("/buy_vip", methods=["POST@app.route("/withdraw", methods=["POST"])
def withdraw():
    user = request.json["user"]
    wallet = request.json["wallet"]
    amount = request.json["amount"]

    if balances.get(user, 0) >= amount:
        balances[user] -= amount
        return jsonify({"message": f"Выплата {amount} XMR отправлена на {wallet}!"})
    else:
        return jsonify({"message": "Недостаточно средств!"})"])
def buy_vip():
    user = request.json["user"]
    amount = request.json["amount"]

    if amount >= 5:  # VIP-статус за 5$
        vip_users[user] = True
        return jsonify({"message": "VIP активирован! Бонус: +10% к майнингу"})
    else:
        return jsonify({"message": "Минимальная сумма для VIP — 5$!"})
        
