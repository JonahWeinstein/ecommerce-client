import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import StoresList from './stores/StoresList'
import Loading from './Loading';
import { startGetStores } from '../actions/storeActions'




const UserDashboard = (props) => {
        const [loaded, setLoaded] = useState(false)
        const [error, setError] = useState(false)
        useEffect(() => {
            const getData = async () => {
                try{
                    await props.startGetStores()
                    setLoaded(true)
                } catch(e) {
                    setError('Unable to load stores')
                    setLoaded(true)
                }
                
            }
            getData()
            
        }, [])
        
            return loaded ? (
                <div>
                    <p>This is the user Dashboard</p>
                    {error && <p className = "error">{error}</p>}
                    <StoresList />
                    <Link className = 'button cta'to = "/UserDashboard/AddStore">Add Store</Link>
                    
                </div>
            ) : <Loading />
}
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})

export default connect(undefined, mapDispatchToProps)(UserDashboard)


