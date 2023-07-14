import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeout }) => {
    const [remainingTime, setRemainingTime] = useState(duration);

    useEffect(() => {
        // Update the timer every second
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        // Clear the timer when component unmounts
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Call the onTimeout function when timer reaches 0
        if (remainingTime === 0) {
            onTimeout();
        }
    }, [remainingTime, onTimeout]);

    // Convert remaining time to minutes and seconds
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        <div style={{
            fontSize: "19px",
            height: "10vh"
        }}>
            Time Remaining: {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
        </div>
    );
};

export default Timer;
