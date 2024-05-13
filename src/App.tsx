import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import HomePage from './components/pages/HomePage';
import PageNotFound from './components/pages/PageNotFound';
import GamesRouter from './components/routers/GamesRouter';

function App() {
  return (
    <div className="App">
      <header className="main-page-header">

      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/games/*" element={<GamesRouter />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </Router>
      <footer className="main-page-footer">
        Open source product, please use any way you please {":)"}
      </footer>
    </div>
  );
}

export default App;
