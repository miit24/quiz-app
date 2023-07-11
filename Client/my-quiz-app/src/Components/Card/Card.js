import React from 'react'
import "../Card/style.css"

function Card({ body }) {
    // console.log({ body })
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
            <button className="explore-button">Explore</button>
        </div>
    )
}

export default Card
