import React, {useState} from 'react'
import { loginUser } from '../utils/asyncLogic/userLogic';
import { useHistory } from 'react-router-dom';



const LoginRedirect = (props) => {
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const onFormSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value
        }
        try {
            const user = await loginUser(data)
            sessionStorage.setItem('token', user.token)
            setError(undefined)
            history.replace(history.location.pathname, { 
                errorStatusCode: undefined 
        });

        } catch (error) {
            setError("Invalid Login Attempt")
        }
        
    }
   
        return (
            <div>
            
            <div className = 'centered'>
                <div className = "error">
                Your session has expired, please login again
                </div>
                
                <div>
                    <form onSubmit = {onFormSubmit} className = 'login form'>
                        <input type="text" name="email" placeholder = "Email" />
                        <input type = "text" name = "password" placeholder = "password" />
                        {error && <p className = "error">{error}</p>}
                        <button type = "submit" className = 'button cta'>Login</button>
                    </form>
                </div>
            </div>
            </div>
        )
    
}


export default LoginRedirect