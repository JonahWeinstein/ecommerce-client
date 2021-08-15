import { fetchStores, addStore, deleteStore } from "../utils/asyncLogic/storeLogic"

const startGetStores = () => {
    return  async (dispatch) => {
        try {
            const stores = await fetchStores()
            dispatch(getStores(stores))
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}

const getStores = (stores = []) => ({
    type: 'GET_STORES',
    stores
})
const startAddStore = (store_name) => {
    return async (dispatch) => {
        try {
            const store = await addStore(store_name)
            dispatch(addStoreAction(store))
            return store
        } catch (e) {
            throw new Error(e)
        }
    }
}
const addStoreAction = (store= {}) => ({
    type: 'ADD_STORE',
    store
})

const startDeleteStore = (storeId) => {
    return async (dispatch) => {
        try {
            const store = await deleteStore(storeId)
            dispatch(deleteStoreAction(store))
        } catch(e) {
            throw e
        }
    }
}
const deleteStoreAction = (store) => ({
    type: 'DELETE_STORE',
    store
}
)
const updateError = (error) => ({
    type: 'UPDATE_ERROR',
    error
})

export {
    startGetStores, 
    startAddStore, 
    addStoreAction, 
    getStores, 
    updateError, 
    startDeleteStore 
}