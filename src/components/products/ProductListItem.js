import React from 'react'
import {Link} from 'react-router-dom'

const ProductListItem = (props) => {
    // link is to editproduct page using store id and product id
    return (
        <div>
            <Link to = {`/UserDashboard/stores/${props.product.StoreId}/products/${props.product.id}`}>{props.product.name}</Link>
        </div>
    )
}
export default ProductListItem
