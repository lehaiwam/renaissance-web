import React, { createContext, useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
// import { AuthContextProvider } from './context/AuthContext'
// import { AuthContext } from './context/AuthContext'

/* new context changes */
import { auth, db } from './firebase'
import { query, collection, where, getDocs } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

/**/

import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

// import { auth } from './firebase'
// import { signOut } from "firebase/auth"

import Sidebar from './components/Sidebar'
import Register from './pages/Register'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import GolferProfile from './pages/GolferProfile'
import UpdateProfileImage from './pages/UpdateProfileImage'
import Migs from './pages/Migs'
import Calendar from './pages/Calendar'
import Confirmation from './pages/Confirmation'
import Stableford from './pages/competitions/Stableford'
import Medal from './pages/competitions/Medal'
import TubsMemorial from './pages/competitions/TubsMemorial'
import ChampOfChamps from './pages/competitions/ChampOfChamps'
import TheChampion from './pages/competitions/TheChampion'
import ConfirmationList from './pages/ConfirmationList'
import GameResults from './pages/GameResults'
import Albums from './pages/Albums'
import Gallery from './pages/Gallery'
import ImageModal from './components/ImageModal'

import AdminCalendar from './pages/admin/AdminCalendar'
import MaintainGameDetails from './pages/admin/MaintainGameDetails'
import UpdateGameScores from './pages/admin/UpdateGameScores'
import AdminAllMigs from './pages/admin/AdminAllMigs'
import AddNewMigs from './pages/admin/AddNewMigs'
import MaintainMigsDetails from './pages/admin/MaintainMigsDetails'
import InitializeDB from './pages/admin/InitializeDB'
import AdminAlbum from './pages/admin/AdminAlbum'
import AdminGallery from './pages/admin/AdminGallery'
import AdminImageModal from './components/admin/AdminImageModal'


import SignOut from './pages/SignOut'
import PageNotFound from './pages/PageNotFound'
import HomeBackgroundImage from './images/beautiful-golf-course-1.webp'
import './pages/pages_style.css'

/*
import NotAuthorized from './components/NotAuthorized'
import StatusCheck from './pages/StatusCheck'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Navbar from './components/Navbar'
*/

/*
const USER_TYPES = {
    MEMBER: 'MEMBER',
    EXCO_MEMBER: 'OFFICIAL',
    ADMIN_MEMBER: 'ADMINISTRATOR',
    TECHNICAL_SUPPORT: "TECHNICAL SUPPORT"
}
*/


export const AuthContext = createContext(null)

function App() {
    const [ ctxId, setCtxId ] = useState('')
    const [ ctxFirstName, setCtxFirstName ] = useState('')
    const [ ctxLastName, setCtxLastName ] = useState('')
    const [ ctxAuthLevel, setCtxAuthLevel ] = useState('')
    const [ ctxCurrentUser, setCtxCurrentUser ] = useState(null)
    const [ ctxDisplayName, setCtxDisplayName ] = useState('')
    const [ ctxEmail, setCtxEmail ] = useState('')
    

    useEffect(() => {
       
        const unSub = onAuthStateChanged( auth, async (user) => {
            setCtxCurrentUser( user )
            if (user) {             
                try {
                    const q = query(collection(db, "migs"), where("email", "==", user.email))
                    const querySnapshot = await getDocs(q)         
                    if (querySnapshot.empty) {
                        console.log('MIGS record not found? Impossible!!!', user.email)
                        // setErrorMessage('Registered user with no MIGS record?Impossible!!!')
                    } else {
                        querySnapshot.forEach((doc) => {
                            // console.log(doc.id, " => ", doc.data())
                            setCtxId( doc.id )
                            setCtxFirstName(doc.data().firstName ) 
                            setCtxLastName( doc.data().lastName )
                            setCtxAuthLevel( doc.data().authLevel )
                            
                            setCtxDisplayName( user.displayName ) 
                            setCtxEmail( user.email )   
                        })
                    }    
                } catch(error) {
                    console.log('AuthContextProvider, useEffect, getDocs() error : ', error)
                }
                
                // console.log('AuthContext useEffect(), User currently logged in: ', user);

                // if listening to real-time event, we should use a clean-up function to avoid memory leakage...
                return () => {
                    unSub();    
                }

            } else {
                console.log('AuthContext useEffect(), No user not logged in...');
            }
        })
    })
  

    const Content = () => {
      return (

        <AuthContext.Provider value={
          { ctxId, ctxFirstName, ctxLastName, ctxAuthLevel, ctxCurrentUser, ctxDisplayName, ctxEmail }
        }>

        <div className='contentContainer'>    
          <Routes>

            {/* Routes accessable to the public */}
            <Route
                path='/' element={
                  <PublicElement>
                    <Login />
                  </PublicElement>
                }>
            </Route>
            <Route
                path='/login' element={
                  <PublicElement>
                    <Login />
                  </PublicElement>
                }>
            </Route>
            <Route
                path='/register' element={
                  <PublicElement>
                    <Register />
                  </PublicElement>
                }>
            </Route>
            <Route
                path='/reset-password' element={
                  <PublicElement>
                    <ResetPassword />
                  </PublicElement>
                }>
            </Route>


            {/* Routes accessable to authenticated members only */} 
            <Route
                path='/home' element={
                  <MemberElement>
                    <Home />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/profile' element={
                  <MemberElement>
                    <GolferProfile />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/update-profile-image' element={
                  <MemberElement>
                    <UpdateProfileImage />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/migs' element={
                  <MemberElement>
                    <Migs />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/calendar' element={
                  <MemberElement>
                    <Calendar />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/joiningus' element={
                  <MemberElement>
                    <Confirmation />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/confirmations' element={
                  <MemberElement>
                    <ConfirmationList />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/results' element={
                  <MemberElement>
                    <GameResults />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/albums' element={
                  <MemberElement>
                    <Albums />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/gallery' element={
                  <MemberElement>
                    <Gallery />
                  </MemberElement>
                }>
            </Route>
            <Route
                path='/image-modal' element={
                  <MemberElement>
                    <ImageModal />
                  </MemberElement>
                }>
            </Route>






            {/* Routes accessable only to Administrators, i.e. ADMIN or TECH SUPPORT */} 
            <Route
                path='/admin/calendar' element={
                  <AdminElement>
                    <AdminCalendar />
                  </AdminElement>
                }>
            </Route>
            <Route 
                path='admin/game-details' element={
                  <AdminElement>
                    <MaintainGameDetails />
                  </AdminElement>
                }>
            </Route>
            <Route
                path='/admin/update-scores' element={
                  <AdminElement>
                    <UpdateGameScores />
                  </AdminElement>
                }>
            </Route>
            <Route
                path='/admin/migs' element={
                  <AdminElement>
                    <AdminAllMigs />
                  </AdminElement>
                }>
            </Route>
            <Route
                path='/admin/add-new' element={
                  <AdminElement>
                    <AddNewMigs />
                  </AdminElement>
                }>
            </Route>
            
            <Route 
                path='admin/edit-migs' element={
                  <AdminElement>
                    <MaintainMigsDetails />
                  </AdminElement>
                }>
            </Route>
            <Route 
                path='admin/initialize' element={
                  <AdminElement>
                    <InitializeDB />
                  </AdminElement>
                }>
            </Route>
            <Route
                path='/admin/album' element={
                  <AdminElement>
                    <AdminAlbum />
                  </AdminElement>
                }>
            </Route>
            <Route
                path='/admin/gallery' element={
                  <AdminElement>
                    <AdminGallery />
                  </AdminElement>
                }>
            </Route>

            <Route
                path='/admin/image-modal' element={
                  <AdminElement>
                    <AdminImageModal />
                  </AdminElement>
                }>
            </Route>       


            {/*
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/register' element={ <Register /> }> </Route>
            <Route path='/reset-password' element={ <ResetPassword /> }> </Route>
            <Route path='/home' element={<Home />}> </Route>
            
            <Route path='/profile' element={<GolferProfile />} ></Route>
            <Route path='/update-profile-image' element={<UpdateProfileImage />} ></Route>
            <Route path='/migs' element={<Migs />} ></Route>
            <Route path='/calendar' element={<Calendar />} ></Route>
            <Route path='/joiningus' element={<Confirmation />} ></Route>
            <Route path='/confirmations' element={<ConfirmationList />} ></Route>
            <Route path='/results' element={<GameResults />} ></Route>
            */}

            <Route path='/signout' element={ <SignOut /> }> </Route>

            <Route path='/competition/ips' element={<Stableford />} ></Route>
            <Route path='/competition/medal' element={<Medal />} ></Route>
            <Route path='/competition/tubs-memorial' element={<TubsMemorial />} ></Route>
            <Route path='/competition/coc' element={<ChampOfChamps />} ></Route>
            <Route path='/competition/champion' element={<TheChampion />} ></Route>
            <Route path='*' element={ <PageNotFound /> }> </Route>
          </Routes> 
        </div>

        </AuthContext.Provider>

      )
    }

    return (  
      <IconContext.Provider value={{color: 'undefined'}} >
        <div className='appContainer' style={{ backgroundImage:`url( ${HomeBackgroundImage})` }}>
          <Sidebar />
          <Content />
        </div>
      </IconContext.Provider>
    )
}
 

function PublicElement({ children }) {
    //const ctxAuth = useContext( AuthContext ) 
    //console.log('In PublicElement.jsx, userType: ', ctxAuth.userType)
    return (
      <>{children}</>
    )
}


function MemberElement({ children }) {
    //const ctxAuth = useContext( AuthContext ) 
    // console.log('In MemberElement.jsx, userType: ', ctxAuth.userType)

    return (
      <>{children}</>
    )

    /**
    if (  !ctxAuth.currentUser ) {
        return (
          <NotAuthorized title={'Calendar Administration'}/>
        ) 
    } else {
        
    }
    **/

}


function AdminElement({ children }) {
  
    //const ctxAuth = useContext( AuthContext ) 
    // console.log('In AdminElement.jsx : ', ctxAuth.authLevel, ctxAuth.userType)
    // console.log('In AdminElement.jsx : ')

    return (
      <>{children}</>
    )

    /** 
    if (  ctxAuth.authLevel === 3 || 
          ctxAuth.authLevel === 4 ) {
        return (
          <>{children}</>
        )
    } else {
      return (
        <NotAuthorized title={'Calendar Administration'}/>
      ) 
    }
    */

}

export default App;
