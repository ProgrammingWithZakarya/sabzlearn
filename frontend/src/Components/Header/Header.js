import React, { useEffect, useState } from "react";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";

import "./Header.css";

export default function Header() {
  const [indexInfo , setIndexInfo] = useState({})
  useEffect(()=> {
    fetch(`http://localhost:4000/v1/infos/index`)
    .then(res => {
      if(res.ok){ 
        res.json().then(result => setIndexInfo(result))
      } else { 
        res.text().then(txt => new Error(txt))
      }
    }).catch(err => console.log(err))
  } ,[])
  return (
    <header className="header">
        <Topbar infos={indexInfo}/>
        <Navbar />
        <Landing infos={indexInfo}/>
    </header>
  );
}
