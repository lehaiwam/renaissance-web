import React, { useEffect, useState} from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

// fibase/firestore
import { db } from '../firebase'
import { doc, getDoc } from "firebase/firestore"

//firebase/storage
import { storage } from '../firebase'
import { ref, getDownloadURL } from "firebase/storage";

import useStorage from '../hooks/useStorage'

import PageHeader from '../components/PageHeader'

const Gallery = (props) => {
    // console.log(" Inside Gallery()....")
    const [ gallery, setGallery ] = useState ([])
    const [ errorMessage, setErrorMessage ] = useState('')

    const [selectedFile, setSelectedFile] = useState(null)
    const { progress, error, url, startUpload } = useStorage()

    const navigate = useNavigate()
    const location = useLocation()
    const album = location.state?.album
    const { id, name } = album

    // console.log('Id: ', id, 'name: ', name)

    useEffect(() => {

        const getGallery = async () => {
            // console.log("\n\n\n    Executing getGallery()....")
            let tempGallery = []
            const docRef = doc(db, "albums", id)
            const docSnap = await getDoc(docRef)
            if ( docSnap.exists() && (docSnap.data().imageUrl.length > 0) ) {
                // console.log("Id: ", id, " => Document data:", docSnap.data())
                tempGallery = [ ...docSnap.data().imageUrl ]  
            } else {
                // console.log(" No Images for this Album: ", id );
                setErrorMessage(`No Images for this Album : ${name}`)
            }
            setGallery(tempGallery)
        }

        getGallery()

    }, [ id, name ]) 


    return (
        <div className='formContainer'>   

            <PageHeader page={'membergallery'} />

            <span className='title'>Member {name}</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='clsAdminGallery'>
                {
                    gallery.map( item => (  

                        <Link key={item}
                            to='/image-modal' 
                            state={{ 
                                albumId: id, 
                                album: name, 
                                imageUrl: item
                            }}> 
                            <div className='clsGalleryItem' >
                                <img src={ item } alt='' />
                            </div>            
                        </Link>

                    ))
                }
            </div>   

            <div className='clsGalleryFooter'>
                    

                    <div className='clsBtnContainer'>
                        <button onClick={() => navigate(-1) }>Back</button>
                    </div>     
            </div>
        </div>
    )
}

export default Gallery