import "../../style/Setgrade.css";
import axios from "axios";
import React, { useState } from "react";
// import { getAuthUser } from "../../helper/storage";
import { Link, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import HeaderInstructor from "../shared/HeaderInstructor";

const AddGrade = () => {
  let { id } = useParams();
  const  routeIdStudent=window.location.pathname.split("/")[3];
  // console.log(routeIdStudent)
  const [grade, setGrade] = useState({
    grade: "",
    loading: false,
    err: null,
    success: null,
  });

  const gradeFun = (e) => {
    e.preventDefault();
    setGrade({ ...grade, loading: true, err: [] ,success: "Update grade succssful !"});
    axios
      .post("http://localhost:4000/grade/grade/"+routeIdStudent+"/"+id, {
        grade: grade.grade,
       
      })
      .then((resp) => {
        setGrade({ ...grade, loading: false, err: null, success:"grade added sucessfully !"});
        {console.log(resp)}
        
        // navigate("/login");
      })
      .catch((errors) => {
        setGrade({
          ...grade,
          loading: false,
          err: "Grade should be between 0 & 100 ",
          success: null,
        });
      });
  };
  return (

    <>
        <HeaderInstructor/>
    <div className="setgrade">
      
      <form onSubmit={gradeFun}>
      {grade.err && (
        <Alert variant="danger" className="p-0">
          {grade.err}
        </Alert>
      )}

      {grade.success && (
        <Alert variant="success" className="p-2">
          {grade.success}
        </Alert>
      )}

        <label htmlFor="grade">Grade</label>
        <input type="text" id="grade" placeholder="grade" value={grade.grade}
          onChange={(e)=>setGrade({...grade,grade:e.target.value})} />
          <h1>{grade.grade}</h1>
        <div >
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddGrade;