// --- DICCIONARIO DE LOS 20 MENSAJES DESBLOQUEABLES ---
const milestoneMessages = {
    1000: "texto1000metros",
    2500: "texto2500metros",
    5000: "texto5000metros",
    7500: "texto7500metros",
    10000: "texto10000metros",
    12500: "texto12500metros",
    15000: "texto15000metros",
    17500: "texto17500metros",
    20000: "texto20000metros",
    22500: "texto22500metros",
    25000: "texto25000metros",
    27500: "texto27500metros",
    30000: "texto30000metros",
    32500: "texto32500metros",
    35000: "texto35000metros",
    37500: "texto37500metros",
    40000: "texto40000metros",
    42500: "texto42500metros",
    45000: "texto45000metros",
    50000: "texto50000metros"
};

// Variables del Juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameAnimation;
let isPlaying = false;
let isPaused = false;
let score = 0;
let highScore = 0;
let unlockedMilestones = new Set();

// Configuración del Pingüino y Juego
const gravity = 0.38;
let player = {
    x: 180,
    y: 400,
    width: 36,
    height: 42,
    vx: 0,
    vy: 0,
    jumpStrength: -11.5,
    facing: 'right'
};

let platforms = [];
let particles = [];
const platformCount = 7;

// Teclas presionadas
const keys = { left: false, right: false };

// Elementos del DOM
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const messageModal = document.getElementById('message-modal');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const finalScore = document.getElementById('final-score');

const modalMilestone = document.getElementById('modal-milestone');
const modalText = document.getElementById('modal-text');

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
closeModalBtn.addEventListener('click', resumeGame);

// Controles Teclado
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
});

// Controles Táctiles Móvil
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');

btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); keys.left = true; });
btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); keys.left = false; });
btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); keys.right = true; });
btnRight.addEventListener('touchend', (e) => { e.preventDefault(); keys.right = false; });

btnLeft.addEventListener('mousedown', () => keys.left = true);
btnLeft.addEventListener('mouseup', () => keys.left = false);
btnRight.addEventListener('mousedown', () => keys.right = true);
btnRight.addEventListener('mouseup', () => keys.right = false);

// Iniciar Juego
function startGame() {
    startScreen.classList.remove('active');
    gameoverScreen.classList.remove('active');
    messageModal.classList.remove('active');
    gameScreen.classList.add('active');

    score = 0;
    unlockedMilestones.clear();
    scoreDisplay.textContent = '0 m';

    player.x = canvas.width / 2 - 18;
    player.y = 350;
    player.vx = 0;
    player.vy = player.jumpStrength;

    createInitialPlatforms();
    isPlaying = true;
    isPaused = false;

    cancelAnimationFrame(gameAnimation);
    gameLoop();
}

// Crear Plataformas Iniciales
function createInitialPlatforms() {
    platforms = [];
    // Plataforma base inicial
    platforms.push({ x: 150, y: 520, width: 100, height: 14, type: 'normal' });

    for (let i = 0; i < platformCount; i++) {
        let py = 450 - (i * 80);
        let px = Math.random() * (canvas.width - 70);
        let ptype = Math.random() < 0.2 ? 'moving' : 'normal';
        platforms.push({
            x: px,
            y: py,
            width: 70,
            height: 12,
            type: ptype,
            vx: ptype === 'moving' ? (Math.random() < 0.5 ? 1.5 : -1.5) : 0
        });
    }
}

// Bucle del Juego
function gameLoop() {
    if (!isPlaying) return;

    if (!isPaused) {
        update();
        render();
    }

    gameAnimation = requestAnimationFrame(gameLoop);
}

// Actualización de Lógica
function update() {
    // Movimiento Horizontal
    if (keys.left) {
        player.vx = -4.8;
        player.facing = 'left';
    } else if (keys.right) {
        player.vx = 4.8;
        player.facing = 'right';
    } else {
        player.vx *= 0.8;
    }

    player.x += player.vx;

    // Efecto pantalla envolvente
    if (player.x < -player.width) player.x = canvas.width;
    if (player.x > canvas.width) player.x = -player.width;

    // Gravedad
    player.vy += gravity;
    player.y += player.vy;

    // Colisión con Plataformas (solo al caer)
    if (player.vy > 0) {
        platforms.forEach(p => {
            if (
                player.x + player.width > p.x &&
                player.x < p.x + p.width &&
                player.y + player.height >= p.y &&
                player.y + player.height <= p.y + 14
            ) {
                player.vy = player.jumpStrength;
                createJumpParticles(player.x + player.width / 2, player.y + player.height);
            }
        });
    }

    // Mover Plataformas y Cámara hacia arriba
    if (player.y < 260) {
        let diff = 260 - player.y;
        player.y = 260;

        score += Math.floor(diff);
        scoreDisplay.textContent = `${score} m`;

        if (score > highScore) {
            highScore = score;
            highscoreDisplay.textContent = `${highScore} m`;
        }

        // Mover plataformas
        platforms.forEach(p => {
            p.y += diff;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * (canvas.width - 70);
                p.type = Math.random() < 0.25 ? 'moving' : 'normal';
                p.vx = p.type === 'moving' ? (Math.random() < 0.5 ? 1.8 : -1.8) : 0;
            }
        });

        // Verificar Mensajes Desbloqueables
        checkMilestones();
    }

    // Mover Plataformas Móviles
    platforms.forEach(p => {
        if (p.type === 'moving') {
            p.x += p.vx;
            if (p.x <= 0 || p.x + p.width >= canvas.width) p.vx *= -1;
        }
    });

    // Actualizar Partículas
    particles.forEach((pt, index) => {
        pt.y += pt.vy;
        pt.alpha -= 0.03;
        if (pt.alpha <= 0) particles.splice(index, 1);
    });

    // Caída / Game Over
    if (player.y > canvas.height + 50) {
        gameOver();
    }
}

// Dibujar en Canvas
function render() {
    // Fondo Noche Bosque
    ctx.fillStyle = '#0d0d11';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estrellas / Destellos de Fondo
    ctx.fillStyle = 'rgba(199, 125, 255, 0.3)';
    ctx.fillRect(50, (score * 0.1) % canvas.height, 2, 2);
    ctx.fillRect(200, (score * 0.15 + 100) % canvas.height, 3, 3);
    ctx.fillRect(320, (score * 0.08 + 200) % canvas.height, 2, 2);

    // Dibujar Plataformas
    platforms.forEach(p => {
        if (p.type === 'moving') {
            ctx.fillStyle = '#6b0504'; // Rojo Vino
            ctx.strokeStyle = '#c77dff';
        } else {
            ctx.fillStyle = '#1b3b2b'; // Verde Noche
            ctx.strokeStyle = '#e0aaff';
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();
    });

    // Dibujar Partículas
    particles.forEach(pt => {
        ctx.fillStyle = `rgba(199, 125, 255, ${pt.alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Dibujar Pingüino Cazador
    drawPenguin(player.x, player.y, player.facing);
}

// Dibujar Pingüino con detalles mágicos / góticos
function drawPenguin(x, y, facing) {
    ctx.save();
    ctx.translate(x + player.width / 2, y + player.height / 2);
    if (facing === 'left') ctx.scale(-1, 1);

    // Cuerpo
    ctx.fillStyle = '#111116';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 21, 0, 0, Math.PI * 2);
    ctx.fill();

    // Panza
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(0, 3, 11, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bufanda Rojo Vino (Estilo Cazador)
    ctx.fillStyle = '#6b0504';
    ctx.fillRect(-12, -7, 24, 5);

    // Ojos Mágicos Morados
    ctx.fillStyle = '#c77dff';
    ctx.beginPath();
    ctx.arc(6, -8, 3, 0, Math.PI * 2);
    ctx.fill();

    // Pico
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.moveTo(10, -5);
    ctx.lineTo(17, -2);
    ctx.lineTo(10, 1);
    ctx.fill();

    ctx.restore();
}

// Crear Partículas de Salto
function createJumpParticles(x, y) {
    for (let i = 0; i < 6; i++) {
        particles.push({
            x: x + (Math.random() * 20 - 10),
            y: y,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 3 + 2,
            alpha: 1
        });
    }
}

// Revisar si alcanzó un hito de distancia
function checkMilestones() {
    for (let milestone in milestoneMessages) {
        let milestoneVal = parseInt(milestone);
        if (score >= milestoneVal && !unlockedMilestones.has(milestoneVal)) {
            unlockedMilestones.add(milestoneVal);
            triggerMilestoneModal(milestoneVal, milestoneMessages[milestoneVal]);
            break;
        }
    }
}

// Disparar Pop-up del Mensaje
function triggerMilestoneModal(milestoneVal, text) {
    isPaused = true;
    modalMilestone.textContent = `✨ A los ${milestoneVal.toLocaleString()} metros:`;
    modalText.textContent = text;
    messageModal.classList.add('active');
}

function resumeGame() {
    messageModal.classList.remove('active');
    isPaused = false;
}

// Game Over
function gameOver() {
    isPlaying = false;
    finalScore.textContent = `${score.toLocaleString()} m`;
    gameScreen.classList.remove('active');
    gameoverScreen.classList.add('active');
}

// Partículas de Fondo en la Web
function createBackgroundParticles() {
    const container = document.getElementById('floating-container');
    const items = ['✨', '🌸', '🔮', '❄️', '👑'];

    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('floating-item');
        item.innerText = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(item);

        setTimeout(() => item.remove(), 8000);
    }, 800);
}

window.addEventListener('DOMContentLoaded', createBackgroundParticles);
