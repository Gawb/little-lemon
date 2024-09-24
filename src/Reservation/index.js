import React, { useState } from 'react';
import './index.css';

const Reservation = () => {
    const [location, setLocation] = useState('');
    const [area, setArea] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleAreaChange = (event) => {
        setArea(event.target.value);
    };

    return (
        <form className="reservation-section" id='reservation'>
            <p>Please provide us with the following information to proceed with your reservation.</p>
            <div className="reservation-step-one">
                <label htmlFor="location">At which location</label>
                <select
                    id="location"
                    name="location"
                    value={location}
                    onChange={handleLocationChange}
                >
                    <option value="" disabled>Select location</option>
                    <option value="Viña del Mar">Viña del Mar</option>
                    <option value="Santiago">Santiago</option>
                </select>

                <label htmlFor="area">Choose a specific area (optional)</label>
                <select
                    id="area"
                    name="area"
                    value={area}
                    onChange={handleAreaChange}
                >
                    <option value="" disabled>Select area</option>
                    <option value="close">Close</option>
                    <option value="far">Far</option>
                </select>

                <div className="reservation-step-one_last-info">
                    <div>
                        <label htmlFor="date">Date: </label>
                        <input id='date' type="date"></input>
                    </div>
                    <div>
                        <label htmlFor="people">Number of people: </label>
                        <input id='people' type="number"></input>
                    </div>


                </div>
            </div>
            <button>Next</button>
        </form>
    );
}

export { Reservation };

