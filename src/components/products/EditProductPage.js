import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import ProductForm from './ProductForm'



const EditProductPage = (props) => {
    
        return (
            <div>
                
                <ProductForm 
                store = {props.store} 
                product = {props.product} 
                action = {'Update'} 
                history = {props.history}
                storeId = {props.match.params.id}
                productId = {props.match.params.productId} />
            </div>
        )
    
}
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id),
    // if we are adding product for the first time then product will be undefined
    product: state.products.find((product) => product.id == props.match.params.productId)
})

export default connect(mapSateToProps)(EditProductPage)