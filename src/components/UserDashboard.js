import React from 'react';
import StoresList from './stores/StoresList'
import AddStoreButton from './AddStoreButton';

class UserDashboard extends React.Component {
    state = {
        stores: []
    }
    async componentDidMount() {
        try{
            const result = await this.getStores()
            this.setState(() => ({stores: result}))
        } catch (e) {
            return e
        }
    }
    getStores = async () => {
        try{
            const authToken = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/stores', {
            headers: {
                'Authorization': `Bearer ${authToken}`
                }
            })
            return response.json();
        } catch (e) {
            return e
        }
    }
    render(){
        return (
            <div>
                <p>This is the user Dashboard</p>
                <StoresList stores = {this.state.stores} />
                <AddStoreButton />
                
            </div>
        )
    }
        
}

export default UserDashboard