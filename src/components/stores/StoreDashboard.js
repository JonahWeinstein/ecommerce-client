import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {deleteStore, fetchStores} from '../../actions/storeActions'
import { Link } from 'react-router-dom'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import Header from '../Header';


const StoreDashboard = (props) => {
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const getStores = async () => {   
            await props.fetchStores()
        }
        getStores()
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
            const store = await props.deleteStore(props.store.id)
            setError(undefined)
            setSuccess('Store Deleted')
         }
         catch (e){
             console.log(e)
             setSuccess(undefined)
             setError('Unable to delete store :(')
         }
    }
    
        return (
            <div className = "form">
            <Header title = {props.store.store_name} />
            <ConfirmDeleteModal 
            show = {showModal} 
            handleClose = {hideModal}
            action = {handleClick}
            type = {'store'}
            />
                <Link to = {`/UserDashboard/stores/${props.store.id}/products`}>Products</Link>
                <button className = 'button delete-button' onClick = {openModal}>Delete Store</button>
            </div>
        )
    }
const mapSateToProps = (state, props) => {
    // add conditional logic for if store isn't found
    return {
        store: state.stores.find((store) => store.id == props.match.params.id)
    }
}   


export default connect(mapSateToProps,{fetchStores, deleteStore})(StoreDashboard)