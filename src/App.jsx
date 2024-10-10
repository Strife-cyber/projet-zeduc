import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './contexts/user_context';
import ConnexionPage from './pages/connexion/connexion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/accueil/accueil';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AccueilPage/>}/>
          <Route path='/login' element={<ConnexionPage/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
