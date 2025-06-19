const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  regNo: { type: String, unique: true },
  password: String,
  courses: [
    {
      code: String,
      name: String,
      credits: Number,
      internal: Number,
      external: Number
    }
  ]
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
