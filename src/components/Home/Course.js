import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourse } from "../Redux/Slice/proudctSlice";
import Loading from "../Utilites/Loading";

const Course = () => {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses);
  const [cetagory, setCetagory] = useState([]);
  const disPatch = useDispatch();
  useEffect(() => {
    const config = {
      headers: { authorization: `Bearer ${localStorage.getItem("UserToken")}` },
    };
    // setshart(true);
    disPatch(fetchCourse());
    axios
      .get(
        "https://ancient-earth-39666.herokuapp.com/api/v1/courses/course",
        config
      )
      .then((res) => setCetagory(res?.data?.course));
  }, []);

  console.log(cetagory);
  const getUniqeData = (data, property) => {
    let SpecficCetagory = data.map((ctgy) => {
      return ctgy[property];
    });

    return (SpecficCetagory = ["All", ...new Set(SpecficCetagory)]);
  };

  const categoryOnlyData = getUniqeData(cetagory, "category");

  const cetagoryFilterDataHendeler = (cetagory) => {
    console.log(cetagory);
    disPatch(fetchCourse(cetagory));
  };
  return (
    <div className="my-5">
      <div className="cardTop"></div>
      <div className="container mt-5">
        <div className="card-section">
          <div className="car">
            <div className="row">
              <div className="col-lg-2">
                <h5>CATEGORY</h5>
                <div className="cardTop mt-2"></div>

                <div className="filterCetagory">
                  {categoryOnlyData.map((cetagory, index) => {
                    return (
                      <p
                        onClick={() => cetagoryFilterDataHendeler(cetagory)}
                        className="my-0"
                        key={index}
                      >
                        {cetagory}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-10">
                <div className="cards">
                  {courses.loading && (
                    <div className=" flex  justify-end">
                      <Loading></Loading>
                    </div>
                  )}
                  {!courses.loading && courses.error ? (
                    <p>{courses.error}</p>
                  ) : (
                    ""
                  )}
                  {!courses.loading && !courses.error ? (
                    <>
                      {courses?.courses?.course?.map((course) => (
                        // <courses key={courses._id} courses={courses}></courses>
                        <Card key={courses._id}>
                          <Card.Img
                            className="cardImg"
                            variant="top"
                            src={course.images[0].url}
                          />
                          <Card.Body>
                            <Card.Title>{course.name}</Card.Title>
                            <h2 className="">{course.price}</h2>
                            <Card.Text>{course.courseTitle}</Card.Text>
                            <Button
                              onClick={() =>
                                navigate(`/course/details/${course._id}`)
                              }
                              variant="warning"
                            >
                              Purches
                            </Button>
                          </Card.Body>
                        </Card>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
