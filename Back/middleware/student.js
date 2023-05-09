const conn = require("../db/dbConnection");
const util = require("util"); // helper

const student = async (req, res, next) => {
  const query = util.promisify(conn.query).bind(conn);
  const { token } = req.headers;
  const student = await query("select * from users where token = ?", [token]);
  if (student[0] && student[0].roleId == "3") {
    res.locals.student = student[0];
    next();
  } else {
    res.status(403).json({
      msg: "you are not authorized to access this route !",
    });
  }
}; 

module.exports = student;