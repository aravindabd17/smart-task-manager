import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Tooltip,
  LinearScale,
  Legend,
  plugins
} from 'chart.js';
import API from '../../services/API';

import { Bar } from 'react-chartjs-2';


ChartJS.register(
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale
);

const Dashboard = () => {
  const [tasks,setTasks]=useState([]);

  const pendingTasks=tasks.filter(task=>task.status==="pending").length;
  const completedTasks=tasks.filter(task=>task.status==="completed").length;
  const otherTasks=tasks.filter(task=>task.status!=="pending" && task.status!=="completed").length;


  useEffect(()=>{
    fetchTasks();
  },[]);
  const fetchTasks=async()=>{
    const taskresult=await API.get(`/task/allTasks/`);
    setTasks(taskresult.data.tasks);
  }

  const data={
    labels:['Pending','Completed','Other'],
    datasets:{
      label:"Tasks",
      data:[pendingTasks,completedTasks,otherTasks],
      backgroundColor: ['#ffc107', '#198754', '#6c757d']
    }
  }

  const options={
    responsive:true,
    plugins:{
      legend:{
        display:true
      }
    }
  }

  return (
    <div>
      <Bar data={data} options={options}/>
    </div>
  )
}

export default Dashboard
