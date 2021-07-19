import React from 'react'
import { startAddStore} from '../../actions/storeActions'
import { connect } from 'react-redux'

class AddStoreForm extends React.Component {
    state = {
        error: undefined,
        success: undefined
    }
    onformSubmit = (e) => {
        e.preventDefault()
        const store_name = e.target.elements.store_name.value
        console.log(store_name)
        const store = this.props.startAddStore(store_name)
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
const mapDispatchToProps = (dispatch) => ({
    startAddStore: (store_name) => dispatch(startAddStore(store_name))
})

export default connect(undefined, mapDispatchToProps)(AddStoreForm)