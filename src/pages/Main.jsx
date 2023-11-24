import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import WriteList from './WriteList';
import './Main.css'



function Main() {

    const navigate = useNavigate();


    const goFindFriend = () => {
        navigate('/findfriend');
    }

    return (
        <div className='main'>
            <div className='fstvlapi'>
                <h1>축제 API자리</h1>
            </div>

            <div className='writelist'>
                <h2 className='more' onClick={goFindFriend}>more👉</h2>
            <WriteList />
            </div>
        
        </div>
    );
}

export default Main;
