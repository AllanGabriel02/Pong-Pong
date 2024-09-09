const playButton = document.getElementById('playButton');
const instructionsButton = document.getElementById('instructionsButton');
const instructions = document.getElementById('instructions');
const closeInstructions = document.getElementById('closeInstructions');
const menu = document.getElementById('menu');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let paddleHeight = 100, paddleWidth = 10, ballSize = 10;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 3, ballSpeedY = 3
let computerSpeed = 3;
let ballSpeedIncrease = 1.9;

let playerScore = 0;
let computerScore = 0;
let maxScore = 10;  // Pontuação para vencer

canvas.width = 800;
canvas.height = 400;

const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const scoreBoard = document.getElementById('score');

function startGame() {
    menu.style.display = 'none';
    canvas.style.display = 'block';
    scoreBoard.style.display = 'block';
    resetBall();
    requestAnimationFrame(gameLoop);
}

function showInstructions() {
    instructions.style.display = 'flex';
    menu.style.display = 'none';
}

function closeInstructionScreen() {
    instructions.style.display = 'none';
    menu.style.display = 'flex';
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;
    ballSpeedY = 4;
}

function gameLoop() {
    moveBall();
    moveComputerPaddle();
    drawEverything();
    checkScore();
    requestAnimationFrame(gameLoop);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < paddleWidth) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            computerScore++;
            resetBall();
        }
    } else if (ballX > canvas.width - paddleWidth) {
        if (ballY > computerPaddleY && ballY < computerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            resetBall();
        }
    }
}

function moveComputerPaddle() {
    const difficultyFactor = 1.2; // Controla a velocidade do robô

    // Definir a área onde o robô começa a seguir a bola (por exemplo, nos últimos 30% da tela)
    const threshold = canvas.width * 0.5;

    // O robô só segue a bola se a bola estiver na sua área (próxima ao lado direito da tela)
    if (ballX > threshold) {
        if (computerPaddleY + paddleHeight / 2 < ballY - 35) {
            computerPaddleY += computerSpeed * difficultyFactor;
        } else if (computerPaddleY + paddleHeight / 2 > ballY + 35) {
            computerPaddleY -= computerSpeed * difficultyFactor;
        }
    }
}

function drawEverything() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2, false);
    ctx.fillStyle = 'white';
    ctx.fill();

    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function checkScore() {
    if (playerScore >= maxScore) {
        alert("Você venceu!");
        endGame();
    } else if (computerScore >= maxScore) {
        alert("O computador venceu!");
        endGame();
    }
}

function endGame() {
    playerScore = 0;
    computerScore = 0;
    resetBall();
    canvas.style.display = 'none';
    scoreBoard.style.display = 'none';
    menu.style.display = 'flex';
}

// Controles do jogador
window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        playerPaddleY -= 20;
    } else if (event.key === 'ArrowDown') {
        playerPaddleY += 20;
    }
});

// Botões
playButton.addEventListener('click', startGame);
instructionsButton.addEventListener('click', showInstructions);
closeInstructions.addEventListener('click', closeInstructionScreen);
