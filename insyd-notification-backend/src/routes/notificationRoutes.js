const express = require('express');
const Notification = require('../models/Notification');
const Event = require('../models/Event');
const router = express.Router();

// In-memory event queue for POC
const eventQueue = [];

// POST /events: Create an event
router.post('/events', async (req, res) => {
  const { type, sourceUserId, targetUserId, data } = req.body;
  const event = new Event({ type, sourceUserId, targetUserId, data });
  await event.save();
  eventQueue.push(event);
  res.status(201).json({ message: 'Event created', event });
});

// POST /notifications: Create a notification (for testing)
router.post('/notifications', async (req, res) => {
  const { userId, type, content } = req.body;
  const notification = new Notification({ userId, type, content });
  await notification.save();
  res.status(201).json({ message: 'Notification created', notification });
});

// GET /notifications/:userId: Retrieve notifications for a user
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
  res.json(notifications);
});

// Event processor (simple polling)
setInterval(async () => {
  if (eventQueue.length > 0) {
    const event = eventQueue.shift();
    // Example: Like event creates notification for targetUserId
    if (event.type === 'like' && event.targetUserId) {
      const notification = new Notification({
        userId: event.targetUserId,
        type: 'like',
        content: `User ${event.sourceUserId} liked your post.`
      });
      await notification.save();
    }
    // Add more event types as needed
  }
}, 1000);

module.exports = router;
