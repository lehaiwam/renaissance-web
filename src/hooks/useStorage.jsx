import React, { useState } from 'react'

//firebase/storage
import { storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

//firebase/firestore
import { db } from '../firebase'
import { doc, setDoc, getDoc } from "firebase/firestore"

import { v4 as uuidv4} from 'uuid'

const useStorage = () => {

    const [ progress, setProgress ] = useState(0)
    const [ error, setError ] = useState(null)
    // const [ url, setUrl ] = useState(null)


    const startUpload = (file, album) => {
        if (!file) {
            setError('No file selected! Please select file first...')
            return
        }

        // console.log('Album Name: ', album.name)
        const fileId = uuidv4()
        // console.log('File Id: ', fileId)
        const fileFormat = file.type.split('/')[1]
        // console.log('File Format: ', fileFormat)
        const storageRef = ref(storage, `albums/${album.name}/${fileId}.${fileFormat}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            // console.log('Upload is ' + progress + '% done')

            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
                break;
                case 'running':
                console.log('Upload is running');
                break;
            }

        }, (error) => {
            // Handle unsuccessful uploads
            console.log('uploadTask() error: ', error.message)
            setError('uploadTask() error: ', error.message)   
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            // console.log('File available at: ', downloadURL)
            //setUrl(downloadURL)
            setProgress(progress)

            // Insert the new url into the array for the album
            try {
                let arrayTempUrl = []
                const docRef = doc(db, "albums", album.id)
                const docSnap = await getDoc(docRef)
                if (docSnap) {
                    console.log("Document data => ", docSnap.data())
                    arrayTempUrl = [ ...docSnap.data().imageUrl ]
                    arrayTempUrl.push(downloadURL) 

                    setDoc(docRef, 
                        { imageUrl: arrayTempUrl }, { merge: true }
                    )
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log(" No ALBUMS document for this id: ", album.id )
                    setError('No ALBUMS document for this id: ', album.id)
                } 

            } catch(err) {
                console.log('getDownloadURL() error: ', err.message)
                setError('getDownloadURL() error: ', err.message)
            }
            
        })
    }

    return {
        progress, error, startUpload
    }
}

export default useStorage