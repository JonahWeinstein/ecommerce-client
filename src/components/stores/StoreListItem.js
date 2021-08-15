import React from 'react'
import {Link} from 'react-router-dom'

const StoreListItem = (props) => {
    return (
        <Link to = {`UserDashboard/stores/${props.store.id}`}>
            <div className = "list__item">
                <div className = 'h1'>{props.store.store_name}</div>
            </div>
        </Link>
    )
}
export default StoreListItem
