import React from 'react'
import { loginUser } from '../utils/asyncLogic/userLogic';
import Header from './Header';



class LoginForm extends React.Component {
    state = {
        error: undefined
    }
    onFormSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        try {
            const user = await loginUser(data)
            sessionStorage.setItem('token', user.token)
            this.setState(() => ({ error: undefined }))
            this.props.history.push('/UserDashboard')

        } catch (error) {
            this.setState(()=> ({error: 'Invalid Login Attempt'}))
        }
        
    }
    render() {
        return (
            <div>
            
            <div className = 'centered'>
            
            <form onSubmit = {this.onFormSubmit} className = 'login form'>
                <input type="text" name="email" placeholder = "Email" />
                <input type = "password" name = "password" placeholder = "password" autocomplete="off" />
                {this.state.error && <p className = "error">{this.state.error}</p>}
                <button type = "submit" className = 'button cta'>Login</button>
            </form>
            </div>
            </div>
        )
    }
}


export default LoginForm