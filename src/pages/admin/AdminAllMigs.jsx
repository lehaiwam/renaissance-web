import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import { db } from '../../firebase'
import { collection, query, orderBy, getDocs } from "firebase/firestore"

import { FaUserPlus } from "react-icons/fa"
import AdminMigsItem from '../../components/admin/AdminMigsItem'
import NotAuthorized from '../../components/NotAuthorized'
import PageHeader from '../../components/PageHeader'


const MEMBER = 1
const OFFICIAL = 2
const ADMINISTRATOR = 3
const TECHNICAL_SUPPORT = 4


const AdminAllMigs = () => {
    const navigate = useNavigate()
    const {ctxAuthLevel} = useContext( AuthContext )
    const [migs, setMigs] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

  
    useEffect(() => {  

        const getAllMigs = async() => {
            const arrayMigs = []
            const q = query(collection(db, "migs"), orderBy("firstName"),)

            try {
                const querySnapshot = await getDocs(q)
                if (querySnapshot.empty) {
                    console.log('Empty MIGS table? Impossible!!!')
                    setErrorMessage('Empty MIGS table? Impossible!!!')
                } else {
                    querySnapshot.forEach(async (doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data())
                        if (doc.data().memberStatus !== '9') {
                            arrayMigs.push({
                                id: doc.id, 
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                email: doc.data().email,
                                cell: doc.data().cell,
                                imageUrl: doc.data().imageUrl,
                                authLevel: doc.data().authLevel,
                                registered: doc.data().registered
                            })
                        }
                    })
                    setMigs(arrayMigs)
                }
            } catch (error) {
                console.log('Error in useEffect: getAllMigs()', error.message)
            }

            
        }

        getAllMigs()

    })
    

    if (ctxAuthLevel < ADMINISTRATOR ) {
        if ( ctxAuthLevel < MEMBER ) {
            return (
                <NotAuthorized title={ 'You are not authenticated! Login?'} authenticate={false} />
            )
        } else {
            return (
                <NotAuthorized title={ 'MIGS Data Information Maintenance?'} authenticate={true} />
            )
        }
    }

    return (

        <div className='formContainer'>      
            <PageHeader page='adminAllMigs'/>
            <span className='title'>Members in good standing</span>

            { errorMessage && <span className='errorMessage'>{ errorMessage }</span> }

            <div className='linkToAddNew'>
                <span>Add New Member?</span>
                <Link to='/admin/add-new'>          
                    <i className='faUserPlus'> <FaUserPlus /> </i>
                </Link>
            </div>

            { migs?.length > 0 ?
            (
                <div className='adminAllMigs'>
                { migs.map( (item) => 
                    <AdminMigsItem key={item.id} member={ item }/>
                )}          
                </div>
            ) :
            (
                <div className='migsEmpty'>
                <p className='emptyText'> 
                    Please be patient! Fetching data ....
                </p>        
                </div>
            )
            }
        </div>
    )
}
  
export default AdminAllMigs