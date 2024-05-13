import React, {useEffect, useState} from 'react'
import { db } from '../firebase'
import { collection, where, query, getDocs } from "firebase/firestore";

const ConfirmationListModal = ({game}) => {
    // console.log('Showing confirmations for this game: ', game.title)

    const [ confirmations, setConfirmations ] = useState([])
    const [ isLoading, setIsLoading ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')

    
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

        setIsLoading(true)
        getConfirmations()
        setIsLoading(false) 
    }, [])
 

    return (
        <div className='confirmList'>
           <div className='gameDetails'>
                <div className='infoTop'>                 
                    <p className='gameTitle'>{ game.title }</p>
                    <p>{ game.date }</p>
                    <p>@ { game.course }</p>
                </div>
            </div>

            { errorMessage && <p className='errorMessageText'>{errorMessage}</p> }

            {
                confirmations.map( (golfer) => {
                    return (
                         golfer.firstName
                    )
                })
            }
        </div>
    )
}

export default ConfirmationListModal