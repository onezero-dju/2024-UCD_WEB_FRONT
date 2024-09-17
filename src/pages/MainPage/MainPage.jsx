import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'
import MainContainer from '../../components/MainContainer/MainContainer'
import MeetingContainer from '../../components/MeetingContainer/MeetingContainer';
import MeetingInfoContainer from '../../components/MeetingInfoContainer/MeetingInfoContainer';
import './MainPage.css'

function MainPage() {
  const { pathname } = useLocation();

  return (
    <div className='main-page'>
      <Sidebar />
      {pathname.startsWith('/main') && <MainContainer />}
      {pathname.startsWith('/meeting') && <><MeetingContainer /> <MeetingInfoContainer/></>}
    </div>
  )
}

export default MainPage
