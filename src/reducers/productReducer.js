import StateLoader from "../store/StateLoader"

// create an instance of StateLoader and load in stores 
const stateLoader = new StateLoader()
const productReducerDefaultState = 
    stateLoader.loadState().products || stateLoader.initializeState().products

const productReducer = (state = productReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return [ ...action.products]
        case 'GET_PRODUCT':
            return state.map((product) => {
                if(product.id == action.product.id) {
                    return {...action.product}
                } else {
                    return product
                }
            })
        case 'UPDATE_PRODUCT':
            return state.map((product) => {
                if(product.id == action.product.id) {
                    return {...action.product}
                } else {
                    return product
                }
            })
        case 'ADD_PRODUCT':
            return [ ...state, action.product]
        default: 
            return state;
    }
}

export default productReducer