
const APIurl = 'http://localhost:3000'
const clientUrl = 'http://localhost:3001'

const registerUser = async (data) => {
    try{
        const response = await fetch(APIurl + `/users`, {
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
            },
            method: 'POST'});
        return response.json()
    } catch (e) {
        return e
    }   
}
const loginUser = async (data) => {
    try{
        const response = await fetch(APIurl+`/users/login`, {
            body: JSON.stringify(data),
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
            },
            method: 'POST'});
        return response.json()
    } catch (e) {
        return e
    }   
}

const registerForm = document.querySelector('#registerForm');
const registerName = document.querySelector('#registerName');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');
if(registerForm){
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value
    }
    try {
        const user = await registerUser(data)
        localStorage.setItem('token', user.token)
        window.location.href = clientUrl + '/dashboard'
    } catch (error) {
        console.log(error)
    }

}) 
}
const loginForm = document.querySelector('#login-form');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
if(loginForm) {
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    console.log(data)
    try {
        const user = await loginUser(data)
        localStorage.setItem('token', user.token)
        window.location.href = clientUrl + '/dashboard'
    } catch (error) {
        console.log(error)
    }

})
}

const getStores = async () => {
    try{
        const authToken = localStorage.getItem('token')
        const response = await fetch(APIurl + '/stores', {
        headers: {
            'Authorization': `Bearer ${authToken}`
            }
        })
        return response.json();
    } catch (e) {
        return e
    }
}
const $stores = document.querySelector('#stores')
const storeTemplate = document.querySelector('#store-template').innerHTML
const getStoresButton = document.querySelector('#get-stores-btn')
getStoresButton.addEventListener('click', async () => {
    const stores = await getStores()
    console.log(stores)
    stores.forEach( (store) => {
        const html = Mustache.render(storeTemplate, {
            store_name: store.store_name
        })
        $stores.insertAdjacentHTML('beforeend', html)
    })
    
})



