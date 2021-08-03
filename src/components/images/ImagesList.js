import React from 'react'
import ImageListItem from './ImageListItem'



const ImagesList = (props) => {
    const onSelect = (image, selected) => {
        if(!selected) {
            props.setSelectedImages(
                prevImages => prevImages.filter((currentImage) => currentImage.id != image.id)
                )
        }
        else {
            props.setSelectedImages(prevImages => prevImages.concat(image))
        }
    }
    
    // if there are images associated with this product then list them
    if(props.product){
        return (
            <div >
                <ul>
                
                    {props.product.Images.map((image) => (
                        <li key = {image.id}>
                            <ImageListItem 
                            image = {image}
                            store = {props.store}
                            onSelect = {onSelect}
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
// const mapstatetoprops = (state) => ({
//     images
// })



export default ImagesList