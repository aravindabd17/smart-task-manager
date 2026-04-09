import React, { useContext } from 'react'
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Layout = () => {

  const {logout}=useContext(AuthContext);
  const navigate=useNavigate();

  const handleLogout=()=>{
    logout();
    navigate("/login");
    toast.success("Logout Successfully!");
  }

  return (
    <div className='d-flex'>
        <Sidebar/>
        <div className='flex-grow-1'>
            <div className='navbar navbar-light bg-light p-3'>
                <h3>Dashboard</h3>
                <button type='button' className='btn btn-info' onClick={handleLogout}>Logout</button>
            </div>
            <div className='p-3'>
                <Outlet/>
            </div>
        </div>
        
    </div>
  )
}

export default Layout;