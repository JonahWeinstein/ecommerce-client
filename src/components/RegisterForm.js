import React, {useState} from 'react'
import { registerUser } from '../utils/asyncLogic/userLogic'

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
            <form className = 'form' onSubmit = {onFormSubmit}>
                {error && <p className = "error">{error}</p>}
                {success && <p>{success}</p>}

                <label htmlFor='name'>Name</label>
                <input type = "text" name = 'name' value = {name} onChange = {onNameChange} required/>
                
                <label for='email'>Email</label>
                <input type = "text" name = 'email' value = {email} onChange = {onEmailChange} required/>

                <label for='password'>Password</label>
                <input type = "text" name = 'password' value = {password} onChange = {onPasswordChange} required />

                <button type = "submit" className = 'button cta'>Register</button>
            </form>
        </div>
    )
}

export default RegisterForm