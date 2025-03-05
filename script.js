let remainingClicks = 100;
document.getElementById("clickButton").addEventListener("click", () => {
    if (remainingClicks > 0) {
        remainingClicks--;
        document.getElementById("remainingClicks").innerText = remainingClicks;
        createCoin();
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
    window.location.href = "https://kaspi.kz/pay"; // Здесь будет реальная ссылка
});
const user = "user123"; // Можно сделать регистрацию

// Регистрируем пользователя
fetch("https://criptomain.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user })
});

// Засчитываем клики
document.getElementById("clickButton").addEventListener("click", () => {
    fetch("https://ТВОЙ_URL_ОТ_RENDER/earn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        console.log(data);
    });
});

// Кнопка вывода средств
document.getElementById("withdrawButton").addEventListener("click", () => {
    fetch("https://ТВОЙ_URL_ОТ_RENDER/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message);
    });
});
document.getElementById("buyVipButton").addEventListener("click", () => {
    fetch("http://YOUR_SERVER_IP:5000/buy_vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message);
    });
});
