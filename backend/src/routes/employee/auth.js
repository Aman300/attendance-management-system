const express = require("express");
const { employeeLogin, employeeLogout } = require("../../controllers/employee/employee");
const employeeAuth = express.Router();

employeeAuth.post("/login", employeeLogin);
employeeAuth.post("/logout", employeeLogout);

module.exports = employeeAuth;