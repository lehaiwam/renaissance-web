import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { db } from '../firebase'
import { collection, where, query, getDocs, orderBy } from "firebase/firestore"

import PageHeader from '../components/PageHeader'

const ConfirmationList = (props) => {
    const navigate = useNavigate()

    const location = useLocation()
    const game = location.state?.game
    // console.log('Game data: ', game)

    const [ confirmations, setConfirmations ] = useState([])
    const [ isLoading, setIsLoading ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')

    const page='confirmlist'
    
    // useEffect() to load all confirmed golfers for a specific game
    useEffect(() => {

        const getConfirmations = async() => {
            const tempArray = []
            const q = query(collection(db, game.title), where("confirmed", "==", true))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                console.log('No confirmations as yet for this game')
                setErrorMessage('No confirmations as yet for this game?')
                setConfirmations(tempArray)    
            } else {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data())
                    tempArray.push({
                        id: doc.id, 
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                    })
                })
                setConfirmations(tempArray)
            }             
        } 

        getConfirmations() 
    })
 

    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Game Confirmations</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='confirmList'>          
                <div className='gameDetails'>        
                    <p className='gameTitle'>{ game.title }</p>
                    <p>{ game.date } @ { game.teeOff }</p>
                    <p>{ game.course }</p>
                </div>
                <div className='golferList'>
                    <ol>
                    {
                        confirmations.map( (golfer) => {
                            return (
                                <div className='golfer' key={golfer.id} >
                                    <li>  {golfer.firstName} {golfer.lastName}</li>
                                </div>
                            )
                        })
                    }
                    </ol>
                </div>
                <div className='btnContainer'>
                    <button onClick={ () => navigate(-1) }>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationList