import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='d-flex'>
        <Sidebar/>
        <div className='flex-grow-1'>
            <div className='navbar navbar-light bg-light p-3'>
                <h3>Dashboard</h3>
            </div>
            <div className='p-3'>
                <Outlet/>
            </div>
        </div>
        
    </div>
  )
}

export default Layout;