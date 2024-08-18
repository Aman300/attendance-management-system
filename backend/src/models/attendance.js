const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Employee Attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: ObjectId,
      ref: "employee",
      required: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "on leave"],
      default: "present", // Default to "present" when logged in
      required: true,
    },
    check_in: {
      type: String, // Format: HH:mm
      required: true,
    },
    check_out: {
      type: String, // Format: HH:mm
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create Attendance model
const Attendance = mongoose.model("attendance", attendanceSchema);

module.exports = Attendance;
