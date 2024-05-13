

import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const UploadProfileImage = async (imageFile, newFileName) => {
    console.log('\n\n  1. Inside uploadProfileImage() ... ')
    console.log('\n    1.1 imageFile: ', imageFile)
    console.log('\n    1.2 newFileName: ', newFileName)

    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `profile-images/${newFileName}`);
    const uploadTask = uploadBytes(storageRef, imageFile);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('\n   2. Upload is ' + progress + '% done');

            switch (snapshot.state) {
                case 'paused':
                    console.log('\n    2.1 Upload is paused');
                    break;
                case 'running':
                    console.log('\n    2.2 Upload is running');
                    break;
            }
        }, 
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log('\n   2.3 User does NOT have permission to access the object')
                    break;
                case 'storage/canceled':
                    console.log('\n   2.4 User canceled the upload')
                    break;
                case 'storage/unknown':
                    console.log('\n   2.5 Unknown error occurred, inspect error.serverResponse')
                    break;
            }
        }, 
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('\n   3. File available at', downloadURL);
            });
        }
    )
    console.log('\n  Exiting uploadProfileImage()')
}

export default UploadProfileImage
