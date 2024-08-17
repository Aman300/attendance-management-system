const express = require("express");
const auth = require("./auth/auth");
const adminAuth = require("./admin/auth");
const adminDepartment = require("./admin/department");
const router = express.Router();

router.use("/auth", auth);
router.use("/admin/auth", adminAuth);
router.use("/admin", adminDepartment);



router.all("*", async (req, res) => {
    let time = new Date();
    let Data = `${time}`;
    res.status(404).json({ status: false, message: "Page not found", Data });
  });
  

module.exports = router;