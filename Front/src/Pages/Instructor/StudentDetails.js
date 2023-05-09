// import React from 'react'
// import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import { Link } from 'react-router-dom';
import { Link,useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderInstructor from "../shared/HeaderInstructor";


const StudentDetails =()=> {
  const  routeIdCourse=useParams().id;
  const  routeIdInstructour=window.location.pathname.split("/")[2];


  console.log(routeIdCourse)
  console.log(routeIdInstructour)
  //  console.log(window.location.pathname.split("/")[2])

   const [course, setcourse] = useState({
     loading: true,
     results: [],
     err: null,
     reload: 0,
   });
 
   
   useEffect(() => {
     setcourse({ ...course, loading: true });
     axios
       .get("http://localhost:4000/getstudent/"+routeIdInstructour+"/"+routeIdCourse)
       .then((resp) => {
         console.log(resp.data.id);
 
         setcourse({ ...course, results: resp.data, loading: false, err: null });
       })
       .catch((err) => {
         setcourse({
           ...course,
           loading: false,
           err: " something went wrong, please try again later ! ",
         });
       });
   }, [course.reload]);
 
  return (
    <>
    <HeaderInstructor/>
    
    <div className='course'>
      <div className='w-100 bg-white rounded p-3'>
        <div className="container-fluid px-4">          
          <div className="card mb-4">
            <div className="card-body">
            <h1 className="">Student</h1>
            </div>
          </div>
         
          <br/>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i> DataTable
            </div>
          </div>
        </div>
        <Table className='table' striped bordered hover variant="d#060b26">
          <thead>
            <tr>
              <th>Course name</th>
              <th>Course code</th>
              <th>Student name</th>
              <th>Grade</th>
              <th>ِAction</th>
            </tr>
          </thead>
          <tbody>
            {course.results.map((courses, index) => {
              return <tr key={index}>
                <td>{courses.name}</td>
                <td>{courses.code}</td>
                <td>{courses.course_name} </td>
                <td>{courses.grade}</td>
                <td>
                  <Link to={"/instructor/add/" +courses.id+"/" + routeIdCourse} className='btn btn-success'>Assign grade</Link>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    </div>
    
    </>
  )
}

export default StudentDetails;