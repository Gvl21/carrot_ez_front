import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleDetails } from '../components/security/apiClient'; // 상세 정보를 가져오는 함수를 import

const DetailPage = () => {
    const { id } = useParams(); // URL에서 파라미터 추출
    const [postDetails, setPostDetails] = useState(null);

    useEffect(() => {
        console.log('이펙트');
        const fetchDetails = async () => {
            try {
                // 상세 정보 가져오기
                const responseBody = await getArticleDetails(id);
                console.log(responseBody);
                setPostDetails(responseBody);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchDetails();
    }, []);

    if (!postDetails) {
        return <div>로딩 중입니다...</div>;
    }

    return (
        <div className='post-details-container'>
            <h2>{postDetails.title}</h2>
            <p>지역: {postDetails.area}</p>
            <p>카테고리: {postDetails.category}</p>
            <p>작성일: {postDetails.regTime}</p>
            <p>작성자: {postDetails.nickname}</p>
            <img src={postDetails.memberImageUrl} alt='프로필' />
            {/* 게시글 업로드 이미지 넣을 곳  */}
            <p>{postDetails.content}</p>
        </div>
    );
};

export default DetailPage;
