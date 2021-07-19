const fetchStores = async () => {
    try{
        const authToken = sessionStorage.getItem('token')
        const response = await fetch('http://localhost:3000/stores', {
        headers: {
            'Authorization': `Bearer ${authToken}`
            }
        })
        return response.json();
    } catch (e) {
        return e
    }
}
const addStore = async (store_name) => {
    const data = { store_name }
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

export { fetchStores, addStore }