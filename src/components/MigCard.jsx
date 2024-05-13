import React from 'react'

import humanAvatar from '../images/human-avatar.jpg'

const MigCard = ({mig}) => {
    
    const { firstName, lastName, imageUrl, email, cell } = mig;

    return (
        <div className='migCard'>

            <div className='profileImage'>
                <img src={ imageUrl ? imageUrl : humanAvatar } alt='' />
            </div>

            <div className='migData'>
                <p className='name'>{firstName} {lastName}</p>
                <div className='migEmailCell'>
                    { email && <span className='email'>{email}</span> }
                    { cell && <span className='cell'>+27 {cell}</span> }
                </div>
            </div>

        </div>
    )
}

export default MigCard