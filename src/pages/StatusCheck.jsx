import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { db } from '../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

// import LOGIN_BACKGROUND from '../images/login_background.jpeg'

const StatusCheck = ({navigation}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [cellphone, setCellphone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const validateStatusHandler = async () => {
        console.log('\n\n   Submitted data ...', email, cellphone)
        
        const q = query(collection(db, "migs"), where("email", "==", email))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            console.log('Email provided not in the MIGS list!!!')
            setErrorMessage('Not a Renaissance Social Golf Club MIGS!!! If you wish to register follow link at the bottom')
            return
        } else {
            
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data())
                // compare db data with entered data
                if ( (email !== doc.data().email) || (cellphone !== doc.data().cell) ) {
                    console.log('Email and Cellphone mismatch!!!')
                    setErrorMessage('Provided email and cellphone mismatch with preapproved host data!!!')
                    return
                }
                setEmail('')
                setCellphone('')
                setErrorMessage('')

                /** navigation.navigate('Register', { firstName: doc.data().firstName, lastName: doc.data().lastName}) **/
                navigate('/login')
            })
        }
    }


    return (
        <div className='formContainer'>

          

                <div className='logo'>Renaissance Social Golf </div>

                <div className='title'>Are you a MIGS?</div>

                { errorMessage && <div className='errorMessage' > {errorMessage} </div> }

                <div className='statusCheck'>           
                    <input 
                        id={email}
                        type={email}
                        value={email}
                        placeholder={'email'}
                        onChange={(e) => {
                            setErrorMessage('')
                            setEmail(e.target.value)
                        }}
                    />
                    <input 
                        id={cellphone}
                        value={cellphone}
                        placeholder={'cell no.'}
                        minLength={12}
                        maxLength={12}
                        onChange={(e) => {
                            setErrorMessage('')
                            setCellphone(e.target.value)
                        }}
                    />
                    <button onClick={ validateStatusHandler }> Check Status </button>                 
                    <p>Don't have an account yet? <Link to='/register'> Register </Link></p>
                </div>   
                
    
        </div>
    )
}

export default StatusCheck