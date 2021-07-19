import { fetchProducts, addProduct } from "../utils/asyncLogic";


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
            const store = await addProduct(name, description, price, quantity, storeId)
            dispatch(addProductAction(store))
        } catch (e) {
            throw new Error(e)
        }
    }
}
const addProductAction = (product= {}) => ({
    type: 'ADD_PRODUCT',
    product
})

export {startGetProducts, getProducts, startAddProduct, addProductAction}