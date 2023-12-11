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
