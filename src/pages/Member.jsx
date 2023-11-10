import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        e.preventDefault();
        fetch('members/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'X-XSRF-TOKEN': ''
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                console.log(res);
                return res.text();
                //if (res.ok === true) {
                //  return res.text();
                //}
                //   throw new Error("에러 발생!");
            })
            .catch((error) => {
                alert(error);
            })
            .then((data) => {
                console.log(data);
            });
    };

    const goMain = () => {
        navigate('/');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>이메일:</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
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
                    <label>사용자 이름:</label>
                    <input
                        type='text'
                        name='nickname'
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>가입하기</button>
                <button onClick={goMain} type='button'>
                    메인으로
                </button>
            </form>
        </div>
    );
}

export default Member;
