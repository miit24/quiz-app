import { useContext, useState, useEffect } from 'react'
import { Store } from '../../Store'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { getError } from '../../Helper/util'
import SideBar from '../../Components/SideBar/SideBar'
import LoadingBox from '../../Components/LoadingBox/LoadingBox'
import { Link, useNavigate } from 'react-router-dom'

function ParticipateScreen() {

    const { state } = useContext(Store)
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const { userInfo } = state
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInfo || !userInfo.jwtToken) {
            navigate("/home")
            return
        }

        const callApi = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/exam/find/category`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.jwtToken}`
                    }
                })
                const result = await axios.get(`/category/all`)
                let old = [...data]
                if (old.length > 0) {
                    let original = [];
                    for (let i = 0; i < old.length; i++) {
                        let ans = result.data.find(d => d.id === old[i])
                        original.push(ans)
                    }
                    setCategory(original)
                }
                setLoading(false);
            } catch (error) {
                toast.error(getError(error))
            }
        }
        callApi()
    }, [userInfo])


    return (
        <div>
            {loading ? <LoadingBox /> :
                <>
                    <SideBar />
                    <div className="admin-card-body">
                        {
                            category.map(event => {
                                return (
                                    <div className="admin-card" key={event.id}>
                                        <Link to={`/participate/${event.id}?name=${event.name}`}>
                                            <img className="admin-img" src={event.image} />
                                            <h4 style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <b>
                                                    {event.name}
                                                </b>
                                            </h4>
                                        </Link>
                                    </div>)
                            })
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default ParticipateScreen
