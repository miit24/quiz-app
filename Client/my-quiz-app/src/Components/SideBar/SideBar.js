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
            <a>
              <span className="nav-item__icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="nav-item__text">
                Home
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a>
              <span className="nav-item__icon">
                <ion-icon name="chatbox-outline"></ion-icon>
              </span>
              <span className="nav-item__text">
                Messages
              </span>
            </a>
          </li>

          {userInfo ?<></>: <>
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
              <a>
                <Link to="/create">
                  <span className="nav-item__icon">
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span className="nav-item__text">
                    Sign Up
                  </span>
                </Link>
              </a>
            </li> </> 
          }

        </ul>
        <ul className="nav-list">
          {userInfo && <> <li className="nav-item">
            <a href="#">
              <span className="nav-item__icon avatar">{userInfo.name[0].toUpperCase()}</span>
              <span className="nav-item__text">
                {userInfo.name}
              </span>
            </a>
          </li>
            <li className="nav-item">
              <a>
                <span className="nav-item__icon logout">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="nav-item__text" onClick={logoutHandler}>
                  Logout
                </span>
              </a>
            </li></>
          }
        </ul>
      </div>
    </div>
  )
}

export default SideBar
