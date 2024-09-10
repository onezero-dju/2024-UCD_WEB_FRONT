import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Input } from '../Input/Input'
import { Button } from '../Button/Button'
import './SignupContainer.css'

function SignupContainer() {
    const [id, setId] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        // 기본 폼 제출 방지
        event.preventDefault();
    
        // 유효성 검사
        if ( password1.length < 8 ) {
          alert("비밀번호는 최소 8자 이상이어야 합니다.");
          return;
        }
        
        if ( password1 !== password2 ) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    
        // 암호화 및 전송 필요
        console.log("아이디:", id);
        console.log("비밀번호:", password2);

        navigate('/start');
    };

  return (
    <main className='signup-wrap'>
        <form className='signup-field' onSubmit={handleSubmit}>
            <Input 
                type='text' id='userName' label='이름' 
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <Input 
                type='email' id='id' label='이메일' 
                onChange={(e) => setId(e.target.value)}
                required
            />
            <Input 
                type='password' id='password1' label='비밀번호' 
                onChange={(e) => setPassword1(e.target.value)}
                required
            />
            <Input 
                type='password' id='password2' label='비밀번호 확인' 
                onChange={(e) => setPassword2(e.target.value)}
                required
            />
            <div className='login-box'>
                <Link to="/login" className='text-href'>&lt; 로그인</Link>
            </div>
            <Button type='submit' label='가입하기' primary/>
        </form>
    </main>
  )
}

export default SignupContainer
