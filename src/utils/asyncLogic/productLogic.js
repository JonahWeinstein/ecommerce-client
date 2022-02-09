const fetchProducts = async (storeId) => {
   
    const authToken = sessionStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/all`, {
    headers: {
        'Authorization': `Bearer ${authToken}`
        }
    })
    if(!response.ok) {
       
        throw new Error(`Unable to fetch products ${response.status}`)
    }
    return response.json();

}
const fetchProduct = async (storeId, productId) => {
const authToken = sessionStorage.getItem('token')
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}`, {
    headers: {
        'Authorization': `Bearer ${authToken}`
        }
    })
    if(!response.ok) {
        throw new Error(`Unable to fetch products ${response.status}`)
    }
    return response.json();
}
const addProduct = async (name, description, price, quantity, storeId) => {
    const data = { name, description, price, quantity }
    const authToken = sessionStorage.getItem('token')
    // remember to set content-type in request
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/add`, {
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
// runs addProduct and uses the return product's id to add image(s) for that product
const addProductWithImages = async (name, description = '', price, quantity, images, storeId) => {
try {
    const product = await addProduct(name, description, price, quantity, storeId)
    console.log(images)
    for (let i = 0; i < images.length; i++) {
        try {
            const image = await addImage(images[i].image, images[i].order, storeId, product.id)
        } catch (e) {
           return e
        }
    }
    return product
} catch (e) {
    return e
}

}
// updates a product with given id and storeId using argument values
const updateProduct = async (name, description = '', price, quantity, images, imagesToDelete, storeId, productId) => {
const data = { name, description, price, quantity }
    const authToken = sessionStorage.getItem('token')
    // remember to set content-type in request
    
        const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/update`, {
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
        method: 'PATCH'});
    if(!response.ok) {
        throw new Error(`Unable to add product ${response.status}`)
    }
    for(let i = 0; i<imagesToDelete.length; i++) {
        try {
            await deleteImage(storeId, productId, imagesToDelete[i].id)
        } catch(e) {
            throw e
        }            
    }
    for (let i = 0; i < images.length; i++) {
        try {
            const image = await addImage(images[i].image, images[i].order, storeId, productId)
            return image
        } catch (e) {
            throw new Error(`Unable to add product images ${response.status}`)
        }
    }
    return response.json()
    
    
}
// DELETE PRODUCT

const deleteProduct = async (storeId, productId) => {
const authToken = sessionStorage.getItem('token')
const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/delete`, {
    headers: {
        'Authorization': `Bearer ${authToken}`
    },
    method: 'DELETE'})
    if(!response.ok) {
        throw new Error(`Unable to delete product ${response.status}`)
    }
    return response.json() 
}
// IMAGE LOGIC
const fetchImages = async (storeId, productId) => {
const authToken = sessionStorage.getItem('token')
const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/images`, {
    headers: {
        'Authorization': `Bearer ${authToken}`
    }});
if(!response.ok) {
    throw new Error(`Unable to add Image ${response.status}`)
}
return response.json() 
}

const addImage = async (image, order, storeId, productId) => {
    const authToken = sessionStorage.getItem('token')
    let formData = new FormData()
    formData.append("image", image);
    formData.append("order", JSON.stringify(order));
    
    
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/images/add`, {
        body: formData,
        
        // don't specify content-type because the browser handles that
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        method: 'POST'});
    if(!response.ok) {
        throw new Error(`Unable to add Image ${response.status}`)
    }
    return response.json() 
}
const deleteImage = async (storeId, productId, imageId) => {
const authToken = sessionStorage.getItem('token')
const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/images/${imageId}/delete`, {
    headers: {
        'Authorization': `Bearer ${authToken}`
    },
    method: 'DELETE'});
    if(!response.ok) {
        throw new Error(`Unable to Delete Images`)
    }
    return response.json()
}   

export {
    fetchProducts, 
    addProductWithImages, 
    updateProduct,
    addImage,
    deleteProduct,
    fetchImages,
    deleteImage,
    fetchProduct }