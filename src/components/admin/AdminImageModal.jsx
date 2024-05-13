import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { db } from '../../firebase'
import { doc, getDoc, updateDoc } from "firebase/firestore"

import PageHeader from '../PageHeader'
import Modal from '../Modal'


const AdminImageModal = (props) => {
    const [removeModal, setRemoveModal] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { albumId, album, imageUrl } = location.state
    // console.log('Inside AdminImageModal Item/ImageUrl: ', albumId, album, imageUrl)


    const handleRemoveItem = async() => {
        console.log('Removing this item: ', imageUrl, ' from this album: ', album)
        let tempGallery = []
        const docRef = doc(db, "albums", albumId)
        const docSnap = await getDoc(docRef)
        if ( docSnap.exists() && (docSnap.data().imageUrl.length > 0) ) {
            //console.log("Id: ", id, " => Document Data:", docSnap.data())
            // console.log("\n\n   Original Array:", docSnap.data().imageUrl)
            tempGallery = [ ...docSnap.data().imageUrl ]
            const newArray = tempGallery.filter ( itemUrl => (
                itemUrl != imageUrl
            ))
            // console.log('\n\n   New Array: ', newArray )
            
            await updateDoc( docRef, {
                imageUrl: newArray
            })
        } else {
            // console.log(" No Images for this Album: ", id );
            setErrorMessage(`No Images for this Album : ${albumId}`)
        }
        navigate(-1)
    }


    return (
        <div className='formContainer'> 
            {
                removeModal && 
                <Modal 
                    action={'YESORNO'} 
                    title={'Remove Image'}
                    message={'Are you sure, you wish to remove this image?'}
                    setDisplayModal={ setRemoveModal }
                    executeTask ={ handleRemoveItem } 
                />
            }


 
            <span className='title'>{album}</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='clsAdminImageModal'>
                <div className='clsModalImageWrapper'>
                    <img src={ imageUrl } alt='' />
                </div>  
            </div>
                            
            <div className='clsAdminImageModalFooter'>
                <button className='btnRemove' onClick={ () => setRemoveModal(true) }>
                    Remove
                </button>
                <button className='btmClose' onClick={ () => navigate(-1) }>
                    Close
                </button>
            </div>
        </div>
    )
}

export default AdminImageModal