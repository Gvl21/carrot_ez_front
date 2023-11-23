import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import './App.css';
import FindFriend from './pages/FindFriend';
import LogIn from './pages/LogIn';
import New from './pages/New';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export const StateContext = React.createContext();

function App() {
    // 로그인 유저 상태 => null : 로그인 멤버가 없음
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentMember, setCurrentMember] = useState('');

    // 쿠키 상태
    const [cookies, setCookie, removeCookie] = useCookies();
    // const { setIsLoggedIn, setCurrentMember } = useAuth();

    // fnc : 유저가 토큰이 있을 때 받아올 유저의 정보
    const getSignInUserInfo = async (cookie) => {
        if (!cookie) {
            console.log('유저정보 없음');
            return;
        }
        const url = 'http://localhost/members/info';

        const getInfo = await axios
            .get(url, {
                headers: { Authorization: `Bearer ${cookie}` },
            })
            .then((res) => {
                const responseBody = res.data;
                console.log(responseBody);
                setCurrentMember(responseBody.nickname);
                return responseBody;
            })
            .catch((err) => {
                console.log(err.message);
                if (!err.message) return null;
                const responseBody = err.message;
                return responseBody;
            });
        // setIsLoggedIn(loginMember);
        return getInfo;
    };

    // effect : accessToken cookie 값이 변경될 때 마다 실행할 함수
    useEffect(() => {
        if (!cookies.accessToken) {
            setIsLoggedIn(null);
            return;
        }
        getSignInUserInfo(cookies.accessToken);
        setIsLoggedIn(true);
    }, [cookies.accessToken]);

    const [msg, setMsg] = useState('');
    const [newMember, setNewMember] = useState('');
    return (
        <div className='App'>
            <StateContext.Provider
                value={{
                    cookies,
                    setCookie,
                    removeCookie,
                    isLoggedIn,
                    setIsLoggedIn,
                    currentMember,
                    setCurrentMember,
                }}
            >
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
            </StateContext.Provider>
        </div>
    );
}

export default App;
