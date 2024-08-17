const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


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
    profile_img:{
        type: String,
        default: null,
        trim: true,
    },
    department:{
      type: ObjectId,
      ref: "department",
    },
    role: {
      type: String,
      enum: ["employee"],
      default: "employee",
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
const employee = mongoose.model("employee", schema);

module.exports = employee;
