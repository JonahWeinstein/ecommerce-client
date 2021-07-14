import React from 'react'
import { connect } from 'react-redux'
import StoreListItem from './StoreListItem'


const StoresList = (props) => {
    return (
        <div>
            <p>Stores</p>
            <ul>
                {props.stores.map((store) => (
                    <li>
                        <StoreListItem 
                        store = {store}
                        key = {store.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
  
}
const mapStateToProps = (state) => {
    return {
        stores: state.stores
    }
}

export default connect(mapStateToProps)(StoresList)