import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    getArticleDetails,
    getArticleReplyList,
    onErrorImg,
    postArticleReply,
    baseUrl,
} from '../components/security/apiClient';
import './DetailPage.css';
import { ArticleContext, StateContext } from '../App';

const DetailPage = () => {
    const { id } = useParams(); // URL에서 파라미터 추출
    // const [postDetails, setPostDetails] = useState(null);
    const { postDetails, setPostDetails } = useContext(ArticleContext);
    const { isLoggedIn, currentMember } = useContext(StateContext);
    const [replyContent, setReplyContent] = useState('');
    const [replyList, setReplyList] = useState({});
    const navigate = useNavigate();

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
                setReplyList({});
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
    const areaOutputMap = {
        seoul: '서울',
        incheon: '인천',
        gyeongi: '경기',
        gangwon: '강원도',
        chungcheong: '충청도',
        sejong: '세종',
        daejeon: '대전',
        jeonra: '전라도',
        daegu: '대구',
        ulsan: '울산',
        gyeongsang: '경상',
        busan: '부산',
        jeju: '제주',
    };
    const categoryOutputMap = {
        sports: '운동',
        culture: '문화생활',
        fstvl: '축제/공연',
        game: '게임',
        etc: '자유주제',
    };
    const goMemberInfo = (email) => {
        navigate(`/members/${email}`);
    };
    return (
        <div className='post-details-container'>
            <div className='detail-title'>
                <h2>{postDetails.title}</h2>
            </div>
            <div className='detail-category'>
                <p>
                    지역: {areaOutputMap[postDetails.area] || postDetails.area}{' '}
                </p>
                <p>
                    카테고리:{' '}
                    {categoryOutputMap[postDetails.category] ||
                        postDetails.category}
                </p>
            </div>
            <div className='detail-date'>
                <p>작성일: {postDetails.regTime}</p>
            </div>
            <div className='detail-nickname'>
                <img
                    className='profile-img'
                    src={
                        baseUrl + postDetails.memberImageUrl ||
                        '/images/carrotProfileImage.jpg'
                    }
                    alt='프로필'
                    onError={onErrorImg}
                    onClick={() => goMemberInfo(postDetails.createdBy)}
                />
                <p onClick={() => goMemberInfo(postDetails.createdBy)}>
                    작성자: {postDetails.nickname}
                </p>
            </div>
            <hr />
            {/* 게시글 업로드 이미지 넣을 곳  */}
            <p>{postDetails.content}</p>
            {postDetails.articleImageList &&
                postDetails.articleImageList.map((e) => (
                    <img src={baseUrl + e.image} alt='업로드 된 사진' />
                ))}
            {postDetails.createdBy === currentMember.email && (
                <Link to={`/update/${postDetails.articleId}`}>
                    <button>수정하기</button>
                </Link>
            )}
            <div className='reply-section'>
                <div className='reply-input-section'>
                    <input
                        className='reply-input'
                        type='text'
                        name='replyContent'
                        placeholder='댓글을 입력해주세요'
                        value={replyContent}
                        onChange={handleChange}
                    />
                    <button className='reply-button' onClick={postReplyContent}>
                        댓글작성
                    </button>
                </div>
                <div className='reply-show-section'>
                    {replyList &&
                        replyList.replyList &&
                        replyList.replyList.map((e) => (
                            <div className='reply-card'>
                                <p>
                                    {' '}
                                    <img
                                        src={
                                            baseUrl + e.memberImgUrl ||
                                            '/images/carrotProfileImage.jpg'
                                        }
                                        className='profile-img'
                                        alt='프로필'
                                        onClick={() => goMemberInfo(e.email)}
                                        onError={onErrorImg}
                                    />{' '}
                                    {e.nickname}
                                </p>
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
