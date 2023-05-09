const router = require("express").Router();
const conn = require("../../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const instructor = require("../../middleware/instructor");

router.post(
  "/grade/:studentId/:courseId",
  body("grade")
    .isNumeric()
    .custom(value => {
      if (value < 0 || value > 100) {
        throw new Error('Grade must be between 0 and 100');
      }
      return true;
    }),
    //.withMessage('Grade must be between 0 and 100'),

  async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    // 1- VALIDATE REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMsgs });
    }

    try {
      // 1- CHECK IF STUDENT EXISTS OR NOT
      const student = await query("SELECT * FROM users WHERE roleId = 3 AND id = ?", [
        req.params.studentId
    ]);
      if (!student[0]) {
        res.status(404).json({ msg: "Student not found!" });
        return;
      }

      // 2- CHECK IF COURSE EXISTS OR NOT
      const course = await query("SELECT * FROM course WHERE id = ?", [req.params.courseId]);
      if (!course[0]) {
        res.status(404).json({ msg: "Course not found!" });
        return;
      }

      // 3- PREPARE UPDATE QUERY AND EXECUTE IT
      const gradeObj = {
        grade: req.body.grade
      };
      await query("UPDATE enrollment SET ? WHERE studentId = ? AND courseId = ?", [
        gradeObj,
        req.params.studentId,
        req.params.courseId
    ]);

      res.status(200).json(
        { 
            msg: "Grade updated successfully!" 
        }
        );
    } catch (err) {
      res.status(500).json({ msg: "Internal server error!" });
      console.log(err);
    }
  }
);

module.exports = router;
