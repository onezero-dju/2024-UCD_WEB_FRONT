import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './LoginContainer.css'

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
                <Input 
                    type='text' id='email' label='이메일'
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <Input
                    type='password' id='password' label='비밀번호' 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type='submit' label='로그인' size='full' primary/>
            </form>
            <div className='signup-box'>
                <Link to="/signup" className='text-href'>회원가입 &gt;</Link>
            </div>
            <div className='socal_login'>
                <Button label='Google로 계속하기' size='full' />
                <Button label='Naver로 계속하기' size='full' />
            </div>
        </main>
    )
}
