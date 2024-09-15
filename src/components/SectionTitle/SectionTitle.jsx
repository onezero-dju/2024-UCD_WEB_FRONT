import React from 'react'
import PropTypes from 'prop-types';
import './SectionTitle.css'

/** 섹션 타이틀 */
export const SectionTitle = ({text='Title'}) => {
  return (
    <h4 className='section-title'>{text}</h4>
  )
}

SectionTitle.propTypes = {
    /** 타이틀 내용 */
    text: PropTypes.string,
}
