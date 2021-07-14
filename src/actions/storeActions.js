import { fetchStores } from "../utils/asyncLogic"

const startGetStores = () => {
    return  async (dispatch) => {
        try {
            const stores = await fetchStores()
            console.log(stores)
            dispatch(getStores(stores))
        } catch (e) {
            dispatch(updateError('Something went wrong'))
        }
    }
}

const getStores = (stores = []) => ({
    type: 'GET_STORES',
    stores
})

const updateError = (error) => ({
    type: 'UPDATE_ERROR',
    error
})

export {startGetStores, getStores, updateError }