import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Store } from '../../Store'
import avatar from "../../Images/register.webp"
import { toast } from 'react-hot-toast'
import axios from 'axios'

function RegisterScreen() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault()

      if (password !== confirmPassword) {
        toast.error("password does not match")
        return
      }
      if (password.length <= 7) {
        toast.error("minimum password lenght 8")
        return
      }
      if (name.length <= 2) {
        toast.error("minimum name length 3")
        return
      }
      if (email.length == 0) {
        toast.error("email empty")
        return
      }

      setLoading(true)
      const { data } = await axios.post("/auth/create", {
        name,
        email,
        password,
      })
      setLoading(false)
      setEmail("")
      setConfirmPassword("")
      setPassword("")
      setName("")
    } catch (error) {
      toast.error(error.response.data.message)
    }



  }


  return (
    <div style={{ margin: "0 30%" }}>
      <form>
        <div className="imgcontainer">
          <img src={avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="container">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required />
          <hr />
          <br />
          <label>
            <input type="checkbox" required />
            {" "} I have read and agree to the <a href="/terms">Terms and Conditions</a>
          </label>
          <button className="submitbtn" onClick={(e) => submitHandler(e)}>Resgister</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterScreen
