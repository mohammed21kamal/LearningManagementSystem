import axios from 'axios';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import Navbar from '../../../shared/Navbar';

const AddCourse = ()=> {

  const auth = getAuthUser();
  const [course, setCourse] = useState({
    name: '',
    description:'',
    code:'',
    loading:false,
    success:'',
    err:''
  } )


  const addCourse = (e) => {
    e.preventDefault();
    setCourse({ ...course, loading: true, err: [] });
    axios
      .post("http://localhost:4000/Courses", {
        name: course.name,
        description: course.description,
        code: course.code,
      },
      {
          headers:{
              token: auth.token,
            },
          })
          .then((res)=> {
              setCourse({
              ...course,
              success:'course added successfully',
              err:''
            });
            console.log(res.data)
          })
          .catch((res)=>{
           setCourse({
              ...course,
              success:'',
              err:'something went wrong'
            })
          })

          
  }
  return (
      
        <div className='container block'>
          <Navbar />
          <Form className='form-container' onSubmit={addCourse}>
            <div className='form-header'>
              <h1 className='form-title'>Add New Course</h1>
              {course.err && (
              <div className='alert'>
                <Alert variant={'danger'}>
                  {course.err}
                </Alert>
              </div>
              )}

              {course.success&&(
              <div className='alert'>
                <Alert variant={'success'}>
                  {course.success}
                </Alert>
                </div>
              )
              }
            </div>
        
        
            
          <Form.Group className="mb-3" controlId="formBasicEmail" >
            <Form.Label>Course Name</Form.Label>
            <Form.Control placeholder="Enter Course Name"
            value={course.name} 
            onChange={(e) => setCourse({...course,name:e.target.value})}
            required/>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>description</Form.Label>
            <Form.Control as="textarea" rows={3}
            value={course.description} 
            onChange={(e) => setCourse({...course,description:e.target.value})}
            required/>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Course Code</Form.Label>
            <Form.Control placeholder="Enter course code" 
            value={course.code} 
            onChange={(e) => setCourse({...course,code:e.target.value})}
            required/>
          </Form.Group>
          
          <Button variant="btn btn-dark" type="submit">
            Submit
          </Button>
        </Form>
        </div>
  );
    }
export default AddCourse;