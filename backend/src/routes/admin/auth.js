const express = require("express");
const { adminRegister, adminLogin } = require("../../controllers/admin/auth");
const adminAuth = express.Router();

adminAuth.post("/register", adminRegister);
adminAuth.post("/login", adminLogin);

module.exports = adminAuth;