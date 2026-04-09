import React, { useState } from 'react'
import API from '../services/API';

const EditModal = ({selectedTask,fetchTask}) => {
    const [task,setTask]=useState({title:"",description:"",file:null});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const FormData=new FormData();
        FormData.append("title",task.title);
        FormData.append("description",task.description);
        if(task.file)
            FormData.append("file",task.file);
        await API.put("/tasks/update",FormData);
        fetchTask();
    }
    return (
     <div className='modal fade' id='editTask'>
        <div className='modal-dialog'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h3>Edit Task</h3>
                    <button type='button' className='btn'>&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' className='form-control' onChange={e=>setTask({...task,title:e.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='title'>Description</label>
                        <textarea name="description" className='form-control' onChange={e=>setTask({...task,description:e.target.value})}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='file'>File</label>
                        <input type='file' name="file" className='form-control' onChange={e=>setTask({...task,file:e.target.files[0]})}/>
                    </div>
                    <button>Add Task</button>
                </form>
            </div>
        </div>
    </div>        
    )
}

export default EditModal
