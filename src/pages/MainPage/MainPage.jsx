import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar'
import MainContainer from '../../components/MainContainer/MainContainer'
import MeetingContainer from '../../components/MeetingContainer/MeetingContainer';
import MeetingInfoContainer from '../../components/MeetingInfoContainer/MeetingInfoContainer';
import { HomeDataProvider } from '../../hooks/HomeDataContext';
import './MainPage.css'
import { IsLoginedContext } from '../../hooks/IsLogined';

function MainPage() {
  const { pathname } = useLocation();

  const {
    isLogined
  } = useContext(IsLoginedContext);

  return (
    <div className='main-page'>
      {isLogined && <HomeDataProvider>
        <Sidebar />

        {pathname.startsWith('/main') && <MainContainer />}
        {pathname.startsWith('/meeting') && <><MeetingContainer /> <MeetingInfoContainer/></>}
      </HomeDataProvider>}
    </div>
  )
}

export default MainPage
