import './game_card.css';

const GameCard = ({ card, onClick, isFlipped }) => {
    return (
        <div className={`card-my ${!isFlipped ? 'flipped' : ''}`} onClick={onClick}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={card.image} className='game-card-image' alt="Card" />
                </div>
                <div className="card-back">
                    ?
                </div>
            </div>
        </div>
    )
}

export default GameCard;
