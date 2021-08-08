import React from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'



const Homepage = () => (
    <div>
        <Header title = 'Homepage'/>
        <Link to = '/register'> Register </Link>
        <Link to = '/login' > Login </Link>

    </div>
)

export default Homepage;