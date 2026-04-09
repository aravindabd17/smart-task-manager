import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/API';
import TaskModal from '../../components/TaskModal';
import EditModal from '../../components/EditModal';

const Dashboard = () => {
  const [tasks,setTasks]=useState([]);
  const [selectedTask,setSelectedTask]=useState(null);
  const [showTaskModal,setShowTaskModal]=useState(false);

  const [currentPage,setCurrentPage]=useState(1);
  const [totalPages,setTotalPages]=useState(0);

  useEffect(()=>{
    fetchTasks();
  },[currentPage]);

  const fetchTasks=async()=>{
    const taskresult=await API.get(`/task/getTasks/?page=${currentPage}`);
    setTasks(taskresult.data.tasks);
    setTotalPages(taskresult.data.totalPages);
  }

  const nextHandler=()=>{
    console.log('next handler');
    if(currentPage!==totalPages)
    {
      setCurrentPage(currentPage=>currentPage+1);
    }
  }
   const prevHandler=()=>{
    console.log('prev handler');
    if(currentPage!==1)
    {
      setCurrentPage(currentPage=>currentPage-1);
    }
  }

  return (
    <div className='container'>
      {/* <TaskModal/> */}
      <div className='d-flex justify-content-between p-5'>
        <h3>Tasks</h3>
        <button 
          type='button' 
          className='btn btn-primary'
          onClick={()=>setShowTaskModal(true)}
        >+ Add Task</button>
      </div>
      <div className='row mt-4 mr-2'>
        {
          tasks.map(task=>(
            <div key={task._id} className='card col-md-4 mb-3 p-3'>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`badge ${task.status==="pending"?"bg-warning":task.status==="completed"?"bg-success":"bg-danger"}`}>
                {task.status}
              </span>
              {
                task.file && (
                <div>
                  <a 
                  href={`${import.meta.env.VITE_BACKEND_URL}${task.file}`} 
                  target='_blank' rel='noreferrer'>
                    View File
                  </a>
                </div>
                )
              }
              <div className='mt-2'>
                <button 
                  type='button' 
                  data-bs-toggle="modal"
                  data-bs-target="#editTask"
                  className='btn btn-warning btn-sm me-2'
                  onClick={()=>setSelectedTask(task)}
                >Edit</button>
                <button type='button' className='btn btn-danger btn-sm'>Delete</button>
              </div>
            </div>
              
          ))
        }
        
      </div>
      <div className='pagination'>
        <button type='button' className='btn btn-primary me-2' onClick={prevHandler}>Prev</button>
        <button type='button' className='btn btn-primary' onClick={nextHandler}>Next</button>
      </div>
      <TaskModal fetchTasks={fetchTasks} showTaskModal={showTaskModal} setShowTaskModal={setShowTaskModal}/>
      <EditModal fetchTasks={fetchTasks} setSelectedTask={setSelectedTask}/>
    </div>
    
  )
}

export default Dashboard;