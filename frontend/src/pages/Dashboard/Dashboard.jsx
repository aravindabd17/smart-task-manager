import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/API';

const Dashboard = () => {
  const [tasks,setTasks]=useState([]);

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks=async()=>{
    const taskresult=await API.get("/task/getTasks");
    console.log(taskresult);
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between p-5'>
        <h3>Dashboard</h3>
        <button type='button' className='btn btn-primary'>+ Add Task</button>
      </div>
      <div className='row mt-4'>

      </div>
    </div>
    
  )
}

export default Dashboard;