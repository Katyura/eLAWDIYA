# eLAWDIYA - Traffic Violation Reporting System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Issues](https://img.shields.io/badge/issues-welcome-orange)

🌟 **"I can not come up with a better name then this" - Turning Civic Responsibility into Action**

## 📋 Table of Contents
- [For Everyone: What is eLAWDIYA?](#for-everyone-what-is-elawdiya)
- [The Story Behind the Name](#the-story-behind-the-name)
- [How It Works: Simple Version](#how-it-works-simple-version)
- [Features for Citizens](#features-for-citizens)
- [Features for Traffic Authorities](#features-for-traffic-authorities)
- [The Hall of Shame](#the-hall-of-shame)
- [Technical Deep Dive](#technical-deep-dive)
- [For Developers: Tech Stack](#for-developers-tech-stack)
- [Architecture Overview](#architecture-overview)
- [Quick Start Guide](#quick-start-guide)
- [Development Setup](#development-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## For Everyone: What is eLAWDIYA?

eLAWDIYA is a simple but powerful mobile-first platform that lets ordinary citizens report traffic violations through their smartphones. Think of it as a community-powered traffic monitoring system where:

🚗 **You see a traffic violation** → 📱 **You capture photo/video** → ✅ **Traffic police verify it** → 💰 **You earn a reward**

**Our Goal**: Make our roads safer by empowering every citizen to become a traffic monitoring ally. When you report violations, you're not just earning rewards – you're helping create better traffic discipline for everyone.

### The Problem We're Solving
- **Traffic police can't be everywhere** - Manual policing is limited by resources
- **Violations happen daily without consequences** - Wrong parking, signal jumping, no helmet, triple riding
- **No easy way for citizens to report violations** - People want to help but don't know how
- **Repeat offenders keep getting away** - Without proper documentation and penalties

### Our Solution
- **Crowdsourced monitoring** - Every citizen with a smartphone becomes a traffic monitoring point
- **AI-powered verification** - Smart technology helps validate reports quickly
- **Direct connection to traffic authorities** - Reports go straight to the people who can take action
- **Reward system** - Get paid for helping maintain traffic discipline
- **Public accountability** - Hall of shame exposes repeat offenders

## The Story Behind the Name

> **"eLAWDIYA: I can not come up with a better name then this"**

Sometimes the best names are the ones that come naturally. "eLAWDIYA" represents:
- **e** - Electronic/digital platform
- **LAW** - Enforcing traffic laws and regulations
- **DIYA** - Hindi word meaning "lamp" or "light" - symbolizing hope and enlightenment

Together, it represents a digital platform bringing light to traffic law enforcement through citizen participation.

## How It Works: Simple Version

### Step 1: Report a Violation
- Open the eLAWDIYA app on your phone
- Select the type of violation (wrong parking, signal jumping, no helmet, etc.)
- Take a photo or record a short video
- The app automatically captures location and time

### Step 2: Verification Process
- Your report goes to traffic police administrators
- They verify the authenticity of the violation
- If confirmed, a traffic violation ticket/challan is issued to the vehicle owner

### Step 3: Earn Rewards
- Once the violation is confirmed and fine is paid
- You receive a reward (percentage of the fine amount)
- Track all your reports and earnings in your dashboard

### Step 4: Hall of Shame
- Vehicles with repeated violations appear in the public Hall of Shame
- This creates social pressure and encourages better traffic behavior

## Features for Citizens

### 📸 **Easy Reporting**
- **One-tap reporting** with intuitive interface
- **Photo and video upload** with automatic timestamp and GPS location
- **Multiple violation types** supported (parking, signals, helmet, lane discipline, etc.)
- **Offline mode** - Reports save locally and upload when connection is available

### 💰 **Reward System**
- **Earn real money** for verified violation reports
- **Track your earnings** with detailed payment history
- **Withdrawal options** to bank account or digital wallet
- **Bonus rewards** for high-quality evidence and consistent reporting

### 📊 **Personal Dashboard**
- **Report status tracking** - See if your report is pending, verified, or rejected
- **Earnings overview** - Monitor your reward accumulation
- **Violation history** - Keep record of all your reports
- **Achievement badges** - Earn recognition for consistent reporting

### 🔔 **Real-time Updates**
- **Push notifications** when your report status changes
- **Payment confirmations** when rewards are credited
- **New violation alerts** in your area (optional)

## Features for Traffic Authorities

### 🛡️ **Admin Dashboard**
- **Centralized review system** for all reported violations
- **Bulk verification tools** to process multiple reports efficiently
- **Evidence management** with zoom, enhance, and verify tools
- **Auto-generated challans** with legal documentation

### 📈 **Analytics & Insights**
- **Hotspot mapping** - Identify areas with high violation rates
- **Trend analysis** - Understand violation patterns over time
- **Offender tracking** - Monitor repeat offenders
- **Performance metrics** - Measure enforcement effectiveness

### 🔐 **Secure Processing**
- **Role-based access** for different authority levels
- **Audit trails** for all administrative actions
- **Data protection** and privacy compliance
- **Integration with existing traffic management systems**

## The Hall of Shame

### 📸 **Public Exposure**
- **Top offenders gallery** showing vehicles with most violations
- **Violation evidence** (photos/videos) of repeat offenders
- **Statistics and trends** of traffic violations in your city
- **Leaderboard** of most active citizen reporters

### 🎯 **Behavioral Impact**
- **Social pressure** encourages compliance with traffic rules
- **Deterrent effect** - Nobody wants to be publicly shamed
- **Community awareness** about traffic safety
- **Positive reinforcement** for good driving behavior

---

## Technical Deep Dive

For developers and technical professionals who want to understand the architecture and implementation details.

## For Developers: Tech Stack

### Frontend (Mobile-First Web App)
- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with mobile-first responsive design
- **State Management**: Zustand for lightweight state management
- **Forms**: React Hook Form with Zod validation
- **Camera Integration**: WebRTC API for device camera access
- **GPS Services**: Geolocation API for automatic location tagging
- **AI/ML**: ONNX Runtime Web for browser-based AI inference
- **PWA Support**: Works as a progressive web app on mobile devices

### Backend (API & Processing)
- **Framework**: FastAPI with Python 3.8+
- **Database**: PostgreSQL 12+ with advanced indexing
- **ORM**: SQLAlchemy with Pydantic schemas
- **Authentication**: JWT tokens with bcrypt password hashing
- **File Storage**: Local filesystem (migratable to cloud storage)
- **Image Processing**: OpenCV and PIL for evidence enhancement
- **Email Service**: SMTP integration for notifications
- **Task Queue**: Background job processing for heavy operations

### AI/ML Pipeline
- **Object Detection**: YOLOv8 model trained for vehicle/license plate detection
- **Model Optimization**: ONNX format for efficient browser inference
- **Real-time Processing**: WASM-based inference in the browser
- **Image Enhancement**: Automatic contrast, brightness, and sharpness adjustment
- **Duplicate Detection**: Smart algorithms to prevent spam reporting
- **Quality Scoring**: AI-powered assessment of evidence quality

### Database Architecture
- **Primary Database**: PostgreSQL with UUID primary keys
- **Geospatial Indexing**: PostGIS for location-based queries
- **Full-text Search**: Built-in PostgreSQL search capabilities
- **Audit Trails**: Comprehensive logging of all operations
- **Connection Pooling**: Optimal database performance
- **Backup Strategy**: Automated backups with point-in-time recovery

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        eLAWDIYA Platform                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │   Mobile App    │    │   Web Dashboard │    │  Admin Portal   │ │
│  │   (Next.js PWA) │    │   (Next.js)     │    │   (Next.js)     │ │
│  │                 │    │                 │    │                 │ │
│  │ - Camera Capture│    │ - Report Status │    │ - Verification  │ │
│  │ - GPS Location  │    │ - Earnings      │    │ - Analytics     │ │
│  │ - AI Inference  │    │ - History       │    │ - User Management│ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│           │                       │                       │         │
│           └───────────────────────┼───────────────────────┘         │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                   Backend API (FastAPI)                        │ │
│  │                                                                 │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │   Auth      │ │  Reports    │ │   Media     │ │  Rewards    │ │ │
│  │ │ Service     │ │  Service    │ │  Service    │ │  Service    │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│  │                                                                 │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │   Users     │ │   Admin     │ │   Upload    │ │  Notify     │ │ │
│  │ │ Management  │ │  Service    │ │  Service    │ │  Service    │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    PostgreSQL Database                          │ │
│  │                                                                 │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │    Users    │ │   Reports   │ │  Report     │ │    Rewards  │ │ │
│  │ │             │ │             │ │   Media     │ │             │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│  │                                                                 │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │ Admin Logs  │ │ Offender    │ │ Notification│ │  Statistics │ │ │
│  │ │             │ │ Statistics  │ │             │ │             │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                   │                                 │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    File Storage System                          │ │
│  │                                                                 │ │
│  │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ │
│  │ │   Images    │ │   Videos    │ │   Model     │ │   Backups   │ │ │
│  │ │  Storage    │ │  Storage    │ │  Files      │ │             │ │ │
│  │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Key Technical Features

#### 🔒 **Security & Privacy**
- **JWT Authentication** with secure token handling
- **Role-based Access Control** (Citizen, Admin, Super Admin)
- **Data Encryption** for sensitive information
- **GDPR Compliance** with user data handling
- **Audit Logging** for all administrative actions

#### 🧠 **AI-Powered Intelligence**
- **Automatic Vehicle Detection** using YOLOv8
- **License Plate Recognition** for identification
- **Quality Assessment** of uploaded evidence
- **Duplicate Detection** to prevent spam
- **Location Intelligence** for hotspot analysis

#### ⚡ **Performance & Scalability**
- **Database Optimization** with proper indexing
- **CDN Integration** for fast media delivery
- **Background Processing** for heavy tasks
- **Load Balancing** ready for high traffic
- **Caching Strategy** for improved response times

#### 📱 **Mobile Optimization**
- **Progressive Web App** with offline capabilities
- **Camera Integration** with device hardware
- **GPS Services** for automatic location tagging
- **Push Notifications** for real-time updates
- **Responsive Design** for all screen sizes

## Quick Start Guide

### For Users (Non-Technical)

1. **Download the App**: Visit [app.elawdiya.com](https://app.elawdiya.com) on your phone
2. **Create Account**: Register with your email and phone number
3. **Start Reporting**:
   - Tap "Report Violation"
   - Choose violation type
   - Take photo/video
   - Submit automatically captures location
4. **Track Progress**: Check your dashboard for report status and earnings

### For Developers (Technical)

#### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip
- PostgreSQL 12+

#### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/eLAWDIYA.git
cd eLAWDIYA

# Install frontend dependencies
npm install

# Install backend dependencies
pip install -r requirements.txt

# Set up database
createdb elawdiya
psql -d elawdiya -f schema.sql

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development servers
npm run backend  # Terminal 1
npm run dev      # Terminal 2
```

#### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

#### Default Admin Account
- **Email**: admin@traffic.app
- **Password**: admin123

## Development Setup

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/elawdiya

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRE_MINUTES=1440

# File Upload Settings
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760  # 10MB

# Application Settings
NODE_ENV=development
PORT=3000
BACKEND_PORT=8000

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# AI/ML Configuration
MODEL_CONFIDENCE_THRESHOLD=0.5
MODEL_MAX_DETECTIONS=10

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
BCRYPT_ROUNDS=12
```

### Database Setup

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE elawdiya;
CREATE USER elawdiya_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE elawdiya TO elawdiya_user;
\q

# Import schema
psql -d elawdiya -U elawdiya_user -f schema.sql
```

### Development Workflow

1. **Start Backend**: `npm run backend`
2. **Start Frontend**: `npm run dev`
3. **Run Linting**: `npm run lint`
4. **Build Production**: `npm run build`
5. **Run Tests**: `npm test`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile

### Reports Endpoints
- `POST /api/reports/` - Create new violation report
- `GET /api/reports/` - Get user's reports
- `GET /api/reports/{report_id}` - Get specific report
- `PUT /api/reports/{report_id}` - Update report

### Media Upload
- `POST /api/media/upload` - Upload violation evidence
- `GET /api/media/{media_id}` - Download media file

### Admin Endpoints
- `GET /api/admin/reports` - Get all reports (admin only)
- `PUT /api/admin/reports/{report_id}/verify` - Verify report (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `POST /api/admin/challan` - Generate traffic challan

### Hall of Shame Endpoints
- `GET /api/shame/offenders` - Get top offenders
- `GET /api/shame/statistics` - Get violation statistics
- `GET /api/shame/leaderboard` - Get top reporters

### API Usage Examples

```bash
# Register new user
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "password123"
  }'

# Create violation report (with authentication)
curl -X POST "http://localhost:8000/api/reports/" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "violation_type": "wrong_parking",
    "location": "Main Street, Downtown",
    "description": "Car parked in no parking zone",
    "latitude": 28.6139,
    "longitude": 77.2090
  }'

# Upload evidence
curl -X POST "http://localhost:8000/api/media/upload" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@violation_photo.jpg" \
  -F "report_id=uuid-here"
```

## Database Schema

### Core Tables

#### Users Table
- **user_id**: Primary key (UUID)
- **email**: Unique email address
- **phone**: Phone number with country code
- **name**: User full name
- **role**: User role (citizen, admin, super_admin)
- **total_rewards**: Accumulated reward points
- **created_at**: Account creation timestamp
- **last_login**: Last login timestamp

#### Reports Table
- **report_id**: Primary key (UUID)
- **user_id**: Foreign key to users table
- **violation_type**: Type of traffic violation
- **location**: Text description of location
- **latitude**: GPS latitude coordinate
- **longitude**: GPS longitude coordinate
- **description**: Detailed description
- **status**: Report status (pending, verified, rejected)
- **admin_notes**: Admin verification notes
- **challan_issued**: Traffic ticket status
- **reward_amount**: Reward earned for verified report
- **created_at**: Report creation timestamp
- **verified_at**: Verification timestamp

#### Report Media Table
- **media_id**: Primary key (UUID)
- **report_id**: Foreign key to reports table
- **file_path**: Local file path
- **file_type**: Media type (image, video)
- **file_size**: File size in bytes
- **ai_confidence**: AI detection confidence score
- **detected_objects**: AI-detected objects in JSON
- **created_at**: Upload timestamp

#### User Rewards Table
- **reward_id**: Primary key (UUID)
- **user_id**: Foreign key to users table
- **report_id**: Foreign key to reports table
- **amount**: Reward amount
- **status**: Reward status (pending, paid, cancelled)
- **paid_at**: Payment timestamp
- **transaction_id**: Payment transaction reference

#### Offender Statistics Table
- **offender_id**: Primary key (UUID)
- **vehicle_number**: Vehicle license plate number
- **total_violations**: Count of total violations
- **total_fines**: Sum of all fines
- **last_violation_date**: Most recent violation
- **risk_score**: Calculated risk score
- **created_at**: Record creation timestamp
- **updated_at**: Last update timestamp

### Key Database Features

#### Geospatial Capabilities
- **PostGIS Extension** for location-based queries
- **Spatial Indexing** for fast location searches
- **Distance Calculations** for proximity analysis
- **Hotspot Detection** using clustering algorithms

#### Performance Optimizations
- **UUID Primary Keys** for security and scalability
- **Composite Indexes** on frequently queried columns
- **Partial Indexes** for specific query patterns
- **Connection Pooling** for optimal performance

#### Data Integrity
- **Foreign Key Constraints** for referential integrity
- **Check Constraints** for data validation
- **Unique Constraints** for duplicate prevention
- **Triggers** for automated timestamp updates

For detailed schema, see [schema.sql](schema.sql).

## Contributing

We welcome contributions from both technical and non-technical contributors! Whether you're a developer, designer, traffic safety expert, or passionate citizen, there are many ways to help improve eLAWDIYA.

### 🤝 How to Contribute

#### For Developers
- **Code Contributions**: Fix bugs, add features, improve performance
- **Documentation**: Improve code docs, user guides, API documentation
- **Testing**: Write tests, improve test coverage, performance testing
- **AI/ML**: Improve detection models, add new violation types

#### For Non-Technical Contributors
- **User Feedback**: Report usability issues, suggest improvements
- **Translation**: Help translate the app to different languages
- **Design**: UI/UX improvements, graphics, branding
- **Traffic Safety**: Provide domain expertise, violation type suggestions

#### Getting Started for Developers
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the setup instructions above
4. Make your changes with proper testing
5. Submit a pull request with detailed description

### 📋 Code Quality Standards

#### Frontend (React/Next.js)
- **TypeScript** for type safety
- **ESLint** for code consistency
- **Prettier** for code formatting
- **React Best Practices** for component design
- **Mobile-First** responsive design

#### Backend (FastAPI/Python)
- **PEP 8** for Python code style
- **Type Hints** for better code documentation
- **FastAPI Conventions** for API design
- **Comprehensive Testing** with pytest
- **Security Best Practices** for data handling

#### AI/ML Development
- **Model Versioning** for reproducible results
- **Performance Monitoring** for model accuracy
- **Ethical AI** principles and guidelines
- **Documentation** for model training data
- **Testing** for edge cases and biases

### 🎯 Priority Areas for Contribution

1. **Mobile App Improvements**: Better offline support, camera features
2. **AI Model Enhancement**: Improve detection accuracy, new violation types
3. **User Experience**: Simplified reporting flow, better feedback
4. **Analytics**: Better insights for traffic authorities
5. **Localization**: Multi-language support for different regions
6. **Security**: Enhanced data protection and privacy features

### 📞 Get in Touch

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/your-username/eLAWDIYA/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/your-username/eLAWDIYA/discussions)
- **Email**: contact@elawdiya.com
- **Website**: [www.elawdiya.com](https://www.elawdiya.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This means you're free to use, modify, and distribute the code for both commercial and non-commercial purposes.

## 🙏 Acknowledgments

- **Traffic Police Departments** worldwide for their service and feedback
- **Open Source Community** for the amazing tools and libraries
- **AI/ML Researchers** who make object detection accessible
- **Citizen Reporters** who help make our roads safer
- **Traffic Safety Experts** for their domain knowledge and guidance

## 📞 Contact & Support

- **Project Repository**: https://github.com/your-username/eLAWDIYA
- **Bug Reports & Features**: https://github.com/your-username/eLAWDIYA/issues
- **Community Discussions**: https://github.com/your-username/eLAWDIYA/discussions
- **Email**: contact@elawdiya.com
- **Twitter**: [@elawdiya](https://twitter.com/elawdiya)
- **Facebook**: [facebook.com/elawdiya](https://facebook.com/elawdiya)

---

## 🌟 Join Us in Making Roads Safer

**Every report matters. Every reward helps. Every road becomes safer.**

eLAWDIYA is more than just an app – it's a movement toward better civic sense and traffic discipline. By using this platform, you're not just earning rewards; you're contributing to a safer, more responsible society.

**Download the app today** and be part of the solution!

---

**Important Note**: This is an open-source civic technology platform focused on improving traffic safety and civic responsibility. Please use responsibly and follow local laws and regulations when reporting violations. Respect privacy laws and only report genuine traffic violations.