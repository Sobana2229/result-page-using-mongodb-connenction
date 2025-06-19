// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/resultsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  regNo: String,
  name: String,
  password: String,
  courses: [{
    code: String,
    name: String,
    internal: Number,
    external: Number,
  }],
});

const Student = mongoose.model("students", studentSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Hardcoded credits for each subject
const courseCredits = {
  "23CA101": 4, "23CA102": 3, "23CA103": 3, "23CA104": 3, "23CA105": 3,
  "23CA106": 3, "23CA151": 2, "23CA152": 2, "23CA153": 2
};

// Helper functions for grade and CGPA calculation
function calculateAverage(internal, external) {
  return (internal + external) / 2;
}

function calculateGrade(average) {
  if (average >= 90) return "A+";
  if (average >= 80) return "A";
  if (average >= 70) return "B+";
  if (average >= 60) return "B";
  if (average >= 50) return "C";
  return "U"; // 'U' for fail
}

// Login API Route
app.post("/api/login", async (req, res) => {
    try {
      console.log("🔹 Received login request:", req.body); // Debugging
  
      const { regNo, password } = req.body; // Change "registerNumber" to "regNo"
      const student = await Student.findOne({ regNo, password });
  
      console.log("🔹 Found Student:", student); // Debugging
  
      if (!student) return res.status(404).json({ error: "Invalid Credentials" });
  
      let totalGradePoints = 0;
      let totalCreditsEarned = 0;
      let totalCredits = 0;
      const gradePoints = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C": 6, "U": 0 };
  
      const results = student.courses.map((course) => {
        const averageMarks = calculateAverage(course.internal, course.external);
        const grade = calculateGrade(averageMarks);
        const gradePoint = gradePoints[grade] || 0;
        const credits = courseCredits[course.code] || 0;
        totalCredits += credits;
  
        if (grade !== "U") {
          totalGradePoints += gradePoint * credits;
          totalCreditsEarned += credits;
        }
  
        return {
          code: course.code,
          name: course.name,
          credits,
          internal: course.internal,
          external: course.external,
          grade,
          result: grade === "U" ? "FAIL" : "PASS",
        };
      });
  
      // Calculate CGPA
      const cgpa = totalCreditsEarned > 0 ? (totalGradePoints / totalCreditsEarned).toFixed(2) : "0.00";
  
      res.json({
        name: student.name,
        regNo: student.regNo,
        results,
        totalCredits,
        totalCreditsEarned,
        cgpa,
      });
    } catch (error) {
      console.error("❌ Server Error:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
