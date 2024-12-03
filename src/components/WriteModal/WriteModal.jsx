import './WriteModal.css'
import { createPortal } from "react-dom";
import { Button } from '../Button/Button';


const WriteModal = ({ setModalOpen, setWriteMessage, handleJoinRequest }) => {


  return (
    createPortal(
      <div className="write-modal-presentation">
        <div className="write-modal-wrapper">
          <div className="write-modal-container">
            <span
              onClick={() => setModalOpen(false)}
              className="modal-close"
            >X</span>
            <div className='message-component'>
              <textarea
                type='text' id='write-join-message' className="message-field"
                onChange={(e) => setWriteMessage(e.target.value)}
                required
              />
              <label htmlFor='write-join-message' className="message-label">
                가입 요청 메세지를 입력하세요.
              </label>
            </div>
            <div className="write-modal-button-wrapper">
              <Button
                label='신청'
                onClick={() => {
                  handleJoinRequest();
                  setModalOpen(false);
                }} />
              <Button
                label='취소'
                onClick={() => setModalOpen(false)} />
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('root') // 모달을 body에 직접 렌더링
    )
  );
};

export default WriteModal;