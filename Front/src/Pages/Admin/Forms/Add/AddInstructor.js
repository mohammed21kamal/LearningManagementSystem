import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import Navbar from '../../../shared/Navbar';

function AddInstructor() {

    const auth = getAuthUser();
    const [instructor, setInstructor] = useState({
    name: '',
    email:'',
    password:'',
    phone:'',
    loading:false,
    success:'',
    err:''
    });
  
    const addInstructor = (e) => {
      e.preventDefault();
      setInstructor({ ...instructor, loading: true, err: [] });
      axios
        .post("http://localhost:4000/Instructor/", {
          email: instructor.email,
          password: instructor.password,
          name: instructor.name,
          phone:instructor.phone,
        },
        {
            headers:{
                token: auth.token,
              },
            })
            .then((res)=> {
                setInstructor({
                ...instructor,
                success:'instructor added successfully',
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
          <Form className='form-container' onSubmit={addInstructor}>
            <div className='form-header'>
              <h1 className='form-title'>Add Instructor</h1>

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

      
      <Button variant="btn btn-dark" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default AddInstructor;