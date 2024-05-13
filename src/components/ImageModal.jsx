import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import PageHeader from './PageHeader'

const ImageModal = (props) => {
    const [ errorMessage, setErrorMessage ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { albumId, album, imageUrl } = location.state
    // console.log('Inside AdminImageModal Item/ImageUrl: ', albumId, album, imageUrl)


    return (
        <div className='formContainer'> 
            <PageHeader page={'adminImageModal'}/>
            <span className='title'>Member {album}</span>
            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='clsAdminImageModal'>
                <div className='clsModalImageWrapper'>
                    <img src={ imageUrl } alt='' onClick={() => navigate(-1)} />
                </div>  
            </div>
        </div>
    )
}

export default ImageModal