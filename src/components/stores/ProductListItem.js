import React from 'react'
import {Link} from 'react-router-dom'

const ProductListItem = (props) => {
    return (
        <div>
            {props.product.name}
        </div>
    )
}
export default ProductListItem
