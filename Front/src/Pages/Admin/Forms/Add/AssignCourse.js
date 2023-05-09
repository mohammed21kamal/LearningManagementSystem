import * as React from 'react';
import Button from 'react-bootstrap/Button';
import '../../../../style/Pages.css';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAuthUser } from '../../../../helper/storage';
import Navbar from '../../../shared/Navbar';

export default function AssignCourse() {

  const auth = getAuthUser();
  const [courses, setCourses] = useState({
    loadind: true,
    results: [],
    courseId:0,
    err:null,
    reload: 0
  })
  useEffect(() => {
    setCourses({...courses,loadind:true})
    axios.get("http://localhost:4000/Courses")
    .then(res =>{  
      setCourses({...courses,loadind:false,results:res.data})
  })
    .catch(err=>{
    setCourses({...courses,loadind:false,err:'error to reach data'})
  })
  }, [courses.reload])

  const [Instructors, setInstructors] = useState({
    loadind: true,
    results: [],
    instructorId:0,
    err:null,
    reload: 0
  })
  useEffect(() => {
    setInstructors({...Instructors,loadind:true})
    axios.get("http://localhost:4000/Instructor/")
    .then(res =>{  
      setInstructors({...Instructors,loadind:false,results:res.data})
  })
    .catch(err=>{
    setInstructors({...Instructors,loadind:false,err:'error to reach data'})
  })
  }, [Instructors.reload])

  const [assign, setAssign] = useState({
    success:'',
    err:''
    });


  const AddAssign = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/Assign/teching", {
        courseId: courses.courseId,
        instructorId: Instructors.instructorId
      }
      ,{
          headers:{
              token: auth.token,
            },
          })
          .then((res)=> {
            setAssign({
              success:'instructor added successfully',
              err:''
            });
          })
          .catch((res)=>{
            setAssign({
              success:'',
              err:'instructor already assigned'
            })
          })
        };
        const CheckCourse = (e,f)=>{
          setCourses({...courses,courseId:e.target.value})
        }

        const CheckInstructor = (e)=>{
          setInstructors({...Instructors,instructorId:e.target.value})
        }
  return (
    <div className='assigncourse'>
      <Navbar />
      <div className='container block'>
    <div className='header'>
      <h1 className='form-title'>Assign one course</h1>

      {assign.err && (
              <div className='alert'>
                <Alert variant={'danger'}>
                  {assign.err}
                </Alert>
              </div>
              )}

              {assign.success&&(
              <div className='alert'>
                <Alert variant={'success'}>
                  {assign.success}
                </Alert>
                </div>
              )
              }

      </div>
    <div className='assign-body'>

        <Form className='form-container' onSubmit={AddAssign}>
            <Form.Group className='assign-form' onChange={CheckCourse}>
              {courses.results.map((e) => (
                <div key={e.id} className="mb-3">
                  <Form.Check
                  inline
                  value={e.id}
                  label={e.name}
                  name="group1"
                  type='radio'
                  id={`inline-radio-1`}
                  />
                </div>
              ))}
            </Form.Group>

              <Form.Group className='assign-form' onChange={CheckInstructor}>
                {Instructors.results.map((e) => (
                  <div key={e.id} className="mb-3">
                    <Form.Check                      
                      value={e.id}
                      inline
                      label={e.name}
                      name="group2"
                      type='radio'
                      id={`inline-radio-1`}
                    />
                    </div>
                ))}
              </Form.Group>
              <div className='assign-btn'>
                <Button variant="btn btn-dark" type="submit">
                  Submit
              </Button>
              </div>
            </Form>
            
      

    
    </div>
    </div>
    </div>
  );
}