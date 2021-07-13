import React from 'react'

class AddStoreForm extends React.Component {
    state = {
        input: ''
    }
    onInputChange = (e) => {
        const input = e.target.value
        this.setState(()=> ({input}))
    }
    render() {
        return (
            <div>
                <form>
                    <input 
                    type = "text" 
                    name = "store_name"
                    onChange = {this.onInputChange} />
                </form>
            </div>
        )
    } 
}

export default AddStoreForm