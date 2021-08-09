import React, {useState} from 'react'
import { registerUser } from '../utils/asyncLogic/userLogic'
import Header from './Header'

const RegisterForm = (props) => {
    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if(password.length < 6){
            return setError('Password must be at least 6 characters')
        }
        const data = {
            name: name,
            email: email,
            password: password
        }
        try {
            const user = await registerUser(data)
            sessionStorage.setItem('token', user.token)
            setError(undefined)
            props.history.push('/UserDashboard')
        } catch (error) {
            setError(error.message)
        }
        
    }

    return (
        <div>
            <Header title = 'Register' />
            <form className = 'centered form' onSubmit = {onFormSubmit}>
                {error && <p className = "error">{error}</p>}
                {success && <p>{success}</p>}

                
                <input type = "text" name = 'name' value = {name} placeholder = "Name" onChange = {onNameChange} required/>
                
                <input type = "text" name = 'email' value = {email} placeholder = "Email" onChange = {onEmailChange} required/>

                <input type = "text" name = 'password' value = {password} placeholder = "Password" onChange = {onPasswordChange} required />

                <button type = "submit" className = 'button cta'>Register</button>
            </form>
        </div>
    )
}

export default RegisterForm