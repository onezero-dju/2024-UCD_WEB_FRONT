import React from 'react'
import { useLocation } from 'react-router-dom';
import AuthLeft from '../../components/AuthLeft/AuthLeft'
import LoginContainer from '../../components/LoginContainer/LoginContainer'
import SignupContainer from '../../components/SignupContainer/SignupContainer';
import './AuthPage.css'

function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const transitionClass = location.pathname === '/login' ? 'slide-left' : 'slide-right';

  return (
    <div className='auth-page page-align-horizontal'>
      {/* <AuthLeft /> */}
      <span className='title-letter-key'>KEY</span>
      <span className='title-letter-note'>NOTE</span>
      {/* <img className='stamp-image' src='assets/icons/chat_bot.svg' alt='stamp' /> */}
      <div className='init-image-wrapper'>
        <img src='assets/images/회의테이블.png' alt='초기이미지' />
      </div>
      <div className={`auth-right ${transitionClass}`}>
        <div className={`slider ${isLogin ? 'move-left' : 'move-right'}`}>
          <LoginContainer />
          <SignupContainer />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
