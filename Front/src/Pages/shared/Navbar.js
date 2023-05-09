import React, { useState } from 'react';
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';                             
import '../../style/Navbar.css'; 
import { IconContext } from 'react-icons';
import { getAuthUser, removeAuthUser } from '../../helper/storage';
import { Nav } from 'react-bootstrap';
function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () =>{
    console.log(sidebar)
    setSidebar(!sidebar)
  }

  const navigate = useNavigate();
  const Logout = () => {
    removeAuthUser();
    navigate("/login");
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar fixed-top'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
          <li className='navbar-toggle'>
            <div className='nav-lable'>
            <Link to='#' className='menu-bars' onClick={showSidebar}>
                <AiIcons.AiOutlineFileSync />
            </Link>
              <h1 className='adress'>Code Course</h1>
            </div>
              <ul>
              <li className='nav-text'>
              <Nav className="login-button">
                <Nav.Link onClick={Logout}>Logout</Nav.Link>
              </Nav>
                </li>
              </ul>
            </li>
            
        </nav>
        <nav className={sidebar ?  'nav-menu active':'nav-menu'}>
          <ul className='nav-menu-items'>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;