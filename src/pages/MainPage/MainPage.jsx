import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MainContainer from '../../components/MainContainer/MainContainer'
import './MainPage.css'

function MainPage() {
  return (
    <div className='main-page'>
      <Sidebar />
      <MainContainer />
    </div>
  )
}

export default MainPage
