import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'

const TheChampion = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const item = location.state?.item
    console.log('Item data: ', item)
    const page = 'champion'
   
    return (
        <div className='formContainer'> 
            <PageHeader page={page}/> 
            <span className='title'>{ item.competition}</span>

            <div className='champion'>

                <p>{item.description}</p>
                        
              
                <img src={item.imageUrl} alt='' />
            
            
                <p>{item.name}</p>

                <button onClick={ () => navigate(-1) }>Back</button>
            </div>
        </div>
    )
}

export default TheChampion