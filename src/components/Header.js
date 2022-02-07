import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({title, store}) => (
    <div className = 'header-wrapper'>
    <div>
        <NavLink to= "/UserDashboard"> Stores </NavLink>
    </div>
    <div>
    { store && <NavLink to= {`/UserDashboard/stores/${store.id}/products`}> products </NavLink>}
    </div>
        
        
        
    </div>
)

export default Header