import React, { useEffect, useRef } from 'react'
import './ModalFrame.css'
import useOnclickOutside from '../../hooks/useOnclickOutside';
import { createPortal } from "react-dom";

const ModalFrame = ({
  setModalOpen,
  secondModalOpen,
  children
}) => {

  const ref = useRef();

  useOnclickOutside(ref, () => {
    setModalOpen(false);
  }, secondModalOpen);

  return (
    createPortal(
      <div className='presentation' role="presentation">
        <div className='wrapper-modal'>
          <div className='modal' ref={ref}>
            <span
              onClick={() => setModalOpen(false)}
              className="modal-close"
            >
              X
            </span>
            {/* 아래에 모달에 담길 뷰 컴포넌트 */}
            {children}
          </div>
        </div>
      </div>
      , document.getElementById('root')
    )
  )
}

ModalFrame.defaultProps = {
  secondModalOpen: false, // isSecondModalOpen이 전달되지 않으면 false로 기본값 설정
};

export default ModalFrame
