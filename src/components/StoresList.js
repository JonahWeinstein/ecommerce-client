import React from 'react'
import StoreListItem from './StoreListItem'

const StoresList = (props) => {
    console.log(props.stores)
    return (
        <div>
            <p>Stores</p>
            <ul>
                {props.stores.map((store) => (
                    <li>
                        <StoreListItem 
                        store = {store}
                        key = {store.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
  
}

export default StoresList