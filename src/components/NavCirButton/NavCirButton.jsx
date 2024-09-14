import React from 'react'
import PropTypes from 'prop-types';
import './NavCirButton.css'

/**
 * Navigation 원형 버튼
 */
export const NavCirButton = ({dataId, selectedId, label='Org', onClick}) => {
    return (
    <a 
        key={dataId}
        className={dataId === selectedId ? 'nav-cir-button clicked' : 'nav-cir-button'}
        onClick={onClick}
    >
        {label}
    </a>
  )
}

NavCirButton.prototypes = {
    /** response 데이터의 id 정보 */
    dataId: PropTypes.number.isRequired, 
    /** 선택된 요소의 id 정보 */
    selectedId: PropTypes.number, 
    /** Button 내용 입력  */
    label: PropTypes.string,
    /** 클릭 핸들링 함수 */
    onClick: PropTypes.func.isRequired,
}
