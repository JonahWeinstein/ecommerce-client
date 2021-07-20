import React from 'react'
import { startAddProduct, startUpdateProduct } from '../../actions/productActions'
import { connect } from 'react-redux'



class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        // if we are editing a product we want to set state to match current product values
        this.state = {
            name: props.product ? props.product.name : '',
            description: props.product ? props.product.description : '',
            price: props.product ? props.product.price.toString() : '',
            quantity: props.product ? props.product.quantity: 0,
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
        // make sure required fields are filled out
        if(!this.state.name || !this.state.price || !this.state.quantity) {
            this.setState(() => ({error: 'Name, price, and quantity are required'}))
        } else {
            // get field values from component state
            const {name, description, price, quantity } = this.state
            try {
                // if we are updating a product, use startUpdateProduct instead of startAddProduct
                if(this.props.product) {
                    const product = await this.props.startUpdateProduct(
                        name, 
                        description, 
                        price, 
                        quantity, 
                        this.props.store.id,
                        this.props.product.id 
                        )
                } else {
                    // add product using the storeId from mapstatetoprops
                    const product = await this.props.startAddProduct(
                        name, 
                        description, 
                        price, 
                        quantity, 
                        this.props.store.id
                        )
                }
                // setState needs some logic to see if product is being added or updated 
                this.setState(() => ({
                    error: undefined, 
                    success: 'Product '  + (this.props.action == 'Add' ? 'Added' : 'Updated')}))
            } catch (e) { 
                this.setState(() => ({error:`Unable To ${this.props.action} Product`, success: undefined}))
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

                <button type = 'submit'>{this.props.action} Product</button> 
                </form>
            </div>
        )
    } 
}
const mapDispatchToProps = (dispatch) => ({
    startAddProduct: (name, description, price, quantity, storeId) => dispatch(startAddProduct(name, description, price, quantity, storeId)),
    startUpdateProduct: (name, description, price, quantity, storeId, productId) => dispatch(startUpdateProduct(name, description, price, quantity, storeId, productId))
})


export default connect(undefined, mapDispatchToProps)(ProductForm)