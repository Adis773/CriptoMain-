document.addEventListener("DOMContentLoaded", () => {
    const SERVER_URL = "https://criptomain.onrender.com"; // Замени на реальный URL
    let remainingClicks = 100;
    const user = "user123"; // Можно заменить на реального пользователя

    document.getElementById("clickButton").addEventListener("click", () => {
        if (remainingClicks > 0) {
            remainingClicks--;
            document.getElementById("remainingClicks").innerText = remainingClicks;
            createCoin();

            // Отправляем запрос на сервер для засчитывания клика
            fetch(`${SERVER_URL}/earn`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user })
            }).then(response => response.json()).then(data => {
                console.log(data);
            });

        } else {
            alert("Лимит кликов на сегодня исчерпан!");
        }
    });

    // Функция анимации монет
    function createCoin() {
        let coin = document.createElement("div");
        coin.classList.add("coin");
        coin.style.left = Math.random() * window.innerWidth + "px";
        document.body.appendChild(coin);
        setTimeout(() => { coin.remove(); }, 1500);
    }

    // Кнопка VIP (переход на оплату через Kaspi/Halyk)
    document.getElementById("vipButton").addEventListener("click", () => {
        window.location.href = "https://kaspi.kz/pay"; // Реальная ссылка для оплаты
    });

    // Регистрируем пользователя
    fetch(`${SERVER_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    });

    // Кнопка вывода средств
    document.getElementById("withdrawButton").addEventListener("click", () => {
        fetch(`${SERVER_URL}/withdraw`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        }).then(response => response.json()).then(data => {
            alert(data.message);
        });
    });

    // Кнопка покупки VIP
    document.getElementById("buyVipButton").addEventListener("click", () => {
        fetch(`${SERVER_URL}/buy_vip`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        }).then(response => response.json()).then(data => {
            alert(data.message);
        });
    });
});
document.getElementById("payVipButton").addEventListener("click", () => {
    let method = prompt("Выберите платежную систему: Kaspi / Halyk");
    fetch(SERVER_URL + "/pay_vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, amount: 10, method })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
