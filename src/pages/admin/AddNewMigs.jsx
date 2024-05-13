import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { db } from '../../firebase'
import { collection, addDoc } from "firebase/firestore"
import { AuthContext } from '../../context/AuthContext'
import NotAuthorized from '../../components/NotAuthorized'

import avatarImage from '../../images/addAvatar.png'
import StopIcon from '../../images/stop-icon.avif'
import PageHeader from '../../components/PageHeader'
import { CreateUserInitializationRecords } from '../../utils/CreateUserInitializationRecords'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3
const TECHNICAL_SPECIALIST = 4

const AddNewMigs = () => {
    const navigate = useNavigate()   
    const authCtx = useContext( AuthContext );
    const [errorMessage, setErrorMessage] = useState('')
    //console.log(' authCtx: ', authCtx.authLevel)


    const handleAddNewSubmit = async(e) => {
        e.preventDefault()
        const firstName = e.target[0].value
        const lastName = e.target[1].value
        const email = e.target[2].value
        const cell = e.target[3].value
        const authLevel = e.target[4].value
        const file = e.target[5].files[0] 
        
        try {
            const migsRef = collection(db, "migs")
            console.log(firstName, lastName, email, cell, authLevel)
            const docRef = await addDoc(migsRef, { 
                firstName: firstName,
                lastName: lastName,
                email: email,
                cell: cell,
                authLevel: authLevel,
                imageUrl: '',
                registered: false,
                memberStatus: '0'
            })
            // console.log('Successfully added new MIGS record, id : ', docRef.id)

            // Pass the new id and initialize all tables, ips, med, coc, tubs and all-scores
            CreateUserInitializationRecords( docRef.id, firstName, lastName )
        } catch (error) {
            console.log('Error on MIGS addDoc(): ', error) 
            setErrorMessage(error.message)
        }
        navigate('/admin/add-new')
    }

    
    const intAuthLevel = parseInt(authCtx.authLevel)
    // console.log('intAuthLevel: ', intAuthLevel)
    if ( intAuthLevel < ADMINISTRATOR ) {
        return (
            <NotAuthorized title={'Add new MIGS?'} />
        )
    }
    


    return ( 
        <div className='formContainer'> 
            <PageHeader page='add-new' />
            <span className='title'>Add New Member</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='addNew'>
                <form type='submit' onSubmit={ handleAddNewSubmit }>
                    <input id='firstname' type='text' placeholder='firstName'/>
                    <input id='lastname' type='text' placeholder='lastName'/>
                    <input id='email' type='email' placeholder='email' autoComplete="off"/>
                    <input id='cell' type='text' placeholder='cellphone'/>
                    <input id='authLevel' type='text' placeholder='authLevel'/>
                    <input style={{display:"none"}} type='file' id='imgFile' />
                    <label htmlFor='imgFile'>
                        <img src={ avatarImage } alt='' /> 
                        <span>Add profile image (optional)</span>
                    </label>
                    <button>Save</button>
                </form>
                              
                <button className='clearButton' onClick={()=> navigate(-1)}>
                    Cancel 
                </button>
                             
            </div>
        </div>  
    )
}

export default AddNewMigs