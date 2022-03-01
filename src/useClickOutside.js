import React from "react"

const useClickOutside = (elRef, callback) => {
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (!elRef.current.contains(e.target) && callback) {
                callback(e)
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        // cleanup
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [callback, elRef])
}

export default useClickOutside