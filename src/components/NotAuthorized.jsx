import React from 'react'
import { useNavigate } from 'react-router-dom'
import StopIcon from '../images/stop-icon.avif'

const NotAuthorized = ({ title, authenticated }) => {
    const navigate = useNavigate()

    return (
        <div className='notAuthorized'>
            <span className='title'>{title}</span>
            <img src={StopIcon} alt='' width={40}/>
            <p>  You are not authorized to access this functionality!!!</p>
            <p>  Please, contact Club Captain or Technical Support.</p>
            <button onClick={ () => {
                {authenticated ? navigate('/home') : navigate('/login') } 
            }}>
                <span>Okay</span>
            </button>
        </div>
    )
}

export default NotAuthorized