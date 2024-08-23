const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define Employee Attendance Schema
const NoticeSchema = new mongoose.Schema(
  {
    employee: {
      type: ObjectId,
      ref: "employee",
      required: true,
    },
    notice_msg: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["read", "delivered"],
      default: "delivered",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

// Create Attendance model
const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = Notice;
