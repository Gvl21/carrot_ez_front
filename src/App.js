import { useState, useEffect, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import fest from './pages/fest';
import './App.css';

function App() {
    return (
        <div className="App">
      <Header />
      </div>
    )
}

export default App;