import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import FindFriend from './FindFriend';

function Main() {
    return (
        <div>
            <h1>Main</h1>
            <div className='findfriend'>
                <FindFriend />
            </div>
        </div>
    );
}

export default Main;
