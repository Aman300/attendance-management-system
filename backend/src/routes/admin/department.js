const express = require("express");
const { createDepartment, getDepartment } = require("../../controllers/admin/department");
const adminDepartment = express.Router();

adminDepartment.post("/create-department", createDepartment);
adminDepartment.get("/get-department", getDepartment);

module.exports = adminDepartment;