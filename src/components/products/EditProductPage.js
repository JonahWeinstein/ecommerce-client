import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import ImageList from '../images/ImagesList'

class EditProductPage extends React.Component {
    render() {
        return (
            <div>
                <ProductForm store = {this.props.store} product = {this.props.product} action = {'Update'}/>
                <ImageList product = {this.props.product} />
            </div>
        )
    }
}
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id),
    product: state.products.find((product) => product.id == props.match.params.productId)
    
})
export default connect(mapSateToProps)(EditProductPage)