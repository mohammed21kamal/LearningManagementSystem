import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuthUser } from '../../../../helper/storage';
import { Alert } from 'react-bootstrap';
import '../../../../style/forms .css';
import { useParams } from 'react-router-dom';
import Navbar from '../../../shared/Navbar';

 const UpdateStudent=() => {
    let {id} = useParams();
    const auth = getAuthUser();
    const [student, setStudent] = useState({
        name: '',
        email:'',
        password:'',
        phone:'',
        status:null,
        loading:false,
        success:'',
        err:''
    });

    const Updatestudent = (e) => {
        e.preventDefault();
        setStudent({ ...student, loading: true, err: [] });
        axios
          .put("http://localhost:4000/Stuednt/"+id, {
            email: student.email,
            password: student.password,
            name: student.name,
            phone:student.phone,
            status:student.status
          },{
              headers:{
                  token: auth.token,
                },
              })
              .then((res)=> {
                  setStudent({
                  ...student,
                  name: '',
                  email:'',
                  password:'',
                  phone:'',
                  success:'student updated successfully',
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
      // useEffect(() => {
  
      //   axios
      //     .get("http://localhost:4000/student/"+ id)
      //       .then((res)=> {
      //           setStudent({name: '',
      //         description:'',
      //         code:'',
      //         loading:false,
      //         success: 'Course Created successfully',
      //         err:''
      //       });
      //     })
      //     .then((res)=>{
      //       setStudent({
      //           ...student,
      //       name: res.data.name,
      //       email: res.data.email,
      //       password: res.data.password,
      //       phone: res.data.phone,})
      //     })
      //     .catch((res)=>{
      //       setStudent({
      //         ...student,
      //         success:'',
      //         err:'something went wrong'
      //       })
      //     })
        
      //   }, [student.reload])

        return (
            <div className='container block'>
              <Navbar />
                  <Form className='form-container' onSubmit={Updatestudent}>
                    <div className='form-header'>
                      <h1 className='form-title'>Update student</h1>
        
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

              <Form.Group className='assign-form' onChange={(e) => setStudent({...student,status:e.target.value})}>
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
export default UpdateStudent;