import React, { useEffect, useRef } from 'react'
import './ModalFrame.css'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import {createPortal} from "react-dom";

const ModalFrame = ({
        setModalOpen,
        children
    }) => {

    const ref = useRef();
    
    useOnClickOutside(ref, () => {
        setModalOpen(false);
    })
    
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
            ,document.getElementById('root')
        )
    )
}

export default ModalFrame
