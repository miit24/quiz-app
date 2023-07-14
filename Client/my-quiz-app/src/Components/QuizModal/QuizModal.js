import React, { useContext } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import {
    List,
    ListItem,
    ListIcon,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Store } from '../../Store'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Timer from '../Timer/Timer'

function QuizModal({ event }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { setRegID, setEventID } = useContext(Store)
    const navigate = useNavigate()

    const startHandler = () => {
        const reg_ID = uuidv4()
        setRegID(reg_ID)
        setEventID(event.id)
        navigate(`/quiz/${event.id}/${reg_ID}`)
    }

    return (
        <>
            <button className="explore-button" onClick={onOpen}>
                Start
            </button>
            <Modal onClose={onClose} size={"full"} isOpen={isOpen} >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton style={{ color: "black" }} />
                    <ModalBody style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "DimGrey",
                        backgroundColor: "#E0E0E0",
                    }}>

                        <div style={{
                            backgroundColor: "white",
                            border: "10px solid LightGray",
                            borderRadius: "10px",
                            height: "85vh",
                            width: "max-content",
                            margin: "0 1%",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexDirection: "column",
                            padding: "3% 2%"
                        }}>
                            <div>
                                <h2 style={{
                                    textAlign: "center",
                                    fontWeight: "500",
                                    fontSize: "2.7rem",
                                    color: "black"
                                }}
                                >Quiz Rules</h2>
                                <h5
                                    style={{
                                        fontWeight: "400",
                                        fontSize: "1.4rem",
                                    }}
                                >This quiz expires in <span style={{ color: "#404040", }}>{event.minutes} minutes</span></h5>

                            </div>
                            <div>
                                <p style={{
                                    marginBottom: "5%"
                                }}>To prevent cheating, There are couple of rules that you need to follow:</p>
                                <List>
                                    <ListItem><i style={{
                                        margin: "0 2%",
                                        fontSize: "13px",
                                        color: "green"
                                    }} class="bi bi-check-circle-fill"></i>Once you start, you must finish!</ListItem>
                                    <ListItem><i style={{
                                        margin: "0 2%",
                                        fontSize: "13px",
                                        color: "green"
                                    }} class="bi bi-check-circle-fill"></i>Do <span style={{ color: "black", fontWeight: "600" }}>NOT</span> leave the current browser or window tab.</ListItem>
                                    <ListItem><i style={{
                                        margin: "0 2%",
                                        fontSize: "13px",
                                        color: "green"
                                    }} class="bi bi-check-circle-fill"></i>Do <span style={{ color: "black", fontWeight: "600" }}>NOT</span>  reload the page after starting your assessment.</ListItem>
                                    <ListItem><i style={{
                                        margin: "0 2%",
                                        fontSize: "13px",
                                        color: "green"
                                    }} class="bi bi-check-circle-fill"></i>The quiz contains <span style={{ color: "black", fontWeight: "600" }}>{event.total} questions</span>, one mark each.</ListItem>
                                </List>
                            </div>
                            <Button
                                style={{
                                    width: "30%",
                                    backgroundColor: "green",
                                    color: "white"
                                }}
                                onClick={startHandler}
                            >Start Quiz</Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QuizModal
