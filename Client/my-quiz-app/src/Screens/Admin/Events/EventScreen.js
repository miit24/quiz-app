import React, { useContext, useState } from 'react'
import { Store } from '../../../Store'
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
import Head from '../../../Components/Heading/Head'
import "../Events/style.css"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getError } from '../../../Helper/util'
import AdminUpdateForm from '../../../Components/Admin-Update/AdminUpdateForm'

function EventScreen() {
    const { events, setEvents, setChange, state } = useContext(Store)
    const { userInfo } = state;
    const [loading, setLaoding] = useState(true)

    const deleteHandler = async (id) => {
        try {
            setLaoding(true)
            const { data } = await axios.get(`/category/delete/${id}`, {
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.jwtToken}`
                }
            })
            setLaoding(false)
            setEvents((prev) => {
                let old = [...prev]
                let original = []
                for (let i = 0; i < old.length; i++) {
                    if (old[i].id !== id) {
                        original.push(old[i]);
                    }
                }
                return original
            })
            setChange(prev => {
                return !prev
            });
            toast.success(`Successfully deleted id:${data}`)
        } catch (error) {
            toast.error(getError(error))
        }
    }

    return (
        <div>
            <Head name="EVENTS" />
            <TableContainer>
                <Table variant='striped' colorScheme='yellow'>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Image</Th>
                            <Th>Minutes</Th>
                            <Th>Total</Th>
                            <Th>
                                <Button
                                    colorScheme='blue'
                                    style={{
                                        margin: "0 4%",
                                        width: "10%",
                                        float: "right"
                                    }}
                                >
                                    <AdminUpdateForm
                                        choice={false}
                                    ></AdminUpdateForm>
                                </Button>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            events.map(event => {
                                return (
                                    <Tr key={event.id}>
                                        <Td>{event.id}</Td>
                                        <Td>{event.name}</Td>
                                        <Td
                                            style={{
                                                
                                            }}
                                        >{event.description}</Td>
                                        <Td><img src={event.image} /></Td>
                                        <Td>{event.minutes}</Td>
                                        <Td>{event.total}</Td>
                                        <Td>
                                            <Button
                                                className='btn-update'
                                                style={{
                                                    margin: "0 4%",
                                                    backgroundColor: "green",
                                                    width: "fitContent",
                                                    color: "white"
                                                }}>
                                                <AdminUpdateForm
                                                    event={event}
                                                    choice={true}
                                                >
                                                </AdminUpdateForm>
                                            </Button>
                                            <Button
                                                className='btn-delete'
                                                style={{
                                                    backgroundColor: "red",
                                                    width: "fitContent",
                                                    color: "white"
                                                }}
                                                onClick={() => deleteHandler(event.id)}
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

export default EventScreen
