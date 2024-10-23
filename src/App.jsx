import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/client/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/client/accueil/accueil';
import InscriptionPage from './pages/client/inscription/inscription';
import HomePage from './pages/client/home/home';
import Manager from './pages/manager/manager';
import HomeEmployerPage from './pages/employer/home_employer';
import HomeGerantPage from './pages/gerant/home_gerant';
import SecurityQuestions from './pages/client/security/security_questions';
import ForgotPassword from './pages/client/security/forgot_password';
import { PanierProvider } from './contexts/panier_context';
import CartModal from './components/nav_modals/cart_modal';

function App() {
  return (
    <UserProvider>
      <PanierProvider>
        <Router>
          <Routes>
            <Route path='/' element={<AccueilPage/>}/>
            <Route path='/login' element={<ConnexionPage/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
            <Route path='/signup' element={<InscriptionPage/>}/>
            <Route path='/questions' element={<SecurityQuestions/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/manager' element={<Manager/>}/>
            <Route path='/home_employer' element={<HomeEmployerPage/>}/>
            <Route path='/home_gerant' element={<HomeGerantPage/>} />
          </Routes>
        </Router>
      </PanierProvider>
    </UserProvider>
  );
}

export default App;
