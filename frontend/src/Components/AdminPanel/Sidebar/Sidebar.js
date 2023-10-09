import React, { useContext } from "react";
import './Sidebar.css'
import Button from "../../Form/Button";
import AuthContext from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const contextData = useContext(AuthContext)
  const navigate = useNavigate()
  const logoutAdmin = (e) => {
    e.preventDefault()
    contextData.logout()
    navigate('/')
  }
  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <Button to="/">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Button>
        </div>
        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
            <Button to="#">
              <span>صفحه اصلی</span>
            </Button>
          </li>
          <li>
            <Button to="courses">
              <span>دوره ها</span>
            </Button>
          </li>
          <li>
            <Button to="sessions">
              <span>جلسه ها</span>
            </Button>
          </li>
          <li>
            <Button to="menus">
              <span>منو ها</span>
            </Button>
          </li>
          <li>
            <Button to="articles">
              <span>مقاله ها</span>
            </Button>
          </li>
          <li>
            <Button to="users">
              <span>کاربران</span>
            </Button>
          </li>
          <li>
            <Button to="comments">
              <span>کامنت ها</span>
            </Button>
          </li>
          <li>
            <Button to="offCodes">
              <span>کدهای تخفیف</span>
            </Button>
          </li>
          <li>
            <Button to="categories">
              <span>دسته‌بندی‌ها</span>
            </Button>
          </li>
          <li>
            <Button to="contact">
              <span>پیغام ها</span>
            </Button>
          </li>
          <li onClick={(e) => logoutAdmin(e)}>
            <Button to="categories">
              <span>خروج</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
