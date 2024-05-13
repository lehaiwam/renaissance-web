import React from 'react'

// import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'

import { StablefordChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'
import PageHeader from '../../components/PageHeader'

const Stableford = () => {
    const page='stableford'


    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Stableford (IPS)</span>

            <div className='stableford'> 
                {/*
            
                <CurrentStandingsModal 
                    showStandingsModal = { showStandingsModal }
                    setShowStandingsModal = { setShowStandingsModal }
                    competition = { 'ips' }
                />
                */}
                
                <div className='sliderContainer'>
                    <Slider sliderData={ StablefordChampionsData }/>          
                </div>

                <div className='subHeader'>Competition Rules:</div>

                <div className='narration'>
                    
                        <p>
                            This is what we commonly refer to as our IPS championship. 
                            This is a format where for each hole played, a golfer is allocated points depending on 
                            the hole's stroke rating and the golfer's handicap. The players plays until they cannot 
                            score a point. At that point they can pick up and declare a zero point for that hole.     
                        </p>

                        <p>
                            Over a year we play four stableford games and we use only your best three scores to determine 
                            your score for the year. Note that a golfer is automatically out of contention if he has not played a 
                            minimum of three games required to permute their final score for the year.   
                        </p>
                        <p className='winnerText'>
                            The golfer with the MOST cumulative points from his/her three best scores is declared our IPS/STABLEFORD champion golfer of the year.  
                        </p>
                </div>
            </div> 
    
        </div>

    )
}

export default Stableford