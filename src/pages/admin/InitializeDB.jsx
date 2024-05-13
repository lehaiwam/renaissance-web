import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../App'
import NotAuthorized from '../../components/NotAuthorized'

import { InitializeAllMigsData } from '../../utils/InitializeAllMigsData'
import PageHeader from '../../components/PageHeader'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3
const TECHNICAL_SUPPORT = 4

const InitializeDB = () => {
    const navigate = useNavigate()
    const authCtx = useContext( AuthContext )
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ infoMessage, setInfoMessage ] = useState('Note that you will reset all data and scores for all MIGS!!!')
   
    // console.log('authCtx: ', authCtx)
    // const intAuthLevel = parseInt(authCtx.ctxAuthLevel)
    // console.log(' intAuthLevel: ', intAuthLevel)


    /*
    useEffect(() => {
        console.log("Does this useEffect even get executed????")
        const intAuthLevel = parseInt(authCtx.authLevel)
        setAuthLevel(intAuthLevel)
        console.log('authCtx.authLevel: ', authCtx.authLevel, '   authLevel: ', authLevel)

    }, [authCtx.authLevel])
    */   


    const handleInitialize = async () => {
        
        try {
            await InitializeAllMigsData()
            navigate('/login')
        } catch (error) {
            console.log('FAILED creating DB tables: ', error)
            setErrorMessage('FAILED creating DB tables!!!')
        } 
    }

    
    // console.log('authLevel: ', authLevel)
    if ( authCtx.ctxAuthLevel < TECHNICAL_SUPPORT ) {
        return (
            <NotAuthorized title={'Initialize System Database?'} />
        )
    }


    return (
        <div className='formContainer'> 
            <PageHeader page={'initializeDb'}/>
            <span className='title'>Initializing All MIGS Data</span>
            { infoMessage && <span className='infoMessage'>{ infoMessage }</span> }

            <div className='infoModal'>
                <p>Do you wish to continue?</p> 
                <div className='modalActions'>
                    <>
                        <button className='cancel' onClick={ () => navigate(-1) }>No</button>
                        <button className='continue' onClick={ handleInitialize }>Yes</button>
                    </>
                </div>
            </div>

      </div>
  )
}

export default InitializeDB