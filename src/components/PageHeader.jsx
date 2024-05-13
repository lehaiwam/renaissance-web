import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5"

const PageHeader = ({page}) => {

    const navigate = useNavigate()

    return (
        <div className='pageHeader'>
            
            {   (page==='home' || page==='login' || page==='register') 
                ?
                    <span className='logo'>Renaissance Social Golf</span>
                :           
                <>
                    <span className='logo'>Renaissance Social Golf</span>
                    <i className='bsArrowLeftCircle' onClick={ () => navigate('/home') }> 
                        <IoHomeOutline size={30} />
                    </i>
                </>
            }

        </div>
    )

}

export default PageHeader