import React from 'react'
import PropTypes from 'prop-types'
import './MeetingInfoItem.css'

export const MeetingInfoItem = ({text='Item'}) => {
  return (
    <div className='meeting-info-item'>{text}</div>
  )
}

MeetingInfoItem.propTypes = {
    text: PropTypes.string,
}
