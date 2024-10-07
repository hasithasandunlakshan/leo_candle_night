"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookSeats() {
  const [seats, setSeats] = useState([]); // Initialize seats as an empty array
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Fetch seats from the API
    async function fetchSeats() {
      try {
        const response = await axios.get('/api/seats/getSeats');
        setSeats(response.data.data); // Ensure data is being set
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    }
    fetchSeats();
  }, []);

  // Handle seat selection
  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  // Handle booking submission
  const handleBookSeats = async () => {
    if (selectedSeats.length === 0) return;
    try {
      await axios.post('/api/seats/bookSeats', { seatNumbers: selectedSeats });
      alert('Seats booked successfully!');
      setSelectedSeats([]); // Clear selected seats
      // Re-fetch updated seats
      const response = await axios.get('/api/seats/getSeats');
      setSeats(response.data.data);
    } catch (error) {
      console.error('Error booking seats:', error);
    }
  };

  return (
    <div>
      <h1>Book Your Seats</h1>
      <div className="seat-grid">
        {seats.length > 0 ? ( // Conditional check to avoid undefined error
          seats.map((seat) => (
            <div
              key={seat.seatNumber}
              className={`seat ${seat.isBooked ? 'booked' : ''} ${
                selectedSeats.includes(seat.seatNumber) ? 'selected' : ''
              }`}
              onClick={() => !seat.isBooked && toggleSeatSelection(seat.seatNumber)}
            >
              {seat.seatNumber}
            </div>
          ))
        ) : (
          <p>Loading seats...</p> // Show a loading message until seats are fetched
        )}
      </div>
      <button onClick={handleBookSeats} disabled={selectedSeats.length === 0}>
        Book Selected Seats
      </button>
      <style jsx>{`
        .seat-grid {
          display: grid;
          grid-template-columns: repeat(10, 50px); /* Adjust for 150 seats (10 columns x 15 rows) */
          gap: 10px;
          margin: 20px 0;
        }
        .seat {
          width: 50px;
          height: 50px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .seat.booked {
          background-color: red;
          cursor: not-allowed;
        }
        .seat.selected {
          background-color: green;
        }
      `}</style>
    </div>
  );
}
