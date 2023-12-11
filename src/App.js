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
import DetailPage from './pages/DetailPage';
import UpdatePage from './pages/UpdatePage';
import User from './pages/User';
import ChatRoom from './components/ChatRoom';

export const StateContext = React.createContext();
export const ImagesContext = React.createContext();
export const ArticleContext = React.createContext();

function App() {
    // 이미지 컨텍스트용 상태값
    const [images, setImages] = useState([]);
    const [postDetails, setPostDetails] = useState(null);

    // 로그인 유저 상태 => null : 로그인 멤버가 없음
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            return;
        }
        // const url = `/members/info`;

        const getInfo = await apiClient
            .get(`members/info`)
            .then((res) => {
                const responseBody = res.data;
                setCurrentMember({
                    email: responseBody.email,
                    nickname: responseBody.nickname,
                    imgUrl: responseBody.memberImageUrl,
                });

                return responseBody;
            })
            .catch((err) => {
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
            setIsLoggedIn(false);
            apiClient.interceptors.request.clear();
            return;
        }

        // axios 인터셉터 설정 등록 : 모든 API요청에 사용된다.
        apiClient.interceptors.request.use((config) => {
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
                <ArticleContext.Provider
                    value={{
                        postDetails,
                        setPostDetails,
                    }}
                >
                    <ImagesContext.Provider
                        value={{
                            images,
                            setImages,
                        }}
                    >
                        <Router>
                            <Header />
                            <Routes>
                                <Route
                                    path='/findfriend'
                                    element={<FindFriend />}
                                />
                                <Route path='/login' element={<LogIn />} />
                                <Route path='/new' element={<New />} />
                                <Route path='/' element={<Main />} />
                                <Route path='/members' element={<Member />} />
                                <Route
                                    path='/detail/:id'
                                    element={<DetailPage />}
                                />
                                <Route
                                    path='/update/:id'
                                    element={<UpdatePage />}
                                />
                                <Route
                                    path='/members/:email'
                                    element={<User />}
                                />
                                <Route
                                    path='/chatroom'
                                    element={<ChatRoom />}
                                />
                            </Routes>
                        </Router>
                    </ImagesContext.Provider>
                </ArticleContext.Provider>
            </StateContext.Provider>
        </div>
    );
}

export default App;
