import React from 'react'
import PropTypes from 'prop-types'
import './ProfileImage.css'

/** 사용자 프로필 사진 */
export const ProfileImage = ({name, color, size='medium'}) => {
  return (
    <div className={`profile-image ${size}`} style={{backgroundColor:`${color}`}} >{name}</div>
  )
}

ProfileImage.propTypes = {
    /** 사용자 이름 */
    name: PropTypes.string.isRequired,
    /** 프로필 크기 */
    size: PropTypes.oneOf(['medium', 'large'])
}
