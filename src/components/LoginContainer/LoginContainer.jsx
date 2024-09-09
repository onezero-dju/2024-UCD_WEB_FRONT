import React, { useState } from 'react'
import './LoginContainer.css'
import { useNavigate, Link } from 'react-router-dom';

export default function LoginContainer() {
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
    
        // 추후 암호화 및 전송 필요
        console.log("아이디:", id);
        console.log("비밀번호:", password);
        const isLoginSuccessful = true; 

        // 성공 여부 확인
        if (isLoginSuccessful) {
            navigate('/main');
        } else {
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <main className='login-container'>
            <form className='login-field' onSubmit={handleSubmit}>
                <div className='input-component'>
                    <input 
                        type='text' id='email' className="input-field"
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="input-label">이메일</label>
                </div>
                <div className='input-component'>
                    <input 
                        type='password' id='password' className="input-field"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="input-label">비밀번호</label>
                </div>
                <button type='submit'>로그인</button>
            </form>
            <div className='signup-box'>
                <Link to="/signup" className='text-href'>회원가입 &gt;</Link>
            </div>
            <div className='socal_login'>
                <button className='google-login'>Google로 계속하기</button>
                <button className='naver-login'>Naver로 계속하기</button>
            </div>
        </main>
    )
}
