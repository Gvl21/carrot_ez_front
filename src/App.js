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

function reducer(state, action) {
    switch (action.type) {
      case 'INIT' : {
        // localStorage에서 가져온 데이터로 상태를 변경
        return action.data;
      }
      case 'CREATE' : {
        // 데이터 배열에 새 데이터를 추가 (spread 연산자)
        const newState = [action.data, ...state];
        localStorage.setItem('diaryList', JSON.stringify(newState));
        return newState;
                // 새로운 데이터를   ...기존의 데이터에 추가
      }
      case 'UPDATE' : {
        // 기존 데이터 배열에서 id에 매칭되는 내용 수정 (삼항연산자 사용)
        const newState =  state.map((item)=> 
        String(item.id) === String(action.data.id) ?  { ...action.data } : item);
        localStorage.setItem('diaryList', JSON.stringify(newState));
        return newState;
        // (item) => (조건식) ? (참일 경우, id가 일치할경우) : item 
      }
      case 'DELETE' : {
        // 기존 데이터에서 id가 일치하지 않는 데이터만 남김 (filter)
        const newState = state.filter((item) => 
        String(item.id) !== String(action.id));
        localStorage.setItem('diaryList', JSON.stringify(newState));
        return newState;
      }
        default : {
        return state
        }
      }
    }
    export const StateContext = React.createContext();
    export const DispatchContext = React.createContext();

function App() {
    // 이미지 컨텍스트용 상태값
    const [images, setImages] = useState([]);

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
                        </Routes>
                    </Router>
                </ImagesContext.Provider>
            </StateContext.Provider>
        </div>
    );
}

export default App;
