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

export { fetchStores }