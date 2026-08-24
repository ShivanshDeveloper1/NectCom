import React from 'react'
import Navbar from '../components/layout/Navbar'
import { useLocation } from 'react-router-dom'

const NavbarProvider = () => {
  const location = useLocation()

  if (location.pathname === '/admin') {
    return null
  }

  return <Navbar />
}

export default NavbarProvider