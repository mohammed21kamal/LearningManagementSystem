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

function Instructor() {

  const auth = getAuthUser();
  const [Instructors, setInstructors] = useState({
    loadind: true,
    results: [],
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

  const deleteInstructor = (id)=>{
    axios.delete("http://localhost:4000/instructor/" + id,
    {
      headers:{
        token: auth.token
      }
    })
    .then(res =>{
        setInstructors({...Instructors,reload:Instructors.reload + 1})
  })
    .catch(err=>{
    
    })
  }

  return (
    <div className='instructor'>   
        <Navbar /> 
    {Instructors.loadind === true && (
      <Loading/>
    )}
    {Instructors.loadind === false && (
      <div className='container block'>
      <div className='header'>
        <h1>Instructors List</h1>
        <Link to={"add"}>
        <Button variant="dark">Add New Instructor</Button>
        </Link>
</div>
<Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
    {Instructors.results.map((Instructor)=>
    <tr key={Instructor.id}>
    <th>{Instructor.id}</th>
    <td>{Instructor.name}</td>
    <td>{Instructor.email}</td>
    <td>{Instructor.phone}</td>
    <td>
      <Switch checked={Instructor.status?true:false} size="xs" />
    </td>
    <td>
    <div className='action'>
      <Link to={"update/"+Instructor.id}>
      <Button variant="primary">Update</Button>{' '}
      </Link>
      <Button variant="danger" onClick={()=>{deleteInstructor(Instructor.id)}}>Delete</Button>{' '}
      </div>
    </td>
  </tr>
    )}
    </tbody>
</Table>
</div>
    )}
    </div>
  );
}

export default Instructor;
