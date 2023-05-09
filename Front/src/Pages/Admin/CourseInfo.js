import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../shared/Navbar';


const CourseInfo =()=> {
  const routeIdCourse=useParams().id;


   const [course, setcourse] = useState({
     loading: true,
     results: [],
     err: null,
     reload: 0,
   });
 
 
   useEffect(() => {
     setcourse({ ...course, loading: true });
     axios
       .get("http://localhost:4000/getInstructor/"+routeIdCourse)
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
    <div className='block container'><div className='course'>
            <Navbar />
      <div className='w-100 bg-white rounded p-3'>
        <div className="container-fluid px-4">          
        <div className="header">
            <h1 className="form-title">Course Instructors</h1>
        </div>
          </div>
        </div>

        <Table className='table' striped bordered hover variant="d#060b26">
          <thead>
            <tr>
              <th>Course name</th>
              <th>Instructor name</th>
            </tr>
          </thead>

          <tbody>
            {course.results.map((courses, index) => {
              return <tr key={index}>
              <td>{courses.course_name}</td>
              <td>{courses.instructor_name}</td>
              </tr>
            })}
          </tbody>
        </Table>
      </div>
    </div>
    
  )
}

export default CourseInfo;