const moment = require("moment");
const Attendance = require("../../models/attendance");
const Employee = require("../../models/employee");

exports.employeeLogin = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;

    let isEmployeeExist = await Employee.findOne({
      employeeId: employeeId,
    });
    if (!isEmployeeExist) {
      return errorResponse(res, 401, false, "Employee Id not found in our system");
    }

    let isEmployeePasswordMatch = await Employee.findOne({
      employeeId: employeeId,
      password: req.body.password,
    });
    if (!isEmployeePasswordMatch) {
      return errorResponse(res, 401, false, "Employee password does not match");
    }

    const currentDate = moment().format("YYYY-MM-DD"); // Format date as YYYY-MM-DD
    const currentTime = moment().format("HH:mm"); // Format time as HH:mm

    // Check if there's already an attendance record for today
    let attendance = await Attendance.findOne({
      employee: isEmployeePasswordMatch._id,
      employeeId: employeeId,
      date: currentDate,
    });

    if (!attendance) {
      // If no record exists, create a new attendance record
      attendance = await Attendance.create({
        employee: isEmployeePasswordMatch._id,
        employeeId: employeeId,
        date: currentDate,
        check_in: currentTime,
      });
    }

    // Continue with your login process...

    return res.status(200).json({
      success: true,
      message: "Login successful and attendance recorded",
      attendance,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.employeeLogout = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;

    let isEmployeeExist = await Employee.findOne({
      employeeId: employeeId,
    });
    if (!isEmployeeExist) {
      return errorResponse(res, 401, false, "Employee Id not found in our system");
    }

    let isEmployeePasswordMatch = await Employee.findOne({
      employeeId: employeeId,
      password: req.body.password,
    });
    if (!isEmployeePasswordMatch) {
      return errorResponse(res, 401, false, "Employee password does not match");
    }

    const currentDate = moment().format("YYYY-MM-DD"); // Format date as YYYY-MM-DD
    const currentTime = moment().format("HH:mm"); // Format time as HH:mm

    // Find today's attendance record to update it with check_out time
    let attendance = await Attendance.findOne({
      employee: isEmployeePasswordMatch._id,
      employeeId: employeeId,
      date: currentDate,
    });

    if (!attendance) {
      return errorResponse(res, 404, false, "Attendance record not found for today");
    }

    // Update the check_out time
    attendance.check_out = currentTime;
    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Logout successful and check-out time recorded",
      attendance,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
