import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {startGetProducts} from '../../actions/productActions'
import ProductListItem from './ProductListItem'
import Loading from '../Loading'
import Header from '../Header'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import {startDeleteStore, startGetStores} from '../../actions/storeActions'




const ProductsListPage = (props) => {
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async () =>{
            try {
                await props.startGetProducts(props.store.id)
                setLoaded(true)
                setError(undefined)
            } catch (e) {
                setSuccess(undefined)
                setError("Unable to load products")
            }
        }
        fetchData()
  
    }, []);

    const openModal = () => {
        setShowModal(true)
    }
    const hideModal = () => {
        setShowModal(false)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const store = await props.startDeleteStore(props.store.id)
            setError(undefined)
            setSuccess('Store Deleted')
            props.history.replace(`/UserDashboard`)
         }
         catch (e){
             console.log(e)
             setSuccess(undefined)
             setError('Unable to delete store :(')
         }
    }
    
        return loaded ? (
            <div>
            <Header title = {`${props.store.store_name} Products`}
            store = {props.store }/>
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