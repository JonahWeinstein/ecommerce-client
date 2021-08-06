import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {startDeleteStore, startGetStores} from '../../actions/storeActions'
import { Link } from 'react-router-dom'


const StoreDashboard = (props) => {
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)

    useEffect(() => {
        const getStores = async () => {   
            await props.startGetStores()
        }
        getStores()
    }, [])
    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const store = await props.startDeleteStore(props.store.id)
            setError(undefined)
            setSuccess('Product Deleted')
            props.history.replace(`/UserDashboard`)
         }
         catch (e){
             console.log(e)
             setSuccess(undefined)
             setError('Unable to delete store :(')
         }
    }
    
        return (
            <div>
                <p>{props.store.store_name} </p>
                <Link to = {`/UserDashboard/stores/${props.store.id}/products`}>Products</Link>
                <button onClick = {handleClick}>Delete Store</button>
            </div>
        )
    }
const mapSateToProps = (state, props) => {
    // add conditional logic for if store isn't found
    return {
        store: state.stores.find((store) => store.id == props.match.params.id)
    }
}   
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores()),
    startDeleteStore: (storeId) => dispatch(startDeleteStore(storeId))
})

export default connect(mapSateToProps,mapDispatchToProps)(StoreDashboard)