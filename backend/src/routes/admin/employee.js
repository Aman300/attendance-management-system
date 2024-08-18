const express = require("express");
const { createDepartment, getDepartment } = require("../../controllers/admin/department");
const { createEmployee, getAllEmployees } = require("../../controllers/admin/employee");
const adminEmployee = express.Router();

adminEmployee.post("/create-employee", createEmployee);
adminEmployee.get("/get-employee", getAllEmployees);

module.exports = adminEmployee;