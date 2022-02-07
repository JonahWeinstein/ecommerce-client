import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import Header from '../Header' 



class AddProductPage extends React.Component {
    render() {
        return (
            <div>
                <Header store = {this.props.store.id}/>
                <ProductForm store = {this.props.store} action = {'Add'} history = {this.props.history}/>
            </div>
        )
    }
}
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id),
    
})

export default connect(mapSateToProps)(AddProductPage)