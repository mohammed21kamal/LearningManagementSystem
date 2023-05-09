import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import { useParams } from 'react-router-dom';
import Navbar from '../../../shared/Navbar';

const UpdateInstructor = ()=>{

    let {id} = useParams();
    const auth = getAuthUser();
    const [instructor, setInstructor] = useState({
        name: '',
        email:'',
        password:'',
        phone:'',
        status:null,
        loading:false,
        success:'',
        err:''
    });

    const UpdateInstructor = (e) => {
        e.preventDefault();
        setInstructor({ ...instructor, loading: true, err: [] });
        axios
          .put("http://localhost:4000/Instructor/"+id, {
            email: instructor.email,
            password: instructor.password,
            name: instructor.name,
            phone:instructor.phone,
            status:instructor.status,
          },{
              headers:{
                  token: auth.token,
                },
              })
              .then((res)=> {
                  setInstructor({
                  ...instructor,
                  name: '',
                  email:'',
                  password:'',
                  phone:'',
                  success:'instructor updated successfully',
                  err:''
                });
                console.log(res.data)
              })
              .catch((res)=>{
               setInstructor({
                  ...instructor,
                  success:'',
                  err:'something went wrong'
                })
              })
  
      };

        return (
            <div className='container block'>
                <Navbar />
                  <Form className='form-container' onSubmit={UpdateInstructor}>
                    <div className='form-header'>
                      <h1 className='form-title'>Update Instructor</h1>
        
                      {instructor.success&&(
                      <div className='alert'>
                        <Alert variant={'success'}>
                          {instructor.success}
                        </Alert>
                        </div>
                      )
                      }
        
        
                      {instructor.err && (
                      <div className='alert'>
                        <Alert variant={'danger'}>
                          {instructor.err}
                        </Alert>
                      </div>
                      )}
                </div>
                
        
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='text' placeholder="Full name"
                  value={instructor.name} 
                  onChange={(e) => setInstructor({...instructor,name:e.target.value})}
                  required/>
                </Form.Group>
        
        
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="E-mail"
                value={instructor.email} 
                onChange={(e) => setInstructor({...instructor,email:e.target.value})}
                required/>
              </Form.Group>
        
              
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                value={instructor.password} 
                onChange={(e) => setInstructor({...instructor,password:e.target.value})}
                required/>
              </Form.Group>
        
        
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Phone number"
                value={instructor.phone} 
                onChange={(e) => setInstructor({...instructor,phone:e.target.value})}
                required/>
              </Form.Group>
              
              <Form.Group className='assign-form' onChange={(e) => setInstructor({...instructor,status:e.target.value})}>
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




export default UpdateInstructor;