import React, { useEffect, useState } from 'react';
import useGestion from '../../utilities/admin/gestion';
import './AdminManagementPage.css';

const AdminManagementPage = () => {
  const { 
    getAllEvenements, 
    deleteEvenementById, 
    getAllPromotions, 
    deletePromotionById, 
    InsertEvenement,
    InsertPromotion
  } = useGestion();

  const [evenements, setEvenements] = useState([]);
  const [promotions, setPromotions] = useState([]);
  
  // State for new event and promotion input
  const [newEvent, setNewEvent] = useState({ title: '', description: '', jeux: '' });
  const [newPromotion, setNewPromotion] = useState({ debut: '', fin: '', description: '' });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await getAllEvenements();
        setEvenements(fetchedEvents);
        const fetchedPromotions = await getAllPromotions();
        setPromotions(fetchedPromotions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvenementById(id);
      setEvenements(evenements.filter(event => event.id_evenement !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDeletePromotion = async (id) => {
    try {
      await deletePromotionById(id);
      setPromotions(promotions.filter(promotion => promotion.id_promotion !== id));
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const handleInsertEvent = async (e) => {
    e.preventDefault();
    try {
      await InsertEvenement(newEvent.title, newEvent.description, newEvent.jeux);
      setNewEvent({ title: '', description: '', jeux: '' });
    } catch (error) {
      console.error('Error inserting event:', error);
    }
  };

  const handleInsertPromotion = async (e) => {
    e.preventDefault();
    try {
      await InsertPromotion('user003', newPromotion.debut, newPromotion.fin, newPromotion.description);
      setNewPromotion({ debut: '', fin: '', description: '' });
    } catch (error) {
      console.error('Error inserting promotion:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1 style={{margin: '0'}}>Admin Management</h1>

      <section className="event-section">
        <h2 style={{marginTop: '20%', fontFamily: 'Montaga', fontSize: '40px'}}>Manage Events</h2>
        <form onSubmit={handleInsertEvent} className="admin-form">
          <input 
            type="text" 
            placeholder="Event Title" 
            value={newEvent.title} 
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
            required 
          />
          <textarea 
            placeholder="Event Description" 
            value={newEvent.description} 
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} 
            required
          />
          <input 
            type="text" 
            placeholder="Game (Jeux)" 
            value={newEvent.jeux} 
            onChange={(e) => setNewEvent({ ...newEvent, jeux: e.target.value })} 
            required
          />
          <button type="submit" className="submit-btn">Add Event</button>
        </form>

        <ul>
          {evenements.map((event) => (
            <li key={event.id_evenement} className="event-item">
              <h3>{event.title}</h3>
              <p style={{color: 'white'}}>{event.description}</p>
              <button className="delete-btn" onClick={() => handleDeleteEvent(event.id_evenement)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="promotion-section">
        <h2 style={{marginTop: '20%', fontFamily: 'Montaga', fontSize: '40px'}}>Manage Promotions</h2>
        <form onSubmit={handleInsertPromotion} className="admin-form">
          <input 
            type="date" 
            value={newPromotion.debut} 
            onChange={(e) => setNewPromotion({ ...newPromotion, debut: e.target.value })} 
            required 
          />
          <input 
            type="date" 
            value={newPromotion.fin} 
            onChange={(e) => setNewPromotion({ ...newPromotion, fin: e.target.value })} 
            required 
          />
          <textarea 
            placeholder="Promotion Description" 
            value={newPromotion.description} 
            onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })} 
            required 
          />
          <button type="submit" className="submit-btn">Add Promotion</button>
        </form>

        <ul>
          {promotions.map((promotion) => (
            <li key={promotion.id_promotion} className="promotion-item">
              <h3>{promotion.description}</h3>
              <p style={{color: 'white'}}>Start: {promotion.date_debut}</p>
              <p style={{color: 'white'}}>End: {promotion.date_fin}</p>
              <button className="delete-btn" onClick={() => handleDeletePromotion(promotion.id_promotion)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminManagementPage;
