import React from 'react';
import { connect } from 'react-redux'
import StoresList from './stores/StoresList'
import AddStoreButton from './AddStoreButton';
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
                    <AddStoreButton />
                    
                </div>
            )
        } 
}
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})

export default connect(undefined, mapDispatchToProps)(UserDashboard)


