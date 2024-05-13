import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

import avatarImage from '../images/addAvatar.png'

import "./pages_style.css"

const Register = () => {
  const navigate = useNavigate()
  const [ errMsg, setErrMsg ] = useState('')
  const [ errorFlag, setErrorFlag ] = useState(false)

  let fname = ''
  let lname = ''

  /**
  boolean validateMigs = async () => {
    console.log('\n\n   Submitted data ...', email, cellphone)
    
    const q = query(collection(db, "migs"), where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
        console.log('Email provided not in the MIGS list!!!')
        setErrorMessage('Email provided not in the MIGS list! Please, check your email?')
        return DENY
    } else {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            // compare db data with entered data
            if ( (email !== doc.data().email) || (cellphone !== doc.data().cell) ) {
                console.log('Email and Cellphone mismatch!!!')
                setErrorMessage('Provided email and cellphone mismatch with preapproved host data!!!')
                return DENY
            }
            fname=doc.data().firstName
            lname=doc.data().lastName
            setEmail('')
            setCellphone('')
            setErrorMessage('')
            return ALLOW
        })
    }
  }
  **/












  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const confirmPassword = e.target[2].value
    const file = e.target[3].files[0] 

    if (password !== confirmPassword) {
      setErrMsg('Password & confirmPassword Mismatch')
      setErrorFlag(true)
      // Link and reload register page
      return
    }


    /** TODO: Make a call to verify golfer status before continuing with registration
        Only if this is a MIGS, i.e. record exists, extract name and surname and continue...

    if (!validMigs) {
        setErrMsg('Email not in MIGS table!!!')
        setErrorFlag(true)
        return;
    }
    **/

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, fname + '-' + lname);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErrMsg('Failed uploading user picture')
          setErrorFlag(true)
          // TODO: Either ignore the error and continue or stop process and re-render register page
          return
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
            // console.log('File available at', downloadURL)
            await updateProfile ( result.user, {
              displayName: fname.toLowerCase(),
              photoURL: downloadURL
            })
            // console.log('\nProfile updated SUCCESSFULLY!!!')

            console.log('User: ', result.user)
            await setDoc(doc( db, "migs", result.user.uid ), {
              firstName: fname.toLowerCase(),
              lastName: lname.toLowerCase(),
              email: email,
              registered: true,
              photoURL: downloadURL
            })
            // console.log('\nUser record created SUCCESSFULLY in Firestore database!!')
            await setDoc(doc( db, "userChats", result.user.uid ), {})

            // On successful registration, route to Login page...
            navigate('/login')
          })
        }
      )
    } catch (error) {
      // console.log('REGISTER: handleRegisterSubmit(), error: ', error.message)
      setErrMsg(error.message)
      setErrorFlag(true)
    }
  }

  return (
      <div className='formContainer'>   
            <span className='logo'>Renaissance Social Golf</span>
            <span className='title'>Register</span>
            { errorFlag && <span className='errorMessage'>{ errMsg }</span> }

            <div className='register'>
                <form type='submit' onSubmit={ handleRegisterSubmit }>
                    <input id='email' type='email' placeholder='email' autocomplete="off"/>
                    <input id='password' type='password' placeholder='password'/>
                    <input id='passwordConfirm' type='password' placeholder='confirm-password'/>
                    <input style={{display:"none"}} type='file' id='imgFile' />
                    <label htmlFor='imgFile'>
                        <img src={ avatarImage } alt='' /> 
                        <span>Add your profile image (optional)</span>
                    </label>
                    <button>Register</button>
                </form>
                <div className='redirect'>
                    <p>Do you have an account already? <Link to='/'>Login</Link></p>
                </div>
               
            </div>
            
    
    </div>
  )
}

export default Register