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
                <h1>각 지역 축제</h1>

                <h3>기장 멸치축제</h3>
                <a>기장군</a>
                <a>00.00.00~00.00.00</a>

                <h3>기장 멸치축제</h3>
                <a>기장군</a>
                <a>00.00.00~00.00.00</a>

                <h3>기장 멸치축제</h3>
                <a>기장군</a>
                <a>00.00.00~00.00.00</a>

                <h3>기장 멸치축제</h3>
                <a>기장군</a>
                <a>00.00.00~00.00.00</a>

            </div>

            <div className='writelist'>
                <h2 className='more' onClick={goFindFriend}>more👉</h2>
            <WriteList />
            </div>
        
        </div>
    );
}

export default Main;
