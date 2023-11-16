import { useState, useEffect, React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import './App.css';
import FindFriend from './pages/FindFriend';
import LogIn from './pages/LogIn';
import New from './pages/New';


function App() {

  const [msg, setMsg] = useState('');
  const [newMember, setNewMember] = useState('');

  
    return (
        <div className="App">
    
      <Router>
      <Header />
        <Routes>
          <Route path='/findfriend' element={<FindFriend />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/new' element={<New />} />
          <Route path='/' element={<Main />} />
          <Route path='/members' element={<Member />} />
        </Routes>
      </Router>
      


      </div>
    )
}

export default App;
