const { errorResponse } = require("../../helper/error.response");
const Attendance = require("../../models/attendance");
const Employee = require("../../models/employee"); // Assuming the employee model is named 'employee'

exports.createEmployee = async (req, res) => {
  try {

   // Find the last created employee to determine the next ID number
   const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });

   let newIdNumber = 1; // Start from 1 if no employees exist yet

   if (lastEmployee) {
     // Extract the numeric part of the last employee's ID
     const lastIdNumber = parseInt(lastEmployee.employeeId.split('-')[1]);
     newIdNumber = lastIdNumber + 1;
   }

   // Generate new employee ID with leading zeros
   const employeeId = `MBT-${newIdNumber.toString().padStart(5, '0')}`;

    // Create a new employee using the request body data
    const newEmployee = await Employee.create({
      employeeId: employeeId,
      name: req.body.name,
      phone_no: req.body.phone_no,
      email: req.body.email,
      password: req.body.password,
      profile_img: req.body.profile_img || null, // optional
      department: req.body.department,
      salary: req.body.salary,
      joining_date: req.body.joining_date,
      address: req.body.address,
      date_of_birth: req.body.date_of_birth,
      emergency_contact: req.body.emergency_contact,
      role: req.body.role || "employee",
      status: req.body.status || "active",
      createdBy: req.body.createdBy,
      token: req.body.token || ""
    });

    // Check if the employee was created successfully
    if (!newEmployee) {
      return errorResponse(res, 401, false, "Something went wrong");
    } else {
      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: newEmployee,
      });
    }
  } catch (e) {
    return errorResponse(res, 500, false, e.message);
  }
};

exports.getAllEmployees = async (req, res) => {
    try {
      // Get page and limit from query parameters, with defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Calculate the skip value
      const skip = (page - 1) * limit;
  
      // Fetch employees with pagination
      const employees = await Employee.find()
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(limit);
  
      // Count total number of employees
      const totalEmployees = await Employee.countDocuments();
  
      // Calculate total pages
      const totalPages = Math.ceil(totalEmployees / limit);
  
      // Return paginated results
      return res.status(200).json({
        success: true,
        message: "Employees retrieved successfully",
        data: employees,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalEmployees: totalEmployees,
        },
      });
    } catch (e) {
      return errorResponse(res, 500, false, e.message);
    }
  };


exports.getTodayEmployeesAttendance = async (req, res) => {
    try {
      // Get page and limit from query parameters, with defaults
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Calculate the skip value
      const skip = (page - 1) * limit;
  
      // Fetch employees with pagination
      const employees = await Attendance.find()
        .populate("employee", "name email")
        .skip(skip)
        .limit(limit);
  
      // Count total number of employees
      const totalEmployees = await Attendance.countDocuments();
  
      // Calculate total pages
      const totalPages = Math.ceil(totalEmployees / limit);
  
      // Return paginated results
      return res.status(200).json({
        success: true,
        message: "Employees Today Attendance retrieved successfully",
        data: employees,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalEmployees: totalEmployees,
        },
      });
    } catch (e) {
      return errorResponse(res, 500, false, e.message);
    }
  };
