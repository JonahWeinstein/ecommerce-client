import React from 'react'
import { connect } from 'react-redux'
import { startGetStores } from '../actions/storeActions';


class LoginForm extends React.Component {
    state = {
        error: undefined
    }
    
    onFormSubmit = async (data) => {
        try{
            const response = await fetch(`http://localhost:3000/users/login`, {
                body: JSON.stringify(data),
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json',
                },
                method: 'POST'});
            return response.json()
        } catch (error) {
            return error
        }   
    }
    loginUser = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        try {
            const user = await this.onFormSubmit(data)
            sessionStorage.setItem('token', user.token)
            this.setState(() => ({ error: undefined }))
            this.props.startGetStores()
            this.props.onSubmit()

        } catch (error) {
            console.log(error)
            this.setState(()=> ({error: 'Invalid Login Attempt'}))
        }
        
    }
    render() {
        return (
            <form onSubmit = {this.loginUser}>
                <input type="text" name="email" placeholder = "Email" />
                <input type = "text" name = "password" placeholder = "password" />
                {this.state.error && <p className = "error">{this.state.error}</p>}
                <button type = "submit">Login</button>
            </form>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    startGetStores: () => dispatch(startGetStores())
})


export default connect(undefined, mapDispatchToProps)(LoginForm)