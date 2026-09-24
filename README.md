<div align="center">

# Virtual Lab Management System

### A Smart Remote Laboratory Platform for Real-Time Experiment Monitoring & Control

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-white?style=for-the-badge&logo=socketdotio)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=for-the-badge&logo=jsonwebtokens)
![Bootstrap](https://img.shields.io/badge/Bootstrap-Frontend-purple?style=for-the-badge&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

---

** Developed for the National Instruments (NI) National Level Hackathon 2026**

** Selected as Best Industry Level Hackathon Project under the Educational Category**

</div>

---

# Overview

The **Virtual Lab Management System** is a web-based platform that enables students to remotely access laboratory equipment through a secure online interface. Instead of physically visiting the laboratory, students can book experiment slots, authenticate themselves, access live hardware, monitor experiments through a live camera feed, and control the experiment remotely.

The platform integrates **NI myDAQ hardware**, **Node.js backend**, **MySQL database**, **JWT authentication**, **Socket.IO real-time communication**, and **live video streaming** to provide a complete remote laboratory experience.

---

# Key Features

-  Student Registration & Login
-  JWT Authentication
-  Online Lab Slot Booking
-  Admin Slot Approval
-  Automatic Session Timer
-  Live Camera Feed
-  Remote Experiment Control
-  Real-Time Sensor Monitoring
-  NI myDAQ Integration
-  Live Telemetry
-  Session Feedback
-  Admin Dashboard
-  Experiment Monitoring
-  Automatic Logout after Session

---

#  System Architecture

```text
                         +----------------------+
                         |      Student UI      |
                         | HTML CSS Bootstrap   |
                         +----------+-----------+
                                    |
                                    |
                              REST API / Socket.IO
                                    |
                                    ▼
                     +-------------------------------+
                     |     Node.js + Express Server  |
                     |-------------------------------|
                     | JWT Authentication            |
                     | Booking Management            |
                     | Session Management            |
                     | Live Camera APIs              |
                     | Socket.IO Server              |
                     | NI myDAQ Communication        |
                     +-------+--------------+--------+
                             |              |
                             |              |
                       MySQL Database   Live Camera
                             |              |
                             |              |
                             ▼              ▼
                  Users  Bookings  Feedback  Hardware

                             |
                             |
                             ▼
                     National Instruments
                          NI myDAQ Board
```

---

# Project Workflow

## Step 1

Student Registration

↓

Student information stored in MySQL

↓

Password encrypted using bcrypt

---

## Step 2

Student Login

↓

Email + Password Verification

↓

JWT Token Generated

↓

Token stored in Browser Local Storage

↓

Dashboard Opens

---

## Step 3

Book Experiment Slot

↓

Student selects

- Slot
- Date
- Time

↓

Booking stored in Database

↓

Status = Pending

---

## Step 4

Admin Login

↓

View Pending Bookings

↓

Approve / Reject Slot

↓

Status Updated

---

## Step 5

Student Login Again

↓

Approved Booking Visible

↓

Click

**Start Experiment**

---

## Step 6

Backend validates

- JWT Token
- Booking Time
- Session Status

↓

Access Granted

---

## Step 7

Live Experiment Starts

↓

Socket.IO Connection Established

↓

Live Camera Stream

↓

Live Sensor Data

↓

Control Commands

↓

Backend

↓

NI myDAQ

↓

Real Hardware

---

## Step 8

Experiment Ends

↓

Timer Expires

↓

Auto Logout

↓

Feedback Form Opens

↓

Feedback Stored in Database

---

# Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | HTML5 |
| Styling | CSS3 |
| UI Framework | Bootstrap |
| JavaScript | ES6 |
| Backend | Node.js |
| Framework | Express.js |
| Database | MySQL |
| Authentication | JWT |
| Password Security | bcrypt |
| Realtime Communication | Socket.IO |
| Hardware Interface | NI myDAQ |
| API Testing | Postman |
| Version Control | Git |
| Repository | GitHub |

---

# Project Structure

```text
Virtual-Lab-Management-System/

│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── booking.html
│   ├── lab.html
│   ├── admin.html
│   ├── css/
│   └── js/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── database/
│   └── socket/
│
├── database/
│   └── virtual_lab.sql
│
├── screenshots/
│
└── README.md
```

---

# 🗄 Database Schema

### Users

```
user_id
name
email
password
role
created_at
```

---

### Slots

```
slot_id
slot_name
start_time
end_time
status
```

---

### Bookings

```
booking_id
user_id
slot_id
booking_date
start_time
end_time
status
```

---

### Feedback

```
feedback_id
booking_id
user_id
rating
comments
created_at
```

---

### Admin

```
admin_id
name
email
password
```

---

# Authentication Flow

```
Student Login

↓

Node.js verifies credentials

↓

JWT Token Generated

↓

Token sent to Browser

↓

Stored in Local Storage

↓

Every API Request

↓

Authorization Header

↓

Backend Middleware

↓

JWT Verification

↓

Access Granted
```

---

# Live Camera Flow

```
Laptop Camera

↓

Backend

↓

Socket.IO

↓

Frontend

↓

Student Browser

↓

Live Video Feed
```

---

# Live Hardware Flow

```
Student

↓

Control Button

↓

Socket.IO

↓

Node.js

↓

NI myDAQ

↓

Pump / Valve

↓

Sensor Data

↓

Node.js

↓

Socket.IO

↓

Dashboard
```

---

# Session Management

The system automatically manages laboratory sessions by:

- Checking approved bookings
- Validating current session time
- Starting countdown timer
- Providing experiment access only during booked slot
- Automatically logging out users after session completion
- Preventing unauthorized experiment access

---

# Admin Features

- Student Management
- Slot Management
- Booking Approval
- Reject Bookings
- Monitor Active Sessions
- View Feedback
- Monitor Experiment Usage

---

# Student Features

- Register
- Login
- Book Slot
- View Booking Status
- Access Experiment
- Live Camera
- Control Hardware
- View Telemetry
- Submit Feedback

---

# NI myDAQ Integration

The backend communicates with the **National Instruments NI myDAQ** board to control laboratory hardware in real time.

Supported operations include:

- Pump Control
- Valve Control
- Sensor Data Reading
- Flow Monitoring
- Pressure Monitoring
- Temperature Monitoring

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Session Validation
- Automatic Session Expiry
- Role-Based Access Control
- Unauthorized Access Prevention

---

# Installation

```bash
git clone https://github.com/yourusername/Virtual-Lab-Management-System.git
```

```bash
cd Virtual-Lab-Management-System
```

Install Backend

```bash
npm install
```

Run Server

```bash
npm start
```

Import Database

```
virtual_lab.sql
```

Configure

```
.env
```

```
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=yourpassword

DB_NAME=virtual_lab

JWT_SECRET=your_secret_key
```

---

# Screenshots

```
Login Page

Dashboard

Booking Page

Admin Dashboard

Live Lab Interface

Feedback Page
```

(Add screenshots here)

---

# Future Improvements

- AI-based experiment monitoring
- Attendance using Face Recognition
- Email Notifications
- SMS Alerts
- Analytics Dashboard
- Multiple Laboratory Support
- Mobile Application
- Cloud Deployment

---

# My Contribution

My primary contribution was on the backend development and system integration.

- Designed the MySQL database schema and relationships.
- Developed REST APIs using Node.js and Express.js.
- Implemented JWT-based authentication and authorization.
- Established frontend-backend communication through REST APIs.
- Connected the backend with the NI myDAQ hardware for real-time experiment control.
- Implemented Socket.IO for live communication and experiment updates.
- Integrated live camera streaming into the lab interface.
- Developed session management with automatic login validation, countdown timer, and auto logout.
- Worked on database connectivity, API testing, debugging, and complete backend workflow integration.

---

<div align="center">

### If you like this project, don't forget to star the repository!

** Node.js, Express.js, MySQL, Socket.IO and NI myDAQ**

</div>
