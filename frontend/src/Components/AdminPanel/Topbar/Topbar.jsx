import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function Topbar() {
  const [isShowNotificationBox, setIsShowNotificationBox] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [adminInfos, setAdminInfos] = useState({})
  useEffect(() => getDatas(), [])
  function getDatas() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData?.token}`
      }
    }).then(res => {
      if (!res.ok) {
        res.text().then(txt => {
          throw new Error(txt)
        })
      } else {
        return res.json()
      }
    }).then(data => {
      console.log(data)
      notifications(data.notifications)
      setAdminInfos(data)
    }).catch(err => {
      console.log(err)
      swal({
        title: "متاسفانه با خطا مواجه شدیم :( ",
        icon: "error",
        buttons: ['ولش کن', 'تلاش دوباره']
      }).then((key) => {
        if (key) {
          getDatas()
        }
      })
    })
  }
  function seeNotification(notiID) {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/notifications/see/${notiID}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorageData?.token}`
      }
    }).then(res => {
      if (!res.ok) {
        res.text().then(txt => {
          throw new Error(txt)
        })
      } else {
        return res.json()
      }
    }).then(result => {
      console.log(result)
    }).catch(err => console.log(err))
  }
  return (
    <div class="container-fluid">
      <div class="container">
        <div class={`home-header ${isShowNotificationBox && 'active-modal-notification'}`}>
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button type="button" onMouseEnter={() => setIsShowNotificationBox(true)}>
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationBox(true)}
              onMouseLeave={() => setIsShowNotificationBox(false)}
            >
              <ul class="home-notification-modal-list">
                {notifications.length === 0 ? (
                  <>
                    <li class="home-notification-modal-item">
                      <span class="home-notification-modal-text">پیغامی وجود نداره :)</span>
                      <label class="switch">
                        <a href="javascript:void(0)"></a>
                      </label>
                    </li>
                  </>
                ) : (
                  <>{
                    notifications.map(noti => (
                      <li class="home-notification-modal-item">
                        <span class="home-notification-modal-text">{noti}</span>
                        <label class="switch">
                          <a href="javascript:void(0)">دیدم</a>
                        </label>
                      </li>
                    ))}
                  </>
                )
                }
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#">
                  <img src="/images/profile.png" alt="" />
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">محمدامین سعیدی راد</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
