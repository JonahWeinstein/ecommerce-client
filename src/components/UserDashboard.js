import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import StoresList from './stores/StoresList'
import Loading from './Loading';
import Header from './Header';
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
                    
                    <Header title = 'User Dashboard' />
                    {error && <p className = "error">{error}</p>}
                    <StoresList />
                    <div className ='centered'>
                        <Link className = 'button cta'to = "/UserDashboard/AddStore">Add Store</Link>
                    </div>
                    
                </div>
            ) : <Loading />
}
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})

export default connect(undefined, mapDispatchToProps)(UserDashboard)


