import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Fstvl() {

    const [fstvls, setFstvls] = useState([]);

    const getFestivalList = async () => {
        try {
            const response = await axios.get('http://10.100.203.39/fstvl');
            console.log(response);
            setFstvls(response.data)
            return response;
        } catch (error) {
            console.error(error);
            throw error; // 예외를 다시 던져서 호출자에게 전파할 수 있습니다.
        }
    };

    useEffect(() => {
        // useEffect 내에서 직접 async 함수를 호출할 수 없기 때문에, 함수 내에서 호출하고 결과를 처리할 수 있는 새로운 함수를 정의합니다.
        const fetchData = async () => {
            try {
                const result = await getFestivalList();
                // 이제 result를 사용하여 상태를 업데이트하거나 다른 작업을 수행할 수 있습니다.
            } catch (error) {
                // 오류 처리
                console.error('Error fetching festival list:', error);
            }
        };

        fetchData(); // fetchData 함수를 호출하여 데이터를 가져옵니다.
    }, []); // 빈 배열을 전달하여 componentDidMount와 같이 처음 렌더링될 때만 실행되도록 합니다.
  return (
    <div>
        <h1>축제</h1>
        <ul>
            {fstvls.map((fstvl) => (
                <li key={fstvl.id}>
                    <h3>{fstvl.name}</h3>
                    <p>{fstvl.location}</p>
                    <p>{fstvl.startDate}</p>
                    <p>{fstvl.endDate}</p>
                </li>
            )

            
            
            )}
        </ul>
    </div>
  )
}

export default Fstvl
