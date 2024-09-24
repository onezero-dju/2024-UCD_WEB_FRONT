import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SectionLinkItem.css'

/** 섹션 아이템(링크 이동) */
export const SectionLinkItem = ({id, text='text', to='/#'}) => {
  return (
        <Link 
          key={id} className='meeting_item' to={to}
        >
          {text}
        </Link>
  )
}

SectionLinkItem.propTypes = {
  /** 아이템 아이디 */
  id: PropTypes.number,
  /** 타이틀 내용 */
  text: PropTypes.string,
  /** 리다이렉트 URL */
  to: PropTypes.string
}