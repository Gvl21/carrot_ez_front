// import { createContext, useContext, useState } from 'react';

// // 인증 컨텍스트 생성
// const AuthContext = createContext();

// // 커스텀 훅 으로 외부로 내보내기
// export const useAuth = () => useContext(AuthContext);

// // 다른 컴포넌트에 공유할 상태 공급자
// export const AuthProvider = ({ children }) => {
//     // 상태 1. 인증여부
//     // 로그인 유저 상태 => null : 로그인 멤버가 없음
//     const [isLoggedIn, setIsLoggedIn] = useState(null);
//     const [currentMember, setCurrentMember] = useState('');

//     // 전달2 : 로그인 함수

//     // 3. 로그아웃 함수

//     return (
//         <AuthContext.Provider
//             value={{
//                 isLoggedIn,
//                 setIsLoggedIn,
//                 currentMember,
//                 setCurrentMember,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

export const authChecker = (token, isLoggedIn) => {
    if (isLoggedIn === false) {
        alert('로그인 이후에 사용가능합니다.');
        return false;
    }
    if (!token) {
        alert('로그인 상태를 확인해주세요.');
        return false;
    }
    return true;
};
