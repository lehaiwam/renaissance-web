//import React, {useState} from 'react'

const Modal = ({ action, title, message, setDisplayModal, executeTask }) => {

    // console.log('\n\n    Inside the MODAL ')

    const handleContinue = () => {
        switch(action) {
            case 'YESORNO': {
                executeTask()
                break
            }
            case 'INFO': {
                //setInfoModal(true)
                break;
            }
            default: {
                console.log('THIS SHOULD NEVER EVER BE PRINTED TO THE LOGS!!!')
               return
            }
        }
    }

    return (
        <div className='modal'>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className='modalActions'>
                { (action ==='YESORNO') && 
                <>
                    <button className='cancel' onClick={ () => setDisplayModal(false) }>No! Ignore Request</button>
                    <button className='continue' onClick={ handleContinue }>Yes! Continue</button>
                </>
                }

                { (action ==='INFO') && 
                
                    <button className='continue' onClick={ () => setDisplayModal(false) }>Okay</button>
            
                }
            </div>
        </div>
    )
}

export default Modal