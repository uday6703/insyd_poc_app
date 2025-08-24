# Insyd Notification System Design Document

## Introduction
This document describes the design of a notification system for Insyd, a social web platform for the Architecture Industry. The system aims to keep users engaged by sending timely updates about activities from followed users, followers, or organic content discovery.

## System Overview
The notification system enables users to receive in-app notifications about likes, comments, follows, new posts, and messages. The initial design supports 100 daily active users (DAUs) and is scalable to 1 million DAUs.

## Architecture
### Components
- **Event Source**: Triggers notifications (e.g., user likes a post).
- **Notification Service**: Processes events, generates notifications, and stores them.
- **Database**: Stores user data, notification logs, and event metadata.
- **Message Queue**: Handles asynchronous event processing (e.g., RabbitMQ/Kafka for scale).
- **Frontend Client**: Displays notifications to users.
- **Delivery Service**: Sends notifications (in-app for POC).

### Flow of Execution
1. An event (e.g., user likes a post) is published to a message queue.
2. The notification service consumes the event, retrieves user preferences, and generates a notification.
3. The notification is stored in the database and sent to the frontend via polling or WebSocket.
4. The frontend displays the notification to the user.

### Architecture Diagram
*(Please create a diagram using draw.io or Lucidchart based on the above description.)*

## Data Design
### Database Schema
- **Users**: `{ userId, username, email, preferences }`
- **Notifications**: `{ notificationId, userId, type, content, status, timestamp }`
- **Events**: `{ eventId, type, sourceUserId, targetUserId, data, timestamp }`

## Scalability and Performance
- For 100 DAUs: Single server, MongoDB.
- For 1M DAUs: Sharded database, message queue, horizontal scaling, load balancing.
- Rate limiting for high-traffic users.
- Asynchronous processing for bursts.
- Indexed queries for fast retrieval.

## Limitations
- Single server bottleneck at scale.
- No caching (per POC constraints).
- Polling may introduce latency vs. WebSockets.

## Conclusion
This design provides a scalable, event-driven notification system suitable for Insyd’s needs, with a clear path from MVP to large-scale deployment.

---
*Assumptions: No authentication, in-app notifications only for POC.*
