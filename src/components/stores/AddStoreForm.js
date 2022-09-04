import React from 'react'
import { addStore } from '../../actions/storeActions'
import { connect } from 'react-redux'


class AddStoreForm extends React.Component {
    state = {
        error: undefined,
        success: undefined
    }
    onformSubmit = async (e) => {
        e.preventDefault()
        const store_name = e.target.elements.store_name.value
        try {
            const store = await this.props.addStore({store_name: store_name}, this.props.history)
            this.setState(() => ({error: undefined, success:'Store Added!'}))
       
        } catch (e) {
            console.log(e)
            this.setState(() => ({error:'Unable to add store', success: undefined}))
        }
    }
    render() {
        return (
            <div>
                <p>Pick A Name For Your Store</p>
                <div className = 'form__wrapper'>
                    <form onSubmit = {this.onformSubmit} className = 'form'>
                        <input 
                        type = "text" 
                        name = "store_name"
                        placeholder = "store name"
                        />
                        <button type = 'submit' className = 'button cta'>Create Store</button>
                        {this.state.error && <p className = "error">{this.state.error}</p>}
                        {this.state.success && 
                            <p>{this.state.success}</p>

                        }
                    </form>
                </div>
                
            </div>
        )
    } 
}


export default connect(undefined, {addStore})(AddStoreForm)