import React from 'react';
import Header from './Header'
import LoginForm from './LoginForm';

const Homepage = (props) => (
    <div>
        <Header title = 'Homepage'/>
        <LoginForm
        // history is only available on components used directly in a route
        onSubmit = {() => {
            props.history.push('/UserDashboard')
        }} />
        

    </div>
)

export default Homepage;