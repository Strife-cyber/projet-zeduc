import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/accueil/accueil';
import InscriptionPage from './pages/inscription/inscription';
import NavBarComponent from './components/nav_bar/nav_bar';
import AllCardsComponent from './components/meal_card/all_cards';
import './App.css';
import HomeMobilePage from './pages/home/home_mobile';
import HomePage from './pages/home/home';
import PromotionPage from './pages/home/promotion';
import MemoryGame from './jeux/memory_match/component/memory_game';
import Quiz from './jeux/quiz/quiz_game';


function App() {
  return (
    <UserProvider>
      {/*<Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
          <Route path='/signup' element={<InscriptionPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
      </Router>*/}
    </UserProvider>
  );
}

export default App;
