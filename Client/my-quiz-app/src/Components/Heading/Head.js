import React from 'react'
import "../Heading/style.css"

function Head({ name }) {
    return (
        <div className="head-header">
            <h1>{name}</h1>
        </div>
    )
}

export default Head
