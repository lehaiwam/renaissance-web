import React, {useState}from 'react'
import * as FaIcons from 'react-icons/fa'
// import * as AiIcons from 'react-icons/ai'
import {IconContext} from 'react-icons'
import Sidebar from './Sidebar'


const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleShowSidebar = () => {
        setShowSidebar( !showSidebar )
    }

    return (
        <IconContext.Provider value={{color: 'undefined'}} >
            <div className='navBarWrapper'>

                <div className='navbar'> 
                    {
                        showSidebar ? 
                            <div className='barsIcon'>
                                <FaIcons.FaRegWindowClose color='white' size={30} onClick={ toggleShowSidebar } />
                            </div>              
                        :
                        <div className='barsIcon'>
                            <FaIcons.FaBars color='white' size={30} />
                        </div>      
                    }

                    <div className='header'>
                        <h1> Renaissance Social Golf</h1>
                    </div> 

                </div>

                <div>
                    { showSidebar && <Sidebar /> }
                </div>

            </div>

        </IconContext.Provider>

  )
}

export default Navbar