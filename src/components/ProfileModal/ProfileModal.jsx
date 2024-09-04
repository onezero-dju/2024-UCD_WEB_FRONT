import React from 'react'

const ProfileModal = ({
    setModalOpen
}) => {
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

                </div>
            </div>
        </div>
    )
}

export default ProfileModal
