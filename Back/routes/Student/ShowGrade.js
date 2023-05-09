const router = require("express").Router();
const conn = require("../../db/dbConnection");
const util = require("util"); // helper


// LIST & SEARCH [ ADMIN, USER ]
router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    let search = "";
    // 2- CHECK IF Course EXISTS OR NOT
    const student = await query("select * from enrollment where studentId = ?", [
        req.params.id,
    ]);
    if (!student[0]) {
        res.status(404).json({ msg: "student not found !" });
    }

    if (req.query.search) {
        search = ` AND (where studentId LIKE '%${req.query.search}%' OR courseId LIKE '%${req.query.search}%')`;
    }

    const Grade = await query(`
        SELECT course.name, course.code, enrollment.grade 
        FROM course JOIN enrollment ON course.id = enrollment.courseId
        WHERE enrollment.studentId = ?
        ${search}
    `, [req.params.id]);

    res.status(200).json( Grade );  

});
module.exports = router; 