import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import Fstvl from '../components/Fstvl';
import MainWriteList from '../components/MainWriteList';

function Main() {
    const navigate = useNavigate();

    const goFindFriend = () => {
        navigate('/findfriend');
    };

    // const getFestivalList = async () => {
    //     try {
    //         const response = await axios.get('http://10.100.203.39/fstvl');
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         console.error(error);
    //         throw error; // 예외를 다시 던져서 호출자에게 전파할 수 있습니다.
    //     }
    // };

    useEffect(() => {
        // useEffect 내에서 직접 async 함수를 호출할 수 없기 때문에, 함수 내에서 호출하고 결과를 처리할 수 있는 새로운 함수를 정의합니다.
        // const fetchData = async () => {
        //     try {
        //         const result = await getFestivalList();
        //         // 이제 result를 사용하여 상태를 업데이트하거나 다른 작업을 수행할 수 있습니다.
        //     } catch (error) {
        //         // 오류 처리
        //         console.error('Error fetching festival list:', error);
        //     }
        // };
        // fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
    }, []);

    return (
        <div className='main'>
            <div className='mainfstvl'>
                <Fstvl />
            </div>

            <div className='line'></div>

            <div className='writelist'>
                <div className='more-container'>
                    <h2 className='more' onClick={goFindFriend}>
                        more👉
                    </h2>
                </div>

                <MainWriteList />
            </div>
        </div>
    );
}

export default Main;
