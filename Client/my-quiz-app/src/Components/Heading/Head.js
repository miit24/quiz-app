import React from 'react'
import "../Heading/style.css"

function Head({ name, color }) {
    return (
        <div className="head-header" style={{
            backgroundColor: `${color}`
        }}>
            <h1>{name}</h1>
        </div>
    )
}

export default Head
