import React from 'react'
import { useState } from 'react';
import '../../style/login.css';
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { Link, useNavigate } from "react-router-dom";
import {RiLock2Line} from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((res) => {
        setLogin({ ...login, loading: false, err: [] });
        console.log(res.data.id)
        setAuthUser(res.data);

        if(res.data.roleId===2){
          navigate("/instructor/coursesInstructor/"+res.data.id);
        }
        else if(res.data.roleId===3){
          navigate("/student/list/"+res.data.id);
        }
        else{
          navigate("/admin/courses");
        }
       
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

    return(
        <div className="login">
        <form onSubmit={LoginFun}>
        
        {login.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>
      ))}
          
          <div className='signup-input'>
            <MdOutlineEmail/>
            <input type="email"required id="email" placeholder="email"  value={login.email} onChange={(e)=>setLogin({...login,email:e.target.value})}/>
          </div>
          
          <div className='signup-input'>
            <RiLock2Line/>
            <input type="password" required id="password" placeholder="password" value={login.password} onChange={(e)=>setLogin({...login,password:e.target.value})} />
            {/* {password.length<8 &&accept&& <p className='error'>Password must be more than 8 char</p>} */}
          </div>
            
            <div className='login-button'>
            <button type="submit"disabled={login.loading===true} >Login</button>
            <Link to={"/signup"}>Do you have an account?</Link>
            </div>
           
        </form>
        </div>
    );
};

  


export default Login