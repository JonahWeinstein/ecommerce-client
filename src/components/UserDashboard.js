import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import StoresList from './stores/StoresList'

import { startGetStores } from '../actions/storeActions'




class UserDashboard extends React.Component {
        componentDidMount() {
            this.props.startGetStores()
        }
        render(){
            return (
                <div>
                    <p>This is the user Dashboard</p>
                    <StoresList />
                    <Link className = 'button cta'to = "/UserDashboard/AddStore">Add Store</Link>
                    
                </div>
            )
        } 
}
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})

export default connect(undefined, mapDispatchToProps)(UserDashboard)


