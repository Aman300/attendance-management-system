
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Login from "./views/auth/Login";
import Home from "./views/home/Home";
import Sidebar from "./components/Sidebar";
import ReferEarn from './views/home/AddEmployee';
import Profile from './views/home/Profile';
import Support from './views/home/Support';
import TermLegal from './views/home/TermLegal';
import Games from './views/home/Department';
import PrivateRoutes from './utils/PrivateRoutes';
import EmployeeList from './views/home/EmployeeList';
import TodayAttendance from './views/home/TodayAttendance';
import AttendanceList from './views/home/AttendanceList';

export default function App() {
  return (
    <>
    
    <BrowserRouter>
        <Routes>
          
          <Route path='/login' element={<Login />} />
          {/* <Route path='/signup' element={<Signup />} /> */}

          <Route element={<PrivateRoutes/>}>
          <Route
            path="/"
            element={
              <div>
                <Sidebar />
                <div className='xl:ml-[260px]'>
                  <Outlet /> 
                </div>
                {/* <Footer/> */}
              </div>
            }
          >
            <Route path="/" element={<Home />} />            
            <Route path="/add/department" element={<Games />} />
            <Route path="/add/attendance" element={<Games />} />
            <Route path="/attendance/list" element={<AttendanceList />} />
            <Route path="/add/employee" element={<ReferEarn />} />
            <Route path="/employee/list" element={<EmployeeList />} />
            <Route path="/today/attendance" element={<TodayAttendance />} />
            <Route path="/notice" element={<Support />} />
            <Route path="/settings" element={<TermLegal />} />
            
          </Route>
        </Route>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}