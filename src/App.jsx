import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/client/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/client/accueil/accueil';
import InscriptionPage from './pages/client/inscription/inscription';
import HomePage from './pages/client/home/home';
import Manager from './pages/manager/manager';
import HomeEmployerPage from './pages/employer/home_employer';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
          <Route path='/signup' element={<InscriptionPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/manager' element={<Manager/>}/>
          <Route path='/home_employer' element={<HomeEmployerPage/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
