import React, { useEffect, useRef } from 'react'
import './ModalFrame.css'
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ProfileModal = ({
        setModalOpen,
        children
    }) => {

    const ref = useRef();
    
    useOnClickOutside(ref, () => {
        setModalOpen(false);
    })
    
    return (
            <div className='presentation' role="presentation">
                <div className='wrapper-modal'>
                    <div className='modal' ref={ref}>
                        <span
                        onClick={() => setModalOpen(false)}
                        className="modal-close"
                        >
                            X
                        </span>
                        {/* 아래 임시 이미지 삽입 */}
                        <img
                            className='modal__poster-img'
                            src={`/logo512.png`}
                            alt="modal-img"
                        />
                        {/* 아래에 모달에 담길 뷰 컴포넌트 */}
                        {children} 
                    </div>
                </div>
            </div>
    )
}

export default ProfileModal
