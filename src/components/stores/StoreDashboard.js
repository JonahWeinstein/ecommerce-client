import React from 'react';


class StoreDashboard extends React.Component {
    state = {
        products: []
    }
    async componentDidMount() {
        try{
            const products = await this.getProducts()
            this.setState(() => ({products}))
        } catch (e) {
            return e
        }
    }
    getProducts = async () => {
        try{
            const authToken = sessionStorage.getItem('token')
            const response = await fetch('http://localhost:3000/products/all?store=', {
            headers: {
                'Authorization': `Bearer ${authToken}`
                }
            })
            return response.json();
        } catch (e) {
            return e
        }
    }
    render(){
        return (
            <div>
                <p>This is the user Dashboard</p>
                <StoresList stores = {this.state.stores} />
                <AddStoreButton />
                
            </div>
        )
    }
        
}

export default StoreDashboard