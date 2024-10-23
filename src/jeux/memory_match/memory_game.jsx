import { useEffect, useState } from 'react';
import image1 from '../../assets/img-1.jpg';
import image2 from '../../assets/img-2.jpg';
import image3 from '../../assets/img-3.jpg';
import image4 from '../../assets/img-4.jpg';
import image5 from '../../assets/img-5.jpg';
import image6 from '../../assets/img-6.jpg';
import './memory_game.css';
import GameCard from './game_card';

const cardsData = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
    { id: 5, image: image5 },
    { id: 6, image: image6 }
].flatMap(card => [card, { ...card, id: card.id + 7 }]);

const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || Infinity);
    const [gameHistory, setGameHistory] = useState(JSON.parse(localStorage.getItem('gameHistory')) || []);

    // Shuffle cards and start timer when game initializes
    useEffect(() => {
        const shuffledCards = [...cardsData].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setStartTime(Date.now());
    }, []);

    useEffect(() => {
        // Check if the game is won
        if (matchedCards.length === cards.length && cards.length > 0) {
            const endTime = Date.now();
            const totalTime = Math.floor((endTime - startTime) / 1000); // Elapsed time in seconds
            setElapsedTime(totalTime);
            setGameWon(true);

            // Show the modal after winning
            if (!showModal) {
                setShowModal(true);
            }

            // Save high score
            if (totalTime < highScore) {
                setHighScore(totalTime);
                localStorage.setItem('highScore', totalTime);
            }

            // Save game history (keeping only the last 10 games)
            const newGameHistory = [...gameHistory, { time: totalTime, date: new Date().toLocaleString() }];
            if (newGameHistory.length > 10) newGameHistory.shift();
            setGameHistory(newGameHistory);
            localStorage.setItem('gameHistory', JSON.stringify(newGameHistory));
        }
    }, [matchedCards]);

    const handleCardClick = (card) => {
        if (flippedCards.length < 2 && !flippedCards.includes(card.id) && !matchedCards.includes(card.id)) {
            setFlippedCards((prev) => [...prev, card.id]);

            if (flippedCards.length === 1) {
                const firstCard = flippedCards[0];
                if (firstCard === card.id || firstCard === card.id + 7 || card.id === firstCard + 7) {
                    setMatchedCards((prev) => [...prev, firstCard, card.id]);
                    setFlippedCards([]);
                } else {
                    setTimeout(() => {
                        setFlippedCards([]);
                    }, 1000);
                }
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setGameWon(false);

        // Restart the game by reshuffling the cards and resetting the state
        const shuffledCards = [...cardsData].sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setMatchedCards([]);
        setFlippedCards([]);
        setElapsedTime(0);
        setStartTime(Date.now());
    };

    return (
        <div className='game-container'>
            <header className='game-header row'>
                <h1>Memory Game</h1>
                <p>Match all pairs to win!</p>
            </header>
            <div className='game-board'>
                <div className='memory-game'>
                    {cards.map((card) => (
                        <GameCard 
                            key={card.id} 
                            card={card} 
                            onClick={() => handleCardClick(card)} 
                            isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                        />
                    ))}
                </div>
                {gameWon && showModal && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <h2>Congratulations, You Win!</h2>
                            <p>Time: {elapsedTime} seconds</p>
                            {elapsedTime < highScore && <p>New High Score!</p>}
                            <h3>Last 10 Games:</h3>
                            <ul>
                                {gameHistory.map((game, index) => (
                                    <li key={index}>{game.date}: {game.time} seconds</li>
                                ))}
                            </ul>
                            <button onClick={handleModalClose}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemoryGame;
