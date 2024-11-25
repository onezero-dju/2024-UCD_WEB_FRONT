import React, { useEffect } from 'react'

const useOnclickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // console.log("event.target", event.target)
      if (!ref.current || ref.current.contains(event.target) || document.getElementById('write-modal-presentation').contains(event.target)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    }
  }, [ref, handler])
}

export default useOnclickOutside