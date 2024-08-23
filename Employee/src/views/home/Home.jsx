import React, { useState, useEffect } from 'react';
import { baseUrl, openGameRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';

import 'animate.css';
import ReactApexChart from 'react-apexcharts';
import Breadcrumb from '../../components/Breadcrumb';
import DashboardCard from '../../components/DashboardCard';
import { BookOpenCheck, Contact, LayoutDashboard, ListCheck, ListTodo, MonitorCheckIcon, MonitorCog, NotebookTabs, Presentation, UserCheck2Icon, UserCircle2, UserMinus2Icon, UserPlus } from 'lucide-react';
import Clock from '../../components/Clock';
import Attendance from '../../components/Attendance';
import ClockGraph from '../../components/ClockGraph';




const validate = values => {
  const errors = {};

  if (!values.amount) {
    errors.amount = 'Required';
  } 

  return errors;
};


function Home() {

  let userId = JSON.parse(localStorage.getItem("user"))

  const [showModal, setShowModal] = useState(false);
  const [data,setData] = useState([])

async function fetchOpenGame(){
  try{
    let response = await axios.get(openGameRoute)
    if(response.data.status){
      setData(response.data.data) 
    }
  }catch(e){
    console.log(e)
  }
}




    // Define your chart options and series data
    const [options, setOptions] = useState({
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          borderRadius: 3,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      // yaxis: {
      //   title: {
      //     text: '$ (thousands)'
      //   }
      // },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    });
  
    const [series, setSeries] = useState([{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }]);


    const [options2, setOptions2] = useState({
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    })

    const [series2, setSeries2] = useState([{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],);

    const breadcrumbItems = [
      { text: 'Dashboard', href: 'javascript:;' },
      // { text: 'Settings', href: 'javascript:;' },
      // { text: 'Profile', href: 'javascript:;' },
    ];


    const [dashboard, setDashboard] = useState([])


   let dashboardData = [
    {
      title: "Total Persent",
      total_no: 21,
      icon: <UserPlus/>,
      background:"blue"
    },
    {
      title: "Month Persent",
      total_no: 11,
      icon: <UserCheck2Icon/>,
      background:"blue"
    },
    {
      title: "Total Leave",
      total_no: 6,
      icon: <UserMinus2Icon/>,
      background:"blue"
    },
    {
      title: "Month Leave",
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
      setSubmitting(false);
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
           <DashboardCard data={item}/>
           {/* <div className='bg-gray-800 w-20 h-20'></div> */}
              </>
            
               
               
             
           
          ))
        }
     
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

          <div className='flex justify-center items-center'>
          <ClockGraph/>
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