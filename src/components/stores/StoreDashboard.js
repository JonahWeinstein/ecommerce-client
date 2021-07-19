import React from 'react';
import { connect } from 'react-redux'
import {startGetStores} from '../../actions/storeActions'


class StoreDashboard extends React.Component {
    
    // state = {
    //     products: []
    // }
    async componentDidMount() {
        await this.props.startGetStores()
    }
    // getProducts = async () => {
    //     try{
    //         const authToken = sessionStorage.getItem('token')
    //         const response = await fetch('http://localhost:3000/products/all?store=', {
    //         headers: {
    //             'Authorization': `Bearer ${authToken}`
    //             }
    //         })
    //         return response.json();
    //     } catch (e) {
    //         return e
    //     }
    // }
    render(){
        console.log(this.props)
        return (
            <div>
                <p>This is the Store Dashboard for store </p>
            </div>
        )
    }
        
}
const mapSateToProps = (state, props) => {
    return {
        store: state.stores.find((store) => store.id == props.match.params.id)
    }
}   
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})

export default connect(mapSateToProps,mapDispatchToProps)(StoreDashboard)