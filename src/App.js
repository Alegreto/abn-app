import React from 'react';
import Header from './components/Header/Header';
import Router from './Router';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="app-content">
      <Router/>
      </div>
    </div>
  );
}

export default App;
