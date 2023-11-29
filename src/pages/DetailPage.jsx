import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    getArticleDetails,
    getArticleReplyList,
    postArticleReply,
} from '../components/security/apiClient';
import './DetailPage.css';
import { StateContext } from '../App';

const DetailPage = () => {
    const { id } = useParams(); // URL에서 파라미터 추출
    const [postDetails, setPostDetails] = useState(null);
    const { isLoggedIn } = useContext(StateContext);
    const [replyContent, setReplyContent] = useState('');
    const [replyList, setReplyList] = useState({});

    const postReplyContent = async () => {
        if (replyContent.trim() === '') {
            alert('메시지를 입력 후 제출해주세요');
            setReplyContent('');
            return;
        }
        const requestBody = { content: replyContent };
        const response = await postArticleReply(
            postDetails.articleId,
            requestBody
        );
        console.log(response);
        alert('댓글을 등록했습니다');
        setReplyContent('');
        window.location.reload();
    };

    const handleChange = (e) => {
        setReplyContent(e.target.value);
    };

    useEffect(() => {
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
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (postDetails.replyCount > 0) {
                    const responseBody = await getArticleReplyList(
                        postDetails.articleId
                    );
                    setReplyList(responseBody);
                }
            } catch (error) {
                console.error('댓글을 불러오는 도중 문제');
            }
        };
        fetchDetails();
    }, [postDetails, isLoggedIn]);

    if (!postDetails) {
        return <div>로딩 중입니다...</div>;
    }
    return (
        <div className='post-details-container'>
            <div className='detail-title'>
                <h2>{postDetails.title}</h2>
            </div>
            <div className='detail-category'>
                <p>지역: {postDetails.area}</p>
                <p>카테고리: {postDetails.category}</p>
            </div>
            <div className='detail-date'>
                <p>작성일: {postDetails.regTime}</p>
            </div>
            <div className='detail-nickname'>
                <img
                    className='profile-img'
                    src={postDetails.memberImageUrl}
                    alt='프로필'
                />
                <p>작성자: {postDetails.nickname}</p>
            </div>
            <hr />
            {/* 게시글 업로드 이미지 넣을 곳  */}
            <p>{postDetails.content}</p>
            {postDetails.articleImageList &&
                postDetails.articleImageList.map((e) => (
                    <img src={e.image} alt='업로드 된 사진' />
                ))}
            <Link to={`/update/${postDetails.articleId}`}>
                <button>수정하기</button>
            </Link>
            <div className='reply-section'>
                <div className='reply-input-section'>
                    <input
                        type='text'
                        name='replyContent'
                        placeholder='댓글을 입력해주세요'
                        value={replyContent}
                        onChange={handleChange}
                    />
                    <button onClick={postReplyContent}>제출하기</button>
                </div>
                <div className='reply-show-section'>
                    {replyList &&
                        replyList.replyList &&
                        replyList.replyList.map((e) => (
                            <div className='reply-card'>
                                <img src={e.memberImageUrl} alt='프로필' />
                                <p>{e.nickname}</p>
                                <p>{e.content}</p>
                                <p>{e.regTime}</p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
