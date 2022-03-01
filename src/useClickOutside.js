import React from "react"

const useClickOutside = (elRef, callback) => {
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            // check if this is an outside click
            if (!elRef.current.contains(e.target) && callback) {
                callback(e)
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        // cleanup (removes the event listener when component unmounts)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [callback, elRef])
}

export default useClickOutside