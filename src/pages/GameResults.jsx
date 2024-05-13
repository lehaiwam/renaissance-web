import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { db } from '../firebase'
import { collection, where, query, getDocs, orderBy } from "firebase/firestore"

import PageHeader from '../components/PageHeader'

const GameResults = (props) => {
    const navigate = useNavigate()

    const location = useLocation()
    const game = location.state?.game
    // console.log('Getting results for game data: ', game)

    const [ gameScores, setGameScores ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState('')

    const page='gameResults'
    
    useEffect(() => {
        // get the game's scores
        const getGameScores = async() => {
            const scoresArray = []
            const tableRef = collection(db, game.title)
            let querySnapshot 
            // in case of a medal game the least score is at the top
            if ( game.title.slice(0,3) === 'ips' ) {
                querySnapshot = await getDocs(query( tableRef,  where("score", "!=", 0), orderBy("score", "desc")))
            } else {
                querySnapshot = await getDocs(query( tableRef, where("score", "!=", 200), orderBy("score")))
            }
            
            if (querySnapshot.empty) {
                // console.log('Scores not captured yet! Apologies.')
                setErrorMessage('Scores not captured yet! Apologies.')
            } else {
                let position = 0
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    position++
                    scoresArray.push({
                        position: position,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        score:  doc.data().score,
                    })
                });
            }
            setGameScores(scoresArray)
        }

        getGameScores()

    })

 
    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Game Results</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='gameResults'>          
                <div className='gameDetails'>        
                    <p className='gameTitle'>{ game.title }</p>
                    <p>{ game.date }</p>
                    <p>{ game.course }</p>
                </div>
                <div className='golferList'>
                    <ol>
                    {
                        gameScores.map( (golfer) => {                          
                            return (
                                <div className='golfer' key={golfer.id} >
                                    <li>  {golfer.firstName} {golfer.lastName} ({golfer.score})</li>
                                </div>
                            )    
                        })
                    }
                    </ol>
                </div>
                <div className='btnContainer'>
                    <button onClick={ () => navigate(-1) }>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameResults