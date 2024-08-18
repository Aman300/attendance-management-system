const express = require("express");
const adminAuth = require("./admin/auth");
const adminDepartment = require("./admin/department");
const adminEmployee = require("./admin/employee");
const employeeAuth = require("./employee/auth");
const router = express.Router();

router.use("/admin/auth", adminAuth);
router.use("/admin", adminDepartment);
router.use("/admin", adminEmployee);
router.use("/employee/auth", employeeAuth);



router.all("*", async (req, res) => {
    let time = new Date();
    let Data = `${time}`;
    res.status(404).json({ status: false, message: "Page not found", Data });
  });
  

module.exports = router;