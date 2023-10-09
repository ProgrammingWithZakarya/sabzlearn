import React, { useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert'
import './Comments.css'
export default function Comments() {
    const [comments, setComments] = useState([])
    function getAllDatas() {
        fetch(`http://localhost:4000/v1`)
            .then(res => {
                if (res.ok) {
                    res.json().then(result => setComments(result))
                } else {
                    res.text().then(txt => new Error(txt))
                }
            }).catch(err => {
                console.log(err)
                swal({
                    title: "دیتابیس با مشکل مواجه شد!",
                    icon: "error",
                    buttons: ['ای بابا', 'تلاش دوباره']
                }).then(key => {
                    if (key) {
                        getAllDatas()
                    }
                })
            })
    }
    const showContactBody = (body) => {
        swal({
            title: body,
            buttons: " باشه"
        })
    }
    const acceptComment = (commentID) => {
        swal({
            title: "مطمئنی میوای تائیدش کنی؟",
            icon: "warning",
            buttons: ['ولش کن', 'تائید']
        }).then(answer => {
            if (answer.trim().length) {
                fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    },
                }).then(res => {
                    if (res.ok) {
                        res.json().then(result => {
                            console.log(result)
                            getAllDatas()
                            swal({
                                title: "با موفقیت تائید شد.",
                                icon: 'success',
                                buttons: "باشه"
                            })
                        })
                    } else {
                        res.text().then(txt => new Error(txt))
                    }
                }).catch(err => {
                    console.log(err)
                    swal({
                        title: "دیتابیس با مشکل مواجه شد!",
                        icon: "error",
                        buttons: ['ای بابا', 'تلاش دوباره']
                    }).then(key => {
                        if (key) {
                            acceptComment(commentID)
                        }
                    })
                })
            }
        })
    }
    const answerToComment = (commentID) => {
        swal({
            title: "پاسخ خود را بنویسید.",
            content: "input",
            buttons: ['ولش کن', 'ارسال']
        }).then(answer => {
            if (answer.trim().length) {
                fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    },
                    body: JSON.stringify({ body: answer })
                }).then(res => {
                    if (res.ok) {
                        res.json().then(result => {
                            console.log(result)
                            getAllDatas()
                            swal({
                                title: "با موفقیت ثبت شد.",
                                icon: 'success',
                                buttons: "باشه"
                            })
                        })
                    } else {
                        res.text().then(txt => new Error(txt))
                    }
                }).catch(err => {
                    console.log(err)
                    swal({
                        title: "دیتابیس با مشکل مواجه شد!",
                        icon: "error",
                        buttons: ['ای بابا', 'تلاش دوباره']
                    }).then(key => {
                        if (key) {
                            answerToComment(commentID)
                        }
                    })
                })
            }
        })
    }
    const rejectComment = (commentID) => {
        swal({
            title: "مطمئنی میوای ردش کنی؟",
            icon: "warning",
            buttons: ['ولش کن', 'آره']
        }).then(answer => {
            if (answer.trim().length) {
                fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    },
                }).then(res => {
                    if (res.ok) {
                        res.json().then(result => {
                            console.log(result)
                            getAllDatas()
                            swal({
                                title: "با موفقیت رد شد.",
                                icon: 'success',
                                buttons: "باشه"
                            })
                        })
                    } else {
                        res.text().then(txt => new Error(txt))
                    }
                }).catch(err => {
                    console.log(err)
                    swal({
                        title: "دیتابیس با مشکل مواجه شد!",
                        icon: "error",
                        buttons: ['ای بابا', 'تلاش دوباره']
                    }).then(key => {
                        if (key) {
                            rejectComment(commentID)
                        }
                    })
                })
            }
        })
    }
    const removeComments = (commentID) => {
        swal({
            title: "آیا از حذف کامنت اطمینان داری؟",
            icon: "warning",
            buttons: ['نه', 'آره']
        }).then(key => {
            if (key) {
                fetch(`http://localhost:4000/v1/comments/${commentID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        res.json().then(() => {
                            swal({
                                title: "کامنت مورد نظر با موفقیت حذف شد!",
                                icon: "success",
                            })
                            getAllDatas()
                        })
                    } else {
                        res.text().then(txt => new Error(txt))
                    }
                }).catch(err => {
                    console.log(err)
                    swal({
                        title: "دیتابیس با مشکل مواجه شد!",
                        icon: "error",
                        buttons: ['ای بابا', 'تلاش دوباره']
                    }).then(key => {
                        if (key) {
                            getAllDatas()
                        }
                    })
                })
            }
        })
    }
    const banUser = (userID) => {
        swal({
            title: "واقعا میخوای بنش کنی؟",
            icon: "warning",
            buttons: ['نه ', 'آره']
        }).then(key => {
            if (key) {
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
                    setComments(result)
                }).catch(err => console.log(err))
            }
        })
    }
    return (
        <div>
            {
                comments.length === 0 ?
                    (
                        <div className="alert alert-warning text-center">هیچ کامنتی یافت نشد!</div>
                    ) : (
                        <DataTable title="کامنت ها">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>شناسه</th>
                                        <th>کاربر</th>
                                        <th>دوره</th>
                                        <th>مشاهده</th>
                                        <th>پاسخ</th>
                                        <th>تائید</th>
                                        <th>حذف</th>
                                        <th>بن</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.map((comment, index) => (
                                        <tr>
                                            <td className={comment.answer ? 'hasBeenAnswered' : 'notAnswered'}>{index + 1}</td>
                                            <td>{comment?.creator?.name}</td>
                                            <td>{comment?.creator?.email}</td>
                                            <td>{comment?.creator?.phone}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    class="btn btn-primary edit-btn"
                                                    onClick={() => showContactBody(comment.body)}
                                                >
                                                    مشاهده پیغام
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary edit-btn" onClick={() => answerToComment(comment._id)}>
                                                    پاسخ
                                                </button>
                                            </td>
                                            <td>
                                                {
                                                    comment.answer === 1 ?
                                                        (
                                                            <>
                                                                <button type="button" class="btn btn-primary edit-btn" onClick={() => rejectComment(comment._id)}>
                                                                    حذف
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button type="button" class="btn btn-primary edit-btn" onClick={() => acceptComment(comment._id)}>
                                                                    تائید
                                                                </button>
                                                            </>
                                                        )
                                                }
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-danger delete-btn" onClick={() => removeComments(comment._id)}>
                                                    حذف
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-danger delete-btn" onClick={() => banUser(comment.creator._id)}>
                                                    بن
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </DataTable>
                    )
            }
        </div>
    )
}
