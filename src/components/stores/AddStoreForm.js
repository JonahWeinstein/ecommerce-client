import React from 'react'

class AddStoreForm extends React.Component {
    state = {
        error: undefined,
        success: undefined
    }
    onformSubmit = async (e) => {
        e.preventDefault()
        const store_name = e.target.elements.store_name.value
        const store = await this.addStore(store_name)
    }
    addStore = async (store_name) => {
        const data = { store_name }
        console.log(JSON.stringify(data))
        try {
            const authToken = sessionStorage.getItem('token')
            // remember to set content-type in request
            const response = await fetch(`http://localhost:3000/stores/add`, {
                body: JSON.stringify(data),
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST'});
            this.setState(() => ({success: "store added!", error: undefined}))
            return response.json()
        } catch (e) {
            this.setState(() => ({error: e, success: undefined}))
            return e
        }
    }
    render() {
        return (
            <div>
                <form onSubmit = {this.onformSubmit}>
                    <input 
                    type = "text" 
                    name = "store_name"
                    placeholder = "store name"
                    />
                    <button type = 'submit'>Create Store</button>
                    {this.state.error && <p className = "error">Something went wrong</p>}
                    {this.state.success && <p>{this.state.success}</p>}
                </form>
            </div>
        )
    } 
}

export default AddStoreForm