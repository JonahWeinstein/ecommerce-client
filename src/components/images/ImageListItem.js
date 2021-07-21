import React from 'react'

const ImageListItem = (props) => {
    // images will either be from the database in Buffer form or from user in image format
    
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    // must specify mime type and encoding so browser knows how to display the file
    return (
        <div>
            <img src = { "data:image/png;base64," + arrayBufferToBase64(props.image.data.data)} />
        </div>
    )
}

export default ImageListItem