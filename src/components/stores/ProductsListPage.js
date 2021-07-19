import React from 'react'
import { connect } from 'react-redux'



class ProductsList extends React.Component  {
    
    
    render() {
        return (
            <div>
            <p>Product list for {this.props.store.store_name}</p>
            </div>
        )
       
    }
}
const mapSateToProps = (state, props) => {
    return {
        store: state.stores.find((store) => store.id == props.match.params.id)
    }
}
export default connect(mapSateToProps)(ProductsList)