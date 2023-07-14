import React, { useContext, useEffect, useRef, useState } from 'react'
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
import JoditEditor from 'jodit-react'

function AdminQuestionCreate({ setToogle, id }) {
    const [q, setQ] = useState("")
    const [answer, setAnswer] = useState("")
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [d, setD] = useState("")
    const [codeSnippet, setCodeSnipper] = useState("")
    const [loading, setLoading] = useState(false)
    const { state } = useContext(Store);
    const { userInfo } = state
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const editor = useRef(null)

    useEffect(() => {
        if (!userInfo) {
            navigate('/home');
        }
    }, [navigate]);

    const createHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post("/question/create", {
                question: q,
                answer,
                a,
                b,
                c,
                d,
                codeSnippet,
                category: {
                    id
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.jwtToken}`
                }
            })
            setLoading(false)
            setToogle((prev) => {
                return !prev;
            })
            toast.success(`Created successfully id : ${data.id}`)
            setA("")
            setB("")
            setC("")
            setD("")
            setAnswer("")
            setCodeSnipper("")
            setQ("")
            document.getElementById("closebtn").click()
        } catch (error) {
            toast.error(getError(error))
        }
    }

    return (
        <div className="modal">

            <span onClick={onOpen}> <i
                className="bi bi-plus-circle"
                style={{
                    fontSize: "1.2rem"
                }}
            ></i></span>
            <Modal isOpen={isOpen} onClose={onClose}>

                <ModalOverlay />
                <ModalContent>
                    <Head name="CREATE" />
                    <form>
                        <div className="container">
                            <label><b>Question</b></label>
                            <input
                                type="text"
                                placeholder="Enter question"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                required />

                            <label><b>A</b></label>
                            <input
                                type="text"
                                placeholder="Enter a"
                                value={a}
                                onChange={e => setA(e.target.value)}
                                required />
                            <label><b>B</b></label>
                            <input
                                type="text"
                                placeholder="Enter b"
                                value={b}
                                onChange={e => setB(e.target.value)}
                                required />
                            <label><b>C</b></label>
                            <input
                                type="text"
                                placeholder="Enter c"
                                value={c}
                                onChange={e => setC(e.target.value)}
                                required />
                            <label><b>D</b></label>
                            <input
                                type="text"
                                placeholder="Enter d"
                                value={d}
                                onChange={e => setD(e.target.value)}
                                required />
                            <label><b>Answer</b></label>
                            <input
                                type="text"
                                placeholder="Enter answer"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                required />
                            <label><b>Code Snippet</b></label>
                            {/* <input
                                type="text"
                                placeholder="Enter code snippet"
                                value={codeSnippet}
                                onChange={e => setCodeSnipper(e.target.value)}
                                required /> */}
                            <JoditEditor
                                ref={editor}
                                value={codeSnippet}
                                // onChange={e => setCodeSnipper(e.target.value)}
                                onBlur={newContent => setCodeSnipper(newContent)}
                            />
                            <Button
                                className="submitbtn"
                                style={{
                                    backgroundColor: "#e6d347"
                                }}
                                onClick={(e) => createHandler(e)}>Create</Button>
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

export default AdminQuestionCreate

