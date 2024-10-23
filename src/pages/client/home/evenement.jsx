import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MemoryGame from '../../../jeux/memory_match/memory_game';
import Quiz from '../../../jeux/quiz/quiz_game';

const EventsPage = () => {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    // Fetch all events on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/projet-zeduc/index.php/admin/get_all_events');
        setEvenements(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to determine the game display based on the event's game number
  const displayGame = (gameNumber) => {
    switch (gameNumber) {
      case 1:
        return <MemoryGame/>;
      case 2:
        return <Quiz/>;
      case 3:
        return 'Game: Basketball';
      default:
        return 'Game: Not Specified';
    }
  };

  return (
    <div style={{minWidth: '290px', width: '70%', margin: '10%'}}>
      <h1 style={{textAlign: 'center', color: '#cfbd97'}}>Evenements</h1>
      <section className="event-section" style={{marginTop: '30px'}}>
        {evenements.length > 0 ? (
          evenements.map((event) => (
            <div key={event.id_evenement} style={{backgroundColor: '#000000', color: '#cfbd97', borderRadius: '8px', padding: '15px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}} className="event-item">
              <h3 className='text-center' style={{fontFamily: 'Montaga, serif', fontSize: '2.5rem'}}>{event.title}</h3>
              <p className='text-center' style={{fontSize: '1.5rem'}}>{event.description}</p>
              <div className="game-display" style={{marginTop: '10px', fontSize: '1.2rem', color: '#ffffff', backgroundColor: '#333333', padding: '10px', borderRadius: '4px', textAlign: 'center'}}>
                {displayGame(event.jeux)} {/* Display the game based on the 'jeux' number */}
              </div>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
