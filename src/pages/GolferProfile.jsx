import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../App'

import NotAuthorized from '../components/NotAuthorized'
import humanAvatar from '../images/human-avatar.jpg'
import PageHeader from '../components/PageHeader'

// fibase/auth
//import {  updateProfile } from 'firebase/auth'

// fibase/firestore
import { db } from '../firebase'
import { query, collection, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"

//firebase/storage
import { storage } from '../firebase'
import { ref, getDownloadURL } from "firebase/storage";



import "./pages_style.css"

const GolferProfile = () => {
    // Other fields available from context, i.e.ctxId, ctxFirstName, ctxLastName, ctxAuthLevel, ctxDisplayName 
    const {  ctxEmail, ctxAuthLevel } = useContext( AuthContext )
    const navigate = useNavigate()

    const [fetchingData, setFetchingData] = useState(true)
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState( '')
    const [cell, setCell] = useState('')
    const [email, setEmail] = useState('')
    // const [emailVerified, setEmailVerified] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [ inactive, setInactive ] = useState(true)

    const [ data, setData] = useState ({ userId : '', userImageUrl: '', userFirstName: '', userLastName: '' })

    useEffect(() => { 

        // get MIGS (Members In Good Standing) record for this golfer
        const getMigsDocument = async() => {
            try {
                const q = query(collection(db, "migs"))
                const querySnapshot = await getDocs(q)
            
                if (querySnapshot.empty) {
                    // console.log('MIGS record not found? Impossible!!!', ctxEmail)
                    setErrorMessage('Registered user with no MIGS record?Impossible!!!')
                } else {
                    querySnapshot.forEach( async (doc) => {
                        if ( doc.data().email && (doc.data().email == ctxEmail) ) {
                            // console.log(doc.id, " => ", doc.data())
                            setId(doc.id)
                            setFirstName(doc.data().firstName)
                            setLastName(doc.data().lastName)
                            setCell(doc.data().cell)
                            setEmail(doc.data().email)
                            // setEmailVerified(doc.data().emailVerified)
                            setImageUrl(doc.data().imageUrl)
                            setErrorMessage('')

                            setData( { 
                                ...data, 
                                userId:        doc.id, 
                                userImageUrl:  doc.data().imageUrl,
                                userFirstName: doc.data().firstName,
                                userLastName:  doc.data().lastName,
                            })
                             
                           // console.log(' IMAGE URL in MIGS: ', doc.data().imageUrl )
                            if ( !doc.data().imageUrl ) {
                                console.log('\n\n   1. No imageUrl in MIGS, Obtaining the downloadURL...')
                                const userImageFileName = firstName.toString().toLowerCase() + '-' + lastName.toString().toLowerCase()
                                const imageFileRef = ref(storage, `profile-images/${userImageFileName}`);

                                try {
                                    const url = await getDownloadURL(imageFileRef)
                                    if (url.length > 1) {
                                        // console.log('\n\n   2. OT  DownloadURL: ', url)
                                        setImageUrl(url)
                    
                                        try {
                                            // console.log('\n\n   3. Updating imageUrl in MIGS: ', url)
                                            const migsRef = doc(db, "migs", id);
                                            await updateDoc(migsRef, { 
                                                imageUrl: url,
                                            })
                                        } catch (error) {
                                            console.log('Error updating imageUrl on MIGS updateDoc(): ', error.message) 
                                        }
                                    }


                                } catch (error) {
                                    let arrRes = error.message.match("storage/object-not-found")
                                    if ( arrRes.length < 1 ) {
                                        console.log('Error getting  imageUrl getDownloadURL(): ', error.message) 
                                    }
                                }  
                            } 
                        }
                    })
                }
            } catch(error) {
                console.log('In useEffect: getMigsDocument() error : ', error)
            }
        }
       
        if (fetchingData) {   
            getMigsDocument()
            setFetchingData(false)
        }
        
    })


    const saveChanges = async (e) => {
        e.preventDefault()
        // const email = e.target[0].value
        const locFirstName = e.target[1].value
        const locLastName = e.target[2].value
        const locCell = e.target[3].value 

        if (locFirstName !== firstName || locLastName !== lastName || locCell !== cell) {
            try {
                await updateDoc(doc( db, "migs", id ), {
                  firstName: locFirstName.toLowerCase(),
                  lastName: locLastName.toLowerCase(),
                  cell: locCell,
                })       
            } catch (error) {
                setErrorMessage('Error on MIGS updateDoc(): ' + error.message)
                console.log('Error on MIGS updateDoc(): ', error) 
            }
        }
        setInactive(true)
        navigate('/profile')
    }

    if ( !ctxAuthLevel ) {
        return (
            <NotAuthorized title={ 'You are not authenticated! Login?'} authenticate={false} />
        )
    }

    return (
       
        <div className='formContainer'> 
                <PageHeader page={'golferprofile'}/>
                <span className='title'>{firstName} {lastName}</span>
                { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

                <div className='profile'>

                    <div className='excludeRedirect'> 
                      <div className='imageWrapper'>
                          <div className='imageContainer'>
                            { imageUrl ? <img src={ imageUrl } alt='' /> : <img src={ humanAvatar } alt=''  /> } 
                          </div>
                      </div>

                      <form type='submit'  onSubmit={ saveChanges } > 
                            <input id='email' type='email' defaultValue={email} placeholder='email' autoComplete="off" disabled={true}/>
                            <input id='fname' type='text' value={firstName} placeholder='first name'
                                onChange={(e) => {
                                    setInactive(false)
                                    setFirstName(e.target.value)
                                }}
                            />
                            <input id='lname' type='text' value={lastName} placeholder='last name' 
                                onChange={(e) => {
                                    setInactive(false)
                                    setLastName(e.target.value)
                                }}
                            />
                            <input id='cell' type='text' value={cell}  placeholder='cellphone' 
                                onChange={(e) => {
                                    setInactive(false)
                                    setCell(e.target.value)
                                }}
                            />
                            <button className={inactive && 'invisible'}>Submit</button>
                      </form>
                    </div>

                    <div className='redirect'> 
                        <span>Do you wish to upload a new or change your profile picture? 
                            <Link 
                                to='/update-profile-image' 
                                state={{ data: data }}
                            >
                                Click here
                            </Link>
                        </span>
                    </div>

                </div>
           
        </div>  
    )
}

export default GolferProfile