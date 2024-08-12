import React from 'react'
import './MeetingPage.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import MeetingContainer from '../../components/MeetingContainer/MeetingContainer'
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer'
function MeetingPage() {
  return (
    <main className='meeting_page'>
      <MeetingContainer />
      <SummaryContainer />
    </main>
  )
}

export default MeetingPage
