import StateLoader from "../store/StateLoader"

// create an instance of StateLoader and load in stores 
const stateLoader = new StateLoader()
// check if stores are in localStorage and if not use stateLoader default
const storeReducerDefaultState = []
    

const storeReducer = (state = storeReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_STORES':
            return [ ...action.payload]
        case 'ADD_STORE':
                return [...state, action.payload]
        default: 
            return state;
    }
}

export default storeReducer