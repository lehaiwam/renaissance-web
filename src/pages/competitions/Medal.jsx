import React from 'react'

// import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'

import { MedalChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'
import PageHeader from '../../components/PageHeader'

const Medal = () => {
    const page='oom'

    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Order Of Merit (Medal)</span>

            <div className='medal'> 
                
                <div className='sliderContainer'>
                    <Slider sliderData={ MedalChampionsData }/>          
                </div>

                <div className='subHeader'>Competition Rules:</div>

                <div className='narration'>
                    
                        <p>
                            This is the club's flagship contest of the year, also popularly known amongst members, as the Order Of Merit (OOM). 
                            As the name clearly states, its played in a MEDAL format. In this format, the golfer plays each hole until 
                            they get the ball into the hole. As maby shots as it takes. If you pick up before that, you get disqualified.      
                        </p>

                        <p>
                            Over a year we play eight medal games and we use only the golfer's best six scores to determine the winner.
                            Note that a golfer is automatically out of contention if he has not played a minimum of 
                            six games required to permute their final score.    
                        </p>
                        <p className='winnerText'>
                            The golfer with the LEAST cumulative score from his/her best six games is declared our MEDAL/OOM champion 
                            golfer of the year.     
                        </p>
                </div>
            </div> 
    
        </div>

    )
}

export default Medal