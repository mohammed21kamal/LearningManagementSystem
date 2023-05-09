import Table from 'react-bootstrap/Table';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderStudent from '../shared/HeaderStudent';
import '../../style/tables.css';
import { Alert } from 'react-bootstrap';


const Enroll =()=> {
   const  routeIdStudent=useParams().id;
//   const  routeIdInstructour=window.location.pathname.split("/")[1];


  console.log(routeIdStudent)
//   console.log(routeIdInstructour)
//    console.log(window.location.pathname.split("/")[1])

   const [course, setcourse] = useState({
     loading: true,
     results: [],
     err: null,
     reload: 0,
   });
 
 
   useEffect(() => {
     setcourse({ ...course, loading: true });
     axios
       .get("http://localhost:4000/showGrade/"+routeIdStudent)
       .then((resp) => {
         console.log(resp.data.id);
 
         setcourse({ ...course, results: resp.data, loading: false, err: null });
       })
       .catch((err) => {
         setcourse({
           ...course,
           loading: false,
           err: "you should assign courses first ! ",
         });
       });
   }, [course.reload]);
 
  return (

    <>
    <HeaderStudent/>
    <div className='course'>
      <div className='w-100 bg-white rounded p-3'>
        <div className="container-fluid px-4">          
          <div className="card mb-4">
            <div className="card-body">
            <h1 className="">View Grade</h1>
            </div>
          </div>
          {course.err&&(
              <div className='alert'>
                <Alert variant={'danger'}>
                  {course.err}
                </Alert>
                </div>
              )
              }
          <div className="card mb-4">
          </div>
        </div>
        <div className='table'>

        <Table className='table' striped bordered hover variant="d#060b26">
          <thead>
            <tr>
              <th>Course name</th>
              <th>Course code</th>
              <th>Grade</th>
              
            </tr>
          </thead>
          <tbody>
            {course.results.map((courses, index) => {
              return <tr key={index}>
                <td>{courses.name}</td>
                <td>{courses.code}</td>
                <td>{courses.grade}</td>
              </tr>
            })}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Enroll;