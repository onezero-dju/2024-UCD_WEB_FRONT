import React from 'react'
import './MeetingInfoContainer.css'
import MeetingInfoBox from '../MeetingInfoBox/MeetingInfoBox'
import { MeetingInfoItem } from '../MeetingInfoItem/MeetingInfoItem'

function MeetingInfoContainer() {
  return (
    <section className='meeting-info-container'>
      <MeetingInfoBox 
        title='5분 요약'
        contents={
          <ul className='meeting-info-wrap'>
            <li><MeetingInfoItem text='20:00~20:05 요약 1'/></li>
            <li><MeetingInfoItem text='20:05~20:10 요약 2'/></li>
            <li><MeetingInfoItem text='20:10~20:15 요약 3'/></li>
            <li><MeetingInfoItem text='20:15~20:20 요약 4'/></li>
            <li><MeetingInfoItem text='20:20~20:25 요약 5'/></li>
            <li><MeetingInfoItem text='20:25~20:30 요약 6'/></li>
            <li><MeetingInfoItem text='20:30~20:35 요약 7'/></li>
            <li><MeetingInfoItem text='20:35~20:40 요약 8'/></li>
            <li><MeetingInfoItem text='20:40~20:45 요약 9'/></li>
            <li><MeetingInfoItem text='20:45~20:50 요약 10'/></li>
            <li><MeetingInfoItem text='20:50~20:55 요약 11'/></li>
            <li><MeetingInfoItem text='20:55~21:00 요약 12'/></li>
          </ul>
        }
      />
      <MeetingInfoBox 
        title='안건 추천'
        contents={
          <ul className='meeting-info-wrap'>
            <li><MeetingInfoItem text='추천 안건 1'/></li>
            <li><MeetingInfoItem text='추천 안건 2'/></li>
            <li><MeetingInfoItem text='추천 안건 3'/></li>
            <li><MeetingInfoItem text='추천 안건 4'/></li>
          </ul>
        }
      />
    </section>
  )
}

export default MeetingInfoContainer
