import { useCallback, useEffect, useRef, useState } from 'react';
import { mountGame, unmountGame, restartGame } from './game';
import './index.css';

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const dialogButtonRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameOverState, setGameOverState] = useState({
        score: 0,
        reason: '',
    }); // ['win', 'lose'
    const { score, reason } = gameOverState;
    const setGameOver = useCallback(
        (score, reason) => {
            setIsGameOver(true);
            setGameOverState({ score, reason });
            setTimeout(() => {
                dialogButtonRef.current?.focus();
            }, 200);
        },
        [setIsGameOver]
    );
    const onRestart = useCallback(() => {
        restartGame();
        setIsGameOver(false);
        setGameOverState({ score: 0, reason: '' });
    }, [setIsGameOver]);
    useEffect(() => {
        if (canvasRef.current) {
            console.log('loading game...', canvasRef.current);
            mountGame(canvasRef.current, setGameOver);
        } else {
            console.log('canvasRef.current is null');
        }
        return () => {
            unmountGame();
        };
    }, []);

    return (
        <div
            style={{
                width: '400px',
                height: '400px',
            }}
            id='snake-game-container'
        >
            <canvas
                ref={canvasRef}
                id='snake-game-canvas'
                width='400'
                height='400'
                style={{
                    width: '400px',
                    height: '400px',
                }}
            ></canvas>
            <dialog id='gameOverDialog' open={isGameOver}>
                <p id='gameOverText'>Game Over!</p>
                <p>score: {score}</p>
                <p>{reason}</p>
                <button ref={dialogButtonRef} onClick={onRestart}>
                    Restart
                </button>
            </dialog>
        </div>
    );
};

export default SnakeGame;
