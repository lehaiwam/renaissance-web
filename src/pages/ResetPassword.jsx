import React, { useState }from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from "firebase/auth"

import "./pages_style.css"

const ResetPassword = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const resetPasswordRequestHandler = (e) => {
        // send email with temp password...
        e.preventDefault()
        const email = e.target[0].value
        if (email.length < 1) {
            setErrorMessage('Please provide the EMAIL you registered with...')
            return
        }

        sendPasswordResetEmail(auth, email)
            .then((result) => {
                navigate('/Login')
            })
            .catch((error) => {
                console.log('\n   Error encountered when sending password reset email: ', error)
                setErrorMessage(error.message)
            })
    }

    return (
        <div className='formContainer'> 
            <span className='logo'>Renaissance Social Golf</span>
            <span className='title'>Password Reset Request</span>
            { errorMessage && <div className='errorMessageText'> { errorMessage } </div> }

            <div className='resetPassword'>
    
                <form type='submit'  onSubmit={ resetPasswordRequestHandler } >  
                    <input 
                        id='email' 
                        type='email' 
                        placeholder='email'
                        autocomplete="off" />
                    <button>Reset Password</button>
                </form>

                <div className='redirect'>
                    <p>Have successfully reset your password? <Link to='/'>Login</Link></p>
                </div>
                
            </div>
        </div> 
    )        
}

export default ResetPassword