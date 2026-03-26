import { useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import Tasks from './pages/Dashboard/Tasks';
import Layout from './components/Layout';

function App() {
  const [count, setCount] = useState(0);
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Layout/>}>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/tasks' element={<Tasks/>}/>
          </Route>
        </Route>
      </Routes>      
   </BrowserRouter>
  )
}

export default App
