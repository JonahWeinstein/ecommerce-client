import { fetchProducts, addProductWithImages, updateProduct, deleteProduct } from "../utils/asyncLogic";


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
const startAddProduct = (name, description = '', price, quantity, images, storeId) => {
    return async (dispatch) => {
        try {
            const product = await addProductWithImages(name, description, price, quantity, images, storeId)
            dispatch(addProductAction(product))
            return product
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

const startDeleteProduct = (storeId, productId) => {
    return async (dispatch) => {
        try {
            const product = await deleteProduct(storeId, productId)
            dispatch(deleteProductAction(product))
        } catch (e) {
            throw new Error(e)
        }
    }
}
const deleteProductAction = (product) => ({
    type: 'DELETE_PRODUCT',
    product
})

export {
    startGetProducts, 
    getProducts, 
    startAddProduct, 
    addProductAction,
    startUpdateProduct,
    updateProductAction,
    startDeleteProduct
}