import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-dark text-white vh-100 p-3' style={{width:"250px"}}>
        <h4 className='mt-2'>Task Manager</h4>
        <div className='nav flex-column mt-4'>
            <li className='nav-item mb-2'>
                <NavLink 
                    to="/" 
                    className={({isActive})=>`nav-link text-white rounded hover:bg-secondary ${isActive?'bg-primary':''}`}
                >Dashboard</NavLink>
            </li>
            <li className='nav-item mb-2'>
                <NavLink 
                    to="/profile" 
                    className={({isActive})=>`nav-link text-white rounded ${isActive?'bg-primary':''}`}
                > Profile
                </NavLink>
            </li>
            <li className='nav-item mb-2'>
                <NavLink 
                    to="/tasks" 
                    className={({isActive})=>`nav-link text-white rounded ${isActive?'bg-primary':''}`}
                >Tasks
                </NavLink>
            </li>
        </div>
    </div>
  )
}

export default Sidebar;