import React from 'react'
import PropTypes from 'prop-types';
import './NavRectButton.css'

/**
 * Navigation 사각 버튼
 */
export const NavRectButton = ({dataId, selectedId, label='Channel', onClick}) => {
  return (
    <a
        key={dataId}
        className={dataId === selectedId ? 'nav-rect-btn clicked' : 'nav-rect-btn'}
        onClick={onClick}
    >
        {label} 
    </a>
  )
}

NavRectButton.propTypes = {
    /** response 데이터의 id 정보 */
    dataId: PropTypes.number.isRequired, 
    /** 선택된 요소의 id 정보 */
    selectedId: PropTypes.number, 
    /** Button 내용 입력  */
    label: PropTypes.string,
    /** 클릭 핸들링 함수 */
    onClick: PropTypes.func.isRequired,
}
