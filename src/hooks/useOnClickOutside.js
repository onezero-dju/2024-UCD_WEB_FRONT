import React, { useEffect } from 'react'

const useOnClickOutside = (ref, handler, prevent) => {
  useEffect(() => {
    const listener = (event) => {
      // console.log("event.target", event.target)
      if (!ref.current || ref.current.contains(event.target) || prevent) {
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

export default useOnClickOutside
