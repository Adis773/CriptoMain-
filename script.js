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
document.getElementById("withdrawButton").addEventListener("click", () => {
    fetch(SERVER_URL + "/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
document.getElementById("mineButton").addEventListener("click", (e) => {
    for (let i = 0; i < 5; i++) {
        let coin = document.createElement("div");
        coin.classList.add("coin");
        coin.style.left = (e.clientX + Math.random() * 100 - 50) + "px";
        coin.style.top = (e.clientY - 50) + "px";
        document.body.appendChild(coin);
        setTimeout(() => coin.remove(), 2000);
    }
});
document.getElementById("inviteButton").addEventListener("click", () => {
    let link = `${SERVER_URL}/invite/${user}`;
    navigator.clipboard.writeText(link);
    alert("Реферальная ссылка скопирована!");
});
document.getElementById("bonusButton").addEventListener("click", () => {
    fetch(SERVER_URL + "/bonus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
function updateLeaderboard() {
    fetch(SERVER_URL + "/leaderboard")
        .then(response => response.json())
        .then(data => {
            let leaderboard = document.getElementById("leaderboard");
            leaderboard.innerHTML = "";
            data.leaders.forEach(([user, balance], index) => {
                leaderboard.innerHTML += `<p>${index + 1}. ${user}: ${balance} XMR</p>`;
            });
        });
}
setInterval(updateLeaderboard, 60000);  // Обновляем каждую минуту
document.getElementById("mineButton").addEventListener("click", () => {
    let btn = document.getElementById("mineButton");
    btn.style.transform = "scale(0.9)";
    setTimeout(() => btn.style.transform = "scale(1)", 100);
});
document.getElementById("withdrawButton").addEventListener("click", () => {
    let amount = prompt("Введите сумму вывода:");
    let wallet = prompt("Введите кошелек (BTC, ETH или TON):");
    let currency = prompt("Выберите валюту (BTC, ETH, TON):");

    fetch(SERVER_URL + "/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, amount, wallet, currency })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
document.getElementById("buyVipButton").addEventListener("click", () => {
    fetch(SERVER_URL + "/buy_vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
function loadAchievements() {
    fetch(SERVER_URL + "/get_achievements?user=" + user)
        .then(response => response.json())
        .then(data => {
            document.getElementById("achievements").innerHTML = data.map(a => `<p>🏆 ${a}</p>`).join("");
        });
}
setInterval(loadAchievements, 30000);  // Обновляем каждыfunction updateChat() {
    fetch(SERVER_URL + "/get_messages")
        .then(response => response.json())
        .then(data => {
            document.getElementById("chatBox").innerHTML = data.messages.map(m => `<p>${m}</p>`).join("");
        });
}
setInterval(updateChat, 5000);  // Обновляем чат каждые 5 секунд

document.getElementById("sendMessageButton").addEventListener("click", () => {
    let message = document.getElementById("chatInput").value;
    fetch(SERVER_URL + "/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, text: message })
    });
});е 30 секунд
document.getElementById("referralButton").addEventListener("click", () => {
    let referrer = document.getElementById("referralInput").value;
    fetch(SERVER_URL + "/add_referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, referrer })
    }).then(response => response.json()).then(data => {
        alert(data.message || data.error);
    });
});
function updateLeaderboard() {
    fetch(SERVER_URL + "/leaderboard")
        .then(response => response.json())
        .then(data => {
            document.getElementById("leaderboard").innerHTML = data.leaderboard.map(
                (p, i) => `<p>${i + 1}. ${p[0]}: ${p[1].toFixed(4)} XMR</p>`
            ).join("");
        });
}
setInterval(updateLeaderboard, 60000);  // Обновляем раз в минуту
function spawnCoin() {
    let coin = document.createElement("div");
    coin.className = "coin";
    coin.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
}
document.getElementById("mineButton").addEventListener("click", spawnCoin);
function updateLevel() {
    fetch(SERVER_URL + "/update_level", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        document.getElementById("userLevel").innerText = "Ваш уровень: " + data.level;
    });
}
setInterval(updateLevel, 60000);
document.getElementById("dailyQuestButton").addEventListener("click", () => {
    fetch(SERVER_URL + "/daily_quest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    }).then(response => response.json()).then(data => {
        alert(data.message);
    });
});
document.getElementById("buyVipButton").addEventListener("click", () => {
    let amount = prompt("Введите сумму (мин. 5$):");
    fetch(SERVER_URL + "/buy_vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, amount })
    }).then(response => response.json()).then(data => {
        alert(data.message);
    });
});
document.getElementById("withdrawButton").addEventListener("click", () => {
    let wallet = prompt("Введите ваш XMR-кошелёк:");
    let amount = prompt("Введите сумму:");

    fetch(SERVER_URL + "/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, wallet, amount })
    }).then(response => response.json()).then(data => {
        alert(data.message);
    });
});
document.getElementById("vip-btn").addEventListener("click", function() {
    window.location.href = "https://kaspi.kz"; // Оплата через Kaspi
});

document.getElementById("withdraw-btn").addEventListener("click", function() {
    let username = prompt("Введите ваш логин:");
    let amount = prompt("Сколько вывести?");
    let method = prompt("Вывести на (monero/kaspi/halyk)?");

    fetch("https://criptomain.onrender.com/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, amount: amount, method: method })
    }).then(response => response.json())
      .then(data => alert(data.message));
});

document.getElementById("mine-btn").addEventListener("click", function() {
    alert("Майнинг запущен!");
    startMining();
});
