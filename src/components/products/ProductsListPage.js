import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {startGetProducts} from '../../actions/productActions'
import ProductListItem from './ProductListItem'




class ProductsListPage extends React.Component  {
    
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
            <Link to = {`/UserDashboard/stores/${this.props.store.id}/products/add`}>Add Product</Link>
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
export default connect(mapSateToProps, mapDispatchToProps)(ProductsListPage)