import React from 'react'
import { startAddStore} from '../../actions/storeActions'
import { connect } from 'react-redux'

class AddStoreForm extends React.Component {
    state = {
        error: undefined,
        success: undefined
    }
    onformSubmit = async (e) => {
        e.preventDefault()
        const store_name = e.target.elements.store_name.value
        const store = await this.props.startAddStore(store_name)
        // if store is undefined that means the post request failed
        if(store === undefined){
            this.setState(() => ({error:'Unable to add store'}))
        } 
        // if addStore (called by startAddStore) worked...
        else {
            this.setState(() => ({error: undefined, success:'Store Added!'}))
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
                    {this.state.error && <p className = "error">{this.state.error}</p>}
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