
const addStore = async (store_name) => {
    const data = { store_name }
    
        
        // remember to set content-type in request
        const response = await fetch(`${process.env.API_URL}/stores/add`, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'POST'});
        if(!response.ok) {
            throw new Error(`An Error has occured ${response.status}`)
        }
        return response.json()
    
}

const deleteStore = async (storeId) => {
    
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/delete`, {
        credentials: 'include',
        method: 'DELETE'})
        
        if(!response.ok) {
            throw new Error(`Unable to delete Store ${response.status}`)
        }
        return response.json() 
}

export { 
    
    addStore, 
    deleteStore
}