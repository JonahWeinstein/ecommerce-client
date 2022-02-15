import React, {useEffect, useState} from 'react'
import { arrayBufferToBase64 } from '../../utils/displayImages'



const ImageListItem = (props) => {
    const [selected, setSelected] = useState(false)
    // const [order, setOrder] = useState(props.image.order)
    // watch for selected to change and call handler from parent
    useEffect(() => {
        props.onSelect(props.image, selected)
    }, [selected])
    // toggle selected state when user selects an image
    const handleSelection = () => {
        // toggle selected state for this image
        setSelected((selected) => !selected); 
    }
    

    // must specify mime type and encoding so browser knows how to display the file
    return (
        <div>
            <img 
            src = { "data:image/png;base64," + arrayBufferToBase64(props.image.data.data)} 
            className = {selected ? 'image--selected' : ''}
            />
            <button  onClick = {handleSelection}>X</button>

            
        </div>
    )
}



export default ImageListItem