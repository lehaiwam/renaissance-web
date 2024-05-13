import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { db } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";

import PageHeader from '../../components/PageHeader'


const MaintainMigsDetails = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const member = location.state?.member
    const { id, firstName, lastName, email, cell, authLevel, registered } = member

    const [errorMessage, setErrorMessage] = useState('')


    const handleRemoveMigs = async() => {
        console.log('Removing MIGS : ', id, firstName)
        try {
            const migsRef = doc(db, "migs", id );
            // dont remove the record from the DB but set status to 9: REMOVED 
            await updateDoc(migsRef, { 
                memberStatus: '9'
            })
            navigate(-1)
        } catch (error) {
            setErrorMessage('Remove MIGS attempt failed!!!')
            console.log('Error on MIGS updateDoc(): ', error) 
        }  
    }


    const handleSubmit = async(e) => {
        e.preventDefault()
        // Read the form data
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const { firstName, lastName, email, cell, authLevel, registered } = formJson
        
        try {
            const migsRef = doc(db, "migs", id);
            await updateDoc(migsRef, { 
                firstName,
                lastName,
                cell,
                email,
                authLevel,
                registered,
            })
        } catch (error) {
            console.log('Error on MIGS updateDoc(): ', error) 
        }
        navigate(-1)
    }


    return (
        <div className='formContainer'> 
            <PageHeader page = 'maintain-migs-details' />
            <span className='title'>Edit Migs Details</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }
      
            <form className='maintainMigs' method="post" onSubmit={ handleSubmit }>
                <div className='fullWidthContainer'> 
                    <label>
                        First Name: <input 
                            type='text'
                            name="firstName" 
                            defaultValue={ firstName }
                        />     
                    </label>  
                    <label>
                        Last Name: <input 
                            type='text'
                            name="lastName" 
                            defaultValue={ lastName }
                        />
                    </label>                             
                </div>

                <div className='fullWidthContainer'> 
                    <label>
                        Cellphone: <input 
                            type='text'
                            name="cell" 
                            defaultValue={ cell }
                        />     
                    </label>  
                    <label>
                        Email: <input 
                            type='text'
                            id='email'
                            name="email" 
                            defaultValue={ email }
                        />
                    </label>                             
                </div>

                <div className='fullWidthContainer'> 

                    <div className='authLevel'>
                        
                        <label>Auth Level: 
                            <select 
                                name="authLevel" 
                                defaultValue={ authLevel }
                            >
                                <option value={'1'}>Member</option>
                                <option value={'2'}>Exco Member</option>
                                <option value={'3'}>Administrator</option>
                                <option value={'4'}>Technical Support</option>
                            </select>
                        </label>
                    </div>


                    <div className='isRegistered'>
                        Registered?
                        <div className='options'>
                            <label>
                                <input type="radio" name="registered" value={'true'} defaultChecked={ registered === 'true'}  />
                                <span>Yes</span>
                            </label>
                            <label>
                                <input type="radio" name="registered" value={'false'} defaultChecked={ registered === 'false'}  />
                                <span>No</span>
                            </label>
                        </div>                      
                    </div>
                </div>
                <div className='actionButtons'>   
                    <div>
                        <button type='submit'>
                            Save Changes
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={ handleRemoveMigs }>
                            Remove
                        </button>
                    </div>
                    <div>
                        <button type='button' onClick={() => navigate(-1)}>
                            Back
                        </button>
                    </div>
                </div>
            </form>     
      </div>
  )
}

export default MaintainMigsDetails