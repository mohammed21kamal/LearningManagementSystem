const router = require("express").Router();
const conn = require("../../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const student = require("../../middleware/student");

router.post(
  "/enroll",
  
  body("studentId")
    .isNumeric()
    .withMessage("Enter a valid student id"),
  body("courseId")
    .isNumeric()
    .withMessage("Enter a valid course id"),

  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const query = util.promisify(conn.query).bind(conn);

      // 2- CHECK IF STUDENT ALREADY ENROLLED IN COURSE
      const enrollment = await query("SELECT * FROM enrollment WHERE studentId = ? AND courseId = ?", [req.body.studentId, req.body.courseId]);
      if (enrollment.length > 0) {
        res.status(400).json({ msg: "Student is already enrolled in this course!" });
        return;
      }

      // 3- CHECK IF COURSE EXISTS OR NOT
      const courses = await query("select * from course where id = ?", [
        req.body.courseId,
      ]);
      if (!courses[0]) {
        res.status(404).json({ msg: "course not found !" });
        return;
      }

      // 4- CHECK IF STUDENT EXISTS AND HAS roleId=3
      const users = await query("select * from users where roleId = 3 AND id = ?", [
        req.body.studentId,
      ]);
      if (!users[0]) {
        res.status(404).json({ msg: "student not found or is not a student!" });
        return;
      }

      // 5- PREPARE ASSIGN OBJECT
      const enrollObj = {
        studentId: req.body.studentId,
        courseId: req.body.courseId,
      }

      //6- INSERT INTO DB
      await query("insert into enrollment set ? ", enrollObj);
      res.status(200).json({
        msg: "ENROLLMENT SUCCESSFULY :)"
      })
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
