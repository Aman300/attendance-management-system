// Sidebar.js
import { useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpenCheck, Contact, LayoutDashboard, ListCheck, ListTodo, MonitorCheckIcon, MonitorCog, NotebookTabs, Presentation, UserPlus } from 'lucide-react';



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

  let path = [
        {
          name: "Dashboard",
          path: "/",
          svgLogo: <LayoutDashboard/>
        },
           

        // {
        //   name: "Today Attendance",
        //   path: "/today/attendance",
        //   svgLogo: <ListCheck/>
        // },
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
           {/* Main content */}

            
        </div>


        </>



  );
};

export default Sidebar;