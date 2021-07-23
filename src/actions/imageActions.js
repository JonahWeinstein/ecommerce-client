import {fetchImages} from '../utils/asyncLogic'

const startGetImages = (storeId, productId) => {
    return async (dispatch) => {
        const images = await fetchImages(storeId, productId)
    }
}

export default {
    startGetImages
}