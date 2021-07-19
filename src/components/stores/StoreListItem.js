import React from 'react'
import {Link} from 'react-router-dom'

const StoreListItem = (props) => {
    return (
        <div>
            <Link to = {`UserDashboard/stores/${props.store.id}`}>{props.store.store_name}</Link>
        </div>
    )
}
export default StoreListItem
