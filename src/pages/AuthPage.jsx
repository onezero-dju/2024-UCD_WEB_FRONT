import React from 'react'
import LoginContainer from '../components/LoginContainer/LoginContainer'
import AuthLeft from '../components/AuthLeft/AuthLeft'

function AuthPage() {
  return (
    <div className='auth-page page-align-horizontal'>
      <AuthLeft />
      <LoginContainer />  
    </div>
  )
}

export default AuthPage
