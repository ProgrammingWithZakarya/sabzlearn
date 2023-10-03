import React, { useEffect, useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Footer from "./../../Components/Footer/Footer";
import swal from 'sweetalert'
import "./Category.css";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";

export default function Category() {
  const [categoryTitle, setCategoryTitle] = useState()
  const [courses, setCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [orderedCourses, setOrderedCourses] = useState([])
  const [status, setStatus] = useState('')
  const { categoryName } = useParams()
  const [searchValue , setSearchValue] = useState('')
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => {
        if (!res.ok) {
          res.text().then(text => {
            throw new Error(text)
          })
        } else {
          return res.json()
        }
      }).then(allCourses => {
        setCourses(allCourses)
        setOrderedCourses(allCourses)
      }).catch(err => {
        console.log(err)
        swal({
          title: "با مشکل برخوردیم =_=",
          text: "متاسفانه دیتابیس با مشکلی مواجه شد .",
          buttons: ['ولش کن', 'بارگذاری دوباره'],
          icon: "error"
        }).then(key => key && window.location.reload())
      })
  }, [categoryName])
  // ////////////////
  useEffect(() => {
    if (status === 'default') {
      setOrderedCourses(courses)
    } else if (status === 'first') {
      setOrderedCourses(courses.slice().reverse())
    } else if (status === 'last') {
      setOrderedCourses(courses)
    } else if (status === 'free') {
      setOrderedCourses(courses.filter(course => course.price === 0))
    } else if (status === 'money') {  
      setOrderedCourses(courses.filter(course => course.price !== 0))
    }
  }, [status])
  const searchCoursesHandler = (event) => {
    setSearchValue(event.target.value);
    let filteredCourses = courses.filter(course => course.name.includes(event.target.value))
    setOrderedCourses(filteredCourses)
  }
  return (
    <>
      <Topbar />
      <Navbar />
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div className="courses-top-bar__column-btn">
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>
              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {" "}
                  {categoryTitle}
                  {" "}
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li
                    onClick={(e) => {
                      setCategoryTitle(e.target.textContent)
                      setStatus('default')
                    }}
                    className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li
                    onClick={(e) => {
                      setCategoryTitle(e.target.textContent)
                      setStatus('first')
                    }}
                    className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس اولین
                  </li>
                  <li
                    onClick={(e) => {
                      setCategoryTitle(e.target.textContent)
                      setStatus('last')
                    }}
                    className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس آخرین
                  </li>
                  <li
                    onClick={(e) => {
                      setCategoryTitle(e.target.textContent)
                      setStatus('free')
                    }}
                    className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس رایگان
                  </li>
                  <li
                    onClick={(e) => {
                      setCategoryTitle(e.target.textContent)
                      setStatus('aPrice')
                    }}
                    className="courses-top-bar__selection-item">
                    مرتب سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>
            <div className="courses-top-bar__left">
              <form action="##" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  value={searchValue}
                  onChange={searchCoursesHandler}
                />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {
                  courses.length ? (
                    <div className="alert alert-warning">
                      هیچ دوره ای برای
                      {' '} {categoryTitle} {' '}
                      وجود ندارد!
                    </div>
                  ) : (
                    <>
                      <CourseBox />
                      <CourseBox />
                      <CourseBox />
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <Pagination
            items={[0, 1, 2, 3, 4, 5, 6, 7]}
            itemsCount={3}
            pathname='/category-info/'
            setShownCourses={setCategoryTitle}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
