import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import CourseCardStudent from '../../components/CourseCardStudent';
import Alert from 'react-bootstrap/Alert';
import '../../style/course-list-student.css';
import { useParams } from "react-router-dom";
import { Link} from "react-router-dom";
import HeaderStudent from "../shared/HeaderStudent";


export const List = () => {

    const routeId = useParams().id;
    const [courses, setcourses] = useState({
        loading: true,
        results: [],
        error: null,
        reload: 0,
    });
    const [search, setsearch] = useState("");

    useEffect(() => {
        setcourses({ ...courses, loading: true });
        axios
            .get("http://localhost:4000/Courses", {
                params: {
                    search: search,
                },
            })
            .then((resp) => {
                console.log(resp);
                setcourses({
                    ...courses,
                    results: resp.data,
                    loading: false,
                    error: null
                });
            })

            .catch((error) => {
                setcourses({
                    ...courses,
                    loading: false,
                    error: "some thing wrong",
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses.reload]);




    const searchCourse = (e) => {
        e.preventDefault();
        console.log(search);
        setcourses({ ...courses, reload: courses.reload + 1 });
    }
    const [assign, setAssign] = useState({
        success: '',
        err: ''
    });






    return (
    
    <>
    <HeaderStudent/>
    
        <div className="courses">
            {/*loader*/}
            {courses.loading === true && (
                <div className="spin">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {/*list of courses*/}
            {
                courses.loading === false && courses.error === null && (
                    //searsh
                    <div >
                        <div class="search-container">
                            <form onSubmit={searchCourse}>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                                <button type="submit">Search</button>
                                <Link to={"/student/enroll" +"/" +routeId} className='btn btn-success1'>View Courses </Link>


                            </form>
                        </div>

                        {/* table */}


                        <div className="row">
                            {courses.results.map((course) => (
                                <div className="col-3 p-3" key={course.id}>
                                    <CourseCardStudent
                                        name={course.name}
                                        description={course.description}
                                        id={course.id}
                                        code={course.code}
                                        img={course.img}
                                        studentId={routeId}

                                    />
                                </div>
                            ))
                            }
                        </div>


                    </div>
                )
            }

            {/*error handling*/}

            {courses.loading === false && courses.error !== null && (

                <Alert variant="danger" className="p-2">
                    {courses.error}
                </Alert>

            )
            }

            {courses.loading === false &&
                courses.error == null &&
                courses.results.length === 0 && (
                    <Alert variant="info" className="p-2">
                        No course, please try again later !
                    </Alert>
                )}
        </div>
    
</>
    );
};

export default List;





// 