import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Head from '../../../Components/Heading/Head';
import { Store } from '../../../Store';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getError } from '../../../Helper/util';

function SingleQuestion() {
    const { id } = useParams()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [questions, setQuestion] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { state } = useContext(Store)


    useEffect(() => {
        if (!state.userInfo) {
            navigate("/home")
        }
    }, [])

    useEffect(() => {
        try {
            const callApi = async () => {
                setLoading(true)
                const { data } = await axios.get(`/question/all/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${state.userInfo.jwtToken}`
                    }
                })
                setLoading(false)
                setQuestion(data)
            }
            callApi()
        } catch (error) {
            toast.error(getError(error))
        }
    }, [])

    return (
        <div>
            <Head name={queryParams.get("name") ? queryParams.get("name") : "GENERAL"} />

        </div>
    )
}

export default SingleQuestion
