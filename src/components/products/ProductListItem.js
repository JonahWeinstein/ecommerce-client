import React from 'react'
import {Link} from 'react-router-dom'


const ProductListItem = (props) => {
    // link is to product form using store id and product id
    return (
        <Link to = {`/UserDashboard/stores/${props.product.StoreId}/products/${props.product.id}`}>
            <div className = 'list__item'>
                <div class ="h1">{props.product.name}</div>
            </div>
        </Link>
    )
}
export default ProductListItem
