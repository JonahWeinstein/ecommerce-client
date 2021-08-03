import { fetchProducts, fetchProduct, addProductWithImages, updateProduct, deleteProduct } from "../utils/asyncLogic";


const startGetProducts = (storeId) => {
    return async (dispatch) => {
        try {
            const products = await fetchProducts(storeId)
            dispatch(getProducts(products))
            return products
        } catch(e) {
            throw e
        }
    }
}
const startGetProduct = (storeId, productId) => {
    return async (dispatch) => {
        try {
            const product = await fetchProduct(storeId, productId)
            dispatch(getProductAction(product))
            return product
        } catch (e) {
            throw e
        }
    }
}
const getProductAction = (product = {}) => ({
    type: 'GET_PRODUCT',
    product
})

const getProducts = (products = []) => ({
    type: 'GET_PRODUCTS',
    products
})
const startAddProduct = (name, description = '', price, quantity, images, storeId) => {
    return async (dispatch) => {
        try {
            const product = await addProductWithImages(name, description, price, quantity, images, storeId)
            dispatch(addProductAction(product))
            return product
        } catch (e) {
            throw e
        }
    }
}
const addProductAction = (product= {}) => ({
    type: 'ADD_PRODUCT',
    product
})
const startUpdateProduct = (name, description = '', price, quantity, images, imagesToDelete, storeId, productId) => {
    return async (dispatch) => {
        try {
            const product = await updateProduct(name, description, price, quantity, images, imagesToDelete, storeId, productId)
            dispatch(updateProductAction(product))
        } catch (e) {
            throw e
        }
    }
}
const updateProductAction = (product= {}) => ({
    type: 'UPDATE_PRODUCT',
    product
})

const startDeleteProduct = (storeId, productId) => {
    return async (dispatch) => {
        try {
            const product = await deleteProduct(storeId, productId)
            dispatch(deleteProductAction(product))
        } catch (e) {
            throw e
        }
    }
}
const deleteProductAction = (product) => ({
    type: 'DELETE_PRODUCT',
    product
})

export {
    startGetProducts, 
    startGetProduct,
    getProducts, 
    startAddProduct, 
    addProductAction,
    startUpdateProduct,
    updateProductAction,
    startDeleteProduct
}