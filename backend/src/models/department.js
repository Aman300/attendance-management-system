const mongoose = require("mongoose");

// Define User Schema
const schema = new mongoose.Schema(
  {
    department_name:{
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create User model
const department = mongoose.model("department", schema);

module.exports = department;
