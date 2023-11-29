import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';

function Edit() {
    document.title = " 글 쓰기 수정하기"
    const{onDelete} =  useContext(DispatchContext)
    // url에서 동적 구소 매개변수를 id로 받아옴
    const {id} = useParams();
    // customhook에서 id와 일치하는 글쓰기 데이터만 받아온다. 
    const writeData = useWrite(id);

    // 이벤트 핸들러
    const navigate = useNavigate();
    // 뒤로가기
    const goBack = () =>{
      navigate(-1)
    }
    // 삭제버튼
    const handOnDelete=()=>{
      if(window.confirm("삭제하시겠습니까??"))
      {
        onDelete(id);
        navigate('/');
        alert('삭제가 되었다')
      }
    };

  return (
    <div>
      <Button text='뒤로가기' onClick={goBack}/>
      <Button text='삭제하기' type='navigate' onClick={handOnDelete}/>
      <Editor initData={writeData} />
    </div>
  )
}

export default Edit