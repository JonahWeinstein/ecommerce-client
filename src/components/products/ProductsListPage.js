import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {startGetProducts} from '../../actions/productActions'
import ProductListItem from './ProductListItem'
import Loading from '../Loading'
import Header from '../Header'




class ProductsListPage extends React.Component  {
    state = {
        loaded: false,
        error: undefined
    }
    async componentDidMount() {
        try {
            await this.props.startGetProducts(this.props.store.id)
            this.setState(() => ({loaded: true}))
        } catch (e) {
            this.setState(()=> ({error: 'Unable to load Products :('}))
        }
        
    }
    render() {
        const {loaded} =this.state
        return loaded ? (
            <div>
            <Header title = {`${this.props.store.store_name} Products`} />
            <div className = 'centered'>
            <ul className = 'list'>
                {this.props.products.map((product) => (
                    <li key = {product.id}>
                        <ProductListItem product = {product}/>
                    </li>
                ))}
            </ul>
            
            </div>
            <div className = 'centered'>
                <Link 
                to = {`/UserDashboard/stores/${this.props.store.id}/products/add`}
                className = 'button cta'
                >Add Product</Link>
            </div>
           
            
            </div>
        ) : <Loading />
       
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