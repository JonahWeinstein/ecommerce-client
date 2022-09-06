const {setError} = require('../ErrorHandler')
// returns async function that dispatches action
const fetchStores = (history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        })
    setError(result, history)
    dispatch({ type: 'GET_STORES', payload: await result.json() });
  };

  const addStore = (data, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/add`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'})
        setError(result, history)
        history.push('/UserDashboard')

    dispatch({ type: 'ADD_STORE', payload: await result.json()})
  }

const deleteStore = (storeId, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/${storeId}/delete`, {
        credentials: 'include',
        method: 'DELETE'})
        setError(result, history)
    history.push('/UserDashboard')
}


export { 
    fetchStores,
    addStore,
    deleteStore
}