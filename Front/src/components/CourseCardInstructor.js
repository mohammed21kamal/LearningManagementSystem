import React from "react";
import Card from "react-bootstrap/Card";
import "../style/course-card.css";
import { Link } from "react-router-dom";
const CourseCardInstrutor = (props) => {
  
    
  return(
    <div>
     <Card >
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
        {props.code}
        </Card.Text>
        <Card.Text>
        {props.description}
        </Card.Text>
        <Link className='btn btn-success w-100' to={"/instructor/"+ props.instructorId+"/" + props.id}>View students</Link>
      </Card.Body>
    </Card>
    </div>
  );
  
};

export default CourseCardInstrutor;
