import React from 'react'
import AddStoreForm from './AddStoreForm'


const AddStorePage = () => {
    return (
        <div>
            <p>Pick A Name For Your Store </p>
            <AddStoreForm onAddStore = {() => {
                props.history.push('/UserDashboard')
            }} />
        </div>
    )
}

export default AddStorePage