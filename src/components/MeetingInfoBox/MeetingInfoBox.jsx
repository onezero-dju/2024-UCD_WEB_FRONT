import React from 'react'
import './MeetingInfoBox.css'

function MeetingInfoBox({title, contents}) {
  return (
    <div className='meeting-info-box'>
        <h4 className='title'>{title}</h4>
        {contents}
    </div>
  )
}

export default MeetingInfoBox
