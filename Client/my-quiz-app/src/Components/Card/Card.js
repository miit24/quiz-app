import React, { useContext } from 'react'
import { Store } from '../../Store'
import "../Card/style.css"
import { useNavigate } from 'react-router-dom'
import QuizModal from '../QuizModal/QuizModal'

function Card({ body }) {

    const { state, setRegID, setEventID, events } = useContext(Store)
    const { userInfo } = state
    const navigate = useNavigate()

    return (
        <div className="card" style={{
            margin: "5% 2%"
        }}>
            <div className="photo">
                <img src={body.image} alt="Your Photo" />
            </div>
            <div>
                <h2 className='card-heading'>{body.name}</h2>
                <p className='card-body'>
                    {body.description}
                </p>
            </div>
            <QuizModal event={body}>
            </QuizModal>
        </div>
    )
}

export default Card
