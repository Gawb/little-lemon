import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function About() {

    const [times, setTimes] = useState([]);

    const initializeTimes = (initialValue) => {
    setTimes(initialValue);
    };

    const updateTimes = (newTime) => {
    setTimes((prevTimes) => [...prevTimes, newTime]);
    };

    useEffect(() => {
    initializeTimes([0]); 
    }, []);

    return (
    <div>
        <h1>Times</h1>
        <ul>
        {times.map((time, index) => (
            <li key={index}>{time}</li>
        ))}
        </ul>
        <button onClick={() => updateTimes(times.length)}>Add Time</button>
    </div>
    );
};
    

export {About};
