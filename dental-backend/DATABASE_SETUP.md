# 🗄️ Database Setup Guide

## PostgreSQL Setup for Dental Clinic Management System

### 1. Install PostgreSQL

#### Windows:
1. Download PostgreSQL from [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember the password you set for the `postgres` user
4. Default port is 5432

#### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database and User

Open PostgreSQL command line (`psql`) or use pgAdmin:

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create database
CREATE DATABASE dental_clinic;

-- Create user
CREATE USER dental_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE dental_clinic TO dental_user;

-- Grant schema privileges
\c dental_clinic
GRANT ALL ON SCHEMA public TO dental_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dental_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dental_user;

-- Exit
\q
```

### 3. Environment Configuration

Create a `.env` file in the backend root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dental_clinic
DB_USERNAME=dental_user
DB_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Install Dependencies and Start

```bash
# Navigate to backend directory
cd dental-backend

# Install dependencies
npm install

# Start development server
npm run dev

# For production build
npm run build
npm start
```

### 5. Database Schema

The application will automatically create these tables when you start the server:

#### Users Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `role` (ENUM: patient, admin, doctor)
- `phone` (VARCHAR, Optional)
- `dateOfBirth` (DATE, Optional)
- `address` (TEXT, Optional)
- `isActive` (BOOLEAN)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

#### Appointments Table
- `id` (UUID, Primary Key)
- `patientId` (UUID, Foreign Key to Users)
- `service` (ENUM: Various dental services)
- `appointmentDate` (DATE)
- `appointmentTime` (TIME)
- `status` (ENUM: pending, confirmed, cancelled, completed)
- `notes` (TEXT, Optional)
- `symptoms` (TEXT, Optional)
- `doctorAssigned` (VARCHAR, Optional)
- `estimatedCost` (DECIMAL, Optional)
- `durationMinutes` (INTEGER, Default: 60)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### 6. Test the Setup

1. Start the backend server: `npm run dev`
2. Check health endpoint: `http://localhost:5000/health`
3. You should see a success message indicating the database is connected

### 7. Production Deployment

For production deployment, consider:

1. **Hosted PostgreSQL Options:**
   - AWS RDS PostgreSQL
   - Google Cloud SQL
   - Digital Ocean Managed Databases
   - Heroku Postgres
   - Railway

2. **Security Best Practices:**
   - Use strong passwords
   - Enable SSL connections
   - Restrict database access by IP
   - Regular backups
   - Monitor database performance

### 8. Common Issues & Troubleshooting

#### Connection Issues:
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check if port 5432 is open
netstat -an | grep 5432
```

#### Permission Issues:
```sql
-- Reset user permissions
GRANT ALL PRIVILEGES ON DATABASE dental_clinic TO dental_user;
ALTER DATABASE dental_clinic OWNER TO dental_user;
```

#### Password Authentication:
Edit PostgreSQL configuration if needed:
```bash
# Find config file
sudo find / -name "pg_hba.conf" 2>/dev/null

# Edit the file to allow password authentication
sudo nano /etc/postgresql/[version]/main/pg_hba.conf

# Change 'peer' to 'md5' for local connections
local   all             all                                     md5
```

### 9. API Endpoints

Once setup is complete, you'll have these endpoints available:

#### Authentication:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Appointments:
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get appointments (filtered by user role)
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment (admin only)
- `GET /api/appointments/available-slots?date=YYYY-MM-DD` - Get available time slots

### 10. Next Steps

After database setup:
1. Update frontend to use API endpoints
2. Implement proper error handling
3. Add input validation
4. Setup authentication flow
5. Test all functionality
