
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Login from "./views/auth/Login";
import Home from "./views/home/Home";
import Sidebar from "./components/Sidebar";
import PrivateRoutes from './utils/PrivateRoutes';
import AttendanceList from './views/home/AttendanceList';
import Notice from './views/home/Notice';
import Setting from './views/home/Setting';

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
            <Route path="/attendance/list" element={<AttendanceList />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/settings" element={<Setting />} />
            
          </Route>
        </Route>

        </Routes>
        
      </BrowserRouter>
    </>
  )
}