const storeReducerDefaultState = [] 

const storeReducer = (state = storeReducerDefaultState, action ) => {
    switch (action.type) {
        case 'GET_STORES':
            return [ ...action.stores]
        default: 
            return state;
    }
}

export default storeReducer