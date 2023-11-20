import React, { useCallback, useContext, useEffect, useState } from 'react'
import New from './New'
import { useNavigate } from 'react-router-dom'
import './FindFriend.css'







const FindFriend = () => {
const initialData = [
  {
    id: '1',
    date: '2023-11-20',
    nickname: 'user1',
    title: '첫 번째 글',
    content: '이것은 첫 번째 글의 내용입니다.',
  },
  {
    id: '2',
    date: '2023-11-21',
    nickname: 'user2',
    title: '두 번째 글',
    content: '이것은 두 번째 글의 내용입니다.',
  },
  // 추가적인 목데이터는 필요에 따라 계속해서 추가할 수 있습니다.
];
  const [posts, setPosts] = useState(initialData);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p> 작성자 : {post.nickname} </p>
            <p> 작성일 : {post.date} </p>
            <p> {post.content} </p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default FindFriend;