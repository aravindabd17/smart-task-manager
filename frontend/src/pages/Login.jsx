import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/API";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [formData,setFormData]=useState({email:"",password:""});
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const result=await API.post(`/auth/login`,formData);
            login(result.data);
            navigate("/");
            toast.success("Login Successfully!");
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data?.error);
        }
    }
    return (
        <div className="container w-25 mt-5 pt-5">
            <h3 className="text-center text-primary pb-3">Login</h3>
            <form method="post" onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' onChange={handleChange} className='form-control'/>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={handleChange} className='form-control'/>
                </div>
                <button type='submit' className='btn btn-primary w-100'>Login</button>
                <Link className="mt-3 d-block text-center" to="/register">Don't have an account? Click here.</Link>
            </form>
        </div>
    )
}

export default Login;