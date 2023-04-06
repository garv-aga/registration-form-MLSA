import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from '../Hero/Hero'
import Navbar from '../Navbar/Navbar'

const HomePage = () => {
  return (
    <>
<Navbar/>
    <div className='registrationHomepage'>
    <Hero/>
      <Outlet/>
    </div>
    </>
  )
}

export default HomePage
