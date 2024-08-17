const mongoose = require("mongoose");

// Define User Schema
const schema = new mongoose.Schema(
  {
    name:{
      type: String,
      trim: true,
    },
    phone_no:{
      type: String,
      trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    token: {
        type: String,
        default: ""
    }
  },
  {
    timestamps: true,
  }
);

// Create User model
const admin = mongoose.model("admin", schema);

module.exports = admin;
