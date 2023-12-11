import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Member.css';
import { apiClient } from '../components/security/apiClient';

function Member() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
        area: '',
        category: '',
        profileImage: null,
    });
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'profileImage') {
            const file = e.target.files[0];

            // 파일을 선택했을 때
            setFormData({
                ...formData,
                [name]: file,
                profileImagePreview: URL.createObjectURL(file),
            });
        } else {
            // 파일 이외의 입력 값은
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 4 || formData.password.length > 16) {
            alert('비밀번호는 최소 4자, 최대 16자로 입력해주세요');
            setFormData({ ...formData, password: '' });
            return;
        }
        if (formData.area === '') {
            alert('거주 지역을 선택해주세요');
            return;
        }
        const url = '/members/new';

        // 새 폼 데이터를 전송하기 위한 폼
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        // 수정사항 기존의 formData에서 data로 body를 교체

        apiClient
            .post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                alert(`${formData.nickname}님 환영합니다!`);
                navigate('/login');
            })
            .catch((error) => {
                alert('중복된 이메일입니다.');
            });
    };

    const goMain = () => {
        navigate('/');
    };
    return (
        <div className='joinform'>
            <form onSubmit={handleSubmit}>
                <div className='text'>
                    <h1>🥕회원가입하기🥕</h1>
                    <h2>반가워요! :D</h2>
                </div>

                <div className='userinput'>
                    <label>지역</label>
                    <select
                        name='area'
                        value={formData.area}
                        onChange={handleChange}
                        className='areaselect'
                    >
                        <option value=''>선택하세요</option>
                        <option value='seoul'>서울특별시</option>
                        <option value='incheon'>인천광역시</option>
                        <option value='gyeongi'>경기도</option>
                        <option value='gangwon'>강원도</option>
                        <option value='chungcheong'>충청도</option>
                        <option value='sejong'>세종특별시</option>
                        <option value='daejeon'>대전광역시</option>
                        <option value='jeonra'>전라도</option>
                        <option value='gwangju'>광주광역시</option>
                        <option value='daegu'>대구광역시</option>
                        <option value='ulsan'>울산광역시</option>
                        <option value='gyeongsang'>경상도</option>
                        <option value='busan'>부산광역시</option>
                        <option value='jeju'>제주특별시</option>
                    </select>

                    <label>이메일</label>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        autoFocus
                    />

                    <label>비밀번호</label>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <label>사용할 닉네임</label>
                    <input
                        type='text'
                        name='nickname'
                        value={formData.nickname}
                        onChange={handleChange}
                    />
                    <label>프로필 업로드</label>
                    <input
                        type='file'
                        name='profileImage'
                        accept='image/jpg, image/png, image/jpeg, image/gif'
                        onChange={handleChange}
                    />
                    {formData.profileImage && (
                        <img
                            src={formData.profileImagePreview}
                            alt='프로필 미리보기'
                            style={{
                                maxWidth: '100%',
                                maxHeight: '200px',
                                marginTop: '10px',
                            }}
                        />
                    )}
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
