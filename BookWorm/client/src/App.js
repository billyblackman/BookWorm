import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import ApplicationViews from './components/ApplicationViews';

function App() {
  return (
    <Router>
      <UserProvider>
        <ApplicationViews/>
      </UserProvider>
    </Router>
  );
}

export default App;
