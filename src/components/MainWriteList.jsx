import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    getArticleList,
    getArticleListToMain,
    onErrorImg,
} from '../components/security/apiClient';
import { authChecker } from './security/AuthContext';
import { StateContext } from '../App';
import { baseUrl } from './security/apiClient';

const MainWriteList = () => {
    // 초기 데이터
    const initialData = [
        {
            id: '1',
            area: '부산광역시',
            category: '운동',
            date: '2023-11-19',
            nickname: '형수',
            title: '광안리에서 산책하실분~',
            content: '광안리에서 산책 하실분을 모집합니다',
        },
        {
            id: '2',
            area: '서울특별시',
            category: '문화생활',
            date: '2023-11-20',
            nickname: '가은',
            title: '원데이클래스 같이하실분~',
            content: '성수에서 원데이클래스 같이 하실분~ 선착순 한명',
        },
        {
            id: '3',
            area: '인천광역시',
            category: '게임',
            date: '2023-11-21',
            nickname: '송이',
            title: '지역상관없이 옵치 그룹 구합니다~',
            content: '티어는 골드구간입니다 같이 플레가실분 구합니다',
        },
    ];

    const [posts, setPosts] = useState([]); // 상태 변수 초기화
    const { cookies, isLoggedIn } = useContext(StateContext);
    const navigate = useNavigate();
    const handleAuth = (e) => {
        const checkingAuth = authChecker(cookies.accessToken, isLoggedIn);
        if (checkingAuth === false) e.preventDefault();
        navigate('/login');
    };

    const showArticles = async () => {
        try {
            const responseBody = await getArticleListToMain();
            const articleList = responseBody.articleList;
            setPosts(articleList);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    const goMemberInfo = (email) => {
        const checkingAuth = authChecker(cookies.accessToken, isLoggedIn);
        if (checkingAuth === false) {
            navigate('/login');
            return;
        }
        navigate(`/members/${email}`);
    };

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

    useEffect(() => {
        showArticles();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div className='find-friend-container'>
            <ul className='post-list'>
                {posts ? (
                    posts.map((post) => (
                        <li key={post.articleId} className='post-item'>
                            <Link
                                to={`/detail/${post.articleId}`}
                                className='post-title'
                                onClick={handleAuth}
                            >
                                {post.title.slice(0, 10) + '...'}
                                {`[${post.replyCount}]`}
                            </Link>
                            <p className='post-info'>
                                {' '}
                                지역 : {areaOutputMap[post.area] ||
                                    post.area}{' '}
                            </p>
                            <p className='post-info'>
                                {' '}
                                카테고리 :{' '}
                                {categoryOutputMap[post.category] ||
                                    post.area}{' '}
                            </p>
                            <p className='post-info'>
                                {' '}
                                작성일 : {post.regTime}{' '}
                            </p>
                            <img
                                className='profile-img'
                                src={
                                    baseUrl + post.profileImage ||
                                    '/images/carrotProfileImage.jpg'
                                }
                                alt='프로필'
                                onClick={() => goMemberInfo(post.createdBy)}
                                onError={onErrorImg}
                            />
                            <p
                                className='post-info'
                                onClick={() => goMemberInfo(post.createdBy)}
                            >
                                작성자 : {post.nickname}
                            </p>
                            <p className='post-content'>
                                {' '}
                                {post.content.slice(0, 5) + '...'}{' '}
                            </p>
                        </li>
                    ))
                ) : (
                    <p>게시글이 없어요 ㅠㅠ</p>
                )}
            </ul>
        </div>
    );
};

export default MainWriteList;
