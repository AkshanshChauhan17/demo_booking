🎟️ Real-Time Seat Booking System

A full-stack real-time seat booking system built with Node.js, Express, MongoDB, Socket.IO, React (Vite), and Tailwind CSS.
Supports live seat updates, admin seat creation, and multi-user real-time booking.

🚀 Features
🔧 Backend

Admin can create seats (e.g. 100 seats)

Users can book and cancel seats

UUID-based booking IDs

MongoDB for persistent storage

Socket.IO for real-time updates

Prevents double booking

🎨 Frontend

Built with React + Vite

Styled using Tailwind CSS

Seat UI using react-icons

Real-time seat status updates

Responsive and mobile-friendly UI

⚡ Real-Time

When one user books a seat:

All other users instantly see the update

No page refresh required

🧱 Tech Stack
Layer	Technology
Frontend	React, Vite, Tailwind CSS
Backend	Node.js, Express
Database	MongoDB (Mongoose)
Realtime	Socket.IO
IDs	UUID
Icons	react-icons
📁 Project Structure
BookingSystem/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── seatBookingRoutes.js
│   ├── models/
│   │   └── seat.js
│   └── config/
│       └── db.js
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           └── SeatBooking.jsx

🔌 Backend Setup
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Environment Variables (.env)
MONGO_URI=mongodb://localhost:27017/seat-booking
PORT=5000

3️⃣ Start Backend Server
npm start


Server runs on:

http://localhost:5000

🌐 API Endpoints
🎫 Seats
Method	Endpoint	Description
GET	/api/seats/available	Get all seats
POST	/api/seats/book	Book a seat
DELETE	/api/seats/cancel/:seatNumber	Cancel booking
📌 Book Seat Payload
{
  "seatNumber": 12,
  "userId": "user_123"
}

⚡ Socket.IO Events
📤 Emitted by Server
Event	Data
seatsUpdated	Updated seats array
📥 Listened by Client
socket.on("seatsUpdated", (seats) => {
  setSeats(seats);
});

🎨 Frontend Setup
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Start Frontend
npm run dev


Runs on:

http://localhost:5173

🪑 Seat Status Legend
Color	Meaning
🟢 Green	Available
🔵 Blue	Selected
🔴 Red	Booked
🧠 How Real-Time Works

User books a seat

Backend updates MongoDB

Backend emits seatsUpdated event

All connected clients receive updated seat data

UI updates instantly

🔒 Best Practices Used

MongoDB _id kept internal

Public-safe UUIDs

Socket events emitted only after DB update

Booked seats disabled on UI

Clean separation of backend & frontend

🛠️ Future Enhancements

⏳ Seat hold timer (auto release)

🔐 JWT authentication (admin/user)

💳 Payment integration

🎥 Cinema-style seat layout (A1, A2…)

🧠 Redis for socket scaling

📱 Progressive Web App (PWA)

👨‍💻 Author

Akshansh Chauhan
Full-Stack Developer

📜 License

This project is licensed under the MIT License.
