import React from 'react'
import ImageListItem from './ImageListItem'


const ImagesList = (props) => {
    // if there are images associated with this product then list them
    if(props.product){
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
    } else {
        return (
            <div>

            </div>
        )
    }
    
  
}



export default ImagesList