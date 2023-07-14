import React, { useEffect, useContext } from 'react'
import "../AdminHome/style.css"
import user from "../../../Images/user.png"
import question from "../../../Images/question.jpg"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../../Store'
import Head from "../../../Components/Heading/Head"
import SideBar from "../../../Components/SideBar/SideBar"

function AdminScreen() {
    const navigate = useNavigate()
    const { state } = useContext(Store)
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo) {
            navigate('/home');
        }
    }, [navigate, userInfo]);
    return (
        <div className='admin-body'>
            <Head name="ADMIN PANEL" />
            <SideBar />
            <div className="admin-card-body">
                <div className="admin-card">
                    <Link to="/admin/home/events">
                        <img className="admin-img" src='https://cdn-icons-png.flaticon.com/512/2558/2558944.png' />
                    </Link>
                </div>
                <div className="admin-card"
                >
                    <Link to="/admin/home/questions">
                        <img
                            style={{
                                mixBlendMode:"darken"
                            }}
                            className="admin-img" src={question} />
                    </Link>
                </div>
                <div className="admin-card">
                    <Link>
                        <img className="admin-img" src={user} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminScreen
