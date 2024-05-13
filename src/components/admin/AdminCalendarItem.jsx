import React from 'react'
import { Link } from 'react-router-dom'

const AdminCalendarItem = ({game}) => {

    return (
        <div className='calendarItem' >
            <div className='gameData'>
                <p className='title'>{ game.title}</p>
                <p className='date'> { game.date }</p>  
                <p className='time'> { game.teeOff }</p> 
                <p className='course' > {game.course} </p>
            </div>

            <div className='gameActions'>
                <Link to='/admin/game-details' state={{ game: game}}> 
                    <button>     
                        Edit
                    </button>
                </Link>
                {          
                    (game.status > '2')  &&
                    <Link to='/admin/update-scores' state={{ game: game}}> 
                        <button>
                            Update Scores 
                        </button>
                    </Link>
                }
            </div>
        </div>
    )
}    

export default AdminCalendarItem