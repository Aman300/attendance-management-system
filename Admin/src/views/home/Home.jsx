import React, { useState, useEffect } from 'react';
import { baseUrl, openGameRoute } from '../../utils/APIRoutes';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'animate.css';
import ReactApexChart from 'react-apexcharts';
import Breadcrumb from '../../components/Breadcrumb';
import DashboardCard from '../../components/DashboardCard';
import { BookOpenCheck, Contact, LayoutDashboard, ListCheck, ListTodo, MonitorCheckIcon, MonitorCog, NotebookTabs, Presentation, UserCheck2Icon, UserCircle2, UserMinus2Icon, UserPlus } from 'lucide-react';
import Clock from '../../components/Clock';
import Attendance from '../../components/Attendance';



function Home() {


  

    const breadcrumbItems = [
      { text: 'Dashboard', href: 'javascript:;' },
      // { text: 'Settings', href: 'javascript:;' },
      // { text: 'Profile', href: 'javascript:;' },
    ];


    const [dashboard, setDashboard] = useState([])


   let dashboardData = [
    {
      title: "Total Employee",
      total_no: 21,
      icon: <UserPlus/>,
      background:"blue"
    },
    {
      title: "Present Employee",
      total_no: 11,
      icon: <UserCheck2Icon/>,
      background:"blue"
    },
    {
      title: "Employee On Leave",
      total_no: 6,
      icon: <UserMinus2Icon/>,
      background:"blue"
    },
    {
      title: "Active Employee",
      total_no: 6,
      icon: <UserCircle2/>,
      background:"blue"
    },
    
   ]

  


   const [employees, setEmployee] = useState([])

   async function fetchDeparment() {
    try {
      // Send a request to the server to authenticate the user
      const response = await axios.get(baseUrl + "/admin/get-today-employee-attendance");
     
      console.log(response.data)
      setEmployee(response.data.data)
    

    } catch (error) {
      // Handle any errors
      console.error('Login failed:', error);
      toast.error(error.response.data.message);
    } finally {
      // Reset the form's submitting state
    }

  }



   useEffect(()=>{
    fetchDeparment();
    setDashboard(dashboardData)
   },[])
  

  return (
    <>
    <div className="p-5">
      <Breadcrumb items={breadcrumbItems} />
    </div>


    <div className='grid xl:grid-cols-4 grid-cols-1 gap-3 px-5 mb-4'>
        {
          dashboard.map((item, index)=>(
            <>
           <DashboardCard key={index} data={item}/>
           {/* <div className='bg-gray-800 w-20 h-20'></div> */}
              </>
            
               
               
             
           
          ))
        }
     
        </div>

        <div className='flex justify-end items-center px-5'>
          <Clock/>
        </div>

        
        <div
      className="hidden w-full lg:flex mt-8 lg:mt-0 item-center justify-between px-5 mb-4 "
      id="navbar-with-form"
    >
      <form className="flex items-center max-lg:justify-center gap-0">
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full max-w-xs px-4 py-2 text-sm font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none leading-relaxed"
            placeholder="Search... "
            required=""
          />
        </div>
        <button className="p-1 px-2" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L18.5 18.5M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2006 19 15.1937 18.1115 16.6401 16.6736C18.0976 15.2246 19 13.2177 19 11Z"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>
      <button
      onClick={(e) => setModel(true)}
      type="button"
      className="py-2.5 pl-3.5 pr-6 text-sm bg-indigo-500 text-white rounded-xl cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 flex items-center hover:bg-indigo-700"
    >
      <svg
       className="mr-1"
       width={20}
       height={10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.22229 5.00019H8.77785M5.00007 8.77797V1.22241"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      </svg>{" "}
      Filter{" "}
    </button>
    </div> 
        <div className="flex flex-col px-5">
          <div className=" overflow-x-auto pb-4">
              <div className="block">
                <div className="overflow-x-auto w-full  border rounded-xl border-gray-300">
                    <table className="w-full rounded-xl">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          SNo.
                        </th>
                      
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Employee ID
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Employee Name
                        </th>
                      
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                        >
                          Check In
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                        >
                          Check out
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
                        >
                        Work hour
                        </th>
                        <th
                          scope="col"
                          className="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          Status
                        </th>
                        
                      </tr>
                    </thead>
                    {
          employees.map((item)=>(
            <>
             <Attendance employee={item}/>
            </>
          ))
        }
                
                  </table>
                </div>
              </div>
            </div> 
          </div>

        
      

      {/* <div className='xl:mb-0 mb-5'>
        <div className='bg-white hover:shadow-2xl rounded-xl cursor-pointer p-2'>
          <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
      </div> */}


  

    </>
  )
}

export default Home