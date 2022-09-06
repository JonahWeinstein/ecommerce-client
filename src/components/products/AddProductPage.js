import React from 'react'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import Header from '../Header' 
import { useParams } from 'react-router-dom';



const AddProductPage = (props) => {
    
        const {id} = useParams()
        return (
            <div>
                <Header store_id={id} />
                <ProductForm store = {props.store} action = {'Add'} history = {props.history}/>
            </div>
        )
    }

const mapSateToProps = (state, props) => ({
    store: state.stores.find((store) => store.id == props.match.params.id),
    
})

export default connect(mapSateToProps)(AddProductPage)