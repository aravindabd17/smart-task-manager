import React, { useState } from 'react'
import API from '../services/API';
import toast from 'react-hot-toast';

const TaskModal = ({fetchTasks,showTaskModal,setShowTaskModal}) => {
    const [task,setTask]=useState({title:"",description:"",file:null});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const Formdata=new FormData();
        Formdata.append("title",task.title);
        Formdata.append("description",task.description);
        if(task.file)
            Formdata.append("file",task.file);
        await API.post("/task/createtask",Formdata);
        fetchTasks();
        toast.success("Task Created Succesfully");
        setShowTaskModal(false);
    }
    return (
        showTaskModal && 
        <div 
            className='modal show d-block' 
            id='createTask' 
            style={{backgroundColor:'rgba(0,0,0,0.5)'}}
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header border-0 mb-3'>
                        <h3>Create Task</h3>
                        <button 
                        type='button' 
                        className='btn btn-primary' 
                        onClick={()=>setShowTaskModal(false)}>&times;</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mb-3'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' name='title' className='form-control' onChange={e=>setTask({...task,title:e.target.value})}/>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='title'>Description</label>
                            <textarea name="description" className='form-control' onChange={e=>setTask({...task,description:e.target.value})}/>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='file'>File</label>
                            <input type='file' name="file" className='form-control' onChange={e=>setTask({...task,file:e.target.files[0]})}/>
                        </div>
                        <button type='submit' className='btn btn-primary mt-2 w-100'>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskModal
