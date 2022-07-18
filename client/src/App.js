import './App.css';
// import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
// import { Route, Switch } from "react-router";
import LandingPage from './components/LandingPage';
import Home from './components/Home';

function App() {   
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/character' component = {CharacterCreate} />
          <Route path='/home/:id' component={Detail} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


/**
 * 1º importamos BrowserRouter, Route y Switch
 * 2º englobamos lo que tiene la función App() con <BrowserRouter>
 * 
 * 3º creamos nuestro archivo de acciones src/actions/index.js , y los archivos componentes src/compnents/
 * Card.jsx , CharacterCreate.jsx, Detail.jsx, Home.jsx, LandingPage.jsx, Paginado.jsx, SearchBar.jsx
 * 3.1º Luego modifico LandinPage.jsx
 */
