import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../style/header.css';
import { removeAuthUser } from '../../helper/storage';

const HeaderStudent=()=>{

    let { id } = useParams();
    const navigate = useNavigate();
    const Logout = () => {
      removeAuthUser();
      navigate("/login");
    };
    return (
    < div className='Header'>
        <Navbar>
        <Container>
          <Navbar.Brand href="#home">Code Course</Navbar.Brand>
          <Nav className="me-auto">
          <Link  className= "nav-link" to={`/student/list/`+id}>Courses</Link>
          </Nav>

          <Nav className="ms-auto">
          <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
    );
     
};
export default HeaderStudent;