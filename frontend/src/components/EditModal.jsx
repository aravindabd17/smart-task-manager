import React, { useEffect, useState } from 'react'
import API from '../services/API';
import toast from 'react-hot-toast';

const EditModal = ({fetchTasks,selectedTask,showEditModal,setShowEditModal}) => {
    const [task,setTask]=useState({id:"",title:"",description:"",file:null,status:"",assignedTo:""});
    const [users,setUsers]=useState([]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const formData=new FormData();
            formData.append("title",task.title);
            formData.append("description",task.description);
            formData.append("assignedTo",task.assignedTo);
            formData.append("status",task.status);
            if(task.file)
                formData.append("file",task.file);
            const result=await API.put(`/task/updateTask/${task.id}`,formData);
            toast.success("Task update successfully!");
            fetchTasks();
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchUsers();
        if(selectedTask)
        {
            setTask({
                id:selectedTask._id,
                title:selectedTask.title,
                description:selectedTask.description,
                status:selectedTask.status,
                assignedTo:selectedTask.assignedTo._id ?? null
            });
        }
    },[selectedTask]);

    const fetchUsers=async()=>{
        const allusers=await API.get("/auth/users");
        setUsers(allusers.data);
    }

    return (
     showEditModal && <div className='modal show d-block' id='editTask' style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header border-0'>
                    <h3>Edit Task</h3>
                    <button 
                        type='button' 
                        className='btn btn-primary me-0'
                        onClick={()=>setShowEditModal(false)}
                    >&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group mb-3'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' className='form-control' value={task.title} onChange={e=>setTask({...task,title:e.target.value})}/>
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='title'>Description</label>
                        <textarea name="description" className='form-control' value={task.description} onChange={e=>setTask({...task,description:e.target.value})}/>
                    </div>
                    {
                        selectedTask.file && (
                            <img 
                                className='mb-3 w-50' 
                                src={`${import.meta.env.VITE_BACKEND_URL}${selectedTask.file}`}
                            />
                        )
                    }
                    <div className='form-group mb-3'>
                        <label htmlFor='file'>File</label>
                        <input 
                            type='file' 
                            name="file" 
                            className='form-control' 
                            onChange={e=>setTask({...task,file:e.target.files[0]})}
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='assignedTo'>Assigned To</label>
                        <select 
                            name="assignedTo"
                            className='form-control mt-2' 
                            value={task.assignedTo}
                            onChange={e=>setTask({...task,assignedTo:e.target.value})}
                        >
                            <option value="">-- Select User</option>
                            {
                                users.map(user=>(
                                    <option value={user._id}>{user.name} ({user.email})</option>
                                ))
                            }
                        </select>
                    </div>
                     <div className='form-group mb-3'>
                        <label htmlFor='status'>Status</label>
                        <select 
                            className='form-control mt-2' 
                            value={task.status}
                            onChange={e=>setTask({...task,status:e.target.value})}
                        >
                            <option value="">-- Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">completed</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Update Task</button>
                </form>
            </div>
        </div>
    </div>        
    )
}

export default EditModal
