import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import './Header.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import Member from '../pages/Member';
import { StateContext } from '../App';
import { useAuth } from './security/AuthContext';
import { onErrorImg } from './security/apiClient';

const HeaderBlock = styled.div`
    background-color: #ffbf7a;
    display: flex;
    flex-direction: column;
`;

function Header() {
    const { cookies, removeCookie, isLoggedIn, setIsLoggedIn, currentMember } =
        useContext(StateContext);

    // const { isLoggedIn, setIsLoggedIn, currentMember } = useAuth();
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
    const goMemberInfo = (email) => {
        navigate(`/members/${email}`);
    };
    const test = () => {};
    const goLogout = () => {
        removeCookie('accessToken');
        setIsLoggedIn(false);
        alert('잘가!');
        navigate('/');
    };

    // 수정 전 코드 -- 김형수
    // const LoginHeader = () => {
    //     if (isLoggedIn === null) {
    //         return (
    //             <div className='menu'>
    //                 <h2 onClick={goFindFriend}>친구찾기</h2>
    //                 <h2 onClick={goNew}>글쓰기</h2>
    //                 <h2 onClick={goLogin}>로그인</h2>
    //                 <h2 onClick={goNewMember}>회원가입</h2>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className='menu'>
    //                 <h2 onClick={goFindFriend}>친구찾기</h2>
    //                 <h2 onClick={goNew}>글쓰기</h2>
    //                 <h2 onClick={goLogout}>로그아웃</h2>
    //                 <h2>{currentMember}님,어서오세요</h2>
    //             </div>
    //         );
    //     }
    // };\

    useEffect(() => {}, [isLoggedIn]);

    return (
        <HeaderBlock>
            <div className='header'>
                <div className='logo'>
                    <h1 onClick={goMain}>당근이지🥕</h1>
                </div>
                <div className='menu'>
                    <h2 onClick={goFindFriend}>친구찾기</h2>
                    {!(isLoggedIn === false) && <h2 onClick={goNew}>글쓰기</h2>}
                    {isLoggedIn === false && <h2 onClick={goLogin}>로그인</h2>}
                    {isLoggedIn === false && (
                        <h2 onClick={goNewMember}>회원가입</h2>
                    )}
                    {!(isLoggedIn === false) && (
                        <h2 onClick={goLogout}>로그아웃</h2>
                    )}
                    {!(isLoggedIn === false) && (
                        <>
                            <img
                                className='profile-img'
                                src={
                                    currentMember.imgUrl ||
                                    '/images/carrotProfileImage.jpg'
                                }
                                alt='프로필'
                                onError={onErrorImg}
                                onClick={() =>
                                    goMemberInfo(currentMember.email)
                                }
                            />
                            <h2
                                onClick={() =>
                                    goMemberInfo(currentMember.email)
                                }
                            >
                                {currentMember.nickname}
                            </h2>
                        </>
                    )}
                </div>
            </div>
        </HeaderBlock>
    );
}

export default Header;
