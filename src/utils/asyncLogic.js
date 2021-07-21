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
const addProduct = async (name, description = '', price, quantity, storeId) => {
    const data = { name, description, price, quantity }
        const authToken = sessionStorage.getItem('token')
        // remember to set content-type in request
        const response = await fetch(`http://localhost:3000/stores/${storeId}/products/add`, {
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            method: 'POST'});
        if(!response.ok) {
            throw new Error(`Unable to add product ${response.status}`)
        }
        
        return response.json()
    
}
// updates a product with given id and storeId using argument values
const updateProduct = async (name, description = '', price, quantity, images, storeId, productId) => {
    const data = { name, description, price, quantity }
        const authToken = sessionStorage.getItem('token')
        // remember to set content-type in request
        const response = await fetch(`http://localhost:3000/stores/${storeId}/products/${productId}/update`, {
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            method: 'PATCH'});
        if(!response.ok) {
            throw new Error(`Unable to add product ${response.status}`)
        }
        for (let i = 0; i < images.length; i++) {
            try {
                const image = await addImage(images[i], storeId, productId)
                return image
            } catch (e) {
                throw new Error(`Unable to add product images ${response.status}`)
            }
        }
        return response.json()
}

// IMAGE LOGIC
const addImage = async (image, storeId, productId) => {
        const authToken = sessionStorage.getItem('token')
        let formData = new FormData()
        formData.append("image", image);
        const response = await fetch(`http://localhost:3000/stores/${storeId}/products/${productId}/images/add`, {
            body: formData,
            // we don't specify content-type because the browser handles that
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            method: 'POST'});
        if(!response.ok) {
            throw new Error(`Unable to add Image ${response.status}`)
        }
        return response.json() 
}

export { 
    fetchStores, 
    addStore, 
    fetchProducts, 
    addProduct, 
    updateProduct,
    addImage }