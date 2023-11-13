import { useState, useEffect, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import './App.css';

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/members' element={<Member />} />
                    </Routes>
                </Router>
            </header>
        </div>
    );
       <Header/>
}

export default App;