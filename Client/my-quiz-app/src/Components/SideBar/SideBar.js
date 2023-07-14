import React, { useContext } from 'react'
import "./style.css"
import Login from '../Login/Login'
import { Store } from '../../Store'
import RegisterScreen from '../Register/RegisterScreen'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function SideBar() {
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" })
    localStorage.removeItem("userInfo");
    toast.success("Logout Successful!")
  }

  return (
    <div>
      <div className="sidebar">
        <div className="brand">
          <p>Q<span>uizzyBee</span></p>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home">
              <span className="nav-item__icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="nav-item__text">
                Home
              </span>
            </Link>
          </li>
          {userInfo && userInfo.name === "miit" &&
            <li className="nav-item">
              <Link to="/admin/home">
                <span className="nav-item__icon">
                  <ion-icon name="chatbox-outline"></ion-icon>
                </span>
                <span className="nav-item__text">
                  Admin
                </span>
              </Link>
            </li>
          }
          {userInfo ? <>
            <li className="nav-item">
              <Link to="/participate">
                <span className="nav-item__icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="nav-item__text">
                  Participation
                </span>
              </Link>
            </li>
          </> : <>
            <li className="nav-item">
              <a>
                <span className="nav-item__icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span className="nav-item__text">
                  <Login></Login>
                </span>
              </a>
            </li>
            <li className="nav-item">
              <Link to="/create">
                <span className="nav-item__icon">
                  <ion-icon name="people-outline"></ion-icon>
                </span>
                <span className="nav-item__text">
                  Sign Up
                </span>
              </Link>
            </li> </>
          }

        </ul>
        <ul className="nav-list">
          {userInfo && <> <li className="nav-item">
            <a href='/home'>
              <span className="nav-item__icon avatar">{userInfo.name ? userInfo.name[0].toUpperCase() : "A"}</span>
              <span className="nav-item__text">
                {userInfo.name}
              </span>
            </a>
          </li>
            <li className="nav-item">
              <span className="nav-item__icon logout">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="nav-item__text" onClick={logoutHandler}>
                Logout
              </span>
            </li></>
          }
        </ul>
      </div>
    </div>
  )
}

export default SideBar
