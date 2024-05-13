import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../App'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from "firebase/firestore";

import YES from '../images/thumb-up.jpg'
import NO from '../images/thumb-down.jpg'
import { RiFileList3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const gameStatusArr = [
    'Not Scheduled', 'Scheduled', 'Booked', 'Completed' 
]

const GameCard = ({game}) => {
    const navigate = useNavigate()
    const [ confirmed, setConfirmed ] = useState(false)
    const [ newStatus, setNewStatus ] = useState(false)

    const { teeOff, date, title, course, fees, status, weekendAway, tops, bottoms } = game

    const {ctxId} = useContext( AuthContext )

    useEffect( () => {

        const getConfirmationStatus = async() => {

            // Obtain confirmation status for each of the games
            try {
                // console.log(`gameTitle: ${title}, userId: ${ctxId}`)
                const docSnap = await getDoc( doc( db, title, ctxId ))
                if (docSnap.exists()) {
                    setConfirmed(docSnap.data().confirmed)
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log('This golfer has no record in this DB TABLE: ', title)
                }
            } catch (error) {
                console.log('getConfirmationStatus(), failed getDoc(): ', error)
            } 
        }

        getConfirmationStatus()

    }, [])


    const updateConfirmationStatus = async() => {

        // update the host data
        let tempConfirmed = confirmed
        console.log('Updating status to ', tempConfirmed, 'for game: ', title)
        const gameConfirmedRef = doc(db, title, ctxId);
        try {
            await updateDoc( gameConfirmedRef, {
                confirmed: tempConfirmed
            })
        } catch (error) {
            console.log('updateConfirmationStatus()), failed updateDoc(): ', error)
        }
    }


    return (
        <div className='gameCard'>
            <div className='gameTitle'>
                <p>{title}</p>
            </div>
           
            <div className='gameInfoWrapper'>
                <div className='gameInfo'>
                    <div className='lineOne'>
                        <p>Date: {date}</p> <p>TeeOff: {teeOff}</p> <p>Course: {course}</p>
                    </div>
                    <div className='lineTwo'>
                        <p>Green Fees: { fees }</p> 
                        <p>Status: { gameStatusArr[status] }</p> 
                        <p>WeekendAway? { weekendAway ? 'Yes' : 'No' }</p>
                    </div>
                    <div className='lineThree'>
                        Uniform : <p>Tops: { tops }</p> <p>Bottoms: { bottoms }</p> 
                    </div>
                </div>
                
                <div className='confirmation'>
                    <p>Joining us?</p>
                       
                    <Link className='yesOrNo' to='/joiningus' state={ {game: game}}>
                        {
                        confirmed ? 
                            <img src={YES} alt='' />
                        :
                            <img src={NO} alt='' />
                        }
                    </Link>
                                              
                </div>
 
                <div className='listContainer'>

                    {status > '2' &&
                        <div className='resCon'>
                            <p>Results?</p>   
                            
                            <Link to='/results' state={ {game: game}} >                 
                                <i className='riFileList3Line'> <RiFileList3Line /> </i>
                            </Link>
                        </div>
                    }

                    {status < '3' &&
                        <div className='resCon'>
                            <p>Confirmations?</p>

                            <Link to='/confirmations' state={ {game: game}} >
                                <i className='riFileList3Line'><RiFileList3Line width={50}/></i>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GameCard