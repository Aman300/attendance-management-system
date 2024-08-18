const express = require("express");
const { createDepartment, getDepartment } = require("../../controllers/admin/department");
const { createEmployee, getAllEmployees, getTodayEmployeesAttendance } = require("../../controllers/admin/employee");
const adminEmployee = express.Router();

adminEmployee.post("/create-employee", createEmployee);
adminEmployee.get("/get-employee", getAllEmployees);
adminEmployee.get("/get-today-employee-attendance", getTodayEmployeesAttendance);

module.exports = adminEmployee;