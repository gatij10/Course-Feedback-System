import React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    
    <div >
    <CssBaseline/>
    <Navbar/>
      <Router>
        <Routes/>
      </Router>
    </div>
    
  );
}

export default App;
