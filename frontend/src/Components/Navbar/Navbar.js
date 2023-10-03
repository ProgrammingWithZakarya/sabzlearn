import React, { useContext } from "react";
import "./Navbar.css";
import AuthContext from "../../context/authContext";
import Button from "../Form/Button";
export default function Navbar() {
  const authContext = useContext(AuthContext)
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <Button to='/'>
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
              />
              </Button>
            <ul className="main-header__menu">
              <li className="main-header__item">
                <Button to="/" className="main-header__link">
                  صفحه اصلی
                </Button>
              </li>
              <li className="main-header__item">
                <Button to="/course-info/frontend" className="main-header__link">
                  فرانت اند
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/html-course" className="main-header__dropdown-link">
                        آموزش Html
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/css-course" className="main-header__dropdown-link">
                        آموزش Css
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/js-course" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/flexbox-course" className="main-header__dropdown-link">
                        آموزش FlexBox
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/reactJS-course" className="main-header__dropdown-link">
                        آموزش جامع ری‌اکت
                      </Button>
                    </li>
                  </ul>
                </Button>
              </li>
              <li className="main-header__item">
                <Button to="/course-info/security" className="main-header__link">
                  امنیت
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/linux-course" className="main-header__dropdown-link">
                        آموزش کالی لینوکس
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/blackPython-course" className="main-header__dropdown-link">
                        آموزش پایتون سیاه
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/balckJS-course" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت سیاه
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/network-course" className="main-header__dropdown-link">
                        آموزش شبکه
                      </Button>
                    </li>
                  </ul>
                </Button>
              </li>
              <li className="main-header__item">
                <Button to="/articles" className="main-header__link">
                  مقالات
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/webDevelopment-article" className="main-header__dropdown-link">
                        توسعه وب
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/JS-articles" className="main-header__dropdown-link">
                        جاوا اسکریپت
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/aboutFrontEnd-article" className="main-header__dropdown-link">
                        فرانت اند
                      </Button>
                    </li>
                  </ul>
                </Button>
              </li>
              <li className="main-header__item">
                <Button to="/course-info/python" className="main-header__link">
                  پایتون
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/expressPython-course" className="main-header__dropdown-link">
                        دوره متخصص پایتون
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/AIWithPython-course" className="main-header__dropdown-link">
                        دوره هوش مصنوعی با پایتون
                      </Button>
                    </li>
                    <li className="main-header__dropdown-item">
                      <Button to="/course-info/expert-django-course" className="main-header__dropdown-link">
                        دوره متخصص جنگو
                      </Button>
                    </li>
                  </ul>
                </Button>
              </li>
              <li className="main-header__item">
                <Button to="/course-info/softSkills" className="main-header__link">
                  مهارت های نرم
                </Button>
              </li>
            </ul>
          </div>
          <div className="main-header__left">
            <Button to="/" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </Button>
            <Button to='/cart' className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </Button>
            <Button to='/login' className="main-header__profile">
              <span className="main-header__profile-text">{authContext.inLoggedIn ? authContext.userInfos.name :'ورود / ثبت نام'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
