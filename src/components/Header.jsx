import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../App';
import { baseUrl, onErrorImg } from './security/apiClient';

const HeaderBlock = styled.div`
    background-color: #ffbf7a;
    display: flex;
    flex-direction: column;
`;

function Header() {
    const [imageReady, setImageReady] = useState(null);
    const { cookies, removeCookie, isLoggedIn, setIsLoggedIn, currentMember } =
        useContext(StateContext);

    const navigate = useNavigate();

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

    useEffect(() => {}, [isLoggedIn]);
    useEffect(() => {
        if (currentMember.imgUrl !== '') {
            setImageReady(baseUrl + currentMember.imgUrl);
        }
    }, [currentMember.imgUrl]);
    useEffect(() => {}, [cookies.accessToken]);
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
                            {imageReady && (
                                <img
                                    className='profile-img'
                                    src={imageReady}
                                    alt='프로필'
                                    onError={onErrorImg}
                                    onClick={() =>
                                        goMemberInfo(currentMember.email)
                                    }
                                />
                            )}

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
