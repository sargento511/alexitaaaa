// ==========================================
// 🔑 LISTA DE CONTRASEÑAS VÁLIDAS
const CORRECT_PASSWORDS = ["leopoldo", "alexa", "leo", "leopoldito", "201026"]; 
// ==========================================

passwordBtn.addEventListener('click', verifyPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyPassword();
    
// --- DICCIONARIO DE LOS 20 MENSAJES DESBLOQUEABLES ---
const milestoneMessages = {
    1000: "Niceee, pero falta mucho. Leopoldo te da animos",
    2500: "Lepoldo dice que ya lo superaste, solo llego a los 7k",
    5000: "Lepoldo quiere que sepas que gracias por existir",
    7500: "Leopoldo te da animos te quiere ver feliz",
    10000: "Leopoldo feliz ya avs en los 10k, gracias por esmerarte",
    15000: "Leopoldo dice que su cantante favorito es alex ponce. ANIMOOO!!!",
    20000: "ya casi llegas a la mitad, eres la mejor, leopoldo aprueba",
    25000: "Vas por la mitad, mereces un abrazo de la amistad",
    30000: "ya casi llegas pero le sigues debiendo a leopoldo ver cars 1,2y3",
    35000: "Leopoldo quiere que sepas que llegaste muy lejos y siempre estara orgulloso de ti",
    40000: "ya estas a 10k de ganar, leopoldo te quiere mucho alexa",
    45000: "a 5k de ganar, lo mas importante es que me gusta mucho pasar tiempo contigo jeje",
    50000: "GANASTEEEE, felicidades, Leopoldo te quiere ver cumplir tus sueños asi que nunca dudes en pedirle ayuda si lo necesitas, el siempre estara ahi para ayudarte, 67k?"
    67000: "Si viste esto es porque entendiste la referencia y ahora si ya no hay nada mas, gracias por jugar esto siempre estara aqui para cuando lo necesites y lo quieras al igual que leopoldo. TQM👍😎🤙"
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
const keys = { left: false, right: false };

// Elementos del DOM
const passwordScreen = document.getElementById('password-screen');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameoverScreen = document.getElementById('gameover-screen');
const messageModal = document.getElementById('message-modal');

const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const passwordError = document.getElementById('password-error');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

const scoreDisplay = document.getElementById('score-display');
const highscoreDisplay = document.getElementById('highscore-display');
const finalScore = document.getElementById('final-score');

const modalMilestone = document.getElementById('modal-milestone');
const modalText = document.getElementById('modal-text');

function verifyPassword() {
    // .toLowerCase() para que no importe si escribe Mayúsculas o Minúsculas
    const userPass = passwordInput.value.trim().toLowerCase();
    
    if (CORRECT_PASSWORDS.includes(userPass)) {
        passwordScreen.classList.remove('active');
        startScreen.classList.add('active');
    } else {
        passwordError.textContent = "Contraseña incorrecta. Inténtalo de nuevo.";
        passwordInput.value = "";
    }
}

// Event Listeners del Juego
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

    if (player.x < -player.width) player.x = canvas.width;
    if (player.x > canvas.width) player.x = -player.width;

    player.vy += gravity;
    player.y += player.vy;

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

    if (player.y < 260) {
        let diff = 260 - player.y;
        player.y = 260;

        score += Math.floor(diff);
        scoreDisplay.textContent = `${score} m`;

        if (score > highScore) {
            highScore = score;
            highscoreDisplay.textContent = `${highScore} m`;
        }

        platforms.forEach(p => {
            p.y += diff;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * (canvas.width - 70);
                p.type = Math.random() < 0.25 ? 'moving' : 'normal';
                p.vx = p.type === 'moving' ? (Math.random() < 0.5 ? 1.8 : -1.8) : 0;
            }
        });

        checkMilestones();
    }

    platforms.forEach(p => {
        if (p.type === 'moving') {
            p.x += p.vx;
            if (p.x <= 0 || p.x + p.width >= canvas.width) p.vx *= -1;
        }
    });

    particles.forEach((pt, index) => {
        pt.y += pt.vy;
        pt.alpha -= 0.03;
        if (pt.alpha <= 0) particles.splice(index, 1);
    });

    if (player.y > canvas.height + 50) {
        gameOver();
    }
}

// Dibujar en Canvas
function render() {
    ctx.fillStyle = '#0d0d11';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(199, 125, 255, 0.3)';
    ctx.fillRect(50, (score * 0.1) % canvas.height, 2, 2);
    ctx.fillRect(200, (score * 0.15 + 100) % canvas.height, 3, 3);
    ctx.fillRect(320, (score * 0.08 + 200) % canvas.height, 2, 2);

    platforms.forEach(p => {
        if (p.type === 'moving') {
            ctx.fillStyle = '#6b0504';
            ctx.strokeStyle = '#c77dff';
        } else {
            ctx.fillStyle = '#1b3b2b';
            ctx.strokeStyle = '#e0aaff';
        }

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(p.x, p.y, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();
    });

    particles.forEach(pt => {
        ctx.fillStyle = `rgba(199, 125, 255, ${pt.alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
    });

    drawPenguin(player.x, player.y, player.facing);
}

// Dibujar Pingüino
function drawPenguin(x, y, facing) {
    ctx.save();
    ctx.translate(x + player.width / 2, y + player.height / 2);
    if (facing === 'left') ctx.scale(-1, 1);

    ctx.fillStyle = '#111116';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 21, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(0, 3, 11, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#6b0504';
    ctx.fillRect(-12, -7, 24, 5);

    ctx.fillStyle = '#c77dff';
    ctx.beginPath();
    ctx.arc(6, -8, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.moveTo(10, -5);
    ctx.lineTo(17, -2);
    ctx.lineTo(10, 1);
    ctx.fill();

    ctx.restore();
}

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

function gameOver() {
    isPlaying = false;
    finalScore.textContent = `${score.toLocaleString()} m`;
    gameScreen.classList.remove('active');
    gameoverScreen.classList.add('active');
}

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
