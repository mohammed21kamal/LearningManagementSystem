import React, { useEffect, useState } from 'react';
import "../../style/Pages.css";
import "../../style/table.css";
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../components/Loading';
import Switch from '../../components/switch';
import { getAuthUser } from '../../helper/storage';
import Navbar from '../shared/Navbar';

const Students = () => {

  const auth = getAuthUser();
    const [students, setStudents] = useState({
      loadind: true,
      results: [],
      err:null,
      reload: 0
    })

    useEffect(() => {
      setStudents({...students,loadind:true})
      axios.get("http://localhost:4000/Stuednt")
      .then(res =>{  
        setStudents({...students,loadind:false,results:res.data})
        console.log(res.data);
    })
      .catch(err=>{
        setStudents({...students,loadind:false,err:'error to reach data'})
    })
    }, [students.reload])

    const deleteStudent = (id)=>{
      axios.delete("http://localhost:4000/Stuednt/" + id,
      {
        headers:{
          token: auth.token
        }
      })
      .then(res =>{
        setStudents({...students,reload:students.reload + 1})
    })
      .catch(err=>{
      
      })
    }
  return (
    <div className='students'>
      <Navbar />
    {students.loadind === true && (
      <Loading/>
    )}
      {students.loadind === false && (
        <div className='container block'>
          <div className='header'>
            <h1>Students List</h1>
            <Link to={"add"}>
            <Button variant="dark">Add Student</Button>
            </Link>
        </div>
        <Table striped bordered hover size="sm">
          
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {students.results.map((student)=>

  <tr key={student.id}>
  <th >{student.id}</th>
  <td>{student.name}</td>
  <td>{student.email}</td>
  <td>{student.phone}</td>
  <td>
    <Switch checked={student.status?true:false} size="xs" />
  </td>
  <td>
  <div className='action'>
    <Link to={"update/"+student.id}>
    <Button variant="primary">Update</Button>{' '}
    </Link>
    <Button variant="danger" onClick={()=>{deleteStudent(student.id)}}>Delete</Button>{' '}
    </div>
  </td>
  </tr>
  )}
  </tbody>
</Table>      
</div>
  )
}
</div>);
}

export default Students;
