import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Contact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts()
    }, []);
    function getAllContacts () {
        fetch("http://localhost:4000/v1/contact")
            .then((res) => {
                if(res.ok) {
                    res.json().then(result => setContacts(result))
                }else {
                    res.text().then(txt => new Error(txt))
                }
            }).catch(err => {
                console.log(err)
                swal({
                    title : "صفحه بدرستی بارگذاری نشد.",
                    icon : "error",
                    buttons : ['ولش کن' ,'تلاش دوباره']
                }).then(key => {
                    if(key){
                        getAllContacts()
                    }
                })
            })
            .then((allContacts) => {
                console.log(allContacts);
                setContacts(allContacts);
            })
    }
    const showContactBody = (body) => {
        swal({
            title: body,
            buttons: "اوکی",
        });
    };
    const sendAnwserToUser = (contactEmail) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title: "متن پاسخ را وارد کنید",
            content: 'input',
            buttons: "ارسال ایمیل"
        }).then(value => {
            if (value.trim().length) {
                console.log(value);
                const anwserInfo = {
                    email: contactEmail,
                    answer: value
                }
                fetch('http://localhost:4000/v1/contact/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${localStorageData.token}`
                    },
                    body: JSON.stringify(anwserInfo)
                }).then(res => {
                    console.log(res);
                    if (res.ok) {
                        return res.json()
                    }
                }).then(result => console.log(result))
            } else {
                swal({
                    title: "مقدار ورودی معتبر نیست",
                    icon: "warning",
                }).then(key => {
                    sendAnwserToUser(contactEmail)
                })
            }
        })
    }
    const removeContact =(contactID) => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        swal({
            title : "واقعا میخوای حذفش کنی!",
            icon : "warning",
            buttons : ['نه ','اره']
        }).then(key => {
            if(key){
                fetch(`http://localhost:4000/v1/contact/${contactID}` ,{
                    method : "DELETE",
                    headers : {
                        Authorization :  `Bearer ${localStorageData?.token}`
                    },
                }).then(res => {
                    if(res.ok) {
                       swal({
                        title : 'پیغام مورد نظر با موفقیت حذف شد!',
                        icon  :"success",
                        buttons :"حله"
                       })
                       getAllContacts()
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    }
    return (
        <>
            <DataTable title="پیغام‌ها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>نام و نام خانوادگی</th>
                            <th>ایمیل</th>
                            <th>شماره تماس</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length && contacts.map((contact, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary edit-btn"
                                        onClick={() => showContactBody(contact.body)}
                                    >
                                        مشاهده پیغام
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary edit-btn" onClick={() => sendAnwserToUser(contact.email)}>
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger delete-btn" onClick={() => removeContact(contact._id)}>
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    );
}
