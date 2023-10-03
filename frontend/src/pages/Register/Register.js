import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import "./../../styles/FormPage.css";
import { useForm } from "../../Hooks/useForm";
import AuthContext from "../../context/authContext";
export default function Register() {
  const authContext = useContext(AuthContext)
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
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const registerNewUser = (event) => {
    event.preventDefault()
    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.confirmPassword.value,
    }
    fetch('http://localhost:4000/v1/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserInfos),
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text)
          })
        } else {
          console.log('res =>', res)
          return res.json()
        }
      }).then(result => {
        console.log(result);
        authContext.login(result.user, result.accessToken)
      }).catch(err => {
        console.log(err)
        alert("متاسفانه دیتابیس با مشکل مواجه شد .")
      })
  }
  return (
    <>
      <Topbar />
      <section className="login-register">
        <div className={`login register-form ${!formState.isFormValid && "login-error"}`}>
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="##" className="login-form">
            <div className="login-form__username">
              <Input
                type="text"
                id='name'
                placeholder="نام و نام خانوادگی"
                className={`login-form__username-input ${formState.inputs.name.isValid ? 'inputIsValid' : "inputInValid"}`}
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <Input
                type="text"
                id='username'
                placeholder="نام کاربری"
                className={`login-form__username-input ${formState.inputs.username.isValid ? 'inputIsValid' : "inputInValid"}`}
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="text"
                id='email'
                placeholder="آدرس ایمیل"
                className={`login-form__username-input ${formState.inputs.email.isValid ? 'inputIsValid' : "inputInValid"}`}
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator()
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="password"
                id="password"
                placeholder="رمز عبور"
                className={`login-form__username-input ${formState.inputs.password.isValid ? 'inputIsValid' : "inputInValid"}`}
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <div className="login-form__password">
              <Input
                type="password"
                id="confirmPassword"
                placeholder="تکرار رمز عبور"
                className={`login-form__username-input ${formState.inputs.confirmPassword.isValid ? 'inputIsValid' : "inputInValid"}`}
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <Button
              className={`login-form__btn ${formState.isFormValid ? "login-form__btn-success" : "login-form__btn-error"}`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}>
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
