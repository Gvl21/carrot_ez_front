import React, { useCallback, useContext, useEffect, useState } from 'react'
import New from './New'
import { useNavigate } from 'react-router-dom'



const FindFriend = ({ posts }) => {
  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default FindFriend;