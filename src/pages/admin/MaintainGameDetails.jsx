import React, { useState, useContext } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.module.css'    // the css for the date picker

import { db } from '../../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext'
import PageHeader from '../../components/PageHeader';


// const monthDesc = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


const MaintainGameDetails = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const game = location.state?.game

    // const authCtx = useContext(AuthContext);
    

    //const now = new Date()
    //const [teeDate, setTeeDate] = useState(now)  // set state to handle the tee date
    //const [teeTime, setTeeTime] = useState(now.getHours() + ':' + now.getMinutes())  // set state to handle the tee time
    //const [mode, setMode] = useState('date')
    //const [showDateModal, setShowDateModal] = useState(false)
    //const [showTimeModal, setShowTimeModal] = useState(false)
    //const [text, setText] = useState('Empty')

    const [id, setId] = useState(game.id)
    const [title, setTitle] = useState(game.title)
    // const [date, setDate] = useState(game.date)
    const [teeDate, setTeeDate] = useState(game.date)        // Currently not used, waiting to resolve DatePicker.jsx issues
    const [teeOff, setTeeOff] = useState(game.teeOff)
    const [course, setCourse] = useState(game.course)
    const [weekendAway, setWeekendAway] = useState(game.weekendAway)
    const [fees, setFees] = useState(game.fees)
    const [tops, setTops] = useState(game.tops)
    const [bottoms, setBottoms] = useState(game.bottoms)
    const [gameStatus, setGameStatus] = useState(game.status)
    const [errorMessage, setErrorMessage] = useState('')

    // const todaysDate = new Date().toUTCString().slice(0,16)
    // console.log('Todays Date: ', todaysDate)  

    const handleSubmit = async(e) => {
        e.preventDefault()
        // Read the form data
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const { gameStatus, teeDate, teeOff,course, fees, tops, bottoms, weekendAway } = formJson
        
        try {
            const calendarRef = doc(db, "calendar", id);
            await updateDoc(calendarRef, { 
                date: teeDate,
                teeOff: teeOff,
                course: course,
                fees: fees,
                uniform: {
                    tops: tops,
                    bottoms: bottoms,
                },
                status: gameStatus,
                weekendAway: weekendAway,
            })
        } catch (error) {
            console.log('Error on CALENDAR updateDoc(): ', error) 
        }
        navigate(-1)
    }
    
    return (
        <div className='formContainer'> 
            <PageHeader page = 'maintain-game-details' />
            <span className='title'>Edit Game Details</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <form className='editGame' method="post" onSubmit={handleSubmit}>

                <div className='titleStatus'>
                   <p className='title'> { title } </p>
                   <label>Game Status: 
                        <select 
                            name="gameStatus" 
                            defaultValue={ gameStatus }
                        >
                            <option value={'0'}>Unscheduled</option>
                            <option value={'1'}>Scheduled</option>
                            <option value={'2'}>Booked</option>
                            <option value={'3'}>Completed</option>
                        </select>
                   </label>
                </div>

                <div className='fullWidthContainer'> 
                    <label>
                        Date: <input 
                            type='text'
                            name="teeDate" 
                            defaultValue={ teeDate }
                        />     
                    </label>  
                    <label>
                        Tee Off Time: <input 
                            type='text'
                            name="teeOff" 
                            defaultValue={ teeOff }
                        />
                    </label>                             
                </div>

                <div className='fullWidthContainer'>
                    <label>
                        Green Fees: <input
                            id='fees' 
                            type='text'
                            name="fees" 
                            defaultValue={ fees }
                        />
                    </label> 
                    <label>
                        Golf Course: <input
                            id='course' 
                            type='text'
                            name="course" 
                            defaultValue={ course }
                        />
                    </label>        
                </div>
             
                <div className='fullWidthContainer'>
                    <label>
                        Tops: <input 
                            type='text'
                            name="tops" 
                            defaultValue={ tops }
                        />
                    </label> 
                    <label>
                        Bottoms: <input 
                            type='text'
                            name="bottoms" 
                            defaultValue={ bottoms }
                        />
                    </label>        
                </div>

                <div className='weekendAwayContainer'>
                    Weekend Away?
                    <div className='options'>
                        <label>
                            <input type="radio" name="weekendAway" value={'true'} defaultChecked={ weekendAway === 'true'}  />
                            <span>Yes</span>
                        </label>
                        <label>
                            <input type="radio" name="weekendAway" value={'false'} defaultChecked={weekendAway === 'false'}  />
                            <span>No</span>
                        </label>
                    </div>                      
                </div>
                
                <div className='actionButtons'>   
                  <div>
                      <button type='submit'>
                          Save Changes
                      </button>
                  </div>
                  <div>
                      <button type='button' onClick={() => navigate(-1)}>
                          Back
                      </button>
                  </div>
                </div>
            </form>        
        </div>
    )
}

export default MaintainGameDetails