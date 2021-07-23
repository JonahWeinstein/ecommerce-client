import React from 'react'
import {connect} from 'react-redux'
import ImageListItem from './ImageListItem'



const ImagesList = (props) => {
    // if there are images associated with this product then list them
    if(props.product.Images){
        return (
            <div >
                <ul>
                
                    {props.product.Images.map((image) => (
                        <li key = {image.id}>
                            <ImageListItem 
                            image = {image}
                            store = {props.store}
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