import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { setError } from '../../ErrorHandler';
import ProductForm from './ProductForm'
import { useParams } from 'react-router-dom';
import Loading from '../Loading'
import { fetchProduct } from '../../actions/productActions';
import Header from '../Header';




const EditProductPage = (props) => {
    
    const [loaded, setLoaded] = useState(false)
    const {id, productId} = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const product = await props.fetchProduct(id, productId, props.history)
                console.log(product)
                setLoaded(true)
                console.log('loaded')
            } catch (e) {
               console.log(e)
            }
        }
        getData()
    }, [])
        return loaded ? (
            <div>
            <Header store_id = {id}/>
                <ProductForm 
                product = {props.product} 
                action = {'Update'} 
                history = {props.history}
                storeId = {id}
                productId = {productId} />
            </div>
        ): <Loading />
    
}
const mapSateToProps = (state, props) => ({
    // if we are adding product for the first time then product will be undefined
    product: state.products.find((product) => product.id == props.match.params.productId)
})

export default connect(mapSateToProps, {fetchProduct})(EditProductPage)