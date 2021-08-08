import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ({title}) => (
    <div className = 'centered'>
        <h1>{title}</h1>
    </div>
)

export default Header