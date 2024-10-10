import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConnexionDesktopPage from './pages/connexion/connexion_desktop';
import { UserProvider } from './contexts/user_context';

function App() {
  return (
    <UserProvider>
      <ConnexionDesktopPage/>
    </UserProvider>
  );
}

export default App;
