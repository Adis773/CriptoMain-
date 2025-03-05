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
