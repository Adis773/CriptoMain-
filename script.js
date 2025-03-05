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
