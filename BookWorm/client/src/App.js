import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import ApplicationViews from './components/ApplicationViews';
import Header from './components/Header';
import { GoogleBookProvider } from './providers/GoogleBookProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <GoogleBookProvider>
          <Header />
          <ApplicationViews/>
        </GoogleBookProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
