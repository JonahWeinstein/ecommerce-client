import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'



class EditProductPage extends React.Component {
    render() {
        return (
            <div>
                
                <ProductForm store = {this.props.store} product = {this.props.product} action = {'Update'} history = {this.props.history}/>
            </div>
        )
    }
}
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id),
    // if we are adding product for the first time then product will be undefined
    product: state.products.find((product) => product.id == props.match.params.productId)
    
})

export default connect(mapSateToProps)(EditProductPage)