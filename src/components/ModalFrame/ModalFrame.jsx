import React, { useRef } from 'react'
import './ModalFrame.css'

const ProfileModal = ({
        setModalOpen,
        children
    }) => {
    const ref = useRef();
    
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
                        <img
                            className='modal__poster-img'
                            src={`/logo512.png`}
                            alt="modal-img"
                        />
                        {children}
                    </div>
                </div>
            </div>
    )
}

export default ProfileModal
