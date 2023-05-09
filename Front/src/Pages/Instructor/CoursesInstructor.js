import React, { useState, useEffect } from "react";
import Alert from 'react-bootstrap/Alert';
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import CourseCardInstrutor from "../../components/CourseCardInstructor";
import '../../style/course-list-student.css';
import HeaderInstructor from "../shared/HeaderInstructor";




const CoursesInstructor = () => {
  const routeId = useParams().id;
  console.log(routeId)
  const [course, setcourse] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setcourse({ ...course, loading: true });
    axios
      .get("http://localhost:4000/getCourses/" + routeId, {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        console.log(resp.data);

        setcourse({ ...course, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setcourse({
          ...course,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [course.reload]);

  const searchcourse = (e) => {
    e.preventDefault();
    setcourse({ ...course, reload: course.reload + 1 });
  };

  return (
    <>
    <HeaderInstructor/>
    
    <div className="home-container p-5">
      {/* Loader  */}
      {course.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      
      <div class="search-container">
              <form onSubmit={searchcourse}>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>


              </form>
            </div>

      {/* LIST course  */}
      {course.loading === false && course.err == null && (
        <>
          {/* Filter  */}
         
            
            {/* LIST course  */}
            <div className="row ">
              {course.results.map((course, index) => (
                <div className="col-3 card-movie-container" key={index}>
                  <CourseCardInstrutor
                    name={course.name}
                    description={course.description}
                    image={course.image}
                    code={course.code}
                    id={course.id}
                    instructorId={routeId}

                  />
                </div>
              ))}
            </div>
          </>
      )}

          {/* ERRORS HANDLING  */}
          {course.loading === false && course.err != null && (
            <Alert variant="danger" className="p-2">
              {course.err}
            </Alert>
          )}

          {course.loading === false &&
            course.err == null &&
            course.results.length === 0 && (
              <Alert variant="info" className="p-2">
                No course, please try again later !
              </Alert>
            )}
        </div>
        
        </>




      );
}

      export default CoursesInstructor;
