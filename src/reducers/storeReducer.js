import StateLoader from "../store/StateLoader"

// create an instance of StateLoader and load in stores 
const stateLoader = new StateLoader()
// check if stores are in localStorage and if not use stateLoader default
const storeReducerDefaultState = 
    stateLoader.loadState().stores || stateLoader.initializeState().stores

const storeReducer = (state = storeReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_STORES':
            return [ ...action.stores]
        case 'ADD_STORE':
                return [...state, action.store]
        default: 
            return state;
    }
}

export default storeReducer