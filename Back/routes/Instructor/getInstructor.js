const router = require("express").Router();
const conn = require("../../db/dbConnection");
const util = require("util"); // helper


// LIST & SEARCH [ ADMIN, USER ]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    // 2- CHECK IF Course EXISTS OR NOT
    const student = await query("select * from course_instructors where courseId = ?", [
        req.params.id,
    ]);
    if (!student[0]) {
        res.status(404).json({ msg: "course not found !" });
    }

    if (req.query.search) {
        search = ` AND (instructorId LIKE '%${req.query.search}%' OR courseId LIKE '%${req.query.search}%')`;
    }

    const ContentOfInstructor = await query(`
    SELECT users.name AS instructor_name, course.name AS course_name
    FROM users
    JOIN course_instructors ON users.id = course_instructors.instructorId
    JOIN course ON course.id = course_instructors.courseId
    WHERE course_instructors.courseId = ? 
    ${search}
`, [req.params.id]);

    res.status(200).json( ContentOfInstructor );  
  
});
module.exports = router;   