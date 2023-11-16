import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }

    // 실제 로그인 처리를 여기에 추가할 수 있습니다.
    // 여기서는 간단하게 받은 이메일을 콘솔에 출력하는 예시를 사용합니다.
    console.log('로그인 시도:', { email, password });

    // 로그인이 성공하면 부모 컴포넌트로 성공 여부를 전달할 수 있습니다.
    onLogin(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이메일:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;