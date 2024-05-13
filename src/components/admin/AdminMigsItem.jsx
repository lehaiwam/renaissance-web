import React from 'react'
import {Link} from 'react-router-dom'
import { FaUserEdit } from "react-icons/fa"

const AdminMigsItem = ({member}) => {
    // console.log("AdminMigsItem : ", member)
    const { email, cell, firstName, lastName } = member

    return (
        <div className='adminMigsItem'>       
            <div className='migsInfo'>
                <span>{firstName}</span>
                <span>{lastName}</span>
                <span>{ email ? email : 'no email address'}</span>
                <span>+27 {cell}</span>
            </div>

            <div className='linkToEditMigs'>
                <Link to='/admin/edit-migs' state={ {member: member}} >                 
                    <i className='faEditUser'> <FaUserEdit /> </i>
                </Link>
            </div>
        </div>
    )

}

export default AdminMigsItem