import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Member from './pages/Member';
import Main from './pages/Main';
import Header from './components/Header';
import './App.css';
import WriteList from './pages/WriteList';
import LogIn from './pages/LogIn';
import New from './pages/New';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { AuthProvider, useAuth } from './components/security/AuthContext';
import { apiClient } from './components/security/apiClient';
import FindFriend from './pages/FindFriend';

export const StateContext = React.createContext();

function App() {
    // 로그인 유저 상태 => null : 로그인 멤버가 없음
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [currentMember, setCurrentMember] = useState({
        nickname: '',
        imgUrl: '',
    });

    // 쿠키 상태
    const [cookies, setCookie, removeCookie] = useCookies();
    // const { setIsLoggedIn, setCurrentMember } = useAuth();

    // fnc : 유저가 토큰이 있을 때 받아올 유저의 정보
    const getSignInUserInfo = async (cookie) => {
        if (!cookie) {
            console.log('유저정보 없음');
            return;
        }
        // const url = `/members/info`;

        const getInfo = await apiClient
            .get(`members/info`)
            .then((res) => {
                const responseBody = res.data;
                console.log(responseBody);
                setCurrentMember({
                    nickname: responseBody.nickname,
                    imgUrl: responseBody.memberImageUrl,
                });

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
            apiClient.interceptors.request.clear();
            return;
        }

        // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
        apiClient.interceptors.request.use((config) => {
            console.log('인터셉터하여 헤더에 토큰 정보 추가');
            config.headers.Authorization = cookies.accessToken;
            return config;
        });
        getSignInUserInfo(cookies.accessToken);
        setIsLoggedIn(true);
    }, [cookies.accessToken]);

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
