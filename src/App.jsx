import React, { useState } from 'react';
import { BrowserRouter as  Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import LoginPage from './pages/LoginPage/LoginPage';
import MeetingPage from './pages/MeetingPage/MeetingPage';
import Sidebar from './components/Sidebar/Sidebar';

function AppContent() {
  const [selectedOrganization, setSelectedOrganization] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const location = useLocation();

  const handleOrganizationSelect = (orgId) => {
    setSelectedOrganization(orgId);
  };

  const handleChannelSelect = (channelId) => {
    setSelectedChannel(channelId);
  };

  return (
    <>
      {location.pathname !== '/' && (
        <Sidebar
          selectedOrganization={selectedOrganization}
          onOrganizationSelect={handleOrganizationSelect}
          onChannelClick={handleChannelSelect}
          selectedChannel={selectedChannel}
        />
      )}
      <Routes>
        <Route path="/" exact element={<LoginPage/>} />
        {/* <Route path="/main" element={<MainContainer selectedChannel={selectedChannel}/>} /> */}
        <Route path="/main" element={<MainPage selectedChannel={selectedChannel}/>} />
        <Route path="/meeting/:id" exact element={<MeetingPage/>} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
