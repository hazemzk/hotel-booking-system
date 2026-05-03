🏨 Hotel Booking System

A full-featured Hotel Booking System built with FastAPI (Backend) and React (Frontend), designed to manage hotels, rooms, bookings, and users with role-based access control.

🚀 Tech Stack
🔧 Backend
FastAPI
SQLAlchemy ORM
PostgreSQL
Alembic (Migrations)
JWT Authentication
Role-Based Access Control (Admin / Staff / User)
🎨 Frontend
React (Vite)
React Router DOM
Tailwind CSS
Axios
✨ Features
👤 Authentication
Register / Login system
JWT token authentication
Secure user sessions
🏨 Hotel Management
Add / Update / Delete hotels
Upload hotel images
Slug-based hotel URLs
Hotel search & filtering
🛏️ Room Management
Add rooms to hotels
Set price, capacity, availability
Upload room images
Add amenities per room
📅 Booking System
Book available rooms
Check-in / Check-out validation
Prevent overlapping bookings
Booking status tracking
🔍 Search System
Filter by location
Filter by price range
Filter by capacity
Date-based availability search
🔐 Admin Features
Manage users
Manage hotels & rooms
View all bookings
🧠 Project Structure
learn2/
│
├── app/
│   ├── core/
│   ├── hotels/
│   ├── bookings/
│   ├── users/
│
├── frontend/
│   ├── src/
│       ├── pages/
│       ├── components/
│       ├── api/
│
├── media/
├── alembic/
⚙️ Installation
1️⃣ Backend Setup
cd backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate
pip install -r requirements.txt
Run server:
uvicorn main:app --reload
2️⃣ Database Setup

Make sure PostgreSQL is running and update .env:

DATABASE_URL=postgresql://user:password@localhost:5432/hotel_db

Run migrations:

alembic upgrade head
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🌐 API Endpoints (Examples)
Hotels
GET    /hotels/
POST   /hotels/
GET    /hotels/{id}
GET    /hotels/slug/{slug}
Rooms
GET    /rooms/{id}
POST   /hotels/rooms/{hotel_id}
Bookings
POST   /bookings/
GET    /bookings/my
🔑 Authentication Flow
User registers or logs in
JWT token is generated
Token is stored in localStorage
Used in API requests for authorization
📸 Screenshots (Optional)

Add screenshots here later:

Home page
Hotel details page
Booking page
Admin dashboard
🧩 Key Highlights
Clean REST API design
Slug-based SEO URLs
Scalable project structure
Role-based security system
File upload system for images
Fully dynamic frontend
🚀 Future Improvements
Payment gateway integration
Email notifications
Real-time booking updates
Advanced analytics dashboard
Docker deployment
👨‍💻 Developer

Hazem Mariy Saleheen
Backend Developer (Python / Django / FastAPI)

📌 Note

This project is built for learning and portfolio purposes and demonstrates full-stack development skills using modern technologies.
