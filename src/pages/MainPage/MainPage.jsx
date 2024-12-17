import React from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'
import MainContainer from '../../components/MainContainer/MainContainer'
import MeetingContainer from '../../components/MeetingContainer/MeetingContainer';
import MeetingInfoContainer from '../../components/MeetingInfoContainer/MeetingInfoContainer';
import { HomeDataProvider } from '../../hooks/HomeDataContext';
import './MainPage.css'
import useCheckLogin from "../../hooks/useCheckLogin";

function MainPage() {
  const { pathname } = useLocation();
  // useCheckLogin('token'); // 로그인 상태 확인

  return (
    <div className='main-page'>
      <HomeDataProvider>
        <Sidebar />

        {pathname.startsWith('/main') && <MainContainer />}
        {pathname.startsWith('/meeting') && <><MeetingContainer /> <MeetingInfoContainer /></>}
      </HomeDataProvider>
    </div>
  )
}

export default MainPage
