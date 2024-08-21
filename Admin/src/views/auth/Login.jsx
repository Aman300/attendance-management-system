import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl, loginRoute } from '../../utils/APIRoutes';

const validate = values => {
  const errors = {};

 
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
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
      email: '',
      password:'',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Send a request to the server to authenticate the user
        const response = await axios.post(baseUrl + "/admin/auth/login", {
          email: values.email,
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
    <div className="h-screen bg-gray-900 text-white flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white bg-opacity-5 shadow sm:rounded-xl flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-6/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Admin Login</h1>
                <div className="flex justify-center items-center ">
                <div className="mx-auto">
                <form onSubmit={formik.handleSubmit}>
                      {/*  */}

                        <input id="email" name='email' onChange={formik.handleChange}
                        className={`w-full px-8 py-4 rounded-xl font-medium bg-white bg-opacity-5 border ${formik.errors.email ? "border-red-500" : "border-gray-300"} placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-5`}
                        type="email"
                        placeholder="Enter your email id"
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
                      className="mt-5 tracking-wide font-semibold bg-indigo-800 text-gray-100 w-full py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                </div>
                
                </div>
            </div>
            
            </div>
        </div>
    </div>
    </>
  )
}

export default Login