import React from 'react'
import SidebarItem from './SidebarItem'
import SidebarMenuItems from '../data/Sidebar.json'

const Sidebar = () => {
    
    return (
        <div className='sidebar'>
            {
                SidebarMenuItems.map((item, index) => (
                    <SidebarItem 
                        key={index} 
                        item={item} 
                    />
                ))
            }
        </div>
    )
}

export default Sidebar