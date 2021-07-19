import StateLoader from "../store/StateLoader"

// create an instance of StateLoader and load in stores 
const stateLoader = new StateLoader()
const productReducerDefaultState = stateLoader.loadState().products || stateLoader.initializeState().products

const productReducer = (state = productReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return [ ...action.products]
        default: 
            return state;
    }
}

export default productReducer