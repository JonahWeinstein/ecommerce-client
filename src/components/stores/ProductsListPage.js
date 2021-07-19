import React from 'react'
import { connect } from 'react-redux'
import {startGetProducts} from '../../actions/productActions'



class ProductsList extends React.Component  {
    
    componentDidMount() {
        this.props.startGetProducts(this.props.store.id)
    }
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
const mapDispatchToProps = (dispatch) => ({
    startGetProducts: (storeId) => dispatch(startGetProducts(storeId))
})
export default connect(mapSateToProps, mapDispatchToProps)(ProductsList)