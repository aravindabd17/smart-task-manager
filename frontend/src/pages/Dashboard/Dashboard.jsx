import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../services/API';
import TaskModal from '../../components/TaskModal';
import EditModal from '../../components/EditModal';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks,setTasks]=useState([]);
  const [selectedTask,setSelectedTask]=useState(null);
  const [showTaskModal,setShowTaskModal]=useState(false);
  const [showEditModal,setShowEditModal]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [totalPages,setTotalPages]=useState(0);
  const [search,setSearch]=useState("");

  useEffect(()=>{
    fetchTasks();
  },[currentPage,search]);

  const fetchTasks=async()=>{
    const taskresult=await API.get(`/task/getTasks/?page=${currentPage}&&search=${search}`);
    setTasks(taskresult.data.tasks);
    console.log("latest:"+JSON.stringify(taskresult.data.tasks));
    setTotalPages(taskresult.data.pageCount);
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

  const handleDelete=async(id)=>{
    if(!window.confirm("Are you sure want to delete task?")) return;
    await API.delete(`/task/deleteTask/${id}`);
    toast.success("Task deleted successfully");
    fetchTasks();
  }

  return (
    <div className='container'>
      {/* <TaskModal/> */}
      <div className='d-flex justify-content-between p-5'>
        
        <input 
          type="text" 
          className='form-control w-50' 
          name='searchtext' 
          placeholder='Search' 
          value={search} 
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button 
          type='button' 
          className='btn btn-primary'
          onClick={()=>setShowTaskModal(true)}
        >+ Add Task</button>
      </div>
      <div className='row mt-4 mr-2 d-flex gap-3'>
        {
          tasks.map(task=>(
            <div key={task._id} className='card mb-3 p-3'>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className={`badge ${task.status==="pending"?"bg-warning":task.status==="completed"?"bg-success":"bg-danger"}`}>
                {task.status}
              </span>
              {
                task.file!=="/uploads/undefined" && (
                  <div>
                    <a 
                      href={`${import.meta.env.VITE_BACKEND_URL}${task.file}`} 
                      target='_blank' 
                      rel='noreferrer'
                    >
                      View File
                    </a>
                  </div>
                )
              }
              <div className='mt-2'>
                <button 
                  type='button' 
                  className='btn btn-warning btn-sm me-2'
                  onClick={()=>{setSelectedTask(task),setShowEditModal(true)}}
                >Edit</button>
                <button 
                  type='button' 
                  className='btn btn-danger btn-sm'
                  onClick={()=>handleDelete(task._id)}
                >
                    Delete
                </button>
              </div>
            </div>
              
          ))
        }
        
      </div>
      <div className='pagination'>
        <button 
          type='button' 
          className='btn btn-primary me-2' 
          onClick={prevHandler}
          disabled={currentPage===1}
        >Prev</button>
        <button 
          type='button' 
          className='btn btn-primary' 
          onClick={nextHandler} 
          disabled={currentPage===totalPages}
        >Next</button>
      </div>
      <TaskModal 
        fetchTasks={fetchTasks} 
        showTaskModal={showTaskModal} 
        setShowTaskModal={setShowTaskModal}
      />
      <EditModal 
        fetchTasks={fetchTasks} 
        selectedTask={selectedTask} 
        showEditModal={showEditModal} 
        setShowEditModal={setShowEditModal}
      />
    </div>
  )
}

export default Dashboard;