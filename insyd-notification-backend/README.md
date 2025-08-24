# Insyd Notification Backend

## Setup
1. Install dependencies: `npm install`
2. Set up MongoDB (local or Atlas) and configure `.env`.
3. Start server: `npm start`

## Endpoints
- `POST /events`: Create an event (like, comment, follow)
- `GET /notifications/:userId`: Get notifications for a user
- `POST /notifications`: Create a notification (for testing)

## Description
NodeJS/Express backend for Insyd notification POC. Handles event processing and notification generation.
