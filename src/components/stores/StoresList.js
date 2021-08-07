import React from 'react'
import { connect } from 'react-redux'
import StoreListItem from './StoreListItem'



const StoresList = (props) => {

    return (
        <div >
            <p>Stores</p>
            <ul class = "list">
                {props.stores.map((store) => (
                    <li key = {store.id}>
                        <StoreListItem 
                        store = {store}
                        
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