import React, { useEffect, useState } from 'react';
import {
    getMemberInfo,
    onErrorImg,
    baseUrl,
} from '../components/security/apiClient';
import { Link, useParams } from 'react-router-dom';

function User() {
    const { email } = useParams();
    const [memberInfo, setMemberInfo] = useState(null);

    const getTargetMember = async () => {
        const member = await getMemberInfo(email);
        setMemberInfo(member);
        console.log(member);
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
        getTargetMember();
        console.log(memberInfo);
    }, []);

    return (
        <div>
            {memberInfo && (
                <div>
                    <img
                        className='profile-img'
                        src={
                            baseUrl + memberInfo.memberImageUrl ||
                            '/images/carrotProfileImage.jpg'
                        }
                        alt='프로필'
                        onError={onErrorImg}
                    />
                    <h2>이메일 : {memberInfo.email}</h2>
                    <h2>닉네임 : {memberInfo.nickname}</h2>
                    <h2>
                        지역 :{' '}
                        {areaOutputMap[memberInfo.area] || memberInfo.area}
                    </h2>

                    <h2>작성한 게시글</h2>
                    <div className='find-friend-container'>
                        <ul className='post-list'>
                            {memberInfo && memberInfo.createdArticleList ? (
                                memberInfo.createdArticleList.map((post) => (
                                    <li key={post.id} className='post-item'>
                                        <Link
                                            to={`/detail/${post.id}`}
                                            className='post-title'
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
                                                post.area}{' '}
                                        </p>
                                        <p className='post-info'>
                                            {' '}
                                            작성일 :{' '}
                                            {post.regTime
                                                .slice(0, 16)
                                                .replace('T', ' ')}{' '}
                                        </p>
                                        <img
                                            className='profile-img'
                                            src={
                                                baseUrl +
                                                    memberInfo.memberImageUrl ||
                                                '/images/carrotProfileImage.jpg'
                                            }
                                            alt='프로필'
                                        />
                                        <p className='post-info'>
                                            작성자 : {memberInfo.nickname}
                                        </p>
                                        <p className='post-content'>
                                            {' '}
                                            {post.content.slice(0, 5) +
                                                '...'}{' '}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p>게시글이 없어요 ㅠㅠ</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
