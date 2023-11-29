import { createSignal, onCleanup, onMount, useTransition } from 'solid-js';
import { mountGame, unmountGame, restartGame } from './game';

type GameOverState = {
    score: number;
    reason: string;
};
const SnakeGame = () => {
    const [isGameOver, setIsGameOver] = createSignal(false);
    const [gameOverState, setGameOverState] = createSignal<GameOverState>({
        score: 0,
        reason: '',
    }); // ['win', 'lose'
    const setGameOver = (score: any, reason: any) => {
        setIsGameOver(true);
        setGameOverState({ score, reason });
        const restartBtn = document.getElementById('restart-button');
        restartBtn?.focus();
    };
    const onRestart = () => {
        restartGame();
        setIsGameOver(false);
        setGameOverState({ score: 0, reason: '' });
    };

    onMount(() => {
        const canvas = document.getElementById('snake-game-canvas');
        if (canvas) {
            mountGame(canvas, setGameOver);
        }
    });
    onCleanup(() => {
        unmountGame();
    });

    return (
        <div class='relative w-[400px] h-[400px]'>
            <canvas
                id='snake-game-canvas'
                width='400'
                height='400'
                class='relative w-[400px] h-[400px] bg-black'
            ></canvas>
            <dialog
                open={isGameOver()}
                class={`absolute inset-0 p-4 flex flex-col gap-2 ${
                    isGameOver() ? '' : 'hidden'
                }`}
            >
                <p id='gameOverText'>Game Over!</p>
                <p>score: {gameOverState().score}</p>
                <p>{gameOverState().reason}</p>
                <button id='restart-button' onClick={onRestart}>
                    Restart
                </button>
            </dialog>
        </div>
    );
};

export default SnakeGame;
