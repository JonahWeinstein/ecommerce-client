import React from 'react';
import StoresList from './stores/StoresList'
import AddStoreButton from './AddStoreButton';




const UserDashboard = (props) => {
    console.log(props)
   
        return (
            <div>
                <p>This is the user Dashboard</p>
                <StoresList  />
                <AddStoreButton />
                
            </div>
        )
}



export default UserDashboard


