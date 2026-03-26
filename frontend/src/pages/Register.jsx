import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../services/API';
import toast from 'react-hot-toast';

function Register() {
  const [formData,setFormData]=useState({name:"",email:"",password:"",confirmpassword:""});

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(formData.password !== formData.confirmpassword)
    {
      toast.error('Password mismatch');
      return false;
    }

    try {
      const result=await API.post(`/auth/register`,formData);
      console.log(result);
      localStorage.setItem("user",JSON.stringify(result.data));
      toast.success("Registered Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
    
  }

  return (
      <div className="container w-25 mt-5 pt-5">
          <h3 className="text-center text-primary pb-3">Register</h3>
          <form method='post' onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                  <label htmlFor='name'>Name *</label>
                  <input type='text' name='name' className='form-control' onChange={handleChange} required/>
              </div>
              <div className='form-group mb-3'>
                  <label htmlFor='email'>Email *</label>
                  <input type='email' name='email' className='form-control' onChange={handleChange} required/>
              </div>
              <div className='form-group mb-3'>
                  <label htmlFor='password'>Password *</label>
                  <input type='password' name='password' className='form-control' onChange={handleChange} required/>
              </div>
              <div className='form-group mb-3'>
                  <label htmlFor='password'>Confirm Password *</label>
                  <input type='password' name='confirmpassword' className='form-control' onChange={handleChange} required/>
              </div>
              <button type='submit' className='btn btn-primary w-100'>Register</button>
              <Link className="mt-3 d-block text-center" to="/login">Already Registered? Click here.</Link>
          </form>
      </div>
  )
}

export default Register;