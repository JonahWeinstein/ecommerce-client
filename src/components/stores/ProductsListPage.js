import React from 'react'
import { connect } from 'react-redux'
import {startGetProducts} from '../../actions/productActions'
import ProductListItem from './ProductListItem'



class ProductsList extends React.Component  {
    
    componentDidMount() {
        this.props.startGetProducts(this.props.store.id)
    }
    render() {
        return (
            <div>
            <p>Product list for {this.props.store.store_name}</p>
            <ul>
                {this.props.products.map((product) => (
                    <li key = {product.id}>
                        <ProductListItem product = {product}/>
                    </li>
                ))}
            </ul>
            </div>
        )
       
    }
}
const mapSateToProps = (state, props) => {
    return {
        store: state.stores.find((store) => store.id == props.match.params.id),
        products: state.products
    }
}
const mapDispatchToProps = (dispatch) => ({
    startGetProducts: (storeId) => dispatch(startGetProducts(storeId))
})
export default connect(mapSateToProps, mapDispatchToProps)(ProductsList)