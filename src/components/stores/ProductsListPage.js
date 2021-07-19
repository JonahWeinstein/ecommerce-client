import React from 'react'
import { connect } from 'react-redux'



const ProductsList = (props) => {
    // destruct id from url parameters
    console.log(props)
    return (
        <div>
            <p>Product list for {props.store.store_name}</p>
        </div>
    )
}
const mapSateToProps = (state, props) => {
    return {
        store: state.stores.find((store) => store.id == props.match.params.id)
    }
}
export default connect(mapSateToProps)(ProductsList)