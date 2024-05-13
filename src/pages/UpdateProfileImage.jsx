import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../App'

import avatarImage from '../images/addAvatar.png'
import humanAvatar from '../images/human-avatar.jpg'

// fibase/auth
import {  updateProfile } from 'firebase/auth'

// fibase/firestore
import { db } from '../firebase'
import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore"

//firebase/storage
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import PageHeader from '../components/PageHeader'
import "./pages_style.css"

const UpdateProfileImage = () => {
    const navigate = useNavigate()
    const authCtx = useContext( AuthContext )

    const location = useLocation()
    const data = location.state?.data
    const { userId, userImageUrl, userFirstName, userLastName } = data
    // console.log('Data: ', userId, userImageUrl, userFirstName, userLastName)
   
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ invisible, setInvisible ] = useState(true)

    const saveProfileImageData = async (e) => {
        e.preventDefault()
        setInvisible(false)
        const file = e.target[0].files[0] 
        const lcFirstName = userFirstName.toLowerCase()
        const lcLastName = userLastName.toLowerCase()

        try {
            // console.log('\n   1. Uploading image to firebase/storage...')
            const storageRef = ref(storage, `profile-images/${lcFirstName}-${lcLastName}`)

         
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                setErrorMessage('Failed uploading user picture')
                    // TODO: Either ignore the error and continue or stop process and re-render register page
                    return
                }, 
                () => {
                    // console.log('\n   2. Image file uploaded to firebase/storage SUCCESSFULLY! Now, getting the URL...')
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        // console.log('\n   3. New image URL : ', downloadURL)
                        await updateProfile ( authCtx.ctxCurrentUser, {
                            displayName: lcFirstName + ' ' + lcLastName,
                            photoURL: downloadURL
                        })
                        // console.log('\n   4. User : ', userId, ' Profile updated SUCCESSFULLY!!!')
        
                        await updateDoc( doc( db, "migs", userId ), {
                            imageUrl: downloadURL
                        })      
                        // console.log('\n   5. MIGS imageUrl updated SUCCESSFULLY!!!') 

                        // On successful update, route back to main profile page...
                        navigate('/Home')
                    })
                }
            )
        } catch (error) {
            setErrorMessage('Error in updateProfileImage : ', error.message)
            console.log('Error in updateProfileImage: ', error) 
        }
   }


   // console.log('imageUrl: ', imageUrl)

    return (
       
        <div className='formContainer'> 
                <PageHeader page={'updateprofileimage'}/>
                <span className='title'>Update Profile Picture?</span>
                { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

                <div className='updateProfileImage'>
                       
                    
                    <div className='imageContainer'>
                        { userImageUrl ? <img src={ userImageUrl } alt='' /> : <img src={ humanAvatar } alt=''  /> } 
                    </div>
                  
                    
                    <form  type='submit'  onSubmit={ saveProfileImageData } > 
                        
                        <input style={{display:"none"}} type='file' id='imageFile'  onChange={ (e) => setInvisible(false)}/>
                        <label htmlFor='imageFile'>
                            <img 
                                src={ avatarImage } 
                                alt='' height={30} width={30} 
                               
                            /> 
                            <span>Click here to choose new profile picture?</span>
                        </label>
                    
                        <button className={ invisible ? 'notActive' : '' }>Update</button>
                    </form> 
 
                </div>

        
        </div>  
    )
}

export default UpdateProfileImage