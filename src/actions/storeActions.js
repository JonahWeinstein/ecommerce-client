



// returns async function that dispatches action
const fetchStores = () => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores`, {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        }).then(res => res.json())
  
    dispatch({ type: 'GET_STORES', payload: result });
  };

  const addStore = (data, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/add`, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'}).then(res => res.json())

        history.push('/UserDashboard')

    dispatch({ type: 'ADD_STORE', payload: result})
  }

const deleteStore = (storeId, history) => async dispatch => {
    const result = await fetch(`${process.env.API_URL}/stores/${storeId}/delete`, {
        credentials: 'include',
        method: 'DELETE'})
    history.push('/UserDashboard')
}
const updateError = (error) => ({
    type: 'UPDATE_ERROR',
    error
})

export { 
    fetchStores,
    addStore,
    updateError, 
    deleteStore
}