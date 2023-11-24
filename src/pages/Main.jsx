import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import WriteList from './WriteList';
import './Main.css'

function Main() {
    return (
        <div className='main'>
            <div className='fstvlapi'>
                <h1>축제 API자리</h1>
            </div>
            <div className='writelist'>
            <WriteList />
            </div>
        
        </div>
    );
}

export default Main;
