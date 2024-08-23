// Sidebar.js
import { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenCheck, Contact, LayoutDashboard, ListCheck, ListTodo, MonitorCheckIcon, MonitorCog, NotebookTabs, Presentation, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { baseUrl } from '../utils/APIRoutes';
import axios from 'axios';


const validate = values => {
  const errors = {};

 
  if (!values.employeeId) {
    errors.employeeId = 'Required';
  } 
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};


const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location.href = '/'
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let userId = JSON.parse(localStorage.getItem("user"))
  const [isModel , setModel] = useState(false)

  let path = [
        {
          name: "Dashboard",
          path: "/",
          svgLogo: <LayoutDashboard/>
        },
           

        {
          name: "Work Time Tracker",
          path: "/Work/Time/Tracker",
          svgLogo: <ListCheck/>
        },
        {
          name: "My Attendance List",
          path: "/attendance/list",
          svgLogo: <NotebookTabs/>
        },
        {
          name: "Notice",
          path: "/notice",
          svgLogo: <Presentation/>
        },
        {
          name: "Settings",
          path: "/settings",
          svgLogo: <MonitorCog/>
        },
       
      ]


      const formik = useFormik({
        initialValues: {
          employeeId: '',
          password:'',
        },
        validate,
        onSubmit: async (values, { setSubmitting }) => {
          try {
            // Send a request to the server to authenticate the user
            const response = await axios.post(baseUrl + "/employee/auth/logout", {
              employeeId: values.employeeId,
              password: values.password,
            });
          
            // Display success message
            toast.success(response.data.message);
    
            setModel(false)

            localStorage.removeItem('token')
            window.location.href = '/'
     
          
    
          } catch (error) {
            // Handle any errors
            console.error('Login failed:', error);
            toast.error(error.response.data.message);
          } finally {
            // Reset the form's submitting state
            setSubmitting(false);
          }
        },
      });

  return (
    <>


    <nav className="lg:hidden bg-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" font-bold text-xl ">
          <Link to="/user-dashboard">
           <h2><span className='text-blue-600'>Ludo</span>Battle</h2>
          </Link>
        </div>

        {/* Responsive menu button for small screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

            ) : (
              <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            )}

          </button>
        </div>
      </div>
    </nav>

        <div className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transition-transform transform ${isMenuOpen ? 'translate-x-0 text-center flex justify-center items-center' : '-translate-x-full'}`}>
        <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b">
            <div className=" font-bold text-xl ">
                  <Link to="/">
                  <h2><span className='text-blue-600'>Ludo</span>Battle</h2>
                  </Link>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1 ">
                    {path.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-gray-600 hover:text-blue-700 border-transparent hover:border-blue-500 pr-6 ${activeTab === index ? 'border-blue-500  bg-blue-50 text-blue-700' : ''}`}
                          onClick={() => handleTabClick(index)}
                        >
                          <span className="inline-flex justify-center items-center ml-4">
                            {/* <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={link.svgLogo}
                              />
                            </svg> */}
                            {link.svgLogo}
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}

              </ul>
            </div>
             {/* logout  bottom in sidbar*/}
             <div className="flex justify-center items-center mb-5">

            <button
              onClick={logout}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-gray-600 hover:text-blue-700 rounded-2xl pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
            </button>

            </div>
          </div>
        </div>

        {/* Navigation links for larger screens */}
        <div className="lg:block hidden md:flex md:flex-shrink-0 antialiased bg-gray-50 text-gray-800">
          <div className="fixed flex flex-col top-0 left-0 w-64 bg-gray-900 h-full">
            <div className="flex items-center justify-start ml-6 mt-4 h-14 ">
            <div className=" font-bold ">
              <Link to="/user-dashboard" className='flex justify-center items-center gap-2'>
              <div>
                <p className='text-white'>Metablock Technology</p>
              </div>
              </Link>
            </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1 ml-4 mr-5">
                    {path.map((link, index) => (
                      <li key={index}>
                        <Link
                          to={link.path}
                          className={`relative flex flex-row items-center h-11 focus:outline-none rounded-xl  hover:bg-[#f5f7f9] hover:bg-opacity-5 bg-opacity-5 border-transparent pr-6 ${activeTab === index ? 'bg-[#f5f7f9] text-white' : 'text-gray-600'}`}
                          onClick={() => handleTabClick(index)}
                        >
                          <span className="w-5 h-5 inline-flex justify-center items-center ml-4">
                            {/* <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={link.svgLogo}
                              />
                            </svg> */}
                             {link.svgLogo}
                          </span>
                          
                          <span className={`ml-2 text-sm font-semibold  ${activeTab === index ? 'text-white' : 'text-zinc-500'}`}>
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
              </ul>

            </div>
             {/* logout  bottom in sidbar*/}
              <div className="flex justify-center items-center mb-5">

                  <button
                    onClick={() => setModel(true)}
                    className=" hover:text-white relative flex flex-row items-center h-11 focus:outline-none text-gray-600 bg-opacity-5 bg-white rounded-2xl pr-6"
                  >
                    <span className="inline-flex justify-center items-center ml-4 ">
                      <svg
                        className="w-5 h-5 hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                    <span className="ml-2 text-sm tracking-wide truncate hover:text-white">Logout</span>
                  </button>

                </div>

          </div>
           {/* Main content */}

            
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
                <h4 className="text-sm text-gray-900 font-medium">Are you sure want to logout</h4>
               
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
              
              <div className="overflow-y-auto min-h-[100px]">
              
              <form onSubmit={formik.handleSubmit}>
            {/*  */}

              <input id="employeeId" name='employeeId' onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-xl font-medium bg-white bg-opacity-5 border ${formik.errors.employeeId ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5`}
              type="text"
              placeholder="Enter your employeeId id"
              />
              {/* {formik.errors.userPassword && <div className="text-red-500 ">{formik.errors.userPassword}</div>} */}

          
            

              <input id="password" name='password' onChange={formik.handleChange}
              className={`w-full px-8 py-4 rounded-xl font-medium bg-white bg-opacity-5 border ${formik.errors.password ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5`}
              type="password"
              placeholder="Enter password"
              />

              {/* {formik.errors.password && <div className="text-red-500 ">{formik.errors.password}</div>} */}

          
          {/* Submit button */}
        <button
            type='submit'
            className="mt-5 tracking-wide font-semibold bg-gray-700 text-gray-100 w-full py-4 rounded-xl hover:bg-gray-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            disabled={formik.isSubmitting} // Disable the button while submitting
        >
            {formik.isSubmitting ? (
                // Show loading spinner if submitting
                <span>Loading...</span>
            ) : (
                // Show "Login" text if not submitting
                <span>Logout</span>
            )}
        </button>
        </form>
              </div>          
            </div>
          </div>
        </div>
      </div>
    ) : null}


        </>



  );
};

export default Sidebar;