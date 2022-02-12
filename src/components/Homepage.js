import React from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'



const Homepage = () => (
    <div>
       
        <div className = 'centered'>
            <Link to = '/register' className = 'button cta'> Register </Link>
            <Link to = '/login' className = 'button cta'> Login </Link>
        </div>

    </div>
)

export default Homepage;