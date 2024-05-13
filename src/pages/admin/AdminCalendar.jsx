import React, {useState, useEffect, useContext} from 'react'

import { db } from '../../firebase'
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { AuthContext } from '../../App'

import AdminCalendarItem from '../../components/admin/AdminCalendarItem'
import NotAuthorized from '../../components/NotAuthorized';
import PageHeader from '../../components/PageHeader'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3
const TECHNICAL_SUPPORT = 4

const AdminCalendar = () => {
    const [ games, setGames ] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const { ctxAuthLevel }= useContext( AuthContext )

    const page = 'admin-calendar'

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
                            date: new Date(newDate).toDateString().slice(0, 16),
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
                console.log('In useEffect: (Admin)loadYearSchedule() error : ', error.message)
            }
        }

        loadYearSchedule()

    })

    if (ctxAuthLevel < ADMINISTRATOR ) {
        if ( ctxAuthLevel < MEMBER ) {
            return (
                <NotAuthorized title={ 'You are not authenticated! Login?'} authenticate={false} />
            )
        } else {
            return (
                <NotAuthorized title={ 'Official Calendar Maintenance?'} authenticate={true} />
            )
        }
    }

    
    return (
        <div className='formContainer'>   

            <PageHeader page={page} />

            <span className='title'>Annual Official Games Schedule</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='gamesContainer'>
                { 
                    games.map( (game) => {
                        return <AdminCalendarItem key={ game.id } game={ game }/>
                    })
                }          
            </div>  

        </div>
    )
}

export default AdminCalendar