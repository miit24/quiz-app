import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast';
import { Store } from '../../Store'
import axios from 'axios'
import "./style.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { dispatch } = useContext(Store);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const buttonRef = useRef(null)


    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const { data } = await axios.post("/auth/login", {
                email,
                password
            });
            setPassword("")
            setEmail("")
            if (data.jwtToken) {
                setLoading(false)
                dispatch({ type: 'USER_SIGNIN', payload: data })
                localStorage.setItem("userInfo", JSON.stringify(data))
                toast.success("Login Successful")
                return
            }
            toast.error(data)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="modal">
            <span onClick={onOpen}>Login</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form>
                        <div className="imgcontainer">
                            <img src="https://img1.cgtrader.com/items/4259562/fcc1f1114a/3d-avatar-profession-as-graduate-student-3d-model-fcc1f1114a.jpg" alt="Avatar" className="avatar" />
                        </div>
                        <div className="container">
                            <label><b>Email</b></label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />

                            <label><b>Password</b></label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required />
                            <button className="submitbtn" onClick={(e) => submitHandler(e)}>Login</button>
                            <span className="psw" style={{ color: "blue", float: "left", bottom: "5px" }}><Link to="/create">Sign Up ?</Link></span>
                        </div>
                    </form>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default Login
