import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../App'
import PageHeader from '../components/PageHeader'


const Home = () => {
    // Avaiable context fields, ctxId, ctxFirstName, ctxLastName, ctxAuthLevel, ctxEmail, ctxDisplayName
    const { ctxFirstName, ctxLastName } = useContext( AuthContext )
    // console.log('In Home(), ctxFirstName: ', ctxFirstName)
    return (
        <div className='formContainer'>             
            <PageHeader page={'home'}/>
            <span className='title'>The Home of Renaissance Social Golf Club</span>
            <div className='home'>
              <span className='welcomeNote'>
                Welcome back, { ctxFirstName } { ctxLastName }
              </span>
              <p>NB: Please use the side bar menu to navigate around...</p>
            </div> 
        </div>
    )
}

export default Home