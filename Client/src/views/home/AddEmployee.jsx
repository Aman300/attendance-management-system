import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb';
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone_no: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  profile_img: Yup.string().url("Invalid URL").required("Profile image URL is required"),
  department: Yup.string().required("Department is required"),
  salary: Yup.number().positive("Salary must be a positive number").required("Salary is required"),
  joining_date: Yup.date().required("Joining date is required"),
  address: Yup.string().required("Address is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  emergency_contact: Yup.string()
    .matches(/^\d{10}$/, "Emergency contact must be exactly 10 digits")
    .required("Emergency contact is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string().oneOf(["active", "inactive"], "Invalid status").required("Status is required"),
  token: Yup.string().required("Token is required")
});

function  AddEmployee() {
  const breadcrumbItems = [
    { text: 'Dashboard', href: '/' },
    { text: 'Add Employee', href: '/' },
  ];

  const [isModel , setModel] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_no: "",
      email: "",
      password: "",
      profile_img: "",
      department: "",
      salary: "",
      joining_date: "",
      address: "",
      date_of_birth: "",
      emergency_contact: "",
      role: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("Form data", values);
      // Handle form submission here
    }
  });

  return (
    <>
    <div className="p-5">
      <Breadcrumb items={breadcrumbItems} />
    </div>
      

    <div className="flex flex-col px-5 ">
      <div className=" overflow-x-auto pb-4 bg-white p-10 rounded-2xl mb-10">
        <div className="block">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className=' grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_no"
              value={formik.values.phone_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.phone_no && formik.errors.phone_no ? (
              <div className="text-red-600 text-sm">{formik.errors.phone_no}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600 text-sm">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Profile Image URL</label>
            <input
              type="text"
              name="profile_img"
              value={formik.values.profile_img}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.profile_img && formik.errors.profile_img ? (
              <div className="text-red-600 text-sm">{formik.errors.profile_img}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.department && formik.errors.department ? (
              <div className="text-red-600 text-sm">{formik.errors.department}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.salary && formik.errors.salary ? (
              <div className="text-red-600 text-sm">{formik.errors.salary}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Joining Date</label>
            <input
              type="date"
              name="joining_date"
              value={formik.values.joining_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.joining_date && formik.errors.joining_date ? (
              <div className="text-red-600 text-sm">{formik.errors.joining_date}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-600 text-sm">{formik.errors.address}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.date_of_birth && formik.errors.date_of_birth ? (
              <div className="text-red-600 text-sm">{formik.errors.date_of_birth}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Emergency Contact</label>
            <input
              type="text"
              name="emergency_contact"
              value={formik.values.emergency_contact}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.emergency_contact && formik.errors.emergency_contact ? (
              <div className="text-red-600 text-sm">{formik.errors.emergency_contact}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            />
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-600 text-sm">{formik.errors.role}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 rounded-xl font-medium bg-white bg-opacity-5 border  placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-2"
            >
              <option value="" label="Select status" />
              <option value="active" label="Active" />
              <option value="inactive" label="Inactive" />
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-600 text-sm">{formik.errors.status}</div>
            ) : null}
          </div>
          </div>
         
          <button
                type="submit"
                className="py-3 px-10 text-xl bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button"
                disabled={formik.isSubmitting} // Disable the button while submitting
                  >
                      {formik.isSubmitting ? (
                          // Show loading spinner if submitting
                          <span>Loading...</span>
                      ) : (
                          // Show "Login" text if not submitting
                          <span>Submit</span>
                      )}
              </button>
        </form>
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
                className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none "
                placeholder=""
                required=""
              />
            </div>
          
            <div className="flex items-center justify-end pt-4 border-t border-gray-200 space-x-4">
              <button
                type="button"
                className="py-2.5 px-5 text-xs bg-indigo-50 text-indigo-500 rounded-xl cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100 close-modal-button"
                onClick={() => setModel(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="py-2.5 px-5 text-xs bg-indigo-500 text-white rounded-xl cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 close-modal-button"
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

export default AddEmployee