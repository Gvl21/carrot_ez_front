import React, { useCallback, useContext, useEffect, useState } from 'react';
import New from './New';
import { useNavigate } from 'react-router-dom';
import './WriteList.css';
import { SearchProvider } from '../components/Search';
import SearchBar from '../components/SearchBar';
import { getArticleList } from '../components/security/apiClient';

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
    area: '부산광역시',
    category: '문화생활',
    date: '2023-11-20',
    nickname: '가은',
    title: '원데이클래스 같이하실분~',
    content: '기타 같이 배워볼 분 구합니다.',
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
  const [posts, setPosts] = useState(initialData);

    const handleSearch = (searchTerm) => {
        const filtered = posts.filter((post) =>
            post.title.includes(searchTerm)
        );
        setFilteredPosts(filtered);
    };

    const showArticles = async () => {
        const responseBody = await getArticleList();
        const articleList = responseBody.articleList;
        console.log(articleList);
        setPosts(articleList);
    };

    useEffect(() => {
        showArticles();
    }, []);

    return (
        <div className='find-friend-container'>
            <SearchBar onSearch={handleSearch} />

            <ul className='post-list'>
                {filteredPosts.length > 0
                    ? filteredPosts.map((post) => (
                          <li key={post.articleId} className='post-item'>
                              <strong className='post-title'>
                                  {post.title}
                              </strong>
                              <p className='post-info'> 지역 : {post.area} </p>
                              <p className='post-info'>
                                  {' '}
                                  카테고리 : {post.category}
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
                              <p className='post-content'> {post.content} </p>
                          </li>
                      ))
                    : posts.map((post) => (
                          <li key={post.articleId} className='post-item'>
                              <strong className='post-title'>
                                  {post.title}
                              </strong>
                              <p className='post-info'> 지역 : {post.area} </p>
                              <p className='post-info'>
                                  {' '}
                                  카테고리 : {post.category}
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
                              <p className='post-content'> {post.content} </p>
                          </li>
                      ))}
            </ul>
        </div>
    );
};

export default WriteList;
