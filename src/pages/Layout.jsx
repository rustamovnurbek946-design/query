import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Navbar'

const Layout = () => {
  return (
    <div>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default Layout