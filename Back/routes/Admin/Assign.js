const router = require("express").Router();
const conn = require("../../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const admin = require("../../middleware/admin");


router.post(
  "/teching",
  admin,
  body("courseId")
    .isNumeric()
    .withMessage("Please enter a valid course ID"),

  body("instructorId")
    .isNumeric()
    .withMessage("Please enter a valid instructor ID"),


  async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    // 1- VALIDATION REQUEST [manual, express validation]
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      // 1- CHECK IF Course EXISTS OR NOT
      const courses = await query("select * from course where id = ?", [
        req.body.courseId,
      ]);
      if (!courses[0]) {
        res.status(404).json({ msg: "course not found !" });
      }

      // 2- CHECK IF STUDENT ALREADY ENROLLED IN COURSE
      const assign = await query("SELECT * FROM course_instructors WHERE instructorId = ? AND courseId = ?", [req.body.instructorId, req.body.courseId]);
      if (assign.length > 0) {
        res.status(400).json({ msg: "instructor is already teached in this course!" });
        return;
      }


      // 3- CHECK IF istructor EXISTS OR NOT
      const users = await query("select * from users where roleId = 2 AND id = ?", [
        req.body.instructorId,
      ]);
      if (!users[0]) {
        res.status(404).json({ msg: "instructor not found !" });
      }


      // 4- PREPARE ASSIGN OBJECT
      const assignObj = {
        instructorId: req.body.instructorId,
        courseId: req.body.courseId,
      }

      // 5- INSERT INTO DB
      await query("insert into course_instructors set ? ", assignObj);
      res.status(200).json({
        msg: "ASSIGN INSTRUCTORS TO COURSES SUCCESSFULY :)"
      }) 
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }


  });
module.exports = router;
