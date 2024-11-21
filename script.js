let balance = 2000000000;
let timer = 5;
let countdown;
let currentBet = null;
let betAmount = 0;

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

function placeBet(type) {
    betAmount = parseInt(document.getElementById('betAmount').value, 10);

    if (isNaN(betAmount) || betAmount <= 0) {
        alert("Vui lòng nhập số tiền cược hợp lệ!");
        return;
    }

    if (betAmount > balance) {
        alert("Số tiền cược không được vượt quá số dư hiện tại!");
        return;
    }

    currentBet = type;
    startGame(); // Bắt đầu trò chơi
}

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    document.getElementById('dice1').src = `dice${dice1}.png`;
    document.getElementById('dice2').src = `dice${dice2}.png`;
    document.getElementById('dice3').src = `dice${dice3}.png`;

    const total = dice1 + dice2 + dice3;
    const result = total >= 11 ? "tai" : "xiu";

    if (currentBet === result) {
        balance += betAmount; // Cộng tiền khi thắng
        document.getElementById('result').textContent = `Bạn thắng! Tổng: ${total} - ${result.toUpperCase()}`;
        document.getElementById('message').innerHTML = `
            <span style="color: lime; font-size: 18px;">Chúc mừng bạn đã chiến thắng!</span>
        `;
    } else {
        balance -= betAmount; // Trừ tiền khi thua
        document.getElementById('result').textContent = `Bạn thua! Tổng: ${total} - ${result.toUpperCase()}`;
        document.getElementById('message').innerHTML = `
            <span style="color: red; font-size: 18px;">Chúc bạn may mắn lần sau!</span>
        `;
    }

    updateBalance(); // Cập nhật số dư hiển thị
}

function updateBalance() {
    document.getElementById('balance').textContent = balance.toLocaleString('vi-VN') + " VND";
}

currentBet = type;
startGame();
if (currentBet === result) {
    balance += Math.floor(betAmount * 0.8); // Thắng 80% số tiền cược
    document.getElementById('result').textContent = `Bạn thắng! Tổng: ${total}`;
    document.getElementById('message').textContent = "Chúc mừng bạn đã chiến thắng!";
} else {
    balance -= betAmount;
    document.getElementById('result').textContent = `Bạn thua! Tổng: ${total}`;
    document.getElementById('message').textContent = "Chúc bạn may mắn lần sau!";
}

function startGame() {
    document.getElementById('result').textContent = "Đang lắc xúc xắc...";
    timer = 5;
    document.getElementById('timer').textContent = timer;

    countdown = setInterval(() => {
        timer--;
        document.getElementById('timer').textContent = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            countdown = null;
            rollDice();
        }
    }, 1000);
}

function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    const total = dice1 + dice2 + dice3;

    if (currentBet === "special" && total === 18) {
        // Cược "đặc biệt": chỉ thắng nếu tổng là 18
        balance += betAmount * 10; // Thắng lớn (gấp 10 lần)
        document.getElementById('result').textContent = `Bạn thắng lớn! Tổng: ${total}`;
        document.getElementById('message').textContent = "Chúc mừng bạn! Đây là ngày may mắn của bạn!";
    } else if (currentBet === "special" && total !== 18) {
        // Thua cược đặc biệt
        balance -= betAmount * 2; // Thua gấp đôi tiền cược
        document.getElementById('result').textContent = `Bạn thua cược đặc biệt! Tổng: ${total}`;
        document.getElementById('message').textContent = "Chúc bạn may mắn lần sau!";
    } else {
        // Cược thông thường
        const result = total >= 11 ? "tai" : "xiu";
        if (currentBet === result) {
            balance += betAmount;
            document.getElementById('result').textContent = `Bạn thắng! Tổng: ${total}`;
            document.getElementById('message').textContent = "Chúc mừng bạn đã chiến thắng!";
        } else {
            balance -= betAmount;
            document.getElementById('result').textContent = `Bạn thua! Tổng: ${total}`;
            document.getElementById('message').textContent = "Chúc bạn may mắn lần sau!";
        }
    }
    updateBalance();
}

function triggerFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    let particles = [];

    function createFirework(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x,
                y,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 3 + 2,
                alpha: 1,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.alpha -= 0.02;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(drawParticles);
    }

    createFirework(w / 2, h / 2);
    drawParticles();
}