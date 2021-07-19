import React from 'react'
import {Link} from 'react-router-dom'

const ProductListItem = (props) => {
    return (
        <div>
            <Link to = {`/UserDashboard/stores/${props.product.StoreId}/products/add`}>{props.product.name}</Link>
        </div>
    )
}
export default ProductListItem
