import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Head from '../../../Components/Heading/Head';
import { Store } from '../../../Store';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getError } from '../../../Helper/util';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
} from '@chakra-ui/react'
import AdminQuestionCreate from '../../../Components/Admin-Question-Create/AdminQuestionCreate';
import HtmlDisplay from '../../../Helper/HtmlDisplay';

function SingleQuestion() {
    const { id } = useParams()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [questions, setQuestion] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { state } = useContext(Store)
    const [toggle, setToggle] = useState(true)


    useEffect(() => {
        if (!state.userInfo) {
            navigate("/home")
        }
    }, [])

    useEffect(() => {
        try {
            const callApi = async () => {
                try {
                    setLoading(true)
                    const { data } = await axios.get(`/question/all/${id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${state.userInfo.jwtToken}`
                        }
                    })
                    setLoading(false)
                    setQuestion(data)
                } catch (error) {
                    toast.error(getError(error))
                }
            }
            callApi()
        } catch (error) {
            toast.error(getError(error))
        }
    }, [toggle])

    const deleteHandler = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/question/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.userInfo.jwtToken}`
                }
            })
            setLoading(false)

            setQuestion((prev) => {
                let old = [...prev]
                let original = []
                for (let i = 0; i < old.length; i++) {
                    if (old[i].id !== id) {
                        original.push(old[i])
                    }
                }
                return original;
            })
            toast.success(`Deleted id : ${id}`)
        } catch (error) {
            toast.error(getError(error))
        }
    }

    return (
        <div>
            <Head name={queryParams.get("name") ? queryParams.get("name") : "GENERAL"} />
            <TableContainer>
                <Table variant='striped' colorScheme='yellow'>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Question</Th>
                            <Th>Answer</Th>
                            <Th>Code Snippet</Th>
                            <Th>a</Th>
                            <Th>b</Th>
                            <Th>c</Th>
                            <Th>d</Th>
                            <Th>
                                <Button
                                    colorScheme='blue'
                                    style={{
                                        margin: "0 4%",
                                        width: "10%",
                                        float: "right"
                                    }}
                                >
                                    <AdminQuestionCreate setToogle={setToggle} id={id} />
                                </Button>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            questions?.map((question, i) => {
                                return (
                                    <Tr key={question.id}>
                                        <Td>{i + 1}</Td>
                                        <Td>{question.question}</Td>
                                        <Td
                                            style={{

                                            }}
                                        >{question.answer}</Td>
                                        <Td>{question.codeSnippet ? <HtmlDisplay htmlText={question.codeSnippet} /> : "-"}</Td>
                                        <Td>{question.a}</Td>
                                        <Td>{question.b}</Td>
                                        <Td>{question.c}</Td>
                                        <Td>{question.d}</Td>
                                        <Td>
                                            <Button
                                                className='btn-update'
                                                style={{
                                                    margin: "0 4%",
                                                    backgroundColor: "green",
                                                    width: "fitContent",
                                                    color: "white"
                                                }}>
                                                Update
                                            </Button>
                                            <Button
                                                className='btn-delete'
                                                style={{
                                                    backgroundColor: "red",
                                                    width: "fitContent",
                                                    color: "white"
                                                }}
                                                onClick={() => deleteHandler(question.id)}
                                            >Delete</Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SingleQuestion
