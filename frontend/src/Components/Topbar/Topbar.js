import React, { useEffect, useState } from "react";

import "./Topbar.css";
import Button from "../Form/Button";

export default function Topbar() {
  const [allTopbarLinks, setAllTopbarLinks] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus/topbar")
      .then(res => {
        if (!res.ok) {
          res.text().then(text => {
            throw new Error(text)
          })
        } else {
          return res.json()
        }
      }).then(result => {
        console.log(result)
        setAllTopbarLinks(result)
      })
      .catch(err => console.log(err))
  }, [])
  const getRandomItemsFromArray = (arr, count) => {
    if(!arr.length === 0){
      const shuffled = [...arr].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    } else {
      return [{_id:"undefined"  , title :"صفحه بدرستی بارگذاری نشده است!" ,href :"/"  }]
    }
  }
  return (
    <div className="top-bar" >
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {
                getRandomItemsFromArray(allTopbarLinks, 5).map(link => (
                  <li id={link._id} className="top-bar__item">
                    <Button to={link.href} className="top-bar__link">
                      {link.title}
                    </Button>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="##" className="top-bar__email-text top-bar__link">
                sabzlearn@gmail.com
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="##" className="top-bar__phone-text top-bar__link">
                09921558293
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
