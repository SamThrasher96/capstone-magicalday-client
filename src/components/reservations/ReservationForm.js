import { useEffect, useState } from "react";
import { createReservation } from "../../managers/reservationManager";
import { getAllLocations } from "../../managers/locationManager";
import { useNavigate } from "react-router-dom";
import "./reservations.css";

export const CreateUserReservation = () => {
    const navigate = useNavigate();
    const [reservation, updateReservation] = useState({
        location: 0,
        date: '',
        time: ''
    });
    const [allLocations, setLocations] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        getAllLocations().then((locations) => {
            setLocations(locations);
        });
    }, []);

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();
        const finishedReservation = { ...reservation };
        const createdReservation = await createReservation(finishedReservation);
        setSuccessMessage("Reservation saved successfully!"); 
        navigate("/reservations"); 
    };

    const handleLocationChange = (event) => {
        const locationId = event.target.value;
        updateReservation({
            ...reservation,
            location: parseInt(locationId),
        });
    };

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        updateReservation({
            ...reservation,
            date: dateValue,
        });
    };

    const handleTimeChange = (event) => {
        const timeValue = event.target.value;
        updateReservation({
            ...reservation,
            time: timeValue,
        });
    };

    return (
        <>
            <div className="reservation-container">
                {successMessage && <div className="success-message">{successMessage}</div>}
                <form className="box">
                    <h2>New Reservation</h2>
                    <fieldset className="field">
                        <div className="form-group">
                            <label htmlFor="location">Select Location:</label>
                            <select
                                id="location"
                                name="location"
                                onChange={handleLocationChange}
                                value={reservation.location}
                            >
                                <option value={0}>Select a location</option>
                                {allLocations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Select Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                onChange={handleDateChange}
                                value={reservation.date}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Select Time:</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                onChange={handleTimeChange}
                                value={reservation.time}
                            />
                        </div>
                    </fieldset>
                    <button className="button" onClick={handleSaveButtonClick}>
                        Save Reservation
                    </button>
                </form>
            </div>
        </>
    );
};