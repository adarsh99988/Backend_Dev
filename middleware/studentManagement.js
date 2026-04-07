// ====================== SETUP ======================
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));


// ====================== SCHEMA DESIGN ======================

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    gpa: Number,
    city: String,
    department: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const Student = mongoose.model("Student", studentSchema);


// Course Schema with prerequisites
const courseSchema = new mongoose.Schema({
    name: String,
    code: String,
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const Course = mongoose.model("Course", courseSchema);


// Professor Schema (multiple departments)
const professorSchema = new mongoose.Schema({
    name: String,
    departments: [String]
});

const Professor = mongoose.model("Professor", professorSchema);


// Grade Schema (student + course reference)
const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    grade: String
});

const Grade = mongoose.model("Grade", gradeSchema);


// ====================== EXERCISE 1: CRUD ======================

// 1. Add new student
async function addStudent() {
    const student = new Student({
        name: "Adarsh Tiwari",
        email: "adarsh.tiwari_cs23@gla.ac.in.",
        gpa: 6.4,
        city: "Lucknow",
        department: "CSE"
    });
    await student.save();
    console.log("Student Added");
}

// 2. View all students
async function viewStudents() {
    const students = await Student.find();
    console.log(students);
}

// 3. Find student by email
async function findStudent(email) {
    const student = await Student.findOne({ email });
    console.log(student);
}

// 4. Update student GPA
async function updateGPA(email, newGPA) {
    await Student.updateOne({ email }, { gpa: newGPA });
    console.log("GPA Updated");
}

// 5. Delete student
async function deleteStudent(email) {
    await Student.deleteOne({ email });
    console.log("Student Deleted");
}


// ====================== EXERCISE 2: ADVANCED QUERIES ======================

// 1. GPA between 3.0 and 3.5
async function studentsInRange() {
    const result = await Student.find({ gpa: { $gte: 3.0, $lte: 3.5 } });
    console.log(result);
}

// 2. Students enrolled in more than 5 courses
async function studentsWithManyCourses() {
    const result = await Student.find({ $expr: { $gt: [{ $size: "$courses" }, 5] } });
    console.log(result);
}

// 3. Top 10 students by GPA
async function topStudents() {
    const result = await Student.find().sort({ gpa: -1 }).limit(10);
    console.log(result);
}

// 4. Count students by city
async function countByCity() {
    const result = await Student.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 } } }
    ]);
    console.log(result);
}


// ====================== EXERCISE 3: SCHEMA DESIGN ======================
// Already implemented above:
// ✔ Course (with prerequisites)
// ✔ Professor (multiple departments)
// ✔ Grade (student + course references)


// ====================== EXERCISE 4: AGGREGATION ======================

// 1. Average GPA by department
async function avgGPAByDept() {
    const result = await Student.aggregate([
        { $group: { _id: "$department", avgGPA: { $avg: "$gpa" } } }
    ]);
    console.log(result);
}

// 2. Most popular courses
async function popularCourses() {
    const result = await Student.aggregate([
        { $unwind: "$courses" },
        { $group: { _id: "$courses", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
    ]);
    console.log(result);
}

// 3. Student performance report
async function performanceReport() {
    const result = await Grade.aggregate([
        {
            $lookup: {
                from: "students",
                localField: "student",
                foreignField: "_id",
                as: "studentInfo"
            }
        },
        { $unwind: "$studentInfo" },
        {
            $group: {
                _id: "$studentInfo.name",
                courses: { $push: "$grade" }
            }
        }
    ]);
    console.log(result);
}

 