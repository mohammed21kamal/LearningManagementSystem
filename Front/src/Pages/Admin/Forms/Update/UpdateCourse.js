import axios from 'axios';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import { useParams } from 'react-router-dom';
import Navbar from '../../../shared/Navbar';

const UpdateCourse = ()=> {

  let {id} = useParams();
  const auth = getAuthUser();
  const [course, setCourse] = useState({
    name: '',
    description:'',
    code:'',
    status:null,
    loading:false,
    success:'',
    err:'',
    reload: false
  });

  const Updatecourse = (e) => {
    e.preventDefault();
    setCourse({ ...course, loading: true, err: [] });
    axios
      .put("http://localhost:4000/Courses/"+id, {
        name: course.name,
        description: course.description,
        code: course.code,
        status:course.status,
      },{
          headers:{
              token: auth.token,
            },
          })
          .then((res)=> {
              setCourse({
              ...course,
              success:'course updated successfully',
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

  };

  return (
      
        <div className='container block'>
          <Navbar />
          <Form className='form-container' onSubmit={Updatecourse}>
            <div className='form-header'>
              <h1 className='form-title'>Update Course</h1>


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
    
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Course Code</Form.Label>
            <Form.Control placeholder="Enter course code" 
            value={course.code} 
            onChange={(e) => setCourse({...course,code:e.target.value})}
            required/>
          </Form.Group>

          <Form.Group className='assign-form' onChange={(e) => setCourse({...course,status:e.target.value})}>
            <Form.Label>Select status</Form.Label>
                <Form.Check
                  inline value={1} label={'Active'} name="group1" type='radio' id={`inline-radio-1`}
                />

                <Form.Check
                  inline value={0} label={'In Active'} name="group1" type='radio' id={`inline-radio-1`}
                />

            </Form.Group>
          
          <Button variant="btn btn-dark" type="submit">
            Submit
          </Button>
        </Form>
        </div>
  );
    }
export default UpdateCourse;