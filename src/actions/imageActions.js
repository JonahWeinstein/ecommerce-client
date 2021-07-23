import {fetchImages, deleteImage} from '../utils/asyncLogic'

const startGetImages = (storeId, productId) => {
    return async (dispatch) => {
        try{
            const images = await fetchImages(storeId, productId)
            dispatch(getImagesAction(images))
        } catch(e) {
            throw new Error(e)
        }
        
    }
}
const getImagesAction = (images) => ({
    type: 'GET_IMAGES',
    images
})


export default {
    startGetImages
}