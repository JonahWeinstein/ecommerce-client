import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'

class AddProductPage extends React.Component {
    render() {
        return (
            <div>
                <ProductForm store = {this.props.store}/>
            </div>
        )
    }

}
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id)
    
})
export default connect(mapSateToProps)(AddProductPage)