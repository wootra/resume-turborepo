import { Snake } from './snake';
import { Food } from './food';
import {
    APPLES_TO_EAT,
    GRID_SIZE,
    SPEED,
    STAGE_SPEED_MULTIPLIER,
} from './constants';

// /**
//  * @type {HTMLCanvasElement}
//  */
let canvas; // = document.getElementById('snake-game-canvas');
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx; // = canvas.getContext('2d');
let onGameOver;
/**
 * @type {Snake}
 */
let snake;
/**
 * @type {Food}
 */
let food;
let score;
let stage;
let speed;
let applesToEat;
let applesAte;
let scorePerApple;
let lastUpdate;
let isGameOver = false;

function init(canvasToSet) {
    if (canvasToSet) {
        canvas = canvasToSet;
    }
    ctx = canvas.getContext('2d');
    const stageSize = {
        width: Math.floor(canvas.width / GRID_SIZE),
        height: Math.floor(canvas.height / GRID_SIZE),
    };

    snake = new Snake(
        stageSize,
        { x: stageSize.width / 2, y: stageSize.height / 2 },
        'up'
    );
    food = new Food(stageSize);
    score = 0;
    stage = 1;
    speed = SPEED;
    applesAte = 0;
    applesToEat = APPLES_TO_EAT;
    scorePerApple = 1;
    lastUpdate = performance.now();
    isGameOver = false;
    window.addEventListener('keydown', keyDownEventHandler);
}

function update() {
    lastUpdate = performance.now();
    snake.update();
    if (snake.collidesWithFood(food.position)) {
        snake.grow();
        food.spawn();
        score += scorePerApple;
        applesAte++;
        if (applesAte === applesToEat) {
            applesAte = 0;
            applesToEat++;
            scorePerApple++;
            stage++;
            snake.lengthReset(stage + 3);
            speed *= STAGE_SPEED_MULTIPLIER;
            speed = Math.floor(speed);
        }
    }
    if (snake.collidesWithWall()) {
        gameOver('You hit a wall!');
    }

    if (snake.collidesWithSelf()) {
        gameOver('You hit yourself!');
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';

    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Stage: ${stage}`, 10, 60);
    ctx.fillText(
        `apples to eat: ${applesToEat - applesAte}/${applesToEat}`,
        10,
        90
    );

    ctx.fillStyle = 'green';
    snake.render(ctx);
    ctx.fillStyle = 'red';
    food.render(ctx);
}

function gameOver(reason) {
    // Game over logic
    isGameOver = true;
    window.removeEventListener('keydown', keyDownEventHandler);
    if (onGameOver) {
        onGameOver(score, reason);
    } else {
        alert(`Game Over! ${reason} - Score: ${score}`);
        init();
    }
}

function gameLoop() {
    if (isGameOver) return;
    const now = performance.now();
    const past = now - lastUpdate;
    if (past > speed) update();
    render();
    requestAnimationFrame(gameLoop);
}

const keyDownEventHandler = e => {
    switch (e.key) {
        case 'ArrowUp':
            snake.changeDirection('up');
            break;
        case 'ArrowDown':
            snake.changeDirection('down');
            break;
        case 'ArrowLeft':
            snake.changeDirection('left');
            break;
        case 'ArrowRight':
            snake.changeDirection('right');
            break;
    }
};

export const mountGame = (canvas, onGameOverCallback) => {
    init(canvas);
    onGameOver = onGameOverCallback;
    gameLoop();
};

export const unmountGame = () => {};

export const restartGame = () => {
    init();
    gameLoop();
};
