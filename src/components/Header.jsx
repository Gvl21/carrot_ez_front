import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import './Header.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import Member from '../pages/Member';
import { StateContext } from '../App';

const HeaderBlock = styled.div`
    background-color: #ffbf7a;
    display: flex;
    flex-direction: column;
`;

function Header() {
    const { cookies, isLoggedIn, setIsLoggedIn, removeCookie, currentMember } =
        useContext(StateContext);
    const navigate = useNavigate();
    useEffect(() => {}, [cookies.accessToken]);

    const goMain = () => {
        navigate('/');
    };
    const goFindFriend = () => {
        navigate('/findfriend');
    };
    const goNew = () => {
        navigate('/new');
    };
    const goLogin = () => {
        navigate('/login');
    };
    const goNewMember = () => {
        navigate('/members');
    };
    const test = () => {};
    const goLogout = () => {
        removeCookie('accessToken');
        setIsLoggedIn(null);
        alert('잘가!');
        navigate('/');
    };
    const LoginHeader = () => {
        if (isLoggedIn === null) {
            return (
                <div className='menu'>
                    <h2 onClick={goFindFriend}>친구찾기</h2>
                    <h2 onClick={goNew}>글쓰기</h2>
                    <h2 onClick={goLogin}>로그인</h2>
                    <h2 onClick={goNewMember}>회원가입</h2>
                </div>
            );
        } else {
            return (
                <div className='menu'>
                    <h2 onClick={goFindFriend}>친구찾기</h2>
                    <h2 onClick={goNew}>글쓰기</h2>
                    <h2 onClick={goLogout}>로그아웃</h2>
                    <h2>{currentMember}님,어서오세요</h2>
                </div>
            );
        }
    };

    useEffect(() => {}, [isLoggedIn]);

    return (
        <HeaderBlock>
            <div className='header'>
                <div className='logo'>
                    <h1 onClick={goMain}>당근이지🥕</h1>
                </div>
                <LoginHeader />
            </div>
        </HeaderBlock>
    );
}

export default Header;
