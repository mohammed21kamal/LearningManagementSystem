import {createBrowserRouter,Navigate} from "react-router-dom";
import App from './App';
import Courses from './Pages/Admin/Courses';
import AddCourse from './Pages/Admin/Forms/Add/AddCourse';
import UpdateCourse from './Pages/Admin/Forms/Update/UpdateCourse';
import CourseInfo from './Pages/Admin/CourseInfo';
import Instructor from './Pages/Admin/Instructor';
import AddInstructor from './Pages/Admin/Forms/Add/AddInstructor';
import UpdateInstructor from './Pages/Admin/Forms/Update/UpdateInstructor';
import Students from './Pages/Admin/Students';
import AddStudent from './Pages/Admin/Forms/Add/AddStudent';
import UpdateStudent from './Pages/Admin/Forms/Update/UpdateStudent';
import AssignCourse from './Pages/Admin/Forms/Add/AssignCourse';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import List from "./Pages/Student/List";
import Enroll from "./Pages/Student/Enroll";
import CoursesInstructor from "./Pages/Instructor/CoursesInstructor";
import StudentDetails from "./Pages/Instructor/StudentDetails";
import AddGrade from "./Pages/Instructor/AddGrade";

 export const router = createBrowserRouter([
    {
      path:"/",
      element: <App />,
     children: [
        {
          path:"/admin",
          children:[
            {
              path:"courses",
              children:[
                {
                  path:"",
                  element: <Courses/>
                },
                {
                  path:"add",
                  element: <AddCourse/>
                },
                {
                  path:"update/:id",
                  element: <UpdateCourse/>
                },
                {
                  path:"courseinfo/:id",
                  element: <CourseInfo/>
                }
              ]
            },
            {
              path: "instructor",
              children:[
              {
                path: "",
                element: <Instructor />,
              },
              {
                path: "add",
                element: <AddInstructor />,
              },
              {
                path: "update/:id",
                element: <UpdateInstructor />,
              },
             ]
            },
            {
              path: "students",
             children:[
              {
                path: "",
                element: <Students />,
              },
              {
                path: "add",
                element: <AddStudent/>,
              },
              {
                path: "update/:id",
                element: <UpdateStudent />,
              },
             ]
            },
            {
              path: "assign",
              children:[
                {
                  path: "",
                  element: <AssignCourse />,
                },
              ]
            }
          ]
        },
        {
          path: "/student",
          children:[
            {
              path: "list/:id",
              element: <List />,
            },
            {
              path: "enroll/:id",
              element: <Enroll />,
            }
             ],
        },
        {
          path: "/instructor",
          children:[
            {
              path: "coursesInstructor/:id",
              element: <CoursesInstructor />,
            },
            {
              path: ":id/:id",
              element: <StudentDetails/>,
        
            },
            {
              path: "add/:id/:id",
              element: <AddGrade />,
        
            },
            
        ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "",
          element: <Navigate to={"/login"} />,
        },
        {
          path: "*",
          element: <Navigate to={"/login"} />,
        }
      ]
        },
        
      ],
    );
  export default router;