import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"

import "./pages_style.css"
import PageHeader from '../components/PageHeader'

const Login = () => {
  const navigate = useNavigate()
  const [ errMsg, setErrMsg ] = useState('')
  const [ errorFlag, setErrorFlag ] = useState(false)
  const page='login'


  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    //const auth = getAuth();

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
      navigate('/home')

    } catch (error) {
      console.log("FAIILED sign in  attempt")
      setErrMsg(error.message)
      setErrorFlag(true)
    } 
  }

  return (
    <div className='formContainer'> 

            
            <PageHeader page={page} />
          

            <span className='title'>Login</span>

            { errorFlag && <span className='errorMessage'>{ errMsg }</span> }

            <div className='login'>

                <form type='submit'  onSubmit={ handleLoginSubmit } >  
                    <input id='email' type='email' placeholder='email' autoComplete="off"/>
                    <input id='password' type='password' placeholder='password'/>
                    <button>Login</button>
                </form>    

                <div className='redirect'>
                  <p>Forgot your password? <Link to='/reset-password'>Reset Password</Link></p>
            
                  <p>Don't have an account yet? <Link to='/register'>Register</Link></p>
                </div>       

            </div>

    
    </div>
  )
}

export default Login