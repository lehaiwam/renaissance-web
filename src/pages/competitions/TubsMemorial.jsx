import React from 'react'

// import CurrentStandingsModal from '../../components/competitions/CurrentStandingsModal'

import { TubsMemorialChampionsData } from '../../data/Champions'
import Slider from '../../components/competitions/Slider'
import PageHeader from '../../components/PageHeader'

const TubsMemorial = () => {
    const page='tubs'
    return (
        <div className='formContainer'> 
            <PageHeader page={page}/>
            <span className='title'>Tubs Monareng Memorial (Medal)</span>

            <div className='medal'> 
                {/*
            
                <CurrentStandingsModal 
                    showStandingsModal = { showStandingsModal }
                    setShowStandingsModal = { setShowStandingsModal }
                    competition = { 'ips' }
                />
                */}
                
                <div className='sliderContainer'>
                    <Slider sliderData={ TubsMemorialChampionsData }/>          
                </div>

                <div className='subHeader'>Competition Rules:</div>

                <div className='narration'>
                    
                        <p>
                            This was originally the club's annual season ending whisky competition but after the passing of one of our 
                            founding members, i.e. Tubatsana Monareng, popularly known as Tubs, the club decided to rename the competition 
                            to 'Tubs Monareng Memorial' in remembrance of his contribution in building the club.
                        </p>

                        <p>
                            The competition is in a MEDAL format and is usually played at the end of our year long season. Each 
                            participant is expected to contribute a bottle of 12 Year Old Whisky to the pool and the top five 
                            golfers on the day get to share the bottles.    
                        </p>
                        <p className='winnerText'>
                            The golfer with the LEAST score on the day is declared our championships champion golfer for that year.       
                        </p>
                </div>
            </div> 
    
        </div>

    )
}

export default TubsMemorial