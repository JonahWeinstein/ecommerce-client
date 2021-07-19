

const storeReducerDefaultState = []

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