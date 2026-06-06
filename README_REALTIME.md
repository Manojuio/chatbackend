# Realtime (Socket.IO)

## Current state
- `src/server.js` already starts a Socket.IO server.
- It supports:
  - `join_conversation` => join room `conversationId`
  - `send_message` => saves message to MongoDB and emits `receive_message` to room `conversationId`

## What to add next
- Ensure REST endpoint `POST /api/messages/:conversationId` also emits realtime events.
- This requires adding `src/controllers/message.controller.js` and wiring it to Socket.IO.

