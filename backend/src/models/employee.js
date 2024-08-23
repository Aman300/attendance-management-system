const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Employee Schema
const schema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone_no: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_img: {
      type: String,
      default: null,
      trim: true,
    },
    department: {
      type: ObjectId,
      ref: "department",
      required: true,
    },
    salary: {
      type: String,
      required: true,
      trim: true,
    },
    joining_date: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_birth: {
      type: String,
      required: true,
      trim: true,
    },
    emergency_contact: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["employee"],
      default: "employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "admin",
      default:"66c08c43093bf48806cd8995"
      // required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create Employee model
const Employee = mongoose.model("employee", schema);

module.exports = Employee;
