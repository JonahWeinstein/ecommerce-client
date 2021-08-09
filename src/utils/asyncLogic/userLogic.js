const registerUser = async (data) => {
    const response = await fetch(`${process.env.API_URL}/users`, {
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        method: 'POST'})
    if(!response.ok) {
        // if you don't have this line the response will still be a pending promise
        const error = await response.text()
        throw new Error(error)
    }
    return response.json() 
}

const loginUser = async (data) => {

    const response = await fetch(`${process.env.API_URL}/users/login`, {
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        method: 'POST'});
    if(!response.ok){
        throw new Error('Unable to Login')
    }
    return response.json()
}

export {registerUser, loginUser}