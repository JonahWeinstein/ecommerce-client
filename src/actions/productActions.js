import { fetchProduct, addProductWithImages, updateProduct, deleteProduct, addImage, updateImage, deleteImage } from "../utils/asyncLogic/productLogic";
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
            for (let i =0; i< imagesOrder.length; i++) {
                // check if image order field is different from image index in imagesOrder array
                // image order starts from 1 but array indices start at 0
                if (imagesOrder[i].order != i+1 ) {
                    
                    try {
                        const image = await updateImage(imagesOrder[i], i+1, storeId, productId)
                    } catch(e) {
                        throw e
                    }    
                }
            }
            for(let i = 0; i<imagesToDelete.length; i++) {
                try {
                    const image = await deleteImage(storeId, productId, imagesToDelete[i].id)
                } catch(e) {
                    throw e
                }            
            }
            for (let i = 0; i < images.length; i++) {
                try {
                    const image = await addImage(images[i].image, images[i].order, storeId, productId)
                } catch (e) {
                    throw new Error(`Unable to add product images`)
                }
            }
            const {data, status} = await useQuery(
                `/stores/${storeId}/products/${productId}/update`,
                {name, description, price, quantity}, 'PATCH')
            if (status != 200) {
                throw new Error('Unable to update product')
            }
            dispatch(updateProductAction(data))
            return data
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