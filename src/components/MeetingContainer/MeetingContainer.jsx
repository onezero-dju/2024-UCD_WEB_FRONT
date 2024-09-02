import React from 'react'
import { useParams } from 'react-router-dom';
import './MeetingContainer.css'

function MeetingScreen() {
  
    // 임시 데이터
    const meetingList = [
      {id:1, channel_id: 1, category_id:1, name:"UCD 개발 1번 회의", updated_at:"2023-08-10 14:23:56"},
      {id:2, channel_id: 1, category_id:1, name:"UCD 개발 2번 회의", updated_at:"2023-07-19 09:15:24"},
      {id:3, channel_id: 1, category_id:1, name:"UCD 개발 3번 회의", updated_at:"2023-08-01 22:45:30"},
      {id:4, channel_id: 1, category_id:1, name:"UCD 개발 4번 회의", updated_at:"2023-07-30 11:32:05"},
      {id:5, channel_id: 2, category_id:2, name:"UCD 홍보 1번 회의", updated_at:"2023-08-07 16:53:21"},
      {id:6, channel_id: 2, category_id:3, name:"UCD 홍보 2번 회의", updated_at:"2023-07-27 18:40:42"},
      {id:7, channel_id: 2, category_id:3, name:"UCD 홍보 3번 회의", updated_at:"2023-08-15 10:12:09"},
      {id:8, channel_id: 3, category_id:4, name:"UCD 자유 1번 회의", updated_at:"2023-08-02 20:58:11"},
      {id:9, channel_id: 3, category_id:4, name:"UCD 자유 2번 회의", updated_at:"2023-08-14 06:17:38"},
      {id:10, channel_id: 3, category_id:4, name:"UCD 자유 3번 회의", updated_at:"2023-08-11 13:07:26"},
      {id:11, channel_id: 3, category_id:5, name:"UCD 자유 4번 회의", updated_at:"2023-07-23 21:22:48"},
      {id:12, channel_id: 3, category_id:5, name:"UCD 자유 5번 회의", updated_at:"2023-08-05 15:29:59"},

      {id:13, channel_id: 4, category_id:6, name:"일영 기획 1번 회의", updated_at:"2023-07-25 12:34:18"},
      {id:14, channel_id: 4, category_id:6, name:"일영 기획 2번 회의", updated_at:"2023-08-04 08:56:42"},
      {id:15, channel_id: 4, category_id:6, name:"일영 기획 3번 회의", updated_at:"2023-07-31 17:20:33"},
      {id:16, channel_id: 5, category_id:7, name:"일영 AI 1번 회의", updated_at:"2023-07-26 11:57:05"},
      {id:17, channel_id: 5, category_id:7, name:"일영 AI 2번 회의", updated_at:"2023-08-06 17:46:39"},
      {id:18, channel_id: 5, category_id:7, name:"일영 AI 3번 회의", updated_at:"2023-08-08 22:20:11"},
      {id:19, channel_id: 5, category_id:7, name:"일영 AI 4번 회의", updated_at:"2023-07-29 09:11:22"},
      {id:20, channel_id: 6, category_id:8, name:"일영 인사 1번 회의", updated_at:"2023-08-03 16:04:52"},
      {id:21, channel_id: 6, category_id:8, name:"일영 인사 2번 회의", updated_at:"2023-07-28 20:31:59"},

      {id:22, channel_id: 8, category_id:9, name:"백엔드 운영 1번 회의", updated_at:"2023-08-16 07:50:03"},
      {id:23, channel_id: 8, category_id:9, name:"백엔드 운영 2번 회의", updated_at:"2023-08-17 23:14:38"},
      {id:24, channel_id: 8, category_id:9, name:"백엔드 운영 3번 회의", updated_at:"2023-08-18 02:42:17"},
      {id:25, channel_id: 8, category_id:9, name:"백엔드 운영 4번 회의", updated_at:"2023-08-19 18:05:22"},
      {id:26, channel_id: 8, category_id:9, name:"백엔드 운영 5번 회의", updated_at:"2023-08-20 12:29:54"},
      {id:27, channel_id: 7, category_id:10, name:"백엔드 TDD 1번 회의", updated_at:"2023-07-21 08:44:29"},
      {id:28, channel_id: 7, category_id:10, name:"백엔드 TDD 2번 회의", updated_at:"2023-07-22 05:15:08"},
      {id:29, channel_id: 7, category_id:10, name:"백엔드 TDD 3번 회의", updated_at:"2023-08-21 21:39:46"},
  ];

  // url에서 Meeting ID 추출 후 ID가 일치하는 회의의 화면을 표시
  const { id } = useParams();
  const meeting = meetingList.find(item => item.id.toString() === id);

  if (!meeting) {
    return <div>존재하지 않는 페이지입니다..</div>;
  }

  return (
    <section className='meeting-container'>
      <div className='meeting_title'>
        <h3>{meeting.name}</h3>
        <ul className='participants'>
          <li>
            <div className='profile-image'>김</div>
          </li>
          <li>
            <div className='profile-image'>이</div>
          </li>
          <li>
            <div className='profile-image'>정</div>
          </li>
          <li>
            <div className='profile-image'>박</div>
          </li>
        </ul>
      </div>
      <div className='realtime_space'></div>
    </section>
  )
}

export default MeetingScreen
