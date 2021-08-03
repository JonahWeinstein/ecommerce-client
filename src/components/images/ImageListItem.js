import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { deleteImage } from '../../utils/asyncLogic';


const ImageListItem = (props) => {
    const [selected, setSelected] = useState(false)
    // watch for selected to change and call handler from parent
    useEffect(() => {
        props.onSelect(props.image, selected)
    }, [selected])
    // toggle selected state when user selects an image
    const handleSelection = () => {
        // toggle selected state for this image
        setSelected((selected) => !selected); 
    }
    // images will either be from the database in Buffer form or from user in image format
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    // const handleDeleteImage = async (e) => {
    //     e.preventDefault()
    //     try{
    //         const image = await deleteImage(this.props.store.id, this.props.image.ProductId, this.props.image.id)
    //         console.log(image)
    //         console.log('success')
    //     } catch(e) {
    //         console.log('could not delete image')
    //     }
    // }
    // must specify mime type and encoding so browser knows how to display the file
    return (
        <div>
            <img src = { "data:image/png;base64," + arrayBufferToBase64(props.image.data.data)} />
            <button onClick = {handleSelection}>Delete</button>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    deleteImage: (storeId, productId, imageId) => dispatch(deleteImage(storeId, productId, imageId))
})  


export default connect(undefined, mapDispatchToProps)(ImageListItem)