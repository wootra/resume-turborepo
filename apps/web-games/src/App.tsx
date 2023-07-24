import { useState } from 'react';
import './App.css';
import SnakeGame from './games/SnakeGame';
function App() {
    const [game, setGame] = useState(null);
    return (
        <>
            <div style={{ width: '500px' }}>
                <ul className='game-selector'>
                    <li>
                        <button onClick={() => setGame('snake-game')}>
                            Snake Game
                        </button>
                    </li>
                </ul>
                <div className='game-container'>
                    {game === 'snake-game' && <SnakeGame />}
                </div>
            </div>
        </>
    );
}

export default App;
