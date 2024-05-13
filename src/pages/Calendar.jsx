import React, { useEffect ,useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { db } from '../firebase'
import { doc, collection, query, orderBy, getDocs, getDoc } from "firebase/firestore"

import { AuthContext } from '../App'
import NotAuthorized from '../components/NotAuthorized'
import PageHeader from '../components/PageHeader'
import GameCard from '../components/GameCard'

const Calendar = () => {
    const navigate = useNavigate()
    const { ctxAuthLevel } = useContext( AuthContext )
    const [games, setGames] = useState([])
    const [errorMessage, setErrorMessage] = useState('') 
    const [confirmStatus, setConfirmStatus] = useState(null)

    // const ctxVar = useContext( AuthContext )

    useEffect ( () => {   

        const loadYearSchedule = async () => {

            try {
                const arrayGames = []
                const querySnapshot = await getDocs( query(collection(db, "calendar"), orderBy("sequence")) )
                if (querySnapshot.empty) {
                    console.log('Impossible! Empty CALENDAR?')
                    setErrorMessage('Impossible! Empty CALENDAR?')
                } else {
                    querySnapshot.forEach( async(document) => {
                        const newDate = document.data().date.toString()
                        arrayGames.push({
                            id: document.id, 
                            teeOff: document.data().teeOff,
                            date: new Date(newDate).toDateString(),
                            title: document.data().title,
                            course: document.data().course,
                            fees: document.data().fees,
                            status:  document.data().status,
                            weekendAway: document.data().weekendAway,
                            tops: document.data().uniform?.tops.length ? document.data().uniform.tops : '',
                            bottoms: document.data().uniform?.bottoms.length ?document.data().uniform.bottoms : '' ,
                        })
                    })
                    setGames(arrayGames)
                }
            } catch (error) {
                console.log('In useEffect: loadYearSchedule() error : ', error.message)
            }
        }

        loadYearSchedule()

    })
 

    if ( !ctxAuthLevel ) {
        return (
            <NotAuthorized title={ 'You are not authenticated! Login?'} authenticate={false} />
        )
    }

    return (
      <div className='formContainer'>   
            <PageHeader />
            <span className='title'>Annual Official Games Schedule</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='gamesContainer'>
            { 
                games.map( (game) => {
                    return <GameCard key={ game.id } game={ game }/>
                })
            }          
            </div>  

        </div>
    )
}

export default Calendar