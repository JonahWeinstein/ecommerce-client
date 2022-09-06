import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchProducts } from '../../actions/productActions'
import ProductListItem from './ProductListItem'
import Loading from '../Loading'
import Header from '../Header'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import {deleteStore, fetchStores} from '../../actions/storeActions'
import { useParams } from "react-router-dom";



const ProductsListPage = (props) => {
    const [error, setError] = useState(undefined)
    
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams()
   
    useEffect(() => {
        const getData = async () => {
            try{
                await props.fetchProducts(id, props.history)
                setLoaded(true)
            } catch(e) {
                console.log(e)
                setError('Unable to load products')
                setLoaded(true)
            }
        }
        getData()
        
    }, [])
       
    const openModal = () => {
        setShowModal(true)
    }
    
    const hideModal = () => {
        setShowModal(false)
    }
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const store = await props.deleteStore(id, props.history)
            setError(undefined)
            
            props.history.replace(`/UserDashboard`)
         }
         catch (e){
             console.log(e)
             
             setError('Unable to delete store :(')
         }
    }
    
        return loaded ? (
            <div>
            <Header 
            store_id = {id}/>
           
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
                    to = {`/UserDashboard/stores/${id}/products/add`}
                    className = 'button cta'
                    >Add Product</Link>

                </div>
                <button className = 'button delete-button' onClick = {openModal}>Delete Store</button>
                    <ConfirmDeleteModal 
                    show = {showModal} 
                    handleClose = {hideModal}
                    action = {handleClick}
                    type = {'store'}
                    setShowModal = {setShowModal}
                    
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

export default connect(mapSateToProps, {fetchStores, deleteStore, fetchProducts})(ProductsListPage)