import { useEffect, useState } from "react";
import { MdEventSeat } from "react-icons/md";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function SeatBooking() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/seats/available")
      .then(res => res.json())
      .then(data => setSeats(data.seats || []));
  }, []);

  useEffect(() => {
    socket.on("seatsUpdated", (updatedSeats) => {
      setSeats(updatedSeats);
    });

    return () => {
      socket.off("seatsUpdated");
    };
  }, []);

  const bookSeat = async () => {
    if (!selectedSeat || !userId) {
      alert("Please select a seat and enter userId");
      return;
    }

    await fetch("http://localhost:5000/api/seats/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seatNumber: selectedSeat,
        userId
      })
    });

    setSelectedSeat(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 sm:p-8">

        <h1 className="text-2xl font-bold text-center mb-6">
          Seat Booking System
        </h1>

        <input
          type="text"
          placeholder="Enter User ID"
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6 place-items-center">
          {seats.map((seat) => {
            const isSelected = selectedSeat === seat.seatNumber;
            const isBooked = seat.isBooked;

            return (
              <MdEventSeat
                key={seat.seatNumber}
                size={40}
                onClick={() => {
                  if (!isBooked) setSelectedSeat(seat.seatNumber);
                }}
                className={`
                  cursor-pointer transition
                  ${
                    isBooked
                      ? "text-red-500 cursor-not-allowed"
                      : isSelected
                      ? "text-blue-500"
                      : "text-gray-300 hover:text-green-600"
                  }
                `}
                title={`Seat ${seat.seatNumber}`}
              />
            );
          })}
        </div>

        <button
          onClick={bookSeat}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Book Selected Seat
        </button>
      </div>
    </div>
  );
}