import { useState, useEffect, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import './App.css';
import FindFriend from './pages/FindFriend';
import LogIn from './pages/LogIn';
import Write from './pages/Write';


function App() {

  const [msg, setMsg] = useState('');
  const [newMember, setNewMember] = useState('');
  
    return (
        <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path='/findfriends' element={<FindFriend />} />
          <Route path='/login' element={<LogIn />} />
          <Route Path='/write' element={<Write />} />
          <Route path='/' element={<Main />} />
          <Route path='/members' element={<Member />} />
        </Routes>
      </Router>
  
      </div>
    )
}

export default App;
