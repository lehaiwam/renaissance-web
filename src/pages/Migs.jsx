import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'
import { db } from '../firebase'
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import MigCard from '../components/MigCard'
import NotAuthorized from '../components/NotAuthorized'
import PageHeader from '../components/PageHeader'

const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3
const TECHNICAL_SUPPORT = 4

const Migs = () => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const [migs, setMigs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    
  
    useEffect(() => {   
        const getAllMigs = async() => {
            const arrayMigs = []
            const q = query(collection(db, "migs"), orderBy("firstName"))

            try {
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) {
                    console.log('Empty MIGS table? Impossible!!!')
                    setErrorMessage('Empty MIGS table? Impossible!!!')
                } else {
                    querySnapshot.forEach(async (doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data())

                        if (doc.data().memberStatus !== '9') {
                            arrayMigs.push({
                                id: doc.id, 
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                email: doc.data().email,
                                cell: doc.data().cell,
                                imageUrl: doc.data().imageUrl,
                            })
                        }
                        
                    })
                    setMigs(arrayMigs)
                }
            } catch (error) {
                setErrorMessage(error.message)
                console.log('In useEffect: getAllMigs() error : ', error.message)      
            }
        }

        getAllMigs()

    }, [])
    
    
    
    if ( authCtx.ctxAuthLevel < MEMBER ) {
        return (
            <NotAuthorized title={'You are not authenticated! Login?'} />
        )
    }


    /*
    if ( !authCtx.email) {
        console.log('Not Authorized! User not authenticated!!!')
        setErrorMessage('Not Authorized! User not authenticated!!!')
        // navigate('/login') 
    }
    */


    return (

        <div className='formContainer'>      
            <PageHeader />
            <span className='title'>Members in good standing</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            { migs?.length > 0 ?
                (
                    <div className='migsContainer'>
                        { migs.map( (mig) => 
                            <MigCard key={mig.id} mig={ mig }/>
                        )}          
                    </div>
                ) :
                (
                    <div className='migsEmpty'>
                        <p className='emptyText'> 
                            Please be patient! Fetching data ....
                        </p>        
                    </div>
                )
            }
        </div>
    )
}
  
export default Migs