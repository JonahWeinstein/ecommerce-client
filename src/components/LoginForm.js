import React from 'react'
import { loginUser } from '../utils/asyncLogic/userLogic';



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
            <div className = 'centered'>
            <form onSubmit = {this.onFormSubmit} className = 'login form'>
                <input type="text" name="email" placeholder = "Email" />
                <input type = "text" name = "password" placeholder = "password" />
                {this.state.error && <p className = "error">{this.state.error}</p>}
                <button type = "submit" className = 'button cta'>Login</button>
            </form>
            </div>
        )
    }
}


export default LoginForm