import React, { useCallback, useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import AuthContext from './context/authContext'
import './App.css'
import swal from 'sweetalert'
export default function App() {

  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const login = useCallback((user, token) => {
    setToken(token);
    setIsLoggedIn(true)
    setUserInfos(user)
    localStorage.setItem("user", JSON.stringify(token))
  }, [])
  const logout = useCallback(() => {
    setUserInfos({})
    setToken(null)
    localStorage.removeItem("user")
  })
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    if (localStorageData) {
      fetch('http://localhost:4000/v1/auth/me', {
        headers: {
          "Authorization": `Bearer ${localStorageData.token}`
        }
      }).then(res => {
        if (!res.ok) {
          res.text().then(text => {
            throw new Error(text)
          })
        } else {
          return res.json()
        }
      })
        .then(userData => {
          setIsLoggedIn(true);
          setUserInfos(userData)
        })
        .catch(err =>{
          console.error('app.js =>', err);
          swal({
            title : "متاسفانه پایگاه داده با مشکل مواجه شد!",
            buttons:["ولش کن" , 'بارگذاری دوباره'],
            icon :"warning"
          }).then(key => {
            if (key) {
              window.location.reload()
            } else {
              return
            }
          })
        })
    }
  }, [login])
  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      token,
      userInfos,
      login,
      logout
    }}>
      {router}
    </AuthContext.Provider>
  )
}
