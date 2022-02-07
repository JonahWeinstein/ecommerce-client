import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({title, store}) => (
    <div className = 'header-wrapper'>
    <NavLink exact 
    activeClassName = "isActive" 
    className="nav-link"
    to= "/UserDashboard" >
        <div>
            Stores 
        </div>
    </NavLink>
    
    { store && <NavLink 
        exact
        activeClassName = "isActive"
        className="nav-link"
        to= {`/UserDashboard/stores/${store.id}/products`}
    > 
    <div>
        Products 
    </div>
   
    </NavLink>}
    
        
        
        
    </div>
)

export default Header