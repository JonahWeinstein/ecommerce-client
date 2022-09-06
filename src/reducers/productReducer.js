import StateLoader from "../store/StateLoader"

// create an instance of StateLoader and load in stores 
const stateLoader = new StateLoader()
const productReducerDefaultState = []

const productReducer = (state = productReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return [ ...action.payload]
        case 'GET_PRODUCT':
            return [ ...state, action.payload]
        case 'UPDATE_PRODUCT':
            return state.map((product) => {
                if(product.id == action.product.id) {
                    
                    const newProduct = {...product, Images: [...action.product.Images]}
                    return newProduct
                } else {
                    return product
                }
            })
        case 'ADD_PRODUCT':
            return [ ...state, action.payload]
        default: 
            return state;
    }
}

export default productReducer