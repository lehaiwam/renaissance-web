import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import { signOut } from "firebase/auth"
import PageHeader from '../components/PageHeader'

const PageNotFound = () => {
    const navigate = useNavigate()

    //const { currentUser } = useContext( AuthContext )
    const [ errorMessage, setErrorMessage ] = useState('Invalid path! Page Not Found!!!')


    return (
        <div className='formContainer'> 
            <PageHeader page='pageNotFound'/>
            <span className='title'>Error Handling Page</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='notFound'>
                <p>Page Not Found</p> 
                <div className='modalActions'>
                    <button className='okay' onClick={ () => navigate('/home') }>Okay</button>
                </div>
            </div>

        </div>
    )
}

export default PageNotFound