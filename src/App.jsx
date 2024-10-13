import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/client/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/client/accueil/accueil';
import InscriptionPage from './pages/client/inscription/inscription';
import NavBarComponent from './components/nav_bar/nav_bar';
import AllCardsComponent from './components/meal_card/all_cards';
import HomeMobilePage from './pages/client/home/home_mobile';
import HomePage from './pages/client/home/home';
import PromotionPage from './pages/client/home/promotion';
import MemoryGame from './jeux/memory_match/component/memory_game';
import Quiz from './jeux/quiz/quiz_game';
import Manager from './pages/manager/manager';
import TableComponent from './components/table/table';
import './App.css';
import EmployerTableComponent from './components/table/employer_table';
import NavEmployerComponent from './components/nav_bar/nav_employer';
import HomeEmployerPage from './pages/employer/home_employer';
import FoodAdderComponent from './components/food_adder/food_adder';

function App() {
  return (
    <UserProvider>
      {/*<Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
          <Route path='/signup' element={<InscriptionPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/manager' element={<Manager/>}/>
        </Routes>
      </Router>*/}
      <HomeEmployerPage/>
    </UserProvider>
  );
}

export default App;
