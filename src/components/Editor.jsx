import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { DispatchContext } from '../App';

function Editor({initData}) {
    const { onCreate, onUpdate } = useContext(DispatchContext);
    const navigate = useNavigate();
    const [date, setDate] = useState
    (getFormatDate(new Date()));
    const [content, setContent] = useState('');

    // initData 스정페이지에서 전달받은 일기 데이터가 업데이트 될 때마다 실행
    useEffect(() => {
        if (initData) {
            setDate(getFormatDate(new Date(initData.date)));
            setEmotionId(initData.emotionId);
            setContent(initData.content);
        }
    }, [initData]);

  return (
    <div>
      
    </div>
  )
}

export default Editor;
