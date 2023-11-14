import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Member.css';

function Member() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        const url = 'http://localhost:8080/members/new';
        e.preventDefault();
        axios
            .post(url, formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const goMain = () => {
        navigate('/');
    };
    return (
        <div className='joinform'>
            <form onSubmit={handleSubmit}>
               
                    <div className='text'>
                    <h1>회원가입하기</h1>
                    <h2>반가워요! :D</h2>
                    </div>
                   
                    <div>
                    <label>이메일:</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    </div>
                    <div>
                    <label>비밀번호:</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    </div>
                    <div>
                    <label>사용할 닉네임:</label>
                    <input
                        type='text'
                        name='nickname'
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                    </div>
    
                
                <div className='button'>
                <button type='submit'>가입하기</button>
                <button onClick={goMain} type='button'>
                    메인으로
                </button>
                </div>
            </form>
        </div>
    );
}

export default Member;
