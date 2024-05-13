import React, {useContext} from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { AuthContext } from "../context/AuthContext"

//import Register from '../pages/Register'
//import Login from '../pages/Login'
import Home from '../pages/Home'
// import StatusCheck from '../pages/StatusCheck'
import GolferProfile from '../pages/GolferProfile'
import Calendar from '../pages/Calendar'
import Migs from '../pages/Migs'

import OrderOfMerit from '../pages/OrderOfMerit'
import Ips from '../pages/Ips'
import TubsMemorial from '../pages/TubsMemorial'
import ChampOfChamps from '../pages/ChampOfChamps'

import ContactUs from '../pages/ContactUs'
import About from '../pages/About'

const MainContainer = () => {
  const { currentUser } = useContext( AuthContext )
  
  console.log(currentUser)
  /* 
      <Route path='/' element={ currentUser ? <Home /> : <Login /> } />
  */
  return (
    <div className='mainContainer'>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Home /> } />

          <Route path='oom-medal' element={ <OrderOfMerit /> } />
          <Route path='ips' element={ <Ips /> } />
          <Route path='tubs-memorial' element={ <TubsMemorial /> } />
          <Route path='coc' element={ <ChampOfChamps /> } />

          <Route path='profile' element={ <GolferProfile /> } />
          <Route path='calendar' element={ <Calendar /> } />
          <Route path='migs' element={ <Migs /> } />

          <Route path='contact-us' element={ <ContactUs /> } />
          <Route path='about' element={ <About /> } /> 
      </Routes> 
      </BrowserRouter> 
    </div>
  )
}

export default MainContainer