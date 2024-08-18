import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb';
import { baseUrl } from '../../utils/APIRoutes';
import axios from 'axios';

function  TodayAttendance() {
  const breadcrumbItems = [
    { text: 'Dashboard', href: '/' },
    { text: 'Today Attendance', href: '/' },
  ];

  const [isModel , setModel] = useState(false)
  const [employees, setEmployee] = useState([])

  useEffect(()=>{
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

    fetchDeparment();
  }, [])

  function calculateWorkingHours(checkIn, checkOut) {
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);
  
    const checkInDate = new Date();
    checkInDate.setHours(checkInHours, checkInMinutes);
  
    const checkOutDate = new Date();
    checkOutDate.setHours(checkOutHours, checkOutMinutes);
  
    const differenceInMilliseconds = checkOutDate - checkInDate;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
    
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  }

  function formatTimeToAmPm(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12 AM/PM
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  
  
  return (
    <>
    <div className="p-5">
      <Breadcrumb items={breadcrumbItems} />
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
      Add Department{" "}
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
              <tbody className="divide-y divide-gray-300">
                {employees.map((employee, index) => (
                  <tr
                    key={employee._id}
                    className="bg-white transition-all duration-500 hover:bg-gray-50"
                  >
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {index + 1}
                    </td>
                   
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {employee.employeeId}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      {employee.employee.name}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                    {formatTimeToAmPm(employee.check_in)}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                    {employee.check_out ? (<>
                      {formatTimeToAmPm(employee.check_out)}
                    </>) : "Still working"} 
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                    {employee.check_out ? (<>
                      {calculateWorkingHours(employee.check_in, employee.check_out)}
                    </>) : "Still working"} 
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                      <div className="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                        <svg
                          width={5}
                          height={6}
                          viewBox="0 0 5 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.5" cy={3} r="2.5" fill="#059669" />
                        </svg>
                        <span className="font-medium text-xs text-emerald-600">
                          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    
                  </tr>       
                  ))}        
              </tbody>
              
            </table>
          </div>
         
        </div>
      </div>
    </div>

    {isModel ? (
  <div className="w-full fixed top-0 left-0 z-[100] ">
    <div
      id="pd-slide-down-modal"
      className="pd-overlay w-full h-full fixed top-0 left-0 z-[60] bg-black bg-opacity-50 flex justify-center items-start overflow-x-hidden overflow-y-auto"
    >
      <div className="transform -translate-y-3 ease-out sm:max-w-lg sm:w-full m-5 sm:mx-auto transition-all modal-open:translate-y-0 modal-open:opacity-100 modal-open:duration-500">
        <div className="flex flex-col bg-white rounded-2xl py-4 px-5">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h4 className="text-sm text-gray-900 font-medium">Add Add Employee</h4>
            <button
              className="block cursor-pointer close-modal-button"
              data-pd-overlay="#pd-slide-down-modal"
              data-modal-target="pd-slide-down-modal"
              onClick={() => setModel(false)}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427"
                  stroke="black"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto py-4 min-h-[100px]">
          <form action="">
            <div className="relative mb-6">
              <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                Add Employee Name{" "}
                <svg
                  width={7}
                  height={7}
                  className="ml-1"
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                    fill="#EF4444"
                  />
                </svg>
              </label>
              <input
                type="text"
                id="default-search"
                className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
                placeholder=""
                required=""
              />
            </div>
          
            <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
              <button
                type="button"
                className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100 close-modal-button"
                onClick={() => setModel(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button"
                onClick={() => setModel(false)}
              >
                Add
              </button>
            </div>
            
          </form>
          </div>          
        </div>
      </div>
    </div>
  </div>
) : null}



    </>
  )
}

export default TodayAttendance