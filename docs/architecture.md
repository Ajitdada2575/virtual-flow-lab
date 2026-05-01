# Virtual Flow Control Lab Architecture

## System Overview

The Virtual Flow Control Lab is a full-stack platform built to enable students to book, control, and analyze a physical lab experiment from their web browsers.

## Technology Stack

- **Frontend**: React (Vite), Tailwind CSS (v4), React Router, Socket.IO Client.
- **Backend**: Node.js, Express, Socket.IO Server.
- **Database**: MySQL 8.0, Sequelize ORM.
- **Hardware Integration**: WebSocket/REST proxies communicating downstream to a LabVIEW network.

## Core Logical Flows

### 1. Booking System
1. Students fetch available grid times mapping to actual real-world time slots.
2. The Server checks constraints (no double-bookings on identical dates/time slots for the same physical equipment).
3. Slots are assigned to specific `user_id`.

### 2. Time-Based Access Control
1. Before emitting hardware commands, the system checks if the user's Socket session `id` correlates strictly to the currently scheduled and verified `booking_id`.
2. Any unauthorized user is kicked to an Observe mode.

### 3. LabVIEW IPC (Inter-Process Communication)
1. Web clients change Sliders (Valve %, Pump RPM).
2. The UI sends WebSocket payloads to the Node Server.
3. Node forwards commands via TCP/HTTP API requests to LabVIEW running on the local Lab network bridging hardware.
4. LabVIEW parses the parameters to the PID controllers on the Prop Valves/Motors.
5. Inversely, hardware sensors write values into LabVIEW memory, propagating back to the Node WebSocket Server which broadcasts down to React Clients.
