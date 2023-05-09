import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {MdOutlineAssignment} from 'react-icons/md'

export const SidebarData = [
  {
    title: 'Courses',
    path: '/admin/courses',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Instructor',
    path: '/admin/instructor',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Students',
    path: '/admin/students',
    icon: <FaIcons.FaChild />,
    cName: 'nav-text'
  },
  {
    title: 'Assign',
    path: '/admin/assign',
    icon: <MdOutlineAssignment />,
    cName: 'nav-text'
  }
];