import React, { useEffect, useState } from 'react'
import './MeetingInfoContainer.css'
import MeetingInfoBox from '../MeetingInfoBox/MeetingInfoBox'
import { MeetingInfoItem } from '../MeetingInfoItem/MeetingInfoItem'

function MeetingInfoContainer() {
  const [text, settext] = useState()
  const [text2, settext2] = useState()
  const [text3, settext3] = useState()
  const [text4, settext4] = useState()
  // 2초 후에 "Hello, world!"를 출력
  useEffect(() => {
    setTimeout(function () {
      settext(<li><MeetingInfoItem text='20:46~20:51 요약' />: 전면 UI 디자인은 Figma에서 초안을 완성하고 React로 구현 중이며, 다음주까지 프론트엔드 프로토타입을 완성할 예정이다.
        STT API와 MongoDB 데이터베이스 연결은 데이터 스키마와 API 응답 형식을 맞추는 작업으로 어려움을 겪고 있지만 이틀 안에 마무리할 예정이다.
        프로토타입 데드라인은 11월 9일까지로 정했다.</li>)
      settext3(
        <>
          <li><MeetingInfoItem text='- 프로젝트 완료 목표일 통합 ' /> </li>
          <li><MeetingInfoItem text='- RAG 적용 여부' /></li>
          <li><MeetingInfoItem text='- 적용된 프롬프트 엔지니어링 기법' /></li>
          <li><MeetingInfoItem text='- 프로토타입 데드라인 정하기' /></li>
        </>)
    }, 6000);
    setTimeout(function () {
      settext2(<li><MeetingInfoItem text='20:52~20:57 요약' />: STT 모델 성능 테스트를 위해 다양한 발화 패턴을 포함한 테스트 데이터셋을 준비하고, CER 지표를 기반으로 평가한다.
        팀 내부 베타 테스트를 통해 실사용 환경에서의 성능을 검증하고, 자동 요약 기능도 함께 검토한다.
        회의 내용을 요약하는 결과가 일관되게 나오는지 확인한다.</li>)
      settext4(
        <>
          <li><MeetingInfoItem text='- STT API와 MongoDB 연결하기' /></li>
          <li><MeetingInfoItem text='- React 구현 현재 상황' /></li>
          <li><MeetingInfoItem text='- 프로토타입 데드라인 정하기' /></li>
        </>
      )
    }, 10000);
  }, [])


  return (
    <section className='meeting-info-container'>
      <MeetingInfoBox
        title='5분 요약'
        contents={
          <ul className='meeting-info-wrap'>
            {text}<br />{text2}
            {/* <li><MeetingInfoItem text='20:46~20:51 요약' />{text}</li>
            <li><MeetingInfoItem text='20:52~20:57 요약' />{text2}</li> */}
            {/* <li><MeetingInfoItem text='20:05~20:10 요약 2'/></li>
            <li><MeetingInfoItem text='20:10~20:15 요약 3'/></li>
            <li><MeetingInfoItem text='20:15~20:20 요약 4'/></li>
            <li><MeetingInfoItem text='20:20~20:25 요약 5'/></li>
            <li><MeetingInfoItem text='20:25~20:30 요약 6'/></li>
            <li><MeetingInfoItem text='20:30~20:35 요약 7'/></li>
            <li><MeetingInfoItem text='20:35~20:40 요약 8'/></li>
            <li><MeetingInfoItem text='20:40~20:45 요약 9'/></li>
            <li><MeetingInfoItem text='20:45~20:50 요약 10'/></li>
            <li><MeetingInfoItem text='20:50~20:55 요약 11'/></li>
            <li><MeetingInfoItem text='20:55~21:00 요약 12'/></li> */}
          </ul>
        }
      />
      <MeetingInfoBox
        title='안건 추천'
        contents={
          <ul className='meeting-info-wrap'>
            {/* <li><MeetingInfoItem text='- 프로젝트 완료 목표일 통합 ' /> </li>
            <li><MeetingInfoItem text='- RAG 적용 여부' /></li>
            <li><MeetingInfoItem text='- 적용된 프롬프트 엔지니어링 기법' /></li>
            <li><MeetingInfoItem text='- 프로토타입 데드라인 정하기' /></li> */}
            {text3}{text4}
            {/* <li><MeetingInfoItem text='- STT API와 MongoDB 연결하기' /></li>
            <li><MeetingInfoItem text='- React 구현 현재 상황' /></li>
            <li><MeetingInfoItem text='- 프로토타입 데드라인 정하기' /></li> */}
          </ul>
        }
      />
    </section>
  )
}

export default MeetingInfoContainer
