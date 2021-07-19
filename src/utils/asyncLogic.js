// STORE LOGIC  

const fetchStores = async () => {
    try{
        const authToken = sessionStorage.getItem('token')
        const response = await fetch('http://localhost:3000/stores', {
        headers: {
            'Authorization': `Bearer ${authToken}`
            }
        })
        if(!response.ok) {
            throw new Error(`An Error has occured ${response.status}`)
        }
        return response.json();
    } catch (e) {
        return e
    }
}
const addStore = async (store_name) => {
    const data = { store_name }
    
        const authToken = sessionStorage.getItem('token')
        // remember to set content-type in request
        const response = await fetch(`http://localhost:3000/stores/add`, {
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST'});
        if(!response.ok) {
            throw new Error(`An Error has occured ${response.status}`)
        }
        return response.json()
    
}
// PRODUCT LOGIC

const fetchProducts = async (storeId) => {
    
        const authToken = sessionStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/stores/${storeId}/products/all`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
            }
        })
        if(!response.ok) {
            throw new Error(`Unable to fetch products ${response.status}`)
        }
        return response.json();
    
}
export { fetchStores, addStore, fetchProducts }