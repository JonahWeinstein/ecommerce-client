import React from 'react'

const ImageListItem = (props) => {
    // images will either be from the database in Buffer form or from user in image format
    const normalizeImage = (image) => {
        // if image has a data field that means its from the database and needs to be converted
        if (image.data){
            console.log(image)
            image = "data:image/png;base64," + arrayBufferToBase64(image.data.data)
        } 
        return image
    }
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    return (
        <div>
            <img src = { normalizeImage(props.image)} />
        </div>
    )
}

export default ImageListItem