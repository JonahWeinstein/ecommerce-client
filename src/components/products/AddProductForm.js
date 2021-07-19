import React from 'react'
import { startAddProduct } from '../../actions/productActions'
import { connect } from 'react-redux'

class AddProductForm extends React.Component {
    constructor(props) {
        super(props)
        // if we are editing an expense we want to set state to match current expense values
        this.state = {
            name: props.product ? props.product.name : '',
            amount: props.product ? props.product.description : '',
            note: props.product ? props.product.price.toString() : '',
            createdAt: props.product ? props.product.quantity: 0,
            error: undefined,
            success: undefined
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }
    onNameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }
    onPriceChange = (e) => {
        const price = e.target.value
        // this regex doesn't work exactly as it should
        if(!price || price.match(/^\d{1,}(\.\d{0,2})?/)){
            this.setState(() => ({ price }))
        }
    }
    onQuantityChange = (e) => {
        const quantity = e.target.value
        this.setState(() => ({ quantity }))
    }
    onformSubmit = async (e) => {
        e.preventDefault()
        if(!this.state.name || !this.state.price || !this.state.quantity) {
            this.setState(() => ({error: 'Name, price, and quantity are required'}))
        } else {
            const {name, description, price, quantity } = this.state
            try {
                const store = await this.props.startAddProduct(name, description, price, quantity, this.props.store.id)
                this.setState(() => ({error: undefined, success:'Product Added!'}))
            } catch (e) {
                this.setState(() => ({error:'Unable to add product', success: undefined}))
            }
        }
        
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.onformSubmit}>
                    {this.state.error && <p className = "error">{this.state.error}</p>}
                    {this.state.success && <p>{this.state.success}</p>}
                    <input 
                    type = 'text' 
                    placeholder = 'name'
                    value = {this.state.name}
                    onChange = {this.onNameChange}
                    autoFocus />
                    <input 
                    type = 'text'
                    placeholder = 'description'
                    value = {this.state.description}
                    onChange = {this.onDescriptionChange}
                    />
                    <input 
                    type = 'text'
                    placeholder = 'price'
                    value = {this.state.price}
                    onChange = {this.onPriceChange}
                    />
                    <input 
                    type = 'number'
                    placeholder = 'quantity'
                    value = {this.state.quantity}
                    onChange = {this.onQuantityChange}
                    />
                <button type = 'submit'>Add Product</button> 
                </form>
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) => ({
    startAddProduct: (name, description, price, quantity, storeId) => dispatch(startAddProduct(name, description, price, quantity, storeId))
})
const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id)
})

export default connect(mapSateToProps, mapDispatchToProps)(AddProductForm)