import Card from "react-bootstrap/Card";
import "../style/course-card.css";
import { Link } from "react-router-dom";
import {useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import Alert from "react-bootstrap/Alert";

const CourseCardStudent = (props) => {
    const  routeIdStudent=useParams().id;
    console.log(routeIdStudent);
    const [assign, setAssign] = useState({
        studentId: routeIdStudent,
        courseId: props.id,
        success:'',
        err:''
        });
    
    function AddAssign(){
        console.log(props.id);
        // preventDefault();
        axios
            .post("http://localhost:4000/enroll/enroll", {
                studentId: assign.studentId,
                courseId: assign.courseId
            })
            .then((res) => {
                setAssign({
                    success: "Assign Course succssful !",
                    err: ''
                });
            })
            .catch((res) => {
                setAssign({
                    success: null,
                    err: 'This course is already enrollment'
                })
            })
    };
   
    return (
        <div>
            {assign.err && (
        <Alert variant="danger" className="p-0">
          {assign.err}
        </Alert>
      )}

      {assign.success && (
        <Alert variant="success" className="p-2">
          {assign.success}
        </Alert>
      )}
            <Card>
                {/* <Card.Img className="card-image" variant="top" src={props.image} /> */}
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.code}
                    </Card.Text>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Link className='btn btn-success w-100' onClick={AddAssign} type="submit">Enroll</Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CourseCardStudent;
