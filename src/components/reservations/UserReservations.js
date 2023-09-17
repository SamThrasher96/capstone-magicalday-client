import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserReservations, deleteReservation } from "../../managers/reservationManager";
import "./reservations.css";

export const UserReservations = ({ token }) => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUserReservations({ token }).then((data) => {
            setReservations(data);
        });
    }, [token]);


    const handleDelete = (reservationId) => {
        const confirmed = window.confirm("Are you sure you want to delete this reservation?");
        
        if (confirmed) {
            deleteReservation({ reservationId }).then(() => {
                getUserReservations({ token }).then((data) => {
                    setReservations(data);
                });
            });
        }
    };

    const confirmDelete = () => {
        if (selectedReservation) {
            deleteReservation({ token, reservationId: selectedReservation }).then(() => {
                getUserReservations({ token }).then((data) => {
                    setReservations(data);
                });
                setSelectedReservation(null);
                setShowConfirmation(false);
            });
        }
    };

    const cancelDelete = () => {
        setSelectedReservation(null);
        setShowConfirmation(false);
    };

    return (
        <div className="reservations-container">
            <h2>Your Reservations</h2>
            <div className="reservations-list">
                {reservations.map((reservation) => (
                    <div
                        className="reservation-card"
                        key={`reservation--${reservation.id}`}
                        onClick={() => {
                            navigate(`/reservations/${reservation.id}`);
                        }}
                    >
                        <img src={reservation.reservation_image} alt={reservation.reservation_location_name} className="reservation-image" />
                        <div className="reservation-location">Your reservation is at {reservation.reservation_location_name}</div>
                        <div className="reservation-date">Reservation Date: {reservation.date}</div>
                        <div className="reservation-time">Reservation time: {reservation.time}</div>
                        <button onClick={() => handleDelete(reservation.id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to delete this reservation?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>No</button>
                </div>
            )}
        </div>
    );
};