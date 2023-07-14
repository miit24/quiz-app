import React from 'react'
import load from "../../Helper/Lottie/loading.json"
import Lottie from "lottie-react"

function LoadingBox() {
    return (
        <div style={{
            width: "15%",
            height: "15%",
            margin: "auto",
            padding: "10% 0"
        }}>
            <Lottie animationData={load} />
            <h4 style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}><b>Please Wait...</b></h4>
        </div >
    )
}

export default LoadingBox
