import React, {useState, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { db } from '../firebase'
import { doc, updateDoc } from "firebase/firestore"

import { AuthContext } from '../App'
import PageHeader from '../components/PageHeader'

const Confirmation = (props) => {
    const navigate = useNavigate()
    const { ctxId } = useContext( AuthContext )
    const [ errorMessage, setErrorMessage ] = useState('')
    const location = useLocation()
    const game = location.state?.game

    // const ctxVar = useContext( AuthContext )


    const updateConfirmStatus = async(confirmStatus) => {
        const gameConfirmedRef = doc(db, game.title, ctxId)
        try {
            await updateDoc( gameConfirmedRef, {
                confirmed: confirmStatus
            })
            navigate(-1)
        } catch (error) {
            setErrorMessage('Confirmation Status Update Failed!!!')
            console.log('updateConfirmationStatus()), failed updateDoc(): ', error)
        }
    }


    const handleHapanaAction = async () => {
        updateConfirmStatus(false)        
    }


    const handleNdioAction = async () => {
        updateConfirmStatus(true)        
    }


    return (
        <div className='formContainer'> 
            <PageHeader page='confirmation'/>
            <span className='title'>Confirming Attendance</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='confirmationAction'>
                <p>Are you joining the guys?</p> 
                <div className='gameDetails'>
                    <span id='title'>{game.title}</span>
                    <span>{game.date}</span>
                    <span>{game.course}</span>
                </div>
                <div className='modalActions'>
                    <>
                        <button className='cancel' onClick={ handleHapanaAction  }>Sorry I cannot</button>
                        <button className='continue' onClick={ handleNdioAction  }>Yes, I am</button>
                    </>
                </div>
            </div>
        </div>
    )
}

export default Confirmation