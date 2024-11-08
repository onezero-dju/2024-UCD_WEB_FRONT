import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './LoginContainer.css'
import axios from "axios";
import useCheckLogin from "../../hooks/useCheckLogin";
import {useCookies} from "react-cookie";
import ModalFrame from "../ModalFrame/ModalFrame";

export default function LoginContainer() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [organizationId, setOrganizationId] = useState("");
    const [message, setMessage] = useState(""); 
    const navigate = useNavigate();

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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                "email": id,
                "password": password
            });
            if(response.data.code === 200){
                alert("로그인이 성공하였습니다");
                setCookie('token', response.data.token);
                checkUserOrganization(cookies.token);
                // console.log(cookies['token']);
            }else{
                alert("로그인이 실패하였습니다");
            }

        }catch(error){
            if(error.code === 401){
                alert(error.message);
            }
            else{
                console.error('로그인 에러', error);
                alert("로그인 실패");
            }
        }
    };

    const checkUserOrganization = async(token) => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/organization/my`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.data){
                navigate('/main')
            }
            else{
                setIsModalOpen(true);
            }
        }catch (error){
            if (error.response && error.response.status === 403) {
                alert("이 리소스에 대한 권한이 없습니다.");
            } else {
                console.error('조직 확인 에러', error);
                alert("조직 정보를 불러오는 데 실패했습니다.");
            }
        }
    }

    const handleJoinOrganization = async (event) => {
        event.preventDefault();

        if (!organizationId || !message) {
            alert("조직 ID와 메시지를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organizations/${organizationId}/join`, {
                message: message,
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("조직 가입 신청이 성공했습니다.");
                setIsModalOpen(false); // Close the modal after successful submission
            } else {
                alert("조직 가입 신청에 실패했습니다.");
            }
        } catch (error) {
            console.error('조직 가입 신청 에러', error);
            alert("조직 가입 신청에 실패했습니다.");
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
            {/* 아래는 조직 가입 신청 모달창 */}
            {isModalOpen &&
            <ModalFrame setModalOpen={setIsModalOpen}>
                <form onSubmit={handleJoinOrganization}>
                    <h3>조직 가입 신청</h3>
                    <Input 
                        type='text' 
                        id='organizationId' 
                        label='조직 ID' 
                        onChange={(e) => setOrganizationId(e.target.value)} 
                        required 
                    />
                    <Input 
                        type='text' 
                        id='message' 
                        label='가입 신청 메시지' 
                        onChange={(e) => setMessage(e.target.value)} 
                        required
                    />
                    <Button type='submit' label='가입 신청' size='full' />
                </form>
            </ModalFrame>}

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
