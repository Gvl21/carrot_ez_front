import React, { useCallback, useContext, useEffect, useState } from 'react';
import New from './New';
import { Link, useNavigate } from 'react-router-dom';
import './WriteList.css';
import { SearchProvider } from '../components/Search';
import SearchBar from '../components/SearchBar';
import { getArticleListToFindFriend } from '../components/security/apiClient';
import { StateContext } from '../App';
import { authChecker } from '../components/security/AuthContext';

const WriteList = () => {
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
        // { id: '4',
        //   area: '제주특별시',
        //   category: '게임',
        //   date: '2023-11-27',
        //   nickname: '얀또니',
        //   title : '같이 크아 하실분',
        //   content: '같이 크레이지아케이드 하실분~',
        // },
        // { id: '5',
        // area: '대전광역시',
        // category: '운동',
        // date: '2023-11-28',
        // nickname: '또잉이',
        // title : '같이 헬스장 다니실분',
        // content: '일주일에 세번 날짜 정해서 같이 하실 분 구합니다',
        // },
    ];
    const [posts, setPosts] = useState(initialData);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const { cookies, isLoggedIn } = useContext(StateContext);
    const navigate = useNavigate();
    const handleAuth = (e) => {
        const checkingAuth = authChecker(cookies.accessToken, isLoggedIn);
        if (checkingAuth === false) e.preventDefault();
        navigate('/login');
    };

    const handleSearch = (searchTerm) => {
        const filtered = posts.filter((post) =>
            post.title.includes(searchTerm)
        );
        setFilteredPosts(filtered);
    };

    const showArticles = async () => {
        const responseBody = await getArticleListToFindFriend();
        const articleList = responseBody.articleList;
        console.log(articleList);
        setPosts(articleList);
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
    }, []);

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className='find-friend-container'>
                <ul className='post-list'>
                    {filteredPosts.length > 0
                        ? filteredPosts.map((post) => (
                              <li key={post.articleId} className='post-item'>
                                  {/* 얀또니 추가한 코드  */}
                                  <Link
                                      to={`/detail/${post.articleId}`}
                                      className='post-title'
                                      onClick={handleAuth}
                                  >
                                      {post.title}
                                      {`[${post.replyCount}]`}
                                  </Link>

                                  <p className='post-info'>
                                      {' '}
                                      지역 :{' '}
                                      {areaOutputMap[post.area] ||
                                          post.area}{' '}
                                  </p>
                                  <p className='post-info'>
                                      {' '}
                                      카테고리 :{' '}
                                      {categoryOutputMap[post.category] ||
                                          post.area}
                                  </p>
                                  <p className='post-info'>
                                      {' '}
                                      작성일 : {post.regTime}{' '}
                                  </p>
                                  <p className='post-info'>
                                      {' '}
                                      작성자 : {post.nickname}
                                      <img
                                          src={post.profileImage}
                                          alt='프로필'
                                      />{' '}
                                  </p>
                                  <p className='post-content'>
                                      {' '}
                                      {post.content}{' '}
                                  </p>
                              </li>
                          ))
                        : posts.map((post) => (
                              <li key={post.articleId} className='post-item'>
                                  {/* 얀또니 추가한 코드 */}
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
                                      지역 :{' '}
                                      {areaOutputMap[post.area] ||
                                          post.area}{' '}
                                  </p>
                                  <p className='post-info'>
                                      {' '}
                                      카테고리 :{' '}
                                      {categoryOutputMap[post.category] ||
                                          post.area}
                                  </p>
                                  <p className='post-info'>
                                      {' '}
                                      작성일 : {post.regTime}{' '}
                                  </p>
                                  <img
                                      className='profile-img'
                                      src={post.profileImage}
                                      alt='프로필'
                                  />{' '}
                                  <p className='post-info'>
                                      {' '}
                                      작성자 : {post.nickname}
                                  </p>
                                  <p className='post-content'>
                                      {' '}
                                      {post.content.slice(0, 5) + '...'}{' '}
                                  </p>
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
};

export default WriteList;
