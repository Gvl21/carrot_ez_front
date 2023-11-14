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
  const navigate = useNavigate();
  const goNewMember = () => {
     navigate('/members');
  };

 
  return (
    <HeaderBlock>
        <div className='header'>
        <div className='logo'>
        <h1>당근이지🥕</h1>
        </div>
        <div className='menu'>        
        <h2>친구찾기</h2>
        <h2>글쓰기</h2>
        <h2>로그인</h2>
        <h2 onclick={goNewMember}>회원가입</h2>
        </div>
        </div>
    </HeaderBlock>


  )
}

export default Header;