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
