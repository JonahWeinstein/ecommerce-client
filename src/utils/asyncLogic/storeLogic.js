const fetchStores = async () => {
    try{
        const authToken = sessionStorage.getItem('token')
        const response = await fetch('${process.env.API_URL}/stores', {
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
        const response = await fetch(`${process.env.API_URL}/stores/add`, {
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

const deleteStore = async (storeId) => {
    const authToken = sessionStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/delete`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        method: 'DELETE'})
        if(!response.ok) {
            throw new Error(`Unable to delete Store ${response.status}`)
        }
        return response.json() 
}

export { 
    fetchStores, 
    addStore, 
    deleteStore
}