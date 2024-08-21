import React from 'react'

function Attendance(data) {
   let employee = data?.employee
    
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
   
    <tbody className="divide-y divide-gray-300">
    
        <tr
        key={employee._id}
        className="bg-white transition-all duration-500 hover:bg-gray-50"
        >
        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
            { 1}
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
            
    </tbody>
              
           
    </>
  )
}

export default Attendance