import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {startGetProducts, getProducts} from '../../actions/productActions'
import ProductListItem from './ProductListItem'
import Loading from '../Loading'
import Header from '../Header'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import {startDeleteStore, startGetStores, deleteStoreAction} from '../../actions/storeActions'
import useQueryComp from '../../useQueryComp'
import useQuery from '../../useQuery'


const ProductsListPage = (props) => {
    const [error, setError] = useState(undefined)
    
    // const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [queryParams, setQueryParams] = useState()
   
        const { data, loaded} = useQueryComp(queryParams || {url: `/stores/${props.store.id}/products/all`,
        updates: null,
        method: 'GET',
        reduxCallback: getProducts
    })
       
   
    
   
 

    const openModal = () => {
        setShowModal(true)
    }
    const hideModal = () => {
        setShowModal(false)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await useQuery(`/stores/${props.store.id}/delete`,
                null,
                'DELETE',
                deleteStoreAction)
            
            setError(undefined)
            
            props.history.push(`/UserDashboard`)
         }
         catch (e){
             console.log(e)
             
             setError('Unable to delete store :(')
         }
    }
    
        return loaded ? (
            <div>
            <Header 
            store = {props.store }/>
           
            { error && <p className = "error">{error}</p>}
            
            <div>
                <div className = 'centered'>
                
                
                
                <ul className = 'list'>
                    {props.products.map((product) => (
                        
                        <li key = {product.id}>
                            <ProductListItem product = {product}/>
                        </li>
                    ))}
                </ul>
                
                </div>
                <div className = 'centered'>
                    <Link 
                    to = {`/UserDashboard/stores/${props.store.id}/products/add`}
                    className = 'button cta'
                    >Add Product</Link>

                </div>
                <button className = 'button delete-button' onClick = {openModal}>Delete Store</button>
                    <ConfirmDeleteModal 
                    show = {showModal} 
                    handleClose = {hideModal}
                    action = {handleClick}
                    type = {'store'}
                    />
                
            </div>
        
        </div>
            
        ) : <Loading />
       
    
}
const mapSateToProps = (state, props) => {
    return {
        store: state.stores.find((store) => store.id == props.match.params.id),
        products: state.products
    }
}
const mapDispatchToProps = (dispatch) => ({
    startGetProducts: (storeId) => dispatch(startGetProducts(storeId)),
    startGetStores: () => dispatch(startGetStores()),
    startDeleteStore: (storeId) => dispatch(startDeleteStore(storeId))
})
export default connect(mapSateToProps, mapDispatchToProps)(ProductsListPage)