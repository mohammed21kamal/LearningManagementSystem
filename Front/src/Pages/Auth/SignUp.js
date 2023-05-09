import React from 'react';
import { useState } from 'react';
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../../helper/storage";
import { Link, useNavigate } from "react-router-dom";
import '../../style/signup.css';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineEmail, MdOutlineTypeSpecimen, MdPhoneIphone } from 'react-icons/md';
import { RiLock2Line } from 'react-icons/ri';


const SignUp = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone:"",
    roleId:"",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        email: register.email,
        password: register.password,
        name: register.name,
        phone:register.phone,
        roleId:register.roleId
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        {console.log(resp.data)}
        setAuthUser(resp.data);
        navigate("/login");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className='auth-body'>
    <div className="sign-up">
      <form onSubmit={RegisterFun}>

      {register.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.msg}
        </Alert>))}

        <div className='signup-input'>
        <AiOutlineUser/>
        <input type="text" id="name"
          placeholder="name"
          value={register.name} onChange={(e)=>setRegister({...register,name:e.target.value})} />
        </div>

        <div className='signup-input'>
          <MdOutlineEmail/>
          <input type="email"
            id="email" placeholder="email" value={register.email} onChange={(e)=>setRegister({...register,email:e.target.value})} />
        </div>

        <div className='signup-input'>
        <MdPhoneIphone/>
        <input type="text" id="phone" placeholder="phone" value={register.phone} onChange={(e)=>setRegister({...register,phone:e.target.value})} />
        </div>

        <div className='signup-input'>
        <RiLock2Line/>
        <input type="password" id="password" placeholder="password" value={register.password} onChange={(e)=>setRegister({...register,password:e.target.value})} />
        </div>
        
        <div className='signup-input'>
        <MdOutlineTypeSpecimen/>
        <select  id='role'   aria-label="Default select example " value={register.roleId} onChange={(e)=>setRegister({...register,roleId:e.target.value})}>
          <option  selected>Select the person role</option>
          <option value="3"  >Student</option>
          <option value="2"  >Instructor</option>
        </select>
        </div>
        <div className='signup-button'>
          <button type="submit">Sign Up</button>
          <Link to={"/login"}>Already have an account?</Link>
        </div>

      </form>
    </div>
    </div>

  );
};
export default SignUp;