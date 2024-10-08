import React from 'react'
import PropTypes from 'prop-types';
import './Button.css'

/**
 * 버튼 컴포넌트
 */
export const Button = ({primary=false, type, size='medium', label='button', onClick}) => {
  const mode = primary ? 'primary' : 'secondary';

  return (
    <button className={['btn', mode, size].join(' ')} type={type} onClick={onClick}>{label}</button>
  )
}

Button.propTypes = {
  /** 페이지 내에서 중요한 버튼인지? */
  primary: PropTypes.bool,
  /** Button 타입 (submit 등) 지정 */
  type: PropTypes.string,
  /** Button 내용 입력 */
  label: PropTypes.string.isRequired,
  /** 버튼 사이즈 지정 */
  size: PropTypes.oneOf(['medium', 'full']),
  /** 클릭 핸들링 함수 */
  onClick: PropTypes.func,
};
