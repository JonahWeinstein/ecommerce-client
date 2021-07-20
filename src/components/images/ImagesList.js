import React from 'react'
import ImageListItem from './ImageListItem'


const ImagesList = (props) => {

    return (
        <div >
            <ul>
                {props.product.Images.map((image) => (
                    <li key = {image.id}>
                        <ImageListItem 
                        image = {image}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
  
}



export default ImagesList