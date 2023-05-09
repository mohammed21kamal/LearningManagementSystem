import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import Navbar from '../../../shared/Navbar';
function AddStudent() {

    const auth = getAuthUser();
    const [student, setStudent] = useState({
    email:'',
    name: '',
    password:'',
    phone:'',
    loading:false,
    success:'',
    err:''
    });
  
    const AddStudent = (e) => {
      e.preventDefault();
      setStudent({ ...student, loading: true, err: [] });
      axios
        .post("http://localhost:4000/Stuednt", {
          name: student.name,
          email: student.email,
          password: student.password,
          phone:student.phone,
        },{
            headers:{
                token: auth.token,
              },
            })
            .then((res)=> {
                setStudent({
                ...student,
                success:'student added successfully',
                err:''
              });
              console.log(res.data)
            })
            .catch((res)=>{
             setStudent({
                ...student,
                success:'',
                err:'something went wrong'
              })
            })
    };

  return (
    <div className='container block'>
      <Navbar />
          <Form className='form-container' onSubmit={AddStudent}>
            <div className='form-header'>
              <h1 className='form-title'>Add Student</h1>

              {student.success&&(
              <div className='alert'>
                <Alert variant={'success'}>
                  {student.success}
                </Alert>
                </div>
              )
              }

              
              {student.err && (
              <div className='alert'>
                <Alert variant={'danger'}>
                  {student.err}
                </Alert>
              </div>
              )}
        </div>
        

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder="Full name"
          value={student.name} 
          onChange={(e) => setStudent({...student,name:e.target.value})}
          required/>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="E-mail"
        value={student.email} 
        onChange={(e) => setStudent({...student,email:e.target.value})}
        required/>
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={student.password} 
        onChange={(e) => setStudent({...student,password:e.target.value})}
        required/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" placeholder="Phone number"
        value={student.phone} 
        onChange={(e) => setStudent({...student,phone:e.target.value})}
        required/>
      </Form.Group>


      <Button variant="btn btn-dark" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default AddStudent;