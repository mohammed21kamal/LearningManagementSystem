const router = require("express").Router();
const conn = require("../../db/dbConnection");
const util = require("util");

router.get("/:instructorId/:courseId", async (req, res) => {
  try {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";

    const instructor = await query(
      "SELECT * FROM course_instructors WHERE instructorId = ?",
      [req.params.instructorId]
    );

    if (!instructor[0]) {
      return res.status(404).json({ msg: "instructor not found!" });
    }


    const course = await query(
      "SELECT * FROM course_instructors WHERE courseId = ?",
      [req.params.courseId]
    );

    if (!course[0]) {
      return res.status(404).json({ msg: "course not found!" });
    }



    if (req.query.search) {
      search = ` AND (course_instructors.courseId LIKE ?)`;
    }

    const getStudent = await query(
      `SELECT users.name, users.id, course.name AS course_name, enrollment.grade , course.code
       FROM enrollment JOIN course ON course.id = enrollment.courseId 
       JOIN users ON users.id = enrollment.studentId
       JOIN course_instructors ON course_instructors.courseId = enrollment.courseId
       WHERE course_instructors.instructorId = ? AND course_instructors.courseId = ?
        ${search}`,
        [req.params.instructorId, req.params.courseId]
        );

    res.status(200).json(getStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
