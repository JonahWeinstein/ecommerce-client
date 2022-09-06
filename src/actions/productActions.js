import { updateProduct } from "../utils/asyncLogic/productLogic";
import { setError } from "../ErrorHandler";


const fetchProducts = (storeId, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/${storeId}/products/all`, {
        credentials: 'include'
    })
    setError(result, history)
    dispatch({ type: 'GET_PRODUCTS', payload: await result.json() });
}


const fetchProduct = (storeId, productId, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}`, {
        credentials: 'include'
    })
    setError(result, history)
    dispatch({ type: 'GET_PRODUCT', payload: await result.json() });
}

const addImage = async (image, order, storeId, productId) => {

    let formData = new FormData()
    formData.append("image", image);
    formData.append("order", JSON.stringify(order));


    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/images/add`, {
        body: formData,
        credentials: 'include',

        // don't specify content-type because the browser handles that
        method: 'POST'
    });
    if (!response.ok) {
        throw new Error(`Unable to add Image ${response.status}`)
    }
    return response.json()
}

const addProduct = (name, description = '', price, quantity, images, storeId, history) => async dispatch => {
    const data = { name, description, price, quantity }
    const response = await fetch(`${process.env.API_URL}/stores/${storeId}/products/add`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'
    }).then(res => res.json())
    
    images.forEach(async ({image, order}) => {
            await addImage(image, order, storeId, response.id)
    })
    
    dispatch({ type: 'ADD_PRODUCT', payload: response });  
    history.replace(`/UserDashboard/stores/${storeId}/products/${response.id}`)
    return response
}

const deleteProduct = (storeId, productId) => async () => {
    await fetch(`${process.env.API_URL}/stores/${storeId}/products/${productId}/delete`, {
        credentials: 'include',
        method: 'DELETE'
    })
}
const startUpdateProduct = (name, description = '', price, quantity, images, imagesOrder, imagesToDelete, storeId, productId) => {
    
    return async (dispatch) => {
        try {
            const product = await updateProduct(name, description, price, quantity, images, imagesOrder, imagesToDelete, storeId, productId)
            dispatch(updateProductAction(product))
            return product
        } catch (e) {
            throw e
        }
    }
}
const updateProductAction = (product= {}) => ({
    type: 'UPDATE_PRODUCT',
    product
})





export {
    addProduct,
    fetchProducts,
    fetchProduct,
    deleteProduct,
    startUpdateProduct,
    updateProductAction
}