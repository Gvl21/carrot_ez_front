import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import './New.css';
import axios from 'axios';
import WriteList from './WriteList';
import {
    apiClient,
    patchArticle,
    postArticle,
} from '../components/security/apiClient';
import ImageUploader from '../components/ImageUploader';
import { ArticleContext, ImagesContext, StateContext } from '../App';

function UpdatePage() {
    const { id } = useParams();
    const { postDetails, setPostDetails } = useContext(ArticleContext);
    const navigate = useNavigate();
    const { images, setImages } = useContext(ImagesContext);
    const { cookies } = useContext(StateContext);

    const [formData, setFormdata] = useState({
        category: postDetails.category,
        area: postDetails.area,
        title: postDetails.title,
        content: postDetails.content,
        imageUrls: postDetails.articleImageList,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormdata({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 카테고리가 선택되었는지 확인하기
        if (!formData.category) {
            alert('카테고리와 지역을 선택하세요');
            return;
        }

        // 쿠키가 제대로 있는지 2중으로 분기처리
        const accessToken = cookies.accessToken;
        if (!accessToken) return;

        // 새 폼 데이터를 전송하기 위한 폼
        const data = new FormData();

        // 폼데이터에 이미지 정보를 넣기
        images.forEach((e) => {
            data.append(`articleImageList`, e.file);
        });

        // 나머지 폼 데이터 넣기
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        console.log('게시글쓰기:', data);

        // 데이터 처리
        try {
            const response = await patchArticle(data, id);
            console.log(response);
            alert('게시글이 성공적으로 작성되었습니다!');
            navigate('/'); // <- 이거로 게시글 상세보기 페이지만들면 거기로 보내면 될듯
        } catch {
            alert('게시글 작성에 실패하였습니다.');
        }

        // 제출 후 폼 초기화
        setFormdata({
            category: '',
            area: '',
            title: '',
            content: '',
            imageUrls: [],
        });
        setImages([]);
    };

    const goMain = () => {
        navigate('/');
    };

    const titleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    const deleteImageUrl = (e) => {
        const updatedUrls = [...formData.imageUrls];
        updatedUrls.splice(e, 1);
        setFormdata({ ...formData, imageUrls: updatedUrls });
    };

    return (
        <div className='new'>
            <form onSubmit={handleSubmit} className='newform'>
                <div className='option'>
                    <label>지역</label>
                    <select
                        name='area'
                        value={formData.area}
                        onChange={handleChange}
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

                    <label>카테고리</label>
                    <select
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value=''>선택하세요</option>
                        <option value='sports'>운동</option>
                        <option value='culture'>문화생활</option>
                        <option value='fstvl'>축제/공연</option>
                        <option value='game'>게임</option>
                        <option value='etc'>자유주제</option>
                    </select>
                </div>

                <div className='userwrite'>
                    <div className='title'>
                        <label> 글 제목 </label>
                        <input
                            type='text'
                            name='title'
                            className='title'
                            value={formData.title}
                            onChange={handleChange}
                            onKeyDown={titleKeyPress}
                        />
                    </div>

                    <div>
                        <label> 글 내용 </label>
                        <textarea
                            type='text'
                            name='content'
                            className='body'
                            value={formData.content}
                            onChange={handleChange}
                        >
                            {' '}
                        </textarea>
                    </div>
                </div>
                {formData.imageUrls && formData.imageUrls.length > 0 && (
                    <div>
                        {formData.imageUrls.map((e, i) => (
                            <div key={i}>
                                <img
                                    src={e.image}
                                    alt={`업로드 된 이미지 파일 ${i + 1}`}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                    }}
                                />{' '}
                                <button
                                    type='button'
                                    onClick={() => deleteImageUrl(i)}
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <ImageUploader />
                <div className='button'>
                    <button type='submit'>작성하기</button>
                    <button onClick={goMain} type='button'>
                        취소하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePage;
