import React from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Input from "../../Components/Form/Input";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import '../../styles/FormPage.css';
import './Contact.css'
import Button from "../../Components/Form/Button";
import { useForm } from "../../Hooks/useForm";
import swal from "sweetalert";

export default function Contact() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phoneNumber: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const addNewContact = (e) => {
    e.preventDefault();
    const newContantInfo = {
      name : formState.inputs.name.value,
      email : formState.inputs.email.value,
      phoneNumber : formState.inputs.phoneNumber.value,
      body : formState.inputs.body.value,
    }
    fetch('http://localhost:4000/v1/contact' , {
      method : "POST" ,
      headers : {
        "Content-Type"  : "application/json"
      } ,
      body  : JSON.stringify(newContantInfo)
    }).then(res => {
      if(!res.ok) {
        res.text().then(txt => {
          throw new Error(txt)
        })
      } else {
        return res.json()
      }
    }).then(result => {
       swal({
          title : "پیغام شما با موفقیت ارسال شد :)",
          buttons : ["بازگشت به خانه"],
          icon :"success"
        }).then(() => {
          navigator('/')
        })
        console.log(result)
        console.log("درخواست شما برای مدیران سایت ارسال شد");
    }).catch(err => {
      console.log(err)
      swal({
        icon: "error",
        title: "متاسفانه دیتابیس مشکل داره :(",
        buttons: ['تلاش دوباره']
      })
    })
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <section className="login-register">
        <div className={`login register-form ${!formState.isFormValid && 'login-error'}`}>
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[requiredValidator(), minValidator(6), maxValidator(20)]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[requiredValidator(), minValidator(8), maxValidator(40), emailValidator()]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                id="phoneNumber"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[requiredValidator(), minValidator(10), maxValidator(11)]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${formState.isFormValid
                ? "login-form__btn-success"
                : "login-form__btn-error"
                }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
