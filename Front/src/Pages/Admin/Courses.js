import React, { useEffect, useState } from 'react';
import '../../style/table.css';
import "../../style/table.css";
import { Link } from 'react-router-dom';
import Switch from '../../components/switch';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Loading from '../../components/Loading';
import axios from 'axios';
import { getAuthUser } from '../../helper/storage';
import Navbar from '../shared/Navbar';

export default function Courses(props) {

  const auth = getAuthUser();
  const [courses, setcourses] = useState({
    loadind: true,
    results: [],
    err:null,
    reload: 0
  })
  
  useEffect(() => {
    setcourses({...courses,loadind:true})
    axios.get("http://localhost:4000/Courses")
    .then(res =>{  
      setcourses({...courses,loadind:false,results:res.data})
  })
    .catch(err=>{
    setcourses({...courses,loadind:false,err:'error to reach data'})
  })
  }, [courses.reload])
  
 const deleteCourse = (id)=>{
    axios.delete("http://localhost:4000/Courses/" + id,
    {
      headers:{
        token: auth.token,
      }
    })
    .then(res =>{
        setcourses({...courses,reload:courses.reload + 1})
  })
    .catch(err=>{
    
    })
  }
    return (

      
      <div className='courses'>
              <Navbar />

        {courses.loadind === true && (
          <Loading/>
        )}
        {courses.loadind === false && (
        <div className='container block'>
            <div className='header'>
              <h1>Courses List</h1>
              <Link to={"add"}>
              <Button variant="dark">Add Course</Button>
              </Link>
        </div>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Course Name</th>
                <th scope="col">Code</th>
                <th scope="col">description</th>
                <th scope="col">status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.results.map((course)=>
              <tr key={course.id}>
                <th scope="row" className='course-cell'>{course.id}</th>
                <td className='course-cell'>{course.name}</td>
                <td className='course-cell'>{course.code}</td>
                <td className='course-cell'>{course.description}</td>
                <td>
                  <Switch checked={course.status?true:false} size="xs" />
                </td>
                <td>
                  <div className='action'>
                  <Link to={"update/"+course.id}>
                  <Button variant="primary">Update</Button>{' '}
                  </Link>
                  <Link to={"courseinfo/"+course.id}>
                  <Button variant="primary">View</Button>{' '}
                  </Link>
                  <Button variant="danger" onClick={(e)=>{deleteCourse(course.id)}}>Delete</Button>{' '}
                  </div>
                </td>
              </tr>
              )}
              
            </tbody>
            </Table>
            </div>
          )}
      </div>
    
  )
}
