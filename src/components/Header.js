import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <div>
        <NavLink to = "/" activeClassName = "isActive" exact={true}>Dashboard</NavLink>
        <NavLink to = "/create" activeClassName = "isActive">Create</NavLink>
        <NavLink to = "/help" activeClassName = "isActive">Help</NavLink>
    </div>
)

export default Header