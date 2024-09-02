import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginContainer.css'

function LoginContainer() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // 기본 폼 제출 방지
        event.preventDefault();
    
        // 비밀번호 유효성 검사
        if (password.length < 8) {
          alert("비밀번호는 최소 8자 이상이어야 합니다.");
          return;
        }
    
        // 암호화 및 전송 필요
        console.log("아이디:", id);
        console.log("비밀번호:", password);

        // 데이터 암호화 및 전송 로직 필요
        const isLoginSuccessful = true; 

        // 성공 여부 확인
        if (isLoginSuccessful) {
            navigate('/main');
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };


    return (
        <main className='login-wrap'>
        <form className='login-field' onSubmit={handleSubmit}>
            <input 
                type='text' id='id' placeholder='아이디' 
                onChange={(e) => setId(e.target.value)}
                required
            />
            <input 
                type='password' id='password' placeholder='비밀번호' 
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type='submit'>로그인</button>
        </form>
        <div className='socal_login'>
            <button className='google-login'>Google로 계속하기</button>
            <button className='naver-login'>Naver로 계속하기</button>
        </div>
        </main>
    )
}

export default LoginContainer
