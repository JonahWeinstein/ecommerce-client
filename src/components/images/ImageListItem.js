import React from 'react'

const ImageListItem = (props) => {
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    
    console.log(props.image.data.data)
    return (
        <div>
            <img src = { "data:image/png;base64," + arrayBufferToBase64(props.image.data.data)} />
        </div>
    )
}

export default ImageListItem