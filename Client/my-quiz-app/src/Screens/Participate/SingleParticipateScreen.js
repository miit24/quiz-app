import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import "../Participate/style.css"
import axios from 'axios'
import { Store } from '../../Store'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getError } from '../../Helper/util'
import LoadingBox from "../../Components/LoadingBox/LoadingBox"

const month = {
    0: "JAN",
    1: "FEB",
    2: "MAR",
    3: "APR",
    4: "MAY",
    5: "JUN",
    6: "JUL",
    7: "AUG",
    8: "SEPT",
    9: "OCT",
    10: "NOV",
    11: "DEC"
}

function SingleParticipateScreen() {
    const [particates, setParticipates] = useState([])
    const [loading, setLoading] = useState(false)
    const { state } = useContext(Store)
    const { userInfo } = state
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    useEffect(() => {
        if (!userInfo || !userInfo.jwtToken) {
            navigate("/home")
            return
        }

        const callApi = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/exam/find/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${userInfo.jwtToken}`
                    }
                })
                setLoading(false)
                setParticipates(data)
            } catch (error) {
                toast.error(getError(error))
            }
        }
        callApi()
    }, [userInfo])


    return (
        <>
            {
                loading ? <LoadingBox /> :
                    <div>
                        <SideBar />
                        <h2 style={{
                            marginTop: "2%",
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: "50px"
                        }}>{queryParams.get("name")}</h2>
                        <div className="spc-container">
                            {
                                particates.map((p) => {
                                    const date = new Date(p.timestamp);
                                    return (
                                        <div id='date' key={p.timestamp}>
                                            <span>{date.getDay()}{" "}{month[date.getMonth() + 1]}{" "}{date.getFullYear()}</span>
                                            <span>{date.getHours() + ":" + date.getSeconds()}</span>
                                            <hr></hr>
                                            <h3><b>
                                                Score {p.right} / {p.wrong + p.right}
                                            </b>
                                            </h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div >
            }
        </>
    )
}

export default SingleParticipateScreen
