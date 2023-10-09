import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "./../../../validators/rules";


export default function Users() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [users, setUsers] = useState([])
  useEffect(() => {
    getAllUsers()
  }, [])
  function getAllUsers() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:400/v1/users', {
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
      setUsers(result)
    }).catch(err => console.log(err))
  }
  const deleteUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    swal({
      icon: 'warning',
      title: "واقعا میخوای حذفش کنی",
      buttons: ['نمیخوام', 'حذفش کن']
    }).then(key => {
      if (key) {
        fetch(`http://localhost:4000/v1/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData?.token}`
          }
        }).then(res => {
          if (!res.ok) {
            res.text().then(txt => new Error(txt))
          } else {
            return res.json()
          }
        }).then(result => {
          console.log(result)
          getAllUsers()
          swal({
            icon: "success",
            title: "کاربر با موفقیت حذف شد ;)",
            buttons: "باشه"
          })
        }).catch(err => {
          console.log(err)
          getAllUsers()
        })
      }
    })
  }
  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:400/v1/users/ban/${userID}`, {
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
      setUsers(result)
    }).catch(err => console.log(err))
  }
  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
    };
    fetch('http://localhost:4000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then(res => {
      if(!res.ok) {
        res.text().then(txt => new Error(txt))
      }else {
       return res.json()
      }
    }).then(result => {
      console.log(result);
      getAllUsers()
    }).catch(err => {
      console.log(err)
      swal({
        icon: "error",
        title : "متاسفانه دیتابیس با مشکل مواجه شد :(" ,
        buttons : "ای بابا"
      })
    })
  };

  return (
    <>
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                className=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                className=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                className=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                className=""
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        {
          users.length === 0 ? (
            <div className="alert alert-warning text-center">
              کاربری یافت نشد !
            </div>
          ) : (

            <table class="table">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>نام</th>
                  <th>نام خانوادگی</th>
                  <th>شماره</th>
                  <th>ایمیل</th>
                  <th>رمز عبور</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                  <th>بن</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <button type="button" class="btn btn-primary edit-btn">
                          ویرایش
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger delete-btn" onClick={() => deleteUser(user.id)}>
                          حذف
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-danger delete-btn" onClick={() => banUser(user.id)}>
                          بن
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
      </DataTable>
    </>
  );
}
