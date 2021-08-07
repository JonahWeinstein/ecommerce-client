import React from 'react'
import {Link} from 'react-router-dom'
import { arrayBufferToBase64 } from '../../utils/displayImages'

const ProductListItem = (props) => {
    // get first image form products images array 
    const image = props.product.Images[0]
    // link is to editproduct page using store id and product id
    return (
        <Link to = {`/UserDashboard/stores/${props.product.StoreId}/products/${props.product.id}`}>
            <div className = 'list__item'>
                
                <img src = { "data:image/png;base64," + arrayBufferToBase64(image.data.data)}/>
                
                
                <div class ="h1">{props.product.name}</div>
            </div>
        </Link>
    )
}
export default ProductListItem
