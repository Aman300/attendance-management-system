import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl, loginRoute } from '../../utils/APIRoutes';
import { useEffect } from 'react';
import Clock from '../../components/Clock';

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
function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      employeeId: '',
      password:'',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(baseUrl + "/employee/auth/login", {
          employeeId: values.employeeId,
          password: values.password,
        });

        console.log(response.data)
        const token = response.data.token

        // Store the token in localStorage
        localStorage.setItem('token', token);

      
        // Display success message
        toast.success(response.data.message);

        navigate("/")

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
    
    <div className=' grid grid-cols-2 justify-center items-center h-screen'>
      <div className='xl:p-12 hidden xl:block relative'>
        <img className='w-full' src="/bg.svg" alt="" />
        {/* <img className='w-full absolute bottom-0 left-0 ' src="/wave.png" alt="" /> */}

      </div>
      <div className='flex justify-center items-center'>
        <div className=''>
          <p className='text-center font-bold text-[#32BD8F] text-3xl uppercase'>Employee login</p>
        {/* <img className="w-1/4" src="/avataaars.svg" alt="" /> */}
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
            className="mt-5 tracking-wide font-semibold bg-[#38D39F] text-gray-100 w-full py-4 rounded-xl hover:bg-[#32BD8F] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            disabled={formik.isSubmitting} // Disable the button while submitting
        >
            {formik.isSubmitting ? (
                // Show loading spinner if submitting
                <span>Loading...</span>
            ) : (
                // Show "Login" text if not submitting
                <span>Login</span>
            )}
        </button>
        </form>
        <div className='w-full mt-6 text-center'>
          <p className='mb-2'>Current time</p>
          <Clock/>
        </div>
       
        </div>
      </div>
    </div>
    </>
  )
}

export default Login