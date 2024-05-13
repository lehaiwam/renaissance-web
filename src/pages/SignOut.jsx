import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import { signOut } from "firebase/auth"
import PageHeader from '../components/PageHeader'
import { AuthContext } from '../App'

const SignOut = () => {
    const navigate = useNavigate()

    const { ctxFirstName } = useContext( AuthContext )
    const [ errorMessage, setErrorMessage ] = useState('')

    // console.log("Our guy is logging out: ", ctxFirstName)
    const handleSignOut = async () => {
        
        try {
            await signOut(auth);
            navigate('/login')
        } catch (error) {
            console.log('FAILED sign out attempt. Error: ', error)
            setErrorMessage('FAILED sign out attempt!!!')
        } 
    }


    return (
        <div className='formContainer'> 
            <PageHeader page='signout'/>
            <span className='title'>Signing Out</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='signOut'>
                <p>Leaving already, 
                    <span> {ctxFirstName} </span>?
                </p> 
                <div className='modalActions'>
                    <>
                        <button className='cancel' onClick={ () => navigate('/home') }>Ignore Request</button>
                        <button className='continue' onClick={ handleSignOut }>Yes, Sign Out</button>
                    </>
                </div>
            </div>

        </div>
    )
}

export default SignOut