import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase'
import { collection, query, getDocs, addDoc, updateDoc, doc } from "firebase/firestore"

import { AuthContext } from '../App'
import NotAuthorized from '../components/NotAuthorized'
import PageHeader from '../components/PageHeader'

const Albums = () => {
    const { authLevel } = useContext(AuthContext)
    const [newAlbum, setNewAlbum] = useState ('')
    const [albums, setAlbums] = useState ([])
    const [errorMessage, setErrorMessage] = useState('')



    useEffect(() => {

        const getAllAlbums = async () => {

            try {
                const tempAlbum = []
                const queryDocRef = query(collection(db, `albums`))
                const querySnapshot = await getDocs(queryDocRef)
                if (querySnapshot.empty) {
                    console.log('Empty Albums')
                    setErrorMessage('Empty Albums!!!')
                } else {
                    querySnapshot.forEach(async (theAlbum) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(theAlbum.id, " => ", theAlbum.data())

                        if ( (theAlbum.data().defaultImage === '') && (theAlbum.data().imageUrl[0] !== '') ) {
                            const albumRef = doc( db, "albums", theAlbum.id )
                            await updateDoc( albumRef, {
                                defaultImage: theAlbum.data().imageUrl[0]
                            })
                            theAlbum.data().defaultImage = theAlbum.data().imageUrl[0]
                        }

                        tempAlbum.push({ ...theAlbum.data(), id: theAlbum.id })
                    })
                    setAlbums(tempAlbum)
                }
            } catch (error) {
                console.log('In useEffect: getAllAlbums() error : ', error)  
            }
        }

        getAllAlbums()

    }, [])


   

    const handleCreateAlbum = async() => {
        // console.log('\n    Creating Album: ', newAlbum)

        try {
            const albumRef = collection(db, "albums")
            console.log( newAlbum )
            const docRef = await addDoc(albumRef, { 
                name: newAlbum,
                defaultImage: '',
                imageUrl: [],
            })
            console.log('Successfully added new ALBUMS record, id : ', docRef.id)

            /* Create sub-directory for this album in the albums directory
            const newAlbumRef = collection(db, newAlbum)
            const docRef = await addDoc(newAlbumRef, { 
                imageUrl: '',
                uploadedAt: new Date(),
                uploadedBy: currentUser
            })
            */

        } catch (error) {
            console.log('Error on ALBUMS addDoc(): ', error) 
            setErrorMessage(error.message)
        }
    }


    if ( !authLevel ) {
        return (
            <NotAuthorized title={ 'You are not authenticated! Login?'} authenticate={false} />
        )
    }


    return (
        <div className='formContainer'>   
            <PageHeader page={'adminalbum'} />
            <span className='title'>Member Albums</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='clsAdminAlbum'>
                {
                    albums.map( album => (
                        <Link to='/gallery' key={album.id} state={{ album: album}}>           
                            <div className='clsAlbumItem' >
                                    { 
                                        album.defaultImage 
                                            ? 
                                        <img src={album.defaultImage} alt='' width={100} height={100}/>
                                            :
                                        <img src='https://media.istockphoto.com/id/508030340/photo/sunny-cat.jpg?s=612x612&w=0&k=20&c=qkz-Mf32sbJnefRxpB7Fwpcxbp1fozYtJxbQoKvSeGM=' alt='album' width={100} height={100} />
                                    }
                                    <span>{album.name}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>   
        </div>
    )
}

export default Albums