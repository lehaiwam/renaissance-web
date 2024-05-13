import React from 'react'

// import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'

import { ChampOfChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'
import PageHeader from '../../components/PageHeader'

const ChampOfChamps = () => {
    const page = 'coc'

    return (
        <div className='formContainer'> 
            
            <PageHeader page={page}/>
            <span className='title'>Champion Of Champions</span>

            <div className='coc'> 
                {/*
            
                <CurrentStandingsModal 
                    showStandingsModal = { showStandingsModal }
                    setShowStandingsModal = { setShowStandingsModal }
                    competition = { 'ips' }
                />
                */}
                
                <div className='sliderContainer'>
                    <Slider sliderData={ ChampOfChampionsData }/>          
                </div>

                <div className='subHeader'>Competition Rules:</div>

                <div className='narration'>
                    
                        <p>
                            This is the latest addition to our year long season calendar. The competition was originally 
                            planned to be played in STABLEFORD format, but owing to the latest decision that it will henceforth
                            be played concurrently with the years first medal game, it will now have to played in a MEDAL format 
                            and is contested by the following, a maximum of 15 possible golfers,
                        </p>
                        <div>
                            <ul>
                            <li> Winners of all 8 MEDAL games for the season,</li>
                            <li> Winners of the 4 STABLEFORD games played in that season,</li>
                            <li> The reigning champions of all our competitions, i.e.</li>
                            <ol>
                                <li> Order of merit,</li>
                                <li> Stableford/IPS , </li>
                                <li> Tubs Whisky Memorial and </li> 
                            </ol> 
                            </ul>
                        </div>

                        <p className='winnerText'>
                             The golfer with the LEAST score for the day is declared our championships champion golfer for that year.         
                        </p>
                </div>
            </div> 
    
        </div>

    )
}

export default ChampOfChamps