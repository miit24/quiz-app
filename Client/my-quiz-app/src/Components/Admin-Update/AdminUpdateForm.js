import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Store } from '../../Store'
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { getError } from '../../Helper/util';
import Head from '../Heading/Head';
import { useNavigate } from 'react-router-dom';

function AdminUpdateForm({ event, choice }) {
    const [name, setName] = useState(event ? event.name : "")
    const [image, setImage] = useState(event ? event.image : "")
    const [description, setDescription] = useState(event ? event.description : "")
    const [total, setTotal] = useState(event ? event.total : 0)
    const [minutes, setMinutes] = useState(event ? event.minutes : 0)
    const [loading, setLoading] = useState(false)
    const { state, setChange } = useContext(Store);
    const { userInfo } = state
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo) {
            navigate('/home');
        }
    }, [navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.put("/category/update", {
                id: event.id,
                name,
                image,
                description,
                total,
                minutes
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.jwtToken}`
                }
            })
            setLoading(false)
            setChange((prev) => {
                return !prev
            })
            toast.success(`Update successfully id : ${data.id}`)
            document.getElementById("closebtn").click()
        } catch (error) {
            toast.error(getError(error))
        }
    }

    const createHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post("/category/create", {
                name,
                image,
                description,
                total,
                minutes
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.jwtToken}`
                }
            })
            setLoading(false)
            setChange((prev) => {
                return !prev
            })
            toast.success(`Created successfully id : ${data.id}`)
            document.getElementById("closebtn").click()
        } catch (error) {
            toast.error(getError(error))
        }
    }

    return (
        <div className="modal">

            <span onClick={onOpen}>{choice ? "Update" : <i
                className="bi bi-plus-circle"
                style={{
                    fontSize: "1.2rem"
                }}
            ></i>}</span>
            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <Head name={choice ? "UPDATE" : "CREATE"} />
                    <form>
                        <div className="container">
                            <label><b>Name</b></label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />

                            <label><b>Description</b></label>
                            <input
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required />
                            <label><b>Image</b></label>
                            <input
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                required />
                            <label><b>Total</b></label>
                            <input
                                type="number"
                                placeholder="Enter total"
                                value={total}
                                onChange={e => setTotal(e.target.value)}
                                required />
                            <label><b>Minutes</b></label>
                            <input
                                type="number"
                                placeholder="Enter minutes"
                                value={minutes}
                                onChange={e => setMinutes(e.target.value)}
                                required />
                            {
                                choice ? <Button
                                    className="submitbtn"
                                    style={{
                                        backgroundColor: "#e6d347"
                                    }}
                                    onClick={(e) => submitHandler(e)}>Update</Button> :
                                    <Button
                                        className="submitbtn"
                                        style={{
                                            backgroundColor: "#e6d347"
                                        }}
                                        onClick={(e) => createHandler(e)}>Create</Button>
                            }
                            <Button
                                onClick={onClose}
                                style={{
                                    display: "none"
                                }}
                                id="closebtn"
                            >
                                Close
                            </Button>
                        </div>
                    </form>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default AdminUpdateForm
