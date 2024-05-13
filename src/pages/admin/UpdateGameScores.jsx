import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { db } from '../../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"; 

import PageHeader from '../../components/PageHeader'
// import UpdateScores from '../../utils/UpdateScores'

import { MedalOne, MedalTwo, MedalThree, MedalFour, MedalFive, MedalSix, MedalSeven, MedalEight,
         IpsOne, IpsTwo, IpsThree, IpsFour, TubsMemorial, ChampOfChamps } from '../../data/Scores'

const GamesDataDefs = [
    { title: 'medal-1',     data: MedalOne },
    { title: 'medal-2',     data: MedalTwo }, 
    { title: 'medal-3',     data: MedalThree },
    { title: 'medal-4',     data: MedalFour }, 
    { title: 'medal-5',     data: MedalFive },
    { title: 'medal-6',     data: MedalSix }, 
    { title: 'medal-7',     data: MedalSeven },
    { title: 'medal-8',     data: MedalEight }, 
    { title: 'ips-1',       data: IpsOne },
    { title: 'ips-2',       data: IpsTwo }, 
    { title: 'ips-3',       data: IpsThree },
    { title: 'ips-4',       data: IpsFour }, 
    { title: 'coc',         data: ChampOfChamps},
    { title: 'tubs-memorial', data: TubsMemorial},
] 

const UpdateGameScores = ({props}) => {
    const location = useLocation()
    const game = location.state?.game
    console.log('Updating results for game: ', game)

    const navigate = useNavigate()

    const [ errorMessage, setErrorMessage ] = useState('Have you updated the scores in the data/scores JSON file?')
    const page='update-scores'

    const handleUpdateScores = async () => {
        console.log('Running handleUpdateScores()...')

        GamesDataDefs.forEach( async (item) => {
        
            if (item.title === game.title) {
                item.data.map((golfer) => {
                    console.log( 'Updating : ', golfer.id, golfer.name, golfer.score)
                    const nameArr = golfer.name.split(' ')
                    const fname = nameArr[0]
                    const lname= nameArr[1]
                    let confirmationFlag = false
            
                    if (golfer.score !== 0 && golfer.score !== 200) {
                        confirmationFlag = true
                    }
    
                    const titleCollectionRef = doc(db, game.title, golfer.id);
                    setDoc(titleCollectionRef, 
                        { 
                            firstName: fname, 
                            lastName: lname,
                            score: golfer.score,
                            confirmed: confirmationFlag,
                        }, 
                        { 
                            merge: true 
                        });
    
                    console.log('\n   Now, updating the ALL-SCORES record for... ', golfer.name)
                    // update the all-scores table as well
                    let arrayTempScores = []
                    let defaultScore = 200
                    if (game.title.slice(0,3) === 'ips') {
                        defaultScore = 0
                    }
    
                    // read all-scores record first
                    const docRef = doc(db, "all-scores", golfer.id)
                    getDoc(docRef)
                    .then( (docSnap) => {
                        if (docSnap.exists()) {
                            //console.log("Document data:", docSnap.data().firstName, docSnap.data().scores)
                            let arrayTempScores = [...docSnap.data().scores]
    
                            /*
                            if (golfer.id === 'NonA5roGtn0A9n5RFyWs') { 
                                console.log('\n   Before Image: ', arrayTempScores)
                            }
                            */

                            for ( let i=0; i<arrayTempScores.length; i++ ){
                                if (arrayTempScores[i].title === game.title) {
                                    arrayTempScores[i].score = golfer.score
                                }
                            }
    
                            /*
                            if (golfer.id === 'NonA5roGtn0A9n5RFyWs') { 
                                console.log('\n   After Image: ', arrayTempScores)
                            }
                            */
                        
                            setDoc(docRef, 
                                { 
                                    scores: arrayTempScores,
                                }, 
                                { 
                                    merge: true 
                                });
                        } else {
                            // docSnap.data() will be undefined in this case
                            console.log("No All-Scores document for this id: ", golfer.id );
                        }
                    })
                    .catch( (err) => {
                        console.log('Error from getDoc() all-scores collection: ', err)
                    })
                    //console.log('\n   I have completed updating ALL-SCORES record! ')
                    //console.log('... updated: ',  golfer.name)
                })
            }
        })


        /*
        try {
            await UpdateScores( game.title )
        } catch (error) {
            console.log('FAILED creating DB tables: ', error)
            setErrorMessage('FAILED creating DB tables!!!')
        } 
        */

        navigate(-1)
    }


    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Updating Game Scores for {game.title}</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='updateGameScores'>
                
                <p>Continue?</p> 
                <div className='modalActions'>
                    <>
                        <button className='cancel' onClick={ () => navigate(-1) }>No</button>
                        <button className='continue' onClick={ handleUpdateScores }>Yes</button>
                    </>
                </div>
            </div>

        </div>
    )
}

export default UpdateGameScores