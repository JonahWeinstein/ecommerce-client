import { fetchProducts, addProduct, updateProduct } from "../utils/asyncLogic";


const startGetProducts = (storeId) => {
    return async (dispatch) => {
        try {
            const products = await fetchProducts(storeId)
            dispatch(getProducts(products))
        } catch(e) {
            throw new Error(e)
        }
    }
}

const getProducts = (products = []) => ({
    type: 'GET_PRODUCTS',
    products
})
const startAddProduct = (name, description = '', price, quantity, storeId) => {
    return async (dispatch) => {
        try {
            const product = await addProduct(name, description, price, quantity, storeId)
            dispatch(addProductAction(product))
        } catch (e) {
            throw new Error(e)
        }
    }
}
const addProductAction = (product= {}) => ({
    type: 'ADD_PRODUCT',
    product
})
const startUpdateProduct = (name, description = '', price, quantity, images, storeId, productId) => {
    return async (dispatch) => {
        try {
            const product = await updateProduct(name, description, price, quantity, images, storeId, productId)
            dispatch(updateProductAction(product))
        } catch (e) {
            throw new Error(e)
        }
    }
}
const updateProductAction = (product= {}) => ({
    type: 'UPDATE_PRODUCT',
    product
})

export {
    startGetProducts, 
    getProducts, 
    startAddProduct, 
    addProductAction,
    startUpdateProduct,
    updateProductAction
}