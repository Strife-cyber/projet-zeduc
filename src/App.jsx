import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/accueil/accueil';
import InscriptionPage from './pages/inscription/inscription';
import './App.css';
import NavBarComponent from './components/nav_bar/nav_bar';

function App() {
  return (
    <UserProvider>
      {/*
      <Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
          <Route path='/signup' element={<InscriptionPage/>}/>
        </Routes>
      </Router>*/}
      <NavBarComponent/>
    </UserProvider>
  );
}

export default App;
