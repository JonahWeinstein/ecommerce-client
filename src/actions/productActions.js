import { fetchProducts, fetchProduct, addProductWithImages, updateProduct, deleteProduct } from "../utils/asyncLogic/productLogic";
import useQuery from '../useQuery'

const startGetProducts = (storeId) => {
    
    return async (dispatch) => {
        try {
            const {data, status} = 
            await useQuery(`/stores/${storeId}/products/all`)

            if (status != 200) {
                throw new Error('Unable to fetch products')
            }
            dispatch(getProducts(data))
            return data
        } catch(e) {
            console.log("error fetching products")
            throw new Error(e)
        }
    }
}
const startGetProduct = (storeId, productId) => {
    return async (dispatch) => {
        try {
            const {data, status} =
            await useQuery(`/stores/${storeId}/products/${productId}`)
            if (status != 200) {
                throw new Error('Unable to fetch products')
            }
            dispatch(getProductAction(data))
            return data
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