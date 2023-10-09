import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import swal from "sweetalert";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();
  const navigate  = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => {
        if(!res.ok){
          res.text().then(txt => new Error(txt))
        } else {
          return res.json()
        }
      })
      .then((allData) => {
        console.log(allData);
        setArticles(allData.allResultArticles);
        setCourses(allData.allResultCourses);
      }).catch(err => {
        console.log(err)
        swal({
          title : "قادر به اتصال  با دیتابیس را نیستیم متاسفانه :(",
          icon : "error",
          buttons :['بازگشت به خانه', "تلاش دوباره" ]
        }).then((key ) => {
          if(key === true ) {
             window.location.reload()
          } else (
            navigate('/')
          )
        })
      })
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه دوره‌ها برای جستجوی شما"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length === 0 ? (
                  <div className="alert alert-warning">
                    دوره‌ای برای جستجوی شما وجود ندارد
                  </div>
                ) : (
                  <>
                    {courses.map((course) => (
                      <CourseBox key={course._id} {...course} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتیجه مقالات برای جستجوی شما"
            desc="پیش به سوی ارتقای دانش"
          />
          <div className="articles__content">
            <div className="row">
              {articles.length === 0 ? (
                <div className="alert alert-warning">
                  مقاله‌ای برای جستجوی شما وجود ندارد
                </div>
              ) : (
                <>
                  {articles.map((article) => (
                    <ArticleBox {...article} key={article._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
