import { fetchProducts } from "../utils/asyncLogic";

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

export {startGetProducts, getProducts}