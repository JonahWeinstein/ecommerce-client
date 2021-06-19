const registerForm = document.querySelector('#registerForm');
const registerName = document.querySelector('#registerName');
const registerEmail = document.querySelector('#registerEmail');
const registerPassword = document.querySelector('#registerPassword');



registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: registerName.value,
        email: registerEmail.value,
        password: registerPassword.value
    }
    fetch(`http://localhost:3000/users`, {
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
        },
        method: 'POST'
    }).then(function(response) {
        return response.json();
    }).catch(function(e) {
        return e
    }) 
}) 