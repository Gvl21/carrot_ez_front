import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StateContext } from '../App';
import New from './New';
import { signInApi } from '../components/security/apiClient';

function Login() {
    const navigate = useNavigate();
    // 쿠키 stateContext에 담아 설정하기 --김형수
    const { cookies, setCookie } = useContext(StateContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 간단한 유효성 검사
        if (!formData.email || !formData.password) {
            alert('이메일과 비밀번호를 입력하세요.');
            return;
        }

        // 로그인 처리하ㄱㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ
        const response = await signInApi(formData);
        console.log(response);
        const loginResult = response.data;
        if (loginResult.message === 'Success.') {
            alert('로그인 완료');
            signInResponse(loginResult);
            return loginResult;
        } else {
            alert('로그인 실패');
            console.log(loginResult);
            if (!loginResult) return null;
            const responseBody = loginResult;
            return responseBody;
        }

        /**
         * 이전에 김형수가 짠 코드
         */
        // axios
        //     .post(url, formData)
        //     .then((res) => {
        //         alert('로그인 완료');
        //         navigate('/');
        //         console.log(res.data);
        //     })
        //     .catch((error) => {
        //         alert(error.response.data);
        //     });

        // 로그인이 성공하면 부모 컴포넌트로 성공 여부를 전달할 수 있습니다. - 이거 추가해서 로그인 중인지 추가여부를 확인할 코드가 필요할거같긴한데 일단 어케써볼지 생각해바야할거같아요 --김형수
        // onLogin(true);
        return loginResult;
    };
    const signInResponse = (responseBody) => {
        if (!responseBody) {
            alert('네트위크 이상입니다.');
            return;
        }
        const { token, expirationTime } = responseBody;
        const now = new Date().getTime();
        const expires = new Date(now + expirationTime * 1000);

        // setCookie('accessToken', token, { expires, path: '/' });
        setCookie('accessToken', 'Bearer ' + token, { expires, path: '/' });

        navigate('/');
    };

    const goMember = () => {
        navigate('/members');
    };

    return (
        <form onSubmit={handleSubmit} className='loginform'>
            <div className='welcometext'>
                <h1>🥕로그인🥕</h1>
                <h2>어서오세요!:D</h2>
            </div>

            <div className='email_pw'>
                <label>
                    이메일
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>

                <br />

                <label>
                    비밀번호
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
            </div>

            <button type='submit' className='loginbutton'>
                로그인
            </button>
            <h4 onClick={goMember} className='gosignin'>
                아직 회원이 아니신가요?
            </h4>
        </form>
    );
}

export default Login;
