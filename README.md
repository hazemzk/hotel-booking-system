# 🏨 Hotel Booking System

Professional Hotel Booking System built with FastAPI and React.

## 📋 Prerequisites

- Docker & Docker Compose (for local development)
- Node.js (for local development)
- Python 3.11+ (for local development)

## 🚀 Quick Start with Docker

### 1. Clone the repository
```bash
git clone <repository-url>
cd learn2
```

### 2. Create environment file
```bash
cp .env.example .env
```

### 3. Build and run with Docker Compose
```bash
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🌐 Deployment on Render

### Backend (FastAPI)

1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r app/requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `app/`
4. Add environment variables:
   - `DATABASE_URL`: Your Render PostgreSQL database URL
   - `SECRET_KEY`: A secure random string
   - `ALLOWED_ORIGINS`: Your frontend URL (e.g., https://your-frontend.onrender.com)
   - `MEDIA_DIR`: `media` (or adjust as needed)

### Frontend (React)

1. Create a new **Static Site** on Render.
2. Connect your GitHub repository.
3. Set the following settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `hotel-frontend/`
4. Add environment variable:
   - `VITE_API_BASE_URL`: Your backend URL (e.g., https://your-backend.onrender.com/)

### Database

1. Create a **PostgreSQL** database on Render.
2. Copy the connection string and use it as `DATABASE_URL` in the backend service.

## 📁 Project Structure

```
.
├── app/                    # Backend (FastAPI)
│   ├── users/             # User management
│   ├── hotels/            # Hotel management
│   ├── bookings/          # Booking management
│   ├── payments/          # Payment processing
│   ├── admin/             # Admin routes
│   ├── core/              # Core utilities
│   ├── main.py            # FastAPI app entry point
│   ├── Dockerfile         # Backend Docker image
│   └── entrypoint.sh      # Docker entrypoint script
├── hotel-frontend/         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API utilities
│   │   └── context/       # React context
│   ├── public/            # Static assets
│   ├── package.json       # Dependencies
│   └── vite.config.js     # Vite configuration
├── media/                 # Uploaded images
├── alembic/               # Database migrations
├── docker-compose.yml     # Docker Compose for development
├── docker-compose.prod.yml # Docker Compose for production
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## 🧠 Key Highlights

- Clean REST API design with FastAPI
- Role-based access control (Admin, Staff, User)
- JWT authentication
- File upload system for images
- Slug-based SEO URLs
- Scalable project structure
- Fully dynamic React frontend with Tailwind CSS

## 🚀 Future Improvements

- Payment gateway integration
- Email notifications
- Real-time booking updates
- Advanced analytics dashboard

## 👨‍💻 Developer

Hazem Mariy Saleheen - Backend Developer (Python / FastAPI)

## 📌 Note

This project is built for learning and portfolio purposes and demonstrates full-stack development skills using modern technologies.

```
.
├── app/                    # Backend (FastAPI)
│   ├── users/             # User management
│   ├── hotels/            # Hotel management
│   ├── bookings/          # Booking management
│   ├── payments/          # Payment processing
│   ├── admin/             # Admin routes
│   ├── core/              # Core utilities
│   ├── main.py            # FastAPI app entry point
│   ├── Dockerfile         # Backend Docker image
│   └── entrypoint.sh      # Docker entrypoint script
├── hotel-frontend/         # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   └── main.jsx       # React entry point
│   ├── Dockerfile         # Frontend Docker image
│   └── package.json       # Dependencies
├── docker-compose.yml      # Docker Compose configuration
├── requirements.txt        # Python dependencies
└── alembic/               # Database migrations

```

## 🗄️ Database

The application uses PostgreSQL. Database migrations are automatically applied when the container starts.

### Manual Migration (Development)
```bash
alembic upgrade head
```

### Create New Migration
```bash
alembic revision --autogenerate -m "Description"
```

## 🔑 Features

- ✅ User Registration & Authentication
- ✅ Hotel Management (Admin)
- ✅ Room Booking
- ✅ Payment Integration
- ✅ Admin Dashboard
- ✅ Responsive UI with Tailwind CSS

## 👥 User Roles

- **Customer**: Can browse hotels and make bookings
- **Staff**: Can manage hotel and room information
- **Admin**: Full system access

## 📝 API Documentation

When running, visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

## 🛠️ Development

### Local Setup (Without Docker)

**Backend:**
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd hotel-frontend
npm install
npm run dev
```

## 🐳 Docker Commands

### Start services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild containers
```bash
docker-compose up --build
```

## 📦 Deployment

The application is production-ready. For production deployment:

1. Update environment variables in `.env`
2. Use a production-grade server (nginx/gunicorn)
3. Enable HTTPS/SSL
4. Set proper CORS settings
5. Use a production database connection

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License

## 📧 Contact

For questions or support, please create an issue in the repository.
>>>>>>> 0f953c0 (Prepare project for Render deployment without Docker)
