import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({title, store_id}) => (
    <div className = 'header-wrapper'>
    <NavLink exact 
    activeClassName = "isActive" 
    className="nav-link"
    to= "/UserDashboard" >
        <div>
            Stores 
        </div>
    </NavLink>
    
    { store_id && <NavLink 
        exact
        activeClassName = "isActive"
        className="nav-link"
        to= {`/UserDashboard/stores/${store_id}/products`}
    > 
    <div>
        Products 
    </div>
   
    </NavLink>}
    <a 
    activeClassName = "isActive"
    className="nav-link"
    href={'/api/users/logout'}>
    Logout  
    </a>
    
        
        
        
    </div>
)

export default Header