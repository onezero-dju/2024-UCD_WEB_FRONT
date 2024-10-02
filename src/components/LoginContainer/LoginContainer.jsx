import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import {useCookies} from "react-cookie";
import './LoginContainer.css'
import axios from "axios";

export default function LoginContainer() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);



    const handleSubmit = async (event) => {
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

        // 로그인 요청 API 통신
        try{
            const response = await axios.post('http://localhost:8080/login', {
                "email": id,
                "password": password
            });
            if(response.data.code === 200){
                alert("로그인이 성공하였습니다");
                setCookie('token', response.data.token);
                if(cookies !== undefined){
                    navigate('/main');
                }
            }else{
                alert("로그인이 실패하였습니다");
            }

        }catch(error){
            console.error('로그인 에러', error);
            alert("로그인 실패");
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
