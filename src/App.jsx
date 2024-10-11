import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/accueil/accueil';
import InscriptionPage from './pages/inscription/inscription';
import PaymentSheetComponent from './components/payment_sheet/payment_sheet';
import './App.css';
import MealCardComponent from './components/meal_card/meal_card';

function App() {
  return (
    /*<UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
          <Route path='/signup' element={<InscriptionPage/>}/>
        </Routes>
      </Router>
    </UserProvider>*/
    <MealCardComponent/>
  );
}

export default App;
