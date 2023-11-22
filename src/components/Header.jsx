import React from 'react'
import styled from 'styled-components';
import './Header.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Main from '../pages/Main';
import Member from '../pages/Member';


const HeaderBlock = styled.div`
    background-color: #ffbf7a;
    display: flex;
    flex-direction: column;
    `


function Header() {
  // context에서 인증 정보를 받아와서 인증 여부에 따라 렌더링을 다르게 함.

  const navigate = useNavigate();

  const goMain = () => {
    navigate('/');
  }
  const goFindFriend = () => {
    navigate('/findfriend');
  }
  const goNew = () => {
    navigate('/new');
  }
  const goLogin = () => {
    navigate('/login');
  }
  const goNewMember = () => {
    navigate('/members');
 };



 
  return (
    <HeaderBlock>
        <div className='header'>
        <div className='logo'>
        <h1 onClick={goMain}>당근이지🥕</h1>
        </div>
        <div className='menu'>        
        <h2 onClick={goFindFriend}>친구찾기</h2>
        <h2 onClick={goNew}>글쓰기</h2>
        <h2 onClick={goLogin}>로그인</h2>
        <h2 onClick={goNewMember}>회원가입</h2>
        </div>
        </div>
    </HeaderBlock>


  )
}

export default Header;