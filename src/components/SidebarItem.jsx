import React, { useState} from 'react'
// import { FaPeopleGroup } from "react-icons/fa6";

const SidebarItem = ({ item }) => {
    const [ open, setOpen ] = useState(false)
    const { title, icon, path, childrens } = item;

    const handleToggleOpenFlag = () => {
        setOpen ( (currStatus) => {
            return !currStatus
        })
    }

    if (childrens) {

        return (
            <div className={ open ? 'sidebarItem open' : 'sidebarItem' }>
                <div className='sidebarTitle'>
                    <span>
                        { icon && <i className={icon}></i> }
                        { title }
                    </span>
    
                    <i className='bi-chevron-down toggle-btn' onClick={ handleToggleOpenFlag }></i> 
                </div>
                <div className='sidebarSubMenu'>
                    {
                       childrens.map((item, index) => (  
                            <SidebarItem key={index} item={item} />                           
                        ))
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <a href={ path || "#" } className={'sidebarItem no-sub-menu' }>
                
                    <span>
                        { icon && <i className={icon}></i> }
                        { title }
                    </span> 
                
            </a>
        )

    }
}

export default SidebarItem