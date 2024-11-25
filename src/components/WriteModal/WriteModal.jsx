import React, { useEffect, useRef } from 'react'
import './WriteModal.css'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { createPortal } from "react-dom";
import { Button } from '../Button/Button';


const WriteModal = ({ setModalOpen, setWriteMessage, handleJoinRequest }) => {
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  })

  return (
    createPortal(
      <div className="write-modal-presentation">
        <div className="write-modal-wrapper">
          <div className="write-modal-container">
            <span
              onClick={() => setModalOpen(false)}
              className="modal-close"
            >X</span>
            <div className="write-modal-area"></div>
            <div className="write-modal-button-wrapper">
              <Button>신청</Button>
              <Button>취소</Button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('root') // 모달을 body에 직접 렌더링
    )
  );
};

export default WriteModal;