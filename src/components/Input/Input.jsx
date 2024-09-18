import React from 'react'
import PropTypes from 'prop-types';
import './Input.css'

/**
 * 입력 컴포넌트
 */
export const Input = ({type='text', id='input', onChange, required=false, label}) => {
    return (
        <div className='input-component'>
            <input 
                type={type} id={id} className="input-field"
                onChange={onChange}
                required={required}
            />
            {label && (
                <label htmlFor={id} className="input-label">{label}</label>
            )}
        </div>
    )
}

Input.propTypes = {
    /** 인풋 타입 지정*/
    type: PropTypes.string,
    /** 인풋 컴포넌트의 아이디 입력*/
    id: PropTypes.string.isRequired,
    /** 인풋 설명 입력 */
    label: PropTypes.string,
    /** 인풋 핸들링 함수 작성 */
    onChange: PropTypes.func.isRequired,
    /** 필수 요구 여부 지정 */
    required: PropTypes.bool,
};
