import { useState, useContext } from 'react'
import { Store } from '../../../Store';
import Head from '../../../Components/Heading/Head'
import { Link } from 'react-router-dom';

function QuestionScreen() {
    const { events, setEvents, setChange, state } = useContext(Store)
    const { userInfo } = state;

    return (
        <div>
            <Head name="QUESTIONS" />
            <div className="admin-card-body">
                {
                    events.map(event => {
                        return (
                            <div className="admin-card" key={event.id}>
                                <Link to={`/admin/home/questions/${event.id}?name=${event.name}`}>
                                    <img className="admin-img" src={event.image} />
                                    <h4 style={{
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
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
        </div>
    )
}

export default QuestionScreen
