import React, { useEffect, useState, createContext } from "react"
import { auth, db } from '../firebase'
import { query, collection, where, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const MEMBER_TYPES = {
    MEMBER: 'Member',
    EXCO: 'Exco',
    ADMINISTRATOR: 'Administrator',
    TECHNICAL_SUPPORT: 'Technical Support'
}

export const AuthContext = createContext({
    ctxId : null,
    ctxFirstName: '',
    ctxLastName: '',
    ctxAuthLevel: '',
    ctxUserType: null,
    ctxDisplayName : '',
    ctxEmail : ''
})

export function AuthContextProvider({ children }) {
    // const [ currentMember, setCurrentMember ] = useState({})
    const [ctxId, setCtxId] = useState('') 
    const [ctxFirstName, setCtxFirstName ] = useState('')
    const [ctxLastName , setCtxLastName ]= useState('')
    const [ctxAuthLevel , setCtxAuthLevel ]= useState('')
    const [ctxUserType , setCtxUserType]= useState('')
    const [ctxDisplayName , setCtxDisplayName ]= useState('')
    const [ctxEmail ,setCtxEmail]  = useState('')


    useEffect(() => {
        
        const unSub = onAuthStateChanged( auth, async (user) => {
            // setCurrentMember(user)
            if (user) {             
                try {
                    const q = query(collection(db, "migs"), where("email", "==", user.email))
                    const querySnapshot = await getDocs(q)         
                    if (querySnapshot.empty) {
                        console.log('MIGS record not found? Impossible!!!', user.email)
                        // setErrorMessage('Registered user with no MIGS record?Impossible!!!')
                    } else {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            // console.log(doc.id, " => ", doc.data())
                            setCtxId (doc.id)
                            setCtxFirstName (doc.data().firstName)
                            setCtxLastName  (doc.data().lastName)
                            setCtxAuthLevel  (doc.data().authLevel)
                            switch(doc.data().authLevel) {
                                case '1':
                                    setCtxUserType (MEMBER_TYPES.MEMBER)
                                    break
                                case '2':
                                    setCtxUserType (MEMBER_TYPES.EXCO)
                                    break
                                case '3':
                                    setCtxUserType (MEMBER_TYPES.ADMINISTRATOR)
                                    break
                                case '4':
                                    setCtxUserType (MEMBER_TYPES.TECHNICAL_SUPPORT)
                                    break
                                default:
                                    setCtxUserType (MEMBER_TYPES.MEMBER)
                                    break
                            }
                            setCtxDisplayName (user.displayName)
                            setCtxEmail (user.email)
                        })
                    }    
                } catch(error) {
                    console.log('AuthContextProvider, useEffect, getDocs() error : ', error)
                }
                
                console.log('AuthContext useEffect(), User currently logged in: ', user);

                // if listening to real-time event, we should use a clean-up function to avoid memory leakage...
                return () => {
                    unSub();    
                }

            } else {
                console.log('AuthContext useEffect(), No user not logged in...');
            }   
        });
    });

    return (
        <AuthContext.Provider value = {{ctxEmail}   }>
            { children }
        </AuthContext.Provider>
    )
}
