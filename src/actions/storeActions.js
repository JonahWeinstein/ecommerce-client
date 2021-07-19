import { fetchStores, addStore } from "../utils/asyncLogic"

const startGetStores = () => {
    return  async (dispatch) => {
        try {
            const stores = await fetchStores()
            dispatch(getStores(stores))
        } catch (e) {
            dispatch(updateError('Unable to fetch stores'))
        }
    }
}

const getStores = (stores = []) => ({
    type: 'GET_STORES',
    stores
})
const startAddStore = (store_name) => {
    console.log(store_name)
    return async (dispatch) => {
        try {
            const store = await addStore(store_name)
            dispatch(addStoreAction(store))
        } catch (e) {
            dispatch(updateError('Unable to add store'))
        }
    }
}
const addStoreAction = (store= {}) => ({
    type: 'ADD_STORE',
    store
})

const updateError = (error) => ({
    type: 'UPDATE_ERROR',
    error
})

export {startGetStores, startAddStore, addStoreAction, getStores, updateError }